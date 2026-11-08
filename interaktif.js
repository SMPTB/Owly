/* =========================================================
   interaktif.js — widget belajar interaktif (belajar.html)
   Widget dipanggil lewat atribut data-widget:
     · "graph" — grafik fungsi linear f(x) = ax + b, dengan penggeser
                 a, b, x, serta geseran p dan q yang memindahkan
                 seluruh grafik (translasi grafik).
     · "net"   — bangun ruang (kubus, balok, prisma segitiga, tabung,
                 limas) yang bisa dilipat jadi jaring-jaring.
     · "sorot" — paragraf yang kalimat utamanya harus ditandai murid,
                 lalu pola paragraf dan simpulannya dibuka.
     · "dadu"  — lempar dadu berkali-kali, bandingkan peluang teoretis
                 1/6 dengan frekuensi hasil percobaan.
     · "capit" — mesin capit bola: peluang tiap warna berubah karena
                 bola yang terambil tidak dikembalikan.
     · "barisan" — penggeser barisan bilangan: pilih pola (aritmetika,
                 geometri, Fibonacci), geser posisi suku, ubah beda/rasio.
     · "sudut" — dua sudut berpelurus: geser sudut kiri, sudut kanan
                 ikut menyesuaikan supaya jumlahnya tetap 180°.
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
      flat: 'jaring-jaring (kubus)',
      space: 'Kubus · rusuk 4 cm · volume 64 cm³'
    },
    balok: {
      label: 'Balok',
      faces: () => boxFaces(6, 5, 4),
      pivot: [3, 2.5, 2],
      flat: 'jaring-jaring (balok)',
      space: 'Balok · 6 × 5 × 4 cm · volume 120 cm³'
    },
    prisma: {
      label: 'Prisma segitiga',
      faces: () => prismFaces(4, 3, 6),
      pivot: [2, 3, 1.5],
      flat: 'jaring-jaring (prisma segitiga)',
      space: 'Prisma segitiga · alas 4 cm, tinggi 3 cm · volume 36 cm³'
    },
    tabung: {
      label: 'Tabung',
      faces: () => cylinderFaces(2, 4),
      pivot: [0, 2, 2],
      flat: 'jaring-jaring (tabung)',
      space: 'Tabung · jari-jari 2 cm, tinggi 4 cm · volume 50,3 cm³'
    },
    limas: {
      label: 'Limas',
      faces: () => pyramidFaces(6, 4),
      pivot: [3, 3, 4 / 3],
      elev: 16,   /* kamera sedikit lebih tinggi supaya alas limas terlihat */
      flat: 'jaring-jaring (limas)',
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

    const info = t < 0.05 ? shape.flat : t > 0.95 ? shape.space : 'Sedang dilipat, ' + Math.round(t * 100) + '%';
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

  function graphSvg(a, b, x, p, q) {
    p = p || 0; q = q || 0;
    const geser = Math.abs(p) > 1e-9 || Math.abs(q) > 1e-9;
    const W = 420, H = 300, L = 38, Rr = 16, T = 18, B = 30;
    const X0 = -5, X1 = 5;
    const fx = v => a * v + b;
    /* Bayangan f setelah digeser sejauh (p; q): g(x) = f(x − p) + q */
    const gx = v => a * (v - p) + b + q;

    /* Rentang sumbu y mengikuti kedua garis, dan 0 selalu ikut kalau dekat */
    let lo = Math.min(fx(X0), fx(X1), gx(X0), gx(X1), 0);
    let hi = Math.max(fx(X0), fx(X1), gx(X0), gx(X1), 0);
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

    /* Garis asli f(x): jadi acuan putus-putus begitu grafik digeser */
    if (geser) {
      g.push('<line x1="' + r1(px(X0)) + '" y1="' + r1(py(fx(X0))) + '" x2="' + r1(px(X1)) + '" y2="' + r1(py(fx(X1))) +
        '" stroke="#8C9068" stroke-width="1.8" stroke-dasharray="7 5" stroke-linecap="round"/>');
    }

    /* Garis bayangan g(x) = f(x − p) + q. Tanpa geseran, inilah garis f(x). */
    g.push('<line x1="' + r1(px(X0)) + '" y1="' + r1(py(gx(X0))) + '" x2="' + r1(px(X1)) + '" y2="' + r1(py(gx(X1))) +
      '" stroke="#C9B46A" stroke-width="2.4" stroke-linecap="round"/>');

    /* Garis bantu putus-putus ke titik (x, g(x)) */
    const cx = px(x), cy = py(gx(x));

    /* Titik asal di garis f(x) tetap ditandai, jadi pergeserannya kelihatan */
    if (geser) {
      const ox = px(x), oy = py(fx(x));
      if (Math.abs(oy - cy) > 3) {
        g.push('<line x1="' + r1(ox) + '" y1="' + r1(oy) + '" x2="' + r1(cx) + '" y2="' + r1(cy) +
          '" stroke="#C9A898" stroke-opacity=".45" stroke-width="1.2" stroke-dasharray="3 4"/>');
      }
      g.push('<circle cx="' + r1(ox) + '" cy="' + r1(oy) + '" r="4.5" fill="none" stroke="#C9B46A" stroke-opacity=".7" stroke-width="1.6"/>');
    }
    g.push('<line x1="' + r1(cx) + '" y1="' + r1(cy) + '" x2="' + r1(cx) + '" y2="' + r1(py(0)) +
      '" stroke="#C9A898" stroke-opacity=".45" stroke-width="1.2" stroke-dasharray="4 4"/>');
    g.push('<line x1="' + r1(px(0)) + '" y1="' + r1(cy) + '" x2="' + r1(cx) + '" y2="' + r1(cy) +
      '" stroke="#C9A898" stroke-opacity=".45" stroke-width="1.2" stroke-dasharray="4 4"/>');

    /* Titik */
    g.push('<circle cx="' + r1(px(0)) + '" cy="' + r1(py(0)) + '" r="2.5" fill="#4A5228"/>');
    g.push('<circle cx="' + r1(cx) + '" cy="' + r1(cy) + '" r="11" fill="#C9B46A" fill-opacity=".16"/>');
    g.push('<circle cx="' + r1(cx) + '" cy="' + r1(cy) + '" r="5" fill="#C9B46A" stroke="#13150C" stroke-width="2"/>');

    /* Label titik, dijaga tetap di dalam bidang grafik */
    const label = '(' + fmt(x) + '; ' + fmt(gx(x)) + ')';
    const right = cx < L + w - 84;
    const ly = clamp(cy - 17, T + 11, T + h - 6);
    g.push('<text x="' + r1(cx + (right ? 15 : -15)) + '" y="' + r1(ly) + '" text-anchor="' + (right ? 'start' : 'end') +
      '" fill="#EDE8CC" font-size="11" font-weight="600" font-family="Inter,sans-serif">' + label + '</text>');

    const aria = geser
      ? 'Grafik f(x) = ' + eqText(a, b) + ' yang digeser (' + fmt(p) + '; ' + fmt(q) + ') menjadi g(x) = ' + eqText(a, b + q - a * p)
      : 'Grafik f(x) = ' + eqText(a, b) + ', titik (' + fmt(x) + '; ' + fmt(gx(x)) + ')';
    return '<svg class="inter__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + aria + '">' + g.join('') + '</svg>';
  }

  /* =========================================================
     2b. DUA SUDUT BERPELURUS
     ========================================================= */

  /* Kedua sudut dihitung dari satu garis lurus, jadi sisanya selalu 180° − a.
     Busur digambar sebagai poligon pendek supaya arah putarnya tidak perlu ditentukan. */
  function sudutSvg(a) {
    const W = 420, H = 236;
    const vx = 210, vy = 176, r = 150;
    const beta = 180 - a;
    const at = (deg, rr) => [vx + (rr || r) * Math.cos(deg * R), vy - (rr || r) * Math.sin(deg * R)];
    const busur = (d1, d2, rr) => {
      const n = 28, pt = [];
      for (let i = 0; i <= n; i++) pt.push(at(d1 + (d2 - d1) * i / n, rr).map(r1).join(','));
      return pt.join(' ');
    };
    const g = [];

    const kiri = at(180), kanan = at(0), miring = at(beta);
    g.push('<line class="sudut__garis" x1="' + r1(kiri[0]) + '" y1="' + r1(kiri[1]) +
      '" x2="' + r1(kanan[0]) + '" y2="' + r1(kanan[1]) + '"/>');
    g.push('<line class="sudut__kaki" x1="' + vx + '" y1="' + vy +
      '" x2="' + r1(miring[0]) + '" y2="' + r1(miring[1]) + '"/>');

    /* Dua busur dengan jari-jari berbeda supaya tidak bertumpuk */
    g.push('<polyline class="sudut__busur sudut__busur--kiri" points="' + busur(180, beta, 50) + '"/>');
    g.push('<polyline class="sudut__busur sudut__busur--kanan" points="' + busur(beta, 0, 82) + '"/>');

    /* Angka besar tiap sudut, di tengah busurnya */
    const tl = at(180 - a / 2, 70), tr = at(beta / 2, 104);
    g.push('<text class="sudut__val sudut__val--kiri" x="' + r1(tl[0]) + '" y="' + r1(tl[1] + 4) +
      '" text-anchor="middle">' + a + '°</text>');
    g.push('<text class="sudut__val sudut__val--kanan" x="' + r1(tr[0]) + '" y="' + r1(tr[1] + 4) +
      '" text-anchor="middle">' + beta + '°</text>');

    g.push('<circle class="sudut__titik" cx="' + vx + '" cy="' + vy + '" r="3.5"/>');

    return '<svg class="inter__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Dua sudut berpelurus ' +
      a + ' derajat dan ' + beta + ' derajat; jumlahnya 180 derajat">' + g.join('') + '</svg>';
  }

  /* Dipakai untuk menguji geometri di luar browser */
  if (typeof window !== 'undefined') {
    window.OwlyInteraktif = { netSvg: netSvg, graphSvg: graphSvg, sudutSvg: sudutSvg, foldFaces: foldFaces, SHAPES: SHAPES, barisanSuku: barisanSuku };
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
      b: clamp(read(host.dataset.b, 1), -5, 5),
      p: clamp(read(host.dataset.p, 0), -4, 4),
      q: clamp(read(host.dataset.q, 0), -4, 4)
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
            ctl('p', 'geser mendatar p', -4, 4, 1, st.p) +
            ctl('q', 'geser tegak q', -4, 4, 1, st.q) +
          '</div>' +
          '<p class="inter__geser" data-geser></p>' +
          '<p class="inter__hint">Geser x untuk berjalan di sepanjang garis. Ubah p atau q untuk memindahkan seluruh grafik.</p>' +
        '</div>' +
      '</div>';

    const plot = host.querySelector('[data-plot]');
    const eq = host.querySelector('[data-eq]');
    const val = host.querySelector('[data-val]');
    const geserOut = host.querySelector('[data-geser]');

    function update() {
      const y = st.a * (st.x - st.p) + st.b + st.q;
      const geser = st.p !== 0 || st.q !== 0;
      plot.innerHTML = graphSvg(st.a, st.b, st.x, st.p, st.q);
      eq.innerHTML = 'f(x) = ' + eqText(st.a, st.b);
      val.innerHTML = (geser ? 'g(' + fmt(st.x) + ')' : 'f(' + fmt(st.x) + ')') + ' = <b>' + fmt(y) + '</b>' +
        '<small>titik (' + fmt(st.x) + '; ' + fmt(y) + ') berada di ' + (geser ? 'garis bayangan' : 'garis') + '</small>';

      /* Rumus bayangan: g(x) = f(x − p) + q. Tanpa geseran, baris ini jadi petunjuk. */
      if (geser) {
        const geserTeks = 'g(x) = f(x' + (st.p === 0 ? '' : (st.p > 0 ? ' − ' + fmt(st.p) : ' + ' + fmt(-st.p))) + ')' +
          (st.q === 0 ? '' : (st.q > 0 ? ' + ' + fmt(st.q) : ' − ' + fmt(-st.q)));
        geserOut.innerHTML = 'Digeser (' + fmt(st.p) + '; ' + fmt(st.q) + ') dari garis putus-putus:' +
          '<b>' + geserTeks + ' = ' + eqText(st.a, st.b + st.q - st.a * st.p) + '</b>' +
          'kemiringannya tetap ' + fmt(st.a) + ', jadi kedua garis sejajar.';
      } else {
        geserOut.innerHTML = 'Garis ini belum digeser. Naikkan <b>p</b> untuk menggeser mendatar atau <b>q</b> untuk menggeser tegak.';
      }

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
      fb.textContent = 'Smarty Pants. Kalimat lain cuma penjelas, cek alasannya.';
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
      '<div class="dadu__grafik" data-grafik>' +
        '<span class="dadu__leg"><i style="background:var(--olive)"></i> frekuensi relatif mata ' + MATA + '</span>' +
        '<svg class="dadu__svg" viewBox="0 0 280 110" role="img" aria-label="Frekuensi relatif mata dadu terhadap jumlah lemparan">' +
          '<polyline class="dadu__line"/>' +
          '<line class="dadu__guide" x1="4" y1="93" x2="276" y2="93"/>' +
          '<text class="dadu__pct" x="274" y="95" text-anchor="end">16,7%</text>' +
          '<text class="dadu__axis" x="140" y="108" text-anchor="middle">jumlah lemparan</text>' +
        '</svg>' +
      '</div>' +
      '<p class="inter__hint">Garis putus-putus adalah peluang teoretis tiap mata, 1/6 ≈ 16,7%. Batang-batang kanan atas menampilkan frekuensi relatif tiap mata, dan grafik di bawah menunjukkan frekuensi relatif mata ' + MATA + ' dari semua lemparan: makin banyak lemparan, makin condong ke 16,7%.</p>';

    const die = host.querySelector('[data-die]');
    const prob = host.querySelector('[data-prob]');
    const kolom = Array.prototype.slice.call(host.querySelectorAll('[data-kolom]'));
    const bar = kolom.map(k => k.querySelector('[data-bar]'));
    const angka = kolom.map(k => k.querySelector('[data-c]'));

    /* Tinggi batang: frekuensi relatif 0–50% dipetakan ke 0–100% tinggi kotak. */
    const SKALA = 50;

    const grafik = host.querySelector('[data-grafik]');
    const line = grafik.querySelector('.dadu__line');
    const svgGrafik = grafik.querySelector('svg');
    const pct = grafik.querySelector('.dadu__pct');
    const leg = grafik.querySelector('.dadu__leg');
    const axis = grafik.querySelector('.dadu__axis');

    function draw() {
      const W = 272, H = 88;
      const px = i => 4 + (i / n) * W;
      const py = rel => 93 - clamp(rel / 50, 0, 1) * H;
      line.setAttribute('points', [].map.call(Array.from({ length: n }, (_, i) => i + 1), (j) => px(j) + ',' + py((hitung[j - 1] || 0) / n * 100)).join(' '));
      svgGrafik.querySelectorAll('circle').forEach(c => c.remove());
      for (let j = 1; j <= n; j++) {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', px(j));
        c.setAttribute('cy', py((hitung[j - 1] || 0) / n * 100));
        c.setAttribute('r', '2.5');
        c.classList.add('dadu__dot');
        svgGrafik.appendChild(c);
      }
    }

    function render() {
      hitung.forEach((v, i) => {
        const rel = n ? v / n * 100 : 0;
        angka[i].textContent = v;
        bar[i].style.height = clamp(rel / SKALA * 100, 0, 100) + '%';
        kolom[i].classList.toggle('is-target', i === MATA - 1);
      });
      if (!n) {
        prob.innerHTML = 'Tekan <b>Lempar sekali</b>. Sebelum itu, coba tebak dulu: mata berapa yang akan muncul?';
        grafik.classList.remove('is-done');
        return;
      }
      grafik.classList.add('is-done');
      draw();
      const kali = hitung[MATA - 1];
      prob.innerHTML =
        'Mata ' + MATA + ' keluar <b>' + kali + '</b> dari ' + n + ' lemparan = <b>' + fmt(kali / n * 100) + '%</b>' +
        '<small>peluang teoretis 1/6 ≈ 16,7% · frekuensi harapan dalam ' + n +
        ' lemparan ≈ ' + fmt(n / 6) + ' kali</small>';
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
      grafik.classList.remove('is-done');
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
        pesan += '<small>Kotak sudah kosong, semua bola terambil. Tekan Isi ulang buat ngulang percobaan.</small>';
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

  /* ---------- Widget barisan bilangan ---------- */
  /* Suku-suku pertama sebuah barisan. Pada aritmetika b adalah beda,
     pada geometri b adalah rasio; Fibonacci cukup dari dua suku awal. */
  function barisanSuku(jenis, a, b, n) {
    const out = [];
    let i;
    if (jenis === 'geometri') {
      let v = a;
      for (i = 0; i < n; i++) { out.push(v); v *= b; }
    } else if (jenis === 'fibonacci') {
      let p = a, q = b;
      for (i = 0; i < n; i++) {
        out.push(p);
        const s = p + q;
        p = q;
        q = s;
      }
    } else {
      for (i = 0; i < n; i++) out.push(a + i * b);
    }
    return out;
  }

  /* Batas tiap penggeser beda/rasio, plus label dan nilai awalnya */
  const BARISAN = {
    aritmetika: { label: 'Aritmetika', beda: 'beda b', min: -5, max: 8, step: 1 },
    geometri: { label: 'Geometri', beda: 'rasio r', min: 1, max: 4, step: 0.5 },
    fibonacci: { label: 'Fibonacci', beda: null, min: 1, max: 1, step: 1 }
  };

  function mountBarisan(host) {
    const read = (v, d) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };
    const st = {
      jenis: BARISAN[host.dataset.jenis] ? host.dataset.jenis : 'aritmetika',
      n: Math.round(clamp(read(host.dataset.n, 6), 1, 12))
    };

    /* Nilai awal & beda disimpan per pola, jadi pindah tab tidak menghapus
       angka yang sudah diatur murid. Fibonacci memakai 1, 1. */
    const awal = { aritmetika: 3, geometri: 2 };
    const beda = { aritmetika: 4, geometri: 3 };
    if (st.jenis === 'aritmetika') {
      awal.aritmetika = read(host.dataset.a, 3);
      beda.aritmetika = clamp(read(host.dataset.b, 4), BARISAN.aritmetika.min, BARISAN.aritmetika.max);
    } else if (st.jenis === 'geometri') {
      awal.geometri = read(host.dataset.a, 2);
      beda.geometri = clamp(read(host.dataset.b, 3), BARISAN.geometri.min, BARISAN.geometri.max);
    }

    const aKini = () => (st.jenis === 'fibonacci' ? 1 : awal[st.jenis]);
    const bKini = () => (st.jenis === 'fibonacci' ? 1 : beda[st.jenis]);

    host.classList.add('inter', 'inter--barisan');
    host.innerHTML =
      '<figcaption class="inter__cap">Coba sendiri · barisan bilangan</figcaption>' +
      '<div class="inter__tabs" role="group" aria-label="Pilih pola barisan">' +
        Object.keys(BARISAN).map(k => '<button type="button" class="inter__tab" data-pola="' + k +
          '" aria-pressed="false">' + BARISAN[k].label + '</button>').join('') +
      '</div>' +
      '<div class="bar__strip" data-strip></div>' +
      '<div class="bar__body">' +
        '<div class="bar__readout">' +
          '<p class="bar__u" data-u aria-live="polite"></p>' +
          '<p class="bar__rumus" data-rumus></p>' +
          '<p class="bar__sum" data-sum></p>' +
          '<p class="inter__info" data-info></p>' +
        '</div>' +
        '<div class="bar__ctl inter__ctl">' +
          ctl('n', 'suku ke-', 1, 12, 1, st.n) +
          ctl('b', 'beda b', -5, 8, 1, beda.aritmetika) +
        '</div>' +
      '</div>' +
      '<p class="inter__hint">Geser posisinya untuk melihat suku ke-n, atau ubah beda/rasio untuk melihat polanya berubah.</p>';

    const strip = host.querySelector('[data-strip]');
    const uOut = host.querySelector('[data-u]');
    const rumusOut = host.querySelector('[data-rumus]');
    const sumOut = host.querySelector('[data-sum]');
    const infoOut = host.querySelector('[data-info]');
    const nInp = host.querySelector('[data-k="n"]');
    const bInp = host.querySelector('[data-k="b"]');
    const bCtl = bInp.closest('.ctl');
    const bLabel = bCtl.querySelector('span');

    function update() {
      const meta = BARISAN[st.jenis];
      const a = aKini(), b = bKini(), n = st.n;
      const suku = barisanSuku(st.jenis, a, b, n);
      const un = suku[suku.length - 1];

      /* Suku-suku yang sudah muncul, ditutup satu kotak tanda tanya
         untuk suku berikutnya yang belum dihitung. */
      strip.innerHTML = suku.map((v, i) =>
        '<button type="button" class="bar__s' + (i === n - 1 ? ' is-now' : '') + '" data-n="' + (i + 1) +
        '" aria-pressed="' + (i === n - 1 ? 'true' : 'false') +
        '" aria-label="suku ke-' + (i + 1) + ': ' + fmt(v) + '">' +
        '<b>' + fmt(v) + '</b><small>U<sub>' + (i + 1) + '</sub></small></button>').join('') +
        '<span class="bar__s is-next" aria-hidden="true"><b>?</b><small>U<sub>' + (n + 1) + '</sub></small></span>';

      let rumus, info, sum;
      if (st.jenis === 'fibonacci') {
        if (n === 1) rumus = 'U<sub>1</sub> = suku awal = ' + fmt(a);
        else if (n === 2) rumus = 'U<sub>2</sub> = suku kedua = ' + fmt(b);
        else rumus = 'U<sub>' + n + '</sub> = U<sub>' + (n - 1) + '</sub> + U<sub>' + (n - 2) + '</sub> = ' +
          fmt(suku[n - 3]) + ' + ' + fmt(suku[n - 2]) + ' = ' + fmt(un);
        info = 'Fibonacci: setiap suku adalah jumlah dua suku sebelumnya, jadi tidak ada beda atau rasio tetap.';
        sum = 'S<sub>' + n + '</sub> = ' + fmt(suku.reduce((t, v) => t + v, 0)) + ' (jumlah semua suku di atas)';
      } else if (st.jenis === 'geometri') {
        rumus = 'U<sub>' + n + '</sub> = ' + fmt(a) + ' × ' + fmt(b) + '<sup>' + (n - 1) + '</sup> = ' + fmt(un);
        info = b === 1
          ? 'Rasio 1: semua suku sama dengan suku pertama, jadi barisannya tetap.'
          : 'Rasio ' + fmt(b) + ' tetap: setiap suku didapat dengan mengali ' + fmt(b) + ' suku sebelumnya.';
        sum = 'S<sub>' + n + '</sub> = ' + (b === 1
          ? fmt(n) + ' × ' + fmt(a) + ' = ' + fmt(n * a)
          : fmt(a) + ' × (' + fmt(b) + '<sup>' + n + '</sup> − 1) ÷ (' + fmt(b) + ' − 1) = ' +
            fmt(a * (Math.pow(b, n) - 1) / (b - 1))) +
          ' (jumlah ' + n + ' suku pertama)';
      } else {
        rumus = 'U<sub>' + n + '</sub> = ' + fmt(a) + ' + ' + (n - 1) + ' × ' +
          (b < 0 ? '(' + fmt(b) + ')' : fmt(b)) + ' = ' + fmt(un);
        info = b === 0
          ? 'Beda 0: semua suku sama, jadi barisannya tetap.'
          : 'Beda ' + fmt(b) + ' tetap: setiap suku ' + (b > 0 ? 'bertambah' : 'berkurang') + ' ' +
            fmt(Math.abs(b)) + ' dari suku sebelumnya.';
        sum = 'S<sub>' + n + '</sub> = ' + fmt(n) + '/2 × (' + fmt(a) + ' + ' + fmt(un) + ') = ' +
          fmt(n / 2 * (a + un)) + ' (jumlah ' + n + ' suku pertama)';
      }

      uOut.innerHTML = 'U<sub>' + n + '</sub> = ' + fmt(un);
      rumusOut.innerHTML = rumus;
      sumOut.innerHTML = sum;
      infoOut.textContent = info;
      host.querySelector('[data-out="n"]').textContent = n;

      /* Penggeser beda/rasio ikut berganti arti saat pola diganti */
      if (meta.beda) {
        bCtl.hidden = false;
        bLabel.textContent = meta.beda;
        bInp.min = meta.min;
        bInp.max = meta.max;
        bInp.step = meta.step;
        bInp.value = b;
        bInp.setAttribute('aria-label', meta.beda);
        host.querySelector('[data-out="b"]').textContent = fmt(b);
      } else {
        bCtl.hidden = true;
      }

      host.querySelectorAll('[data-pola]').forEach(t => {
        const aktif = t.dataset.pola === st.jenis;
        t.classList.toggle('is-active', aktif);
        t.setAttribute('aria-pressed', aktif ? 'true' : 'false');
      });
    }

    host.addEventListener('input', e => {
      const k = e.target.dataset.k;
      if (k === 'n') st.n = Math.round(clamp(parseFloat(e.target.value), 1, 12));
      else if (k === 'b') beda[st.jenis] = parseFloat(e.target.value);
      else return;
      update();
    });

    host.addEventListener('click', e => {
      /* Tab memakai data-pola, bukan data-jenis: figure-nya sendiri sudah
         membawa data-jenis, jadi closest() akan menangkap host dan menelan klik. */
      const tab = e.target.closest('[data-pola]');
      if (tab) { st.jenis = tab.dataset.pola; update(); return; }
      const s = e.target.closest('.bar__s[data-n]');
      if (s) {
        st.n = parseInt(s.dataset.n, 10);
        nInp.value = st.n;
        update();
      }
    });

    update();
  }

  /* ---------- Widget diagram panah (hubungkan daerah asal ke daerah kawan) ----------
     Murid memilih rumus, lalu memasang panah dari tiap x ke f(x). Panah yang tepat
     berwarna emas, yang keliru oranye, sehingga syarat fungsi terlihat sendiri:
     setiap anggota A punya tepat satu panah, sedangkan anggota B boleh dipakai
     bersama atau tidak dipakai sama sekali. */
  const PANAH_FUNGSI = {
    tambah: {
      label: 'f(x) = x + 1',
      A: [1, 2, 3, 4],
      B: [2, 3, 4, 5, 6],
      hitung: x => x + 1,
      cara: x => 'f(' + fmt(x) + ') = ' + fmt(x) + ' + 1 = ' + fmt(x + 1)
    },
    kali: {
      label: 'f(x) = 2x',
      A: [1, 2, 3],
      B: [2, 3, 4, 6],
      hitung: x => 2 * x,
      cara: x => 'f(' + fmt(x) + ') = 2 × ' + fmt(x) + ' = ' + fmt(2 * x)
    },
    kuadrat: {
      label: 'f(x) = x²',
      A: [-2, -1, 0, 1, 2],
      B: [0, 1, 4],
      hitung: x => x * x,
      cara: x => 'f(' + fmt(x) + ') = (' + fmt(x) + ')² = ' + fmt(x * x)
    }
  };

  /* Gambar diagram panah untuk satu rumus. `jawab` memetakan indeks A ke indeks B,
     `pilih` adalah indeks A yang sedang dipilih murid. */
  function panahSvg(fn, jawab, pilih) {
    const W = 300, H = 224, xa = 54, xb = 246, R = 13, atas = 38, bawah = 22;
    const n = fn.A.length, m = fn.B.length;
    const yA = i => atas + (i + 0.5) * ((H - atas - bawah) / n);
    const yB = j => atas + (j + 0.5) * ((H - atas - bawah) / m);
    const rb = v => Math.round(v * 10) / 10;

    let garis = '';
    Object.keys(jawab).forEach(k => {
      const i = Number(k), j = jawab[k];
      if (j == null) return;
      const benar = fn.hitung(fn.A[i]) === fn.B[j];
      const x1 = xa + R, y1 = rb(yA(i)), x2 = xb - R, y2 = rb(yB(j));
      const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
      /* Sedikit melengkung supaya dua panah yang menuju titik B sama tetap terpisah. */
      const cx = rb((x1 + x2) / 2 - (dy / len) * 9), cy = rb((y1 + y2) / 2 + (dx / len) * 9);
      const tx = x2 - cx, ty = y2 - cy, tl = Math.hypot(tx, ty) || 1;
      const ux = tx / tl, uy = ty / tl;
      const bx = x2 - ux * 8, by = y2 - uy * 8;
      const kepala = [x2 + ',' + y2,
        rb(bx - uy * 4.5) + ',' + rb(by + ux * 4.5),
        rb(bx + uy * 4.5) + ',' + rb(by - ux * 4.5)].join(' ');
      const kelas = benar ? 'is-benar' : 'is-salah';
      garis += '<path class="panah__garis ' + kelas + '" d="M' + x1 + ' ' + y1 + ' Q' + cx + ' ' + cy + ' ' + x2 + ' ' + y2 + '"></path>' +
        '<polygon class="panah__kepala ' + kelas + '" points="' + kepala + '"></polygon>';
    });

    const titik = (x, y, teks, kelas, attr, label) =>
      '<g class="panah__titik" ' + attr + ' role="button" tabindex="0" aria-label="' + label + '">' +
        '<circle class="panah__bulat ' + kelas + '" cx="' + x + '" cy="' + y + '" r="' + R + '"></circle>' +
        '<text class="panah__isi" x="' + x + '" y="' + y + '" text-anchor="middle" dominant-baseline="central">' + teks + '</text>' +
      '</g>';

    let simpul = '';
    fn.A.forEach((v, i) => {
      const kelas = 'panah__bulat--a' + (jawab[i] != null ? ' is-terisi' : '') + (pilih === i ? ' is-pilih' : '');
      simpul += titik(xa, rb(yA(i)), fmt(v), kelas, 'data-dari="' + i + '"',
        'x = ' + fmt(v) + (jawab[i] != null ? ', sudah punya panah' : ', belum ada panah') +
        (pilih === i ? ', sedang dipilih' : ''));
    });
    fn.B.forEach((v, j) => {
      simpul += titik(xb, rb(yB(j)), fmt(v), 'panah__bulat--b', 'data-ke="' + j + '"',
        'anggota daerah kawan ' + fmt(v));
    });

    return '<svg class="panah__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Diagram panah untuk ' +
      fn.label + ': ' + n + ' anggota daerah asal dan ' + m + ' anggota daerah kawan">' +
      '<text class="panah__judul" x="' + xa + '" y="22" text-anchor="middle">Daerah asal A</text>' +
      '<text class="panah__judul" x="' + xb + '" y="22" text-anchor="middle">Daerah kawan B</text>' +
      garis + simpul + '</svg>';
  }

  function mountPanah(host) {
    const st = {
      kunci: PANAH_FUNGSI[host.dataset.fungsi] ? host.dataset.fungsi : 'tambah',
      pilih: 0,
      pesan: ''
    };
    /* Jawaban disimpan per rumus, jadi pindah tab tidak menghapus kerja murid. */
    const jawab = {};
    Object.keys(PANAH_FUNGSI).forEach(k => { jawab[k] = {}; });

    host.classList.add('inter', 'inter--panah');
    host.innerHTML =
      '<figcaption class="inter__cap">Main sendiri · hubungkan daerah asal ke daerah kawan</figcaption>' +
      '<div class="inter__tabs" role="group" aria-label="Pilih rumus fungsi">' +
        Object.keys(PANAH_FUNGSI).map(k => '<button type="button" class="inter__tab" data-fn="' + k +
          '" aria-pressed="false">' + PANAH_FUNGSI[k].label + '</button>').join('') +
      '</div>' +
      '<div class="inter__body">' +
        '<div class="inter__plot" data-plot></div>' +
        '<div class="inter__side">' +
          '<p class="inter__eq" data-rumus></p>' +
          '<p class="panah__stat" data-stat aria-live="polite"></p>' +
          '<p class="panah__fb" data-fb aria-live="polite"></p>' +
          '<div class="panah__btn">' +
            '<button type="button" class="inter__tab panah__periksa" data-periksa>Periksa</button>' +
            '<button type="button" class="inter__tab panah__ulang" data-ulang>Ulangi</button>' +
          '</div>' +
          '<p class="inter__hint">Klik satu anggota di kiri, lalu klik pasangannya di kanan. Panah emas berarti tepat, panah oranye berarti belum tepat. Klik titik di kiri untuk melepas panahnya.</p>' +
        '</div>' +
      '</div>';

    const plot = host.querySelector('[data-plot]');
    const rumusOut = host.querySelector('[data-rumus]');
    const stat = host.querySelector('[data-stat]');
    const fb = host.querySelector('[data-fb]');

    const fn = () => PANAH_FUNGSI[st.kunci];
    const kini = () => jawab[st.kunci];

    /* Indeks A berikutnya yang belum punya panah, atau null kalau sudah lengkap. */
    const berikut = () => {
      const jw = kini(), f = fn();
      const i = f.A.findIndex((_, k) => jw[k] == null);
      return i < 0 ? null : i;
    };

    function render() {
      const f = fn(), jw = kini();
      const isi = Object.keys(jw);
      const tepat = isi.filter(k => f.hitung(f.A[Number(k)]) === f.B[jw[k]]).length;

      plot.innerHTML = panahSvg(f, jw, st.pilih);
      rumusOut.innerHTML = f.label;
      stat.innerHTML = '<b>' + tepat + '</b> dari ' + f.A.length + ' panah tepat · ' +
        isi.length + ' dari ' + f.A.length + ' anggota A punya panah';

      let pesan = st.pesan;
      if (!pesan) {
        if (isi.length === f.A.length) {
          pesan = tepat === f.A.length
            ? '<b>Semua panah terpasang dan tepat.</b> Tekan <b>Periksa</b> untuk melihat kesimpulannya.'
            : 'Masih ada panah yang perlu diperbaiki. Klik titik di kiri untuk melepas, lalu pasang ulang.';
        } else if (st.pilih != null) {
          pesan = 'x = ' + fmt(f.A[st.pilih]) + ' belum punya panah. Klik satu anggota B di kanan sebagai pasangannya.';
        } else {
          pesan = 'Klik anggota A yang belum punya panah, lalu klik pasangannya di B.';
        }
      }
      fb.innerHTML = pesan;
      host.classList.toggle('is-lulus', isi.length === f.A.length && tepat === f.A.length);

      host.querySelectorAll('[data-fn]').forEach(btn => {
        const aktif = btn.dataset.fn === st.kunci;
        btn.classList.toggle('is-active', aktif);
        btn.setAttribute('aria-pressed', aktif ? 'true' : 'false');
      });
    }

    function pilihTitik(i) {
      const f = fn(), jw = kini();
      st.pilih = i;
      if (jw[i] != null) {
        delete jw[i];
        st.pesan = 'Panah dari x = ' + fmt(f.A[i]) + ' dilepas. Klik anggota B untuk memasang pasangan yang baru.';
      } else {
        st.pesan = 'x = ' + fmt(f.A[i]) + ' dipilih. Sekarang klik pasangannya di daerah kawan B.';
      }
      render();
    }

    function pasang(j) {
      if (st.pilih == null) {
        st.pesan = 'Pilih dulu anggota daerah asal A di kiri, baru pilih pasangannya di B.';
        render();
        return;
      }
      const f = fn(), jw = kini();
      const i = st.pilih, x = f.A[i], y = f.B[j];
      jw[i] = j;

      const tepat = f.hitung(x) === y;
      const dipakai = Object.keys(jw).filter(k => Number(k) !== i && jw[k] === j).length;
      if (tepat) {
        st.pesan = '<b>Tepat.</b> ' + f.cara(x) + ', jadi x = ' + fmt(x) + ' berpasangan dengan ' + fmt(y) + '.' +
          (dipakai ? '<small>Anggota B ini juga ditunjuk anggota A lain. Boleh: syarat fungsi hanya setiap anggota A punya tepat satu panah.</small>' : '');
      } else {
        st.pesan = '<b>Belum tepat.</b> ' + f.cara(x) + ', bukan ' + fmt(y) + '.' +
          '<small>Klik x = ' + fmt(x) + ' di kiri untuk melepas panah ini, lalu pilih ' + fmt(f.hitung(x)) + '.</small>';
      }

      const sisa = berikut();
      st.pilih = sisa;
      if (sisa == null) st.pesan += '<small>Semua anggota A sudah punya satu panah. Tekan Periksa.</small>';
      render();
    }

    function periksa() {
      const f = fn(), jw = kini();
      const kosong = f.A.map((_, i) => i).filter(i => jw[i] == null);
      const salah = f.A.map((_, i) => i).filter(i => jw[i] != null && f.hitung(f.A[i]) !== f.B[jw[i]]);

      if (kosong.length) {
        st.pesan = '<b>Belum lengkap.</b> ' + kosong.length + ' anggota A belum punya panah (' +
          kosong.map(i => 'x = ' + fmt(f.A[i])).join(', ') + '). Selama ada anggota A tanpa pasangan, relasinya <b>bukan fungsi</b>.';
        st.pilih = kosong[0];
      } else if (salah.length) {
        st.pesan = '<b>Ada ' + salah.length + ' panah yang keliru.</b> ' +
          salah.map(i => 'x = ' + fmt(f.A[i]) + ' seharusnya ' + fmt(f.hitung(f.A[i]))).join('; ') + '.';
        st.pilih = salah[0];
      } else {
        st.pesan = '<b>Lulus.</b> Setiap anggota A punya tepat satu panah, jadi relasi ini <b>fungsi</b> dari A ke B.' +
          '<small>Satu anggota A nggak boleh bercabang jadi dua panah, itu satu-satunya syarat fungsi. Anggota B yang tidak dituju panah tetap boleh ada.</small>';
        st.pilih = null;
      }
      render();
    }

    function ulang() {
      Object.keys(kini()).forEach(k => { delete kini()[k]; });
      st.pilih = 0;
      st.pesan = 'Semua panah dihapus. Mulai lagi dari x = ' + fmt(fn().A[0]) + '.';
      render();
    }

    plot.addEventListener('click', e => {
      const a = e.target.closest('[data-dari]');
      if (a) { pilihTitik(Number(a.dataset.dari)); return; }
      const b = e.target.closest('[data-ke]');
      if (b) pasang(Number(b.dataset.ke));
    });

    /* Enter/Spasi pada titik yang sedang fokus melakukan hal yang sama dengan klik. */
    plot.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const g = e.target.closest('[data-dari], [data-ke]');
      if (!g) return;
      e.preventDefault();
      if (g.dataset.dari != null) pilihTitik(Number(g.dataset.dari));
      else pasang(Number(g.dataset.ke));
    });

    host.addEventListener('click', e => {
      const tab = e.target.closest('[data-fn]');
      if (tab) {
        st.kunci = tab.dataset.fn;
        st.pesan = '';
        st.pilih = berikut();
        render();
        return;
      }
      if (e.target.closest('[data-periksa]')) { periksa(); return; }
      if (e.target.closest('[data-ulang]')) ulang();
    });

    st.pilih = berikut();
    render();
  }

  /* ---------- Widget dua sudut berpelurus ---------- */
  function mountSudut(host) {
    const read = (v, d) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };
    const st = { a: Math.round(clamp(read(host.dataset.a, 55), 10, 170)) };

    host.classList.add('inter', 'inter--sudut');
    host.innerHTML =
      '<figcaption class="inter__cap">Coba sendiri · dua sudut berpelurus</figcaption>' +
      '<div class="inter__body">' +
        '<div class="inter__plot" data-plot></div>' +
        '<div class="inter__side">' +
          '<p class="inter__val" data-readout aria-live="polite"></p>' +
          '<p class="inter__eq" data-rumus></p>' +
          '<div class="inter__ctl">' + ctl('a', 'sudut kiri α', 10, 170, 1, st.a) + '</div>' +
          '<p class="inter__hint">Geser sudut kiri; kaki kanan tetap di garis lurus yang sama, jadi sudut kanan ikut menyesuaikan.</p>' +
        '</div>' +
      '</div>' +
      '<p class="inter__info" data-info></p>';

    const plot = host.querySelector('[data-plot]');
    const readout = host.querySelector('[data-readout]');
    const rumus = host.querySelector('[data-rumus]');
    const info = host.querySelector('[data-info]');
    const out = host.querySelector('[data-out="a"]');

    function update() {
      const a = st.a, beta = 180 - a;
      plot.innerHTML = sudutSvg(a);
      out.textContent = a + '°';
      readout.innerHTML = fmt(a) + '° + ' + fmt(beta) + '° = <b>180°</b>';
      rumus.innerHTML = 'Sudut kanan = 180° − ' + fmt(a) + '° = <b>' + fmt(beta) + '°</b>';
      info.innerHTML = a === 90
        ? '<b>Keduanya 90°:</b> kaki sudutnya tegak lurus dengan garis, jadi kedua sudut siku-siku. Jumlahnya tetap 180°.'
        : 'Sudut kiri <b>' + (a < 90 ? 'lancip' : 'tumpul') + '</b> (' + fmt(a) + '°), sudut kanan <b>' +
          (beta < 90 ? 'lancip' : 'tumpul') + '</b> (' + fmt(beta) + '°). Keduanya berpelurus: kaki-kakinya ' +
          'membentuk satu garis lurus, jadi jumlahnya selalu 180°.';
    }

    host.addEventListener('input', e => {
      if (e.target.dataset.k !== 'a') return;
      st.a = Math.round(clamp(parseFloat(e.target.value), 10, 170));
      update();
    });

    update();
  }

  /* ---------- Widget roda putar (peluang sama besar) ----------
     Delapan sektor sama besar: peluang teoretis tiap sektor 1/8 = 12,5%.
     Murid memutar roda sendiri dan melihat frekuensi relatif mendekati 12,5%. */
  const RODA_WARNA = ['#6B7A3A', '#EDE8CC', '#C9B46A', '#8C4040'];

  function sektorSvg(cx, cy, r, a0, a1) {
    const rad = a => a * Math.PI / 180;
    const x0 = cx + r * Math.cos(rad(a0)), y0 = cy + r * Math.sin(rad(a0));
    const x1 = cx + r * Math.cos(rad(a1)), y1 = cy + r * Math.sin(rad(a1));
    return 'M' + cx + ',' + cy + ' L' + x0.toFixed(2) + ',' + y0.toFixed(2) +
      ' A' + r + ',' + r + ' 0 0 1 ' + x1.toFixed(2) + ',' + y1.toFixed(2) + ' Z';
  }

  function rodaSvg(jumlah) {
    const R = 92, cx = 100, cy = 100, langkah = 360 / jumlah;
    let out = '<svg viewBox="0 0 200 200" role="img" aria-label="Roda ' + jumlah + ' sektor sama besar">';
    for (let i = 0; i < jumlah; i++) {
      const tengah = i * langkah - 90;
      const warna = RODA_WARNA[i % RODA_WARNA.length];
      const krem = warna === '#EDE8CC';
      out += '<path d="' + sektorSvg(cx, cy, R, tengah - langkah / 2, tengah + langkah / 2) +
        '" fill="' + warna + '" stroke="#13150C" stroke-width="1.5"/>';
      const lx = cx + Math.cos(tengah * Math.PI / 180) * 62;
      const ly = cy + Math.sin(tengah * Math.PI / 180) * 62;
      out += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" ' +
        'dominant-baseline="central" font-size="16" font-weight="700" fill="' +
        (krem ? '#1C1F10' : '#EDE8CC') + '">' + (i + 1) + '</text>';
    }
    out += '<circle cx="100" cy="100" r="95" fill="none" stroke="#0E1008" stroke-width="3"/>';
    return out + '</svg>';
  }

  function mountRoulette(host) {
    const N = clamp(parseInt(host.dataset.sektor, 10) || 8, 4, 12);
    const hitung = [];
    for (let i = 0; i < N; i++) hitung.push(0);

    let total = 0, deg = 0, sibuk = false, timer = null;
    const kurangi = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const DUR = kurangi ? 0 : 2300;
    const TEORI = 100 / N;
    const SKALA = TEORI * 3;

    host.classList.add('inter', 'inter--roda');
    host.innerHTML =
      '<figcaption class="inter__cap">Coba sendiri · putar roda peluang</figcaption>' +
      '<div class="roda">' +
        '<div class="roda__stage">' +
          '<span class="roda__pointer" aria-hidden="true"></span>' +
          '<div class="roda__wheel" data-wheel>' + rodaSvg(N) + '</div>' +
          '<span class="roda__hub" aria-hidden="true"></span>' +
        '</div>' +
        '<div class="roda__side">' +
          '<div class="inter__ctl">' +
            '<button type="button" class="inter__tab roda__btn" data-putar>Putar roda</button>' +
            '<button type="button" class="inter__tab roda__btn roda__ulang" data-ulang>Ulangi</button>' +
          '</div>' +
          '<p class="dadu__prob" data-prob role="status" aria-live="polite"></p>' +
        '</div>' +
      '</div>' +
      '<div class="roda__tally">' +
        hitung.map((_, i) =>
          '<div class="roda__col" data-kolom="' + (i + 1) + '">' +
            '<span class="roda__c" data-c>0</span>' +
            '<span class="roda__track"><i data-bar></i></span>' +
            '<b class="roda__f">' + (i + 1) + '</b>' +
          '</div>').join('') +
      '</div>' +
      '<p class="inter__hint">Kedelapan sektor sama besar, jadi peluang teoretis tiap sektor 1/' + N + ' ≈ ' +
        fmt(TEORI) + '%. Putar beberapa kali: batang akan naik-turun, tetapi makin banyak putaran, ' +
        'tingginya makin mendekati ' + fmt(TEORI) + '%.</p>';

    const wheel = host.querySelector('[data-wheel]');
    const prob = host.querySelector('[data-prob]');
    const kolom = Array.prototype.slice.call(host.querySelectorAll('[data-kolom]'));
    const bar = kolom.map(k => k.querySelector('[data-bar]'));
    const angka = kolom.map(k => k.querySelector('[data-c]'));

    function render(hasil) {
      hitung.forEach((v, i) => {
        const rel = total ? v / total * 100 : 0;
        angka[i].textContent = v;
        bar[i].style.height = clamp(rel / SKALA * 100, 0, 100) + '%';
        kolom[i].classList.toggle('is-target', hasil === i + 1);
      });
      if (!total) {
        prob.innerHTML = 'Tekan <b>Putar roda</b>. Sebelum memutar, coba tebak dulu: sektor mana yang akan berhenti?';
        return;
      }
      prob.innerHTML =
        'Roda berhenti di sektor <b>' + hasil + '</b>. Sektor itu keluar <b>' + hitung[hasil - 1] + '</b> dari ' +
        total + ' putaran = <b>' + fmt(hitung[hasil - 1] / total * 100) + '%</b>' +
        '<small>peluang teoretis 1/' + N + ' ≈ ' + fmt(TEORI) + '% · frekuensi harapan dalam ' + total +
        ' putaran ≈ ' + fmt(total / N) + ' kali</small>';
    }

    function putar() {
      if (sibuk) return;
      sibuk = true;
      host.classList.add('is-spin');
      const hasil = 1 + Math.floor(Math.random() * N);
      const target = ((360 - (hasil - 1) * (360 / N)) % 360 + 360) % 360;
      const sekarang = ((deg % 360) + 360) % 360;
      let tambah = (target - sekarang + 360) % 360;
      if (tambah < 30) tambah += 360;
      deg += 360 * 4 + tambah;
      wheel.style.transform = 'rotate(' + deg + 'deg)';

      const selesai = () => {
        timer = null;
        sibuk = false;
        host.classList.remove('is-spin');
        hitung[hasil - 1]++;
        total++;
        render(hasil);
      };
      if (!DUR) { selesai(); return; }
      timer = setTimeout(selesai, DUR + 60);
    }

    function ulang() {
      if (timer) { clearTimeout(timer); timer = null; }
      sibuk = false;
      host.classList.remove('is-spin');
      for (let i = 0; i < N; i++) hitung[i] = 0;
      total = 0;
      deg = 0;
      wheel.style.transform = '';
      render(0);
    }

    host.addEventListener('click', e => {
      if (e.target.closest('[data-putar]')) { putar(); return; }
      if (e.target.closest('[data-ulang]')) ulang();
    });

    render(0);
  }

  const WIDGETS = { graph: mountGraph, net: mountNet, sorot: mountSorot, dadu: mountDadu, capit: mountCapit, roulette: mountRoulette, barisan: mountBarisan, sudut: mountSudut, panah: mountPanah };
  /* Pasang semua widget di dalam root. Dipanggil sekali saat halaman siap,
     lalu bisa dipanggil lagi untuk widget yang disisipkan belakangan
     (mis. kegiatan Omega di halaman Latihan Soal). */
  function mountAll(root) {
    (root || document).querySelectorAll('[data-widget]').forEach(host => {
      if (host.dataset.terpasang) return;
      const mount = WIDGETS[host.dataset.widget];
      if (!mount) return;
      host.dataset.terpasang = '1';
      mount(host);
    });
  }
  mountAll();
  window.OwlyInteraktif = Object.assign(window.OwlyInteraktif || {}, { mountAll: mountAll });
})();
