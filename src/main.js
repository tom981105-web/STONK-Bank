// src/main.js — STONK Bank 진입점 (세션 게이트 · 로드 · 렌더 · 바인딩)
import "./style.css";
import { isConfigured, getCurrentUserOnce } from "./firebase.js";
import { showHomeGate, isLocalDev } from "./homeGate.js";
import * as Bank from "./services/bank.js";

const {
  won, int, num, fixedTotal, netWorth, gradeFromScore, loanLimit, FIXED_PRODUCTS,
  INSURANCE_PRODUCTS, INVESTMENT_PRODUCTS, VIP_INVESTMENT_PRODUCTS, investProduct,
  investmentsValue, investOutcome, investLabel,
  loanRisk, depositStability, activeInsurances, insuranceActive, buyInsurance,
  buyInvestment, claimInvestment, vipTierLabel, vipVaultUnlocked, depositVip, withdrawVip,
  VIP_VAULT_RATE_DAY, VIP_VAULT_MIN_TIER, vipDiscount, vipVaultRate, vipRank,
  markMessageRead, markAllMessagesRead, unreadCount,
  CARD_TIERS, CARD_TIER_ORDER, cardEligibleTier, cardCanIssue, cardRemaining,
  issueCard, upgradeCard, payCard, restoreCard, eventEffects,
  cardMinPay, rateInfo, setAutoPay,
} = Bank;

const ADMIN_UID = "yaV8N60yIiUggaWNpNF2VhkCwxb2";
const ADMIN_EMAIL = "tomem@naver.com";

const app = document.getElementById("app");
let state = null;     // { uid, cash, nickname, bank, tx }
let isAdmin = false;  // 관리자 네비 노출 여부 (boot 에서 1회 결정 · reload 후에도 유지)
let tab = "dashboard";
let histFilter = "all"; // 거래내역 필터(클라이언트 필터)
let cardHistFilter = "all"; // 카드 사용 내역 필터
let busy = false;
let feedShown = false; // 정산 피드백은 접속 1회만

// ---------- 부트 ----------
boot();
async function boot() {
  if (!isConfigured) { fatal("Firebase 설정이 비어 있습니다."); return; }
  renderLoading();
  let user = null;
  try { user = await getCurrentUserOnce(); } catch (e) {}
  if (!user) {
    // 미로그인 → Home 으로 안내(별도 로그인 화면 만들지 않음)
    showHomeGate({ message: "STONK Home에서 로그인 후 이용해 주세요. 같은 계정의 자산이 그대로 연결됩니다." });
    renderGate();
    return;
  }
  try {
    isAdmin = (user.uid === ADMIN_UID || String(user.email || "").toLowerCase() === ADMIN_EMAIL);
    state = await Bank.loadState(user.uid);
    render();
    maybeShowFeed();
  } catch (e) {
    console.error("[bank] 로드 실패:", e);
    fatal("은행 데이터를 불러오지 못했습니다: " + (e && e.message));
  }
}

async function reload() {
  if (!state) return;
  try { state = await Bank.loadState(state.uid); } catch (e) { console.warn(e); }
  render();
}

// ---------- 공용 ----------
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function toast(msg, kind = "ok") {
  const t = document.createElement("div");
  t.className = "bk-toast " + kind;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.classList.add("hide"); setTimeout(() => t.remove(), 280); }, 2200);
}
async function act(fn) {
  if (busy) return; busy = true;
  try { const msg = await fn(); if (msg) toast(msg, "ok"); await reload(); }
  catch (e) { toast((e && e.message) || "오류가 발생했습니다.", "err"); }
  finally { busy = false; }
}
function fieldVal(id) { const el = document.getElementById(id); return el ? Math.floor(Number(el.value) || 0) : 0; }
function prefersReduced() { try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (_) { return false; } }
// 카드 납부 입력 시 '납부 후 예상 청구액' 미리보기
function updateCardPayPreview() {
  const el = document.getElementById("cardPayPreview");
  if (!el || !state) return;
  const c = (state.bank && state.bank.card) || {};
  const owed = Math.max(int(c.billingAmount), int(c.usedAmount));
  const v = fieldVal("cardPayAmt");
  if (v <= 0) { el.textContent = ""; return; }
  if (v > int(state.cash)) { el.textContent = "보유 현금을 초과합니다."; el.style.color = "var(--red)"; return; }
  const pay = Math.min(v, owed);
  const after = Math.max(0, owed - pay);
  el.style.color = "";
  el.textContent = `납부 ${won(pay)} → 남은 청구액 ${won(after)}${after <= 0 ? " · 미납/정지 해제 + 신용 회복" : ""}`;
}
// 고액 기준: 1,000만원 이상 또는 보유현금의 30% 이상
function isHighValue(amount) { amount = Math.floor(Number(amount) || 0); return amount >= 10000000 || (state && state.cash > 0 && amount >= state.cash * 0.3); }
function highValueAct(amount, label, fn) {
  if (!isHighValue(amount)) return act(fn);
  const dim = document.createElement("div");
  dim.className = "bk-modal-dim";
  dim.innerHTML = `<div class="bk-modal">
    <h3>고액 거래 확인</h3>
    <p class="bk-modal-amt">${won(amount)}</p>
    <p class="bk-note">STONK 가상 게임머니 거래입니다. 진행하시겠어요?</p>
    <div class="bk-modal-stage" hidden><span class="bk-spin"></span> <span class="bk-modal-label">${esc(label || "처리 중...")}</span></div>
    <div class="bk-modal-btns"><button class="bk-btn" data-mc="cancel" type="button">취소</button><button class="bk-btn primary" data-mc="ok" type="button">확인</button></div>
  </div>`;
  document.body.appendChild(dim);
  const close = () => dim.remove();
  dim.querySelector('[data-mc="cancel"]').onclick = close;
  dim.addEventListener("click", (e) => { if (e.target === dim) close(); });
  dim.querySelector('[data-mc="ok"]').onclick = () => {
    dim.querySelector(".bk-modal-btns").hidden = true;
    dim.querySelector(".bk-modal-stage").hidden = false;
    setTimeout(() => { close(); act(fn); }, prefersReduced() ? 0 : 600);
  };
}

// ---------- 렌더 ----------
function renderLoading() { app.innerHTML = `<div class="bk-center"><div class="bk-spin"></div><p>STONK Bank 연결 중…</p></div>`; }
function fatal(m) { app.innerHTML = `<div class="bk-center"><h2>⚠️ 오류</h2><p>${esc(m)}</p><a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로</a></div>`; }
function renderGate() {
  app.innerHTML = `<div class="bk-center">
    <div class="bk-logo"><span class="bk-mark">$</span><b>STONK</b> Bank</div>
    <h2>로그인이 필요합니다</h2>
    <p class="muted">STONK Home에서 로그인 후 이용해 주세요.<br>같은 계정의 보유 현금이 그대로 연결됩니다.</p>
    <a class="bk-btn primary" href="../STONK-Home/index.html">STONK Home으로 이동</a>
  </div>`;
}

function gradeBadge(grade) { return `<span class="bk-grade g-${grade}">${grade}</span>`; }

function render() {
  if (!state) return;
  const b = state.bank;
  const totalDeposit = int(b.balance) + fixedTotal(b);
  const nw = netWorth(state.cash, b);
  const grade = gradeFromScore(b.creditScore);
  app.className = b.vipTier === "BLACK" ? "is-black" : "";
  app.innerHTML = `
    <header class="bk-header">
      <a class="bk-brand" href="#" data-home title="STONK Bank 메인"><span class="bk-mark">$</span><b>STONK</b> Bank</a>
      <div class="bk-nav">
        <a href="../STONK-Home/index.html">홈</a>
        <a href="../STONK-Battle/index.html">주식시장</a>
        <a href="../STONK-Board/index.html">주식소식</a>
        <a href="../STONK-Wiki/index.html">주식정보</a>
        <a href="../STONK-Arcade/index.html">아케이드</a>
        <a href="../STONK-Gacha/index.html">가챠</a>
        ${isAdmin ? `<a href="../STONK-Admin/market-admin.html">관리자</a>` : ""}
      </div>
      <div class="bk-user">
        <button class="bk-bell" type="button" data-tab="messages" title="알림/우편함" aria-label="알림">🔔${state.unread > 0 ? `<span class="bk-bell-dot">${state.unread > 99 ? "99+" : state.unread}</span>` : ""}</button>
        <span class="bk-nick">${esc(state.nickname)}</span>${vipBadge(b.vipTier)}${gradeBadge(grade)}
      </div>
    </header>

    <section class="bk-summary">
      <div class="bk-sum-card net"><span>순자산</span><b class="${nw < 0 ? "minus" : ""}">${won(nw)}</b></div>
      <div class="bk-sum-card cash"><span>보유 현금</span><b>${won(state.cash)}</b></div>
      <div class="bk-sum-card dep"><span>총 예금</span><b>${won(totalDeposit)}</b></div>
      <div class="bk-sum-card loan"><span>대출 잔액</span><b class="${int(b.loanPrincipal) > 0 ? "warn" : ""}">${won(b.loanPrincipal)}</b></div>
    </section>

    <nav class="bk-tabs">
      ${["dashboard:대시보드", "deposit:예금", "loan:대출", "card:카드", "insurance:보험", "invest:투자", "vip:VIP", "messages:알림", "history:거래내역"].map((t) => {
        const [k, label] = t.split(":");
        return `<button class="bk-tab ${tab === k ? "active" : ""}" data-tab="${k}">${label}</button>`;
      }).join("")}
    </nav>

    <main class="bk-main">${tabBody(tab)}</main>
    <footer class="bk-footer">모든 금액은 STONK 가상 게임머니입니다. 실제 화폐·투자와 무관합니다.</footer>
  `;
  bind();
}

function tabBody(t) {
  if (t === "deposit") return depositTab();
  if (t === "loan") return loanTab();
  if (t === "insurance") return insuranceTab();
  if (t === "invest") return investTab();
  if (t === "vip") return vipTab();
  if (t === "card") return cardTab();
  if (t === "messages") return messagesTab();
  if (t === "history") return historyTab();
  return dashboardTab();
}

// ── 오늘의 금융 이벤트 ──
function eventBanner() {
  const ev = state.event; if (!ev) return "";
  return `<div class="bk-event-banner ev-${esc(ev.type)}">
    <span class="bk-event-ico">📰</span>
    <div><b>오늘의 금융 이벤트 · ${esc(ev.title)}</b><small>${esc(ev.desc)} <i class="muted">(게임머니 금융 이벤트)</i></small></div>
  </div>`;
}
// 이벤트 효과 시각화 카드(기본값 vs 현재값)
function eventEffectCard() {
  const ev = state.event; if (!ev) return "";
  const ef = eventEffects(ev), ri = rateInfo(state.bank), rows = [];
  if (ri.free.now !== ri.free.base) rows.push(["자유예금 이자/일", `${(ri.free.base * 100).toFixed(2)}% → ${(ri.free.now * 100).toFixed(2)}%`, ri.free.now < ri.free.base]);
  if (ri.loan.now !== ri.loan.base) rows.push(["대출 이자/일", `${(ri.loan.base * 100).toFixed(2)}% → ${(ri.loan.now * 100).toFixed(2)}%`, ri.loan.now < ri.loan.base]);
  if (ef.insExtraDisc > 0) rows.push(["보험 추가 할인", `+${Math.round(ef.insExtraDisc * 100)}% (총 최대 20%)`, true]);
  if (ef.investMinAdd || ef.investMaxAdd) rows.push(["신규 투자 기대범위", `${ef.investMinAdd ? (ef.investMinAdd > 0 ? "+" : "") + (ef.investMinAdd * 100).toFixed(0) + "%p 하단 " : ""}${ef.investMaxAdd ? (ef.investMaxAdd > 0 ? "+" : "") + (ef.investMaxAdd * 100).toFixed(0) + "%p 상단" : ""}`.trim(), ef.investMaxAdd > 0]);
  if (ef.vipVaultAdd > 0) rows.push(["VIP 금고 이자/일", `+${(ef.vipVaultAdd * 100).toFixed(3)}%`, true]);
  if (ef.vipGainMult !== 1) rows.push(["VIP 점수 획득", `×${ef.vipGainMult.toFixed(1)}`, true]);
  if (ef.cardCashbackVip > 0) rows.push(["카드 납부 보상", `VIP +${ef.cardCashbackVip} (현금 캐시백 없음)`, true]);
  const dueLeft = ev.expiresAt ? Math.max(0, num(ev.expiresAt) - Date.now()) : 0;
  return `<div class="bk-card event-fx ev-${esc(ev.type)}" style="grid-column:1/-1">
    <h3>📰 오늘의 금융 이벤트 · ${esc(ev.title)} ${ev.expiresAt ? `<small class="muted">남은 ${fmtLeft(dueLeft)}</small>` : `<small class="muted">날짜 기반</small>`}</h3>
    <p class="bk-note">${esc(ev.desc || "")} <i class="muted">(게임머니 금융 이벤트)</i></p>
    <div class="bk-grid" style="grid-template-columns:1fr 1fr;gap:8px">
    ${rows.length ? rows.map((r) => `<div class="bk-row"><span>${esc(r[0])}</span><b class="${r[2] ? "ok" : "warn"}">${esc(r[1])}</b></div>`).join("") : `<div class="bk-row"><span>효과</span><b class="muted">표시·경고 위주(수익/할인 없음)</b></div>`}
    </div>
  </div>`;
}
// 금리 비교 카드
function rateCompareCard() {
  const ri = rateInfo(state.bank);
  const r = (o) => `${(o.base * 100).toFixed(2)}%${o.now !== o.base ? ` → <b class="${o.now < o.base ? "ok" : "warn"}">${(o.now * 100).toFixed(2)}%</b>` : ""}`;
  return `<div class="bk-card">
    <h3>금리 비교 <span class="bk-tag ${ri.eventActive ? "safe" : ""}">${ri.eventActive ? "이벤트 반영" : "기본"}</span></h3>
    <div class="bk-row"><span>자유예금 / 일</span><b>${r(ri.free)}</b></div>
    <div class="bk-row"><span>대출 / 일</span><b>${r(ri.loan)}</b></div>
    <div class="bk-row"><span>VIP 금고 / 일</span><b>${r(ri.vipVault)}</b></div>
    <p class="bk-note">현재 금리는 오늘의 금융 이벤트가 반영된 <b>신규 거래 기준</b>입니다. 기존 투자상품 결과는 가입 당시 조건을 유지합니다.</p>
  </div>`;
}
// 금고 시각 오브젝트
function vaultLevel(bal) { bal = int(bal); if (bal <= 0) return { lv: 0, label: "빈 금고" }; if (bal < 5000000) return { lv: 1, label: "소형 금고" }; if (bal < 50000000) return { lv: 2, label: "중형 금고" }; if (bal < 100000000) return { lv: 3, label: "대형 금고" }; return { lv: 4, label: "프리미엄 금고" }; }
function vaultVisual(b) {
  const free = vaultLevel(b.balance), vip = vaultLevel(b.vipVaultBalance);
  return `<div class="bk-card vault-card ${b.vipTier === "BLACK" ? "black" : ""}">
    <h3>금고</h3>
    <div class="vaults">
      <div class="vault lv-${free.lv}"><div class="vault-ico">🔐</div><span>자유예금</span><b>${won(b.balance)}</b><small>${free.label}</small></div>
      <div class="vault lv-${vip.lv} ${vipVaultUnlocked(b) ? "" : "locked"}"><div class="vault-ico">${vipVaultUnlocked(b) ? "💎" : "🔒"}</div><span>VIP 금고</span><b>${won(b.vipVaultBalance)}</b><small>${vipVaultUnlocked(b) ? vip.label : "GOLD부터"}</small></div>
    </div>
  </div>`;
}

// ── STONK Card ──
const CARD_LABEL = { BASIC: "BASIC", GOLD: "GOLD", PLATINUM: "PLATINUM", BLACK: "BLACK" };
function cardObj() { return (state.bank && state.bank.card) || {}; }
// 카드 발급/업그레이드 성공 시 플립 연출(기능과 무관, 실패해도 발급은 유지)
function cardFlip(tier) {
  try {
    if (prefersReduced()) return;
    const lim = (CARD_TIERS[tier] || {}).limit || 0;
    const dim = document.createElement("div");
    dim.className = "bk-flip-dim";
    dim.innerHTML = `<div class="bk-flip"><div class="bk-flip-inner">
      <div class="bk-flip-front"><span>STONK</span></div>
      <div class="bk-flip-back">${cardVisual({ enabled: true, cardTier: tier, cardLimit: lim, usedAmount: 0, billingAmount: 0 }, true)}</div>
    </div><p>STONK Card 발급 완료 · ${esc(tier)}</p></div>`;
    document.body.appendChild(dim);
    requestAnimationFrame(() => dim.classList.add("go"));
    dim.addEventListener("click", () => dim.remove());
    setTimeout(() => dim.remove(), 1600);
  } catch (_) { /* 연출 실패는 무시 */ }
}
function cardVisual(c, compact) {
  const tier = c.cardTier || "BASIC";
  const used = int(c.usedAmount), limit = int(c.cardLimit) || 1;
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const danger = c.suspended ? "suspended" : c.overdue ? "overdue" : pct >= 80 ? "near" : "";
  return `<div class="stonk-card tier-${tier} ${danger} ${compact ? "compact" : ""}">
    <div class="sc-top"><span class="sc-brand">STONK</span><span class="sc-tier">${CARD_LABEL[tier] || tier}</span></div>
    <div class="sc-num">•••• •••• •••• ${String(1000 + (pct % 9000)).slice(-4)}</div>
    <div class="sc-foot"><span>사용 ${won(used)} / 한도 ${won(c.cardLimit)}</span>${c.suspended ? `<b class="sc-flag">정지</b>` : c.overdue ? `<b class="sc-flag">미납</b>` : ""}</div>
    <div class="sc-gauge"><span style="width:${pct}%"></span></div>
  </div>`;
}
function cardTab() {
  const c = cardObj();
  const elig = cardEligibleTier(state.bank);
  const remain = cardRemaining(c);
  const owed = Math.max(int(c.billingAmount), int(c.usedAmount));
  const dueLeft = int(c.dueAt) > 0 ? Math.max(0, int(c.dueAt) - Date.now()) : 0;
  if (!c.enabled) {
    return `${eventBanner()}
      <div class="bk-grid">
        <div class="bk-card">
          <h3>STONK Card 발급 <span class="bk-tag risk">게임머니 신용카드</span></h3>
          <p class="bk-note">현금이 부족해도 한도 내에서 Gacha·Arcade 결제가 가능한 <b>게임머니 신용 결제 수단</b>입니다. 실제 결제가 아닙니다.</p>
          ${CARD_TIER_ORDER.map((t) => {
            const p = CARD_TIERS[t]; const ok = cardCanIssue(state.bank, t);
            return `<label class="bk-product ${ok ? "" : "locked"}"><input type="radio" name="cardTier" value="${t}" ${t === elig ? "checked" : ""} ${ok ? "" : "disabled"}/>
              <span><b>${p.title} ${ok ? `<small class="bk-tag safe">발급 가능</small>` : `<small class="bk-tag risk">조건 미달</small>`}</b>
              <small>한도 ${won(p.limit)} · 조건 신용 ${p.minGrade}↑ 또는 VIP ${vipTierLabel(p.minVip)}↑ · ${esc(p.perk)}</small></span></label>`;
          }).join("")}
          <button class="bk-btn primary" data-act="cardIssue" ${elig ? "" : "disabled"}>${elig ? "카드 발급" : "발급 조건 미달"}</button>
        </div>
        <div class="bk-card"><h3>안내</h3><p class="bk-note">카드 사용액은 즉시 차감되지 않고 누적되어 <b>24시간 뒤 청구</b>됩니다. 청구 후 12시간 내 미납 시 신용점수가 하락하고, 미납이 누적되면 카드가 정지됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p></div>
      </div>`;
  }
  const upTier = CARD_TIER_ORDER[CARD_TIER_ORDER.indexOf(c.cardTier) + 1];
  const canUp = upTier && cardCanIssue(state.bank, upTier) && !c.overdue && owed <= 0;
  const minPay = cardMinPay(c);
  const benefit = CARD_TIERS[c.cardTier] ? CARD_TIERS[c.cardTier].perk : "";
  return `${eventBanner()}
    <div class="bk-grid">
      <div class="bk-card">
        <h3>내 카드</h3>
        ${cardVisual(c)}
        <div class="bk-row"><span>남은 한도</span><b>${won(remain)}</b></div>
        <div class="bk-row"><span>청구 예정/청구액</span><b class="${owed > 0 ? "warn" : ""}">${won(owed)}</b></div>
        <div class="bk-row"><span>결제일</span><b>${int(c.dueAt) > 0 ? (dueLeft > 0 ? "D-" + fmtLeft(dueLeft) : "도래(납부 필요)") : "이용 없음"}</b></div>
        <div class="bk-row"><span>자동납부</span><b>${c.autoPayEnabled ? statusBadge("ON · 전액", "ok") : statusBadge("OFF", "muted")}</b></div>
        <div class="bk-row"><span>상태</span><b>${c.suspended ? statusBadge("정지", "danger") : c.overdue ? statusBadge("미납", "danger") : statusBadge("정상", "ok")}</b></div>
        <div class="bk-quick"><button class="bk-btn ghost" data-act="autoPayToggle">${c.autoPayEnabled ? "자동납부 끄기" : "자동납부 켜기(전액)"}</button></div>
        <p class="bk-note">${c.autoPayEnabled ? "자동납부 ON — 결제일에 현금이 충분하면 청구액이 자동으로 납부됩니다." : "자동납부를 켜면 결제일에 현금이 충분할 때 청구액이 자동 납부됩니다."}</p>
      </div>
      <div class="bk-card">
        <h3>납부</h3>
        <div class="bk-row"><span>남은 청구액</span><b class="${owed > 0 ? "warn" : ""}">${won(owed)}</b></div>
        <div class="bk-row"><span>납부 가능 현금</span><b>${won(state.cash)}</b></div>
        <div class="bk-amount"><input id="cardPayAmt" type="number" inputmode="numeric" placeholder="납부 금액" min="1" /><span class="bk-suffix">원</span></div>
        <small class="muted" id="cardPayPreview"></small>
        <div class="bk-quick">
          <button class="bk-btn ghost" data-fill="cardPayAmt:maxpay">전액 ${won(Math.min(owed, int(state.cash)))}</button>
          <button class="bk-btn ghost" data-fill="cardPayAmt:minpay">최소 ${won(minPay)}</button>
        </div>
        <div class="bk-btnrow"><button class="bk-btn primary" data-act="cardPay" ${owed > 0 ? "" : "disabled"}>납부하기</button>
          ${c.suspended ? `<button class="bk-btn" data-act="cardRestore">카드 복구</button>` : canUp ? `<button class="bk-btn" data-act="cardUpgrade" data-tier="${upTier}">${CARD_TIERS[upTier].title} 업그레이드</button>` : `<button class="bk-btn" disabled>${owed > 0 ? "납부 후 업그레이드" : "최고 등급"}</button>`}</div>
        <p class="bk-note">최소납부 = max(청구 10%, 100만). <b>전액 납부 시</b> 미납·정지가 해제되고 신용이 소폭 회복됩니다. 혜택: ${esc(benefit)} · 모든 금액은 게임머니입니다.</p>
      </div>
    </div>
    ${cardHistoryCard()}`;
}

const CARD_HIST = [["all", "전체"], ["use", "사용"], ["bill", "청구"], ["pay", "납부"], ["risk", "미납/정지"]];
const CARD_HIST_SET = { all: null, use: ["card_use", "card_issue", "card_upgrade"], bill: ["card_bill"], pay: ["card_pay", "card_restore"], risk: ["card_overdue", "card_suspend"] };
function cardHistoryCard() {
  const all = (state.tx || []).filter((t) => String(t.type || "").startsWith("card_"));
  const set = CARD_HIST_SET[cardHistFilter];
  const rows = (set ? all.filter((t) => set.includes(t.type)) : all).slice(0, 50);
  const tier = (state.bank.card || {}).cardTier || "";
  return `<div class="bk-card">
    <h3>카드 사용 내역 ${tier ? `<span class="bk-tag safe">${tier}</span>` : ""}<small class="muted"> 최근 ${rows.length}건</small></h3>
    <div class="bk-filters">${CARD_HIST.map(([k, l]) => `<button class="bk-chipbtn ${cardHistFilter === k ? "active" : ""}" data-cardhist="${k}">${l}</button>`).join("")}</div>
    ${rows.length ? `<ul class="bk-tx">${rows.map(txRow).join("")}</ul>` : `<p class="bk-empty">카드 사용 내역이 없습니다.</p>`}
  </div>`;
}

const MSG_ICON = { insurance: "🛡️", investment: "📈", fixed: "🏦", vip: "👑", loan: "⚠️", admin: "🛠️", system: "🔔" };
function msgRow(m) {
  const icon = MSG_ICON[m.type] || "🔔";
  return `<li class="bk-msg ${m.read ? "" : "unread"}" ${m.id && !String(m.id).startsWith("local-") ? `data-msgread="${esc(m.id)}"` : ""}>
    <span class="bk-msg-ico">${icon}</span>
    <div class="bk-msg-mid"><b>${esc(m.title)}</b><small>${esc(m.body)}</small><i class="bk-msg-time">${fmtTime(m.createdAt)}</i></div>
    ${m.actionUrl ? `<a class="bk-btn ghost small" href="${esc(m.actionUrl)}">${esc(m.actionLabel || "이동")}</a>` : ""}
    ${m.read ? "" : `<span class="bk-msg-new">N</span>`}</li>`;
}
function messagesTab() {
  const msgs = (state.msgs || []).slice(0, 30);
  return `<div class="bk-card">
    <h3>알림 / 우편함 <small class="muted">안읽음 ${state.unread || 0} · 최근 ${msgs.length}건</small>
      ${state.unread > 0 ? `<button class="bk-btn ghost small" data-allread style="float:right">전체 읽음</button>` : ""}</h3>
    ${msgs.length ? `<ul class="bk-msgs">${msgs.map(msgRow).join("")}</ul>` : `<p class="bk-empty">받은 알림이 없습니다.</p>`}
    <p class="bk-note">보험 적용·투자/정기 만기·VIP 승급 등 금융 이벤트가 여기에 기록됩니다. 모든 금액은 STONK 가상 게임머니입니다.</p>
  </div>`;
}

// 정산/만기 피드백(접속 1회) — 0원이면 표시 안 함
function maybeShowFeed() {
  if (feedShown || !state || !state.feed) return;
  feedShown = true;
  const f = state.feed, msgs = [];
  if (f.applied && f.freeInt > 0) msgs.push(`자유예금 이자 +${won(f.freeInt)} 정산`);
  if (f.applied && f.vipInt > 0) msgs.push(`VIP 금고 이자 +${won(f.vipInt)} 정산`);
  if (f.applied && f.loanInt > 0) msgs.push(`대출 이자 +${won(f.loanInt)} 반영`);
  if (f.maturedFixed > 0) msgs.push(`정기예금 만기 ${f.maturedFixed}건`);
  if (f.maturedInvest > 0) msgs.push(`투자 정산 가능 ${f.maturedInvest}건`);
  if (msgs.length) toast(msgs.join(" · "), f.loanInt > 0 && !f.freeInt ? "warn" : "ok");
}
function feedBanner() {
  const f = state.feed; if (!f) return "";
  const items = [];
  if (f.applied && f.freeInt > 0) items.push(`<span class="ok">자유예금 이자 +${won(f.freeInt)}</span>`);
  if (f.applied && f.vipInt > 0) items.push(`<span class="ok">VIP 금고 이자 +${won(f.vipInt)}</span>`);
  if (f.applied && f.loanInt > 0) items.push(`<span class="warn">대출 이자 +${won(f.loanInt)}</span>`);
  if (f.maturedFixed > 0) items.push(`<span>정기예금 만기 ${f.maturedFixed}건</span>`);
  if (f.maturedInvest > 0) items.push(`<span>투자 정산 가능 ${f.maturedInvest}건</span>`);
  if (!items.length) return "";
  return `<div class="bk-feed">🔔 ${items.join(" · ")}</div>`;
}

function dashboardTab() {
  const b = state.bank;
  const grade = gradeFromScore(b.creditScore);
  const score = Bank.clampScore(b.creditScore);
  const nw = netWorth(state.cash, b);
  const risk = loanRisk(state.cash, b);
  const stab = depositStability(state.cash, b);
  const f = state.feed || {};
  const todayInt = (f.applied ? int(f.freeInt) + int(f.vipInt) : 0);
  const inv = Object.values(b.investments || {});
  const invMatured = inv.filter((v) => Date.now() >= num(v.maturesAt)).length;
  const invProfit = inv.reduce((a, v) => a + (Date.now() >= num(v.maturesAt) ? investOutcome(v).profit : 0), 0);
  const ins = activeInsurances(b);
  const preview = (state.tx || []).slice(0, 3);
  const c = b.card || {};
  const cardOwed = Math.max(int(c.billingAmount), int(c.usedAmount));
  return `
    ${feedBanner()}
    <div class="bk-grid">
      ${eventEffectCard()}
      <div class="bk-card net-hero">
        <h3>순자산</h3>
        <div class="bk-net-big ${nw < 0 ? "minus" : ""}">${won(nw)}</div>
        <div class="bk-chips">
          <span class="bk-chip"><i>현금</i>${won(state.cash)}</span>
          <span class="bk-chip"><i>예금</i>${won(int(b.balance) + fixedTotal(b))}</span>
          <span class="bk-chip"><i>VIP금고</i>${won(b.vipVaultBalance)}</span>
          <span class="bk-chip"><i>투자</i>${won(investmentsValue(b))}</span>
          <span class="bk-chip ${int(b.loanPrincipal) > 0 ? "warn" : ""}"><i>대출</i>${won(int(b.loanPrincipal) + int(b.loanInterest))}</span>
        </div>
      </div>

      <div class="bk-card credit">
        <h3>신용등급 <span class="bk-tag ${score >= 75 ? "safe" : "risk"}">${grade}</span></h3>
        <div class="bk-credit"><div class="bk-grade-big g-${grade}">${grade}</div><div class="bk-score"><div class="bk-score-bar"><span style="width:${score}%"></span></div><small>${score} / 100 · 한도 ${won(loanLimit(grade))}</small></div></div>
        <div class="bk-row"><span>VIP 등급</span><b>${vipBadge(b.vipTier)} <small class="muted">${b.vipScore}점</small></b></div>
      </div>

      <div class="bk-card">
        <h3>리스크 진단</h3>
        <div class="bk-row"><span>대출 위험도</span><b>${statusBadge(risk.label, risk.tone)}${risk.eased ? ` <small class="muted">유예권 적용</small>` : ""}</b></div>
        <div class="bk-row"><span>예금 안정도</span><b class="${stab.tone === "ok" ? "ok" : "muted"}">${stab.label}</b></div>
        <div class="bk-row"><span>오늘 정산 이자</span><b class="${todayInt > 0 ? "ok" : "muted"}">${todayInt > 0 ? "+" + won(todayInt) : "정산 없음"}</b></div>
        ${risk.key === "high" || risk.key === "severe" ? `<p class="bk-note danger">자산 대비 대출 비중이 높습니다. 상환을 권장합니다.</p>` : ""}
      </div>

      ${vaultVisual(b)}
      ${rateCompareCard()}

      <div class="bk-card">
        <h3>보험 <span class="bk-tag safe">${ins.length}건 유효</span></h3>
        ${ins.length ? ins.map((i) => `<div class="bk-row"><span>${esc(i.title)}</span><b class="ok">유효</b></div>`).join("") : `<p class="bk-empty">가입한 보험이 없습니다.</p>`}
        <button class="bk-btn ghost small" data-tab="insurance">보험 보기</button>
      </div>

      <div class="bk-card">
        <h3>투자상품</h3>
        <div class="bk-row"><span>보유 상품</span><b>${inv.length}건</b></div>
        <div class="bk-row"><span>정산 가능</span><b class="${invMatured > 0 ? "ok" : "muted"}">${invMatured}건</b></div>
        <div class="bk-row"><span>정산 가능 평가손익</span><b class="${invProfit > 0 ? "ok" : invProfit < 0 ? "warn" : "muted"}">${invProfit >= 0 ? "+" : "−"}${won(Math.abs(invProfit))}</b></div>
        <button class="bk-btn ghost small" data-tab="invest">투자 보기</button>
      </div>

      <div class="bk-card">
        <h3>VIP</h3>
        <div class="bk-row"><span>등급 / 점수</span><b>${vipBadge(b.vipTier)} ${b.vipScore}점</b></div>
        <div class="bk-row"><span>VIP 금고</span><b>${won(b.vipVaultBalance)} <small class="muted">${vipVaultUnlocked(b) ? "" : "· 잠금"}</small></b></div>
        <button class="bk-btn ghost small" data-tab="vip">VIP 보기</button>
      </div>

      <div class="bk-card">
        <h3>알림 <span class="bk-tag ${state.unread > 0 ? "risk" : "safe"}">안읽음 ${state.unread || 0}</span><button class="bk-btn ghost small" data-tab="messages" style="float:right">전체 보기</button></h3>
        ${(state.msgs || []).length ? `<ul class="bk-msgs mini">${(state.msgs || []).slice(0, 3).map(msgRow).join("")}</ul>` : `<p class="bk-empty">받은 알림이 없습니다.</p>`}
      </div>

      <div class="bk-card">
        <h3>STONK Card <span class="bk-tag ${c.suspended ? "risk" : c.overdue ? "risk" : c.enabled ? "safe" : ""}">${c.enabled ? (c.suspended ? "정지" : c.overdue ? "미납" : "정상") : "미발급"}</span><button class="bk-btn ghost small" data-tab="card" style="float:right">카드</button></h3>
        ${c.enabled ? cardVisual(c, true) + `<div class="bk-row"><span>청구 예정/청구</span><b class="${cardOwed > 0 ? "warn" : ""}">${won(cardOwed)}</b></div>` : `<p class="bk-empty">카드를 발급하면 한도 내 게임머니 신용 결제가 가능합니다.</p>`}
      </div>

      <div class="bk-card">
        <h3>Activity Feed <small class="muted">최근 활동</small></h3>
        ${activityFeed().length ? `<ul class="bk-activity">${activityFeed().slice(0, 8).map(activityRow).join("")}</ul>` : `<p class="bk-empty">최근 활동이 없습니다.</p>`}
      </div>

      <div class="bk-card">
        <h3>최근 거래 <button class="bk-btn ghost small" data-tab="history" style="float:right">전체 보기</button></h3>
        ${preview.length ? `<ul class="bk-tx mini">${preview.map(txRow).join("")}</ul>` : `<p class="bk-empty">거래내역이 없습니다.</p>`}
      </div>
    </div>`;
}

function statusBadge(label, tone) { return `<span class="bk-status ${tone}">${esc(label)}</span>`; }
function vipBadge(tier) { return `<span class="bk-vip v-${tier || "NORMAL"}">${esc(vipTierLabel(tier))}</span>`; }

// ── Activity Feed (기존 tx 기반, 추가 조회 없음) ──
const ACT_ICON = { deposit: "🏦", withdraw: "🏧", fixedOpen: "📦", fixedCancel: "📦", fixedClaim: "📦", loan: "📝", repay: "✅", interest: "💰", loanInterest: "⚠️", vipInterest: "👑", insurance_buy: "🛡️", insurance_used: "🛡️", investment_buy: "📈", investment_settle: "📊", vip_deposit: "👑", vip_withdraw: "👑", vip_tier_up: "⭐", card_issue: "💳", card_upgrade: "💳", card_use: "💳", card_pay: "✅", card_bill: "🧾", card_overdue: "🚨", card_suspend: "⛔", card_restore: "🔓", admin_adjust: "🛠️" };
function activityText(t) {
  const amt = int(t.amount);
  switch (t.type) {
    case "deposit": return `예금 ${won(amt)}이 금고에 보관되었습니다.`;
    case "withdraw": return `예금 ${won(Math.abs(amt))}을 인출했습니다.`;
    case "loan": return `대출 ${won(amt)}이 승인되었습니다.`;
    case "repay": return `대출 ${won(Math.abs(amt))}을 상환했습니다.`;
    case "fixedClaim": return `정기예금 ${won(amt)}을 수령했습니다.`;
    case "investment_settle": return `${t.title}${t.memo ? " · " + t.memo : ""}`;
    case "insurance_used": return `${t.title}.`;
    case "card_issue": return `STONK Card가 발급되었습니다.`;
    case "card_use": return `STONK Card 결제가 승인되었습니다. (${won(amt)})`;
    case "card_pay": return `카드 청구액 ${won(Math.abs(amt))}이 납부되었습니다.`;
    case "card_overdue": return `카드 미납이 발생했습니다.`;
    case "vip_tier_up": return `VIP 등급이 상승했습니다.${t.memo ? " (" + t.memo + ")" : ""}`;
    default: return `${t.title || t.type}${amt ? " · " + (amt >= 0 ? "+" : "−") + won(Math.abs(amt)) : ""}`;
  }
}
function activityFeed() { return (state.tx || []).slice(0, 12); }
function activityRow(t) { return `<li class="bk-act"><span class="bk-act-ico">${ACT_ICON[t.type] || "•"}</span><span class="bk-act-text">${esc(activityText(t))}</span><i class="bk-act-time">${fmtTime(t.createdAt)}</i></li>`; }

// ── 보험 통계(tx + insurances 기반, 추가 조회 없음) ──
function insuranceStats() {
  const tx = state.tx || [];
  const inss = Object.values((state.bank && state.bank.insurances) || {});
  const used = inss.filter((i) => i.status === "used").length;
  const expired = inss.filter((i) => i.status === "expired").length;
  let arcadeRefund = 0, gachaDust = 0, loanGrace = 0;
  tx.forEach((t) => {
    if (t.type !== "insurance_used") return;
    if (/Arcade/.test(t.title || "")) arcadeRefund += int(t.amount);
    else if (/Gacha/.test(t.title || "")) gachaDust += 1;
    else if (/유예/.test(t.title || "")) loanGrace += 1;
  });
  return { total: inss.length, used, expired, arcadeRefund, gachaDust, loanGrace };
}

function depositTab() {
  const b = state.bank;
  const fixedList = Object.values(b.fixed || {}).sort((a, b2) => num(a.maturesAt) - num(b2.maturesAt));
  const now = Date.now();
  return `
    <div class="bk-grid">
      <div class="bk-card">
        <h3>자유예금 <span class="bk-tag safe">자유 입출금</span></h3>
        <div class="bk-row"><span>예금 잔액</span><b>${won(b.balance)}</b></div>
        <div class="bk-amount">
          <input id="freeAmt" type="number" inputmode="numeric" placeholder="금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick">
          <button class="bk-btn ghost" data-fill="freeAmt:maxin">최대 입금</button>
          <button class="bk-btn ghost" data-fill="freeAmt:maxout">최대 출금</button>
        </div>
        <div class="bk-btnrow">
          <button class="bk-btn primary" data-act="deposit">입금하기</button>
          <button class="bk-btn" data-act="withdraw">출금하기</button>
        </div>
        <p class="bk-note">보유 현금 ${won(state.cash)} · 이자 하루 ${(Bank.FREE_RATE_DAY * 100).toFixed(1)}%</p>
      </div>

      <div class="bk-card">
        <h3>정기예금 <span class="bk-tag safe">묶을수록 이자↑</span></h3>
        ${Object.values(FIXED_PRODUCTS).map((p) => `
          <label class="bk-product"><input type="radio" name="fixedProd" value="${p.id}" ${p.id === "d1" ? "checked" : ""}/><span><b>${p.label}</b><small>${p.desc}</small></span></label>`).join("")}
        <div class="bk-amount">
          <input id="fixedAmt" type="number" inputmode="numeric" placeholder="가입 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <button class="bk-btn primary" data-act="openFixed">정기예금 가입</button>
        <p class="bk-note">만기 전 해지 시 <b>원금만</b> 반환됩니다(이자 미지급).</p>
      </div>
    </div>

    <div class="bk-card">
      <h3>보유 정기예금</h3>
      ${fixedList.length ? `<div class="bk-fixedlist">${fixedList.map((f) => {
        const matured = now >= num(f.maturesAt);
        const left = Math.max(0, num(f.maturesAt) - now);
        const interest = Math.floor(int(f.amount) * num(f.rate));
        return `<div class="bk-fixed ${matured ? "matured" : ""}">
          <div><b>${esc(f.label)}</b><small>${won(f.amount)} · 이자 ${won(interest)} ${matured ? "· <span class='ok'>만기 완료</span>" : "· 남은 시간 " + fmtLeft(left)}</small></div>
          <div class="bk-fixed-act">
            ${matured ? `<button class="bk-btn primary small" data-claim="${esc(f.id)}">수령하기</button>` : `<button class="bk-btn small" data-cancel="${esc(f.id)}">중도해지</button>`}
          </div>
        </div>`;
      }).join("")}</div>` : `<p class="bk-empty">가입한 정기예금이 없습니다.</p>`}
    </div>`;
}

function loanTab() {
  const b = state.bank;
  const grade = gradeFromScore(b.creditScore);
  const limit = loanLimit(grade);
  const available = Math.max(0, limit - int(b.loanPrincipal));
  return `
    <div class="bk-grid">
      <div class="bk-card loanbox">
        <h3>대출 받기 <span class="bk-tag risk">위험</span></h3>
        <div class="bk-row"><span>내 등급 / 한도</span><b>${gradeBadge(grade)} ${won(limit)}</b></div>
        <div class="bk-row"><span>추가 대출 가능</span><b>${won(available)}</b></div>
        <div class="bk-amount">
          <input id="loanAmt" type="number" inputmode="numeric" placeholder="대출 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="loanAmt:maxloan">최대</button></div>
        <button class="bk-btn danger" data-act="loan" ${limit <= 0 ? "disabled" : ""}>대출 받기</button>
        <p class="bk-note danger">이자 하루 ${(Bank.LOAN_RATE_DAY * 100).toFixed(1)}% — 갚지 않으면 빠르게 불어나고 신용등급이 떨어집니다.</p>
      </div>

      <div class="bk-card">
        <h3>상환하기</h3>
        <div class="bk-row"><span>대출 원금</span><b class="${int(b.loanPrincipal) > 0 ? "warn" : ""}">${won(b.loanPrincipal)}</b></div>
        <div class="bk-row"><span>누적 이자</span><b class="${int(b.loanInterest) > 0 ? "warn" : ""}">${won(b.loanInterest)}</b></div>
        <div class="bk-row total"><span>상환할 금액</span><b>${won(int(b.loanPrincipal) + int(b.loanInterest))}</b></div>
        <div class="bk-amount">
          <input id="repayAmt" type="number" inputmode="numeric" placeholder="상환 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-btnrow">
          <button class="bk-btn primary" data-act="repay">상환하기</button>
          <button class="bk-btn" data-act="repayAll">전액 상환</button>
        </div>
        <p class="bk-note">상환은 <b>이자부터</b> 갚고 남은 금액으로 원금을 갚습니다. 보유 현금 ${won(state.cash)}</p>
      </div>
    </div>`;
}

const TX_TYPE = {
  deposit: ["입금", "in"], withdraw: ["출금", "out"], fixedOpen: ["정기가입", "out"], fixedCancel: ["중도해지", "in"],
  fixedClaim: ["만기수령", "in"], loan: ["대출", "in"], repay: ["상환", "out"], interest: ["예금이자", "in"], loanInterest: ["대출이자", "out"],
  vipInterest: ["VIP이자", "in"], insurance_buy: ["보험가입", "out"], insurance_expired: ["보험만료", "out"], insurance_used: ["보험사용", "in"],
  investment_buy: ["투자가입", "out"], investment_settle: ["투자정산", "in"], investment_cancel: ["투자해지", "in"],
  vip_deposit: ["VIP입금", "in"], vip_withdraw: ["VIP출금", "out"], vip_tier_up: ["VIP승급", "in"],
  card_issue: ["카드발급", "in"], card_upgrade: ["카드전환", "in"], card_use: ["카드결제", "out"], card_bill: ["카드청구", "out"], card_pay: ["카드납부", "out"], card_overdue: ["카드미납", "out"], card_suspend: ["카드정지", "out"], card_restore: ["카드복구", "in"], admin_adjust: ["관리자조정", "in"],
};
// 필터 → 해당 type 집합
const TX_FILTERS = {
  all: null,
  deposit: ["deposit", "withdraw"],
  fixed: ["fixedOpen", "fixedCancel", "fixedClaim"],
  loan: ["loan", "repay"],
  interest: ["interest", "loanInterest", "vipInterest"],
  insurance: ["insurance_buy", "insurance_expired", "insurance_used"],
  invest: ["investment_buy", "investment_settle", "investment_cancel"],
  vip: ["vip_deposit", "vip_withdraw", "vip_tier_up"],
  card: ["card_issue", "card_upgrade", "card_use", "card_bill", "card_pay", "card_overdue", "card_suspend", "card_restore"],
};
const FILTER_LABELS = { all: "전체", deposit: "예금", fixed: "정기예금", loan: "대출", interest: "이자", insurance: "보험", invest: "투자", vip: "VIP", card: "카드" };

function txRow(t) {
  const meta = TX_TYPE[t.type] || [t.type, "in"];
  const amt = int(t.amount);
  const cls = amt >= 0 ? "plus" : "minus";
  return `<li><span class="bk-tx-badge t-${meta[1]}">${meta[0]}</span>
    <div class="bk-tx-mid"><b>${esc(t.title || meta[0])}</b><small>${fmtTime(t.createdAt)}${t.memo ? " · " + esc(t.memo) : ""}</small></div>
    <b class="bk-tx-amt ${cls}">${amt >= 0 ? "+" : "−"}${won(Math.abs(amt))}</b></li>`;
}

function historyTab() {
  const all = state.tx || [];
  const set = TX_FILTERS[histFilter];
  const rows = (set ? all.filter((t) => set.includes(t.type)) : all).slice(0, 50);
  return `<div class="bk-card">
    <h3>거래내역 <small class="muted">${FILTER_LABELS[histFilter]} · ${rows.length}건</small></h3>
    <div class="bk-filters">
      ${Object.keys(TX_FILTERS).map((k) => `<button class="bk-chipbtn ${histFilter === k ? "active" : ""}" data-filter="${k}">${FILTER_LABELS[k]}</button>`).join("")}
    </div>
    ${rows.length ? `<ul class="bk-tx">${rows.map(txRow).join("")}</ul>` : `<p class="bk-empty">${FILTER_LABELS[histFilter]} 거래내역이 없습니다.</p>`}
  </div>`;
}

// 보험 실제 효과 설명(v2.5 실연동)
const INS_DESC = {
  arcade: "Arcade에서 100만원 이상 손실 시 1회에 한해 손실액의 10%를 환급합니다. (자동 적용)",
  gacha: "10회 뽑기에서 Epic 이상이 없거나 Common이 8개 이상일 때 Dust 300을 지급합니다. (자동 적용)",
  loan: "대출 실행 또는 대출 위험도 하락 시 신용점수 하락을 1회 완화합니다. (자동 적용)",
};
function insStatusBadge(i, now) {
  if (i.status === "used") return `<span class="bk-status ok">사용됨</span>`;
  if (i.status === "expired" || num(i.expiresAt) <= now) return `<span class="bk-status muted">만료</span>`;
  return `<span class="bk-status warn">활성</span>`;
}
// ── 보험 탭 ──
function insuranceTab() {
  const b = state.bank;
  const now = Date.now();
  const tier = b.vipTier || "NORMAL";
  const disc = vipDiscount(tier);
  const all = Object.values(b.insurances || {});
  const usedRecent = all.filter((i) => i.status === "used").sort((a, c) => num(c.usedAt) - num(a.usedAt)).slice(0, 3);
  return `
    <div class="bk-grid">
      ${Object.values(INSURANCE_PRODUCTS).map((p) => {
        const mine = all.find((i) => i.type === p.id && insuranceActive(i, now));
        const finalP = Math.max(1, Math.floor(p.premium * (1 - disc)));
        return `<div class="bk-card">
          <h3>${esc(p.title)} ${mine ? `<span class="bk-tag safe">가입중</span>` : `<span class="bk-tag risk">게임머니 보호</span>`}</h3>
          <p class="bk-note">${esc(INS_DESC[p.id] || p.desc)}</p>
          <div class="bk-row"><span>가입비</span><b>${disc > 0 ? `<s class="muted">${won(p.premium)}</s> ${won(finalP)}` : won(p.premium)}</b></div>
          ${disc > 0 ? `<div class="bk-row"><span>VIP 할인</span><b class="ok">${vipTierLabel(tier)} ${Math.round(disc * 100)}%</b></div>` : ""}
          ${mine
            ? `<div class="bk-row"><span>만료까지</span><b class="ok">${fmtLeft(Math.max(0, num(mine.expiresAt) - now))}</b></div>
               <button class="bk-btn" disabled>가입 중</button>`
            : `<button class="bk-btn primary" data-buyins="${p.id}">${won(finalP)} 가입하기</button>`}
        </div>`;
      }).join("")}
    </div>
    <div class="bk-card">
      <h3>보험 통계 <small class="muted">게임머니 보호 기능</small></h3>
      ${(() => { const s = insuranceStats(); return `
        <div class="bk-row"><span>총 가입 / 사용됨 / 만료</span><b>${s.total} / <span class="ok">${s.used}</span> / <span class="muted">${s.expired}</span></b></div>
        <div class="bk-row"><span>Arcade 보험 총 환급액</span><b>${won(s.arcadeRefund)}</b></div>
        <div class="bk-row"><span>Gacha 보호권 지급</span><b>${s.gachaDust}회</b></div>
        <div class="bk-row"><span>대출 유예권 사용</span><b>${s.loanGrace}회</b></div>`; })()}
    </div>
    ${usedRecent.length ? `<div class="bk-card">
      <h3>최근 보험 적용 기록</h3>
      <div class="bk-fixedlist">${usedRecent.map((i) => `<div class="bk-fixed matured"><div><b>${esc(i.title)}</b><small>${i.usedAt ? fmtTime(i.usedAt) + " 적용됨" : "적용됨"}</small></div><span class="bk-status ok">사용됨</span></div>`).join("")}</div>
    </div>` : ""}
    <div class="bk-card">
      <h3>내 보험 내역</h3>
      ${all.length ? `<div class="bk-fixedlist">${all.sort((a, c) => num(c.startedAt) - num(a.startedAt)).map((i) => `
        <div class="bk-fixed ${insuranceActive(i, now) ? "matured" : ""}">
          <div><b>${esc(i.title)}</b><small>${won(i.premium)} · ${insuranceActive(i, now) ? "만료 " + fmtLeft(Math.max(0, num(i.expiresAt) - now)) : (i.status === "used" ? "보상 적용 완료" : "만료됨")}</small></div>
          ${insStatusBadge(i, now)}
        </div>`).join("")}</div>` : `<p class="bk-empty">가입 이력이 없습니다.</p>`}
      <p class="bk-note">보험은 손실을 완화/보호하는 <b>게임머니 보호 기능</b>입니다. 무한 증식 수단이 아닙니다.</p>
    </div>`;
}

// ── 투자 탭 ──
function investTab() {
  const b = state.bank;
  const now = Date.now();
  const mine = Object.values(b.investments || {}).sort((a, b2) => num(a.maturesAt) - num(b2.maturesAt));
  return `
    <div class="bk-grid">
      <div class="bk-card">
        <h3>투자상품 가입 <span class="bk-tag risk">원금 손실 가능</span></h3>
        ${[...Object.values(INVESTMENT_PRODUCTS), ...Object.values(VIP_INVESTMENT_PRODUCTS)].map((p) => {
          const locked = p.requiredVipTier && vipRank(b.vipTier) < vipRank(p.requiredVipTier);
          return `<label class="bk-product ${locked ? "locked" : ""}"><input type="radio" name="invProd" value="${p.id}" ${p.id === "stable" ? "checked" : ""} ${locked ? "disabled" : ""}/>
            <span><b>${esc(p.title)} <small class="bk-risk r-${esc(p.risk)}">${esc(p.risk)}</small>${p.requiredVipTier ? ` <small class="bk-tag ${locked ? "risk" : "safe"}">${vipTierLabel(p.requiredVipTier)} 전용</small>` : ""}</b>
            <small>${fmtDur(p.ms)} · 예상 ${(p.min * 100).toFixed(0)}% ~ +${(p.max * 100).toFixed(0)}%${locked ? ` · ${vipTierLabel(p.requiredVipTier)} 등급 필요` : ""}</small></span></label>`;
        }).join("")}
        <div class="bk-amount">
          <input id="invAmt" type="number" inputmode="numeric" placeholder="투자 금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick"><button class="bk-btn ghost" data-fill="invAmt:maxin">최대</button></div>
        <button class="bk-btn primary" data-act="buyInvest">투자하기</button>
        <p class="bk-note">만기 전 해지는 불가합니다. 결과는 가입 시점에 확정되어 새로고침해도 바뀌지 않습니다. 보유 현금 ${won(state.cash)}</p>
      </div>
      <div class="bk-card">
        <h3>안내</h3>
        <p class="bk-note">Battle의 실시간 매매와 달리, 투자상품은 <b>만기 후 자동 정산</b>되는 금융상품입니다. 레버리지 펀드는 손실 폭이 큽니다.</p>
        <p class="bk-note">모든 결과는 STONK 가상 게임머니 기준입니다.</p>
      </div>
    </div>
    <div class="bk-card">
      <h3>보유 투자상품</h3>
      ${mine.length ? `<div class="bk-fixedlist">${mine.map((v) => {
        const matured = now >= num(v.maturesAt);
        const out = matured ? investOutcome(v) : null;
        const [label, lcls] = out ? investLabel(out.rate) : ["", ""];
        const start = num(v.startedAt) || (num(v.maturesAt) - 1);
        const pct = matured ? 100 : Math.max(0, Math.min(100, Math.round(((now - start) / (num(v.maturesAt) - start)) * 100)));
        const range = `예상 ${(num(v.expectedMinRate) * 100).toFixed(0)}% ~ +${(num(v.expectedMaxRate) * 100).toFixed(0)}%`;
        return `<div class="bk-fixed ${matured ? "matured" : ""}">
          <div style="flex:1;min-width:0"><b>${esc(v.title)}${v.productType === "pbond" || v.productType === "bsecret" ? ` <small class="bk-tag safe">VIP</small>` : ""}</b><small>${won(v.principal)} · ${matured
            ? `<span class="inv-${lcls}">${label} ${out.rate >= 0 ? "+" : "−"}${won(Math.abs(out.profit))}</span>`
            : `${range} · 남은 ${fmtLeft(Math.max(0, num(v.maturesAt) - now))}`}</small>
            <div class="inv-progress"><span style="width:${pct}%"></span></div></div>
          <div class="bk-fixed-act">${matured ? `<button class="bk-btn primary small" data-claiminv="${esc(v.id)}">수령하기</button>` : `<span class="bk-tag">운용중 ${pct}%</span>`}</div>
        </div>`;
      }).join("")}</div>` : `<p class="bk-empty">보유한 투자상품이 없습니다.</p>`}
    </div>`;
}

// 등급별 혜택 안내(표시용)
const VIP_BENEFITS = {
  NORMAL: ["기본 Bank 기능 사용"],
  SILVER: ["보험 가입비 3% 할인", "거래내역 SILVER 표시"],
  GOLD: ["VIP 금고 사용 가능", "보험 가입비 5% 할인", "VIP 금고 이자 하루 0.30%"],
  PLATINUM: ["VIP 금고 이자 하루 0.35%", "보험 가입비 8% 할인", "PLATINUM 안정 채권 해금"],
  BLACK: ["VIP 금고 이자 하루 0.40%", "보험 가입비 10% 할인", "BLACK 시크릿 펀드 해금", "대시보드 BLACK 전용 효과"],
};
// ── VIP 탭 ──
function vipTab() {
  const b = state.bank;
  const unlocked = vipVaultUnlocked(b);
  const tier = b.vipTier || "NORMAL";
  const rate = vipVaultRate(tier) || VIP_VAULT_RATE_DAY;
  return `
    <div class="bk-grid">
      <div class="bk-card credit ${tier === "BLACK" ? "black-card" : ""}">
        <h3>VIP 등급 ${tier === "BLACK" ? `<span class="bk-tag" style="background:#14151c;color:#f0d488">BLACK 혜택 활성화</span>` : ""}</h3>
        <div class="bk-credit"><div class="bk-grade-big v-${tier}">${vipTierLabel(tier).slice(0,1)}</div>
          <div class="bk-score"><div class="bk-score-bar"><span style="width:${b.vipScore}%"></span></div><small>${vipTierLabel(tier)} · ${b.vipScore} / 100</small></div></div>
        <p class="bk-note">예금·정기·투자·보험 이용과 무대출·높은 순자산으로 VIP 점수가 오릅니다. GOLD 등급부터 VIP 금고가 열립니다.</p>
      </div>
      <div class="bk-card">
        <h3>등급별 혜택</h3>
        ${["SILVER","GOLD","PLATINUM","BLACK"].map((t) => `
          <div class="bk-row"><span>${vipBadge(t)}</span><b class="${vipRank(tier) >= vipRank(t) ? "ok" : "muted"}" style="font-weight:600;font-size:12px;text-align:right">${VIP_BENEFITS[t].join(" · ")}</b></div>`).join("")}
      </div>
      <div class="bk-card">
        <h3>VIP 금고 ${unlocked ? `<span class="bk-tag safe">이용 가능</span>` : `<span class="bk-tag risk">GOLD부터 잠금</span>`}</h3>
        <div class="bk-row"><span>금고 잔액</span><b>${won(b.vipVaultBalance)}</b></div>
        <div class="bk-row"><span>내 이자율</span><b class="ok">하루 ${(rate * 100).toFixed(2)}%</b></div>
        ${unlocked ? `
        <div class="bk-amount">
          <input id="vipAmt" type="number" inputmode="numeric" placeholder="금액" min="1" />
          <span class="bk-suffix">원</span>
        </div>
        <div class="bk-quick">
          <button class="bk-btn ghost" data-fill="vipAmt:maxin">최대 입금</button>
          <button class="bk-btn ghost" data-fill="vipAmt:maxvip">최대 출금</button>
        </div>
        <div class="bk-btnrow">
          <button class="bk-btn primary" data-act="vipDeposit">입금하기</button>
          <button class="bk-btn" data-act="vipWithdraw">출금하기</button>
        </div>
        <p class="bk-note">VIP 금고 이자는 등급이 높을수록 올라갑니다(과도한 수익 방지를 위해 낮게 유지). 보유 현금 ${won(state.cash)}</p>`
        : `<p class="bk-note">현재 등급에서는 VIP 금고가 잠겨 있습니다. 예금·투자 등을 이용해 <b>GOLD</b> 등급에 도달하면 열립니다.</p>`}
      </div>
    </div>`;
}

function fmtDur(ms) { const h = Math.round(ms / 3600000); return h + "시간"; }

function fmtLeft(ms) {
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
}
function fmtTime(t) {
  const d = new Date(num(t) || Date.now());
  const p = (n) => (n < 10 ? "0" : "") + n;
  return `${d.getMonth() + 1}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

// ---------- 바인딩 ----------
function bind() {
  const home = app.querySelector("[data-home]");
  if (home) home.addEventListener("click", (e) => { e.preventDefault(); tab = "dashboard"; window.scrollTo(0, 0); render(); });
  app.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => { tab = b.dataset.tab; render(); }));
  app.querySelectorAll("[data-fill]").forEach((b) => b.addEventListener("click", () => fillMax(b.dataset.fill)));
  app.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => onAct(b.dataset.act)));
  app.querySelectorAll("[data-claim]").forEach((b) => b.addEventListener("click", () => act(() => Bank.claimFixed(state.uid, b.dataset.claim, state))));
  app.querySelectorAll("[data-cancel]").forEach((b) => b.addEventListener("click", () => {
    if (confirm("정기예금을 중도해지하면 이자 없이 원금만 돌려받습니다. 해지할까요?")) act(() => Bank.cancelFixed(state.uid, b.dataset.cancel, state));
  }));
  app.querySelectorAll("[data-claiminv]").forEach((b) => b.addEventListener("click", () => act(() => claimInvestment(state.uid, b.dataset.claiminv, state))));
  app.querySelectorAll("[data-buyins]").forEach((b) => b.addEventListener("click", () => {
    const p = INSURANCE_PRODUCTS[b.dataset.buyins];
    if (p && confirm(`${p.title} 가입비 ${won(p.premium)}을(를) 결제할까요? (게임머니)`)) act(() => buyInsurance(state.uid, b.dataset.buyins, state));
  }));
  app.querySelectorAll("[data-filter]").forEach((b) => b.addEventListener("click", () => { histFilter = b.dataset.filter; render(); }));
  app.querySelectorAll("[data-cardhist]").forEach((b) => b.addEventListener("click", () => { cardHistFilter = b.dataset.cardhist; render(); }));
  const payInput = app.querySelector("#cardPayAmt");
  if (payInput) payInput.addEventListener("input", updateCardPayPreview);
  app.querySelectorAll("[data-msgread]").forEach((el) => el.addEventListener("click", () => {
    const m = (state.msgs || []).find((x) => x.id === el.dataset.msgread);
    if (m && !m.read) { m.read = true; state.unread = unreadCount(state.msgs); markMessageRead(state.uid, m.id).catch(() => {}); render(); }
  }));
  const allRead = app.querySelector("[data-allread]");
  if (allRead) allRead.addEventListener("click", () => {
    markAllMessagesRead(state.uid, state.msgs).catch(() => {});
    (state.msgs || []).forEach((m) => { m.read = true; });
    state.unread = 0; render();
  });
}

function fillMax(spec) {
  const [id, kind] = spec.split(":");
  const el = document.getElementById(id);
  if (!el) return;
  const b = state.bank;
  let v = 0;
  if (kind === "maxin") v = int(state.cash);
  else if (kind === "maxout") v = int(b.balance);
  else if (kind === "maxvip") v = int(b.vipVaultBalance);
  else if (kind === "maxloan") v = Math.max(0, loanLimit(gradeFromScore(b.creditScore)) - int(b.loanPrincipal));
  else if (kind === "maxpay") { const c = b.card || {}; v = Math.min(int(state.cash), Math.max(int(c.billingAmount), int(c.usedAmount))); }
  else if (kind === "minpay") { v = cardMinPay(b.card); }
  el.value = v > 0 ? v : "";
  if (id === "cardPayAmt") updateCardPayPreview();
}

function onAct(a) {
  const b = state.bank;
  if (a === "deposit") return act(() => Bank.depositFree(state.uid, fieldVal("freeAmt"), state));
  if (a === "withdraw") return act(() => Bank.withdrawFree(state.uid, fieldVal("freeAmt"), state));
  if (a === "openFixed") {
    const prod = (app.querySelector('input[name="fixedProd"]:checked') || {}).value || "d1";
    return act(() => Bank.openFixed(state.uid, prod, fieldVal("fixedAmt"), state));
  }
  if (a === "loan") { const v = fieldVal("loanAmt"); return highValueAct(v, "대출 심사 중...", () => Bank.takeLoan(state.uid, v, state)); }
  if (a === "repay") { const v = fieldVal("repayAmt"); return highValueAct(v, "상환 처리 중...", () => Bank.repayLoan(state.uid, v, state)); }
  if (a === "buyInvest") {
    const prod = (app.querySelector('input[name="invProd"]:checked') || {}).value || "stable";
    const v = fieldVal("invAmt");
    return highValueAct(v, "투자 계약 체결...", () => buyInvestment(state.uid, prod, v, state));
  }
  if (a === "vipDeposit") return act(() => depositVip(state.uid, fieldVal("vipAmt"), state));
  if (a === "vipWithdraw") return act(() => withdrawVip(state.uid, fieldVal("vipAmt"), state));
  if (a === "cardIssue") {
    const tier = (app.querySelector('input[name="cardTier"]:checked') || {}).value || cardEligibleTier(state.bank);
    if (!tier) { toast("발급 가능한 카드 등급이 없습니다.", "err"); return; }
    return act(async () => { const r = await issueCard(state.uid, tier, state); cardFlip(tier); return r; });
  }
  if (a === "cardUpgrade") { const tier = (app.querySelector('[data-act="cardUpgrade"]') || {}).dataset?.tier; return act(async () => { const r = await upgradeCard(state.uid, tier, state); cardFlip(tier); return r; }); }
  if (a === "cardRestore") return act(() => restoreCard(state.uid, state));
  if (a === "autoPayToggle") { const on = !((state.bank.card || {}).autoPayEnabled); return act(() => setAutoPay(state.uid, on, "full", state)); }
  if (a === "cardPay") {
    const amt = fieldVal("cardPayAmt");
    return highValueAct(amt, "카드 승인 확인 중...", () => payCard(state.uid, amt, state));
  }
  if (a === "repayAll") {
    const total = int(b.loanPrincipal) + int(b.loanInterest);
    if (total <= 0) { toast("상환할 대출이 없습니다.", "err"); return; }
    return act(() => Bank.repayLoan(state.uid, total, state));
  }
}
