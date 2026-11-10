/* =========================================================
   jadwal.js — jadwal belajar + pengingat
   Data disimpan di localStorage ('owly-jadwal-v1') dan kosong
   saat pertama kali dibuka. Dipakai di jadwal.html dan index.html.

   Satu kegiatan:
     { id, judul, mapel:'mtk'|'ind'|'lain', date:'YYYY-MM-DD',
       time:'HH:MM', duration: menit, reminder: bool, done: bool }
   ========================================================= */
(function () {
  'use strict';

  const KEY = 'owly-jadwal-v1';
  const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const HARI_PANJANG = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const MAPEL = {
    mtk: { nama: 'Matematika', cls: '', warna: '#6B7A3A' },
    ind: { nama: 'B. Indonesia', cls: 'ev--amber', warna: '#C8792D' },
    lain: { nama: 'Lainnya', cls: 'ev--purple', warna: '#A383CF' }
  };

  const $ = s => document.querySelector(s);

  function baca() {
    try {
      const a = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(a) ? a : [];
    } catch (e) { return []; }
  }
  function simpan(a) {
    try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) { /* penyimpanan penuh */ }
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const hariIni = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const geser = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const awalPekan = d => {
    const x = new Date(d); x.setHours(0, 0, 0, 0);
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return x;
  };
  const jamTampil = t => String(t || '00:00').replace(':', '.');
  const urut = (a, b) => (a.date + a.time).localeCompare(b.date + b.time);
  const kosong = a => !a.length;

  /* ---------- penanda hari ---------- */
  function labelHari(d) {
    return HARI_PANJANG[d.getDay()] + ', ' + d.getDate() + ' ' + BULAN[d.getMonth()];
  }
  function rentangPekan(start) {
    const akhir = geser(start, 6);
    if (start.getMonth() === akhir.getMonth()) {
      return start.getDate() + '–' + akhir.getDate() + ' ' + BULAN[start.getMonth()];
    }
    return start.getDate() + ' ' + BULAN[start.getMonth()] + ' – ' + akhir.getDate() + ' ' + BULAN[akhir.getMonth()];
  }

  /* ---------- dialog tambah jadwal ---------- */
  function dialog() { return $('#dialogJadwal'); }

  function bukaDialog(tanggal) {
    const d = dialog();
    if (!d) { location.href = 'jadwal.html?tambah=1'; return; }
    const f = $('#formJadwal');
    if (f) {
      f.reset();
      const t = $('#jTanggal');
      if (t) t.value = tanggal || iso(hariIni());
      const jam = $('#jJam');
      if (jam && !jam.value) jam.value = '16:00';
    }
    if (typeof d.showModal === 'function') d.showModal();
    else d.setAttribute('open', '');
    const judul = $('#jJudul');
    if (judul) judul.focus();
  }
  function tutupDialog() {
    const d = dialog();
    if (!d) return;
    if (typeof d.close === 'function') d.close();
    else d.removeAttribute('open');
  }

  function pasangDialog() {
    const d = dialog();
    if (!d) return;

    document.addEventListener('click', e => {
      if (e.target.closest('[data-buka-tambah]')) { e.preventDefault(); bukaDialog(); }
      if (e.target.closest('[data-tutup]')) { e.preventDefault(); tutupDialog(); }
    });

    const form = $('#formJadwal');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const judul = ($('#jJudul').value || '').trim();
        const tanggal = $('#jTanggal').value;
        const jam = $('#jJam').value;
        if (!judul || !tanggal || !jam) return;
        const baru = {
          id: 'jd-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
          judul: judul.slice(0, 60),
          mapel: $('#jMapel').value,
          date: tanggal,
          time: jam,
          duration: parseInt($('#jDurasi').value, 10) || 30,
          reminder: $('#jIngat').checked,
          done: false
        };
        const semua = baca();
        semua.push(baru);
        simpan(semua);
        tutupDialog();
        gambarSemua(tanggal);
      });
    }

    if (new URLSearchParams(location.search).get('tambah') === '1') bukaDialog();
  }

  /* ---------- halaman Jadwal Belajar ---------- */
  let pekan = awalPekan(hariIni());

  function itemAgenda(ev) {
    const m = MAPEL[ev.mapel] || MAPEL.lain;
    return '<button type="button" class="agenda-item agenda-item--btn' + (ev.done ? ' is-done' : '') + '" data-tandai="' + ev.id + '">' +
      '<time>' + jamTampil(ev.time) + '</time>' +
      '<i style="background:' + m.warna + '"></i>' +
      '<div class="agenda-item__body"><b>' + esc(ev.judul) + '</b>' +
      '<span>' + m.nama + ' · ' + ev.duration + ' menit' + (ev.reminder ? ' · pengingat' : '') + '</span>' +
      '<span class="chip' + (ev.done ? '' : ' chip--amber') + '">' + (ev.done ? 'Selesai' : 'Akan datang') + '</span></div>' +
      '<svg class="icon"><use href="#' + (ev.done ? 'circle-check' : 'circle-play') + '"/></svg>' +
      '</button>';
  }

  function renderRingkas(semua) {
    const dalam = semua.filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return d >= pekan && d <= geser(pekan, 6);
    });
    const judul = $('[data-ringkas-judul]');
    const teks = $('[data-ringkas-teks]');
    if (!judul || !teks) return;
    if (kosong(dalam)) {
      judul.textContent = 'Pekan ini masih kosong.';
      teks.textContent = 'Tambahkan jadwal pertamamu lewat tombol Tambah jadwal.';
      return;
    }
    const selesai = dalam.filter(e => e.done).length;
    judul.textContent = dalam.length + ' kegiatan di pekan ini.';
    teks.textContent = selesai + ' sudah selesai, ' + (dalam.length - selesai) + ' masih menunggu.';
  }

  function renderKepalaPekan() {
    const bulan = $('[data-bulan]');
    const rentang = $('[data-rentang]');
    if (bulan) bulan.textContent = BULAN[pekan.getMonth()] + ' ' + pekan.getFullYear();
    if (rentang) rentang.textContent = rentangPekan(pekan) + ' · Waktu Indonesia Barat';
  }

  function renderBoard(semua) {
    const grid = $('#boardGrid');
    const kosongEl = $('#boardEmpty');
    if (!grid) return;

    const hari = Array.from({ length: 7 }, (_, i) => geser(pekan, i));
    const kunci = hari.map(iso);
    const dalam = semua.filter(e => kunci.indexOf(e.date) >= 0).sort(urut);

    const kepala = '<div></div>' + hari.map((d, i) => {
      const ini = iso(d) === iso(hariIni());
      return '<div class="wk-day' + (ini ? ' is-today' : '') + '"><small>' + HARI[d.getDay()] + '</small><b>' + d.getDate() + '</b></div>';
    }).join('');

    const jam = [];
    dalam.forEach(e => {
      const h = parseInt(String(e.time).slice(0, 2), 10);
      if (jam.indexOf(h) < 0) jam.push(h);
    });
    jam.sort((a, b) => a - b);
    if (!jam.length) for (let h = 16; h <= 19; h++) jam.push(h);

    const baris = [];
    jam.forEach(h => {
      baris.push('<div class="wk-time">' + String(h).padStart(2, '0') + '.00</div>');
      hari.forEach(d => {
        const ev = dalam.find(e => e.date === iso(d) && parseInt(String(e.time).slice(0, 2), 10) === h);
        if (!ev) { baris.push('<div class="slot"></div>'); return; }
        const m = MAPEL[ev.mapel] || MAPEL.lain;
        const ini = iso(d) === iso(hariIni());
        baris.push('<div class="ev ' + m.cls + (ini ? ' ev--today' : '') + (ev.done ? ' is-done' : '') + '" data-id="' + ev.id + '">' +
          '<b>' + esc(ev.judul) + '</b>' +
          '<span>' + jamTampil(ev.time) + ' · ' + ev.duration + ' menit</span>' +
          '<button type="button" class="ev__del" data-hapus="' + ev.id + '" aria-label="Hapus ' + esc(ev.judul) + '">×</button>' +
          '</div>');
      });
    });

    grid.innerHTML = kepala + baris.join('');
    grid.hidden = kosong(dalam);
    if (kosongEl) kosongEl.hidden = !kosong(dalam);
  }

  function renderHariIni(semua) {
    const label = $('[data-todaylabel]');
    const hitung = $('[data-todaycount]');
    const daftar = $('#agendaHariIni');
    const t = hariIni();
    const isi = semua.filter(e => e.date === iso(t)).sort(urut);

    if (label) label.textContent = labelHari(t);
    if (hitung) {
      hitung.textContent = kosong(isi)
        ? 'Belum ada kegiatan'
        : isi.length + ' kegiatan · ' + isi.reduce((n, e) => n + e.duration, 0) + ' menit belajar';
    }
    if (daftar) {
      daftar.innerHTML = kosong(isi)
        ? '<p class="agenda__empty">Belum ada kegiatan hari ini. Tambah lewat tombol Tambah jadwal.</p>'
        : isi.map(itemAgenda).join('');
    }

    const pengingat = semua.filter(e => e.reminder && !e.done &&
      new Date(e.date + 'T' + e.time).getTime() >= Date.now());
    const teksIngat = $('[data-remind-text]');
    if (teksIngat) {
      teksIngat.textContent = kosong(pengingat)
        ? (semua.length ? 'Belum ada pengingat aktif.' : 'Pengingat muncul setelah kamu menambah jadwal.')
        : pengingat.length + ' pengingat aktif · 10 menit sebelum mulai';
    }
  }

  function renderBerikut(semua) {
    const wadah = $('#kegiatanBerikut');
    if (!wadah) return;
    const sekarang = new Date();
    const berikut = semua.filter(e => !e.done && new Date(e.date + 'T' + e.time) >= sekarang).sort(urut)[0];
    if (!berikut) {
      wadah.innerHTML = '<p class="agenda__empty">Belum ada kegiatan berikutnya. Tambah jadwal dulu, ya.</p>';
      return;
    }
    const d = new Date(berikut.date + 'T00:00:00');
    const m = MAPEL[berikut.mapel] || MAPEL.lain;
    wadah.innerHTML = '<div class="next-card__row">' +
      '<span class="ico-box"><svg class="icon"><use href="#calendar-check"/></svg></span>' +
      '<div><b>' + esc(berikut.judul) + '</b><span>' + labelHari(d) + ' · ' + jamTampil(berikut.time) + ' · ' + berikut.duration + ' menit</span></div>' +
      '<span class="chip">' + m.nama + '</span>' +
      '</div>';
  }

  function gambarJadwal() {
    const semua = baca().sort(urut);
    renderRingkas(semua);
    renderKepalaPekan();
    renderBoard(semua);
    renderHariIni(semua);
    renderBerikut(semua);
  }

  /* ---------- beranda ---------- */
  let dipilih = hariIni();

  function renderBeranda() {
    if (!$('#week')) return;
    const semua = baca().sort(urut);
    const pekanIni = awalPekan(dipilih);
    const bulan = $('[data-calmonth]');
    if (bulan) bulan.textContent = BULAN[dipilih.getMonth()] + ' ' + dipilih.getFullYear();

    const week = $('#week');
    if (week) {
      week.innerHTML = Array.from({ length: 7 }, (_, i) => {
        const d = geser(pekanIni, i);
        const aktif = iso(d) === iso(dipilih);
        const ada = semua.some(e => e.date === iso(d));
        return '<button type="button" class="day' + (aktif ? ' is-active' : '') + '" data-hari="' + iso(d) + '">' +
          '<small>' + HARI[d.getDay()].charAt(0) + '</small><b>' + d.getDate() + '</b>' +
          (ada ? '<i class="day__dot"></i>' : '') + '</button>';
      }).join('');
      week.querySelectorAll('[data-hari]').forEach(btn => btn.addEventListener('click', () => {
        dipilih = new Date(btn.dataset.hari + 'T00:00:00');
        renderBeranda();
      }));
    }

    const isi = semua.filter(e => e.date === iso(dipilih));
    const label = $('[data-todaylabel]');
    if (label) label.textContent = iso(dipilih) === iso(hariIni()) ? 'Hari ini, ' + dipilih.getDate() + ' ' + BULAN[dipilih.getMonth()] : labelHari(dipilih);
    const hitung = $('[data-agenda-count]');
    if (hitung) hitung.textContent = isi.length ? isi.length + ' kegiatan' : 'Belum ada kegiatan';

    const daftar = $('#agendaList');
    if (daftar) {
      daftar.innerHTML = isi.length
        ? isi.map(ev => {
            const m = MAPEL[ev.mapel] || MAPEL.lain;
            return '<li><time>' + jamTampil(ev.time) + '</time><i style="background:' + m.warna + '"></i>' +
              '<div><b>' + esc(ev.judul) + '</b><span>' + m.nama + (ev.reminder ? ' · pengingat' : '') + '</span></div>' +
              '<svg class="icon agenda__play"><use href="#circle-play"/></svg></li>';
          }).join('')
        : '<li class="agenda__empty">Belum ada jadwal. Buka Jadwal Belajar untuk menambah kegiatan dan pengingat.</li>';
    }
  }

  /* ---------- hapus & tandai selesai ---------- */
  document.addEventListener('click', e => {
    const hapus = e.target.closest('[data-hapus]');
    if (hapus) {
      e.preventDefault();
      const id = hapus.dataset.hapus;
      if (!confirm('Hapus jadwal ini?')) return;
      simpan(baca().filter(x => x.id !== id));
      gambarJadwal();
      renderBeranda();
      return;
    }
    const tandai = e.target.closest('[data-tandai]');
    if (tandai) {
      const id = tandai.dataset.tandai;
      const semua = baca().map(x => x.id === id ? Object.assign({}, x, { done: !x.done }) : x);
      simpan(semua);
      gambarJadwal();
      renderBeranda();
    }
  });

  /* ---------- tombol navigasi pekan ---------- */
  const lalu = $('#pekanLalu');
  const depan = $('#pekanDepan');
  const ini = $('#pekanIni');
  const tambah = $('#btnTambahJadwal');
  if (lalu) lalu.addEventListener('click', () => { pekan = geser(pekan, -7); gambarJadwal(); });
  if (depan) depan.addEventListener('click', () => { pekan = geser(pekan, 7); gambarJadwal(); });
  if (ini) ini.addEventListener('click', () => { pekan = awalPekan(hariIni()); gambarJadwal(); });
  if (tambah) tambah.addEventListener('click', () => bukaDialog());

  /* ---------- mulai ---------- */
  function gambarSemua() {
    gambarJadwal();
    renderBeranda();
  }

  window.OwlyJadwal = { baca: baca, simpan: simpan };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { pasangDialog(); gambarSemua(); });
  } else {
    pasangDialog();
    gambarSemua();
  }
})();
