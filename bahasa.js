/* =========================================================
   bahasa.js — sakelar bahasa ID / EN untuk seluruh halaman
   - Tombol ID / EN muncul di bilah atas setiap halaman.
   - Pilihan disimpan di localStorage ('owly-bahasa-v1').
   - Hanya antarmuka yang diterjemahkan. Teks materi dan soal
     dibiarkan apa adanya.
   ========================================================= */
(function () {
  'use strict';

  const KUNCI = 'owly-bahasa-v1';
  const LEWATI = [
    '#labBody', '#lessons', '.lesson-head', '.chapter',
    '.quiz', 'script', 'style', 'svg', 'textarea', '[data-no-translate]'
  ].join(',');

  /* ---------- kamus antarmuka ---------- */
  const KATA = {
    'Selamat pagi': 'Good morning',
    'Selamat siang': 'Good afternoon',
    'Selamat sore': 'Good afternoon',
    'Selamat malam': 'Good evening',
    'Beranda': 'Home',
    'Materi Pembelajaran': 'Learning Materials',
    'Latihan Soal': 'Practice',
    'Bank Soal': 'Question Bank',
    'Bank soal': 'Question bank',
    'Jadwal Belajar': 'Study Schedule',
    'Jadwal belajar': 'Study schedule',
    'Progres Belajar': 'Learning Progress',
    'Progres belajar': 'Learning progress',
    'Ruang belajar': 'Learning space',
    'Pusat bantuan': 'Help centre',
    'Cari materi atau topik…': 'Search materials or topics…',
    'Cari bab atau konsep...': 'Search chapters or concepts...',
    'Buka menu': 'Open menu',
    'Notifikasi': 'Notifications',
    'Menu utama': 'Main menu',
    'Belajar': 'Study',
    'Ruang pribadi': 'Personal space',
    'BELAJAR': 'STUDY',
    'RUANG PRIBADI': 'PERSONAL SPACE',
    'RUANG BELAJARMU': 'YOUR STUDY SPACE',
    'Siswa kelas 9': 'Grade 9 student',
    'Mulai': 'Start',
    'Mulai latihan': 'Start practice',
    'Lanjut belajar': 'Continue learning',
    'Lanjut membaca': 'Continue reading',
    'LANJUTKAN BELAJAR': 'CONTINUE LEARNING',
    'Mau belajar apa hari ini?': 'What do you want to learn today?',
    'Semua materi': 'All materials',
    'Matematika': 'Mathematics',
    'Bahasa Indonesia': 'Indonesian',
    'Bilangan, aljabar, geometri, dan data': 'Numbers, algebra, geometry, and data',
    'Memahami, menyimpulkan, dan menilai teks': 'Understanding, inferring, and evaluating texts',
    'REKOMENDASI UNTUKMU': 'RECOMMENDED FOR YOU',
    'Taklukkan sistem persamaan': 'Master systems of equations',
    'Temukan ide pokok bacaan': 'Find the main idea',
    'Peluang dalam keseharian': 'Probability in daily life',
    'Menyimpulkan isi teks': 'Drawing conclusions from a text',
    'Sedang': 'Medium',
    'Dasar': 'Basic',
    'soal': 'questions',
    'Soal': 'Questions',
    'menit': 'minutes',
    'Menit': 'Minutes',
    'langkah': 'steps',
    'bab': 'chapters',
    'kegiatan': 'activities',
    'Menantang': 'Challenging',
    'Progres bab': 'Chapter progress',
    'Progres belajarmu': 'Your progress',
    'Waktu belajar minggu ini': 'Study time this week',
    'Target mingguan': 'Weekly target',
    'Sudah dikerjakan': 'Answered',
    'Akurasi latihan': 'Practice accuracy',
    'Lihat semua jadwal': 'See the full schedule',
    'Hari ini': 'Today',
    'Target harian': 'Daily target',
    'Mulai dari satu langkah kecil.': 'Start with one small step.',
    'Satu langkah lagi hari ini!': 'One more step today!',
    'Target hari ini tercapai! 🎉': 'Today\u2019s target is done! 🎉',
    'Bilangan, mulai dari sini.': 'Numbers, start here.',
    'Matematika · Aljabar': 'Mathematics · Algebra',
    'Bahasa Indonesia · Inferensial': 'Indonesian · Inferential',
    'Bahasa Indonesia&nbsp; ·&nbsp; Inferensial': 'Indonesian · Inferential',
    'Matematika&nbsp; ·&nbsp; Aljabar': 'Mathematics · Algebra',
    'Informasi pribadi': 'Personal information',
    'Informasi sekolah': 'School information',
    'Ritme belajarmu': 'Your study rhythm',
    'Nama lengkap': 'Full name',
    'Nama panggilan': 'Nickname',
    'Nomor telepon': 'Phone number',
    'Nama sekolah': 'School name',
    'Jenjang & kelas': 'Level & class',
    'Kota': 'City',
    'Tahun ajaran': 'School year',
    'Target belajar mingguan': 'Weekly study target',
    'Waktu belajar favorit': 'Favourite study time',
    'Simpan perubahan': 'Save changes',
    'Simpan jadwal': 'Save schedule',
    'Pengingat belajar': 'Study reminder',
    'Atur jadwal belajar': 'Set up a study schedule',
    'Atur waktu yang nyaman dan jaga konsistensimu.': 'Pick a time that suits you and keep it steady.',
    'Ruang pribadimu,': 'Your personal space,',
    'Tambah jadwal': 'Add schedule',
    'Judul kegiatan': 'Activity title',
    'Mata pelajaran': 'Subject',
    'Tanggal': 'Date',
    'Jam mulai': 'Start time',
    'Durasi': 'Duration',
    'Batal': 'Cancel',
    'Hapus': 'Delete',
    'Lainnya': 'Other',
    'Minggu': 'Week',
    'Bulan': 'Month',
    'Kegiatan berikutnya': 'Next activity',
    'Belum ada kegiatan': 'No activities yet',
    'Belum ada jadwal pekan ini.': 'No schedule this week yet.',
    'Tambahkan kegiatan pertamamu, pengingatnya muncul di kartu hari ini.': 'Add your first activity; its reminder shows on the today card.',
    'Pekan ini masih kosong.': 'This week is still empty.',
    'Tambahkan jadwal pertamamu lewat tombol Tambah jadwal.': 'Add your first schedule with the Add schedule button.',
    'Peringatan': 'Reminder',
    'Tiga cara latihan': 'Three ways to practise',
    'Pilih latihanmu': 'Choose your practice',
    'Terakhir kamu kerjakan': 'Recently practised',
    'Soal sudah dikerjakan': 'Questions answered',
    'Soal dikerjakan': 'Questions answered',
    'Waktu latihan': 'Practice time',
    'Waktu belajar': 'Study time',
    'Belum ada latihan minggu ini': 'No practice this week yet',
    'Kerjakan soal untuk melihat akurasimu': 'Answer questions to see your accuracy',
    'Waktu belajar dihitung saat halaman terbuka.': 'Study time is counted while the page is open.',
    'Buat latihan': 'Create practice',
    'Topik': 'Topic',
    'Semua topik': 'All topics',
    'Balik kartu': 'Flip card',
    'Mulai campuran': 'Start mixed set',
    'Tujuan belajar': 'Learning goals',
    'Memuat…': 'Loading…',
    'Unduh': 'Download',
    'Pilihan ganda': 'Multiple choice',
    'Bahasa Inggris': 'English',
    'Huruf': 'Letter',
    'Belum dimulai': 'Not started',
    'Belum ada kegiatan berikutnya. Tambah jadwal dulu, ya.': 'No upcoming activity yet. Add a schedule first.',
    'Belum ada jadwal. Buka Jadwal Belajar untuk menambah kegiatan dan pengingat.': 'No schedule yet. Open Study Schedule to add activities and reminders.',
    'Pengingat muncul setelah kamu menambah jadwal.': 'Reminders appear after you add a schedule.',
    'Jadwal yang realistis lebih baik daripada jadwal yang penuh. Kamu boleh mengatur ulang kapan saja.': 'A realistic schedule beats a packed one. You can rearrange it any time.',
    'Isi kegiatanmu. Pengingat cuma tersimpan di perangkat ini.': 'Fill in your activity. Reminders stay on this device only.',
    'Ingatkan aku 10 menit sebelum mulai': 'Remind me 10 minutes before',
    'Boleh dikosongkan kalau belum mau diisi.': 'Leave it blank if you do not want to fill it in.',
    'Terus tumbuh, satu langkah setiap hari.': 'Keep growing, one step a day.',
    'Bergabung sejak September 2026': 'Joined September 2026',
    'Mulai dari satu soal dulu.': 'Start with one question.',
    'Mulai dari satu soal.': 'Start with one question.',
    'Balik ke Bilangan, yuk.': 'Back to Numbers, shall we?',
    'Lihat sejauh mana langkahmu dan rayakan kemajuan kecil.': 'See how far you have come and celebrate the small wins.',
    'Lihat sejauh mana langkahmu.': 'See how far you have come.',
    'Siap belajar dengan pengalaman yang lebih personal.': 'Ready to study with a more personal experience.',
    'Materi dan soal adalah contoh konseptual untuk belajar, bukan kurikulum atau soal resmi TKA.': 'Materials and questions are conceptual examples for study, not the official TKA curriculum or exam.',
    'Nggak harus cepat, yang penting konsisten.': 'Slow is fine, steady is what counts.',
    'Luangkan 20 menit untuk dirimu hari ini.': 'Set aside 20 minutes for yourself today.',
    'Sedikit demi sedikit, jadi bisa.': 'Little by little, it adds up.',
    'Waktu kecil, kebiasaan baik.': 'Small habits, started young.',
    'Kamu sudah menyelesaikan': 'You have finished',
    'dari': 'of',
    'bab. Teruskan langkah baikmu,': 'chapters. Keep up the good work,',
    'sudah selesai': 'done',
    'Naskah soal di halaman ini berasal dari sekolah, bukan buatan Ωwly.': 'The questions on this page come from school, not made by Ωwly.',
    'Waktu Indonesia Barat': 'Western Indonesia Time',
    'Pekan ini': 'This week',
    'Belum ada kegiatan hari ini. Tambah lewat tombol Tambah jadwal.': 'No activities today yet. Add one with the Add schedule button.',
    'Belum ada latihan. Kerjakan soal pertamamu di Bank soal.': 'No practice yet. Answer your first question in the Question bank.',
    'Latihan dibuka di halaman tersendiri, mulai dari soal yang belum kamu kuasai': 'Practice opens on its own page, starting with the questions you have not mastered yet',
    'Data dan Peluang': 'Data and Probability',
    'Geometri dan Pengukuran': 'Geometry and Measurement',
    'Pemahaman Inferensial': 'Inferential Comprehension',
    'Mulai streak-mu hari ini': 'Start your streak today',
    'Belum ada streak': 'No streak yet',
    'Belajar 3 hari berturut-turut': 'Study 3 days in a row',
    'Habis itu baca pembahasannya, biar tahu kenapa jawabannya begitu.': 'Then read the explanation, so you know why the answer works that way.'
    ,'Latihan soal': 'Practice questions'
    ,'Atur waktu latihan': 'Set practice time'
    ,'Pilih menit, lalu tekan Mulai. Waktu berhenti sendiri di nol.': 'Pick the minutes, then press Start. The timer stops by itself at zero.'
    ,'pilihan ganda': 'multiple choice'
    ,'Minggu ini ·': 'This week ·'
    ,'Bab selesai': 'Chapters done'
    ,'Semua materi dibaca dan semua soal dikuasai': 'Every material read and every question mastered'
    ,'Konsistensi minggu ini': 'Consistency this week'
    ,'Total waktu belajar ·': 'Total study time ·'
    ,'Ingatkan aku 10 menit sebelum jadwal dimulai.': 'Remind me 10 minutes before the schedule starts.'
    ,'Perubahan hanya berlaku untuk profil belajarmu.': 'Changes only apply to your study profile.'
    ,'Profilmu sudah lengkap': 'Your profile is complete'
    ,'Data belajarmu disimpan di perangkat ini saja dan tidak dikirim ke mana pun.': 'Your study data stays on this device and is never sent anywhere.'
    ,'Hapus data belajar di perangkat ini': 'Delete study data on this device'
    ,'bab selesai': 'chapters done'
    ,'Belum ada hari belajar minggu ini.': 'No study days this week yet.'
    ,'Mulai belajar untuk mengisi grafik': 'Start studying to fill the chart'
    ,'Semua soal dalam satu bab dikuasai': 'Every question in a chapter mastered'
    ,'Luangkan sedikit waktu untuk Matematika.': 'Make a little time for Mathematics.'
    ,'Mulai dari satu soal. Langkah kecil bisa membuat perbedaan.': 'Start with one question. Small steps add up.'
    ,'Buka bank soal': 'Open the question bank'
    ,'Kebiasaan baikmu mulai tumbuh.': 'Your good habits are taking root.'
    ,'Hal kecil yang patut dirayakan': 'Small wins worth celebrating'
    ,'Belum diraih · Kerjakan satu soal di Bank soal': 'Not earned yet · Answer one question in the Question bank'
    ,'Langkah pertama': 'First step'
    ,'Bab pertamamu selesai': 'Your first chapter done'
    ,'Mulai konsisten': 'Getting consistent'
    ,'Makin paham': 'Sharper understanding'
    ,'Akurasi latihan di atas 75%': 'Practice accuracy above 75%'
    ,'Belum diraih': 'Not earned yet'
    ,'Capai akurasi di atas 75% (min. 5 percobaan)': 'Reach accuracy above 75% (min. 5 attempts)'
  };

  const BULAN = {
    Januari: 'January', Februari: 'February', Maret: 'March', April: 'April',
    Mei: 'May', Juni: 'June', Juli: 'July', Agustus: 'August',
    September: 'September', Oktober: 'October', November: 'November', Desember: 'December',
    Jan: 'Jan', Feb: 'Feb', Mar: 'Mar', Apr: 'Apr', Jun: 'Jun', Jul: 'Jul',
    Agu: 'Aug', Sep: 'Sep', Okt: 'Oct', Nov: 'Nov', Des: 'Dec'
  };

  const ATURAN = [
    { pola: /^(\d+) dari (\d+) bab selesai$/, ganti: m => m[1] + ' of ' + m[2] + ' chapters done' },
    { pola: /^(\d+) dari (\d+) langkah selesai$/, ganti: m => m[1] + ' of ' + m[2] + ' steps done' },
    { pola: /^(\d+) dari (\d+) target belajar hari ini selesai\.$/, ganti: m => m[1] + ' of ' + m[2] + ' daily targets done.' },
    { pola: /^(\d+) dari (\d+) target belajar hari ini selesai \((.*)\)\.$/, ganti: m => m[1] + ' of ' + m[2] + ' daily targets done (' + (cocokAturan(m[3]) || m[3]) + ').' },
    { pola: /^(\d+)\/(\d+) soal · (\d+)\/(\d+) menit$/, ganti: m => m[1] + '/' + m[2] + ' questions · ' + m[3] + '/' + m[4] + ' minutes' },
    { pola: /^(\d+) soal tersisa$/, ganti: m => m[1] + ' questions left' },
    { pola: /^(\d+) langkah tersisa$/, ganti: m => m[1] + ' steps left' },
    { pola: /^(\d+) soal$/, ganti: m => m[1] + ' questions' },
    { pola: /^(\d+) bab$/, ganti: m => m[1] + ' chapters' },
    { pola: /^(\d+) kegiatan(?: · (\d+) menit belajar)?$/, ganti: m => m[1] + ' activities' + (m[2] ? ' · ' + m[2] + ' minutes of study' : '') },
    { pola: /^Hari ini, (\d+) (\S+)$/, ganti: m => 'Today, ' + m[1] + ' ' + m[2] },
    { pola: /^(\d+) \/ (\d+) menit$/, ganti: m => m[1] + ' / ' + m[2] + ' min' },
    { pola: /^(\d+) menit lagi menuju targetmu\.$/, ganti: m => m[1] + ' minutes to go until your target.' },
    { pola: /^BAB (\d+)$/, ganti: m => 'CHAPTER ' + m[1] },
    { pola: /^Menampilkan (\d+) dari (\d+) bab pembelajaran$/, ganti: m => 'Showing ' + m[1] + ' of ' + m[2] + ' chapters' },
    { pola: /^(\d+)[–-](\d+) ([A-Za-z]+)$/, ganti: m => BULAN[m[3]] ? m[1] + '–' + m[2] + ' ' + BULAN[m[3]] : null },
    { pola: /^(\d+) ([A-Za-z]+) – (\d+) ([A-Za-z]+)$/, ganti: m => (BULAN[m[2]] && BULAN[m[4]]) ? m[1] + ' ' + BULAN[m[2]] + ' – ' + m[3] + ' ' + BULAN[m[4]] : null },
    { pola: /^(\d+) ([A-Za-z]+)$/, ganti: m => BULAN[m[2]] ? m[1] + ' ' + BULAN[m[2]] : null },
    { pola: /^(\d+) hari berturut-turut$/, ganti: m => m[1] + ' day in a row' },
    { pola: /^(\d+) hari belajar berturut-turut$/, ganti: m => m[1] + ' study days in a row' },
    { pola: /^\+(\d+) menit dari minggu lalu$/, ganti: m => '+' + m[1] + ' minutes from last week' },
    { pola: /^(\d+) kegiatan belajar$/, ganti: m => m[1] + ' study activities' },
    { pola: /^(\d+) hari belajar minggu ini\. Sesi pendek juga dihitung\.$/, ganti: m => m[1] + ' study day this week. Short sessions count too.' },
    { pola: /^(\d+) hari belajar minggu ini\.$/, ganti: m => m[1] + ' study day this week.' }
  ];

  const asliTeks = new WeakMap();
  const asliAtribut = new WeakMap();
  let bahasa = 'id';
  let sibuk = false;

  try {
    bahasa = localStorage.getItem(KUNCI) === 'en' ? 'en' : 'id';
  } catch (e) { bahasa = 'id'; }

  function rapikan(s) {
    return String(s).replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function cocokAturan(inti) {
    for (const r of ATURAN) {
      const m = inti.match(r.pola);
      if (m) return r.ganti(m);
    }
    return null;
  }

  function terjemahInti(inti) {
    if (KATA[inti]) return KATA[inti];
    const aturan = cocokAturan(inti);
    if (aturan) return aturan;
    const awalan = inti.match(/^([^\p{L}\p{N}]+?)([\s\S]+)$/u);
    if (awalan) {
      const sisa = awalan[2].trim();
      const h = KATA[sisa] || cocokAturan(sisa);
      if (h) return awalan[1].trim() + ' ' + h;
    }

    const bagian = inti.split(/( · | • )/);
    if (bagian.length > 1) {
      let berubah = false;
      const hasil = bagian.map(b => {
        if (b === ' · ' || b === ' • ') return b;
        const t = b.trim();
        const h = KATA[t] || cocokAturan(t);
        if (h) { berubah = true; return h; }
        return t;
      });
      if (berubah) return hasil.join('');
    }
    return null;
  }

  function terjemahTeks(teks) {
    const cocok = teks.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!cocok) return teks;
    const inti = rapikan(cocok[2]);
    if (!inti) return teks;
    const hasil = terjemahInti(inti);
    return hasil ? cocok[1] + hasil + cocok[3] : teks;
  }

  function lewati(el) {
    return !el || !el.closest || !!el.closest(LEWATI);
  }

  function terapkan() {
    if (!document.body) return;
    sibuk = true;

    const jalan = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (lewati(n.parentElement)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const simpul = [];
    while (jalan.nextNode()) simpul.push(jalan.currentNode);

    simpul.forEach(n => {
      if (!asliTeks.has(n)) asliTeks.set(n, n.nodeValue);
      const asal = asliTeks.get(n);
      const baru = bahasa === 'en' ? terjemahTeks(asal) : asal;
      if (n.nodeValue !== baru) n.nodeValue = baru;
    });

    document.querySelectorAll('[placeholder], [aria-label], [title]').forEach(el => {
      if (lewati(el)) return;
      if (!asliAtribut.has(el)) asliAtribut.set(el, {});
      const simpan = asliAtribut.get(el);
      ['placeholder', 'aria-label', 'title'].forEach(at => {
        if (!el.hasAttribute(at)) return;
        if (!(at in simpan)) simpan[at] = el.getAttribute(at);
        const asal = simpan[at];
        const baru = bahasa === 'en' ? (KATA[rapikan(asal)] || asal) : asal;
        if (el.getAttribute(at) !== baru) el.setAttribute(at, baru);
      });
    });

    document.querySelectorAll('.switch-bahasa [data-bhs]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.bhs === bahasa);
      b.setAttribute('aria-pressed', b.dataset.bhs === bahasa ? 'true' : 'false');
    });

    document.documentElement.lang = bahasa === 'en' ? 'en' : 'id';
    document.title = bahasa === 'en' ? judulInggris() : judulAsli;

    sibuk = false;
  }

  const judulAsli = document.title;
  function judulInggris() {
    const bagian = judulAsli.split(' · ');
    const kepala = KATA[bagian[0]] || bagian[0];
    return [kepala].concat(bagian.slice(1)).join(' · ');
  }

  function setBahasa(baru) {
    bahasa = baru === 'en' ? 'en' : 'id';
    try { localStorage.setItem(KUNCI, bahasa); } catch (e) { /* abaikan */ }
    terapkan();
  }

  function buatSwitch() {
    const bar = document.querySelector('.topbar__actions');
    if (!bar || bar.querySelector('.switch-bahasa')) return;
    const kotak = document.createElement('div');
    kotak.className = 'switch-bahasa';
    kotak.setAttribute('data-no-translate', '');
    kotak.setAttribute('role', 'group');
    kotak.setAttribute('aria-label', 'Bahasa / Language');
    kotak.innerHTML = '<button type="button" data-bhs="id" aria-pressed="false">ID</button>' +
      '<button type="button" data-bhs="en" aria-pressed="false">EN</button>';
    const pembatas = bar.querySelector('.divider-v');
    bar.insertBefore(kotak, pembatas || bar.firstChild);
    kotak.addEventListener('click', e => {
      const b = e.target.closest('[data-bhs]');
      if (b) setBahasa(b.dataset.bhs);
    });
  }

  function mulai() {
    buatSwitch();
    terapkan();
    const pengamat = new MutationObserver(() => {
      clearTimeout(mulai.tunda);
      mulai.tunda = setTimeout(terapkan, 120);
    });
    pengamat.observe(document.body, { childList: true, subtree: true });

    /* sebagian teks baru digambar setelah DOMContentLoaded */
    [300, 900, 1800].forEach(ms => setTimeout(terapkan, ms));
    window.addEventListener('load', () => setTimeout(terapkan, 200));
  }

  window.OwlyBahasa = { set: setBahasa, sekarang: () => bahasa };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mulai);
  else mulai();
})();
