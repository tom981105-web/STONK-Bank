// src/main.js — STONK Bank 진입점 (세션 게이트 · 로드 · 렌더 · 바인딩)
import "./style.css";
import { isConfigured, getCurrentUserOnce } from "./firebase.js";
import { showHomeGate, isLocalDev } from "./homeGate.js";
import * as Bank from "./services/bank.js";

const { won, int, num, fixedTotal, netWorth, gradeFromScore, loanLimit, FIXED_PRODUCTS } = Bank;

const app = document.getElementById("app");
let state = null;     // { uid, cash, nickname, bank, tx }
let tab = "dashboard";
let busy = false;

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
    state = await Bank.loadState(user.uid);
    render();
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
      <a class="bk-brand" href="../STONK-Home/index.html" title="STONK Home"><span class="bk-mark">$</span><b>STONK</b> Bank</a>
      <div class="bk-nav">
        <a href="../STONK-Battle/index.html">주식시장</a>
        <a href="../STONK-Gacha/index.html">가챠</a>
        <a href="../STONK-Home/index.html">홈</a>
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
      ${["dashboard:대시보드", "deposit:예금", "loan:대출", "history:거래내역"].map((t) => {
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
  if (t === "history") return historyTab();
  return dashboardTab();
}

function dashboardTab() {
  const b = state.bank;
  const grade = gradeFromScore(b.creditScore);
  const score = Bank.clampScore(b.creditScore);
  return `
    <div class="bk-grid">
      <div class="bk-card">
        <h3>예금 현황</h3>
        <div class="bk-row"><span>자유예금</span><b>${won(b.balance)}</b></div>
        <div class="bk-row"><span>정기예금</span><b>${won(fixedTotal(b))}</b></div>
        <div class="bk-row total"><span>총 예금</span><b>${won(int(b.balance) + fixedTotal(b))}</b></div>
        <p class="bk-note">자유예금 이자 하루 ${(Bank.FREE_RATE_DAY * 100).toFixed(1)}% · 접속/거래 시 정산됩니다.</p>
      </div>
      <div class="bk-card">
        <h3>대출 현황</h3>
        <div class="bk-row"><span>대출 잔액</span><b class="${int(b.loanPrincipal) > 0 ? "warn" : ""}">${won(b.loanPrincipal)}</b></div>
        <div class="bk-row"><span>누적 이자</span><b class="${int(b.loanInterest) > 0 ? "warn" : ""}">${won(b.loanInterest)}</b></div>
        <div class="bk-row"><span>대출 한도</span><b>${won(loanLimit(grade))}</b></div>
        <p class="bk-note danger">대출 이자 하루 ${(Bank.LOAN_RATE_DAY * 100).toFixed(1)}% — 오래 두면 빠르게 불어납니다.</p>
      </div>
      <div class="bk-card credit">
        <h3>신용등급</h3>
        <div class="bk-credit"><div class="bk-grade-big g-${grade}">${grade}</div><div class="bk-score"><div class="bk-score-bar"><span style="width:${score}%"></span></div><small>${score} / 100</small></div></div>
        <p class="bk-note">대출이 없고 자산이 많을수록 등급이 오릅니다. 등급이 높을수록 대출 한도가 커집니다.</p>
      </div>
    </div>`;
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

function historyTab() {
  const TYPE = {
    deposit: ["입금", "in"], withdraw: ["출금", "out"], fixedOpen: ["정기가입", "out"], fixedCancel: ["중도해지", "in"],
    fixedClaim: ["만기수령", "in"], loan: ["대출", "in"], repay: ["상환", "out"], interest: ["예금이자", "in"], loanInterest: ["대출이자", "out"],
  };
  const rows = (state.tx || []).slice(0, 20);
  return `<div class="bk-card">
    <h3>거래내역 <small class="muted">최근 ${rows.length}건</small></h3>
    ${rows.length ? `<ul class="bk-tx">${rows.map((t) => {
      const meta = TYPE[t.type] || [t.type, "in"];
      const amt = int(t.amount);
      const cls = amt >= 0 ? "plus" : "minus";
      return `<li><span class="bk-tx-badge t-${meta[1]}">${meta[0]}</span>
        <div class="bk-tx-mid"><b>${esc(t.title || meta[0])}</b><small>${fmtTime(t.createdAt)}${t.memo ? " · " + esc(t.memo) : ""}</small></div>
        <b class="bk-tx-amt ${cls}">${amt >= 0 ? "+" : "−"}${won(Math.abs(amt))}</b></li>`;
    }).join("")}</ul>` : `<p class="bk-empty">거래내역이 없습니다.</p>`}
  </div>`;
}

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
  app.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => { tab = b.dataset.tab; render(); }));
  app.querySelectorAll("[data-fill]").forEach((b) => b.addEventListener("click", () => fillMax(b.dataset.fill)));
  app.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => onAct(b.dataset.act)));
  app.querySelectorAll("[data-claim]").forEach((b) => b.addEventListener("click", () => act(() => Bank.claimFixed(state.uid, b.dataset.claim, state))));
  app.querySelectorAll("[data-cancel]").forEach((b) => b.addEventListener("click", () => {
    if (confirm("정기예금을 중도해지하면 이자 없이 원금만 돌려받습니다. 해지할까요?")) act(() => Bank.cancelFixed(state.uid, b.dataset.cancel, state));
  }));
}

function fillMax(spec) {
  const [id, kind] = spec.split(":");
  const el = document.getElementById(id);
  if (!el) return;
  const b = state.bank;
  let v = 0;
  if (kind === "maxin") v = int(state.cash);
  else if (kind === "maxout") v = int(b.balance);
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
  if (a === "repayAll") {
    const total = int(b.loanPrincipal) + int(b.loanInterest);
    if (total <= 0) { toast("상환할 대출이 없습니다.", "err"); return; }
    return act(() => Bank.repayLoan(state.uid, total, state));
  }
}
