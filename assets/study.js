/* Study guide page: every question as a dropdown you can answer, with score, Show all answers, Reset and Open all.
   Needs the page's questions.js and assets/quiz-kit.js loaded first. */
(function () {
  const QUESTIONS = window.QUIZ_QUESTIONS;
  const { KIND, el, button, chevron, answerBox, tableOf, BUILDERS, answerFor } = window.QuizKit;
  const state = new Map();
  const resets = [];
  const reveals = [];

  function renderQuestion(q) {
    const d = el("details", "q reveal");
    d.id = "q" + q.n;
    d.setAttribute("data-fade-zone", "0.16");

    const s = el("summary");
    s.appendChild(el("span", "num", String(q.n)));
    const qt = el("span", "qt");
    qt.appendChild(el("span", "title", q.title));
    const meta = el("span", "meta");
    meta.appendChild(el("span", "kind", q.kind || KIND[q.type]));
    const pill = el("span", "status");
    pill.hidden = true;
    meta.appendChild(pill);
    qt.appendChild(meta);
    s.append(qt, chevron());
    d.appendChild(s);

    const body = el("div", "body");
    if (q.prompt) body.appendChild(el("p", "prompt", q.prompt));

    const api = { locked: false };
    const b = BUILDERS[q.type](q, api);
    body.appendChild(b.node);

    const hint = el("p", "hint", b.hint);
    const actions = el("div", "actions");
    const checkBtn = button("btn small", "Check answer");
    const showBtn = button("btn small ghost", "Show answer");
    const retryBtn = button("btn small ghost", "Try again");
    const prog = el("span", "progress");
    retryBtn.hidden = true;
    checkBtn.hidden = !!b.auto;
    showBtn.hidden = !!b.ownsAnswer;
    actions.append(checkBtn, showBtn, retryBtn, prog);
    const result = el("p", "result");
    result.hidden = true;
    result.setAttribute("aria-live", "polite");
    const answer = b.ownsAnswer ? null : answerFor(q);
    if (answer) answer.hidden = true;
    body.append(...[hint, result, actions, answer].filter(Boolean));
    d.appendChild(body);

    api.changed = () => {
      checkBtn.disabled = !b.complete();
      prog.textContent = b.progress();
    };
    function finish(status, detail) {
      api.locked = true;
      b.reveal();
      hint.hidden = true;
      checkBtn.hidden = true;
      showBtn.hidden = true;
      retryBtn.hidden = false;
      prog.textContent = "";
      result.hidden = false;
      result.className = "result " + status;
      result.textContent = status === "right" ? "Correct!" : status === "wrong" ? ("Not quite. " + (detail || "")).trim() : "Answer shown.";
      if (answer) answer.hidden = false;
      pill.hidden = false;
      pill.className = "status " + status;
      pill.textContent = status === "right" ? "Correct" : status === "wrong" ? "Wrong" : "Shown";
      state.set(q.n, status);
      updateScore();
    }
    api.check = () => {
      if (api.locked || !b.complete()) return;
      const g = b.grade();
      finish(g.right ? "right" : "wrong", g.detail);
    };
    checkBtn.addEventListener("click", api.check);
    showBtn.addEventListener("click", () => finish("shown"));
    function reset() {
      api.locked = false;
      b.reset();
      hint.hidden = false;
      checkBtn.hidden = !!b.auto;
      showBtn.hidden = !!b.ownsAnswer;
      retryBtn.hidden = true;
      result.hidden = true;
      if (answer) answer.hidden = true;
      pill.hidden = true;
      state.delete(q.n);
      api.changed();
      updateScore();
    }
    retryBtn.addEventListener("click", reset);
    resets.push(reset);
    reveals.push(() => { if (!api.locked) finish("shown"); });
    api.changed();
    return d;
  }

  function renderKey() {
    const d = el("details", "q key reveal");
    d.setAttribute("data-fade-zone", "0.16");
    d.id = "answer-key";
    const s = el("summary");
    s.appendChild(el("span", "num", "✓"));
    const qt = el("span", "qt");
    qt.appendChild(el("span", "title", "Quick answer key"));
    const meta = el("span", "meta");
    meta.appendChild(el("span", "kind", `All ${QUESTIONS.length} answers on one screen`));
    qt.appendChild(meta);
    s.append(qt, chevron());
    d.appendChild(s);
    const body = el("div", "body");
    const rows = QUESTIONS.map(q => {
      const tr = el("tr");
      tr.appendChild(el("td", null, String(q.n)));
      tr.appendChild(el("td", null, q.key));
      return tr;
    });
    body.appendChild(tableOf(["Q", "Answer"], rows));
    d.appendChild(body);
    return d;
  }

  const scoreEl = document.getElementById("score");
  function updateScore() {
    const done = state.size;
    const showAll = document.getElementById("show-all");
    if (showAll) showAll.disabled = done === QUESTIONS.length;
    const right = [...state.values()].filter(v => v === "right").length;
    scoreEl.innerHTML = "";
    scoreEl.append(el("strong", null, `${right} right`), document.createTextNode(` · ${done} of ${QUESTIONS.length} done`));
  }

  const list = document.getElementById("qs");
  QUESTIONS.forEach(q => list.appendChild(renderQuestion(q)));
  list.appendChild(renderKey());

  const questionDetails = Array.from(list.querySelectorAll("details.q:not(.key)"));
  const toggleBtn = document.getElementById("toggle-all");
  const toggleLabel = document.getElementById("toggle-label");
  const REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isOpen = d => d.open && !d._closing;

  /* Questions slide open and closed instead of jumping */
  function setOpen(d, wantOpen) {
    if (wantOpen === isOpen(d)) return;
    const body = d.querySelector(".body");
    if (REDUCE || !body.animate) { d.open = wantOpen; return; }
    const fromH = d.open ? body.getBoundingClientRect().height : 0;
    const fromO = d.open ? Number(getComputedStyle(body).opacity) : 0;
    if (d._anim) { d._anim.cancel(); d._anim = null; }
    d.open = true;
    const fullH = body.offsetHeight;
    const pb = getComputedStyle(body).paddingBottom;
    const toH = wantOpen ? fullH : 0;
    d._closing = !wantOpen;
    body.style.overflow = "hidden";
    const a = body.animate([
      { height: fromH + "px", paddingBottom: fromH > 0 ? pb : "0px", opacity: fromO },
      { height: toH + "px", paddingBottom: wantOpen ? pb : "0px", opacity: wantOpen ? 1 : 0 }
    ], { duration: Math.min(480, 200 + Math.abs(toH - fromH) * 0.25), easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" });
    d._anim = a;
    a.onfinish = () => {
      if (d._anim !== a) return;
      d._anim = null;
      body.style.overflow = "";
      if (d._closing) { d._closing = false; d.open = false; }
    };
  }
  list.addEventListener("click", e => {
    const s = e.target.closest("summary");
    if (!s || !list.contains(s)) return;
    e.preventDefault();
    const d = s.parentElement;
    setOpen(d, !isOpen(d));
    refreshToggle();
  });

  function refreshToggle() {
    const allOpen = questionDetails.every(isOpen);
    toggleLabel.textContent = allOpen ? "Close all" : "Open all";
    toggleBtn.setAttribute("aria-pressed", String(allOpen));
  }
  toggleBtn.addEventListener("click", () => {
    const openAll = questionDetails.some(d => !isOpen(d));
    questionDetails.forEach(d => setOpen(d, openAll));
    refreshToggle();
  });
  questionDetails.forEach(d => d.addEventListener("toggle", refreshToggle));

  /* Reset: one click clears every answer and the score, closes the questions and goes back to the top */
  document.getElementById("reset-all").addEventListener("click", () => {
    resets.forEach(r => r());
    questionDetails.forEach(d => setOpen(d, false));
    refreshToggle();
    window.scrollTo({ top: 0, behavior: REDUCE ? "auto" : "smooth" });
  });

  /* Show all answers: reveals the answer to every question not yet answered, and opens them all */
  document.getElementById("show-all").addEventListener("click", () => {
    reveals.forEach(f => f());
    questionDetails.forEach(d => setOpen(d, true));
    refreshToggle();
  });

  refreshToggle();
  updateScore();
})();
