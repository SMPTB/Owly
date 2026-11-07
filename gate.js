/* =========================================================
   gate.js — gerbang kunjungan pertama
   Dimuat di <head> supaya halaman langsung dialihkan sebelum
   sempat tampil. Kalau profil sudah punya nama, tidak terjadi
   apa-apa. Kalau localStorage diblokir, halaman dibiarkan
   terbuka daripada pengunjung terjebak di halaman kosong.
   ========================================================= */
(function () {
  'use strict';
  try {
    const d = JSON.parse(localStorage.getItem('owly-progress-v1') || 'null');
    if (d && d.v === 1 && d.profile && String(d.profile.name || '').trim()) return;
  } catch (e) {
    return;
  }
  location.replace('mulai.html');
})();
