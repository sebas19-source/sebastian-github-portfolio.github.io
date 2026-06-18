/* ════════════════════════════════════════════════════════════
   Product Detail — render from ?id, size selector drives a
   pre-calculated TOTAL (brief §7) + sticky CTA + pre-filled
   WhatsApp message (brief §8.6). "Pairs well with" carousel.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  const root = document.getElementById("pd-root");
  if (!root) return;

  const t = (zh, en) => (window.MS.lang() === "zh" ? zh : en);
  const id = new URLSearchParams(location.search).get("id");
  const p = (typeof PRODUCTS !== "undefined" && PRODUCTS.find((x) => x.id === id)) || PRODUCTS[0];

  const SWATCH = {
    s1: "linear-gradient(135deg,#e3c4c8,#c89aa1)",
    s2: "linear-gradient(135deg,#d8c8b2,#bcae8e)",
    s3: "linear-gradient(135deg,#cdbfae,#a9967c)",
    s4: "linear-gradient(135deg,#d6c2c5,#b09098)",
  };

  let selected = 0; // size index

  function waLink() {
    const s = p.sizes[selected];
    const msgZh = `你好 MeetSoul！我想了解「${p.name_zh}」${s.size}（${s.total}），想预订/咨询能量配对 🙏`;
    const msgEn = `Hi MeetSoul! I'm interested in the ${p.name_en} — ${s.size} (${s.total}). I'd like to order / ask about energy matching 🙏`;
    return window.MS.wa(msgZh, msgEn);
  }

  function render() {
    document.title = t(p.name_zh, p.name_en) + " · MeetSoul Crystal";

    // gallery swatch
    document.querySelectorAll(".gallery-slide").forEach((sl, i) => {
      const keys = ["s1", "s2", "s3", "s4"];
      sl.style.background = SWATCH[keys[i % 4]];
      sl.textContent = t(p.name_zh, p.name_en) + " — " + (i + 1);
    });

    document.getElementById("pd-name").textContent = t(p.name_zh, p.name_en);
    document.getElementById("pd-sub").textContent = t(p.sub_zh, p.sub_en);
    document.getElementById("pd-blurb").textContent = t(p.blurb_zh, p.blurb_en);

    // size options
    const wrap = document.getElementById("pd-sizes");
    wrap.innerHTML = p.sizes.map((s, i) => `
      <button class="size-opt" data-i="${i}" aria-pressed="${i === selected}">
        <span>
          <span class="so-label">${s.size}</span>
          <span class="so-desc">· ${t(s.desc_zh, s.desc_en)}${s.bead !== "—" ? " · " + t("单颗 " + s.bead, s.bead + "/bead") : ""}</span>
        </span>
        <span class="so-total">${s.total}</span>
      </button>`).join("");
    wrap.querySelectorAll(".size-opt").forEach((b) => {
      b.addEventListener("click", () => { selected = +b.getAttribute("data-i"); render(); syncCta(); });
    });

    syncCta();
    renderPairs();
  }

  function syncCta() {
    const s = p.sizes[selected];
    const price = document.getElementById("cta-price");
    if (price) price.textContent = s.total;
    const lbl = document.getElementById("cta-size");
    if (lbl) lbl.textContent = t("已选 " + s.size, s.size + " selected");
    document.querySelectorAll(".pd-wa").forEach((a) => (a.href = waLink()));
  }

  function renderPairs() {
    const wrap = document.getElementById("pairs");
    if (!wrap) return;
    // pair with same intention first, then fill
    const others = PRODUCTS.filter((x) => x.id !== p.id);
    const same = others.filter((x) => x.intention === p.intention);
    const pool = [...same, ...others.filter((x) => x.intention !== p.intention)].slice(0, 6);
    wrap.innerHTML = pool.map((x) => {
      const from = x.sizes[0].total;
      return `
        <a class="prod-card" href="product.html?id=${x.id}">
          <div class="prod-thumb" style="background:${SWATCH[x.swatch] || SWATCH.s1}"></div>
          <div class="prod-body">
            <span class="name" style="font-size:.9rem">${t(x.name_zh, x.name_en)}</span>
            <span class="price">${t("从 " + from + " 起", "from " + from)}</span>
          </div>
        </a>`;
    }).join("");
  }

  /* Sticky CTA shows once user scrolls past the gallery */
  const ctaBar = document.querySelector(".cta-bar");
  if (ctaBar) {
    const gallery = document.querySelector(".gallery");
    window.addEventListener("scroll", () => {
      const past = gallery ? gallery.getBoundingClientRect().bottom < 120 : window.scrollY > 200;
      ctaBar.classList.toggle("show", past);
    }, { passive: true });
  }

  document.addEventListener("langchange", render);
  render();
})();
