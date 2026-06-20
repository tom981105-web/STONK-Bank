// src/main.js — STONK Bank 진입점 (세션 게이트 · 로드 · 렌더 · 바인딩)
import "./style.css";
import { isConfigured, getCurrentUserOnce } from "./firebase.js";
import { showHomeGate, isLocalDev } from "./homeGate.js";
import * as Bank from "./services/bank.js";

const {
  won, int, num, fixedTotal, netWorth, gradeFromScore, loanLimit, FIXED_PRODUCTS,
  INSURANCE_PRODUCTS, INVESTMENT_PRODUCTS, investmentsValue, investOutcome, investLabel,
  loanRisk, depositStability, activeInsurances, insuranceActive, buyInsurance,
  buyInvestment, claimInvestment, vipTierLabel, vipVaultUnlocked, depositVip, withdrawVip,
  VIP_VAULT_RATE_DAY, VIP_VAULT_MIN_TIER,
} = Bank;

const ADMIN_UID = "yaV8N60yIiUggaWNpNF2VhkCwxb2";
const ADMIN_EMAIL = "tomem@naver.com";

const app = document.getElementById("app");
let state = null;     // { uid, cash, nickname, bank, tx }
let isAdmin = false;  // 관리자 네비 노출 여부 (boot 에서 1회 결정 · reload 후에도 유지)
let tab = "dashboard";
let histFilter = "all"; // 거래내역 필터(클라이언트 필터)
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
  app.innerHTML = `
    <header class="bk-header">
      <a class="bk-brand" href="#" data-home title="STONK Bank 메인"><span class="bk-mark">$</span><b>STONK</b> Bank</a>
      <div class="bk-nav">
        <a href="../STONK-Battle/index.html">주식시장</a>
        <a href="../STONK-Board/index.html">주식소식</a>
        <a href="../STONK-Wiki/index.html">주식정보</a>
        <a href="../STONK-Arcade/index.html">아케이드</a>
        <a href="../STONK-Gacha/index.html">가챠</a>
        ${isAdmin ? `<a href="../STONK-Admin/market-admin.html">관리자</a>` : ""}
      </div>
      <div class="bk-user"><span class="bk-nick">${esc(state.nickname)}</span>${gradeBadge(grade)}</div>
    </header>

    <section class="bk-summary">
      <div class="bk-sum-card net"><span>순자산</span><b class="${nw < 0 ? "minus" : ""}">${won(nw)}</b></div>
      <div class="bk-sum-card cash"><span>보유 현금</span><b>${won(state.cash)}</b></div>
      <div class="bk-sum-card dep"><span>총 예금</span><b>${won(totalDeposit)}</b></div>
      <div class="bk-sum-card loan"><span>대출 잔액</span><b class="${int(b.loanPrincipal) > 0 ? "warn" : ""}">${won(b.loanPrincipal)}</b></div>
    </section>

    <nav class="bk-tabs">
      ${["dashboard:대시보드", "deposit:예금", "loan:대출", "insurance:보험", "invest:투자", "vip:VIP", "history:거래내역"].map((t) => {
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
  if (t === "history") return historyTab();
  return dashboardTab();
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
  return `
    ${feedBanner()}
    <div class="bk-grid">
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
        <div class="bk-row"><span>대출 위험도</span><b>${statusBadge(risk.label, risk.tone)}</b></div>
        <div class="bk-row"><span>예금 안정도</span><b class="${stab.tone === "ok" ? "ok" : "muted"}">${stab.label}</b></div>
        <div class="bk-row"><span>오늘 정산 이자</span><b class="${todayInt > 0 ? "ok" : "muted"}">${todayInt > 0 ? "+" + won(todayInt) : "정산 없음"}</b></div>
        ${risk.key === "high" || risk.key === "severe" ? `<p class="bk-note danger">자산 대비 대출 비중이 높습니다. 상환을 권장합니다.</p>` : ""}
      </div>

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
        <h3>최근 거래 <button class="bk-btn ghost small" data-tab="history" style="float:right">전체 보기</button></h3>
        ${preview.length ? `<ul class="bk-tx mini">${preview.map(txRow).join("")}</ul>` : `<p class="bk-empty">거래내역이 없습니다.</p>`}
      </div>
    </div>`;
}

function statusBadge(label, tone) { return `<span class="bk-status ${tone}">${esc(label)}</span>`; }
function vipBadge(tier) { return `<span class="bk-vip v-${tier || "NORMAL"}">${esc(vipTierLabel(tier))}</span>`; }

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
  vip_deposit: ["VIP입금", "in"], vip_withdraw: ["VIP출금", "out"],
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
  vip: ["vip_deposit", "vip_withdraw"],
};
const FILTER_LABELS = { all: "전체", deposit: "예금", fixed: "정기예금", loan: "대출", interest: "이자", insurance: "보험", invest: "투자", vip: "VIP" };

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

// ── 보험 탭 ──
function insuranceTab() {
  const b = state.bank;
  const now = Date.now();
  const all = Object.values(b.insurances || {});
  return `
    <div class="bk-grid">
      ${Object.values(INSURANCE_PRODUCTS).map((p) => {
        const mine = all.find((i) => i.type === p.id && insuranceActive(i, now));
        return `<div class="bk-card">
          <h3>${esc(p.title)} ${mine ? `<span class="bk-tag safe">가입중</span>` : `<span class="bk-tag risk">위험 완화</span>`}</h3>
          <p class="bk-note">${esc(p.desc)}</p>
          <div class="bk-row"><span>가입비</span><b>${won(p.premium)}</b></div>
          ${mine
            ? `<div class="bk-row"><span>만료까지</span><b class="ok">${fmtLeft(Math.max(0, num(mine.expiresAt) - now))}</b></div>
               <button class="bk-btn" disabled>가입 중</button>`
            : `<button class="bk-btn primary" data-buyins="${p.id}">가입하기</button>`}
        </div>`;
      }).join("")}
    </div>
    <div class="bk-card">
      <h3>내 보험 내역</h3>
      ${all.length ? `<div class="bk-fixedlist">${all.sort((a, b2) => num(b2.startedAt) - num(a.startedAt)).map((i) => {
        const active = insuranceActive(i, now);
        return `<div class="bk-fixed ${active ? "matured" : ""}">
          <div><b>${esc(i.title)}</b><small>${won(i.premium)} · ${active ? "유효 · 만료 " + fmtLeft(Math.max(0, num(i.expiresAt) - now)) : "<span class='muted'>만료</span>"}</small></div>
        </div>`;
      }).join("")}</div>` : `<p class="bk-empty">가입 이력이 없습니다.</p>`}
      <p class="bk-note">보험은 손실을 줄이기 위한 게임머니 소모 기능입니다. 자동 보상 연동은 다음 패치(v2.1)에서 확장됩니다.</p>
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
        ${Object.values(INVESTMENT_PRODUCTS).map((p) => `
          <label class="bk-product"><input type="radio" name="invProd" value="${p.id}" ${p.id === "stable" ? "checked" : ""}/>
            <span><b>${esc(p.title)} <small class="bk-risk r-${esc(p.risk)}">${esc(p.risk)}</small></b>
            <small>${fmtDur(p.ms)} · 예상 ${(p.min * 100).toFixed(0)}% ~ +${(p.max * 100).toFixed(0)}%</small></span></label>`).join("")}
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
        return `<div class="bk-fixed ${matured ? "matured" : ""}">
          <div><b>${esc(v.title)}</b><small>${won(v.principal)} · ${matured
            ? `<span class="inv-${lcls}">${label} ${out.rate >= 0 ? "+" : "−"}${won(Math.abs(out.profit))}</span>`
            : "남은 시간 " + fmtLeft(Math.max(0, num(v.maturesAt) - now))}</small></div>
          <div class="bk-fixed-act">${matured ? `<button class="bk-btn primary small" data-claiminv="${esc(v.id)}">수령하기</button>` : `<span class="bk-tag">운용중</span>`}</div>
        </div>`;
      }).join("")}</div>` : `<p class="bk-empty">보유한 투자상품이 없습니다.</p>`}
    </div>`;
}

// ── VIP 탭 ──
function vipTab() {
  const b = state.bank;
  const unlocked = vipVaultUnlocked(b);
  return `
    <div class="bk-grid">
      <div class="bk-card credit">
        <h3>VIP 등급</h3>
        <div class="bk-credit"><div class="bk-grade-big v-${b.vipTier}">${vipTierLabel(b.vipTier).slice(0,1)}</div>
          <div class="bk-score"><div class="bk-score-bar"><span style="width:${b.vipScore}%"></span></div><small>${vipTierLabel(b.vipTier)} · ${b.vipScore} / 100</small></div></div>
        <p class="bk-note">예금·정기·투자·보험 이용과 무대출·높은 순자산으로 VIP 점수가 오릅니다. GOLD 등급부터 VIP 금고를 사용할 수 있습니다.</p>
      </div>
      <div class="bk-card">
        <h3>VIP 금고 ${unlocked ? `<span class="bk-tag safe">이용 가능</span>` : `<span class="bk-tag risk">GOLD부터 잠금</span>`}</h3>
        <div class="bk-row"><span>금고 잔액</span><b>${won(b.vipVaultBalance)}</b></div>
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
        <p class="bk-note">VIP 금고 이자 하루 ${(VIP_VAULT_RATE_DAY * 100).toFixed(1)}% (자유예금보다 높음). 보유 현금 ${won(state.cash)}</p>`
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
  el.value = v > 0 ? v : "";
}

function onAct(a) {
  const b = state.bank;
  if (a === "deposit") return act(() => Bank.depositFree(state.uid, fieldVal("freeAmt"), state));
  if (a === "withdraw") return act(() => Bank.withdrawFree(state.uid, fieldVal("freeAmt"), state));
  if (a === "openFixed") {
    const prod = (app.querySelector('input[name="fixedProd"]:checked') || {}).value || "d1";
    return act(() => Bank.openFixed(state.uid, prod, fieldVal("fixedAmt"), state));
  }
  if (a === "loan") return act(() => Bank.takeLoan(state.uid, fieldVal("loanAmt"), state));
  if (a === "repay") return act(() => Bank.repayLoan(state.uid, fieldVal("repayAmt"), state));
  if (a === "buyInvest") {
    const prod = (app.querySelector('input[name="invProd"]:checked') || {}).value || "stable";
    return act(() => buyInvestment(state.uid, prod, fieldVal("invAmt"), state));
  }
  if (a === "vipDeposit") return act(() => depositVip(state.uid, fieldVal("vipAmt"), state));
  if (a === "vipWithdraw") return act(() => withdrawVip(state.uid, fieldVal("vipAmt"), state));
  if (a === "repayAll") {
    const total = int(b.loanPrincipal) + int(b.loanInterest);
    if (total <= 0) { toast("상환할 대출이 없습니다.", "err"); return; }
    return act(() => Bank.repayLoan(state.uid, total, state));
  }
}
