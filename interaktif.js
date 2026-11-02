/* =========================================================
   interaktif.js — widget belajar interaktif (belajar.html)
   Widget dipanggil lewat atribut data-widget:
     · "graph" — grafik fungsi linear f(x) = ax + b, dengan
                 penggeser a, b, dan x. Nilai f(x) tampil di grafik.
     · "net"   — bangun ruang (kubus, balok, prisma segitiga, tabung,
                 limas) yang bisa dilipat jadi jaring-jaring.
     · "sorot" — paragraf yang kalimat utamanya harus ditandai murid,
                 lalu pola paragraf dan simpulannya dibuka.
     · "dadu"  — lempar dadu berkali-kali, bandingkan peluang teoretis
                 1/6 dengan frekuensi hasil percobaan.
     · "capit" — mesin capit bola: peluang tiap warna berubah karena
                 bola yang terambil tidak dikembalikan.
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

  /* Tabung: selimut yang datar dilengkungkan, bukan dilipat pada engsel.
     Titik (x, y, 0) dipetakan ke busur berjari-jari r; kelengkungannya
     κ = t / r, jadi saat t = 0 hasilnya tetap titik asal (datar). */
  function bendPoint(p, r, t) {
    const k = t / r;
    const a = k * p[0];
    if (Math.abs(a) < 1e-6) return p;
    return [Math.sin(a) / k, p[1], (1 - Math.cos(a)) / k];
  }

  /* Lingkaran datar berjari-jari r, pusatnya di (0, cy) */
  function disc(r, cy, n) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2;
      pts.push([Math.sin(a) * r, cy + Math.cos(a) * r, 0]);
    }
    return pts;
  }

  /* Tabung: jari-jari r, tinggi h.
     Selimut datar 2πr × h dipecah jadi banyak pita supaya bisa dilengkungkan;
     alas dan tutup berupa lingkaran yang berengsel di titik singgungnya. */
  function cylinderFaces(r, h) {
    const N = 36, C = 2 * Math.PI * r, faces = [], v = { fill: '#3F4823', stroke: 0.14 };
    for (let i = 0; i < N; i++) {
      /* Semua pita bagian dari satu selimut, jadi warnanya disamakan:
         yang terlihat hanya garis sambung yang tipis. */
      faces.push({ poly: rect(C * i / N, 0, C * (i + 1) / N, h), bend: r, fill: v.fill, stroke: v.stroke });
    }
    faces.push({ poly: disc(r, h + r, 48), hinge: { o: [0, h, 0], k: KX }, ang: t => Q * t, fill: '#4C5729' });   /* tutup */
    faces.push({ poly: disc(r, -r, 48), hinge: { o: [0, 0, 0], k: KX }, ang: t => -Q * t, fill: '#333B1C' });     /* alas */
    return faces;
  }

  /* Limas: alas persegi s × s, tinggi h.
     Empat segitiga berengsel di rusuk alas; sudut lipatnya lebih dari 90°
     supaya puncaknya bertemu di atas pusat alas. */
  function pyramidFaces(s, h) {
    const l = Math.hypot(s / 2, h);
    const a = Math.PI - Math.atan2(h, s / 2);
    return [
      { poly: rect(0, 0, s, s) },                                                                  /* alas */
      { poly: [[0, 0, 0], [s, 0, 0], [s / 2, -l, 0]], parent: 0, hinge: { o: [0, 0, 0], k: KX }, ang: t => -a * t },   /* depan */
      { poly: [[s, s, 0], [0, s, 0], [s / 2, s + l, 0]], parent: 0, hinge: { o: [0, s, 0], k: KX }, ang: t => a * t },  /* belakang */
      { poly: [[0, s, 0], [0, 0, 0], [-l, s / 2, 0]], parent: 0, hinge: { o: [0, 0, 0], k: KY }, ang: t => a * t },      /* kiri */
      { poly: [[s, 0, 0], [s, s, 0], [s + l, s / 2, 0]], parent: 0, hinge: { o: [s, 0, 0], k: KY }, ang: t => -a * t }   /* kanan */
    ];
  }

  /* Lipat semua sisi pada waktu t (0 = jaring-jaring datar, 1 = bangun ruang) */
  function foldFaces(faces, t) {
    const xf = [];
    return faces.map((f, i) => {
      const parent = f.parent == null ? [] : xf[f.parent];
      xf[i] = (f.hinge ? [{ o: f.hinge.o, k: f.hinge.k, a: f.ang(t) }] : []).concat(parent);
      return f.poly.map(p => {
        const q = f.bend ? bendPoint(p, f.bend, t) : p;   /* lengkung dulu, lalu engsel */
        return xf[i].reduce((r, s) => rot(r, s.o, s.k, s.a), q);
      });
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
    },
    tabung: {
      label: 'Tabung',
      faces: () => cylinderFaces(2, 4),
      pivot: [0, 2, 2],
      flat: 'Jaring-jaring tabung — 1 persegi panjang (selimut) + 2 lingkaran.',
      space: 'Tabung · jari-jari 2 cm, tinggi 4 cm · volume 50,3 cm³'
    },
    limas: {
      label: 'Limas',
      faces: () => pyramidFaces(6, 4),
      pivot: [3, 3, 4 / 3],
      elev: 16,   /* kamera sedikit lebih tinggi supaya alas limas terlihat */
      flat: 'Jaring-jaring limas — 1 persegi + 4 segitiga.',
      space: 'Limas · alas 6 cm, tinggi 4 cm · volume 48 cm³'
    }
  };

  /* Warna sisi bergantian supaya lipatannya mudah dibaca */
  const FILLS = ['#3F4823', '#4C5729', '#333B1C', '#566231', '#2C3319', '#49521F'];

  /* Gambar satu keadaan bangun ruang. yaw & tilt dalam derajat. */
  function netSvg(key, t, yawDeg, tiltDeg) {
    const shape = SHAPES[key] || SHAPES.kubus;
    const src = shape.faces();
    const pv = shape.pivot;
    const yaw = yawDeg * R;
    const elev = clamp(90 - 62 * t + tiltDeg + (shape.elev || 0), 8, 88) * R;
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const ce = Math.cos(elev), se = Math.sin(elev);

    const polys = foldFaces(src, t).map(poly => poly.map(p => {
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
      const face = src[o.i];
      const fill = face.fill || FILLS[o.i % FILLS.length];
      const so = face.stroke != null ? face.stroke : 0.55;
      const pts = polys[o.i].map(p => r1(p.x * sc + ox) + ',' + r1(p.y * sc + oy)).join(' ');
      return '<polygon points="' + pts + '" fill="' + fill +
        '" stroke="#C9B46A" stroke-opacity="' + so + '" stroke-width="1.2" stroke-linejoin="round"/>';
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
      /* data-t tidak punya nilai, jadi dataset.t = "" (falsy) —
         cek keberadaan atributnya, bukan isinya. */
      if (e.target !== range) return;
      st.t = parseFloat(range.value) / 100;
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

  /* ---------- Widget tanda ide pokok (paragraf interaktif) ----------
     Paragrafnya dikirim dari materi.js sebagai JSON di dalam <figure>,
     jadi kalimat tidak perlu di-escape satu per satu. */
  function mountSorot(host) {
    const data = host.querySelector('script[type="application/json"]');
    let cfg = null;
    try { cfg = JSON.parse(data ? data.textContent : ''); } catch (e) { cfg = null; }
    if (!cfg || !cfg.kalimat || !cfg.kalimat.length) return;
    if (data) data.remove();

    const kal = cfg.kalimat;
    const utama = kal.map(k => k[1] === 'utama');
    const pilih = new Set();
    let beres = false;

    host.classList.add('inter', 'inter--sorot');
    host.innerHTML =
      '<figcaption class="inter__cap">Coba sendiri · temukan ide pokok</figcaption>' +
      '<p class="sorot__ask">Baca paragraf di bawah, lalu klik kalimat yang memuat <b>ide pokok</b>. Ide pokok bisa lebih dari satu.</p>' +
      '<div class="sorot__text" data-text>' +
        kal.map((k, i) =>
          '<button type="button" class="sorot__s" data-i="' + i + '" aria-pressed="false">' +
            '<span class="sorot__n">' + (i + 1) + '</span>' +
            '<span class="sorot__w">' + k[0] + '</span>' +
            '<span class="sorot__why">' + (k[2] || '') + '</span>' +
          '</button>').join('') +
      '</div>' +
      '<div class="sorot__foot">' +
        '<button type="button" class="inter__tab sorot__cek" data-cek>Cek jawaban</button>' +
        '<span class="sorot__fb" data-fb role="status" aria-live="polite"></span>' +
      '</div>' +
      '<div class="sorot__out" data-out hidden></div>';

    const text = host.querySelector('[data-text]');
    const fb = host.querySelector('[data-fb]');
    const cekBtn = host.querySelector('[data-cek]');
    const out = host.querySelector('[data-out]');
    const cards = Array.prototype.slice.call(host.querySelectorAll('.sorot__s'));

    /* Nama pola paragraf ditentukan dari letak kalimat utamanya */
    function pola() {
      const idx = utama.map((v, i) => v ? i : -1).filter(i => i >= 0);
      const awal = idx.indexOf(0) >= 0, akhir = idx.indexOf(kal.length - 1) >= 0;
      if (awal && akhir && idx.length > 1) return ['campuran', 'kalimat utama ada di awal dan di akhir paragraf'];
      if (awal) return ['deduktif', 'kalimat utama ada di awal paragraf'];
      if (akhir) return ['induktif', 'kalimat utama ada di akhir paragraf'];
      return ['berpola bebas', 'kalimat utama ada di tengah paragraf'];
    }

    function ulang() {
      beres = false;
      pilih.clear();
      fb.textContent = '';
      text.classList.remove('is-revealed');
      out.hidden = true;
      out.innerHTML = '';
      cekBtn.textContent = 'Cek jawaban';
      cards.forEach(c => {
        c.disabled = false;
        c.classList.remove('is-utama', 'is-penjelas', 'is-wrong');
        c.setAttribute('aria-pressed', 'false');
      });
    }

    function buka() {
      beres = true;
      fb.textContent = 'Benar. Kalimat lain hanya penjelas — perhatikan alasannya.';
      text.classList.add('is-revealed');
      cards.forEach((c, i) => {
        c.disabled = true;
        c.classList.remove('is-wrong');
        c.setAttribute('aria-pressed', utama[i] ? 'true' : 'false');
        c.classList.add(utama[i] ? 'is-utama' : 'is-penjelas');
      });
      const p = pola();
      out.innerHTML =
        '<p class="sorot__verdict">Paragraf <b>' + p[0] + '</b><small>' + p[1] + '</small></p>' +
        (cfg.simpulan ? '<p class="sorot__simpul"><span>Simpulan paragraf</span>' + cfg.simpulan + '</p>' : '');
      out.hidden = false;
      cekBtn.textContent = 'Ulangi';
    }

    function cek() {
      if (beres) { ulang(); return; }
      if (!pilih.size) { fb.textContent = 'Klik dulu satu kalimat, baru tekan Cek jawaban.'; return; }
      const salah = Array.from(pilih).filter(i => !utama[i]);
      if (salah.length) {
        const i = salah[0];
        fb.textContent = 'Kalimat ' + (i + 1) + ' belum bisa jadi ide pokok: ' + (kal[i][2] || 'isinya masih rincian.');
        cards[i].classList.remove('is-wrong');
        void cards[i].offsetWidth;   /* supaya animasinya bisa diputar ulang */
        cards[i].classList.add('is-wrong');
        return;
      }
      if (utama.some((v, i) => v && !pilih.has(i))) {
        fb.textContent = 'Tepat sebagian: kalimat yang kamu pilih memang kalimat utama, tapi paragraf ini masih punya kalimat utama lain.';
        return;
      }
      buka();
    }

    host.addEventListener('click', e => {
      if (e.target.closest('[data-cek]')) { cek(); return; }
      const b = e.target.closest('.sorot__s');
      if (!b || beres) return;
      const i = Number(b.dataset.i);
      b.classList.remove('is-wrong');
      if (pilih.has(i)) { pilih.delete(i); b.setAttribute('aria-pressed', 'false'); }
      else { pilih.add(i); b.setAttribute('aria-pressed', 'true'); }
      fb.textContent = '';
    });
  }

  /* ---------- Widget lempar dadu (peluang) ----------
     Peluang teoretis 1/6 dibandingkan dengan hasil lemparan murid sendiri,
     supaya terlihat bahwa percobaan makin dekat ke 1/6 saat lemparan bertambah. */
  const PIPS = [[4], [0, 8], [0, 4, 8], [0, 2, 6, 8], [0, 2, 4, 6, 8], [0, 2, 3, 5, 6, 8]];

  function mukaDadu(n) {
    const isi = n ? PIPS[n - 1] : [];
    let out = '';
    for (let i = 0; i < 9; i++) out += '<span class="dadu__pip' + (isi.indexOf(i) >= 0 ? ' is-on' : '') + '"></span>';
    return out;
  }

  function mountDadu(host) {
    const MATA = clamp(parseInt(host.dataset.mata, 10) || 6, 1, 6);
    const hitung = [0, 0, 0, 0, 0, 0];
    let n = 0, sibuk = false, timer = null;

    host.classList.add('inter', 'inter--dadu');
    host.innerHTML =
      '<figcaption class="inter__cap">Coba sendiri · lempar dadu</figcaption>' +
      '<div class="dadu">' +
        '<div class="dadu__die" data-die aria-hidden="true">' + mukaDadu(0) + '</div>' +
        '<div class="dadu__side">' +
          '<div class="dadu__ctl">' +
            '<button type="button" class="inter__tab dadu__btn" data-lempar="1">Lempar sekali</button>' +
            '<button type="button" class="inter__tab dadu__btn" data-lempar="10">Lempar 10×</button>' +
            '<button type="button" class="inter__tab dadu__btn dadu__ulang" data-ulang>Ulangi</button>' +
          '</div>' +
          '<p class="dadu__prob" data-prob role="status" aria-live="polite"></p>' +
        '</div>' +
      '</div>' +
      '<div class="dadu__tally">' +
        hitung.map((_, i) =>
          '<div class="dadu__col" data-kolom="' + (i + 1) + '">' +
            '<span class="dadu__c" data-c>0</span>' +
            '<span class="dadu__track"><i data-bar></i><em class="dadu__line" title="peluang teoretis 1/6"></em></span>' +
            '<b class="dadu__f">' + (i + 1) + '</b>' +
          '</div>').join('') +
      '</div>' +
      '<p class="inter__hint">Garis putus-putus adalah peluang teoretis tiap mata, 1/6 ≈ 16,7%. Makin banyak lemparan, makin dekat batang hasil percobaan ke garis itu.</p>';

    const die = host.querySelector('[data-die]');
    const prob = host.querySelector('[data-prob]');
    const kolom = Array.prototype.slice.call(host.querySelectorAll('[data-kolom]'));
    const bar = kolom.map(k => k.querySelector('[data-bar]'));
    const angka = kolom.map(k => k.querySelector('[data-c]'));

    /* Tinggi batang: frekuensi relatif 0–50% dipetakan ke 0–100% tinggi kotak. */
    const SKALA = 50;

    function render() {
      hitung.forEach((v, i) => {
        const rel = n ? v / n * 100 : 0;
        angka[i].textContent = v;
        bar[i].style.height = clamp(rel / SKALA * 100, 0, 100) + '%';
        kolom[i].classList.toggle('is-target', i === MATA - 1);
      });
      if (!n) {
        prob.innerHTML = 'Tekan <b>Lempar sekali</b>. Sebelum itu, coba tebak dulu: mata berapa yang akan muncul?';
      } else {
        const kali = hitung[MATA - 1];
        prob.innerHTML =
          'Mata ' + MATA + ' keluar <b>' + kali + '</b> dari ' + n + ' lemparan = <b>' + fmt(kali / n * 100) + '%</b>' +
          '<small>peluang teoretis 1/6 ≈ 16,7% · frekuensi harapan dalam ' + n +
          ' lemparan ≈ ' + fmt(n / 6) + ' kali</small>';
      }
    }

    const acak = () => 1 + Math.floor(Math.random() * 6);

    function lempar(k) {
      if (sibuk) return;
      sibuk = true;
      host.classList.add('is-roll');
      const hasil = [];
      for (let i = 0; i < k; i++) hasil.push(acak());
      let putar = 0;
      const batas = k === 1 ? 7 : 5;
      timer = setInterval(() => {
        putar++;
        die.innerHTML = mukaDadu(acak());
        if (putar < batas) return;
        clearInterval(timer);
        timer = null;
        hasil.forEach(h => { hitung[h - 1]++; });
        n += hasil.length;
        die.innerHTML = mukaDadu(hasil[hasil.length - 1]);
        host.classList.remove('is-roll');
        sibuk = false;
        render();
      }, 60);
    }

    function ulang() {
      if (timer) { clearInterval(timer); timer = null; }
      sibuk = false;
      host.classList.remove('is-roll');
      hitung.fill(0);
      n = 0;
      die.innerHTML = mukaDadu(0);
      render();
    }

    host.addEventListener('click', e => {
      const l = e.target.closest('[data-lempar]');
      if (l) { lempar(Number(l.dataset.lempar) || 1); return; }
      if (e.target.closest('[data-ulang]')) ulang();
    });

    render();
  }

  /* ---------- Widget mesin capit bola (peluang tanpa pengembalian) ----------
     Bola yang terambil tidak dikembalikan, jadi peluang tiap warna berubah
     setelah setiap ambilan — hal yang paling sering terlewat oleh murid. */
  const WARNA_BOLA = { emas: '#C9B46A', kaca: '#A8B278' };
  /* Kotak mesin memuat 6 bola: 3 kolom × 2 baris. */
  const SLOT_BOLA = [[88, 110], [88, 170], [160, 110], [160, 170], [232, 110], [232, 170]];

  function mountCapit(host) {
    const data = host.querySelector('script[type="application/json"]');
    let cfg = null;
    try { cfg = JSON.parse(data ? data.textContent : ''); } catch (e) { cfg = null; }
    if (data) data.remove();
    if (!cfg || !Array.isArray(cfg.isi) || !cfg.isi.length) return;

    const kunci = cfg.isi.map(p => p[0]);
    const warna = k => WARNA_BOLA[k] || '#9AA45F';
    const nama = k => (cfg.label && cfg.label[k]) || k;

    const awal = [];
    cfg.isi.forEach(p => {
      for (let i = 0; i < (Number(p[1]) || 0) && awal.length < SLOT_BOLA.length; i++) awal.push(p[0]);
    });
    if (!awal.length) return;

    let sisa = [], keranjang = [], tebak = null, sibuk = false, waktu = [];

    host.classList.add('inter', 'inter--capit');
    host.innerHTML =
      '<figcaption class="inter__cap">Coba sendiri · mesin capit bola</figcaption>' +
      '<svg class="inter__svg capit__stage" viewBox="0 0 320 268" role="img" aria-label="Mesin capit berisi bola">' +
        '<line class="capit__rail" x1="46" y1="14" x2="274" y2="14"/>' +
        '<rect class="capit__glass" x="30" y="34" width="260" height="182" rx="14"/>' +
        '<g data-balls></g>' +
        '<g class="capit__car" data-car style="transform:translate(160px,0px)">' +
          '<rect class="capit__box" x="-15" y="4" width="30" height="12" rx="4"/>' +
          '<g class="capit__claw" data-claw style="transform:translate(0px,0px)">' +
            '<line class="capit__rod" x1="0" y1="0" x2="0" y2="44"/>' +
            '<path class="capit__prong" d="M0 44 L-13 64 M0 44 L13 64"/>' +
            '<circle class="capit__hold" data-hold cx="0" cy="72" r="15"/>' +
          '</g>' +
        '</g>' +
        '<rect class="capit__tray" x="30" y="222" width="260" height="30" rx="9"/>' +
        '<g data-tray></g>' +
      '</svg>' +
      '<div class="capit__panel">' +
        '<div class="capit__probs" data-probs></div>' +
        '<div class="capit__play">' +
          '<p class="capit__ask">Bola mana yang <b>paling mungkin</b> terambil?</p>' +
          '<div class="capit__tebakan" data-tebakan>' +
            kunci.map(k => '<button type="button" class="inter__tab capit__tebak" data-tebak="' + k +
              '" aria-pressed="false" style="--c:' + warna(k) + '">' + nama(k) + '</button>').join('') +
          '</div>' +
          '<button type="button" class="inter__tab capit__go" data-ambil>Tekan capit</button>' +
          '<button type="button" class="inter__tab capit__ulang" data-ulang>Isi ulang</button>' +
        '</div>' +
      '</div>' +
      '<p class="capit__fb" data-fb role="status" aria-live="polite"></p>' +
      '<p class="inter__hint">Bola yang sudah terambil tidak dikembalikan, jadi peluang warna yang tersisa berubah setelah setiap ambilan.</p>';

    const balls = host.querySelector('[data-balls]');
    const tray = host.querySelector('[data-tray]');
    const car = host.querySelector('[data-car]');
    const claw = host.querySelector('[data-claw]');
    const hold = host.querySelector('[data-hold]');
    const probs = host.querySelector('[data-probs]');
    const fb = host.querySelector('[data-fb]');
    const go = host.querySelector('[data-ambil]');
    const tebakBtn = Array.prototype.slice.call(host.querySelectorAll('[data-tebak]'));

    function render() {
      balls.innerHTML = sisa.map(b =>
        '<circle class="capit__ball" cx="' + b.x + '" cy="' + b.y + '" r="15" fill="' + warna(b.key) + '"/>').join('');
      tray.innerHTML = keranjang.map((k, i) =>
        '<circle class="capit__ball" cx="' + (58 + i * 34) + '" cy="237" r="11" fill="' + warna(k) + '"/>').join('');

      const n = sisa.length;
      probs.innerHTML = kunci.map(k => {
        const c = sisa.filter(b => b.key === k).length;
        const p = n ? c / n * 100 : 0;
        return '<div class="capit__row' + (c ? '' : ' is-empty') + '">' +
          '<span class="capit__dot" style="background:' + warna(k) + '"></span>' +
          '<span class="capit__nm">' + nama(k) + '</span>' +
          '<b class="capit__frac">' + (n ? c + '/' + n : '—') + '</b>' +
          '<span class="capit__pct">' + (n ? fmt(p) + '%' : '—') + '</span>' +
          '<span class="capit__meter"><i style="width:' + p + '%;background:' + warna(k) + '"></i></span>' +
        '</div>';
      }).join('');
    }

    function langkah(ms, fn) { waktu.push(setTimeout(fn, ms)); }

    function ulang() {
      waktu.forEach(t => clearTimeout(t));
      waktu = [];
      sibuk = false;
      tebak = null;
      keranjang = [];
      const urut = awal.slice();
      for (let i = urut.length - 1; i > 0; i--) {   /* acak letak bola di dalam kotak */
        const j = Math.floor(Math.random() * (i + 1));
        const t = urut[i]; urut[i] = urut[j]; urut[j] = t;
      }
      sisa = urut.map((k, i) => ({ key: k, x: SLOT_BOLA[i][0], y: SLOT_BOLA[i][1] }));
      go.disabled = false;
      car.style.transform = 'translate(160px,0px)';
      claw.style.transform = 'translate(0px,0px)';
      claw.classList.remove('is-holding');
      tebakBtn.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      fb.textContent = '';
      render();
    }

    function kabar(key, dugaan, sebelum) {
      const jumlah = k => sebelum.filter(b => b.key === k).length;
      const terbanyak = Math.max.apply(null, kunci.map(jumlah));
      const kandidat = kunci.filter(k => jumlah(k) === terbanyak);
      const p = Math.round(jumlah(key) / sebelum.length * 100);
      let pesan = 'Yang terambil <b>' + nama(key) + '</b>. Sebelum ambilan itu peluangnya <b>' +
        jumlah(key) + '/' + sebelum.length + ' ≈ ' + p + '%</b>. ';

      if (dugaan === key) {
        pesan += 'Tebakanmu tepat.';
      } else if (kandidat.indexOf(dugaan) >= 0) {
        pesan += 'Tebakanmu ' + nama(dugaan) + ' memang yang peluangnya terbesar (' + terbanyak + '/' +
          sebelum.length + '), tetapi yang keluar ' + nama(key) + '. Peluang terbesar berarti paling sering terjadi, bukan pasti terjadi.';
      } else {
        pesan += 'Tebakanmu ' + nama(dugaan) + ', padahal ' + nama(kandidat[0]) + ' yang peluangnya lebih besar (' +
          terbanyak + '/' + sebelum.length + '). Bandingkan lagi angkanya sebelum menebak.';
      }

      if (!sisa.length) {
        pesan += '<small>Kotak sudah kosong — semua bola terambil. Tekan Isi ulang untuk mengulang percobaan.</small>';
      } else {
        const rinci = kunci.map(k => jumlah(k) - (k === key ? 1 : 0) + ' ' + nama(k)).join(', ');
        const sisaJumlah = sisa.filter(b => b.key === key).length;
        pesan += '<small>Karena tidak dikembalikan, isi kotak sekarang berubah: ' + rinci +
          '. Peluang ' + nama(key) + ' pada ambilan berikutnya ' + sisaJumlah + '/' + sisa.length +
          ' ≈ ' + fmt(sisaJumlah / sisa.length * 100) + '%.</small>';
      }
      fb.innerHTML = pesan;
    }

    function ambil() {
      if (sibuk) return;
      if (!sisa.length) {
        fb.innerHTML = 'Kotak sudah kosong. Tekan <b>Isi ulang</b> untuk mencoba lagi.';
        return;
      }
      if (!tebak) {
        fb.textContent = 'Pilih dulu warna yang menurutmu paling mungkin keluar, lalu tekan capit.';
        return;
      }
      sibuk = true;
      go.disabled = true;
      fb.textContent = '';

      const i = Math.floor(Math.random() * sisa.length);
      const dapat = sisa[i];
      const dugaan = tebak;
      const sebelum = sisa.slice();

      car.style.transform = 'translate(' + dapat.x + 'px,0px)';
      langkah(380, () => { claw.style.transform = 'translate(0px,' + (dapat.y - 72) + 'px)'; });
      langkah(720, () => {
        sisa.splice(i, 1);
        hold.setAttribute('fill', warna(dapat.key));
        claw.classList.add('is-holding');
        render();
        claw.style.transform = 'translate(0px,0px)';
      });
      langkah(1100, () => {
        claw.classList.remove('is-holding');
        keranjang.push(dapat.key);
        render();
        kabar(dapat.key, dugaan, sebelum);
        sibuk = false;
        tebak = null;
        go.disabled = false;
        tebakBtn.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      });
    }

    host.addEventListener('click', e => {
      const t = e.target.closest('[data-tebak]');
      if (t) {
        if (sibuk || !sisa.length) return;
        tebak = t.dataset.tebak;
        tebakBtn.forEach(b => {
          b.classList.toggle('is-active', b === t);
          b.setAttribute('aria-pressed', b === t ? 'true' : 'false');
        });
        fb.textContent = '';
        return;
      }
      if (e.target.closest('[data-ambil]')) { ambil(); return; }
      if (e.target.closest('[data-ulang]')) ulang();
    });

    ulang();
  }

  const WIDGETS = { graph: mountGraph, net: mountNet, sorot: mountSorot, dadu: mountDadu, capit: mountCapit };
  document.querySelectorAll('[data-widget]').forEach(host => {
    const mount = WIDGETS[host.dataset.widget];
    if (mount) mount(host);
  });
})();
