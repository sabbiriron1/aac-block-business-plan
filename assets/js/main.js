/* ============================================================
   TILOTTOMA BANGLA GROUP — AAC BLOCK STRATEGY
   Interactive Engine  ·  v2
   Prepared & Presented By: Md. Sabbir Ahmed
   ============================================================ */

(function () {
  "use strict";

  /* ---------- State ---------- */
  const slides = Array.from(document.querySelectorAll(".slide"));
  const navItems = Array.from(document.querySelectorAll(".nav-item"));

  /* Logical presentation order (array of DOM slide indices).
     DOM order: 0=cover, 1=Exec, 2=Industry, 3=Opportunity, 4=Product,
                5=Competitor, 6=Strategic, 7=Customer, 8=Marketing, 9=GTM,
                10=RTM, 11=PMSD, 12=ESG, 13=Financial, 14=Roadmap, 15=KPI,
                16=Risk, 17=Board, 18=BusinessModel, 19=Simulator           */
  const order = [0, 1, 21, 2, 22, 3, 7, 4, 23, 5, 6, 18, 8, 9, 10, 24, 25, 26, 11, 12, 13, 27, 14, 20, 15, 16, 28, 17, 19];
  const total = order.length;
  let current = 0; // index into `order`

  /* ---------- Icon helper (inline SVG) ---------- */
  const icons = {
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-6 3 4 5-7"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z"/><path d="M12 2v9m0 0l8 4.5M12 11L4 6.5"/></svg>',
    sword: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l18 18M21 3l-6 6M3 21l6-6"/><path d="M9 3l12 12M15 3l6 6M3 9l6-6"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/></svg>',
    route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 19V9a4 4 0 014-4h4"/></svg>',
    network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v3M5 16l4.5-4M19 16l-4.5-4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c0-1-1.3-1.8-3-1.8s-3 .8-3 1.8 1.3 1.6 3 1.6 3 .8 3 1.7-1.3 1.7-3 1.7-3-.8-3-1.7"/></svg>',
    roadmap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
    gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21a9 9 0 119-9"/><path d="M12 12l4-4"/><circle cx="12" cy="12" r="1.5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 17l2 2a1.5 1.5 0 002-2.1L13 14l3-3 1.5 1.5"/><path d="M2 8l3 3-3 3 3 3H2m20-9l-3 3 3 3-3 3h3"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20M4 20V9l6 4V9l6 4V4h4v16"/></svg>',
    checklist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
  };

  /* ---------- Populate nav icons ---------- */
  function hydrateNav() {
    navItems.forEach((item) => {
      const key = item.dataset.icon;
      const iconEl = item.querySelector(".n-icon");
      if (key && icons[key] && iconEl && !iconEl.innerHTML.trim()) {
        iconEl.innerHTML = icons[key];
      }
    });
  }
  hydrateNav();

  /* ---------- Abbreviation footnotes (keyed by DOM slide index) ---------- */
  const ABBREV = {
    0: [["AAC","Autoclaved Aerated Concrete"],["FY","Fiscal Year"],["BDT","Bangladeshi Taka"]],
    1: [["AAC","Autoclaved Aerated Concrete"],["BDT","Bangladeshi Taka"],["Cr","Crore (10M)"],["m³","Cubic Metre"],["EBITDA","Earnings Before Interest, Taxes, Depreciation & Amortization"],["CAGR","Compound Annual Growth Rate"]],
    2: [["GDP","Gross Domestic Product"],["AAC","Autoclaved Aerated Concrete"],["BUET","Bangladesh Univ. of Engineering & Technology"],["MIST","Military Institute of Science & Technology"],["ISO","International Organization for Standardization"],["HBRI","Housing & Building Research Institute"]],
    3: [["TAM","Total Addressable Market"],["SAM","Serviceable Available Market"],["SOM","Serviceable Obtainable Market"],["BDT","Bangladeshi Taka"],["Cr","Crore"],["m³","Cubic Metre"]],
    4: [["USP","Unique Selling Proposition"],["AAC","Autoclaved Aerated Concrete"],["BUET/MIST","engineering universities"],["ISO","International Organization for Standardization"],["HBRI","Housing & Building Research Institute"],["mm","Millimetre"]],
    5: [["AAC","Autoclaved Aerated Concrete"],["CPM","Competitive Profile Matrix"],["m³","Cubic Metre"]],
    6: [["PESTEL","Political, Economic, Social, Technological, Environmental, Legal"],["SWOT","Strengths, Weaknesses, Opportunities, Threats"],["VRIO","Value, Rarity, Imitability, Organization"],["CPM","Competitive Profile Matrix"],["BSTI","Bangladesh Standards & Testing Institution"]],
    7: [["B2B","Business-to-Business"],["CPD","Continuing Professional Development"]],
    8: [["4P","Product, Price, Place, Promotion"],["4C","Customer Value, Cost, Convenience, Communication"],["TCO","Total Cost of Ownership"],["BSTI","Bangladesh Standards & Testing Institution"],["DMS","Dealer Management System"]],
    9: [["GTM","Go-To-Market"],["CPD","Continuing Professional Development"],["PR","Public Relations"]],
    10: [["RTM","Route-to-Market"],["B2B","Business-to-Business"],["DMS","Dealer Management System"],["m³","Cubic Metre"]],
    11: [["PMSD","Participatory Market System Development"],["HBRI","Housing & Building Research Institute"],["BSTI","Bangladesh Standards & Testing Institution"],["RAJUK","Rajdhani Unnayan Kartripakkha"],["IDCOL","Infrastructure Development Company Ltd"],["IFC","International Finance Corporation"],["ADB","Asian Development Bank"],["BGBC","Bangladesh Green Building Council"],["GIZ","German development cooperation"]],
    12: [["ESG","Environmental, Social, Governance"],["SDG","Sustainable Development Goal"],["GHG","Greenhouse Gas"],["IFC/KfW/ADB","development finance institutions"]],
    13: [["EBITDA","Earnings Before Interest, Taxes, Depreciation & Amortization"],["CAGR","Compound Annual Growth Rate"],["Cr","Crore"],["BDT","Bangladeshi Taka"],["m³","Cubic Metre"]],
    14: [["CRM","Customer Relationship Management"],["ERP","Enterprise Resource Planning"],["IoT","Internet of Things"],["ISO","International Organization for Standardization"],["BSTI","Bangladesh Standards & Testing Institution"]],
    15: [["KPI","Key Performance Indicator"],["EBITDA","Earnings Before Interest, Taxes, Depreciation & Amortization"],["OEE","Overall Equipment Effectiveness"],["OTIF","On-Time In-Full"],["ESG","Environmental, Social, Governance"]],
    16: [["GTM","Go-To-Market"],["ERP","Enterprise Resource Planning"],["DMS","Dealer Management System"],["KPI","Key Performance Indicator"]],
    17: [["ESG","Environmental, Social, Governance"],["KPI","Key Performance Indicator"],["GTM","Go-To-Market"],["EBITDA","Earnings Before Interest, Taxes, Depreciation & Amortization"]],
    18: [["BMC","Business Model Canvas"],["B2B","Business-to-Business"],["COGS","Cost of Goods Sold"],["BDT","Bangladeshi Taka"],["Cr","Crore"],["m³","Cubic Metre"]],
    19: [["EBITDA","Earnings Before Interest, Taxes, Depreciation & Amortization"],["OEE","Overall Equipment Effectiveness"],["Cr","Crore"],["BDT","Bangladeshi Taka"],["m³","Cubic Metre"]],
    20: [["OTIF","On-Time In-Full"],["EBITDA","Earnings Before Interest, Taxes, Depreciation & Amortization"],["ESG","Environmental, Social, Governance"],["ROI","Return on Investment"],["Cr","Crore"]],
    21: [["AAC","Autoclaved Aerated Concrete"],["EBITDA","Earnings Before Interest, Taxes, Depreciation & Amortization"],["CAGR","Compound Annual Growth Rate"],["BDT","Bangladeshi Taka"],["Cr","Crore"]],
    22: [["AAC","Autoclaved Aerated Concrete"],["CO₂","Carbon Dioxide"],["BUET","Bangladesh Univ. of Engineering & Technology"],["MIST","Military Institute of Science & Technology"],["ISO","International Organization for Standardization"]],
    23: [["CPD","Continuing Professional Development"],["IAB","Institute of Architects Bangladesh"],["IEB","Institution of Engineers Bangladesh"],["BUET","Bangladesh Univ. of Engineering & Technology"]],
    24: [["DMS","Dealer Management System"],["B2B","Business-to-Business"],["Cr","Crore"]],
    25: [["CMO","Chief Marketing Officer"],["FTE","Full-Time Equivalent"],["P&L","Profit & Loss"]],
    26: [["CRM","Customer Relationship Management"],["AI","Artificial Intelligence"],["B2B","Business-to-Business"]],
    27: [["CAPEX","Capital Expenditure"],["OPEX","Operating Expenditure"],["FTE","Full-Time Equivalent"],["ATL/BTL","Above/Below The Line"],["Cr","Crore"]],
    28: [["CRM","Customer Relationship Management"],["GTM","Go-To-Market"],["CPD","Continuing Professional Development"]]
  };

  function injectAbbrev() {
    slides.forEach((s, i) => {
      if (!ABBREV[i] || s.querySelector(".abbrev")) return;
      const pairs = ABBREV[i];
      const d = document.createElement("div");
      d.className = "abbrev";
      d.innerHTML =
        '<span class="alabel">Abbreviations</span>' +
        pairs.map((p) => "<b>" + p[0] + "</b> = " + p[1]).join('<span class="sep">·</span>');
      s.appendChild(d);
    });
  }

  /* ---------- Renumber sections to match logical order ---------- */
  function renumberSlides() {
    order.forEach((domIdx, pos) => {
      if (pos === 0) return;
      const slide = slides[domIdx];
      const num = String(pos).padStart(2, "0");
      const title = navItems[pos - 1] ? navItems[pos - 1].textContent.replace(/^\s*\d+\s*/, "").trim() : "";

      const eyebrow = slide.querySelector(".slide-eyebrow");
      if (eyebrow) {
        const desc = (eyebrow.textContent || "").split("·").slice(1).join("·").trim();
        eyebrow.innerHTML = '<span class="dot"></span>Section ' + num + (desc ? " · " + desc : "");
      }

      const footer = slide.querySelector(".slide-footer");
      if (footer) {
        const spans = Array.from(footer.querySelectorAll(":scope > span"));
        const last = spans[spans.length - 1];
        if (last) {
          const flag = last.querySelector(".data-flag");
          const isEnd = pos === total - 1;
          last.innerHTML = (flag ? '<span class="data-flag">' + flag.textContent + '</span> &nbsp;' : "") +
            title + " · " + num + " / " + (total - 1) + (isEnd ? " · End of Presentation" : "");
        }
      }
    });
  }

  /* ---------- Navigation ---------- */
  const prevBtn = document.getElementById("nav-prev");
  const nextBtn = document.getElementById("nav-next");
  const progressFill = document.getElementById("progress-fill");
  const slideCount = document.getElementById("slide-count");
  const topbarTitle = document.getElementById("topbar-title");

  function goTo(pos) {
    pos = Math.max(0, Math.min(total - 1, pos));
    if (pos === current) return;
    const curEl = slides[order[current]];
    const nxtEl = slides[order[pos]];
    curEl.classList.remove("active");
    nxtEl.classList.add("active");
    nxtEl.scrollTop = 0;
    current = pos;
    updateNav();
    runReveals(nxtEl);
    runAnimations(nxtEl);
  }

  function updateNav() {
    navItems.forEach((item, i) => {
      item.classList.toggle("active", i + 1 === current);
    });
    progressFill.style.width = ((current + 1) / total) * 100 + "%";
    slideCount.textContent = String(current + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    const activeIdx = current - 1;
    if (topbarTitle) {
      topbarTitle.textContent = (current === 0 || activeIdx < 0)
        ? "Overview"
        : navItems[activeIdx].textContent.replace(/^\s*\d+\s*/, "").trim();
    }
    if (activeIdx >= 0 && navItems[activeIdx]) {
      navItems[activeIdx].scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  navItems.forEach((item, i) => {
    item.addEventListener("click", () => goTo(i + 1));
  });
  if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
      e.preventDefault();
      goTo(current + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      goTo(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(total - 1);
    } else if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      if (document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    }
  });

  /* ---------- Reveal on active slide ---------- */
  function runReveals(container) {
    container.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }

  /* ---------- IntersectionObserver fallback ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  slides.forEach((s) => s.querySelectorAll(".reveal").forEach((el) => io.observe(el)));

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const dur = 1600;
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = target * eased;
      el.textContent = prefix + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Bar / fill animation ---------- */
  function animateBars(container) {
    container.querySelectorAll(".bar").forEach((bar) => {
      const h = bar.dataset.h;
      if (h) {
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.height = h + "%"; }, 120);
        });
      }
    });
    container.querySelectorAll(".cb-fill").forEach((fill) => {
      const w = fill.dataset.h;
      if (w) {
        requestAnimationFrame(() => {
          setTimeout(() => { fill.style.width = w + "%"; }, 100);
        });
      }
    });
  }

  /* ---------- Donut animation ---------- */
  function animateDonuts(container) {
    container.querySelectorAll(".donut").forEach((d) => {
      const p1 = parseFloat(d.dataset.p1 || 0);
      const p2 = parseFloat(d.dataset.p2 || 0);
      const p3 = parseFloat(d.dataset.p3 || 0);
      d.style.setProperty("--p1", p1);
      d.style.setProperty("--p2", p2);
      d.style.setProperty("--p3", p3);
      d.style.transform = "scale(1)";
    });
  }

  /* ---------- Gauge animation ---------- */
  function animateGauges(container) {
    container.querySelectorAll(".gauge .fill").forEach((f) => {
      const val = parseFloat(f.dataset.val || 0);
      const r = parseFloat(f.dataset.r || 42);
      const circ = 2 * Math.PI * r;
      const target = (val / 100) * circ;
      requestAnimationFrame(() => {
        setTimeout(() => {
          f.style.strokeDasharray = target + " " + circ;
        }, 100);
      });
    });
  }

  /* ---------- SVG line chart ---------- */
  function drawLineChart(el, points, opts) {
    opts = opts || {};
    const w = el.clientWidth || 600;
    const h = el.clientHeight || 220;
    const pad = { t: 20, r: 16, b: 30, l: 40 };
    const iw = w - pad.l - pad.r;
    const ih = h - pad.t - pad.b;
    const max = opts.max || Math.max.apply(null, points) * 1.15;
    const min = opts.min || 0;
    const range = max - min || 1;
    const x = (i) => pad.l + (i / (points.length - 1)) * iw;
    const y = (v) => pad.t + ih - ((v - min) / range) * ih;

    let svg = el.querySelector("svg");
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.setAttribute("preserveAspectRatio", "none");
      el.appendChild(svg);
    } else {
      svg.innerHTML = "";
    }

    const steps = 4;
    let grid = "";
    for (let i = 0; i <= steps; i++) {
      const v = min + (range / steps) * i;
      const yy = y(v);
      grid += '<line class="grid-line" x1="' + pad.l + '" y1="' + yy + '" x2="' + (w - pad.r) + '" y2="' + yy + '"/>';
      const label = opts.format ? opts.format(v) : v.toFixed(0);
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", pad.l - 8);
      txt.setAttribute("y", yy + 4);
      txt.setAttribute("text-anchor", "end");
      txt.setAttribute("class", "axis-txt");
      txt.textContent = label;
      svg.appendChild(txt);
    }
    svg.insertAdjacentHTML("afterbegin", grid);

    (opts.labels || []).forEach((lb, i) => {
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", x(i));
      txt.setAttribute("y", h - 8);
      txt.setAttribute("text-anchor", "middle");
      txt.setAttribute("class", "axis-txt");
      txt.textContent = lb;
      svg.appendChild(txt);
    });

    const areaPts = points.map((p, i) => x(i) + "," + y(p)).join(" ");
    const area = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    area.setAttribute("points", pad.l + "," + y(min) + " " + areaPts + " " + (w - pad.r) + "," + y(min));
    area.setAttribute("class", "area");
    area.setAttribute("fill", opts.color || "#34d399");
    svg.appendChild(area);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "M" + x(0) + " " + y(points[0]);
    for (let i = 1; i < points.length; i++) d += " L" + x(i) + " " + y(points[i]);
    path.setAttribute("d", d);
    path.setAttribute("class", "path");
    path.setAttribute("stroke", opts.color || "#34d399");
    svg.appendChild(path);

    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    requestAnimationFrame(() => {
      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(0.22,1,0.36,1)";
        path.style.strokeDashoffset = 0;
      }, 150);
    });

    points.forEach((p, i) => {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", x(i));
      c.setAttribute("cy", y(p));
      c.setAttribute("r", 4);
      c.setAttribute("fill", "#0b1424");
      c.setAttribute("stroke", opts.color || "#34d399");
      c.setAttribute("stroke-width", "2.5");
      svg.appendChild(c);
    });
  }

  /* ---------- Trigger all animations for a slide ---------- */
  function runAnimations(container) {
    container.querySelectorAll(".counter").forEach(animateCounter);
    animateBars(container);
    animateDonuts(container);
    animateGauges(container);
    container.querySelectorAll("[data-line]").forEach((el) => {
      const pts = (el.dataset.line || "").split(",").map(Number);
      const labels = (el.dataset.labels || "").split("|");
      drawLineChart(el, pts, { labels: labels, color: el.dataset.color || "#34d399", max: parseFloat(el.dataset.max || 0) });
    });
  }

  /* ---------- Business Case Simulator ---------- */
  function initSimulator() {
    const CAP = 156000;
    const utilEl = document.getElementById("sim-util");
    if (!utilEl) return;
    const priceEl = document.getElementById("sim-price");
    const vcostEl = document.getElementById("sim-vcost");
    const fcostEl = document.getElementById("sim-fcost");

    const label = (id, v, suffix) => { const e = document.getElementById(id); if (e) e.textContent = v + suffix; };
    const out = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };

    const fmtInt = (n) => Math.round(n).toLocaleString("en-US");

    function compute() {
      const util = +utilEl.value;
      const price = +priceEl.value;
      const vcost = +vcostEl.value;
      const fcostCr = +fcostEl.value;

      label("sim-util-val", util, "%");
      label("sim-price-val", fmtInt(price), " BDT");
      label("sim-vcost-val", fmtInt(vcost), " BDT");
      label("sim-fcost-val", fcostCr.toFixed(1), " Cr");

      const volume = CAP * util / 100;
      const revenueCr = (volume * price) / 1e7;
      const varCr = (volume * vcost) / 1e7;
      const ebitdaCr = revenueCr - varCr - fcostCr;
      const margin = revenueCr > 0 ? (ebitdaCr / revenueCr) * 100 : 0;
      const contribPerUnit = price - vcost;
      const beVol = contribPerUnit > 0 ? (fcostCr * 1e7) / contribPerUnit : Infinity;
      const beUtil = CAP > 0 ? (beVol / CAP) * 100 : 0;

      out("sim-volume", fmtInt(volume) + " m³");
      out("sim-revenue", "BDT " + revenueCr.toFixed(1) + " Cr");
      out("sim-ebitda", "BDT " + ebitdaCr.toFixed(1) + " Cr");
      out("sim-margin", margin.toFixed(1) + "%");
      out("sim-be", beUtil === Infinity ? "—" : beUtil.toFixed(0) + "% util.");
      out("sim-contrib", "BDT " + fmtInt(contribPerUnit) + " / m³");

      const status = document.getElementById("sim-status");
      if (status) {
        status.className = "sim-status";
        if (ebitdaCr > 0 && util > beUtil) {
          status.classList.add("ok");
          status.textContent = "✓ PROFITABLE — above break-even (" + (util - beUtil).toFixed(0) + " pts)";
        } else if (ebitdaCr > 0) {
          status.classList.add("ok");
          status.textContent = "✓ EBITDA positive — BDT " + ebitdaCr.toFixed(1) + " Cr";
        } else if (util > 0 && revenueCr > 0) {
          status.classList.add("warn");
          status.textContent = "△ Below break-even — EBITDA BDT " + ebitdaCr.toFixed(1) + " Cr (raise utilization or price)";
        } else {
          status.classList.add("bad");
          status.textContent = "✕ No output — set utilization > 0";
        }
      }
    }

    [utilEl, priceEl, vcostEl, fcostEl].forEach((el) => el.addEventListener("input", compute));
    compute();
  }

  /* ---------- Resize redraw ---------- */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      slides[order[current]].querySelectorAll("[data-line]").forEach((el) => {
        const pts = (el.dataset.line || "").split(",").map(Number);
        const labels = (el.dataset.labels || "").split("|");
        drawLineChart(el, pts, { labels: labels, color: el.dataset.color || "#34d399" });
      });
    }, 250);
  });

  /* ---------- Init ---------- */
  injectAbbrev();
  renumberSlides();
  initSimulator();
  slides[order[0]].classList.add("active");
  updateNav();
  runReveals(slides[order[0]]);
  runAnimations(slides[order[0]]);

  const brandLogo = document.getElementById("brand-logo");
  if (brandLogo) brandLogo.addEventListener("click", () => goTo(0));

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtn.innerHTML = sidebar.classList.contains("open") ? icons.close : icons.menu;
    });
    navItems.forEach((item) =>
      item.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
          sidebar.classList.remove("open");
          menuBtn.innerHTML = icons.menu;
        }
      })
    );
  }

  /* Expose navigation globally */
  window.goTo = goTo;
  window.__engine = { goTo: goTo };
})();
