// src/services/bank.js — STONK Bank 핵심 금융 로직 (v1.0)
// ───────────────────────────────────────────────────────────────────
// 데이터 위치(기존 STONK 구조 재사용 — 보안 규칙 추가 불필요):
//   보유 현금:  rooms/MAIN/players/{uid}/cash      ← Battle/Arcade/Gacha 와 공유(중복 금지)
//   은행 데이터: rooms/MAIN/bank/{uid}              ← Home '금고(balance)' 를 자유예금으로 재사용
//     { balance(자유예금), fixed{...}, loanPrincipal, loanInterest,
//       creditScore, creditGrade, lastInterestSettledAt, createdAt, updatedAt, nickname }
//   거래내역:   rooms/MAIN/bank/{uid}/tx/{pushId}
//
// 설계 원칙:
//  - 실시간 리스너 없음. 필요한 순간에만 1회 read, 동작 시에만 write.
//  - 이자는 lastInterestSettledAt 기준으로 "정산이 필요할 때만" 계산/기록(쓰기 최소화).
//  - 모든 숫자는 NaN 방어. 금액은 정수(원) 단위.
//  - 보험/펀드/투자상품은 v1.0 미구현 — fixed 상품 테이블/모듈만 확장 가능하게 열어둠.
import { getFirebase, ref, get, update, runTransaction, push, query, orderByKey, limitToLast } from "../firebase.js";

export const ROOM = "MAIN";
export const FREE_RATE_DAY = 0.002;   // 자유예금 이자: 하루 0.2% (낮게)
export const LOAN_RATE_DAY = 0.01;    // 대출 이자: 하루 1.0% (편하지만 위험하게)
export const MIN_AUTOSETTLE_MS = 60 * 60 * 1000; // 접속 시 자동 정산은 1시간 이상 경과했을 때만(쓰기 절감)
export const INIT_CREDIT = 60;

// 정기예금 상품 (추후 확장: 여기에 항목만 추가하면 됨)
export const FIXED_PRODUCTS = {
  d1: { id: "d1", label: "1일 정기예금", ms: 24 * 3600 * 1000, rate: 0.005, desc: "24시간 · 이자 0.5%" },
  d3: { id: "d3", label: "3일 정기예금", ms: 72 * 3600 * 1000, rate: 0.018, desc: "72시간 · 이자 1.8%" },
};
export const FIXED_EARLY_PENALTY = "이자 미지급"; // 만기 전 해지: 원금만 반환

// 신용등급별 대출 한도
export const LOAN_LIMIT_BY_GRADE = { S: 50000000, A: 30000000, B: 15000000, C: 7000000, D: 3000000, F: 0 };
export const GRADE_ORDER = ["F", "D", "C", "B", "A", "S"];

// ───────────── v2.0: 보험 ─────────────
// 손실을 '완화'하는 돈 소모처. v2.0 에서는 가입 상태/경고 연동 + 거래기록 중심(자동 보상은 v2.1).
export const INSURANCE_PRODUCTS = {
  arcade:  { id: "arcade",  title: "Arcade 손실 완화 보험", premium: 3000000, ms: 24 * 3600 * 1000, desc: "24시간 · 아케이드 큰 손실 시 일부 완화(예정)" },
  gacha:   { id: "gacha",   title: "Gacha 폭망 보호권",     premium: 5000000, ms: 24 * 3600 * 1000, desc: "24시간 · 가챠 과소비 경고 강화" },
  loan:    { id: "loan",    title: "대출 유예권",           premium: 2000000, ms: 24 * 3600 * 1000, desc: "24시간 · 대출 위험도 한 단계 완화 표시" },
};

// ───────────── v2.0: 투자상품(자동 결과형) ─────────────
// Battle 실시간 매매와 겹치지 않는 '가입 후 만기 자동정산형'. 결과는 seed 로 고정(새로고침해도 불변).
export const INVESTMENT_PRODUCTS = {
  stable: { id: "stable", title: "안정형 펀드",   ms: 6 * 3600 * 1000,  min: -0.01, max: 0.02, risk: "낮음" },
  growth: { id: "growth", title: "성장형 펀드",   ms: 12 * 3600 * 1000, min: -0.05, max: 0.08, risk: "중간" },
  ipo:    { id: "ipo",    title: "IPO 청약 상품", ms: 24 * 3600 * 1000, min: -0.20, max: 0.35, risk: "높음" },
  lever:  { id: "lever",  title: "레버리지 펀드", ms: 24 * 3600 * 1000, min: -0.40, max: 0.60, risk: "매우 높음" },
};

// ───────────── v2.0: VIP ─────────────
export const VIP_TIERS = ["NORMAL", "SILVER", "GOLD", "PLATINUM", "BLACK"];
export const VIP_TIER_MIN = { NORMAL: 0, SILVER: 30, GOLD: 55, PLATINUM: 78, BLACK: 92 }; // vipScore 기준
export const VIP_VAULT_RATE_DAY = 0.003;       // VIP 금고 이자: 하루 0.3% (자유 0.2% < VIP 0.3% < 정기)
export const VIP_VAULT_MIN_TIER = "GOLD";      // GOLD 이상부터 VIP 금고 사용 가능

// ── 숫자 방어 ──
export function num(v) { const x = Number(v); return Number.isFinite(x) ? x : 0; }
export function int(v) { return Math.trunc(num(v)); }
export function clampScore(s) { s = Math.round(num(s)); return Math.max(0, Math.min(100, s)); }
export function gradeFromScore(s) { s = clampScore(s); return s >= 90 ? "S" : s >= 75 ? "A" : s >= 55 ? "B" : s >= 35 ? "C" : s >= 15 ? "D" : "F"; }
export function loanLimit(grade) { return LOAN_LIMIT_BY_GRADE[grade] ?? 0; }
export function won(v) { return int(v).toLocaleString("ko-KR") + "원"; }

// ── 참조 ──
const playerRef = (uid) => ref(getFirebase().db, `rooms/${ROOM}/players/${uid}`);
const cashRef = (uid) => ref(getFirebase().db, `rooms/${ROOM}/players/${uid}/cash`);
const bankRef = (uid) => ref(getFirebase().db, `rooms/${ROOM}/bank/${uid}`);
const txListRef = (uid) => ref(getFirebase().db, `rooms/${ROOM}/bank/${uid}/tx`);

// ── 기본 은행 데이터 ──
export function defaultBank(now) {
  return {
    balance: 0, fixed: {}, loanPrincipal: 0, loanInterest: 0,
    creditScore: INIT_CREDIT, creditGrade: gradeFromScore(INIT_CREDIT),
    insurances: {}, investments: {},
    vipScore: 0, vipTier: "NORMAL", vipVaultBalance: 0,
    lastInterestSettledAt: now, lastVipSettledAt: now, createdAt: now, updatedAt: now,
  };
}
// 누락 필드 방어 + 정규화
function normalizeBank(raw, now) {
  const d = defaultBank(now);
  const b = (raw && typeof raw === "object") ? raw : {};
  return {
    nickname: b.nickname || "",
    balance: Math.max(0, int(b.balance)),
    fixed: (b.fixed && typeof b.fixed === "object") ? b.fixed : {},
    loanPrincipal: Math.max(0, int(b.loanPrincipal)),
    loanInterest: Math.max(0, int(b.loanInterest)),
    creditScore: clampScore(b.creditScore != null ? b.creditScore : INIT_CREDIT),
    creditGrade: b.creditGrade || gradeFromScore(b.creditScore != null ? b.creditScore : INIT_CREDIT),
    insurances: (b.insurances && typeof b.insurances === "object") ? b.insurances : {},
    investments: (b.investments && typeof b.investments === "object") ? b.investments : {},
    vipScore: clampScore(b.vipScore),
    vipTier: b.vipTier || "NORMAL",
    vipVaultBalance: Math.max(0, int(b.vipVaultBalance)),
    lastInterestSettledAt: int(b.lastInterestSettledAt) || d.lastInterestSettledAt,
    lastVipSettledAt: int(b.lastVipSettledAt) || d.lastVipSettledAt,
    createdAt: int(b.createdAt) || now,
    updatedAt: now,
  };
}
// DB 에 쓸 필드만(파생/UI 전용 제거)
function pruneBank(b) {
  return {
    nickname: b.nickname || "",
    balance: Math.max(0, int(b.balance)),
    fixed: b.fixed || {},
    loanPrincipal: Math.max(0, int(b.loanPrincipal)),
    loanInterest: Math.max(0, int(b.loanInterest)),
    creditScore: clampScore(b.creditScore),
    creditGrade: gradeFromScore(b.creditScore),
    insurances: b.insurances || {},
    investments: b.investments || {},
    vipScore: clampScore(b.vipScore),
    vipTier: b.vipTier || "NORMAL",
    vipVaultBalance: Math.max(0, int(b.vipVaultBalance)),
    lastInterestSettledAt: int(b.lastInterestSettledAt),
    lastVipSettledAt: int(b.lastVipSettledAt) || int(b.lastInterestSettledAt),
    createdAt: int(b.createdAt),
    updatedAt: Date.now(),
  };
}

// ── 이자 정산(순수 계산) ──
// 마지막 정산 이후 경과시간만큼 자유예금 이자 + 대출 이자를 누적해 반환. (쓰기는 호출측이 결정)
export function settleInterest(bank, now) {
  const last = int(bank.lastInterestSettledAt) || now;
  const elapsed = Math.max(0, now - last);
  const days = elapsed / 86400000;
  const freeInt = days > 0 ? Math.floor(num(bank.balance) * FREE_RATE_DAY * days) : 0;
  const loanInt = days > 0 ? Math.floor(num(bank.loanPrincipal) * LOAN_RATE_DAY * days) : 0;
  // VIP 금고 이자(별도 시계)
  const vlast = int(bank.lastVipSettledAt) || last;
  const vdays = Math.max(0, now - vlast) / 86400000;
  const vipInt = vdays > 0 ? Math.floor(num(bank.vipVaultBalance) * VIP_VAULT_RATE_DAY * vdays) : 0;
  const nb = { ...bank };
  if (freeInt > 0 || loanInt > 0) {
    nb.balance = Math.max(0, int(bank.balance) + freeInt);
    nb.loanInterest = Math.max(0, int(bank.loanInterest) + loanInt);
    nb.lastInterestSettledAt = now;
  }
  if (vipInt > 0) {
    nb.vipVaultBalance = Math.max(0, int(bank.vipVaultBalance) + vipInt);
    nb.lastVipSettledAt = now;
  }
  return { bank: nb, freeInt, loanInt, vipInt, elapsed };
}

// 순자산 = 보유현금 + 자유예금 + 정기예금합 + VIP금고 + 투자평가액 − 대출원금 − 누적이자
export function fixedTotal(bank) { return Object.values(bank.fixed || {}).reduce((a, f) => a + int(f && f.amount), 0); }
export function investmentsValue(bank) {
  const now = Date.now();
  return Object.values(bank.investments || {}).reduce((a, v) => {
    if (!v || v.status === "settled") return a;
    return a + (now >= num(v.maturesAt) ? int(investOutcome(v).amount) : int(v.principal));
  }, 0);
}
export function netWorth(cash, bank) {
  return int(cash) + int(bank.balance) + fixedTotal(bank) + int(bank.vipVaultBalance) + investmentsValue(bank)
       - int(bank.loanPrincipal) - int(bank.loanInterest);
}

// 신용점수 조정(상태 기반 패시브) — 정산 시 1회 적용
function passiveCredit(score, cash, bank) {
  let s = clampScore(score);
  const nw = netWorth(cash, bank);
  const loanTotal = int(bank.loanPrincipal) + int(bank.loanInterest);
  if (int(bank.loanPrincipal) === 0) s += 1;                 // 무대출 유지
  if (nw < 0) s -= 5;                                        // 순자산 음수
  if (loanTotal > int(cash) + int(bank.balance) + fixedTotal(bank)) s -= 3; // 빚이 자산보다 큼
  return clampScore(s);
}

// ── 거래내역 ──
export function txItem(type, title, amount, beforeCash, afterCash, memo) {
  return { type, title, amount: int(amount), beforeCash: int(beforeCash), afterCash: int(afterCash), memo: memo || "", createdAt: Date.now() };
}
async function addTx(uid, item) { await push(txListRef(uid), item); }

// ── 상태 로드(접속 시 1회) ──
export async function loadState(uid) {
  const { db } = getFirebase();
  const now = Date.now();
  const [pSnap, bSnap, tSnap] = await Promise.all([
    get(playerRef(uid)),
    get(bankRef(uid)),
    get(query(txListRef(uid), orderByKey(), limitToLast(20))),
  ]);
  const pv = pSnap.val() || {};
  const cash = int(pv.cash);
  const nickname = pv.nickname || (bSnap.val() && bSnap.val().nickname) || "플레이어";

  let bank = normalizeBank(bSnap.val(), now);
  const created = !bSnap.exists();
  if (!bank.nickname) bank.nickname = nickname;

  // 정산: 신규거나 / 1시간 이상 경과했고 이자가 붙는 경우에만 기록(쓰기 절감)
  const st = settleInterest(bank, now);
  let settled = false;
  const hasInt = st.freeInt > 0 || st.loanInt > 0 || st.vipInt > 0;
  if (created) {
    bank = computeVip(bank, cash);
    await update(bankRef(uid), pruneBank(bank));
  } else if (st.elapsed >= MIN_AUTOSETTLE_MS && hasInt) {
    bank = st.bank;
    bank.creditScore = passiveCredit(bank.creditScore, cash, bank);
    bank = computeVip(bank, cash);
    await update(bankRef(uid), pruneBank(bank));
    if (st.freeInt > 0) await addTx(uid, txItem("interest", "자유예금 이자", st.freeInt, cash, cash, ""));
    if (st.loanInt > 0) await addTx(uid, txItem("loanInterest", "대출 이자", -st.loanInt, cash, cash, ""));
    if (st.vipInt > 0) await addTx(uid, txItem("vipInterest", "VIP 금고 이자", st.vipInt, cash, cash, ""));
    settled = true;
  } else {
    // 미정산: 화면에는 '지금까지 쌓인' 추정 이자를 포함해 보여주되 DB 는 건드리지 않음
    bank = st.bank;
    bank = computeVip(bank, cash); // 표시용 VIP 갱신(쓰기 없음)
  }
  bank.creditGrade = gradeFromScore(bank.creditScore);

  const tx = tSnap.exists()
    ? Object.entries(tSnap.val()).map(([id, t]) => ({ id, ...t })).sort((a, b) => num(b.createdAt) - num(a.createdAt))
    : [];

  // 정산/만기 피드(0이면 UI 가 표시 안 함)
  const maturedFixed = Object.values(bank.fixed || {}).filter((f) => now >= num(f.maturesAt)).length;
  const maturedInvest = Object.values(bank.investments || {}).filter((v) => v && v.status !== "settled" && now >= num(v.maturesAt)).length;
  const feed = { freeInt: st.freeInt, loanInt: st.loanInt, vipInt: st.vipInt, maturedFixed, maturedInvest, applied: settled };

  return { uid, cash, nickname, bank, tx, feed, settledNow: settled };
}

// 동작 직전 정산을 DB 에 확정(현재 bank 객체를 정산본으로 교체) — 동작들이 공통 사용
async function commitSettle(uid, bank, cash) {
  const now = Date.now();
  const st = settleInterest(bank, now);
  if (st.freeInt > 0 || st.loanInt > 0) {
    if (st.freeInt > 0) await addTx(uid, txItem("interest", "자유예금 이자", st.freeInt, cash, cash, ""));
    if (st.loanInt > 0) await addTx(uid, txItem("loanInterest", "대출 이자", -st.loanInt, cash, cash, ""));
  }
  return st.bank;
}

function adjustCredit(bank, delta, cash) {
  bank.creditScore = clampScore(bank.creditScore + delta);
  bank.creditGrade = gradeFromScore(bank.creditScore);
  return bank;
}

// ===== 자유예금: 입금(현금→예금) / 출금(예금→현금) =====
export async function depositFree(uid, amount, state) {
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  // 현금 차감(트랜잭션) — 화면의 state.cash 가 살짝 낡았어도 '실제 가용 현금'만큼만 옮긴다.
  // (전부 거절하지 않고 가용액으로 클램프 → "최대 입금"이 잔돈 오차로 실패하던 문제 해결)
  let moved = 0;
  const res = await runTransaction(cashRef(uid), (c) => {
    c = int(c);
    moved = Math.min(amount, c);
    if (moved <= 0) return;           // 현금이 0일 때만 중단
    return c - moved;
  });
  if (!res.committed || moved <= 0) throw new Error("보유 현금이 없습니다.");
  const beforeCash = int((res.snapshot && res.snapshot.val()) ?? state.cash) + moved;
  const afterCash = beforeCash - moved;
  bank.balance = Math.max(0, int(bank.balance) + moved);
  await update(bankRef(uid), pruneBank(bank));
  await addTx(uid, txItem("deposit", "자유예금 입금", moved, beforeCash, afterCash, ""));
  return moved < amount ? `입금 완료 (가용 현금 ${won(moved)})` : "입금 완료";
}

export async function withdrawFree(uid, amount, state) {
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  if (amount > int(state.bank.balance)) throw new Error("예금 잔액이 부족합니다.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  if (amount > int(bank.balance)) amount = int(bank.balance); // 정산 후 재확인
  bank.balance = Math.max(0, int(bank.balance) - amount);
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + amount);
  await addTx(uid, txItem("withdraw", "자유예금 출금", amount, beforeCash, beforeCash + amount, ""));
  return "출금 완료";
}

// ===== 정기예금: 가입 / 해지 / 만기수령 =====
export async function openFixed(uid, productId, amount, state) {
  const prod = FIXED_PRODUCTS[productId];
  if (!prod) throw new Error("상품을 선택하세요.");
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  if (amount > int(state.cash)) throw new Error("보유 현금이 부족합니다.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const res = await runTransaction(cashRef(uid), (c) => { c = int(c); if (c < amount) return; return c - amount; });
  if (!res.committed) throw new Error("보유 현금이 부족합니다.");
  const now = Date.now();
  const id = "f" + now.toString(36);
  bank.fixed = bank.fixed || {};
  bank.fixed[id] = { id, product: productId, label: prod.label, amount, rate: prod.rate, startedAt: now, maturesAt: now + prod.ms };
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await addTx(uid, txItem("fixedOpen", `${prod.label} 가입`, amount, beforeCash, beforeCash - amount, ""));
  return `${prod.label} 가입 완료`;
}

export async function cancelFixed(uid, fixedId, state) {
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const f = bank.fixed && bank.fixed[fixedId];
  if (!f) throw new Error("정기예금을 찾을 수 없습니다.");
  const principal = int(f.amount);
  delete bank.fixed[fixedId];
  await update(bankRef(uid), { ...pruneBank(bank), [`fixed/${fixedId}`]: null });
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + principal); // 만기 전 해지: 원금만 반환(이자 없음)
  await addTx(uid, txItem("fixedCancel", `${f.label} 중도해지 (이자 미지급)`, principal, beforeCash, beforeCash + principal, "만기 전 해지"));
  return "중도해지 — 원금만 반환되었습니다.";
}

export async function claimFixed(uid, fixedId, state) {
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const f = bank.fixed && bank.fixed[fixedId];
  if (!f) throw new Error("정기예금을 찾을 수 없습니다.");
  if (Date.now() < int(f.maturesAt)) throw new Error("아직 만기가 되지 않았습니다.");
  const principal = int(f.amount);
  const interest = Math.floor(principal * num(f.rate));
  const payout = principal + interest;
  delete bank.fixed[fixedId];
  bank = adjustCredit(bank, 1, state.cash); // 정상 만기 수령 → 신용 소폭 +
  await update(bankRef(uid), { ...pruneBank(bank), [`fixed/${fixedId}`]: null });
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + payout);
  await addTx(uid, txItem("fixedClaim", `${f.label} 만기수령 (원금+이자)`, payout, beforeCash, beforeCash + payout, `이자 ${won(interest)}`));
  return `만기 수령 완료 (+${won(interest)} 이자)`;
}

// ===== 대출: 실행 / 상환 =====
export async function takeLoan(uid, amount, state) {
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const grade = gradeFromScore(bank.creditScore);
  const limit = loanLimit(grade);
  const owed = int(bank.loanPrincipal); // 한도는 '추가 대출 가능액' 기준
  if (limit <= 0) throw new Error("현재 신용등급(F)으로는 대출이 불가합니다.");
  if (owed + amount > limit) throw new Error(`대출 한도 초과 (한도 ${won(limit)}, 현재 잔액 ${won(owed)})`);
  bank.loanPrincipal = owed + amount;
  bank = adjustCredit(bank, -3, state.cash); // 대출 실행 → 신용 하락
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + amount); // 보유 현금 증가
  await addTx(uid, txItem("loan", "대출 실행", amount, beforeCash, beforeCash + amount, `잔액 ${won(bank.loanPrincipal)}`));
  return `대출 완료 (+${won(amount)})`;
}

// 상환: 이자 먼저 → 원금. 보유 현금에서 차감.
export async function repayLoan(uid, amount, state) {
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  if (amount > int(state.cash)) throw new Error("보유 현금이 부족합니다.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const totalOwed = int(bank.loanPrincipal) + int(bank.loanInterest);
  if (totalOwed <= 0) throw new Error("상환할 대출이 없습니다.");
  const pay = Math.min(amount, totalOwed); // 빚보다 많이 내지 않음
  // 현금 차감
  const res = await runTransaction(cashRef(uid), (c) => { c = int(c); if (c < pay) return; return c - pay; });
  if (!res.committed) throw new Error("보유 현금이 부족합니다.");
  let remain = pay;
  const payInterest = Math.min(remain, int(bank.loanInterest));
  bank.loanInterest = Math.max(0, int(bank.loanInterest) - payInterest);
  remain -= payInterest;
  const payPrincipal = Math.min(remain, int(bank.loanPrincipal));
  bank.loanPrincipal = Math.max(0, int(bank.loanPrincipal) - payPrincipal);
  const fullyPaid = bank.loanPrincipal <= 0;
  if (fullyPaid) { bank.loanInterest = 0; bank = adjustCredit(bank, 5, state.cash); } // 전액 상환 → 누적이자 정리 + 신용 회복
  else bank = adjustCredit(bank, 1, state.cash); // 일부 상환 → 소폭 +
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await addTx(uid, txItem("repay", fullyPaid ? "대출 전액 상환" : "대출 상환", -pay, beforeCash, beforeCash - pay, `이자 ${won(payInterest)} · 원금 ${won(payPrincipal)}`));
  return fullyPaid ? "전액 상환 완료 🎉" : `상환 완료 (이자 ${won(payInterest)} · 원금 ${won(payPrincipal)})`;
}

// ════════════════════════════ v2.0 ════════════════════════════

// ── VIP 점수/등급 (상태 기반, 정산 시 갱신) ──
export function vipTierFromScore(score) {
  score = clampScore(score);
  let tier = "NORMAL";
  for (const t of VIP_TIERS) if (score >= VIP_TIER_MIN[t]) tier = t;
  return tier;
}
export function vipTierLabel(tier) {
  return { NORMAL: "일반", SILVER: "실버", GOLD: "골드", PLATINUM: "플래티넘", BLACK: "블랙" }[tier] || "일반";
}
// 예금/정기/순자산/대출상환/보험·투자 이용을 점수화(0~100). 표시·금고 잠금 판정용.
function computeVip(bank, cash) {
  const nb = { ...bank };
  const deposit = int(bank.balance) + fixedTotal(bank) + int(bank.vipVaultBalance);
  const nw = netWorth(cash, bank);
  let s = 0;
  s += Math.min(40, Math.floor(deposit / 2500000));                 // 예금 보유(2.5M당 1점, 최대 40)
  s += Math.min(25, Math.floor(Math.max(0, nw) / 4000000));         // 순자산(4M당 1점, 최대 25)
  s += Object.keys(bank.fixed || {}).length ? 8 : 0;                // 정기예금 이용
  s += Object.keys(bank.investments || {}).length ? 8 : 0;          // 투자상품 이용
  s += Object.keys(bank.insurances || {}).length ? 5 : 0;           // 보험 이용
  s += int(bank.loanPrincipal) === 0 ? 6 : 0;                       // 무대출
  s += Math.min(8, clampScore(bank.creditScore) >= 75 ? 8 : 0);     // 우량 신용
  nb.vipScore = clampScore(s);
  nb.vipTier = vipTierFromScore(nb.vipScore);
  return nb;
}

// ── 결정적 seed RNG (uid+id+createdAt 기반 → 새로고침해도 결과 불변) ──
function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function seededUnit(seed) { // 0~1
  let x = (hashSeed(String(seed)) || 1) >>> 0;
  x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0;
  return (x % 100000) / 100000;
}
// 투자 결과(만기): seed 로 [min,max] 안에서 비율 결정 → 가운데로 약간 치우치게(평균 기대 과도 방지)
export function investOutcome(v) {
  const p = INVESTMENT_PRODUCTS[v.productType] || { min: num(v.expectedMinRate), max: num(v.expectedMaxRate) };
  const u0 = seededUnit(v.seed);
  const u1 = seededUnit(v.seed + "x");
  const u = (u0 + u1) / 2; // 평균 두 번 → 종 모양(극단값 확률↓)
  // 기대값을 살짝 음(-)으로: 게임머니 인플레 방지(중앙을 min~max의 45% 지점으로)
  const skew = 0.45;
  const rate = p.min + (p.max - p.min) * (u * (1 - skew) + skew * 0.5 + (u - 0.5) * skew);
  const r = Math.max(p.min, Math.min(p.max, rate));
  const principal = int(v.principal);
  const amount = Math.max(0, Math.round(principal * (1 + r)));
  return { rate: r, amount, profit: amount - principal };
}
export function investLabel(rate) {
  if (rate >= 0.25) return ["대박", "win"];
  if (rate >= 0.05) return ["성공", "ok"];
  if (rate > -0.02) return ["보합", "flat"];
  if (rate > -0.2) return ["손실", "lose"];
  return ["폭락", "crash"];
}

// ── 위험도/안정도 (대시보드 표시) ──
export function loanRisk(cash, bank) {
  const nw = netWorth(cash, bank);
  if (nw < 0) return { key: "severe", label: "심각", tone: "danger" };
  const owed = int(bank.loanPrincipal) + int(bank.loanInterest);
  if (owed <= 0) return { key: "safe", label: "안전", tone: "ok" };
  const assets = int(cash) + int(bank.balance) + fixedTotal(bank) + int(bank.vipVaultBalance) + investmentsValue(bank);
  const ratio = assets > 0 ? owed / assets : 1;
  if (ratio < 0.3) return { key: "ok", label: "관리 가능", tone: "ok", ratio };
  if (ratio < 0.7) return { key: "warn", label: "주의", tone: "warn", ratio };
  return { key: "high", label: "위험", tone: "danger", ratio };
}
export function depositStability(cash, bank) {
  const dep = int(bank.balance) + fixedTotal(bank) + int(bank.vipVaultBalance);
  if (dep <= 0) return { label: "미이용", tone: "muted" };
  const flags = [];
  if (Object.keys(bank.fixed || {}).length) flags.push("장기 예치 중");
  if (dep > int(cash)) flags.push("보수적 운용");
  flags.unshift("안정 자산 보유");
  return { label: flags.join(" · "), tone: "ok" };
}

// ── 보험 ──
export function insuranceActive(ins, now) { return ins && ins.status !== "expired" && num(ins.expiresAt) > (now || Date.now()); }
export function activeInsurances(bank, now) {
  now = now || Date.now();
  return Object.values(bank.insurances || {}).filter((i) => insuranceActive(i, now));
}
export async function buyInsurance(uid, productId, state) {
  const prod = INSURANCE_PRODUCTS[productId];
  if (!prod) throw new Error("보험 상품을 선택하세요.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const now = Date.now();
  if (activeInsurances(bank, now).some((i) => i.type === productId)) throw new Error("이미 가입 중인 보험입니다.");
  if (prod.premium > int(state.cash)) throw new Error("보유 현금이 부족합니다.");
  const res = await runTransaction(cashRef(uid), (c) => { c = int(c); if (c < prod.premium) return; return c - prod.premium; });
  if (!res.committed) throw new Error("보유 현금이 부족합니다.");
  const id = "ins" + now.toString(36);
  bank.insurances = bank.insurances || {};
  bank.insurances[id] = { id, type: productId, title: prod.title, premium: prod.premium, status: "active", startedAt: now, expiresAt: now + prod.ms, usedAt: 0, createdAt: now };
  bank = computeVip(bank, state.cash);
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await addTx(uid, txItem("insurance_buy", `${prod.title} 가입`, -prod.premium, beforeCash, beforeCash - prod.premium, ""));
  return `${prod.title} 가입 완료`;
}

// ── 투자상품 ──
export async function buyInvestment(uid, productId, amount, state) {
  const prod = INVESTMENT_PRODUCTS[productId];
  if (!prod) throw new Error("투자상품을 선택하세요.");
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  if (amount > int(state.cash)) throw new Error("보유 현금이 부족합니다.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const res = await runTransaction(cashRef(uid), (c) => { c = int(c); if (c < amount) return; return c - amount; });
  if (!res.committed) throw new Error("보유 현금이 부족합니다.");
  const now = Date.now();
  const id = "inv" + now.toString(36);
  const seed = uid + ":" + id + ":" + now;
  bank.investments = bank.investments || {};
  bank.investments[id] = {
    id, productType: productId, title: prod.title, principal: amount,
    expectedMinRate: prod.min, expectedMaxRate: prod.max, status: "active",
    seed, startedAt: now, maturesAt: now + prod.ms, resultRate: null, resultAmount: null, settledAt: 0, createdAt: now,
  };
  bank = computeVip(bank, state.cash);
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await addTx(uid, txItem("investment_buy", `${prod.title} 가입`, -amount, beforeCash, beforeCash - amount, `위험도 ${prod.risk}`));
  return `${prod.title} 가입 완료`;
}
export async function claimInvestment(uid, invId, state) {
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const v = bank.investments && bank.investments[invId];
  if (!v) throw new Error("투자상품을 찾을 수 없습니다.");
  if (Date.now() < num(v.maturesAt)) throw new Error("아직 만기가 되지 않았습니다.");
  if (v.status === "settled") throw new Error("이미 정산된 상품입니다.");
  const out = investOutcome(v);
  delete bank.investments[invId];
  bank = computeVip(bank, state.cash);
  await update(bankRef(uid), { ...pruneBank(bank), [`investments/${invId}`]: null });
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + out.amount);
  const [label] = investLabel(out.rate);
  await addTx(uid, txItem("investment_settle", `${v.title} 정산 · ${label}`, out.amount, beforeCash, beforeCash + out.amount, `${(out.rate * 100).toFixed(1)}%`));
  return `${label}! ${out.profit >= 0 ? "+" : "−"}${won(Math.abs(out.profit))} (${(out.rate * 100).toFixed(1)}%)`;
}

// ── VIP 금고 (GOLD 이상) ──
export function vipVaultUnlocked(bank) { return VIP_TIERS.indexOf(bank.vipTier || "NORMAL") >= VIP_TIERS.indexOf(VIP_VAULT_MIN_TIER); }
export async function depositVip(uid, amount, state) {
  if (!vipVaultUnlocked(state.bank)) throw new Error("VIP 금고는 GOLD 등급부터 이용 가능합니다.");
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  let moved = 0;
  const res = await runTransaction(cashRef(uid), (c) => { c = int(c); moved = Math.min(amount, c); if (moved <= 0) return; return c - moved; });
  if (!res.committed || moved <= 0) throw new Error("보유 현금이 없습니다.");
  bank.vipVaultBalance = Math.max(0, int(bank.vipVaultBalance) + moved);
  bank = computeVip(bank, state.cash);
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await addTx(uid, txItem("vip_deposit", "VIP 금고 입금", moved, beforeCash, beforeCash - moved, ""));
  return moved < amount ? `VIP 금고 입금 (가용 ${won(moved)})` : "VIP 금고 입금 완료";
}
export async function withdrawVip(uid, amount, state) {
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  if (amount > int(state.bank.vipVaultBalance)) throw new Error("VIP 금고 잔액이 부족합니다.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  if (amount > int(bank.vipVaultBalance)) amount = int(bank.vipVaultBalance);
  bank.vipVaultBalance = Math.max(0, int(bank.vipVaultBalance) - amount);
  bank = computeVip(bank, state.cash);
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + amount);
  await addTx(uid, txItem("vip_withdraw", "VIP 금고 출금", amount, beforeCash, beforeCash + amount, ""));
  return "VIP 금고 출금 완료";
}
