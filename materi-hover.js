/* =========================================================
   materi-hover.js — hiasan yang "memancar" saat kartu bab dihover.
   Tiap bab punya kumpulan lambangnya sendiri: geometri memunculkan
   bangun, aljabar memunculkan huruf dan angka, dan seterusnya.
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
    'mtk|Data dan Peluang': ['▮', '▯', '%', 'P(A)', '≈'],
    'ind|Pemahaman Tekstual (Literal)': ['Aa', '“ ”', '?', '!', '¶'],
    'ind|Pemahaman Inferensial': ['→', '∴', '?', '…', '↔'],
    'ind|Evaluasi dan Apresiasi Teks': ['★', '✓', '!', '“ ”', '—']
  };

  // Posisi (x, y) relatif terhadap kotak lambang di kiri atas kartu.
  var TEMPAT = [
    [-18, -30], [26, -44], [72, -22], [-24, 40], [58, 46]
  ];
  var UKURAN = [15, 20, 13, 17, 14];

  Array.prototype.forEach.call(skop.querySelectorAll('.chapter'), function (kartu) {
    var kunci = kartu.getAttribute('data-bab');
    var lambang = HIASAN[kunci];
    if (!lambang || kartu.querySelector('.pops')) return;

    var wadah = document.createElement('span');
    wadah.className = 'pops';
    wadah.setAttribute('aria-hidden', 'true');

    lambang.forEach(function (teks, i) {
      var titik = TEMPAT[i % TEMPAT.length];
      var el = document.createElement('i');
      el.textContent = teks;
      el.style.setProperty('--tx', titik[0] + 'px');
      el.style.setProperty('--ty', titik[1] + 'px');
      el.style.setProperty('--size', UKURAN[i % UKURAN.length] + 'px');
      el.style.transitionDelay = (i * 28) + 'ms';
      wadah.appendChild(el);
    });

    kartu.appendChild(wadah);
  });
})();
