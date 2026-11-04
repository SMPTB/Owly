/* =========================================================
   quotes.js — kutipan di bawah judul halaman.
   Tiap halaman punya daftarnya sendiri lewat data-kutipan:
     materi.html   -> Gandhi
     latihan.html  -> Yoda
     index.html    -> dua kutipan James Clear, bergantian
   Halaman dengan lebih dari satu kutipan memilih acak dan
   tidak mengulang kutipan yang terakhir muncul.
   ========================================================= */
(function () {
  'use strict';

  const KUTIPAN = {
    materi: [
      { teks: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', sumber: 'Mahatma Gandhi' }
    ],
    latihan: [
      { teks: 'The greatest teacher, failure is.', sumber: 'Yoda', karya: 'Star Wars: The Last Jedi' }
    ],
    beranda: [
      { teks: 'You get what you repeat.', sumber: 'James Clear' },
      { teks: 'Ultimately, it is your commitment to the process that will determine your progress.', sumber: 'James Clear' }
    ]
  };

  const kunci = nama => 'owly-kutipan-' + nama;
  function terakhir(nama) {
    try { return parseInt(sessionStorage.getItem(kunci(nama)), 10); } catch (e) { return NaN; }
  }
  function ingat(nama, i) {
    try { sessionStorage.setItem(kunci(nama), String(i)); } catch (e) { /* abaikan */ }
  }

  /* nama: kunci daftar (materi/latihan/beranda); paksa: nomor kutipan, dipakai tes. */
  function pasang(nama, paksa) {
    const judul = document.querySelector('[data-kutipan="' + nama + '"]');
    const daftar = KUTIPAN[nama];
    if (!judul || !daftar || !daftar.length) return null;

    const sumber = judul.parentElement.querySelector('[data-kutipan-src]');

    let pilih = paksa;
    if (pilih == null) {
      const lama = terakhir(nama);
      do { pilih = Math.floor(Math.random() * daftar.length); }
      while (daftar.length > 1 && pilih === lama);
    }

    const k = daftar[pilih];
    judul.textContent = '\u201C' + k.teks + '\u201D';
    if (sumber) sumber.innerHTML = '&mdash; ' + k.sumber + (k.karya ? ', <cite>' + k.karya + '</cite>' : '');
    ingat(nama, pilih);
    return k;
  }

  window.KUTIPAN = KUTIPAN;
  window.pasangKutipan = pasang;

  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-kutipan]').forEach(el => pasang(el.dataset.kutipan));
})();
