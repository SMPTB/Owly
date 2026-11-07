/* =========================================================
   mulai.js — halaman perkenalan untuk pengunjung pertama
   Nama dan kelas disimpan ke profil yang sama dengan yang
   dipakai halaman Profile (localStorage, bukan server).
   ========================================================= */
(function () {
  'use strict';

  const KEY = 'owly-progress-v1';

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (d && d.v === 1) return d;
    } catch (e) { /* penyimpanan diblokir */ }
    return null;
  }

  function sudahDaftar() {
    const d = load();
    return !!(d && d.profile && String(d.profile.name || '').trim());
  }

  function simpan(nama, kelas) {
    const d = load() || { v: 1, answers: {}, days: {}, log: [], last: null, profile: {} };
    d.profile = d.profile || {};
    d.profile.name = nama;
    d.profile.nick = nama.split(/\s+/)[0];
    d.profile.grade = 'SMP · Kelas ' + kelas;
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
      return true;
    } catch (e) {
      return false;
    }
  }

  window.OwlyMulai = { sudahDaftar: sudahDaftar, simpan: simpan };

  /* Sudah pernah isi: halaman ini nggak perlu dibuka lagi */
  if (sudahDaftar()) { location.replace('index.html'); return; }

  const form = document.getElementById('formMulai');
  if (!form) return;

  const nama = document.getElementById('nama');
  const kelas = document.getElementById('kelas');
  const err = document.getElementById('mulaiErr');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const n = nama.value.trim().replace(/\s+/g, ' ');
    if (n.length < 2) {
      err.textContent = 'Nama kamu isi dulu ya, minimal 2 huruf.';
      nama.focus();
      return;
    }
    if (!kelas.value) {
      err.textContent = 'Pilih kelasmu dulu.';
      kelas.focus();
      return;
    }

    err.textContent = '';
    if (!simpan(n, kelas.value)) {
      err.textContent = 'Browser ini nggak bisa menyimpan data. Coba matikan mode privat, lalu isi lagi.';
      return;
    }
    location.href = 'index.html';
  });
})();
