/* =========================================================
   kerja.js — pembuka kerjakan.html
   Halaman ini cuma berisi satu latihan. Mode dan soalnya
   dibaca dari URL:
     kerjakan.html?mode=alpha
     kerjakan.html?mode=alpha&q=MTK-004
     kerjakan.html?mode=alpha&subject=mtk&topic=Aljabar
     kerjakan.html?mode=delta
     kerjakan.html?mode=omega
   Ganti tab di dalam halaman tidak membuka halaman baru,
   URL-nya saja yang diperbarui supaya bisa di-refresh.
   ========================================================= */
(function () {
  'use strict';

  const MODE = {
    alpha: { letter: 'α', judul: 'Alpha · pilihan ganda' },
    delta: { letter: 'δ', judul: 'Delta · flashcard' },
    omega: { letter: 'ω', judul: 'Omega · latihan interaktif' }
  };

  const p = new URLSearchParams(location.search);
  const mode = MODE[p.get('mode')] ? p.get('mode') : 'alpha';

  const opts = {};
  if (p.get('q')) opts.question = p.get('q');
  if (p.get('subject')) opts.subject = p.get('subject');
  if (p.get('topic')) opts.topic = p.get('topic');

  document.title = MODE[mode].judul.replace(' · ', ' — ') + ' · Ωwly';

  if (window.OwlyLatihan) {
    window.OwlyLatihan.open(mode, opts);
  } else {
    /* Tanpa data soal, jangan biarkan halaman kosong. */
    const body = document.getElementById('labBody');
    if (body) {
      body.innerHTML = '<p class="lab__fallback">Latihannya gagal dimuat. <a href="latihan.html">Kembali ke pilihan latihan</a>.</p>';
    }
  }

  /* Tab di dalam halaman: ganti isi, perbarui URL, tanpa reload. */
  document.addEventListener('click', e => {
    const tab = e.target.closest('[data-mode]');
    if (!tab || !MODE[tab.dataset.mode]) return;
    const url = new URL(location.href);
    url.searchParams.set('mode', tab.dataset.mode);
    history.replaceState(null, '', url);
    document.title = MODE[tab.dataset.mode].judul.replace(' · ', ' — ') + ' · Ωwly';
  });
})();
