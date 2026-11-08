/* =========================================================
   materi-hover.js — hiasan yang "memancar" saat kartu bab dihover.
   Tiap bab punya hiasannya sendiri:
   - Peluang  : lima dadu 3D (kubus enam sisi dengan titik)
   - Geometri : tiga bangun datar + satu kubus + satu bola
   - sisanya  : lambang timbul yang miring sedikit
   Semua dibuat sekali di awal; animasinya urusan CSS.
   ========================================================= */
(function () {
  'use strict';

  var skop = document.querySelector('[data-filter-scope]');
  if (!skop) return;

  // Kunci: nama bab seperti di data-bab ("mtk|Geometri dan Pengukuran").
  var HIASAN = {
    'mtk|Bilangan': ['1', '2', '3', '½', '−'],
    'mtk|Aljabar': ['x', 'y', 'a+b', '=', '√'],
    'ind|Pemahaman Tekstual (Literal)': ['Aa', '“ ”', '?', '!', '¶'],
    'ind|Pemahaman Inferensial': ['→', '∴', '?', '…', '↔'],
    'ind|Evaluasi dan Apresiasi Teks': ['★', '✓', '!', '“ ”', '—']
  };

  var KARTU_DADU = 'mtk|Data dan Peluang';
  var KARTU_GEOMETRI = 'mtk|Geometri dan Pengukuran';

  // Posisi di tepi kartu: x/y dalam persen dari kotak kartu, dx/dy
  // adalah dorongan keluar supaya hiasannya menggantung di garis tepi.
  var TEMPAT = [
    { x: '0%',   y: '46%', dx: '-10px', dy: '0px' },
    { x: '100%', y: '24%', dx: '10px',  dy: '0px' },
    { x: '100%', y: '78%', dx: '10px',  dy: '0px' },
    { x: '30%',  y: '100%', dx: '0px',  dy: '10px' },
    { x: '74%',  y: '100%', dx: '0px',  dy: '10px' }
  ];
  var UKURAN = [15, 20, 13, 17, 14];
  var PUTARAN = [[18, -24], [-22, 32], [28, 16], [-16, -30], [24, -18]];
  // Kemiringan lambang supaya terlihat sedikit berdimensi, bukan datar.
  var MIRING = [[14, -16], [-12, 20], [18, 12], [-16, -14], [10, 22]];

  // Sisi kubus beserta jumlah titiknya. Sisi berhadapan berjumlah 7.
  var SISI = [
    ['front', 1], ['back', 6], ['right', 3], ['left', 4], ['top', 5], ['bottom', 2]
  ];

  // Geometri: tiga bangun datar dulu, lalu dua bangun ruang.
  var BENTUK = [
    { kelas: 'segitiga', ukuran: 22 },
    { kelas: 'kotak', ukuran: 20 },
    { kelas: 'lingkaran', ukuran: 21 },
    { kelas: 'kubus', ukuran: 25 },
    { kelas: 'bola', ukuran: 23 }
  ];

  function taruhDiTepi(el, i) {
    var t = TEMPAT[i % TEMPAT.length];
    el.style.setProperty('--x', t.x);
    el.style.setProperty('--y', t.y);
    el.style.setProperty('--dx', t.dx);
    el.style.setProperty('--dy', t.dy);
    el.style.transitionDelay = (i * 28) + 'ms';
  }

  function miringkan(el, i) {
    var miring = MIRING[i % MIRING.length];
    el.style.setProperty('--rx', miring[0] + 'deg');
    el.style.setProperty('--ry', miring[1] + 'deg');
  }

  function buatKubus(i, ukuran, tanpaTitik) {
    var kubus = document.createElement('span');
    kubus.className = tanpaTitik ? 'die die--kubus' : 'die';
    kubus.style.setProperty('--size', ukuran + 'px');

    var putar = PUTARAN[i % PUTARAN.length];
    kubus.style.setProperty('--rx', putar[0] + 'deg');
    kubus.style.setProperty('--ry', putar[1] + 'deg');
    taruhDiTepi(kubus, i);

    SISI.forEach(function (sisi) {
      var muka = document.createElement('span');
      muka.className = 'die__face die__face--' + sisi[0] + (tanpaTitik ? '' : ' die--p' + sisi[1]);
      kubus.appendChild(muka);
    });
    return kubus;
  }

  function buatLambang(teks, i) {
    var el = document.createElement('i');
    el.textContent = teks;
    el.style.setProperty('--size', UKURAN[i % UKURAN.length] + (teks.length > 1 ? 4 : 0) + 'px');
    miringkan(el, i);
    taruhDiTepi(el, i);
    return el;
  }

  function buatBentuk(bentuk, i) {
    if (bentuk.kelas === 'kubus') return buatKubus(i, bentuk.ukuran, true);

    var el = document.createElement('span');
    el.className = 'shp shp--' + bentuk.kelas;
    el.style.setProperty('--size', bentuk.ukuran + 'px');
    miringkan(el, i);
    taruhDiTepi(el, i);
    return el;
  }

  Array.prototype.forEach.call(skop.querySelectorAll('.chapter'), function (kartu) {
    if (kartu.querySelector('.pops')) return;

    var kunci = kartu.getAttribute('data-bab');
    var wadah = document.createElement('span');
    wadah.className = 'pops';
    wadah.setAttribute('aria-hidden', 'true');

    if (kunci === KARTU_DADU) {
      for (var d = 0; d < 5; d++) wadah.appendChild(buatKubus(d, UKURAN[d % UKURAN.length] + 6, false));
    } else if (kunci === KARTU_GEOMETRI) {
      BENTUK.forEach(function (bentuk, i) {
        wadah.appendChild(buatBentuk(bentuk, i));
      });
    } else {
      var lambang = HIASAN[kunci];
      if (!lambang) return;
      lambang.forEach(function (teks, i) {
        wadah.appendChild(buatLambang(teks, i));
      });
    }

    kartu.appendChild(wadah);
  });
})();
