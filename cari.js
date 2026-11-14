/* =========================================================
   cari.js — pencarian materi
   - Bilah cari muncul di bilah atas, di samping sakelar bahasa.
   - Tekan Enter membuka cari.html?q=… yang mendaftar semua bagian
     materi yang memuat kata itu, lengkap dengan cuplikan kalimat.
   - Klik satu hasil membuka belajar.html?bab=…#L-… dan belajar.js
     menggulir halus ke bagian tersebut lalu menyorot katanya.
   Isi materi dibaca dari materi.js (window.MATERI).
   ========================================================= */
(function () {
  'use strict';

  const LETTER = 'ABCDEFGH';
  const $ = s => document.querySelector(s);
  const MATERI = Array.isArray(window.MATERI) ? window.MATERI : [];

  const esc = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const polos = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  function param(nama) {
    try { return new URLSearchParams(location.search).get(nama) || ''; } catch (e) { return ''; }
  }

  function polaKata(kata) {
    return new RegExp(kata.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  }

  /* ---------- 1. Bilah cari di bilah atas ---------- */
  function buatBilah() {
    const bar = $('.topbar__actions');
    if (!bar || bar.querySelector('.cari-bilah')) return;

    const form = document.createElement('form');
    form.className = 'cari-bilah';
    form.setAttribute('role', 'search');
    form.setAttribute('action', 'cari.html');
    form.setAttribute('method', 'get');
    form.innerHTML =
      '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
      '<input type="search" name="q" autocomplete="off" spellcheck="false" ' +
      'aria-label="Cari materi atau topik…" placeholder="Cari materi atau topik…">';

    /* di samping sakelar bahasa: sebelum sakelar, kalau belum ada sebelum pembatas */
    const sakelar = bar.querySelector('.switch-bahasa');
    const pembatas = bar.querySelector('.divider-v');
    bar.insertBefore(form, sakelar || pembatas || bar.firstChild);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const isi = form.elements.q.value.trim();
      if (!isi) { form.elements.q.focus(); return; }
      location.href = 'cari.html?q=' + encodeURIComponent(isi);
    });

    const q = param('q');
    if (q && document.getElementById('cariList')) form.elements.q.value = q;
  }

  /* ---------- 2. Kumpulkan teks materi ---------- */
  function teksBlok(b) {
    if (!Array.isArray(b)) return '';
    switch (b[0]) {
      case 'h':
      case 'p':    return polos(b[1]);
      case 'ul':
      case 'ol':   return (b[1] || []).map(polos).join(' ');
      case 'note':
      case 'warn':
      case 'text': return polos(b[1]) + '. ' + polos(b[2]);
      case 'table': return (b[1] || []).join(' ') + ' ' +
        (b[2] || []).map(r => (r || []).join(' ')).join(' ');
      case 'ex':   return polos(b[1]) + ' ' + (b[2] || []).map(polos).join(' ') + ' ' + polos(b[3]);
      case 'task': return polos(b[1]) + ' ' + (b[2] || []).map(polos).join(' ');
      default:     return '';
    }
  }

  /* Satu dokumen = satu bagian yang bisa dituju di halaman materi. */
  function dokumen(q) {
    const hasil = [];
    /* kata ikut dikirim supaya belajar.js bisa menyorotnya setelah halaman dibuka */
    const kata = q ? '&q=' + encodeURIComponent(q) : '';

    MATERI.forEach(bab => {
      const subj = bab.subject === 'ind' ? 'Bahasa Indonesia' : 'Matematika';
      /* "L" menandai bagian yang dituju; tanpa tanda # supaya peramban tidak
         melompat sendiri dan gulir halus dari belajar.js tetap terlihat. */
      const ke = bagian => 'belajar.html?bab=' + encodeURIComponent(bab.id) + kata +
        (bagian ? '&L=' + encodeURIComponent(bagian) : '');

      hasil.push({
        subj: subj, bab: bab.bab, label: 'Pendahuluan',
        judul: bab.bab,
        teks: [bab.bab, bab.intro].concat(bab.goals || []).map(polos).join(' '),
        isi: [bab.intro].concat(bab.goals || []).map(polos).join(' '),
        tautan: ke('')
      });

      (bab.lessons || []).forEach((l, i) => {
        const isi = (l.blocks || []).map(teksBlok).join(' ');
        hasil.push({
          subj: subj, bab: bab.bab, label: 'Materi ' + LETTER[i],
          judul: l.title,
          teks: l.title + ' ' + isi,
          isi: isi,
          tautan: ke(l.id)
        });
      });

      hasil.push({
        subj: subj, bab: bab.bab, label: 'Penutup',
        judul: 'Rangkuman',
        teks: [bab.bab].concat((bab.summary || []).map(polos)).join(' '),
        isi: (bab.summary || []).map(polos).join(' '),
        tautan: ke('rangkuman')
      });
    });

    return hasil;
  }

  /* ---------- 3. Pencocokan & cuplikan ---------- */
  function cuplikan(teks, tokens) {
    const rata = String(teks).replace(/\s+/g, ' ').trim();
    const bawah = rata.toLowerCase();
    let pos = -1;
    tokens.forEach(t => {
      const i = bawah.indexOf(t);
      if (i >= 0 && (pos < 0 || i < pos)) pos = i;
    });
    if (pos < 0) pos = 0;

    /* potong di batas kata supaya cuplikan tidak mulai/berhenti di tengah kata */
    let mulai = Math.max(0, pos - 70);
    if (mulai > 0) {
      const spasi = rata.indexOf(' ', mulai);
      if (spasi > -1 && spasi < pos) mulai = spasi + 1;
    }
    let akhir = Math.min(rata.length, pos + 130);
    if (akhir < rata.length) {
      const spasi = rata.lastIndexOf(' ', akhir);
      if (spasi > pos) akhir = spasi;
    }
    let potong = (mulai > 0 ? '… ' : '') + rata.slice(mulai, akhir) + (akhir < rata.length ? ' …' : '');
    potong = esc(potong);

    tokens.forEach(t => {
      potong = potong.replace(polaKata(t), '<mark class="cari-mark">$&</mark>');
    });
    return potong;
  }

  function cariDokumen(q) {
    const tokens = String(q).toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];

    return dokumen(q).map(d => {
      const teks = d.teks.toLowerCase();
      const judul = d.judul.toLowerCase();
      let jumlah = 0;
      let cocok = true;

      tokens.forEach(t => {
        const n = teks.split(t).length - 1;
        if (!n) { cocok = false; return; }
        jumlah += n + (judul.includes(t) ? 4 : 0) + (d.label.toLowerCase().includes(t) ? 2 : 0);
      });

      if (!cocok) return null;

      /* cuplikan diambil dari isi bagian, bukan judulnya, supaya tidak berulang */
      const sumber = d.isi && tokens.some(t => d.isi.toLowerCase().includes(t)) ? d.isi : d.teks;
      return Object.assign({}, d, { jumlah: jumlah, cuplikan: cuplikan(sumber, tokens) });
    }).filter(Boolean).sort((a, b) => b.jumlah - a.jumlah);
  }

  /* ---------- 4. Halaman hasil (cari.html) ---------- */
  function tampilkan() {
    const daftar = document.getElementById('cariList');
    if (!daftar) return;

    const q = param('q').trim();
    const jumlah = document.getElementById('cariCount');
    const label = document.getElementById('cariQuery');

    if (label) label.textContent = q ? '“' + q + '”' : '';

    if (!q) {
      if (jumlah) jumlah.textContent = '0';
      daftar.innerHTML = '<p class="cari-kosong">Ketik kata untuk mencari materi.</p>';
      return;
    }

    const hasil = cariDokumen(q);
    if (jumlah) jumlah.textContent = String(hasil.length);

    if (!hasil.length) {
      daftar.innerHTML = '<p class="cari-kosong">Tidak ada materi dengan kata itu. ' +
        'Coba kata lain atau periksa ejaannya.</p>';
      return;
    }

    daftar.innerHTML = hasil.map(d =>
      '<a class="cari-item" href="' + d.tautan + '">' +
        '<span class="cari-item__kepala">' +
          '<span class="cari-item__subj">' + esc(d.subj) + '</span>' +
          '<span class="cari-item__dot">·</span>' +
          '<span class="cari-item__bab">' + esc(d.bab) + '</span>' +
          '<span class="cari-item__label">' + esc(d.label) + '</span>' +
        '</span>' +
        '<span class="cari-item__judul">' + esc(d.judul) + '</span>' +
        '<span class="cari-item__snip">' + d.cuplikan + '</span>' +
      '</a>'
    ).join('');
  }

  function mulai() {
    buatBilah();
    tampilkan();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mulai);
  else mulai();
})();
