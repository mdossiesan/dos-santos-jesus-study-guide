/* One-at-a-time quiz page: random order, progress bar, results with Retry missed.
   Needs the page's questions.js and assets/quiz-kit.js loaded first. */
(function () {
  const { KIND, el, button, BUILDERS, answerFor } = window.QuizKit;
  const ALL = window.QUIZ_QUESTIONS;
  const REDUCE = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stage = document.getElementById("stage");
  const countEl = document.getElementById("qcount");
  const meter = document.getElementById("meter");
  const ARROW = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  let order = [];
  let idx = 0;
  let results = [];

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  /* Random order, but a question that refers to another (follows) stays right after it */
  function makeOrder(pool) {
    const inPool = new Set(pool.map(q => q.n));
    const groups = [];
    pool.forEach(q => {
      if (q.follows && inPool.has(q.follows)) return;
      groups.push([q].concat(pool.filter(f => f.follows === q.n)));
    });
    return shuffle(groups).flat();
  }

  function updateBar() {
    const total = order.length;
    const done = results.filter(Boolean).length;
    const right = results.filter(r => r === "right").length;
    countEl.innerHTML = "";
    if (idx >= total) {
      countEl.append(el("strong", null, "Finished"), document.createTextNode(` · ${right} of ${total} right`));
    } else {
      countEl.append(el("strong", null, `Question ${idx + 1} of ${total}`), document.createTextNode(` · ${right} right`));
    }
    meter.style.width = (total ? (done / total) * 100 : 0) + "%";
  }

  /* Swap the card on screen with a slide */
  function swap(render) {
    const old = stage.firstElementChild;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      stage.innerHTML = "";
      const node = render();
      stage.appendChild(node);
      if (!REDUCE) node.classList.add("enter");
      updateBar();
      const top = stage.getBoundingClientRect().top + window.scrollY - 120;
      if (window.scrollY > top) window.scrollTo({ top: Math.max(0, top), behavior: REDUCE ? "auto" : "smooth" });
      const f = node.querySelector("[data-focus]");
      if (f) f.focus({ preventScroll: true });
    };
    if (old && !REDUCE) {
      old.classList.add("leave");
      old.addEventListener("animationend", go, { once: true });
      setTimeout(go, 400);
    } else {
      go();
    }
  }

  function renderQuestion(q, i) {
    const card = el("article", "qcard");
    const head = el("div", "qhead");
    head.append(
      el("span", "qnum", `${i + 1} / ${order.length}`),
      el("span", "qkind", q.kind || KIND[q.type]),
      el("span", "qsrc", `Assessment Q${q.n}`)
    );
    const title = el("h2", "qtitle", q.title);
    title.tabIndex = -1;
    title.setAttribute("data-focus", "");
    card.append(head, title);
    if (q.prompt) card.appendChild(el("p", "prompt", q.prompt));

    const api = { locked: false };
    const b = BUILDERS[q.type](q, api);
    card.appendChild(b.node);

    const hint = el("p", "hint", b.hint);
    const actions = el("div", "actions");
    const checkBtn = button("btn small", "Check answer");
    const showBtn = button("btn small ghost", "Show answer");
    const prog = el("span", "progress");
    checkBtn.hidden = !!b.auto;
    showBtn.hidden = !!b.ownsAnswer;
    actions.append(checkBtn, showBtn, prog);
    const result = el("p", "result");
    result.hidden = true;
    result.setAttribute("aria-live", "polite");
    const answer = b.ownsAnswer ? null : answerFor(q);
    if (answer) answer.hidden = true;
    const last = i + 1 >= order.length;
    const next = button("btn next");
    next.innerHTML = (last ? "See results" : "Next question") + ARROW;
    next.hidden = true;
    const nextRow = el("div", "next-row");
    nextRow.appendChild(next);
    card.append(...[hint, actions, result, answer, nextRow].filter(Boolean));

    api.changed = () => {
      checkBtn.disabled = !b.complete();
      prog.textContent = b.progress();
    };
    function finish(status, detail) {
      api.locked = true;
      b.reveal();
      hint.hidden = true;
      actions.hidden = true;
      result.hidden = false;
      result.className = "result " + status;
      result.textContent = status === "right" ? "Correct!" : status === "wrong" ? ("Not quite. " + (detail || "")).trim() : "Answer shown.";
      if (answer) answer.hidden = false;
      next.hidden = false;
      results[i] = status;
      updateBar();
      next.focus({ preventScroll: true });
      requestAnimationFrame(() => nextRow.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "nearest" }));
    }
    api.check = () => {
      if (api.locked || !b.complete()) return;
      const g = b.grade();
      finish(g.right ? "right" : "wrong", g.detail);
    };
    checkBtn.addEventListener("click", api.check);
    showBtn.addEventListener("click", () => finish("shown"));
    next.addEventListener("click", () => {
      idx = i + 1;
      swap(idx < order.length ? () => renderQuestion(order[idx], idx) : renderResults);
    });
    api.changed();
    return card;
  }

  function renderResults() {
    const total = order.length;
    const right = results.filter(r => r === "right").length;
    const missed = order.filter((q, i) => results[i] !== "right");
    const card = el("section", "qcard results");

    const h = el("h2", "qtitle", right === total ? "Perfect score!" : "Quiz complete");
    h.tabIndex = -1;
    h.setAttribute("data-focus", "");
    const score = el("p", "big-score");
    score.append(document.createTextNode(String(right)), el("span", "of", ` / ${total}`));
    const pct = el("p", "pct", `${Math.round((right / total) * 100)}% correct`);

    const actions = el("div", "res-actions");
    if (missed.length) {
      const retry = button("btn", `Retry the ${missed.length} you missed`);
      retry.addEventListener("click", () => start(missed));
      actions.appendChild(retry);
    }
    const again = button(missed.length ? "btn ghost" : "btn", "New random quiz");
    again.addEventListener("click", () => start(ALL));
    const back = el("a", "btn ghost", "Back to study guide");
    back.href = "../";
    actions.append(again, back);

    const review = el("ol", "review");
    order.forEach((q, i) => {
      const st = results[i] || "shown";
      const li = el("li", "r-" + st);
      const mark = el("span", "rmark", st === "right" ? "✓" : st === "wrong" ? "✗" : "–");
      mark.setAttribute("aria-label", st === "right" ? "Right" : st === "wrong" ? "Wrong" : "Shown");
      const txt = el("div", "rtext");
      const t = el("span", "rt");
      t.append(el("span", "rn", `Q${q.n} · `), document.createTextNode(q.title));
      txt.appendChild(t);
      if (st !== "right") txt.appendChild(el("span", "ra", "Answer: " + q.key));
      li.append(mark, txt);
      review.appendChild(li);
    });

    card.append(h, score, pct, actions, el("h3", "review-title", "Your answers"), review);
    return card;
  }

  function start(pool) {
    order = makeOrder(pool.slice());
    idx = 0;
    results = [];
    swap(() => renderQuestion(order[0], 0));
  }

  start(ALL);
})();
