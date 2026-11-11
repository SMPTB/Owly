/* =========================================================
   simulasi.js — halaman Simulasi TKA (simulasi.html)
   Menampilkan satu sesi 55 soal dengan batas waktu 70 menit.
   Tiap jawaban langsung disimpan, jadi menutup halaman tidak
   menghapus apa pun. Waktu dihitung dari batas akhir, bukan
   dari detik yang lewat di layar.
   ========================================================= */
(function () {
  'use strict';

  const T = window.OwlyTKA;
  const body = document.getElementById('tkaBody');
  if (!T || !body) return;

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  const SUBJ = { ind: 'Bahasa Indonesia', mtk: 'Matematika' };

  const bar = document.querySelector('[data-tka-bar]');
  const kotakWaktu = document.querySelector('[data-timer]');
  const labelWaktu = document.querySelector('[data-sisa]');
  const tombolKumpul = document.querySelector('[data-kumpul]');

  let s = T.ambil();
  let i = 0;
  let detak = null;

  const pad = n => String(n).padStart(2, '0');
  const sisaTeks = () => {
    const d = Math.max(0, Math.ceil(T.sisaDetik(s)));
    return pad(Math.floor(d / 60)) + ':' + pad(d % 60);
  };

  function hentikanDetak() {
    if (detak) clearInterval(detak);
    detak = null;
  }

  function tampilkanBar(on) {
    if (tombolKumpul) tombolKumpul.hidden = !on;
    if (kotakWaktu) kotakWaktu.hidden = !on;
    if (bar) bar.classList.toggle('is-ujian', on);
  }

  function gambarWaktu() {
    if (!s) return;
    const d = T.sisaDetik(s);
    if (labelWaktu) labelWaktu.textContent = sisaTeks();
    if (kotakWaktu) {
      kotakWaktu.classList.toggle('is-dekat', d <= 600 && d > 300);
      kotakWaktu.classList.toggle('is-habis', d <= 300);
    }
  }

  function pasangDetak() {
    hentikanDetak();
    gambarWaktu();
    detak = setInterval(() => {
      if (!s || s.selesai) { hentikanDetak(); return; }
      gambarWaktu();
      if (T.sisaDetik(s) <= 0) kumpulkan(s.keluar ? 'keluar' : 'habis');
    }, 500);
  }

  /* ---------- Layar pembuka ---------- */
  function renderAwal() {
    hentikanDetak();
    s = null;
    i = 0;
    tampilkanBar(false);
    body.innerHTML =
      '<section class="tka__intro">' +
        '<p class="eyebrow eyebrow--olive">SIMULASI TKA</p>' +
        '<h1>Uji kesiapanmu dalam satu duduk.</h1>' +
        '<p class="tka__lead">55 soal pilihan ganda: 30 Bahasa Indonesia lalu 25 Matematika, disusun dari Bank Soal. Waktunya 70 menit dan tidak bisa dijeda.</p>' +
        '<ul class="tka__aturan">' +
          '<li>Waktu terus berjalan walau halaman ditutup atau ponsel dimatikan.</li>' +
          '<li>Keluar di tengah ujian bukan berarti bebas: jawabanmu tetap tersimpan dan waktu tetap dihitung.</li>' +
          '<li>Saat waktu habis, jawaban dikumpulkan otomatis dan hasilnya muncul di notifikasi.</li>' +
        '</ul>' +
        '<div class="tka__aksi">' +
          '<button class="btn-act btn-act--red" type="button" data-mulai><span>Mulai simulasi</span></button>' +
          '<a class="btn-act" href="latihan.html"><span>Kembali ke latihan</span></a>' +
        '</div>' +
      '</section>';
    body.querySelector('[data-mulai]').addEventListener('click', () => {
      s = T.mulai();
      i = 0;
      render();
    });
  }

  /* ---------- Soal ---------- */
  function renderSoal() {
    const q = s.soal[i];
    const dipilih = s.jawab[i];

    body.innerHTML =
      '<section class="tka__que">' +
        '<div class="tka__meta">' +
          '<span class="chip">' + SUBJ[q.subject] + ' · ' + q.bab + '</span>' +
          '<span>Soal ' + (i + 1) + ' dari ' + s.soal.length + '</span>' +
        '</div>' +
        '<article class="tka__card">' +
          (q.stimulus ? '<div class="tka__stimulus">' + q.stimulus + '</div>' : '') +
          '<p class="tka__q">' + q.question + '</p>' +
          '<div class="tka__opts" role="radiogroup" aria-label="Pilihan jawaban">' +
            q.options.map((o, k) =>
              '<button class="tka__opt' + (dipilih === k ? ' is-pilih' : '') + '" type="button" role="radio"' +
                ' aria-checked="' + (dipilih === k ? 'true' : 'false') + '" data-opt="' + k + '">' +
                '<b>' + LETTERS[k] + '</b><span>' + o + '</span></button>').join('') +
          '</div>' +
        '</article>' +
        '<div class="tka__foot">' +
          '<button class="btn-act" type="button" data-prev' + (i === 0 ? ' disabled' : '') + '><span>Sebelumnya</span></button>' +
          '<details class="tka__info"><summary>Aturan singkat</summary>' +
            '<p>Waktu tidak bisa dijeda. Kalau halaman ditutup, hitungan tetap jalan dan notifikasi akan mengingatkanmu saat kembali.</p>' +
          '</details>' +
          '<button class="btn-act btn-act--red" type="button" data-next' +
            (i === s.soal.length - 1 ? ' disabled' : '') + '><span>Berikutnya</span></button>' +
        '</div>' +
      '</section>' +
      '<aside class="tka__nav">' +
        '<p class="tka__navlabel">Nomor soal</p>' +
        '<div class="tka__grid">' +
          s.soal.map((_, k) =>
            '<button class="tka__cell' + (s.jawab[k] != null ? ' is-done' : '') + (k === i ? ' is-now' : '') +
            '" type="button" data-nav="' + k + '" aria-label="Soal ' + (k + 1) + '">' + (k + 1) + '</button>').join('') +
        '</div>' +
        '<p class="tka__legend"><i class="tka__legend-done"></i> sudah dijawab</p>' +
        '<p class="tka__legend"><i class="tka__legend-now"></i> sedang dibuka</p>' +
        '<button class="btn-act tka__kumpul" type="button" data-kumpul-kecil><span>Kumpulkan</span></button>' +
      '</aside>';

    body.querySelectorAll('[data-opt]').forEach(b => {
      b.addEventListener('click', () => pilih(Number(b.dataset.opt)));
    });

    const prev = body.querySelector('[data-prev]');
    const next = body.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', () => pindah(i - 1));
    if (next) next.addEventListener('click', () => pindah(i + 1));
    body.querySelectorAll('[data-nav]').forEach(b => {
      b.addEventListener('click', () => pindah(Number(b.dataset.nav)));
    });
    const kecil = body.querySelector('[data-kumpul-kecil]');
    if (kecil) kecil.addEventListener('click', tanyaKumpul);
  }

  function pindah(k) {
    if (!s || k < 0 || k >= s.soal.length) return;
    i = k;
    renderSoal();
    if (window.innerWidth < 900 && body.firstElementChild && body.firstElementChild.scrollIntoView) {
      body.firstElementChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function pilih(k) {
    if (!s || s.selesai) return;
    s.jawab[i] = k;
    T.simpan(s);
    body.querySelectorAll('[data-opt]').forEach(b => {
      const on = Number(b.dataset.opt) === k;
      b.classList.toggle('is-pilih', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    const sel = body.querySelector('[data-nav="' + i + '"]');
    if (sel) sel.classList.add('is-done');
  }

  /* ---------- Hasil ---------- */
  function barisRinci(nama, benar, total) {
    return '<div class="tka__rinci-row"><span>' + nama + '</span><b>' + benar + ' / ' + total + '</b></div>';
  }

  function renderHasil(st) {
    hentikanDetak();
    const h = st.hasil;
    if (!h) return renderAwal();

    st.dilihat = true;
    T.simpan(st);
    tampilkanBar(false);

    const nilai = Math.round(h.benar / h.total * 100);
    body.innerHTML =
      '<section class="tka__hasil">' +
        '<p class="eyebrow eyebrow--olive">HASIL SIMULASI TKA</p>' +
        '<span class="tka__skor">' + h.benar + ' / ' + h.total + '</span>' +
        '<h1>' + (h.benar >= h.total * 0.7 ? 'Bekalmu sudah kuat.' : h.benar >= h.total * 0.4 ? 'Sudah ada dasarnya.' : 'Masih ada ruang untuk naik.') + '</h1>' +
        '<p class="tka__lead">' + T.pesanHasil(st) + '</p>' +
        '<div class="tka__rinci">' +
          barisRinci('Bahasa Indonesia', h.ind.benar, h.ind.total) +
          barisRinci('Matematika', h.mtk.benar, h.mtk.total) +
          barisRinci('Soal dijawab', h.dijawab, h.total) +
        '</div>' +
        '<p class="tka__nilai">Nilai ' + nilai + ' dari 100.</p>' +
        '<div class="tka__aksi">' +
          '<button class="btn-act btn-act--red" type="button" data-ulang><span>Mulai simulasi baru</span></button>' +
          '<a class="btn-act" href="bank-soal.html"><span>Buka bank soal</span></a>' +
          '<a class="btn-act" href="latihan.html"><span>Kembali ke latihan</span></a>' +
        '</div>' +
      '</section>';

    body.querySelector('[data-ulang]').addEventListener('click', () => {
      s = T.mulai();
      i = 0;
      render();
    });
  }

  /* ---------- Kumpulkan ---------- */
  function kumpulkan(alasan) {
    if (!s || s.selesai) return;
    hentikanDetak();
    s = T.selesaikan(s, alasan || 'kumpul');
    renderHasil(s);
  }

  function tanyaKumpul() {
    if (!s || s.selesai) return;
    const terjawab = s.soal.filter((q, k) => s.jawab[k] != null).length;
    const kosong = s.soal.length - terjawab;

    const lapis = document.createElement('div');
    lapis.className = 'tka__ask';
    lapis.innerHTML =
      '<div class="tka__askbox" role="dialog" aria-modal="true" aria-labelledby="askJudul">' +
        '<h2 id="askJudul">Kumpulkan sekarang?</h2>' +
        '<p>' + terjawab + ' soal sudah dijawab, ' + kosong + ' masih kosong. Jawaban tidak bisa diubah setelah dikumpulkan.</p>' +
        '<div class="tka__aksi">' +
          '<button class="btn-act" type="button" data-batal><span>Lanjut mengerjakan</span></button>' +
          '<button class="btn-act btn-act--red" type="button" data-ya><span>Kumpulkan</span></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(lapis);

    const tutup = () => lapis.remove();
    lapis.querySelector('[data-batal]').addEventListener('click', tutup);
    lapis.querySelector('[data-ya]').addEventListener('click', () => { tutup(); kumpulkan('kumpul'); });
    lapis.addEventListener('click', e => { if (e.target === lapis) tutup(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key !== 'Escape') return;
      tutup();
      document.removeEventListener('keydown', esc);
    });
    lapis.querySelector('[data-ya]').focus();
  }

  /* ---------- Kerangka ---------- */
  function render() {
    if (!s) return renderAwal();
    if (s.selesai && s.hasil) return renderHasil(s);
    if (T.sisaDetik(s) <= 0) return kumpulkan(s.keluar ? 'keluar' : 'habis');

    s.keluar = false;
    T.simpan(s);
    tampilkanBar(true);
    renderSoal();
    pasangDetak();
  }

  if (tombolKumpul) tombolKumpul.addEventListener('click', tanyaKumpul);

  /* keluar dari halaman saat ujian berjalan tetap dihitung: waktunya jalan */
  window.addEventListener('pagehide', () => {
    if (s && !s.selesai) {
      s.keluar = true;
      T.simpan(s);
    }
  });

  if (!s) renderAwal();
  else if (s.selesai) renderHasil(s);
  else if (T.sisaDetik(s) <= 0) kumpulkan(s.keluar ? 'keluar' : 'habis');
  else render();
})();
