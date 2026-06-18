/* ════════════════════════════════════════════════════════════
   MeetSoul Crystal — app logic
   i18n toggle (persisted), nav state, filter sheet, gallery,
   accordions, reveal-on-scroll, shop + product rendering.
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ---------- i18n (brief §8.10) ----------
     Default Chinese. Switch swaps text in place (no reload),
     remembers choice via localStorage, keeps scroll position. */
  const LANG_KEY = "meetsoul-lang";
  function getLang() { return localStorage.getItem(LANG_KEY) || "zh"; }

  function applyLang(lang) {
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
    document.body.classList.toggle("lang-en", lang === "en");

    // Elements carrying paired strings: data-zh / data-en
    document.querySelectorAll("[data-zh]").forEach((el) => {
      const val = lang === "zh" ? el.getAttribute("data-zh") : el.getAttribute("data-en");
      if (val !== null) {
        if (el.hasAttribute("data-attr")) el.setAttribute(el.getAttribute("data-attr"), val);
        else el.textContent = val;
      }
    });
    // placeholders
    document.querySelectorAll("[data-ph-zh]").forEach((el) => {
      el.setAttribute("placeholder", lang === "zh" ? el.getAttribute("data-ph-zh") : el.getAttribute("data-ph-en"));
    });
    // toggle buttons state
    document.querySelectorAll("[data-lang-btn]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang-btn") === lang));
    });
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }
  window.MS = window.MS || {};
  window.MS.lang = getLang;
  window.MS.t = (zh, en) => (getLang() === "zh" ? zh : en);

  function initLang() {
    applyLang(getLang());
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang-btn");
        localStorage.setItem(LANG_KEY, lang);
        applyLang(lang); // in place, scroll preserved
      });
    });
  }

  /* ---------- WhatsApp deep links (brief §8.6) ---------- */
  window.MS.wa = function (msgZh, msgEn) {
    const text = encodeURIComponent(getLang() === "zh" ? msgZh : (msgEn || msgZh));
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  };
  function initWhatsApp() {
    const setLinks = () => {
      document.querySelectorAll("[data-wa-zh]").forEach((a) => {
        a.href = window.MS.wa(a.getAttribute("data-wa-zh"), a.getAttribute("data-wa-en"));
      });
    };
    setLinks();
    document.addEventListener("langchange", setLinks);
  }

  /* ---------- Reveal on scroll (brief §8.9) ---------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Accordions (brief §8.6) ---------- */
  function initAccordions() {
    document.querySelectorAll(".acc-head").forEach((head) => {
      head.addEventListener("click", () => {
        const open = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", String(!open));
        const panel = head.nextElementSibling;
        panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
      });
    });
  }

  /* ---------- Gallery carousel (brief §8.6) ---------- */
  function initGallery() {
    const track = document.querySelector(".gallery-track");
    const dotsWrap = document.querySelector(".dots");
    if (!track || !dotsWrap) return;
    const slides = track.querySelectorAll(".gallery-slide");
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Image " + (i + 1));
      if (i === 0) b.setAttribute("aria-current", "true");
      b.addEventListener("click", () => track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" }));
      dotsWrap.appendChild(b);
    });
    track.addEventListener("scroll", () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      dotsWrap.querySelectorAll("button").forEach((d, i) => {
        i === idx ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current");
      });
    }, { passive: true });
  }

  /* ---------- Bottom sheet (filters) ---------- */
  window.MS.openSheet = function (id) {
    const sheet = document.getElementById(id);
    const overlay = document.getElementById(id + "-overlay");
    if (!sheet) return;
    overlay && overlay.classList.add("open");
    requestAnimationFrame(() => sheet.classList.add("open"));
    document.body.style.overflow = "hidden";
  };
  window.MS.closeSheet = function (id) {
    const sheet = document.getElementById(id);
    const overlay = document.getElementById(id + "-overlay");
    if (!sheet) return;
    sheet.classList.remove("open");
    overlay && overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initWhatsApp();
    initReveal();
    initAccordions();
    initGallery();
  });
})();
