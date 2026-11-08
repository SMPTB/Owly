/* =========================================================
   materi-hover.js — hiasan yang "memancar" saat kartu bab dihover.
   Tiap bab punya kumpulan lambangnya sendiri. Bab peluang mendapat
   dadu 3D sungguhan (kubus CSS enam sisi), bukan sekadar karakter.
   Hanya menyentuh DOM sekali di awal; animasinya urusan CSS.
   ========================================================= */
(function () {
  'use strict';

  var skop = document.querySelector('[data-filter-scope]');
  if (!skop) return;

  // Kunci: nama bab seperti di data-bab ("mtk|Geometri dan Pengukuran").
  var HIASAN = {
    'mtk|Bilangan': ['1', '2', '3', '½', '−'],
    'mtk|Aljabar': ['x', 'y', 'a+b', '=', '√'],
    'mtk|Geometri dan Pengukuran': ['△', '□', '○', 'π', '∠'],
    'ind|Pemahaman Tekstual (Literal)': ['Aa', '“ ”', '?', '!', '¶'],
    'ind|Pemahaman Inferensial': ['→', '∴', '?', '…', '↔'],
    'ind|Evaluasi dan Apresiasi Teks': ['★', '✓', '!', '“ ”', '—']
  };

  var KARTU_DADU = 'mtk|Data dan Peluang';

  // Posisi di tepi kartu: x/y dalam persen dari kotak kartu, dx/dy
  // adalah dorongan keluar supaya lambangnya menggantung di garis tepi.
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

  // Sisi kubus beserta jumlah titiknya. Sisi berhadapan berjumlah 7,
  // seperti dadu asli.
  var SISI = [
    ['front', 1], ['back', 6], ['right', 3], ['left', 4], ['top', 5], ['bottom', 2]
  ];

  function taruhDiTepi(el, i) {
    var t = TEMPAT[i % TEMPAT.length];
    el.style.setProperty('--x', t.x);
    el.style.setProperty('--y', t.y);
    el.style.setProperty('--dx', t.dx);
    el.style.setProperty('--dy', t.dy);
    el.style.transitionDelay = (i * 28) + 'ms';
  }

  function buatLambang(teks, i) {
    var el = document.createElement('i');
    el.textContent = teks;
    el.style.setProperty('--size', UKURAN[i % UKURAN.length] + (teks.length > 1 ? 4 : 0) + 'px');
    var miring = MIRING[i % MIRING.length];
    el.style.setProperty('--rx', miring[0] + 'deg');
    el.style.setProperty('--ry', miring[1] + 'deg');
    taruhDiTepi(el, i);
    return el;
  }

  function buatDadu(i) {
    var dadu = document.createElement('span');
    dadu.className = 'die';
    dadu.style.setProperty('--size', (UKURAN[i % UKURAN.length] + 6) + 'px');

    var putar = PUTARAN[i % PUTARAN.length];
    dadu.style.setProperty('--rx', putar[0] + 'deg');
    dadu.style.setProperty('--ry', putar[1] + 'deg');
    taruhDiTepi(dadu, i);

    SISI.forEach(function (sisi) {
      var muka = document.createElement('span');
      muka.className = 'die__face die__face--' + sisi[0] + ' die--p' + sisi[1];
      dadu.appendChild(muka);
    });
    return dadu;
  }

  Array.prototype.forEach.call(skop.querySelectorAll('.chapter'), function (kartu) {
    if (kartu.querySelector('.pops')) return;

    var kunci = kartu.getAttribute('data-bab');
    var wadah = document.createElement('span');
    wadah.className = 'pops';
    wadah.setAttribute('aria-hidden', 'true');

    if (kunci === KARTU_DADU) {
      for (var i = 0; i < 5; i++) wadah.appendChild(buatDadu(i));
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
