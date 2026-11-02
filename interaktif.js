/* =========================================================
   interaktif.js — widget belajar interaktif (belajar.html)
   Dua widget, dipanggil lewat atribut data-widget:
     · "graph" — grafik fungsi linear f(x) = ax + b, dengan
                 penggeser a, b, dan x. Nilai f(x) tampil di grafik.
     · "net"   — bangun ruang (kubus, balok, prisma segitiga)
                 yang bisa dilipat dan dibentangkan jadi jaring-jaring.
   Semua gambar dibuat langsung sebagai SVG, jadi tidak butuh library.
   ========================================================= */
(function () {
  'use strict';

  const Q = Math.PI / 2;   /* 90° dalam radian */
  const R = Math.PI / 180;

  /* ---------- Angka gaya Indonesia (koma, minus panjang) ---------- */
  function fmt(v) {
    const n = Math.round(v * 100) / 100;
    return (Math.abs(n) < 1e-9 ? '0' : String(n).replace('.', ',')).replace('-', '−');
  }
  function r1(v) { return Math.round(v * 10) / 10; }
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  /* Langkah "bulat" untuk angka sumbu (1, 2, 2,5, 5, 10, …).
     Dipilih yang paling dekat dengan 4–5 garis kisi supaya angkanya tidak terlalu jarang. */
  function niceStep(range) {
    const p = Math.pow(10, Math.floor(Math.log10((range || 1) / 5)));
    let best = p, bestDiff = Infinity;
    [1, 2, 2.5, 5, 10].forEach(m => {
      const diff = Math.abs(range / (m * p) - 4.5);
      if (diff < bestDiff) { bestDiff = diff; best = m * p; }
    });
    return best;
  }

  /* =========================================================
     1. GEOMETRI BANGUN RUANG
     Semua sisi digambar datar di bidang z = 0 (keadaan jaring-jaring),
     lalu dilipat satu per satu lewat engsel (hinge) di rusuknya.
     ========================================================= */

  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

  /* Putar titik p mengelilingi garis lewat o dengan arah k, sejauh ang radian */
  function rot(p, o, k, ang) {
    const v = sub(p, o), c = Math.cos(ang), s = Math.sin(ang);
    const kv = cross(k, v), kd = dot(k, v) * (1 - c);
    return [o[0] + v[0] * c + kv[0] * s + k[0] * kd,
            o[1] + v[1] * c + kv[1] * s + k[1] * kd,
            o[2] + v[2] * c + kv[2] * s + k[2] * kd];
  }

  /* Persegi panjang datar (z = 0) */
  function rect(x0, y0, x1, y1) {
    return [[x0, y0, 0], [x1, y0, 0], [x1, y1, 0], [x0, y1, 0]];
  }

  const KX = [1, 0, 0], KY = [0, 1, 0];

  /* Kubus / balok: alas sx × sy, tinggi sz.
     Empat sisi berengsel di rusuk alas, tutup berengsel di sisi belakang. */
  function boxFaces(sx, sy, sz) {
    return [
      { poly: rect(0, 0, sx, sy) },                                                                              /* alas */
      { poly: rect(0, sy, sx, sy + sz), parent: 0, hinge: { o: [0, sy, 0], k: KX }, ang: t => Q * t },           /* belakang */
      { poly: rect(0, -sz, sx, 0), parent: 0, hinge: { o: [0, 0, 0], k: KX }, ang: t => -Q * t },                 /* depan */
      { poly: rect(-sz, 0, 0, sy), parent: 0, hinge: { o: [0, 0, 0], k: KY }, ang: t => Q * t },                  /* kiri */
      { poly: rect(sx, 0, sx + sz, sy), parent: 0, hinge: { o: [sx, 0, 0], k: KY }, ang: t => -Q * t },           /* kanan */
      { poly: rect(0, sy + sz, sx, sy + sz + sy), parent: 1, hinge: { o: [0, sy + sz, 0], k: KX }, ang: t => Q * t } /* tutup */
    ];
  }

  /* Prisma segitiga: alas persegi panjang b × L dengan tinggi segitiga h.
     Dua sisi miring berengsel di rusuk panjang, dua penutup segitiga di ujungnya. */
  function prismFaces(b, h, L) {
    const s = Math.hypot(b / 2, h);
    const phi = Math.PI - Math.atan2(h, b / 2);   /* sudut lipat sisi miring */
    return [
      { poly: rect(0, 0, b, L) },                                                                  /* alas */
      { poly: rect(-s, 0, 0, L), parent: 0, hinge: { o: [0, 0, 0], k: KY }, ang: t => phi * t },    /* sisi miring kiri */
      { poly: rect(b, 0, b + s, L), parent: 0, hinge: { o: [b, 0, 0], k: KY }, ang: t => -phi * t }, /* sisi miring kanan */
      { poly: [[0, 0, 0], [b, 0, 0], [b / 2, -h, 0]], parent: 0, hinge: { o: [0, 0, 0], k: KX }, ang: t => -Q * t },   /* penutup depan */
      { poly: [[0, L, 0], [b, L, 0], [b / 2, L + h, 0]], parent: 0, hinge: { o: [0, L, 0], k: KX }, ang: t => Q * t }  /* penutup belakang */
    ];
  }

  /* Lipat semua sisi pada waktu t (0 = jaring-jaring datar, 1 = bangun ruang) */
  function foldFaces(faces, t) {
    const xf = [];
    return faces.map((f, i) => {
      const parent = f.parent == null ? [] : xf[f.parent];
      xf[i] = (f.hinge ? [{ o: f.hinge.o, k: f.hinge.k, a: f.ang(t) }] : []).concat(parent);
      return f.poly.map(p => xf[i].reduce((q, s) => rot(q, s.o, s.k, s.a), p));
    });
  }

  const SHAPES = {
    kubus: {
      label: 'Kubus',
      faces: () => boxFaces(4, 4, 4),
      pivot: [2, 2, 2],
      flat: 'Jaring-jaring kubus — 6 persegi berukuran sama.',
      space: 'Kubus · rusuk 4 cm · volume 64 cm³'
    },
    balok: {
      label: 'Balok',
      faces: () => boxFaces(6, 5, 4),
      pivot: [3, 2.5, 2],
      flat: 'Jaring-jaring balok — 3 pasang persegi panjang.',
      space: 'Balok · 6 × 5 × 4 cm · volume 120 cm³'
    },
    prisma: {
      label: 'Prisma segitiga',
      faces: () => prismFaces(4, 3, 6),
      pivot: [2, 3, 1.5],
      flat: 'Jaring-jaring prisma segitiga — 2 segitiga + 3 persegi panjang.',
      space: 'Prisma segitiga · alas 4 cm, tinggi 3 cm · volume 36 cm³'
    }
  };

  /* Warna sisi bergantian supaya lipatannya mudah dibaca */
  const FILLS = ['#3F4823', '#4C5729', '#333B1C', '#566231', '#2C3319', '#49521F'];

  /* Gambar satu keadaan bangun ruang. yaw & tilt dalam derajat. */
  function netSvg(key, t, yawDeg, tiltDeg) {
    const shape = SHAPES[key] || SHAPES.kubus;
    const pv = shape.pivot;
    const yaw = yawDeg * R;
    const elev = clamp(90 - 62 * t + tiltDeg, 8, 88) * R;
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const ce = Math.cos(elev), se = Math.sin(elev);

    const polys = foldFaces(shape.faces(), t).map(poly => poly.map(p => {
      const x = p[0] - pv[0], y = p[1] - pv[1], z = p[2] - pv[2];
      const x1 = x * cy - y * sy;
      const y1 = x * sy + y * cy;
      return { x: x1, y: y1 * se - z * ce, d: y1 * ce + z * se };
    }));

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    polys.forEach(poly => poly.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }));

    const W = 420, H = 300, PAD = 24;
    const sc = Math.min((W - PAD * 2) / Math.max(maxX - minX, 1), (H - PAD * 2) / Math.max(maxY - minY, 1));
    const ox = W / 2 - (minX + maxX) / 2 * sc;
    const oy = H / 2 - (minY + maxY) / 2 * sc;

    /* Urut dari yang paling jauh ke yang paling dekat (painter's algorithm) */
    const order = polys
      .map((poly, i) => ({ i, d: poly.reduce((s, p) => s + p.d, 0) / poly.length }))
      .sort((a, b) => a.d - b.d);

    const body = order.map(o => {
      const pts = polys[o.i].map(p => r1(p.x * sc + ox) + ',' + r1(p.y * sc + oy)).join(' ');
      return '<polygon points="' + pts + '" fill="' + FILLS[o.i % FILLS.length] +
        '" stroke="#C9B46A" stroke-opacity=".55" stroke-width="1.2" stroke-linejoin="round"/>';
    }).join('');

    const info = t < 0.05 ? shape.flat : t > 0.95 ? shape.space : 'Sedang dilipat — ' + Math.round(t * 100) + '%';
    return {
      svg: '<svg class="inter__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + shape.label + ', ' + info + '">' + body + '</svg>',
      info: info
    };
  }

  /* =========================================================
     2. GRAFIK FUNGSI LINEAR
     ========================================================= */

  function eqText(a, b) {
    const av = Math.round(a * 100) / 100;
    let s;
    if (Math.abs(av) < 1e-9) return fmt(b);
    if (Math.abs(av - 1) < 1e-9) s = 'x';
    else if (Math.abs(av + 1) < 1e-9) s = '−x';
    else s = fmt(av) + 'x';
    if (Math.abs(b) > 1e-9) s += (b > 0 ? ' + ' : ' − ') + fmt(Math.abs(b));
    return s;
  }

  function graphSvg(a, b, x) {
    const W = 420, H = 300, L = 38, Rr = 16, T = 18, B = 30;
    const X0 = -5, X1 = 5;
    const fx = v => a * v + b;

    /* Rentang sumbu y mengikuti garis, dan 0 selalu ikut kalau dekat */
    let lo = Math.min(fx(X0), fx(X1), 0), hi = Math.max(fx(X0), fx(X1), 0);
    if (hi - lo < 2) { const m = (hi + lo) / 2; lo = m - 1; hi = m + 1; }
    const padY = (hi - lo) * 0.14; lo -= padY; hi += padY;

    const w = W - L - Rr, h = H - T - B;
    const px = v => L + (v - X0) / (X1 - X0) * w;
    const py = v => T + (hi - v) / (hi - lo) * h;
    const step = niceStep(hi - lo);
    const grid = ' stroke="#282C14" stroke-width="1"';
    const tick = ' fill="#8C9068" font-size="9" font-family="Inter,sans-serif"';
    const g = [];

    /* Kisi */
    for (let v = X0; v <= X1 + 1e-9; v++) {
      g.push('<line x1="' + r1(px(v)) + '" y1="' + T + '" x2="' + r1(px(v)) + '" y2="' + (T + h) + '"' + grid + '/>');
    }
    for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) {
      g.push('<line x1="' + L + '" y1="' + r1(py(v)) + '" x2="' + (L + w) + '" y2="' + r1(py(v)) + '"' + grid + '/>');
    }

    /* Sumbu x dan y */
    g.push('<line x1="' + L + '" y1="' + r1(py(0)) + '" x2="' + (L + w) + '" y2="' + r1(py(0)) + '" stroke="#4A5228" stroke-width="1.4"/>');
    g.push('<line x1="' + r1(px(0)) + '" y1="' + T + '" x2="' + r1(px(0)) + '" y2="' + (T + h) + '" stroke="#4A5228" stroke-width="1.4"/>');

    /* Angka pada sumbu */
    for (let v = -4; v <= 4; v += 2) {
      if (!v) continue;
      g.push('<text x="' + r1(px(v)) + '" y="' + (T + h + 14) + '" text-anchor="middle"' + tick + '>' + fmt(v) + '</text>');
    }
    for (let v = Math.ceil(lo / step) * step; v <= hi - 1e-9; v += step) {
      if (Math.abs(v) < 1e-9) continue;
      g.push('<text x="' + (L - 8) + '" y="' + r1(py(v) + 3) + '" text-anchor="end"' + tick + '>' + fmt(v) + '</text>');
    }
    g.push('<text x="' + (L + w) + '" y="' + (T + h + 14) + '" text-anchor="end"' + tick + '>x</text>');
    g.push('<text x="' + (px(0) + 6) + '" y="' + (T + 10) + '"' + tick + '>y</text>');

    /* Garis f(x) */
    g.push('<line x1="' + r1(px(X0)) + '" y1="' + r1(py(fx(X0))) + '" x2="' + r1(px(X1)) + '" y2="' + r1(py(fx(X1))) +
      '" stroke="#C9B46A" stroke-width="2.4" stroke-linecap="round"/>');

    /* Garis bantu putus-putus ke titik (x, f(x)) */
    const cx = px(x), cy = py(fx(x));
    g.push('<line x1="' + r1(cx) + '" y1="' + r1(cy) + '" x2="' + r1(cx) + '" y2="' + r1(py(0)) +
      '" stroke="#C9A898" stroke-opacity=".45" stroke-width="1.2" stroke-dasharray="4 4"/>');
    g.push('<line x1="' + r1(px(0)) + '" y1="' + r1(cy) + '" x2="' + r1(cx) + '" y2="' + r1(cy) +
      '" stroke="#C9A898" stroke-opacity=".45" stroke-width="1.2" stroke-dasharray="4 4"/>');

    /* Titik */
    g.push('<circle cx="' + r1(px(0)) + '" cy="' + r1(py(0)) + '" r="2.5" fill="#4A5228"/>');
    g.push('<circle cx="' + r1(cx) + '" cy="' + r1(cy) + '" r="11" fill="#C9B46A" fill-opacity=".16"/>');
    g.push('<circle cx="' + r1(cx) + '" cy="' + r1(cy) + '" r="5" fill="#C9B46A" stroke="#13150C" stroke-width="2"/>');

    /* Label titik, dijaga tetap di dalam bidang grafik */
    const label = '(' + fmt(x) + '; ' + fmt(fx(x)) + ')';
    const right = cx < L + w - 84;
    const ly = clamp(cy - 17, T + 11, T + h - 6);
    g.push('<text x="' + r1(cx + (right ? 15 : -15)) + '" y="' + r1(ly) + '" text-anchor="' + (right ? 'start' : 'end') +
      '" fill="#EDE8CC" font-size="11" font-weight="600" font-family="Inter,sans-serif">' + label + '</text>');

    return '<svg class="inter__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Grafik f(x) = ' +
      eqText(a, b) + ', titik (' + fmt(x) + '; ' + fmt(fx(x)) + ')">' + g.join('') + '</svg>';
  }

  /* Dipakai untuk menguji geometri di luar browser */
  if (typeof window !== 'undefined') {
    window.OwlyInteraktif = { netSvg: netSvg, graphSvg: graphSvg, foldFaces: foldFaces, SHAPES: SHAPES };
  }
  if (typeof document === 'undefined') return;

  /* =========================================================
     3. PEMASANGAN WIDGET DI HALAMAN
     ========================================================= */

  function ctl(k, label, min, max, step, val) {
    return '<label class="ctl"><span>' + label + '</span><b data-out="' + k + '">' + fmt(val) + '</b>' +
      '<input type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val +
      '" data-k="' + k + '" aria-label="' + label + '"></label>';
  }

  /* ---------- Widget grafik fungsi ---------- */
  function mountGraph(host) {
    const read = (v, d) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };
    const st = {
      x: clamp(read(host.dataset.x, 1), -5, 5),
      a: clamp(read(host.dataset.a, 2), -3, 3),
      b: clamp(read(host.dataset.b, 1), -5, 5)
    };

    host.classList.add('inter', 'inter--graph');
    host.innerHTML =
      '<figcaption class="inter__cap">Coba sendiri · grafik fungsi</figcaption>' +
      '<div class="inter__body">' +
        '<div class="inter__plot" data-plot></div>' +
        '<div class="inter__side">' +
          '<p class="inter__eq" data-eq></p>' +
          '<p class="inter__val" data-val aria-live="polite"></p>' +
          '<div class="inter__ctl">' +
            ctl('x', 'nilai x', -5, 5, 0.5, st.x) +
            ctl('a', 'kemiringan a', -3, 3, 0.5, st.a) +
            ctl('b', 'konstanta b', -5, 5, 1, st.b) +
          '</div>' +
          '<p class="inter__hint">Geser x, lalu lihat titiknya berjalan di sepanjang garis.</p>' +
        '</div>' +
      '</div>';

    const plot = host.querySelector('[data-plot]');
    const eq = host.querySelector('[data-eq]');
    const val = host.querySelector('[data-val]');

    function update() {
      plot.innerHTML = graphSvg(st.a, st.b, st.x);
      eq.innerHTML = 'f(x) = ' + eqText(st.a, st.b);
      val.innerHTML = 'f(' + fmt(st.x) + ') = <b>' + fmt(st.a * st.x + st.b) + '</b>' +
        '<small>titik (' + fmt(st.x) + '; ' + fmt(st.a * st.x + st.b) + ') berada di garis</small>';
      host.querySelectorAll('[data-k]').forEach(inp => {
        const o = host.querySelector('[data-out="' + inp.dataset.k + '"]');
        if (o) o.textContent = fmt(parseFloat(inp.value));
      });
    }

    host.addEventListener('input', e => {
      const k = e.target.dataset.k;
      if (!k) return;
      st[k] = parseFloat(e.target.value);
      update();
    });

    update();
  }

  /* ---------- Widget jaring-jaring bangun ruang ---------- */
  function mountNet(host) {
    const st = {
      shape: SHAPES[host.dataset.shape] ? host.dataset.shape : 'kubus',
      t: 0,
      yaw: -30,
      tilt: 0
    };

    host.classList.add('inter', 'inter--net');
    host.innerHTML =
      '<figcaption class="inter__cap">Coba sendiri · bentangkan jadi jaring-jaring</figcaption>' +
      '<div class="inter__tabs">' + Object.keys(SHAPES).map(k =>
        '<button type="button" class="inter__tab" data-shape="' + k + '">' + SHAPES[k].label + '</button>').join('') + '</div>' +
      '<div class="inter__plot" data-plot></div>' +
      '<div class="inter__ctl">' +
        '<label class="ctl"><span>Lipat bangun ruang</span><b data-pct>0%</b>' +
          '<input type="range" min="0" max="100" step="1" value="0" data-t aria-label="Lipat bangun ruang">' +
        '</label>' +
        '<div class="inter__ends"><span>Jaring-jaring</span><span>Bangun ruang</span></div>' +
      '</div>' +
      '<p class="inter__info" data-info></p>' +
      '<p class="inter__hint">Tarik gambar untuk memutar, geser penggeser untuk melipat.</p>';

    const plot = host.querySelector('[data-plot]');
    const info = host.querySelector('[data-info]');
    const pct = host.querySelector('[data-pct]');
    const range = host.querySelector('[data-t]');
    const tabs = host.querySelectorAll('[data-shape]');

    function update() {
      const out = netSvg(st.shape, st.t, st.yaw, st.tilt);
      plot.innerHTML = out.svg;
      info.innerHTML = out.info;
      pct.textContent = Math.round(st.t * 100) + '%';
      tabs.forEach(b => b.classList.toggle('is-active', b.dataset.shape === st.shape));
    }

    host.addEventListener('input', e => {
      if (!e.target.dataset.t) return;
      st.t = parseFloat(e.target.value) / 100;
      update();
    });

    host.addEventListener('click', e => {
      const b = e.target.closest('[data-shape]');
      if (!b) return;
      st.shape = b.dataset.shape;
      update();
    });

    /* Tarik untuk memutar bangun (yaw & kemiringan kamera) */
    let drag = null;
    plot.addEventListener('pointerdown', e => {
      drag = { x: e.clientX, y: e.clientY, yaw: st.yaw, tilt: st.tilt };
      plot.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    plot.addEventListener('pointermove', e => {
      if (!drag) return;
      st.yaw = drag.yaw + (e.clientX - drag.x) * 0.6;
      st.tilt = clamp(drag.tilt - (e.clientY - drag.y) * 0.3, -40, 40);
      update();
    });
    ['pointerup', 'pointercancel'].forEach(ev => plot.addEventListener(ev, () => { drag = null; }));

    /* Klik tombol jaring-jaring ⇄ bangun ruang tetap bisa lewat penggeser */
    range.addEventListener('dblclick', () => { st.t = st.t > 0.5 ? 0 : 1; range.value = st.t * 100; update(); });

    update();
  }

  const WIDGETS = { graph: mountGraph, net: mountNet };
  document.querySelectorAll('[data-widget]').forEach(host => {
    const mount = WIDGETS[host.dataset.widget];
    if (mount) mount(host);
  });
})();
