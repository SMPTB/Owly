/* =========================================================
   waves.js — latar bergaris yang mengalir pelan.
   Versi ringan dari "Waves" (reactbits.dev) tanpa React/WebGL:
   garis-garis tipis bergoyang seperti sutra dan menyingkir
   saat kursor lewat, lalu kembali ke tempatnya.

   Cara pakai: taruh <canvas class="waves" id="waves"></canvas>
   di dalam <body>, lalu muat berkas ini.
   ========================================================= */
(function () {
  'use strict';

  var canvas = document.getElementById('waves');
  if (!canvas) return;

  var ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;                        // peramban tanpa canvas: halaman tetap normal

  var reduceMotion = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  var WARNA = 'rgba(237, 232, 204, .13)';  // krem tipis
  var WARNA_AKSEN = 'rgba(201, 180, 106, .17)';  // emas zaitun

  var lebar = 0, tinggi = 0, dpr = 1;
  var garis = [];
  var titik = { x: -9999, y: -9999, tx: -9999, ty: -9999, dorong: 0, target: 0 };
  var waktu = 0;
  var raf = null;
  var jalan = false;

  var JARAK_TITIK = 16;      // px antar titik di sepanjang garis
  var RADIUS_KURSOR = 190;   // seberapa jauh kursor menggeser garis
  var KEKUATAN = 30;         // px geseran maksimum

  function siapkan() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    lebar = canvas.clientWidth || window.innerWidth;
    tinggi = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(lebar * dpr);
    canvas.height = Math.round(tinggi * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    susun();
    gambar(waktu);
  }

  function susun() {
    var jumlah = Math.max(16, Math.min(52, Math.round(lebar / 28)));
    garis = [];
    for (var i = 0; i < jumlah; i++) {
      garis.push({
        x: (i + 0.5) / jumlah * lebar,
        fase: (i / jumlah) * Math.PI * 2.4,
        amp: 9 + (i % 5) * 3,
        laju: 0.00016 + (i % 4) * 0.00005,
        goyang: (i % 2 ? 1 : -1) * (6 + (i % 3) * 4)
      });
    }
  }

  function gambar(t) {
    ctx.clearRect(0, 0, lebar, tinggi);

    for (var i = 0; i < garis.length; i++) {
      var g = garis[i];

      ctx.beginPath();
      for (var y = -JARAK_TITIK; y <= tinggi + JARAK_TITIK; y += JARAK_TITIK) {
        var x = g.x
          + Math.sin(y * 0.0062 + g.fase + t * g.laju * 1000) * g.amp
          + Math.sin(y * 0.0017 - t * 0.0004 + g.fase * 1.7) * (g.amp * 0.8)
          + Math.sin(t * 0.00022 + g.fase) * g.goyang;

        if (titik.dorong > 0.001) {
          var dx = x - titik.x;
          var dy = y - titik.y;
          var jarak = Math.sqrt(dx * dx + dy * dy);
          if (jarak < RADIUS_KURSOR && jarak > 0.01) {
            var kuasa = 1 - jarak / RADIUS_KURSOR;
            x += (dx / jarak) * kuasa * kuasa * KEKUATAN * titik.dorong;
          }
        }

        if (y === -JARAK_TITIK) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = i % 7 === 0 ? WARNA_AKSEN : WARNA;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function langkah(now) {
    if (!jalan) return;
    waktu = now;
    titik.dorong += (titik.target - titik.dorong) * 0.07;
    titik.x += (titik.tx - titik.x) * 0.09;
    titik.y += (titik.ty - titik.y) * 0.09;
    gambar(now);
    raf = requestAnimationFrame(langkah);
  }

  function mulai() {
    if (jalan || reduceMotion) return;
    jalan = true;
    waktu = performance.now();
    raf = requestAnimationFrame(langkah);
  }

  function berhenti() {
    jalan = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  function ikuti(e) {
    titik.tx = e.clientX;
    titik.ty = e.clientY;
    titik.target = 1;
  }

  function lepas() {
    titik.target = 0;
  }

  document.addEventListener('pointermove', ikuti, { passive: true });
  document.addEventListener('pointerdown', ikuti, { passive: true });
  document.addEventListener('pointerleave', lepas);
  window.addEventListener('blur', lepas);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) berhenti();
    else mulai();
  });

  var aturUlang = null;
  window.addEventListener('resize', function () {
    clearTimeout(aturUlang);
    aturUlang = setTimeout(siapkan, 150);
  });

  siapkan();
  if (reduceMotion) gambar(0);   // satu bingkai tenang, tanpa animasi
  else mulai();
})();
