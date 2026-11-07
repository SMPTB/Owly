/* =========================================================
   quotes.js — satu baris besar di atas judul halaman.

   Isinya kalimat pendek yang diacak tiap halaman dibuka, dan
   tidak mengulang yang terakhir muncul. Dua baris menghitung
   sendiri: "damn salah" memakai jumlah jawaban salah yang
   tersimpan di localStorage, "jaring-jaring" menyebut satu
   bangun ruang secara acak.
   ========================================================= */
(function () {
  'use strict';

  const KUNCI = 'owly-kutipan-terakhir';
  const BENTUK = ['kubus', 'balok', 'prisma segitiga', 'tabung', 'limas'];

  /* Jumlah jawaban salah yang tercatat di progress.js */
  function salahTotal() {
    try {
      const d = JSON.parse(localStorage.getItem('owly-progress-v1') || 'null');
      if (!d || !d.days) return 0;
      return Object.values(d.days).reduce((n, h) => n + Math.max(0, (h.tries || 0) - (h.ok || 0)), 0);
    } catch (e) {
      return 0;
    }
  }

  const acak = arr => arr[Math.floor(Math.random() * arr.length)];

  const BARIS = [
    { teks: 'TKA is coming…' },
    { teks: 'TKA is still coming…' },
    { teks: 'TKA is STILL coming…' },
    { teks: 'minus minus minus' },
    { teks: 'run that back' },
    { teks: () => 'damn salah (' + salahTotal() + ')' },
    { teks: () => 'jaring-jaring (' + acak(BENTUK) + ')' },
    { teks: 'Smarty Pants' },
    { teks: 'Aljabar terlalu overhated', sumber: 'Andra' }
  ];

  const terakhir = () => {
    try { return parseInt(sessionStorage.getItem(KUNCI), 10); } catch (e) { return NaN; }
  };
  const ingat = i => {
    try { sessionStorage.setItem(KUNCI, String(i)); } catch (e) { /* abaikan */ }
  };

  /* paksa: nomor baris, dipakai tes. */
  function pasang(nama, paksa) {
    const judul = document.querySelector('[data-kutipan="' + nama + '"]');
    if (!judul) return null;

    let pilih = paksa;
    if (pilih == null) {
      const lama = terakhir();
      do { pilih = Math.floor(Math.random() * BARIS.length); }
      while (BARIS.length > 1 && pilih === lama);
    }

    const b = BARIS[pilih];
    const teks = typeof b.teks === 'function' ? b.teks() : b.teks;
    judul.textContent = '\u201C' + teks + '\u201D';

    const sumber = judul.parentElement.querySelector('[data-kutipan-src]');
    if (sumber) {
      sumber.innerHTML = b.sumber ? '&mdash; ' + b.sumber : '';
      sumber.hidden = !b.sumber;
    }

    ingat(pilih);
    return { teks: teks, sumber: b.sumber || null };
  }

  window.KUTIPAN = BARIS;
  window.pasangKutipan = pasang;

  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-kutipan]').forEach(el => pasang(el.dataset.kutipan));
})();
