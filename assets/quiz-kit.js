/* Shared quiz parts: builds each kind of question (multiple choice, true/false, ordering, matching, blanks),
   marks answers, and makes the answer box. Used by the study guide and the one-at-a-time quiz. */
(function () {
  const KIND = { mc: "Multiple choice", tf: "True or false", order: "Put in order", match: "Matching", fill: "Fill in the blanks", calc: "Calculation", recall: "Self-check" };
  const LETTERS = "abcdefghij";
  const WORDS = { 2: "two", 3: "three", 4: "four", 5: "five" };

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  function button(cls, text) {
    const b = el("button", cls, text);
    b.type = "button";
    return b;
  }
  function chevron() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("class", "chev");
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", "M5 7.5l5 5 5-5");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }
  function answerBox(label, text) {
    const box = el("div", "answer");
    box.appendChild(el("span", "label", label));
    if (text) box.appendChild(el("p", null, text));
    return box;
  }
  function tableOf(headers, rows, cls) {
    const wrap = el("div", "table-wrap" + (cls ? " " + cls : ""));
    const table = el("table");
    const thead = el("thead");
    const hr = el("tr");
    headers.forEach(h => hr.appendChild(el("th", null, h)));
    thead.appendChild(hr);
    const tbody = el("tbody");
    rows.forEach(r => tbody.appendChild(r));
    table.append(thead, tbody);
    wrap.appendChild(table);
    return wrap;
  }
  function seg(labels, onPick) {
    const wrap = el("div", "seg");
    wrap.setAttribute("role", "group");
    const btns = labels.map((label, i) => {
      const b = button(null, label);
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => onPick(i));
      wrap.appendChild(b);
      return b;
    });
    return { wrap, btns };
  }
  function setMark(mark, ok) {
    mark.textContent = ok ? "✓" : "✗";
    mark.className = "mark " + (ok ? "ok" : "no");
    mark.setAttribute("aria-label", ok ? "Right" : "Wrong");
  }
  function clearMark(mark) {
    mark.textContent = "";
    mark.className = "mark";
    mark.removeAttribute("aria-label");
  }

  /* Multiple choice (one answer checks straight away; several answers use Check) */
  function buildMC(q, api) {
    const multi = q.correct.length > 1;
    const picks = new Set();
    const list = el("div", "opts");
    const items = q.options.map((text, i) => {
      const L = LETTERS[i];
      const b = button("opt");
      b.setAttribute("aria-pressed", "false");
      const tag = el("span", "tag");
      b.append(el("span", "letter", q.letters === false ? text[0] : L), el("span", "txt", text), tag);
      b.addEventListener("click", () => {
        if (api.locked) return;
        if (multi) { picks.has(L) ? picks.delete(L) : picks.add(L); }
        else { picks.clear(); picks.add(L); }
        paint();
        api.changed();
        if (!multi) api.check();
      });
      list.appendChild(b);
      return { L, b, tag };
    });
    function paint() {
      items.forEach(({ L, b }) => {
        const on = picks.has(L);
        b.classList.toggle("picked", on);
        b.setAttribute("aria-pressed", String(on));
      });
    }
    return {
      node: list,
      auto: !multi,
      hint: multi ? `Pick ${WORDS[q.correct.length]}, then check your answer.` : "Pick one.",
      progress: () => multi ? `${picks.size} of ${q.correct.length} picked` : "",
      complete: () => multi ? picks.size === q.correct.length : picks.size === 1,
      grade: () => {
        const hits = q.correct.filter(c => picks.has(c)).length;
        return { right: hits === q.correct.length && picks.size === q.correct.length, detail: multi ? `${hits} of ${q.correct.length} right.` : "" };
      },
      reveal: () => {
        list.classList.add("locked");
        items.forEach(({ L, b, tag }) => {
          const isCorrect = q.correct.includes(L), picked = picks.has(L);
          b.classList.remove("picked");
          if (isCorrect) { b.classList.add("correct"); tag.textContent = multi && picks.size && !picked ? "Missed" : "Correct"; }
          else if (picked) { b.classList.add("wrong"); tag.textContent = "Your pick"; }
        });
      },
      reset: () => {
        picks.clear();
        list.classList.remove("locked");
        items.forEach(({ b, tag }) => { b.classList.remove("correct", "wrong"); tag.textContent = ""; });
        paint();
      }
    };
  }

  /* True or false tables */
  function buildTF(q, api) {
    const picks = q.rows.map(() => null);
    const ui = [];
    const trs = q.rows.map(([stmt], i) => {
      const tr = el("tr");
      tr.appendChild(el("td", null, stmt));
      const td = el("td", "ans");
      const cell = el("div", "cell");
      const s = seg(["True", "False"], k => {
        if (api.locked) return;
        picks[i] = k === 0;
        paint(i);
        api.changed();
      });
      const mark = el("span", "mark");
      cell.append(s.wrap, mark);
      td.appendChild(cell);
      tr.appendChild(td);
      ui.push({ s, mark });
      return tr;
    });
    function paint(i) {
      ui[i].s.btns.forEach((b, k) => {
        const on = picks[i] !== null && (k === 0) === picks[i];
        b.classList.toggle("picked", on);
        b.setAttribute("aria-pressed", String(on));
      });
    }
    const node = tableOf(["Statement", "Your answer"], trs);
    return {
      node,
      hint: "Pick True or False for each statement, then check your answers.",
      progress: () => `${picks.filter(v => v !== null).length} of ${picks.length} answered`,
      complete: () => picks.every(v => v !== null),
      grade: () => {
        const n = q.rows.filter(([, v], i) => picks[i] === v).length;
        return { right: n === q.rows.length, detail: `${n} of ${q.rows.length} right.` };
      },
      reveal: () => {
        node.classList.add("locked");
        q.rows.forEach(([, v], i) => {
          ui[i].s.btns.forEach((b, k) => {
            const isTrue = k === 0;
            b.classList.remove("picked");
            if (isTrue === v) b.classList.add("correct");
            else if (picks[i] === isTrue) b.classList.add("wrong");
          });
          if (picks[i] !== null) setMark(ui[i].mark, picks[i] === v);
        });
      },
      reset: () => {
        node.classList.remove("locked");
        picks.fill(null);
        ui.forEach(({ s, mark }, i) => {
          s.btns.forEach(b => b.classList.remove("correct", "wrong"));
          clearMark(mark);
          paint(i);
        });
      }
    };
  }

  /* Put steps in order: tap to number them */
  function buildOrder(q, api) {
    const seq = [];
    const list = el("div", "opts");
    const items = q.given.map((text, i) => {
      const b = button("opt");
      b.setAttribute("aria-pressed", "false");
      const slot = el("span", "letter", "");
      const tag = el("span", "tag");
      b.append(slot, el("span", "txt", text), tag);
      b.addEventListener("click", () => {
        if (api.locked) return;
        const at = seq.indexOf(i);
        if (at >= 0) seq.splice(at, 1); else seq.push(i);
        paint();
        api.changed();
      });
      list.appendChild(b);
      return { b, slot, tag, text };
    });
    function paint() {
      items.forEach((it, i) => {
        const at = seq.indexOf(i);
        it.slot.textContent = at >= 0 ? String(at + 1) : "";
        it.b.classList.toggle("picked", at >= 0);
        it.b.setAttribute("aria-pressed", String(at >= 0));
      });
    }
    return {
      node: list,
      hint: "Tap the steps in the order you think is right. Tap a numbered step to undo it.",
      progress: () => `${seq.length} of ${q.given.length} placed`,
      complete: () => seq.length === q.given.length,
      grade: () => {
        const n = seq.filter((gi, pos) => q.given[gi] === q.order[pos]).length;
        return { right: n === q.order.length, detail: `${n} of ${q.order.length} in the right place.` };
      },
      reveal: () => {
        list.classList.add("locked");
        items.forEach((it, i) => {
          const at = seq.indexOf(i);
          const should = q.order.indexOf(it.text);
          it.b.classList.remove("picked");
          if (at === -1) { it.slot.textContent = String(should + 1); it.b.classList.add("correct"); }
          else if (at === should) { it.b.classList.add("correct"); }
          else { it.b.classList.add("wrong"); it.tag.textContent = `Should be ${should + 1}`; }
        });
      },
      reset: () => {
        seq.length = 0;
        list.classList.remove("locked");
        items.forEach(it => { it.b.classList.remove("correct", "wrong"); it.tag.textContent = ""; });
        paint();
      }
    };
  }

  /* Matching: a dropdown for each task */
  function buildMatch(q, api) {
    const cols = q.cols || [null];
    const choices = cols.map((_, c) => [...new Set(q.rows.map(r => r[c + 1]))].sort((a, b) => a.localeCompare(b)));
    const list = el("div", "mlist" + (cols.length > 1 ? " multi" : ""));
    list.style.setProperty("--cols", String(cols.length));
    if (cols.length > 1) {
      const head = el("div", "mrow mhead");
      head.setAttribute("aria-hidden", "true");
      head.appendChild(el("span", null, q.rowHeader || ""));
      cols.forEach(h => head.appendChild(el("span", null, h)));
      list.appendChild(head);
    }
    const rows = q.rows.map((r, i) => {
      const row = el("div", "mrow");
      const lab = el("label", "mlabel", r[0]);
      row.appendChild(lab);
      const sels = cols.map((h, c) => {
        const sel = el("select");
        sel.id = `q${q.n}-row${i}` + (c ? `-${c}` : "");
        if (c === 0) lab.htmlFor = sel.id;
        if (h) sel.setAttribute("aria-label", `${h} for ${r[0]}`);
        const ph = el("option", null, h ? `Choose ${h.toLowerCase()}…` : (q.placeholder || "Choose…"));
        ph.value = "";
        sel.appendChild(ph);
        choices[c].forEach(v => { const o = el("option", null, v); o.value = v; sel.appendChild(o); });
        sel.addEventListener("change", () => api.changed());
        row.appendChild(sel);
        return sel;
      });
      const fix = el("span", "fix");
      fix.hidden = true;
      row.appendChild(fix);
      list.appendChild(row);
      return { row, sels, fix, ans: r.slice(1) };
    });
    const total = rows.length * cols.length;
    const chosen = () => rows.reduce((n, r) => n + r.sels.filter(s => s.value).length, 0);
    const rightCount = () => rows.reduce((n, r) => n + r.sels.filter((s, c) => s.value === r.ans[c]).length, 0);
    return {
      node: list,
      hint: q.hint || "Choose a match for each row, then check your answers.",
      progress: () => `${chosen()} of ${total} chosen`,
      complete: () => chosen() === total,
      grade: () => {
        const n = rightCount();
        return { right: n === total, detail: `${n} of ${total} right.` };
      },
      reveal: () => rows.forEach(r => {
        const allOk = r.sels.every((s, c) => s.value === r.ans[c]);
        const any = r.sels.some(s => s.value);
        r.sels.forEach((s, c) => {
          s.disabled = true;
          if (s.value) s.classList.add(s.value === r.ans[c] ? "ok" : "no");
        });
        if (any) r.row.classList.add(allOk ? "correct" : "wrong");
        r.fix.hidden = false;
        r.fix.textContent = allOk ? "✓ Correct" : (any ? "✗ Answer: " : "Answer: ") + r.ans.join(" · ");
        r.fix.className = "fix " + (allOk || !any ? "ok" : "no");
      }),
      reset: () => rows.forEach(r => {
        r.sels.forEach(s => { s.disabled = false; s.value = ""; s.classList.remove("ok", "no"); });
        r.row.classList.remove("correct", "wrong");
        r.fix.hidden = true;
        r.fix.textContent = "";
      })
    };
  }

  /* Fill in the blanks: buttons for short choices, a dropdown for longer lists */
  function buildFill(q, api) {
    const picks = q.blanks.map(() => null);
    const wrap = el("div", "blanks");
    const ui = q.blanks.map((bl, i) => {
      const row = el("div", "blank");
      const lbl = el("span", "lbl", `Blank ${i + 1}`);
      lbl.id = `q${q.n}-blank${i}`;
      row.appendChild(lbl);
      const mark = el("span", "mark");
      const fix = el("span", "bfix");
      fix.hidden = true;
      if (bl.choices.length > 3 || bl.choices.some(c => c.length > 14)) {
        const sel = el("select", "bsel");
        sel.id = `q${q.n}-b${i}`;
        sel.setAttribute("aria-labelledby", lbl.id);
        const ph = el("option", null, "Choose…");
        ph.value = "";
        sel.appendChild(ph);
        bl.choices.forEach((c, k) => { const o = el("option", null, c); o.value = String(k); sel.appendChild(o); });
        sel.addEventListener("change", () => {
          if (api.locked) return;
          picks[i] = sel.value === "" ? null : Number(sel.value);
          api.changed();
        });
        row.append(sel, mark, fix);
        wrap.appendChild(row);
        return { sel, mark, fix };
      }
      const s = seg(bl.choices, k => {
        if (api.locked) return;
        picks[i] = k;
        paint(i);
        api.changed();
      });
      row.append(s.wrap, mark);
      wrap.appendChild(row);
      return { s, mark, fix };
    });
    function paint(i) {
      if (!ui[i].s) return;
      ui[i].s.btns.forEach((b, k) => {
        const on = picks[i] === k;
        b.classList.toggle("picked", on);
        b.setAttribute("aria-pressed", String(on));
      });
    }
    const isRight = (bl, i) => picks[i] !== null && bl.choices[picks[i]] === bl.answer;
    return {
      node: wrap,
      hint: "Choose a word for each blank, then check your answer.",
      progress: () => `${picks.filter(v => v !== null).length} of ${picks.length} filled`,
      complete: () => picks.every(v => v !== null),
      grade: () => {
        const n = q.blanks.filter(isRight).length;
        return { right: n === q.blanks.length, detail: `${n} of ${q.blanks.length} right.` };
      },
      reveal: () => {
        wrap.classList.add("locked");
        q.blanks.forEach((bl, i) => {
          const u = ui[i];
          const ok = isRight(bl, i);
          if (u.sel) {
            u.sel.disabled = true;
            if (picks[i] !== null) u.sel.classList.add(ok ? "ok" : "no");
            if (!ok) { u.fix.hidden = false; u.fix.textContent = "Answer: " + bl.answer; }
          } else {
            u.s.btns.forEach((b, k) => {
              b.classList.remove("picked");
              if (bl.choices[k] === bl.answer) b.classList.add("correct");
              else if (picks[i] === k) b.classList.add("wrong");
            });
          }
          if (picks[i] !== null) setMark(u.mark, ok);
        });
      },
      reset: () => {
        wrap.classList.remove("locked");
        picks.fill(null);
        ui.forEach((u, i) => {
          if (u.sel) {
            u.sel.disabled = false;
            u.sel.value = "";
            u.sel.classList.remove("ok", "no");
          } else {
            u.s.btns.forEach(b => b.classList.remove("correct", "wrong"));
            paint(i);
          }
          u.fix.hidden = true;
          u.fix.textContent = "";
          clearMark(u.mark);
        });
      }
    };
  }

  /* Calculation: type a value for each field; within the tolerance (default 2%) counts as right */
  function buildCalc(q, api) {
    const tol = q.tolerance || 0.02;
    const wrap = el("div", "calc");
    const num = v => {
      const t = String(v).trim().replace(/\s+/g, "").replace(",", ".");
      if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?/i.test(t)) return null;
      const n = parseFloat(t);
      return isFinite(n) ? n : null;
    };
    const near = (v, a) => v !== null && Math.abs(v - a) <= Math.max(Math.abs(a) * tol, 1e-9);
    const ui = q.fields.map((f, i) => {
      const box = el("div", "cfield");
      const id = `q${q.n}-c${i}`;
      const name = el("label", "cname", f.label);
      name.htmlFor = id;
      const line = el("div", "cline");
      const inp = el("input");
      inp.type = "text";
      inp.id = id;
      inp.inputMode = "decimal";
      inp.autocomplete = "off";
      inp.spellcheck = false;
      inp.setAttribute("aria-label", `${f.label} in ${f.unit}`);
      inp.addEventListener("input", () => api.changed());
      inp.addEventListener("keydown", e => { if (e.key === "Enter") api.check(); });
      line.append(inp, el("span", "cunit", f.unit));
      const fix = el("span", "cfix");
      fix.hidden = true;
      box.append(name, line, fix);
      wrap.appendChild(box);
      return { f, box, inp, fix };
    });
    return {
      node: wrap,
      hint: `Work out each value in the unit shown, then check. Answers within ${Math.round(tol * 100)}% count as right.`,
      progress: () => `${ui.filter(u => num(u.inp.value) !== null).length} of ${ui.length} filled`,
      complete: () => ui.every(u => num(u.inp.value) !== null),
      grade: () => {
        const n = ui.filter(u => near(num(u.inp.value), u.f.answer)).length;
        return { right: n === ui.length, detail: `${n} of ${ui.length} right.` };
      },
      reveal: () => ui.forEach(u => {
        const v = num(u.inp.value);
        const ok = near(v, u.f.answer);
        u.inp.readOnly = true;
        if (v !== null) u.box.classList.add(ok ? "correct" : "wrong");
        u.fix.hidden = false;
        u.fix.textContent = ok ? "✓ Correct" : (v !== null ? "✗ " : "") + `${u.f.answer} ${u.f.unit}`;
        u.fix.className = "cfix " + (ok || v === null ? "ok" : "no");
      }),
      reset: () => ui.forEach(u => {
        u.inp.readOnly = false;
        u.inp.value = "";
        u.box.classList.remove("correct", "wrong");
        u.fix.hidden = true;
        u.fix.textContent = "";
      })
    };
  }

  /* Self-check: for questions that need a picture or a written answer. Reveal the answer, then mark yourself. */
  function buildRecall(q, api) {
    let marked = null;
    const wrap = el("div", "recall");
    const revealBtn = button("btn small ghost", "Reveal answer");
    const box = answerBox("Answer", q.answer);
    box.hidden = true;
    const markRow = el("div", "actions");
    markRow.hidden = true;
    const yes = button("btn small", "I got it right");
    const no = button("btn small ghost", "I got it wrong");
    markRow.append(yes, no);
    wrap.append(revealBtn, box, markRow);
    revealBtn.addEventListener("click", () => {
      if (api.locked) return;
      revealBtn.hidden = true;
      box.hidden = false;
      markRow.hidden = false;
      yes.focus({ preventScroll: true });
    });
    yes.addEventListener("click", () => { marked = true; api.check(); });
    no.addEventListener("click", () => { marked = false; api.check(); });
    return {
      node: wrap,
      auto: true,
      ownsAnswer: true,
      hint: "Work it out on paper or in your head, then reveal the answer and mark yourself.",
      progress: () => "",
      complete: () => marked !== null,
      grade: () => ({ right: marked === true, detail: "" }),
      reveal: () => {
        revealBtn.hidden = true;
        box.hidden = false;
        markRow.hidden = true;
      },
      reset: () => {
        marked = null;
        revealBtn.hidden = false;
        box.hidden = true;
        markRow.hidden = true;
      }
    };
  }

  const BUILDERS = { mc: buildMC, tf: buildTF, order: buildOrder, match: buildMatch, fill: buildFill, calc: buildCalc, recall: buildRecall };

  function answerFor(q) {
    if (q.type === "order") {
      const box = answerBox("Correct order");
      const ol = el("ol");
      q.order.forEach(step => ol.appendChild(el("li", null, step)));
      box.appendChild(ol);
      return box;
    }
    if (q.type === "tf") return answerBox("Answer", q.key + " " + q.why);
    return answerBox("Answer", q.answer);
  }

  window.QuizKit = { KIND, LETTERS, WORDS, el, button, chevron, answerBox, tableOf, seg, setMark, clearMark, BUILDERS, answerFor };
})();
