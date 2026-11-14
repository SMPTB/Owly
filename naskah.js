/* =========================================================
   naskah.js — halaman pengerjaan satu naskah soal TKA sekolah
   (naskah.html?set=…)
   - Soal ditampilkan satu per satu, berurutan persis seperti
     naskah asli (tidak diacak).
   - Tiga jenis jawaban: pilihan ganda, pilihan ganda kompleks,
     dan tabel pernyataan (dua kolom).
   - Tiap soal diperiksa sendiri lewat tombol "Periksa jawaban",
     lalu lanjut dengan "Berikutnya".
   Data naskah ada di soal-tka.js (window.SOAL_TKA).
   ========================================================= */
(function () {
  'use strict';

  const SETS = Array.isArray(window.SOAL_TKA) ? window.SOAL_TKA : [];
  const params = new URLSearchParams(location.search);
  const set = SETS.find(s => s.id === params.get('set'));
  const daftar = document.getElementById('naskahList');
  if (!daftar) return;

  const SUBJ = { ind: 'Bahasa Indonesia', mtk: 'Matematika' };
  const HURUF = ['A', 'B', 'C', 'D', 'E', 'F'];
  const JENIS = {
    pg: 'Pilihan ganda',
    multi: 'Pilihan ganda kompleks',
    table: 'Tabel pernyataan'
  };

  const esc = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  function tidakAda() {
    const kepala = document.querySelector('[data-naskah-head]');
    if (kepala) kepala.hidden = true;
    daftar.innerHTML =
      '<p class="cari-kosong">Naskah tidak ditemukan. ' +
      '<a href="latihan.html">Kembali ke Latihan Soal</a>.</p>';
  }

  if (!set || !set.soal || !set.soal.length) { tidakAda(); return; }

  document.title = set.nama + ' · Ωwly';

  /* ---------- Kepala halaman ---------- */
  const isi = (sel, teks) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = teks;
  };
  isi('[data-naskah-nama]', set.nama);
  isi('[data-naskah-mapel]', SUBJ[set.subject] || set.subject);
  isi('[data-naskah-tanggal]', set.tanggal);
  isi('[data-naskah-jumlah]', set.soal.length + ' soal');
  isi('[data-naskah-asal]', set.asal);
  isi('[data-naskah-catatan]', set.catatan || '');

  /* ---------- Satu soal ---------- */
  function opsi(q) {
    return q.options.map((teks, i) =>
      '<label class="nk__opt">' +
        '<input type="' + (q.type === 'multi' ? 'checkbox' : 'radio') + '" ' +
          'name="s' + q.n + '" value="' + i + '">' +
        '<span class="nk__letter">' + HURUF[i] + '</span>' +
        '<span class="nk__teks">' + teks + '</span>' +
      '</label>').join('');
  }

  function tabel(q) {
    return '<div class="nk__tabelwrap"><table class="nk__tabel"><thead><tr><th>Pernyataan</th>' +
      q.cols.map(c => '<th>' + esc(c) + '</th>').join('') +
      '</tr></thead><tbody>' +
      q.rows.map((r, i) =>
        '<tr><td>' + r.t + '</td>' +
          q.cols.map((_, k) =>
            '<td><input type="radio" name="s' + q.n + '-r' + i + '" value="' + k + '"></td>').join('') +
        '</tr>').join('') +
      '</tbody></table></div>';
  }

  function kartu(q) {
    return '<article class="nk" id="soal-' + q.n + '" data-soal="' + q.n + '" data-jenis="' + q.type + '">' +
      '<div class="nk__kepala">' +
        '<span class="nk__nomor">Soal ' + q.n + '</span>' +
        '<span class="nk__jenis">' + JENIS[q.type] + '</span>' +
        (q.tambahan ? '<span class="nk__tambahan">Tambahan</span>' : '') +
      '</div>' +
      (q.stimulus ? '<div class="nk__stimulus">' + q.stimulus + '</div>' : '') +
      '<p class="nk__pertanyaan">' + q.question + '</p>' +
      (q.type === 'table'
        ? tabel(q)
        : '<div class="nk__opsi">' + opsi(q) + '</div>') +
      '<div class="nk__hasil" hidden></div>' +
    '</article>';
  }

  daftar.innerHTML = set.soal.map(kartu).join('');

  const kartuEls = Array.prototype.slice.call(daftar.querySelectorAll('.nk'));
  const skorEl = document.querySelector('[data-naskah-skor]');
  const catatanEl = document.querySelector('[data-naskah-status]');
  const nomorEl = document.querySelector('[data-naskah-nomor]');
  const btnPrev = document.querySelector('[data-naskah-prev]');
  const btnNext = document.querySelector('[data-naskah-next]');
  const btnPeriksa = document.querySelector('[data-naskah-periksa]');
  const btnReset = document.querySelector('[data-naskah-reset]');

  const status = {};   // nomor soal -> true (tepat) / false (belum tepat)
  let idx = 0;

  /* ---------- Navigasi satu soal per halaman ---------- */
  function tampil(i, geser) {
    idx = Math.min(Math.max(i, 0), kartuEls.length - 1);
    kartuEls.forEach((el, k) => { el.hidden = k !== idx; });
    if (nomorEl) nomorEl.textContent = 'Soal ' + (idx + 1) + ' dari ' + kartuEls.length;
    if (btnPrev) btnPrev.disabled = idx === 0;
    if (btnNext) btnNext.disabled = idx === kartuEls.length - 1;
    if (geser && daftar.scrollIntoView) daftar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- Pemeriksaan jawaban ---------- */
  function dipilih(nama) {
    return Array.prototype.slice.call(daftar.querySelectorAll('input[name="' + nama + '"]:checked'));
  }

  function sudahDijawab(q) {
    if (q.type === 'table') {
      return q.rows.every((r, i) => dipilih('s' + q.n + '-r' + i).length > 0);
    }
    return dipilih('s' + q.n).length > 0;
  }

  function bersihkan(kotak) {
    kotak.classList.remove('is-benar', 'is-salah');
    kotak.querySelectorAll('.nk__opt').forEach(o => o.classList.remove('is-kunci', 'is-benar', 'is-salah'));
    kotak.querySelectorAll('.nk__tabel td').forEach(td => td.classList.remove('is-kunci', 'is-benar', 'is-salah'));
    const h = kotak.querySelector('.nk__hasil');
    if (h) { h.hidden = true; h.innerHTML = ''; h.className = 'nk__hasil'; }
  }

  function nilai(q, kotak) {
    let tepat = false;
    let kunci = '';

    if (q.type === 'pg') {
      const pilih = dipilih('s' + q.n);
      tepat = pilih.length === 1 && Number(pilih[0].value) === q.answer;
      kunci = HURUF[q.answer] + '. ' + q.options[q.answer];
      kotak.querySelectorAll('.nk__opt').forEach((o, i) => {
        if (i === q.answer) o.classList.add('is-kunci');
        if (pilih.length && Number(pilih[0].value) === i) o.classList.add(tepat ? 'is-benar' : 'is-salah');
      });
    } else if (q.type === 'multi') {
      const pilih = dipilih('s' + q.n).map(x => Number(x.value)).sort();
      const jawab = q.answer.slice().map(Number).sort();
      tepat = pilih.length > 0 && pilih.join(',') === jawab.join(',');
      kunci = jawab.map(i => HURUF[i]).join(', ') + ': ' + jawab.map(i => q.options[i]).join('; ');
      kotak.querySelectorAll('.nk__opt').forEach((o, i) => {
        const benar = jawab.indexOf(i) >= 0;
        const dipilihnya = pilih.indexOf(i) >= 0;
        if (benar) o.classList.add('is-kunci');
        if (dipilihnya) o.classList.add(benar ? 'is-benar' : 'is-salah');
      });
    } else {
      tepat = true;
      q.rows.forEach((r, i) => {
        const pilih = dipilih('s' + q.n + '-r' + i);
        const nilaiPilih = pilih.length ? Number(pilih[0].value) : -1;
        if (nilaiPilih !== r.a) tepat = false;
        const baris = kotak.querySelectorAll('.nk__tabel tbody tr')[i];
        baris.querySelectorAll('input').forEach((inp, k) => {
          if (k === r.a) inp.closest('td').classList.add('is-kunci');
          if (nilaiPilih === k) inp.closest('td').classList.add(nilaiPilih === r.a ? 'is-benar' : 'is-salah');
        });
      });
      kunci = q.rows.map((r, i) =>
        (i + 1) + '. ' + String(r.t).replace(/<[^>]+>/g, '') + ' → ' + q.cols[r.a]).join(' · ');
    }

    return { tepat, kunci };
  }

  function perbaruiSkor() {
    const total = set.soal.length;
    const diperiksa = Object.keys(status).length;
    let benar = 0;
    Object.keys(status).forEach(n => { if (status[n]) benar++; });

    if (!diperiksa) {
      if (skorEl) skorEl.textContent = '';
      if (catatanEl) catatanEl.textContent = '';
      return;
    }
    if (diperiksa < total) {
      if (skorEl) skorEl.textContent = benar + ' benar · ' + (diperiksa - benar) + ' salah';
      if (catatanEl) catatanEl.textContent = (total - diperiksa) + ' soal belum diperiksa';
      return;
    }
    const pct = Math.round(benar / total * 100);
    if (skorEl) skorEl.textContent = benar + ' / ' + total + ' benar (' + pct + '%)';
    if (catatanEl) {
      catatanEl.textContent = benar === total
        ? 'Semua tepat. Naskah ini sudah kamu kuasai.'
        : 'Baca ulang pembahasan tiap soal, lalu ulangi naskah ini.';
    }
  }

  function periksa() {
    const q = set.soal[idx];
    const kotak = kartuEls[idx];
    const hasil = kotak.querySelector('.nk__hasil');

    if (!sudahDijawab(q)) {
      if (hasil) {
        hasil.hidden = false;
        hasil.className = 'nk__hasil';
        hasil.innerHTML = '<b>Belum dijawab.</b><p>Pilih jawaban dulu, lalu tekan Periksa jawaban.</p>';
      }
      return;
    }

    bersihkan(kotak);
    const r = nilai(q, kotak);
    status[q.n] = r.tepat;
    kotak.classList.add(r.tepat ? 'is-benar' : 'is-salah');
    hasil.hidden = false;
    hasil.className = 'nk__hasil ' + (r.tepat ? 'is-ok' : 'is-no');
    hasil.innerHTML = '<b>' + (r.tepat ? 'Tepat.' : 'Belum tepat.') + '</b>' +
      '<span class="nk__kunci">Kunci: ' + r.kunci + '</span>' +
      '<p>' + (q.explain || '') + '</p>';
    perbaruiSkor();
  }

  function reset() {
    daftar.querySelectorAll('input').forEach(i => { i.checked = false; });
    kartuEls.forEach(k => bersihkan(k));
    Object.keys(status).forEach(n => { delete status[n]; });
    perbaruiSkor();
    tampil(0, true);
  }

  if (btnPeriksa) btnPeriksa.addEventListener('click', periksa);
  if (btnReset) btnReset.addEventListener('click', reset);
  if (btnPrev) btnPrev.addEventListener('click', () => tampil(idx - 1, true));
  if (btnNext) btnNext.addEventListener('click', () => tampil(idx + 1, true));

  tampil(0, false);
})();
