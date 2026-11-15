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

  /* ---------- 1a. Istilah dua bahasa ----------
     Isi materi berbahasa Indonesia, tetapi antarmuka bisa beralih ke
     Inggris. Setiap kata di satu keluarga dianggap sama, jadi "algebra"
     menemukan "aljabar" dan sebaliknya. */
  const ISTILAH = [
    ['bilangan', 'angka', 'number', 'numbers', 'numeral', 'whole'],
    ['aljabar', 'algebra', 'algebraic'],
    ['geometri', 'geometry', 'geometric'],
    ['pengukuran', 'measurement', 'measure', 'measuring'],
    ['pecahan', 'fraction', 'fractions'],
    ['desimal', 'decimal', 'decimals'],
    ['persen', 'percent', 'percentage'],
    ['perbandingan', 'rasio', 'ratio', 'proportion', 'comparison'],
    ['peluang', 'probability', 'chance'],
    ['statistika', 'statistik', 'statistics', 'statistic'],
    ['persamaan', 'equation', 'equations'],
    ['pertidaksamaan', 'inequality', 'inequalities'],
    ['variabel', 'variable', 'variables'],
    ['konstanta', 'constant'],
    ['koefisien', 'coefficient'],
    ['fungsi', 'function'],
    ['grafik', 'chart', 'graph'],
    ['tabel', 'table'],
    ['sudut', 'angle', 'angles'],
    ['segitiga', 'triangle'],
    ['lingkaran', 'circle'],
    ['bangun', 'shape', 'shapes'],
    ['pangkat', 'eksponen', 'exponent', 'power'],
    ['akar', 'root', 'roots'],
    ['faktor', 'factor', 'factors'],
    ['kelipatan', 'multiple', 'multiples'],
    ['prima', 'prime'],
    ['positif', 'positive'],
    ['negatif', 'negative'],
    ['garis', 'line'],
    ['penjumlahan', 'addition'],
    ['pengurangan', 'subtraction'],
    ['perkalian', 'multiplication'],
    ['pembagian', 'division'],
    ['rata-rata', 'average', 'mean'],
    ['luas', 'area'],
    ['keliling', 'perimeter'],
    ['volume', 'volume'],
    ['teks', 'text', 'passage'],
    ['bacaan', 'reading'],
    ['paragraf', 'paragraph'],
    ['kalimat', 'sentence'],
    ['kesimpulan', 'conclusion'],
    ['sinonim', 'synonym'],
    ['antonim', 'antonym'],
    ['metafora', 'metaphor'],
    ['puisi', 'poem', 'poetry'],
    ['cerita', 'story'],
    ['tokoh', 'character'],
    ['latar', 'setting'],
    ['opini', 'opinion'],
    ['fakta', 'fact'],
    ['argumen', 'argument'],
    ['struktur', 'structure']
  ];

  const SINONIM = (() => {
    const peta = new Map();
    ISTILAH.forEach(kel => kel.forEach(kata => {
      const ada = peta.get(kata) || new Set();
      kel.forEach(saudara => ada.add(saudara));
      peta.set(kata, ada);
    }));
    return peta;
  })();

  /* semua bentuk kata yang dianggap sama (termasuk bentuk jamak Inggris) */
  function varian(kata) {
    const set = new Set([kata]);
    const tambah = k => { if (SINONIM.has(k)) SINONIM.get(k).forEach(w => set.add(w)); };
    tambah(kata);
    tambah(kata.replace(/ies$/, 'y').replace(/e?s$/, ''));
    return Array.from(set);
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

    const input = form.elements.q;
    const buka = () => { form.classList.add('is-buka'); input.focus(); };

    /* bilah mulai sebagai ikon; klik di mana pun pada bilah membukanya */
    form.addEventListener('click', e => {
      if (form.classList.contains('is-buka')) return;
      e.preventDefault();
      buka();
    });
    input.addEventListener('focus', () => form.classList.add('is-buka'));
    input.addEventListener('blur', () => {
      if (!input.value.trim()) form.classList.remove('is-buka');
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { input.value = ''; input.blur(); }
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const isi = input.value.trim();
      if (!isi) { input.focus(); return; }
      location.href = 'cari.html?q=' + encodeURIComponent(isi);
    });

    const q = param('q');
    if (q && document.getElementById('cariList')) input.value = q;
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
    const kata = String(q).toLowerCase().split(/\s+/).filter(Boolean);
    if (!kata.length) return [];

    /* satu kelompok per kata yang diketik; kelompok boleh cocok lewat
       padanan bahasanya (algebra ≙ aljabar) */
    const grup = kata.map(varian);
    const sorot = Array.from(new Set(grup.reduce((a, g) => a.concat(g), [])))
      .sort((a, b) => b.length - a.length);

    return dokumen(q).map(d => {
      const teks = d.teks.toLowerCase();
      const judul = d.judul.toLowerCase();
      const label = d.label.toLowerCase();
      const isi = d.isi.toLowerCase();
      let jumlah = 0;
      let cocok = true;

      grup.forEach(g => {
        let n = 0;
        g.forEach(v => { n += teks.split(v).length - 1; });
        if (!n) { cocok = false; return; }
        jumlah += n;
        if (g.some(v => judul.includes(v))) jumlah += 4;
        if (g.some(v => label.includes(v))) jumlah += 2;
      });

      if (!cocok) return null;

      /* cuplikan diambil dari isi bagian, bukan judulnya, supaya tidak berulang */
      const sumber = d.isi && grup.some(g => g.some(v => isi.includes(v))) ? d.isi : d.teks;
      return Object.assign({}, d, { jumlah: jumlah, cuplikan: cuplikan(sumber, sorot) });
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
