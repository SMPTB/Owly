/* =========================================================
   tka.js — mesin Simulasi TKA
   Bisa dipilih per mapel: Bahasa Indonesia 30 soal atau Matematika
   25 soal, diambil dari Bank Soal. Tanpa pilihan, keduanya digabung
   jadi 55 soal (30 lalu 25). Kalau koleksinya kurang, soal cadangan
   bergaya TKA dibuat di sini supaya jumlahnya tetap penuh.

   Batas waktu memakai jam asli (akhir = mulai + 70 menit), bukan
   hitungan detik di layar. Menutup halaman tidak menghentikannya.

   Simpanan di localStorage 'owly-tka-v1':
     { id, mulai, akhir, soal[], jawab{}, selesai, keluar, hasil, dilihat }
   ========================================================= */
(function () {
  'use strict';

  const KUNCI = 'owly-tka-v1';
  const MENIT = 70;
  const DURASI = MENIT * 60 * 1000;
  const BAGIAN = [['ind', 30], ['mtk', 25]];
  const TOTAL = BAGIAN.reduce((n, b) => n + b[1], 0);
  /* pilihan ganda, pilihan ganda banyak jawaban, dan tabel Benar/Salah */
  const JENIS = ['pg', 'multi', 'table'];

  const pad = n => String(n).padStart(2, '0');
  const acakDaftar = a => {
    const d = a.slice();
    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = d[i]; d[i] = d[j]; d[j] = t;
    }
    return d;
  };
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

  /* ---------- Soal cadangan ----------
     Bank Soal sekarang punya 90 soal B. Indonesia dan 118 soal
     Matematika, jadi bagian ini biasanya tidak dipakai. */
  const CADANGAN_IND = [
    {
      bab: 'Pemahaman Tekstual (Literal)', title: 'Ide pokok paragraf', level: 'Dasar',
      stimulus: '<p>Bank sampah di Kelurahan Sukamaju mengubah kebiasaan warga. Sampah plastik yang dulu dibuang ke sungai kini dipilah dan ditimbang setiap Sabtu. Hasil penjualannya masuk ke kas kelurahan dan dipakai untuk kegiatan posyandu.</p>',
      question: 'Ide pokok paragraf tersebut adalah …',
      options: ['Warga Sukamaju rajin bekerja bakti', 'Bank sampah mengubah kebiasaan warga dan mendatangkan manfaat', 'Posyandu membutuhkan dana tambahan', 'Sampah plastik paling banyak berasal dari sungai'],
      answer: 1,
      explain: 'Semua kalimat membicarakan bank sampah: kebiasaan memilah berubah dan hasilnya dipakai untuk posyandu. Itu ide pokoknya.'
    },
    {
      bab: 'Pemahaman Tekstual (Literal)', title: 'Makna kata dalam konteks', level: 'Dasar',
      stimulus: '<p>Sebelum menyerahkan laporan, Dita memeriksa setiap angka dengan <b>teliti</b> agar tidak ada hitungan yang keliru.</p>',
      question: 'Makna kata <i>teliti</i> pada kalimat tersebut adalah …',
      options: ['cepat selesai', 'sangat hati-hati dan cermat', 'suka menunda pekerjaan', 'bekerja bersama teman'],
      answer: 1,
      explain: 'Dita memeriksa setiap angka agar tidak keliru. Sikap seperti itu berarti hati-hati dan cermat.'
    },
    {
      bab: 'Pemahaman Inferensial', title: 'Simpulan isi teks', level: 'Sedang',
      stimulus: '<p>Hujan deras sejak pagi membuat jalan menuju sekolah tergenang. Sepeda motor tidak bisa lewat, tetapi siswa tetap datang dengan sepatu basah. Pak Rahmat memindahkan kelas pertama ke aula yang lebih tinggi.</p>',
      question: 'Simpulan yang tepat dari teks tersebut adalah …',
      options: ['Sekolah diliburkan karena banjir', 'Siswa dan guru berusaha tetap belajar meski jalan tergenang', 'Sepeda motor penyebab jalan tergenang', 'Aula sekolah dipakai untuk acara besar'],
      answer: 1,
      explain: 'Siswa tetap datang dan kelas dipindah ke aula. Artinya kegiatan belajar tetap berjalan walau ada genangan.'
    },
    {
      bab: 'Evaluasi dan Apresiasi Teks', title: 'Kalimat efektif', level: 'Sedang',
      stimulus: '',
      question: 'Kalimat yang paling efektif adalah …',
      options: ['Para siswa-siswa semua berkumpul di lapangan sekolah.', 'Semua siswa berkumpul di lapangan sekolah.', 'Siswa semuanya pada berkumpul di lapangan.', 'Di lapangan sekolah para siswa berkumpul semua sekali'],
      answer: 1,
      explain: 'Kalimat efektif tidak mengulang makna. “Para” sudah bermakna jamak, jadi “para siswa-siswa” berlebihan. Pilihan kedua paling ringkas dan jelas.'
    },
    {
      bab: 'Pemahaman Tekstual (Literal)', title: 'Urutan langkah', level: 'Dasar',
      stimulus: '<p>(1) Tuang air panas ke dalam gelas. (2) Masukkan serbuk cokelat. (3) Aduk hingga larut. (4) Tambahkan susu sesuai selera.</p>',
      question: 'Urutan yang tepat agar minuman cokelat larut sempurna adalah …',
      options: ['(1) – (2) – (3) – (4)', '(2) – (1) – (3) – (4)', '(2) – (4) – (1) – (3)', '(3) – (2) – (1) – (4)'],
      answer: 1,
      explain: 'Serbuk dimasukkan dulu, baru disiram air panas dan diaduk. Susu ditambahkan paling akhir supaya rasanya tidak berubah.'
    },
    {
      bab: 'Evaluasi dan Apresiasi Teks', title: 'Fakta dan opini', level: 'Sedang',
      stimulus: '<p>“Perpustakaan sekolah kami membuka layanan sampai pukul 16.00. Menurut saya, jam itu terlalu singkat karena banyak siswa pulang lebih lambat.”</p>',
      question: 'Kalimat yang berupa opini pada teks tersebut adalah …',
      options: ['Perpustakaan sekolah membuka layanan sampai pukul 16.00.', 'Banyak siswa pulang lebih lambat.', 'Menurut saya, jam itu terlalu singkat.', 'Layanan perpustakaan dibuka setiap hari.'],
      answer: 2,
      explain: 'Opini berisi pendapat pribadi dan ditandai kata “menurut saya”. Kalimat lain berupa informasi yang bisa dicek.'
    }
  ];

  /* Pembuat soal Matematika bergaya TKA, dipakai hanya jika bank kurang */
  function opsiAngka(nilai, lain) {
    const teks = [String(nilai)];
    lain.forEach(v => {
      const t = String(v);
      if (!teks.includes(t)) teks.push(t);
    });
    let tambah = 0;
    while (teks.length < 4) teks.push(String(Number(nilai) + (++tambah) * 2));
    const urut = acakDaftar(teks);
    return { options: urut, answer: urut.indexOf(String(nilai)) };
  }

  const BUAT_MTK = [
    () => {
      const a = ri(3, 12), b = ri(4, 9), hasil = a * b;
      const o = opsiAngka(hasil, [a + b, hasil - a, hasil + b]);
      return {
        bab: 'Bilangan', title: 'Operasi bilangan', level: 'Dasar',
        question: 'Hasil dari ' + a + ' × ' + b + ' adalah …',
        options: o.options, answer: o.answer,
        explain: a + ' × ' + b + ' = ' + hasil + '.'
      };
    },
    () => {
      const harga = ri(4, 20) * 10000, persen = [10, 15, 20, 25][ri(0, 3)];
      const hasil = harga * (100 - persen) / 100;
      const o = opsiAngka(hasil, [harga - persen, harga, harga * persen / 100]);
      return {
        bab: 'Bilangan', title: 'Persen dan diskon', level: 'Sedang',
        question: 'Sebuah tas berharga Rp' + harga.toLocaleString('id-ID') + ' mendapat diskon ' + persen + '%. Harga yang dibayar adalah …',
        options: o.options.map(v => 'Rp' + Number(v).toLocaleString('id-ID')), answer: o.answer,
        explain: 'Diskon ' + persen + '% berarti membayar ' + (100 - persen) + '% dari harga: ' + (100 - persen) + '% × Rp' + harga.toLocaleString('id-ID') + ' = Rp' + hasil.toLocaleString('id-ID') + '.'
      };
    },
    () => {
      const p = ri(6, 18), l = ri(4, 12), hasil = 2 * (p + l);
      const o = opsiAngka(hasil, [p * l, p + l, 2 * p + l]);
      return {
        bab: 'Geometri dan Pengukuran', title: 'Keliling persegi panjang', level: 'Dasar',
        question: 'Persegi panjang berukuran panjang ' + p + ' cm dan lebar ' + l + ' cm. Kelilingnya adalah …',
        options: o.options.map(v => v + ' cm'), answer: o.answer,
        explain: 'Keliling = 2 × (panjang + lebar) = 2 × (' + p + ' + ' + l + ') = ' + hasil + ' cm.'
      };
    },
    () => {
      const a = ri(60, 85), b = a + ri(2, 10), c = a - ri(2, 8), d = a + ri(1, 6);
      const hasil = Math.round((a + b + c + d) / 4);
      const o = opsiAngka(hasil, [a, b, hasil + 2]);
      return {
        bab: 'Data dan Peluang', title: 'Rata-rata data', level: 'Sedang',
        question: 'Nilai empat ulangan Rani adalah ' + a + ', ' + b + ', ' + c + ', dan ' + d + '. Rata-ratanya adalah …',
        options: o.options, answer: o.answer,
        explain: 'Jumlah nilai = ' + (a + b + c + d) + '. Dibagi 4 hasilnya ' + ((a + b + c + d) / 4).toFixed(2) + ', dibulatkan ' + hasil + '.'
      };
    }
  ];

  function buatCadangan(subject, n) {
    const hasil = [];
    let putar = 0;
    while (hasil.length < n && putar < 120) {
      putar++;
      let q;
      if (subject === 'mtk') q = BUAT_MTK[hasil.length % BUAT_MTK.length]();
      else q = JSON.parse(JSON.stringify(CADANGAN_IND[hasil.length % CADANGAN_IND.length]));
      if (hasil.some(x => x.question === q.question)) continue;
      hasil.push(q);
    }
    return hasil.map((q, k) => Object.assign({
      id: 'TKA-' + subject.toUpperCase() + '-' + (k + 1),
      subject: subject,
      type: 'pg',
      stimulus: q.stimulus || '',
      explain: q.explain || ''
    }, q));
  }

  /* ---------- Menyusun satu set soal ---------- */
  function susunSoal(pilihan) {
    const bank = window.SOAL || [];
    const semua = [];

    BAGIAN.filter(b => !pilihan || pilihan === 'semua' || b[0] === pilihan).forEach(bagian => {
      const subject = bagian[0], jumlah = bagian[1];
      const tersedia = bank.filter(q => JENIS.indexOf(q.type) >= 0 && q.subject === subject &&
        (q.type === 'table' ? q.rows && q.rows.length : q.options && q.options.length >= 3));
      /* satu teks soal hanya boleh muncul sekali, walau di bank ada beberapa id */
      const teksAda = new Set();
      const unik = acakDaftar(tersedia).filter(q => {
        const t = String(q.question).replace(/\s+/g, ' ').trim();
        if (teksAda.has(t)) return false;
        teksAda.add(t);
        return true;
      });
      const ambil = unik.slice(0, Math.min(jumlah, unik.length)).map(q => ({
        id: q.id, subject: q.subject || subject, bab: q.bab || '', title: q.title || '',
        level: q.level || '', type: q.type, stimulus: q.stimulus || '', question: q.question,
        options: q.options ? q.options.slice() : null,
        answer: q.type === 'multi' ? q.answer.slice() : q.answer,
        cols: q.cols ? q.cols.slice() : null,
        rows: q.rows ? q.rows.map(r => ({ t: r.t, a: r.a })) : null,
        explain: q.explain || ''
      }));
      if (ambil.length < jumlah) ambil.push.apply(ambil, buatCadangan(subject, jumlah - ambil.length));
      semua.push.apply(semua, ambil);
    });

    return semua;
  }

  /* ---------- Simpanan ---------- */
  function baca() {
    try {
      const d = JSON.parse(localStorage.getItem(KUNCI) || 'null');
      if (d && d.v === 1 && Array.isArray(d.soal) && d.soal.length) return d;
    } catch (e) { /* rusak atau diblokir */ }
    return null;
  }

  function tulis(s) {
    try { localStorage.setItem(KUNCI, JSON.stringify(s)); } catch (e) { /* penyimpanan penuh */ }
  }

  function hapus() {
    try { localStorage.removeItem(KUNCI); } catch (e) { /* diblokir */ }
  }

  /* pilihan: 'ind' (30 soal), 'mtk' (25 soal), atau kosong untuk keduanya */
  function mulai(pilihan) {
    const bagian = pilihan === 'ind' || pilihan === 'mtk' ? pilihan : 'semua';
    const sekarang = Date.now();
    const s = {
      v: 1,
      id: sekarang,
      pilihan: bagian,
      mulai: sekarang,
      akhir: sekarang + DURASI,
      soal: susunSoal(bagian),
      jawab: {},
      selesai: false,
      keluar: false,
      hasil: null,
      dilihat: false
    };
    tulis(s);
    return s;
  }

  const simpan = s => tulis(s);
  const sisaDetik = s => (s ? Math.max(0, (s.akhir - Date.now()) / 1000) : 0);

  /* jawaban bisa berupa nomor (pg), daftar nomor (multi), atau objek baris (table) */
  function terjawab(q, v) {
    if (!q || v == null) return false;
    if (q.type === 'multi') return Array.isArray(v) && v.length > 0;
    if (q.type === 'table') return typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length > 0;
    return true;
  }

  function benar(q, v) {
    if (!terjawab(q, v)) return false;
    if (q.type === 'multi') {
      return v.map(Number).sort().join(',') === q.answer.map(Number).sort().join(',');
    }
    if (q.type === 'table') {
      return q.rows.every((r, k) => Number(v[k]) === r.a);
    }
    return Number(v) === q.answer;
  }

  function selesaikan(s, alasan) {
    if (!s || s.selesai) return s;
    const hitung = { benar: 0, dijawab: 0, ind: { benar: 0, total: 0 }, mtk: { benar: 0, total: 0 } };
    s.soal.forEach((q, k) => {
      const kelompok = q.subject === 'ind' ? hitung.ind : hitung.mtk;
      kelompok.total++;
      const pilih = s.jawab[k];
      if (!terjawab(q, pilih)) return;
      hitung.dijawab++;
      if (benar(q, pilih)) {
        hitung.benar++;
        kelompok.benar++;
      }
    });
    s.selesai = true;
    s.hasil = {
      benar: hitung.benar,
      total: s.soal.length,
      dijawab: hitung.dijawab,
      ind: hitung.ind,
      mtk: hitung.mtk,
      alasan: alasan || 'kumpul',
      pada: Date.now()
    };
    tulis(s);
    return s;
  }

  function pesanHasil(s) {
    if (!s || !s.hasil) return '';
    const h = s.hasil;
    if (h.alasan === 'keluar') return 'Kamu keluar dari simulasi TKA. Hasilmu ' + h.benar + ' dari ' + h.total + '.';
    if (h.alasan === 'habis') return 'Waktu 70 menit habis dan jawabanmu terkumpul otomatis. Hasilmu ' + h.benar + ' dari ' + h.total + '.';
    return 'Kamu mengumpulkan lebih awal. Hasilmu ' + h.benar + ' dari ' + h.total + '.';
  }

  function sisaTeks(s) {
    const d = Math.max(0, Math.ceil(sisaDetik(s)));
    return pad(Math.floor(d / 60)) + ':' + pad(d % 60);
  }

  /* ---------- Notifikasi yang muncul di halaman lain ---------- */
  function notifikasi(s) {
    if (!s) return null;
    if (s.selesai) {
      if (s.dilihat) return null;
      return {
        kunci: s.id + ':hasil',
        judul: 'Hasil Simulasi TKA',
        teks: pesanHasil(s),
        aksi: 'Lihat hasil',
        tautan: 'simulasi.html?lihat=hasil'
      };
    }
    if (Date.now() >= s.akhir) {
      selesaikan(s, s.keluar ? 'keluar' : 'habis');
      return notifikasi(s);
    }
    return {
      kunci: s.id + ':jalan',
      judul: 'Simulasi TKA belum selesai',
      teks: 'Sisa waktu ' + sisaTeks(s) + '. Waktunya tetap berjalan walau halaman ini ditutup.',
      aksi: 'Lanjutkan',
      tautan: 'simulasi.html'
    };
  }

  const IKON_BELL =
    '<svg class="icon" viewBox="0 0 24 24"><path d="M10.268 21a2 2 0 0 0 3.464 0"/>' +
    '<path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>';

  function pasang() {
    if (document.body.hasAttribute('data-tka')) return;
    if (document.querySelector('[data-notif]')) return;

    const n = notifikasi(baca());
    if (!n) return;

    const kartu =
      '<article class="notif__item">' +
        '<b>' + n.judul + '</b>' +
        '<p>' + n.teks + '</p>' +
        '<div class="notif__aksi">' +
          '<a class="btn-act btn-act--red" href="' + n.tautan + '"><span>' + n.aksi + '</span></a>' +
          '<button class="notif__tutup" type="button" data-notif-tutup>Tutup</button>' +
        '</div>' +
      '</article>';

    const topbar = document.querySelector('.topbar__actions');
    if (!topbar) {
      const toast = document.createElement('div');
      toast.className = 'notif-toast';
      toast.setAttribute('data-notif', '');
      toast.innerHTML = kartu;
      document.body.appendChild(toast);
      toast.querySelector('[data-notif-tutup]').addEventListener('click', () => toast.remove());
      return;
    }

    const wrap = document.createElement('div');
    wrap.className = 'notif';
    wrap.setAttribute('data-notif', '');
    wrap.innerHTML =
      '<button class="icon-btn notif__btn" type="button" aria-label="Notifikasi" aria-expanded="false" aria-controls="notifPanel">' +
        IKON_BELL + '<i class="notif__dot"></i>' +
      '</button>' +
      '<div class="notif__panel" id="notifPanel" hidden>' +
        '<p class="notif__label">NOTIFIKASI</p>' + kartu +
      '</div>';
    topbar.insertBefore(wrap, topbar.firstChild);

    const tombol = wrap.querySelector('.notif__btn');
    const panel = wrap.querySelector('.notif__panel');
    const buka = on => {
      panel.hidden = !on;
      tombol.setAttribute('aria-expanded', on ? 'true' : 'false');
    };
    tombol.addEventListener('click', e => { e.stopPropagation(); buka(panel.hidden); });
    wrap.querySelector('[data-notif-tutup]').addEventListener('click', () => buka(false));
    document.addEventListener('click', e => { if (!wrap.contains(e.target)) buka(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') buka(false); });

    /* panel dibuka sendiri sekali per notifikasi, sisanya lewat tombol lonceng */
    let sudah = false;
    try { sudah = sessionStorage.getItem('owly-tka-notif') === n.kunci; } catch (e) { /* diblokir */ }
    if (!sudah) {
      buka(true);
      try { sessionStorage.setItem('owly-tka-notif', n.kunci); } catch (e) { /* diblokir */ }
    }
  }

  window.OwlyTKA = {
    KUNCI, MENIT, TOTAL, DURASI,
    ambil: baca,
    simpan: simpan,
    hapus: hapus,
    terjawab: terjawab,
    mulai: mulai,
    selesaikan: selesaikan,
    notifikasi: notifikasi,
    pesanHasil: pesanHasil,
    sisaDetik: sisaDetik,
    sisaTeks: sisaTeks
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pasang);
  else pasang();
})();
