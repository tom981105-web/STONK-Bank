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
  return { balance: 0, fixed: {}, loanPrincipal: 0, loanInterest: 0, creditScore: INIT_CREDIT, creditGrade: gradeFromScore(INIT_CREDIT), lastInterestSettledAt: now, createdAt: now, updatedAt: now };
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
    lastInterestSettledAt: int(b.lastInterestSettledAt) || d.lastInterestSettledAt,
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
    lastInterestSettledAt: int(b.lastInterestSettledAt),
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
  const nb = { ...bank };
  if (freeInt > 0 || loanInt > 0) {
    nb.balance = Math.max(0, int(bank.balance) + freeInt);
    nb.loanInterest = Math.max(0, int(bank.loanInterest) + loanInt);
    nb.lastInterestSettledAt = now;
  }
  return { bank: nb, freeInt, loanInt, elapsed };
}

// 순자산 = 보유현금 + 자유예금 + 정기예금합 − 대출잔액 − 누적이자
export function fixedTotal(bank) { return Object.values(bank.fixed || {}).reduce((a, f) => a + int(f && f.amount), 0); }
export function netWorth(cash, bank) { return int(cash) + int(bank.balance) + fixedTotal(bank) - int(bank.loanPrincipal) - int(bank.loanInterest); }

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
  if (created) {
    await update(bankRef(uid), pruneBank(bank));
  } else if (st.elapsed >= MIN_AUTOSETTLE_MS && (st.freeInt > 0 || st.loanInt > 0)) {
    bank = st.bank;
    bank.creditScore = passiveCredit(bank.creditScore, cash, bank);
    await update(bankRef(uid), pruneBank(bank));
    if (st.freeInt > 0) await addTx(uid, txItem("interest", "자유예금 이자", st.freeInt, cash, cash, ""));
    if (st.loanInt > 0) await addTx(uid, txItem("loanInterest", "대출 이자", -st.loanInt, cash, cash, ""));
    settled = true;
  } else {
    // 미정산: 화면에는 '지금까지 쌓인' 추정 이자를 포함해 보여주되 DB 는 건드리지 않음
    bank = st.bank;
  }
  bank.creditGrade = gradeFromScore(bank.creditScore);

  const tx = tSnap.exists()
    ? Object.entries(tSnap.val()).map(([id, t]) => ({ id, ...t })).sort((a, b) => num(b.createdAt) - num(a.createdAt))
    : [];
  return { uid, cash, nickname, bank, tx, settledNow: settled };
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
  if (amount > int(state.cash)) throw new Error("보유 현금이 부족합니다.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  // 현금 차감(트랜잭션) → 부족 시 중단
  const res = await runTransaction(cashRef(uid), (c) => { c = int(c); if (c < amount) return; return c - amount; });
  if (!res.committed) throw new Error("보유 현금이 부족합니다.");
  const beforeCash = int(state.cash), afterCash = beforeCash - amount;
  bank.balance = Math.max(0, int(bank.balance) + amount);
  await update(bankRef(uid), pruneBank(bank));
  await addTx(uid, txItem("deposit", "자유예금 입금", amount, beforeCash, afterCash, ""));
  return "입금 완료";
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
