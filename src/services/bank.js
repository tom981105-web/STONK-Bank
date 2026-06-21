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
  loan:    { id: "loan",    title: "대출 유예권",           premium: 2000000, ms: 24 * 3600 * 1000, desc: "24시간 · 대출 위험도를 한 단계 완화 표시(신용등급과는 별개)" },
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
export const VIP_VAULT_RATE_DAY = 0.003;       // VIP 금고 기본 이자: 하루 0.3% (자유 0.2% < VIP 0.3% < 정기)
export const VIP_VAULT_MIN_TIER = "GOLD";      // GOLD 이상부터 VIP 금고 사용 가능
// 등급별 보험 가입비 할인 / VIP 금고 이자율(낮게 유지 — 돈복사 방지)
export const VIP_DISCOUNT = { NORMAL: 0, SILVER: 0.03, GOLD: 0.05, PLATINUM: 0.08, BLACK: 0.10 };
export const VIP_VAULT_RATE_BY_TIER = { NORMAL: 0, SILVER: 0, GOLD: 0.003, PLATINUM: 0.0035, BLACK: 0.004 };
export function vipDiscount(tier) { return VIP_DISCOUNT[tier] || 0; }
export function vipVaultRate(tier) { return VIP_VAULT_RATE_BY_TIER[tier] || 0; }
export function vipRank(tier) { return Math.max(0, VIP_TIERS.indexOf(tier || "NORMAL")); }

// VIP 전용 투자상품(기본 4종에 더해짐). requiredVipTier 이상에서만 가입 가능.
export const VIP_INVESTMENT_PRODUCTS = {
  pbond:  { id: "pbond",  title: "PLATINUM 안정 채권", ms: 24 * 3600 * 1000, min: -0.02, max: 0.04, risk: "낮음",     requiredVipTier: "PLATINUM" },
  bsecret:{ id: "bsecret",title: "BLACK 시크릿 펀드",  ms: 48 * 3600 * 1000, min: -0.15, max: 0.20, risk: "매우 높음", requiredVipTier: "BLACK" },
};

// ───────────── v2.9: STONK Card(게임머니 신용카드) ─────────────
export const CARD_BILLING_MS = 24 * 3600 * 1000;   // 결제 주기 24시간
export const CARD_GRACE_MS = 12 * 3600 * 1000;     // 청구 후 미납 유예 12시간
export const CARD_SUSPEND_OVERDUE = 3;             // 미납 3회 누적 시 정지
// 등급: 신용등급 또는 VIP 등급 조건 중 하나만 충족하면 됨
export const CARD_TIERS = {
  BASIC:    { id: "BASIC",    title: "BASIC Card",    limit: 5000000,   minGrade: "B", minVip: "NORMAL", insExtra: 0,    perk: "기본 게임머니 신용카드" },
  GOLD:     { id: "GOLD",     title: "GOLD Card",     limit: 20000000,  minGrade: "A", minVip: "GOLD",   insExtra: 0.02, perk: "보험 할인 +2% · 결제 알림 강화" },
  PLATINUM: { id: "PLATINUM", title: "PLATINUM Card", limit: 50000000,  minGrade: "S", minVip: "PLATINUM", insExtra: 0,  perk: "카드 이용 시 VIP 점수 소폭 +" },
  BLACK:    { id: "BLACK",    title: "BLACK Card",    limit: 100000000, minGrade: "S", minVip: "BLACK",  insExtra: 0,    perk: "BLACK 전용 디자인 · 프리미엄 효과" },
};
export const CARD_TIER_ORDER = ["BASIC", "GOLD", "PLATINUM", "BLACK"];
const GRADE_RANK = { F: 0, D: 1, C: 2, B: 3, A: 4, S: 5 };
export function gradeRank(g) { return GRADE_RANK[g] || 0; }

// ───────────── v2.9: 금융 이벤트(게임머니 금리/분위기) ─────────────
export const BANK_EVENTS = {
  lowrate:   { id: "lowrate",   type: "lowrate",   title: "저금리 데이",     desc: "예금·대출 이자가 소폭 낮아집니다." },
  highrate:  { id: "highrate",  type: "highrate",  title: "고금리 데이",     desc: "예금·대출 이자가 소폭 높아지고 대출 경고가 강해집니다." },
  boom:      { id: "boom",      type: "boom",      title: "투자 호황",       desc: "신규 투자상품의 기대 상단이 소폭 올라갑니다." },
  bust:      { id: "bust",      type: "bust",      title: "투자 침체",       desc: "신규 투자상품의 손실 가능성이 커지고 경고가 강해집니다." },
  insurance: { id: "insurance", type: "insurance", title: "보험 우대 기간",  desc: "보험 가입비가 추가 5% 할인됩니다(총 할인 최대 20%)." },
  cashback:  { id: "cashback",  type: "cashback",  title: "카드 캐시백 이벤트", desc: "카드 납부 시 VIP 점수가 소폭 증가합니다." },
  vipweek:   { id: "vipweek",   type: "vipweek",   title: "VIP 우대 기간",   desc: "VIP 점수 획득과 VIP 금고 이자가 소폭 증가합니다." },
  caution:   { id: "caution",   type: "caution",   title: "금융 경계주의보",  desc: "대출·카드 고액 사용 경고가 강화됩니다. (보상 없음)" },
};
export const BANK_EVENT_IDS = Object.keys(BANK_EVENTS);
// 이벤트 효과(소폭). 한 곳에서만 관리.
export function eventEffects(ev) {
  const e = { depositMult: 1, loanMult: 1, insExtraDisc: 0, investMinAdd: 0, investMaxAdd: 0, vipVaultAdd: 0, vipGainMult: 1, cardCashbackVip: 0, warnBoost: false };
  // 관리자 직접 수치 입력 이벤트(custom): effects 객체를 검증된 범위로 클램프해 사용
  if (ev && ev.custom && ev.effects && typeof ev.effects === "object") {
    const x = ev.effects, cl = (v, lo, hi, d) => { v = Number(v); return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : d; };
    e.depositMult = cl(x.depositRateMultiplier, 0.5, 1.5, 1);
    e.loanMult = cl(x.loanRateMultiplier, 0.5, 1.5, 1);
    e.insExtraDisc = cl(x.insuranceExtraDiscount, 0, 0.10, 0);
    e.investMinAdd = cl(x.investMinDelta, -0.10, 0.10, 0);
    e.investMaxAdd = cl(x.investMaxDelta, -0.10, 0.10, 0);
    e.vipGainMult = cl(x.vipScoreMultiplier, 1.0, 2.0, 1);
    e.vipVaultAdd = cl(x.vipVaultBonusRate, 0, 0.001, 0);
    e.cardCashbackVip = Math.round(cl(x.cardPayVipBonus, 0, 5, 0));
    e.warnBoost = !!x.warnBoost;
    return e;
  }
  const t = ev && ev.type;
  if (t === "lowrate") { e.depositMult = 0.7; e.loanMult = 0.7; }
  else if (t === "highrate") { e.depositMult = 1.3; e.loanMult = 1.3; e.warnBoost = true; }
  else if (t === "boom") { e.investMaxAdd = 0.03; }
  else if (t === "bust") { e.investMinAdd = -0.05; e.warnBoost = true; }
  else if (t === "insurance") { e.insExtraDisc = 0.05; }
  else if (t === "cashback") { e.cardCashbackVip = 1; }
  else if (t === "vipweek") { e.vipVaultAdd = 0.0005; e.vipGainMult = 1.2; }
  else if (t === "caution") { e.warnBoost = true; }
  return e;
}
// 날짜+방 seed 로 오늘의 기본 이벤트 결정(새로고침해도 불변). manual 이벤트가 있으면 그것을 우선.
export function computeSeedEvent(dateKey) {
  let h = 2166136261 >>> 0;
  const s = "bankevt:" + String(dateKey);
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  const id = BANK_EVENT_IDS[(h >>> 0) % BANK_EVENT_IDS.length];
  return Object.assign({}, BANK_EVENTS[id], { seed: s, manual: false });
}
export function dateKeyKST(now) {
  const d = new Date((now || Date.now()) + 9 * 3600 * 1000); // KST
  return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
}
let activeEvent = null; // loadState 에서 설정 → settleInterest/buyInsurance/buyInvestment 가 참조
export function getActiveEvent() { return activeEvent; }
export function setActiveEvent(ev) { activeEvent = ev || null; }

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
const msgListRef = (uid) => ref(getFirebase().db, `rooms/${ROOM}/bank/${uid}/messages`);
const eventRef = () => ref(getFirebase().db, `rooms/${ROOM}/bankEvents/current`);

// 카드 기본값(미발급)
function defaultCard(now) {
  return { enabled: false, cardTier: "", cardLimit: 0, usedAmount: 0, billingAmount: 0, dueAt: 0, lastBilledAt: 0, lastOverdueProcessedAt: 0, overdue: false, overdueCount: 0, suspended: false, autoPayEnabled: false, autoPayMode: "off", autoPayLastProcessedAt: 0, createdAt: now || Date.now(), updatedAt: now || Date.now() };
}
function normalizeCard(raw, now) {
  const c = (raw && typeof raw === "object") ? raw : {};
  return {
    enabled: !!c.enabled,
    cardTier: c.cardTier || "",
    cardLimit: Math.max(0, int(c.cardLimit)),
    usedAmount: Math.max(0, int(c.usedAmount)),
    billingAmount: Math.max(0, int(c.billingAmount)),
    dueAt: int(c.dueAt),
    lastBilledAt: int(c.lastBilledAt),
    lastOverdueProcessedAt: int(c.lastOverdueProcessedAt),
    overdue: !!c.overdue,
    overdueCount: Math.max(0, int(c.overdueCount)),
    suspended: !!c.suspended,
    autoPayEnabled: !!c.autoPayEnabled,
    autoPayMode: c.autoPayMode || (c.autoPayEnabled ? "full" : "off"),
    autoPayLastProcessedAt: int(c.autoPayLastProcessedAt),
    createdAt: int(c.createdAt) || now,
    updatedAt: now,
  };
}
// 카드 최소 납부액 = max(청구액 10%, 100만), 청구액 초과 불가
export function cardMinPay(card) {
  const owed = Math.max(int(card && card.billingAmount), int(card && card.usedAmount));
  if (owed <= 0) return 0;
  return Math.min(owed, Math.max(Math.floor(owed * 0.10), 1000000));
}
// 현재/기본 금리(이벤트 반영) — UI 비교용
export function rateInfo(bank) {
  const ef = eventEffects(activeEvent);
  return {
    free: { base: FREE_RATE_DAY, now: FREE_RATE_DAY * ef.depositMult },
    loan: { base: LOAN_RATE_DAY, now: LOAN_RATE_DAY * ef.loanMult },
    vipVault: { base: vipVaultRate((bank && bank.vipTier) || "NORMAL") || VIP_VAULT_RATE_DAY, now: (vipVaultRate((bank && bank.vipTier) || "NORMAL") || VIP_VAULT_RATE_DAY) + ef.vipVaultAdd },
    eventActive: !!(activeEvent && (ef.depositMult !== 1 || ef.loanMult !== 1 || ef.vipVaultAdd > 0 || ef.insExtraDisc > 0 || ef.investMinAdd || ef.investMaxAdd || ef.vipGainMult !== 1 || ef.cardCashbackVip > 0)),
    ef,
  };
}

// ── 기본 은행 데이터 ──
export function defaultBank(now) {
  return {
    balance: 0, fixed: {}, loanPrincipal: 0, loanInterest: 0,
    creditScore: INIT_CREDIT, creditGrade: gradeFromScore(INIT_CREDIT),
    insurances: {}, investments: {},
    vipScore: 0, vipTier: "NORMAL", vipVaultBalance: 0, card: defaultCard(now),
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
    card: normalizeCard(b.card, now),
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
    card: normalizeCard(b.card, Date.now()),
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
  // 오늘의 금융 이벤트(저금리/고금리/VIP우대)를 이자율에 소폭 반영
  const ef = eventEffects(activeEvent);
  const freeRate = FREE_RATE_DAY * ef.depositMult;
  const loanRate = LOAN_RATE_DAY * ef.loanMult;
  const freeInt = days > 0 ? Math.floor(num(bank.balance) * freeRate * days) : 0;
  const loanInt = days > 0 ? Math.floor(num(bank.loanPrincipal) * loanRate * days) : 0;
  // VIP 금고 이자(별도 시계, 등급별 이자율 + 이벤트 보너스)
  const vlast = int(bank.lastVipSettledAt) || last;
  const vdays = Math.max(0, now - vlast) / 86400000;
  const vrate = (vipVaultRate(bank.vipTier) || VIP_VAULT_RATE_DAY) + ef.vipVaultAdd;
  const vipInt = vdays > 0 ? Math.floor(num(bank.vipVaultBalance) * vrate * vdays) : 0;
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

// ── v2.5 알림/우편함 (rooms/MAIN/bank/{uid}/messages) ──
export function msgItem(o) {
  return {
    type: o.type || "system", title: o.title || "", body: o.body || "",
    amount: int(o.amount), relatedId: o.relatedId || "", read: false,
    actionLabel: o.actionLabel || "", actionUrl: o.actionUrl || "", createdAt: Date.now(),
  };
}
async function addMessage(uid, o) { await push(msgListRef(uid), msgItem(o)); }
export async function markMessageRead(uid, id) {
  await update(ref(getFirebase().db, `rooms/${ROOM}/bank/${uid}/messages/${id}`), { read: true });
}
export async function markAllMessagesRead(uid, msgs) {
  const u = {}; (msgs || []).forEach((m) => { if (m && !m.read && m.id) u[`${m.id}/read`] = true; });
  if (Object.keys(u).length) await update(msgListRef(uid), u);
}
export function unreadCount(msgs) { return (msgs || []).filter((m) => m && !m.read).length; }

// ── 상태 로드(접속 시 1회) ──
export async function loadState(uid) {
  const { db } = getFirebase();
  const now = Date.now();
  const [pSnap, bSnap, tSnap, mSnap, eSnap] = await Promise.all([
    get(playerRef(uid)),
    get(bankRef(uid)),
    get(query(txListRef(uid), orderByKey(), limitToLast(20))),
    get(query(msgListRef(uid), orderByKey(), limitToLast(60))),
    get(eventRef()),
  ]);
  const pv = pSnap.val() || {};
  const cash = int(pv.cash);
  const nickname = pv.nickname || (bSnap.val() && bSnap.val().nickname) || "플레이어";

  // 오늘의 금융 이벤트: manual(미만료) 우선, 없으면 날짜+방 seed. 설정 후 이자 정산이 반영하도록 먼저 적용.
  const ev = resolveEvent(eSnap.val(), now);
  setActiveEvent(ev);

  let bank = normalizeBank(bSnap.val(), now);
  const created = !bSnap.exists();
  const prevTier = bank.vipTier; // computeVip 가 덮어쓰기 전의 등급(상승 감지용)
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

  let msgs = mSnap.exists()
    ? Object.entries(mSnap.val()).map(([id, m]) => ({ id, ...m })).sort((a, b) => num(b.createdAt) - num(a.createdAt))
    : [];

  // 카드 청구/미납 처리(접속 시 1회, dueAt 기준 중복 방지)
  const cardRes = processCard(bank, now);
  const cardMsgs = cardRes.msgs.slice();
  if (cardRes.changed) {
    if (cardRes.creditDelta) { bank.creditScore = clampScore(bank.creditScore + cardRes.creditDelta); bank.creditGrade = gradeFromScore(bank.creditScore); }
    await update(bankRef(uid), pruneBank(bank));
    for (const t of cardRes.tx) await addTx(uid, t);
  }

  // 카드 자동납부(접속 시 1회, dueAt 기준 중복 방지) — 현금이 충분하면 전액 자동 납부
  const cc = bank.card;
  if (cc && cc.enabled && cc.autoPayEnabled && int(cc.dueAt) > 0 && now >= int(cc.dueAt) && int(cc.autoPayLastProcessedAt) < int(cc.dueAt)) {
    const dueKey = int(cc.dueAt);
    const owed = Math.max(int(cc.billingAmount), int(cc.usedAmount));
    if (owed > 0) {
      if (int(cash) >= owed) {
        const r = await runTransaction(cashRef(uid), (cv) => { const base = (cv == null) ? int(cash) : int(cv); if (base < owed) return; return base - owed; });
        if (r.committed) {
          cc.usedAmount = 0; cc.billingAmount = 0; cc.overdue = false; cc.dueAt = 0; cc.lastBilledAt = 0; cc.lastOverdueProcessedAt = 0; cc.suspended = false; cc.autoPayLastProcessedAt = now;
          bank.creditScore = clampScore(bank.creditScore + 1); bank.creditGrade = gradeFromScore(bank.creditScore);
          await update(bankRef(uid), pruneBank(bank));
          await addTx(uid, txItem("card_pay", "카드 자동납부", -owed, cash, cash - owed, "전액 자동납부"));
          cardMsgs.push({ type: "card", title: "카드 자동납부 완료", body: `결제일에 청구액 ${won(owed)}이 자동으로 납부되었습니다.`, relatedId: "cardautopay-" + dueKey });
        }
      } else {
        cc.autoPayLastProcessedAt = dueKey; // 이번 dueAt 자동납부 시도 기록(중복 실패 알림 방지)
        await update(bankRef(uid), { "card/autoPayLastProcessedAt": dueKey });
        cardMsgs.push({ type: "card", title: "카드 자동납부 실패", body: `현금 부족으로 자동납부에 실패했습니다. 청구액 ${won(owed)}을 수동 납부해 주세요.`, relatedId: "cardautofail-" + dueKey });
      }
    }
  }

  // 이벤트 알림 생성(중복 방지: relatedId) + 만료 보험 정리 + 카드 알림 — 접속 시 1회
  msgs = await processBankEvents(uid, bank, prevTier, msgs, now, cardMsgs);

  // 알림 50개 초과 정리: 읽은 오래된 알림부터 삭제(unread 보존). 실패해도 진행.
  try {
    if (msgs.length > 50) {
      const sorted = msgs.slice().sort((a, b) => num(b.createdAt) - num(a.createdAt));
      const keep = new Set(sorted.slice(0, 50).map((m) => m.id));
      const rm = sorted.filter((m) => m.id && !keep.has(m.id) && m.read && !String(m.id).startsWith("local-"));
      if (rm.length) {
        const upd = {}; rm.forEach((m) => { upd[m.id] = null; });
        await update(msgListRef(uid), upd);
        console.info("[bank] 오래된 알림 정리:", rm.length);
        const rmSet = new Set(rm.map((m) => m.id));
        msgs = msgs.filter((m) => !rmSet.has(m.id));
      }
    }
  } catch (e) { console.warn("[bank] 알림 정리 실패:", e); }

  // 정산/만기 피드(0이면 UI 가 표시 안 함)
  const maturedFixed = Object.values(bank.fixed || {}).filter((f) => now >= num(f.maturesAt)).length;
  const maturedInvest = Object.values(bank.investments || {}).filter((v) => v && v.status !== "settled" && now >= num(v.maturesAt)).length;
  const feed = { freeInt: st.freeInt, loanInt: st.loanInt, vipInt: st.vipInt, maturedFixed, maturedInvest, applied: settled };

  return { uid, cash, nickname, bank, tx, msgs, unread: unreadCount(msgs), feed, event: ev, settledNow: settled };
}

// 이벤트 결정: manual(미만료) 우선, 없으면 날짜+방 seed
export function resolveEvent(raw, now) {
  now = now || Date.now();
  if (raw && raw.manual && (!raw.expiresAt || num(raw.expiresAt) > now) && raw.type) {
    return Object.assign({}, BANK_EVENTS[raw.type] || {}, raw);
  }
  return computeSeedEvent(dateKeyKST(now));
}

// 카드 청구/미납 처리(순수, bank.card 변경). dueAt 기준으로 1회만 적용(중복 방지).
function processCard(bank, now) {
  const res = { changed: false, creditDelta: 0, msgs: [], tx: [] };
  const c = bank.card;
  if (!c || !c.enabled) return res;
  if (int(c.usedAmount) > 0 && int(c.dueAt) > 0 && now >= int(c.dueAt)) {
    if (int(c.lastBilledAt) < int(c.dueAt)) {
      c.billingAmount = int(c.usedAmount);
      c.lastBilledAt = int(c.dueAt);
      res.changed = true;
      res.msgs.push({ type: "card", title: "카드 결제일 도착", body: `STONK Card 청구액 ${won(c.billingAmount)}(게임머니) 납부가 필요합니다.`, relatedId: "cardbill-" + c.dueAt, actionLabel: "카드 탭에서 납부" });
      res.tx.push(txItem("card_bill", "카드 청구", c.billingAmount, 0, 0, "결제일 도래"));
    }
    if (int(c.billingAmount) > 0 && now >= int(c.dueAt) + CARD_GRACE_MS && int(c.lastOverdueProcessedAt) < int(c.dueAt)) {
      c.overdue = true;
      c.overdueCount = int(c.overdueCount) + 1;
      c.lastOverdueProcessedAt = int(c.dueAt);
      res.creditDelta -= 5;
      res.changed = true;
      let body = `STONK Card 청구액 ${won(c.billingAmount)} 미납으로 신용점수가 하락했습니다.`;
      if (c.overdueCount >= CARD_SUSPEND_OVERDUE) {
        c.suspended = true; body += " 미납 누적으로 카드가 정지되었습니다.";
        res.msgs.push({ type: "card", title: "카드 사용 정지", body: "미납 누적으로 STONK Card 사용이 정지되었습니다. 전액 납부 후 복구할 수 있습니다.", relatedId: "cardsusp-" + c.dueAt });
        res.tx.push(txItem("card_suspend", "카드 사용 정지", 0, 0, 0, `미납 ${c.overdueCount}회`));
      }
      res.msgs.push({ type: "card", title: "카드 미납 발생", body, relatedId: "cardover-" + c.dueAt });
      res.tx.push(txItem("card_overdue", "카드 미납", 0, 0, 0, `청구 ${won(c.billingAmount)} 미납 · 신용 -5`));
    }
  }
  return res;
}

// 접속 시 이벤트 알림 생성 + 만료 보험 status 정리. 같은 relatedId 알림은 중복 생성하지 않는다.
async function processBankEvents(uid, bank, prevTier, msgs, now, extraMsgs) {
  const seen = new Set((msgs || []).map((m) => m.relatedId).filter(Boolean));
  const out = [];
  const emit = async (o) => {
    if (o.relatedId && seen.has(o.relatedId)) return;
    if (o.relatedId) seen.add(o.relatedId);
    const item = msgItem(o);
    await addMessage(uid, o);
    out.push({ id: "local-" + Math.random().toString(36).slice(2), ...item });
  };

  // 카드 처리에서 발생한 알림(청구/미납/정지)
  for (const m of (extraMsgs || [])) await emit(m);

  // 만료 보험 status 정리(active → expired) + 만료 알림
  const expUpdates = {};
  for (const i of Object.values(bank.insurances || {})) {
    if (i && i.status === "active" && num(i.expiresAt) <= now) {
      i.status = "expired";
      expUpdates[`insurances/${i.id}/status`] = "expired";
      await emit({ type: "insurance", title: "보험 만료", body: `${i.title}이(가) 만료되었습니다.`, relatedId: "insexp-" + i.id });
    }
  }
  if (Object.keys(expUpdates).length) await update(bankRef(uid), expUpdates);

  // 정기예금 만기
  for (const f of Object.values(bank.fixed || {})) {
    if (f && now >= num(f.maturesAt)) {
      await emit({ type: "fixed", title: "정기예금 만기 도착", body: `${f.title || f.label} 수령이 가능합니다.`, relatedId: "fixmat-" + f.id, actionLabel: "예금 탭에서 수령", actionUrl: "" });
    }
  }
  // 투자 만기
  for (const v of Object.values(bank.investments || {})) {
    if (v && v.status !== "settled" && now >= num(v.maturesAt)) {
      const out2 = investOutcome(v);
      await emit({ type: "investment", title: "투자상품 만기 도착", body: `${v.title} 만기 · 예상 ${(out2.rate * 100).toFixed(1)}%. 수령이 가능합니다.`, relatedId: "invmat-" + v.id });
    }
  }
  // VIP 등급 상승
  if (vipRank(bank.vipTier) > vipRank(prevTier)) {
    await emit({ type: "vip", title: "VIP 등급 상승", body: `${vipTierLabel(bank.vipTier)} 등급으로 승급했습니다.${bank.vipTier === "GOLD" ? " VIP 금고가 해금되었습니다." : ""}`, relatedId: "viptier-" + bank.vipTier });
    await addTx(uid, txItem("vip_tier_up", "VIP 등급 상승", 0, 0, 0, `${vipTierLabel(prevTier)} → ${vipTierLabel(bank.vipTier)}`));
  }

  if (!out.length) return msgs;
  return [...out, ...(msgs || [])].sort((a, b) => num(b.createdAt) - num(a.createdAt));
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
  // 현금 차감(트랜잭션). 핵심: 첫 호출은 로컬 캐시(미캐시 시 null)로 실행되는데,
  // null 일 때 0 으로 보고 undefined 를 반환하면 Firebase 가 '중단'으로 확정해 서버값으로 재시도하지 않는다.
  // → null 이면 state.cash 를 fallback 으로 사용해 거짓 중단을 막는다(가용액만큼 클램프).
  let moved = 0;
  const fallback = int(state.cash);
  const res = await runTransaction(cashRef(uid), (c) => {
    const base = (c === null || c === undefined) ? fallback : int(c);
    moved = Math.min(amount, base);
    if (moved <= 0) return;           // 실제 현금이 0일 때만 중단
    return base - moved;
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
  const fb = int(state.cash);
  const res = await runTransaction(cashRef(uid), (c) => { const base = (c == null) ? fb : int(c); if (base < amount) return; return base - amount; });
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
  await update(bankRef(uid), pruneBank(bank)); // fixed 객체 전체를 갱신(삭제 키 제외) — 별도 null 경로 불필요
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
  await update(bankRef(uid), pruneBank(bank)); // fixed 객체 전체를 갱신(삭제 키 제외) — 별도 null 경로 불필요
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + payout);
  await addTx(uid, txItem("fixedClaim", `${f.label} 만기수령 (원금+이자)`, payout, beforeCash, beforeCash + payout, `이자 ${won(interest)}`));
  await addMessage(uid, { type: "fixed", title: "정기예금 수령 완료", body: `${f.label} ${won(payout)}을(를) 수령했습니다. (이자 ${won(interest)})`, amount: payout, relatedId: "fixclaim-" + fixedId });
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
  // 대출 유예권: 활성 시 신용점수 하락을 -3 → -1 로 1회 완화하고 유예권을 사용 처리
  const grace = activeInsurances(bank).find((i) => i.type === "loan");
  bank = adjustCredit(bank, grace ? -1 : -3, state.cash);
  if (grace) { bank.insurances[grace.id].status = "used"; bank.insurances[grace.id].usedAt = Date.now(); }
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + amount); // 보유 현금 증가
  await addTx(uid, txItem("loan", "대출 실행", amount, beforeCash, beforeCash + amount, `잔액 ${won(bank.loanPrincipal)}${grace ? " · 유예권 적용" : ""}`));
  if (grace) {
    await addTx(uid, txItem("insurance_used", "대출 유예권 적용", 0, beforeCash, beforeCash, "신용점수 하락 완화(-3 → -1)"));
    await addMessage(uid, { type: "insurance", title: "대출 유예권 사용됨", body: "대출 실행 시 신용점수 하락이 완화되었습니다.", relatedId: "insused-" + grace.id });
  }
  return `대출 완료 (+${won(amount)})${grace ? " · 유예권으로 신용 하락 완화" : ""}`;
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
  // 현금 차감 (null 첫 실행 fallback 처리 — 거짓 중단 방지)
  const fb = int(state.cash);
  const res = await runTransaction(cashRef(uid), (c) => { const base = (c == null) ? fb : int(c); if (base < pay) return; return base - pay; });
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
  s = Math.round(s * eventEffects(activeEvent).vipGainMult);         // VIP 우대 이벤트 시 소폭 가산
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
export function investProduct(id) { return INVESTMENT_PRODUCTS[id] || VIP_INVESTMENT_PRODUCTS[id] || null; }
export function investOutcome(v) {
  // 가입 시 저장된 기대 범위를 우선 사용(이벤트로 조정된 범위가 seed 와 함께 고정 → 새로고침 불변).
  const base = investProduct(v.productType) || {};
  const p = { min: v.expectedMinRate != null ? num(v.expectedMinRate) : num(base.min), max: v.expectedMaxRate != null ? num(v.expectedMaxRate) : num(base.max) };
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
  let r = ratio < 0.3 ? { key: "ok", label: "관리 가능", tone: "ok" }
        : ratio < 0.7 ? { key: "warn", label: "주의", tone: "warn" }
        : { key: "high", label: "위험", tone: "danger" };
  // 대출 유예권(loan 보험) 가입 중이면 '위험도 표시'를 한 단계 완화한다(신용등급과는 별개).
  if (activeInsurances(bank).some((i) => i.type === "loan")) {
    if (r.key === "high") r = { key: "warn", label: "주의", tone: "warn" };
    else if (r.key === "warn") r = { key: "ok", label: "관리 가능", tone: "ok" };
    r.eased = true;
  }
  r.ratio = ratio;
  return r;
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
  const tier = state.bank.vipTier || "NORMAL";
  // VIP 할인 + 보험 우대 이벤트 추가 할인(합산, 최대 20%) + GOLD↑ 카드 추가 2%
  const ef = eventEffects(activeEvent);
  const cardExtra = (state.bank.card && state.bank.card.enabled && CARD_TIERS[state.bank.card.cardTier]) ? CARD_TIERS[state.bank.card.cardTier].insExtra : 0;
  const disc = Math.min(0.20, vipDiscount(tier) + ef.insExtraDisc + cardExtra);
  const premium = Math.max(1, Math.floor(prod.premium * (1 - disc))); // 할인해도 0원은 안 됨
  if (premium > int(state.cash)) throw new Error("보유 현금이 부족합니다.");
  const fb = int(state.cash);
  const res = await runTransaction(cashRef(uid), (c) => { const base = (c == null) ? fb : int(c); if (base < premium) return; return base - premium; });
  if (!res.committed) throw new Error("보유 현금이 부족합니다.");
  const id = "ins" + now.toString(36);
  bank.insurances = bank.insurances || {};
  bank.insurances[id] = { id, type: productId, title: prod.title, premium, basePremium: prod.premium, status: "active", startedAt: now, expiresAt: now + prod.ms, usedAt: 0, createdAt: now };
  bank = computeVip(bank, state.cash);
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  const memo = disc > 0 ? `할인 ${Math.round(disc * 100)}% 적용${ef.insExtraDisc > 0 ? " (보험 우대 이벤트 포함)" : ""}` : "";
  await addTx(uid, txItem("insurance_buy", `${prod.title} 가입`, -premium, beforeCash, beforeCash - premium, memo));
  await addMessage(uid, { type: "insurance", title: "보험 가입 완료", body: `${prod.title}에 가입했습니다.${memo ? " (" + memo + ")" : ""}`, amount: -premium, relatedId: "insbuy-" + id });
  return `${prod.title} 가입 완료${disc > 0 ? ` · ${Math.round(disc * 100)}% 할인` : ""}`;
}

// ── 투자상품 ──
export async function buyInvestment(uid, productId, amount, state) {
  const prod = investProduct(productId);
  if (!prod) throw new Error("투자상품을 선택하세요.");
  if (prod.requiredVipTier && vipRank(state.bank.vipTier) < vipRank(prod.requiredVipTier)) {
    throw new Error(`${vipTierLabel(prod.requiredVipTier)} 등급부터 가입 가능한 상품입니다.`);
  }
  amount = int(amount);
  if (amount <= 0) throw new Error("금액을 확인하세요.");
  if (amount > int(state.cash)) throw new Error("보유 현금이 부족합니다.");
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const fb = int(state.cash);
  const res = await runTransaction(cashRef(uid), (c) => { const base = (c == null) ? fb : int(c); if (base < amount) return; return base - amount; });
  if (!res.committed) throw new Error("보유 현금이 부족합니다.");
  const now = Date.now();
  const id = "inv" + now.toString(36);
  const seed = uid + ":" + id + ":" + now;
  // 투자 호황/침체 이벤트를 '가입 시점'에만 기대 범위에 소폭 반영하고 저장 → seed 결과 고정.
  const ef = eventEffects(activeEvent);
  const minR = num(prod.min) + ef.investMinAdd;
  const maxR = num(prod.max) + ef.investMaxAdd;
  bank.investments = bank.investments || {};
  bank.investments[id] = {
    id, productType: productId, title: prod.title, principal: amount,
    expectedMinRate: minR, expectedMaxRate: maxR, status: "active",
    seed, startedAt: now, maturesAt: now + prod.ms, resultRate: null, resultAmount: null, settledAt: 0, createdAt: now,
  };
  bank = computeVip(bank, state.cash);
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  const evMemo = (ef.investMinAdd || ef.investMaxAdd) ? ` · ${activeEvent.title} 반영` : "";
  await addTx(uid, txItem("investment_buy", `${prod.title} 가입`, -amount, beforeCash, beforeCash - amount, `위험도 ${prod.risk}${evMemo}`));
  return `${prod.title} 가입 완료${evMemo}`;
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
  await update(bankRef(uid), pruneBank(bank)); // investments 객체 전체를 갱신(삭제 키 제외)
  const beforeCash = int(state.cash);
  await runTransaction(cashRef(uid), (c) => int(c) + out.amount);
  const [label] = investLabel(out.rate);
  await addTx(uid, txItem("investment_settle", `${v.title} 정산 · ${label}`, out.amount, beforeCash, beforeCash + out.amount, `${(out.rate * 100).toFixed(1)}%`));
  await addMessage(uid, { type: "investment", title: "투자 정산 완료", body: `${v.title} 정산: ${won(out.amount)} 수령 (${(out.rate * 100).toFixed(1)}%, ${label})`, amount: out.amount, relatedId: "invsettle-" + invId });
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
  const fb = int(state.cash);
  const res = await runTransaction(cashRef(uid), (c) => { const base = (c == null) ? fb : int(c); moved = Math.min(amount, base); if (moved <= 0) return; return base - moved; });
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

// ════════════════════════════ v2.9: STONK Card ════════════════════════════

// 사용자가 자격되는 최고 카드 등급(신용등급 또는 VIP 등급 조건 중 하나만 충족하면 됨). 없으면 "".
export function cardEligibleTier(bank) {
  const grade = gradeFromScore(bank.creditScore);
  const vt = bank.vipTier || "NORMAL";
  let best = "";
  for (const t of CARD_TIER_ORDER) {
    const p = CARD_TIERS[t];
    if (gradeRank(grade) >= gradeRank(p.minGrade) || vipRank(vt) >= vipRank(p.minVip)) best = t;
  }
  return best;
}
export function cardCanIssue(bank, tier) {
  const p = CARD_TIERS[tier]; if (!p) return false;
  const grade = gradeFromScore(bank.creditScore);
  return gradeRank(grade) >= gradeRank(p.minGrade) || vipRank(bank.vipTier || "NORMAL") >= vipRank(p.minVip);
}
export function cardRemaining(card) { return Math.max(0, int(card && card.cardLimit) - int(card && card.usedAmount)); }

// 카드 발급
export async function issueCard(uid, tier, state) {
  const bank = { ...state.bank };
  if (bank.card && bank.card.enabled) throw new Error("이미 카드를 발급했습니다. 업그레이드를 이용하세요.");
  const p = CARD_TIERS[tier];
  if (!p) throw new Error("카드 등급을 선택하세요.");
  if (!cardCanIssue(bank, tier)) throw new Error(`${p.title} 발급 조건(신용 ${p.minGrade}↑ 또는 VIP ${vipTierLabel(p.minVip)}↑)을 충족하지 않습니다.`);
  const now = Date.now();
  const card = Object.assign(defaultCard(now), { enabled: true, cardTier: tier, cardLimit: p.limit });
  await update(bankRef(uid), { card });
  await addTx(uid, txItem("card_issue", `${p.title} 발급`, 0, int(state.cash), int(state.cash), `한도 ${won(p.limit)}`));
  await addMessage(uid, { type: "card", title: "STONK Card 발급 완료", body: `${p.title}(게임머니 신용카드)가 발급되었습니다. 한도 ${won(p.limit)}.`, relatedId: "cardissue-" + now });
  return `${p.title} 발급 완료`;
}

// 카드 업그레이드(등급 변경 — 미사용/정상 상태에서만 권장)
export async function upgradeCard(uid, tier, state) {
  const bank = { ...state.bank };
  if (!bank.card || !bank.card.enabled) throw new Error("먼저 카드를 발급하세요.");
  const p = CARD_TIERS[tier];
  if (!p) throw new Error("카드 등급을 선택하세요.");
  if (!cardCanIssue(bank, tier)) throw new Error(`${p.title} 조건을 충족하지 않습니다.`);
  if (int(bank.card.billingAmount) > 0 || bank.card.overdue) throw new Error("미납 청구액이 있으면 업그레이드할 수 없습니다.");
  await update(bankRef(uid), { "card/cardTier": tier, "card/cardLimit": p.limit, "card/updatedAt": Date.now() });
  await addTx(uid, txItem("card_upgrade", `${p.title} 전환`, 0, int(state.cash), int(state.cash), `한도 ${won(p.limit)}`));
  await addMessage(uid, { type: "card", title: "카드 등급 변경", body: `${p.title}로 변경되었습니다. 한도 ${won(p.limit)}.`, relatedId: "cardup-" + Date.now() });
  return `${p.title}로 변경 완료`;
}

// 카드 납부(현금→청구액 상환). 전액/일부 모두 허용.
export async function payCard(uid, amount, state) {
  let bank = await commitSettle(uid, { ...state.bank }, state.cash);
  const c = bank.card;
  if (!c || !c.enabled) throw new Error("카드가 없습니다.");
  const owed = Math.max(int(c.billingAmount), int(c.usedAmount));
  if (owed <= 0) throw new Error("납부할 청구액이 없습니다.");
  let pay = Math.min(Math.max(0, int(amount)), owed);
  if (pay <= 0) throw new Error("금액을 확인하세요.");
  if (pay > int(state.cash)) throw new Error("보유 현금이 부족합니다.");
  const fb = int(state.cash);
  const res = await runTransaction(cashRef(uid), (cv) => { const base = (cv == null) ? fb : int(cv); if (base < pay) return; return base - pay; });
  if (!res.committed) throw new Error("보유 현금이 부족합니다.");
  c.usedAmount = Math.max(0, int(c.usedAmount) - pay);
  c.billingAmount = Math.max(0, int(c.billingAmount) - pay);
  let fully = false;
  if (c.usedAmount <= 0) { // 전액 완납 → 사이클 초기화 + 정지 해제 + 신용 소폭 +
    c.usedAmount = 0; c.billingAmount = 0; c.overdue = false; c.dueAt = 0; c.lastBilledAt = 0; c.lastOverdueProcessedAt = 0; c.suspended = false;
    bank.creditScore = clampScore(bank.creditScore + 1); fully = true;
  } else if (c.billingAmount <= 0) { c.overdue = false; }
  // 카드 캐시백 이벤트: 납부 시 VIP 점수 +1(비현금 보상)
  const ef = eventEffects(activeEvent);
  if (ef.cardCashbackVip > 0) bank.vipScore = clampScore(bank.vipScore + ef.cardCashbackVip);
  // PLATINUM/BLACK 카드: 이용 시 VIP 소폭(여기선 납부 시 +0~ 유지) — 과도 방지로 생략
  bank = computeVip(bank, state.cash);
  bank.creditGrade = gradeFromScore(bank.creditScore);
  await update(bankRef(uid), pruneBank(bank));
  const beforeCash = int(state.cash);
  await addTx(uid, txItem("card_pay", "카드 납부", -pay, beforeCash, beforeCash - pay, fully ? "전액 납부 완료" : `일부 납부 · 잔여 ${won(c.usedAmount)}`));
  await addMessage(uid, { type: "card", title: "카드 납부 완료", body: `${won(pay)} 납부되었습니다.${fully ? " 청구액을 모두 정리했습니다." : ` 남은 청구 ${won(c.usedAmount)}.`}${ef.cardCashbackVip > 0 ? " (캐시백 이벤트: VIP+1)" : ""}`, amount: -pay, relatedId: "cardpay-" + Date.now() });
  return fully ? "카드 전액 납부 완료" : `카드 납부 완료 (잔여 ${won(c.usedAmount)})`;
}

// 카드 복구(정지 해제) — 청구/미납이 모두 정리된 경우에만
export async function restoreCard(uid, state) {
  const bank = { ...state.bank };
  const c = bank.card;
  if (!c || !c.enabled) throw new Error("카드가 없습니다.");
  if (!c.suspended) throw new Error("정지 상태가 아닙니다.");
  if (int(c.usedAmount) > 0 || int(c.billingAmount) > 0 || c.overdue) throw new Error("미납 청구액을 먼저 정리하세요.");
  await update(bankRef(uid), { "card/suspended": false, "card/overdueCount": 0, "card/updatedAt": Date.now() });
  await addTx(uid, txItem("card_restore", "카드 사용 복구", 0, int(state.cash), int(state.cash), "정지 해제"));
  await addMessage(uid, { type: "card", title: "카드 사용 복구", body: "STONK Card 사용이 복구되었습니다.", relatedId: "cardrestore-" + Date.now() });
  return "카드 사용이 복구되었습니다";
}

// 카드 자동납부 설정 토글
export async function setAutoPay(uid, enabled, mode, state) {
  const c = state.bank && state.bank.card;
  if (!c || !c.enabled) throw new Error("먼저 카드를 발급하세요.");
  const m = enabled ? (mode === "minimum" ? "minimum" : "full") : "off";
  await update(bankRef(uid), { "card/autoPayEnabled": !!enabled, "card/autoPayMode": m, "card/updatedAt": Date.now() });
  await addTx(uid, txItem("card_restore", enabled ? "카드 자동납부 켜짐" : "카드 자동납부 꺼짐", 0, int(state.cash), int(state.cash), `모드 ${m}`));
  return enabled ? "자동납부가 켜졌습니다(전액 자동납부)." : "자동납부가 꺼졌습니다.";
}

// 관리자 투자 강제정산(Bank 모듈 외부에서도 동일 공식 사용 가능하도록 export)
export function settleInvestmentValue(v) { return investOutcome(v); }
