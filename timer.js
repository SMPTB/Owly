/* =========================================================
   timer.js — pengatur waktu latihan (kerjakan.html)
   Tombol di bilah atas panel latihan. Waktu berjalan dengan
   hitungan mundur, tetap akurat walau tab sempat tidak aktif
   karena memakai selisih waktu, bukan tambah-kurang per detik.

   Saat waktu habis, tombol berubah warna dan bel kecil berbunyi
   tiga kali. Bunyinya dibuat lewat Web Audio, jadi tidak ada
   file suara yang perlu diunduh.
   ========================================================= */
(function () {
  'use strict';

  const akar = document.getElementById('labTimer');
  if (!akar) return;

  const PRESET = [5, 10, 15, 20];
  const MAKS = 180;

  let menit = 10;
  let sisa = 0;          // detik
  let jalan = false;
  let akhir = 0;
  let detak = null;

  const fmt = d => {
    const m = Math.floor(d / 60);
    const s = d % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  };

  /* ---------- Bunyi bel ---------- */
  let audio = null;

  /* dibangun saat tombol Mulai diklik supaya browser mengizinkan suara */
  function siapkanAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audio) {
      try { audio = new AC(); } catch (e) { return null; }
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function nada(ac, mulai, frekuensi, durasi, volume) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = frekuensi;
    gain.gain.setValueAtTime(0.0001, mulai);
    gain.gain.exponentialRampToValueAtTime(volume, mulai + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, mulai + durasi);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(mulai);
    osc.stop(mulai + durasi + 0.05);
  }

  /* tiga kali bunyi, tiap bunyi dua nada seperti bel kecil */
  function dering() {
    const ac = siapkanAudio();
    if (!ac) return;
    const t0 = ac.currentTime + 0.03;
    for (let i = 0; i < 3; i++) {
      const t = t0 + i * 0.45;
      nada(ac, t, 880, 0.42, 0.18);
      nada(ac, t, 1318.5, 0.3, 0.07);
    }
  }

  akar.innerHTML =
    '<button class="pill timer__btn" type="button" aria-expanded="false" aria-controls="timerPanel">' +
      '<svg class="icon timer__icon" aria-hidden="true"><use href="#clock"/></svg>' +
      '<span data-sisa>Timer</span></button>' +
    '<div class="timer__panel" id="timerPanel" hidden>' +
      '<p class="timer__label">Atur waktu latihan</p>' +
      '<div class="timer__presets">' +
        PRESET.map(m => '<button class="pill" type="button" data-menit="' + m + '">' + m + ' menit</button>').join('') +
      '</div>' +
      '<div class="timer__row">' +
        '<input class="input timer__input" id="timerMenit" type="number" min="1" max="' + MAKS + '" step="1" value="' + menit + '" aria-label="Menit">' +
        '<span>menit</span>' +
        '<button class="pill" type="button" data-mulai>Mulai</button>' +
      '</div>' +
      '<div class="timer__aksi">' +
        '<button class="pill" type="button" data-jeda hidden>Jeda</button>' +
        '<button class="pill" type="button" data-ulang>Ulang</button>' +
      '</div>' +
      '<p class="timer__note" data-catatan>Pilih menit, lalu tekan Mulai. Waktu berhenti sendiri di nol.</p>' +
    '</div>';

  const btn = akar.querySelector('.timer__btn');
  const label = akar.querySelector('[data-sisa]');
  const panel = akar.querySelector('#timerPanel');
  const input = akar.querySelector('#timerMenit');
  const btnJeda = akar.querySelector('[data-jeda]');
  const catatan = akar.querySelector('[data-catatan]');

  function gambar() {
    const habis = !jalan && sisa === 0 && akhir > 0;
    label.textContent = habis ? '00:00' : (jalan || sisa > 0 ? fmt(sisa) : 'Timer');
    btn.classList.toggle('is-active', jalan);
    akar.classList.toggle('is-jalan', jalan);
    akar.classList.toggle('is-habis', habis);
    btnJeda.hidden = !jalan;
    if (jalan) btnJeda.textContent = 'Jeda';
  }

  function hentikan() {
    if (detak) clearInterval(detak);
    detak = null;
    jalan = false;
  }

  function selesai() {
    hentikan();
    sisa = 0;
    gambar();
    catatan.textContent = 'Waktu habis. Sesi latihan tetap bisa dilanjutkan.';
    dering();
  }

  function tik() {
    const s = Math.max(0, Math.round((akhir - Date.now()) / 1000));
    if (s === sisa) return;
    sisa = s;
    gambar();
    if (sisa === 0) selesai();
  }

  function mulai(durasi) {
    const n = Math.max(1, Math.min(MAKS, Math.round(durasi)));
    menit = n;
    input.value = String(n);
    sisa = n * 60;
    akhir = Date.now() + sisa * 1000;
    siapkanAudio();
    hentikan();
    jalan = true;
    detak = setInterval(tik, 250);
    catatan.textContent = 'Timer berjalan. Tekan Jeda kalau perlu berhenti sebentar.';
    gambar();
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  }

  function jeda() {
    if (jalan) {
      sisa = Math.max(0, Math.round((akhir - Date.now()) / 1000));
      hentikan();
      btnJeda.textContent = 'Lanjut';
      btnJeda.hidden = false;
      catatan.textContent = 'Timer dijeda. Tekan Lanjut untuk melanjutkan.';
      gambar();
      btnJeda.textContent = 'Lanjut';
      btnJeda.hidden = false;
      return;
    }
    if (sisa > 0) {
      akhir = Date.now() + sisa * 1000;
      jalan = true;
      detak = setInterval(tik, 250);
      catatan.textContent = 'Timer berjalan lagi.';
      gambar();
      btnJeda.hidden = false;
      btnJeda.textContent = 'Jeda';
    }
  }

  function ulang() {
    hentikan();
    sisa = 0;
    akhir = 0;
    label.textContent = 'Timer';
    catatan.textContent = 'Pilih menit, lalu tekan Mulai. Waktu berhenti sendiri di nol.';
    btnJeda.textContent = 'Jeda';
    btnJeda.hidden = true;
    gambar();
  }

  btn.addEventListener('click', () => {
    const buka = panel.hidden;
    panel.hidden = !buka;
    btn.setAttribute('aria-expanded', buka ? 'true' : 'false');
    if (buka) input.focus();
  });

  panel.addEventListener('click', e => {
    const p = e.target.closest('[data-menit]');
    if (p) { mulai(parseInt(p.dataset.menit, 10)); return; }
    if (e.target.closest('[data-mulai]')) { mulai(parseInt(input.value, 10) || menit); return; }
    if (e.target.closest('[data-jeda]')) { jeda(); return; }
    if (e.target.closest('[data-ulang]')) { ulang(); }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); mulai(parseInt(input.value, 10) || menit); }
  });

  /* kembali ke tab: hitung ulang sisa waktu supaya belnya tepat */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && jalan) tik();
  });

  document.addEventListener('click', e => {
    if (!akar.contains(e.target)) {
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) {
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });

  window.OwlyTimer = {
    mulai: mulai,
    sisa: () => sisa,
    jalan: () => jalan
  };
})();
