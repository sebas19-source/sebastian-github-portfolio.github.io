/* ════════════════════════════════════════════════════════════
   Shop page — render product grid, search + filter drawer
   (brief §5 Shop, §8.6 filters, §8.10 search+filters together)
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const grid = document.getElementById("prod-grid");
  if (!grid) return;

  const state = { q: "", intention: new Set(), format: new Set(), size: new Set(), color: new Set(), price: new Set() };

  /* Read ?intention= / ?format= from Home entry cards */
  const params = new URLSearchParams(location.search);
  ["intention", "format"].forEach((k) => { if (params.get(k)) state[k].add(params.get(k)); });

  const t = (zh, en) => (window.MS.lang() === "zh" ? zh : en);

  function card(p) {
    const lowest = p.sizes.reduce((m, s) => {
      const n = parseFloat(s.total.replace(/[^0-9.]/g, "")); return n && n < m ? n : m;
    }, Infinity);
    const from = isFinite(lowest) ? "RM" + lowest : p.sizes[0].total;
    return `
      <a class="prod-card reveal" href="product.html?id=${p.id}">
        <div class="prod-thumb ${p.swatch === 's1' ? '' : ''}" style="background:linear-gradient(135deg,#e3c4c8,#c89aa1)" data-swatch="${p.swatch}">
          <span class="visually-hidden">${t(p.name_zh, p.name_en)}</span>
        </div>
        <div class="prod-body">
          <span class="tag">${t(p.tag_zh, p.tag_en)}</span>
          <span class="name">${t(p.name_zh, p.name_en)}</span>
          <span class="price">${t("从 " + from + " 起", "from " + from)}</span>
        </div>
      </a>`;
  }

  // swatch backgrounds per stone color family
  const SWATCH = {
    s1: "linear-gradient(135deg,#e3c4c8,#c89aa1)",
    s2: "linear-gradient(135deg,#d8c8b2,#bcae8e)",
    s3: "linear-gradient(135deg,#cdbfae,#a9967c)",
    s4: "linear-gradient(135deg,#d6c2c5,#b09098)",
  };

  function matches(p) {
    if (state.q) {
      const hay = (p.name_zh + p.name_en + p.tag_zh + p.tag_en + p.sub_zh + p.sub_en).toLowerCase();
      if (!hay.includes(state.q.toLowerCase())) return false;
    }
    if (state.intention.size && !state.intention.has(p.intention)) return false;
    if (state.format.size && !state.format.has(p.format)) return false;
    if (state.color.size && !state.color.has(p.color)) return false;
    if (state.price.size && !state.price.has(p.priceBand)) return false;
    if (state.size.size) {
      const has = p.sizes.some((s) => state.size.has(s.size));
      if (!has) return false;
    }
    return true;
  }

  function render() {
    const list = PRODUCTS.filter(matches);
    grid.innerHTML = list.length
      ? list.map(card).join("")
      : `<p class="muted" style="grid-column:1/-1;text-align:center;padding:48px 0">${t("没有符合条件的水晶，试着放宽筛选。", "No crystals match — try relaxing your filters.")}</p>`;
    // apply swatch bg
    grid.querySelectorAll(".prod-thumb").forEach((el) => {
      el.style.background = SWATCH[el.getAttribute("data-swatch")] || SWATCH.s1;
    });
    // reveal
    grid.querySelectorAll(".reveal").forEach((e) => e.classList.add("in"));
    // result count
    const meta = document.getElementById("result-count");
    if (meta) meta.textContent = t(list.length + " 件商品", list.length + " items");
    // active filter count on button
    const n = state.intention.size + state.format.size + state.size.size + state.color.size + state.price.size;
    const badge = document.getElementById("filter-count");
    if (badge) { badge.textContent = n; badge.style.display = n ? "inline-flex" : "none"; }
  }

  /* Build filter sheet groups from TAXO */
  function buildSheet() {
    const body = document.getElementById("filter-body");
    if (!body) return;
    const groups = [
      ["intention", t("意图 · Intention", "Intention")],
      ["format", t("形式 · Format", "Format")],
      ["size", t("尺寸 · Size", "Bead size")],
      ["color", t("颜色 · Color", "Color")],
      ["price", t("价格 · Price", "Price")],
    ];
    body.innerHTML = groups.map(([key, label]) => `
      <div class="filter-group">
        <h4>${label}</h4>
        <div class="chips" data-group="${key}">
          ${TAXO[key].map((o) => `<button class="chip" data-val="${o.id || o.size || o}" aria-pressed="${state[key].has(o.id) ? "true" : "false"}">${t(o.zh, o.en)}</button>`).join("")}
        </div>
      </div>`).join("");

    body.querySelectorAll(".chips").forEach((wrap) => {
      const key = wrap.getAttribute("data-group");
      wrap.querySelectorAll(".chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          const val = chip.getAttribute("data-val");
          const on = chip.getAttribute("aria-pressed") === "true";
          chip.setAttribute("aria-pressed", String(!on));
          on ? state[key].delete(val) : state[key].add(val);
        });
      });
    });
  }

  /* Wire up controls */
  const search = document.getElementById("shop-search");
  if (search) {
    search.addEventListener("input", () => { state.q = search.value.trim(); render(); });
  }
  const applyBtn = document.getElementById("filter-apply");
  if (applyBtn) applyBtn.addEventListener("click", () => { render(); window.MS.closeSheet("filter-sheet"); });
  const clearBtn = document.getElementById("filter-clear");
  if (clearBtn) clearBtn.addEventListener("click", () => {
    ["intention", "format", "size", "color", "price"].forEach((k) => state[k].clear());
    buildSheet(); render();
  });

  document.addEventListener("langchange", () => { buildSheet(); render(); });

  buildSheet();
  render();
})();
