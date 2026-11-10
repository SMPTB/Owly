/* =========================================================
   penerjemah.js — penerjemah Indonesia ↔ Inggris offline
   Berbasis kamus kata dan frasa, bukan mesin statistik.
   Kata yang tidak ada di kamus dikembalikan apa adanya dan
   ditandai, supaya kelihatan bagian mana yang belum dikenali.

   Tidak ada permintaan jaringan. Tidak menyentuh materi atau
   soal Bahasa Indonesia.
   ========================================================= */
(function () {
  'use strict';

  const input = document.getElementById('transInput');
  const out = document.getElementById('transOut');
  if (!input || !out) return;

  /* ---------- kamus Indonesia → Inggris ---------- */
  const KAMUS = {
    aku: 'i', saya: 'i', kamu: 'you', anda: 'you', dia: 'he', kami: 'we', kita: 'we',
    mereka: 'they', ini: 'this', itu: 'that', sini: 'here', situ: 'there',
    dan: 'and', atau: 'or', tetapi: 'but', tapi: 'but', karena: 'because',
    kalau: 'if', jika: 'if', supaya: 'so', agar: 'so', dengan: 'with',
    tanpa: 'without', untuk: 'for', dari: 'from', ke: 'to', di: 'in', pada: 'on',
    tentang: 'about', setelah: 'after', sebelum: 'before', ketika: 'when',
    saat: 'when', sambil: 'while', sampai: 'until', sejak: 'since',
    sekarang: 'now', nanti: 'later', tadi: 'earlier', besok: 'tomorrow',
    kemarin: 'yesterday', hari: 'day', minggu: 'week', bulan: 'month',
    tahun: 'year', jam: 'hour', menit: 'minute', detik: 'second',
    pagi: 'morning', siang: 'noon', sore: 'afternoon', malam: 'night',
    waktu: 'time', tanggal: 'date', pukul: 'o clock',
    rumah: 'house', sekolah: 'school', kelas: 'class', guru: 'teacher',
    murid: 'student', siswa: 'student', teman: 'friend', keluarga: 'family',
    ibu: 'mother', ayah: 'father', kakak: 'older sibling', adik: 'younger sibling',
    anak: 'child', orang: 'person', nama: 'name', alamat: 'address',
    kota: 'city', desa: 'village', jalan: 'street', pasar: 'market',
    toko: 'shop', uang: 'money', harga: 'price', buku: 'book', pena: 'pen',
    pensil: 'pencil', kertas: 'paper', meja: 'table', kursi: 'chair',
    pintu: 'door', jendela: 'window', kamar: 'room', dapur: 'kitchen',
    papan: 'board', tas: 'bag', sepatu: 'shoes', baju: 'clothes',
    makanan: 'food', minuman: 'drink', air: 'water', nasi: 'rice',
    roti: 'bread', susu: 'milk', teh: 'tea', kopi: 'coffee', gula: 'sugar',
    garam: 'salt', buah: 'fruit', sayur: 'vegetable', ayam: 'chicken',
    ikan: 'fish', telur: 'egg', daging: 'meat', sup: 'soup',
    makan: 'eat', minum: 'drink', tidur: 'sleep', bangun: 'wake up',
    duduk: 'sit', berdiri: 'stand', berjalan: 'walk', berlari: 'run',
    pergi: 'go', datang: 'come', pulang: 'go home', masuk: 'enter',
    keluar: 'exit', buka: 'open', tutup: 'close', baca: 'read',
    tulis: 'write', dengar: 'listen', lihat: 'see', bicara: 'speak',
    kata: 'say', tanya: 'ask', jawab: 'answer', belajar: 'study',
    ajar: 'teach', kerja: 'work', main: 'play', bantu: 'help',
    beli: 'buy', jual: 'sell', beri: 'give', ambil: 'take',
    buat: 'make', pakai: 'use', cari: 'search', temukan: 'find',
    tahu: 'know', paham: 'understand', ingat: 'remember', lupa: 'forget',
    suka: 'like', cinta: 'love', benci: 'hate', ingin: 'want',
    perlu: 'need', harus: 'must', bisa: 'can', boleh: 'may',
    tidak: 'not', bukan: 'not', ya: 'yes', sangat: 'very', sekali: 'very',
    banyak: 'many', sedikit: 'few', semua: 'all', setiap: 'every',
    besar: 'big', kecil: 'small', panjang: 'long', pendek: 'short',
    tinggi: 'tall', rendah: 'low', cepat: 'fast', lambat: 'slow',
    mudah: 'easy', sulit: 'difficult', susah: 'difficult', benar: 'true',
    salah: 'wrong', baik: 'good', buruk: 'bad', baru: 'new', lama: 'old',
    muda: 'young', tua: 'old', panas: 'hot', dingin: 'cold', hangat: 'warm',
    bersih: 'clean', kotor: 'dirty', mahal: 'expensive', murah: 'cheap',
    senang: 'happy', sedih: 'sad', marah: 'angry', takut: 'afraid',
    lelah: 'tired', lapar: 'hungry', haus: 'thirsty', sakit: 'sick',
    sehat: 'healthy', kuat: 'strong', lemah: 'weak', indah: 'beautiful',
    ramah: 'friendly', rajin: 'diligent', malas: 'lazy', pintar: 'smart',
    penting: 'important', umum: 'general', khusus: 'special',
    kalimat: 'sentence', bahasa: 'language', arti: 'meaning',
    matematika: 'mathematics', inggris: 'english', indonesia: 'indonesia',
    sains: 'science', olahraga: 'sport', seni: 'art',
    terjemahan: 'translation', cerita: 'story', berita: 'news',
    surat: 'letter', angka: 'number', hitung: 'count', jumlah: 'total',
    tambah: 'add', kurang: 'subtract', bagi: 'divide', kali: 'times',
    sama: 'same', berbeda: 'different', hasil: 'result', soal: 'question',
    ujian: 'exam', nilai: 'score', tugas: 'task', papan_tulis: 'blackboard',
    alat: 'tool', mesin: 'machine', komputer: 'computer', telepon: 'phone',
    internet: 'internet', dunia: 'world', negara: 'country', pulau: 'island',
    gunung: 'mountain', laut: 'sea', sungai: 'river', hutan: 'forest',
    langit: 'sky', matahari: 'sun', bintang: 'star',
    hujan: 'rain', angin: 'wind', awan: 'cloud', api: 'fire',
    tanah: 'ground', pohon: 'tree', bunga: 'flower', daun: 'leaf',
    hewan: 'animal', kucing: 'cat', anjing: 'dog', burung: 'bird',
    kuda: 'horse', sapi: 'cow', kambing: 'goat', ikan_: 'fish',
    pelajaran: 'lesson', materi: 'material', bab: 'chapter',
    contoh: 'example', latihan: 'practice', pembahasan: 'explanation',
    rumus: 'formula', bilangan: 'number', pecahan: 'fraction',
    persamaan: 'equation', fungsi: 'function', sudut: 'angle',
    segitiga: 'triangle', lingkaran: 'circle', bangun: 'shape',
    data: 'data', peluang: 'probability', rata: 'average',
    teks: 'text', paragraf: 'paragraph', ide: 'idea', pokok: 'main',
    makna: 'meaning', penulis: 'writer', pembaca: 'reader',
    majas: 'figure of speech', puisi: 'poem', pantun: 'rhyme',
    fakta: 'fact', opini: 'opinion', alasan: 'reason', bukti: 'evidence',
    simpulan: 'conclusion', pendapat: 'opinion', argumen: 'argument',
    moral: 'moral', tokoh: 'character', latar: 'setting',
    amanat: 'message', tema: 'theme', judul: 'title'
  };

  /* kata Inggris yang tidak muncul dari kamus di atas */
  const EN_EXTRA = {
    the: 'itu', a: 'sebuah', an: 'sebuah', is: 'adalah', are: 'adalah',
    am: 'adalah', was: 'adalah', were: 'adalah', be: 'menjadi',
    been: 'telah', being: 'sedang', have: 'memiliki', has: 'memiliki',
    had: 'memiliki', do: 'melakukan', does: 'melakukan', did: 'melakukan',
    will: 'akan', would: 'akan', shall: 'akan', should: 'seharusnya',
    can: 'bisa', could: 'bisa', may: 'boleh', might: 'mungkin',
    must: 'harus', not: 'tidak', no: 'tidak', yes: 'ya',
    my: 'milikku', your: 'milikmu', his: 'miliknya', her: 'miliknya',
    our: 'milik kami', their: 'milik mereka', its: 'miliknya',
    me: 'aku', him: 'dia', them: 'mereka', us: 'kami',
    these: 'ini', those: 'itu', there: 'di sana', here: 'di sini',
    what: 'apa', who: 'siapa', where: 'di mana', why: 'mengapa',
    how: 'bagaimana', which: 'yang mana', when: 'kapan',
    because: 'karena', if: 'jika', with: 'dengan', without: 'tanpa',
    for: 'untuk', from: 'dari', to: 'ke', in: 'di', on: 'pada',
    at: 'di', by: 'oleh', of: 'dari', about: 'tentang',
    after: 'setelah', before: 'sebelum', while: 'sementara',
    and: 'dan', or: 'atau', but: 'tetapi', so: 'jadi',
    all: 'semua', some: 'beberapa', any: 'apa saja', many: 'banyak',
    much: 'banyak', more: 'lebih', most: 'paling', very: 'sangat',
    also: 'juga', too: 'juga', only: 'hanya', just: 'baru saja',
    again: 'lagi', still: 'masih', already: 'sudah', always: 'selalu',
    never: 'tidak pernah', often: 'sering', sometimes: 'kadang',
    today: 'hari ini', tomorrow: 'besok', yesterday: 'kemarin',
    now: 'sekarang', then: 'lalu', please: 'tolong', sorry: 'maaf',
    thank: 'terima kasih', thanks: 'terima kasih', hello: 'halo',
    goodbye: 'selamat tinggal', school: 'sekolah', teacher: 'guru',
    student: 'siswa', friend: 'teman', book: 'buku', question: 'pertanyaan',
    answer: 'jawaban', lesson: 'pelajaran', homework: 'pekerjaan rumah',
    study: 'belajar', read: 'membaca', write: 'menulis', speak: 'berbicara',
    listen: 'mendengar', understand: 'memahami', know: 'tahu',
    want: 'ingin', need: 'butuh', like: 'suka', help: 'membantu',
    make: 'membuat', use: 'menggunakan', find: 'menemukan', buy: 'membeli',
    eat: 'makan', drink: 'minum', sleep: 'tidur', walk: 'berjalan',
    run: 'berlari', go: 'pergi', come: 'datang', open: 'membuka',
    close: 'menutup', happy: 'senang', sad: 'sedih', good: 'baik',
    bad: 'buruk', big: 'besar', small: 'kecil', easy: 'mudah',
    difficult: 'sulit', important: 'penting', beautiful: 'indah',
    mother: 'ibu', father: 'ayah', family: 'keluarga',
    house: 'rumah', water: 'air', food: 'makanan', time: 'waktu',
    day: 'hari', week: 'minggu', month: 'bulan', year: 'tahun'
  };

  /* ---------- frasa ---------- */
  const FRASA = {
    'bahasa inggris': 'english',
    'bahasa indonesia': 'indonesian',
    'terima kasih': 'thank you',
    'terima kasih banyak': 'thank you very much',
    'sama sama': 'you are welcome',
    'selamat pagi': 'good morning',
    'selamat siang': 'good afternoon',
    'selamat sore': 'good afternoon',
    'selamat malam': 'good evening',
    'selamat tinggal': 'goodbye',
    'selamat datang': 'welcome',
    'selamat ulang tahun': 'happy birthday',
    'selamat tahun baru': 'happy new year',
    'apa kabar': 'how are you',
    'nama saya': 'my name is',
    'siapa namamu': 'what is your name',
    'sampai jumpa': 'see you',
    'permisi': 'excuse me',
    'berapa harga': 'how much',
    'saya tidak tahu': 'i do not know',
    'saya tidak mengerti': 'i do not understand',
    'saya mengerti': 'i understand',
    'di mana': 'where is',
    'jam berapa': 'what time',
    'hari ini': 'today',
    'kemarin': 'yesterday',
    'pelan pelan': 'slowly',
    'hati hati': 'be careful',
    'semoga berhasil': 'good luck',
    'sekali lagi': 'once more',
    'tidak apa apa': 'never mind'
  };

  const BALIK = {};
  const FRASA_EN = {};

  Object.keys(KAMUS).forEach(k => {
    const v = KAMUS[k];
    if (!(v in BALIK)) BALIK[v] = k.replace(/_$/, '');
  });
  Object.keys(EN_EXTRA).forEach(k => {
    if (!(k in BALIK)) BALIK[k] = EN_EXTRA[k];
  });
  Object.keys(FRASA).forEach(k => {
    const v = FRASA[k];
    if (!(v in FRASA_EN)) FRASA_EN[v] = k;
  });

  /* ---------- akar kata ---------- */
  const AWALAN = ['memper', 'member', 'meng', 'meny', 'mem', 'men', 'me',
    'pember', 'peng', 'peny', 'pen', 'pem', 'per', 'ber', 'ter', 'di', 'ke', 'se'];
  const AKHIRAN = ['kannya', 'annya', 'kan', 'nya', 'lah', 'kah', 'an', 'i'];

  function akarId(kata) {
    for (const pre of AWALAN) {
      if (kata.indexOf(pre) !== 0) continue;
      let sisa = kata.slice(pre.length);
      for (const suf of AKHIRAN) {
        if (sisa.length > suf.length && sisa.slice(-suf.length) === suf) {
          const calon = sisa.slice(0, -suf.length);
          if (KAMUS[calon]) return calon;
        }
      }
      if (KAMUS[sisa]) return sisa;
      if (/^[aiueo]/.test(sisa)) {
        for (const huruf of ['t', 'p', 's', 'k', 'b']) {
          if (KAMUS[huruf + sisa]) return huruf + sisa;
        }
      }
    }
    for (const suf of AKHIRAN) {
      if (kata.length > suf.length + 2 && kata.slice(-suf.length) === suf) {
        const calon = kata.slice(0, -suf.length);
        if (KAMUS[calon]) return calon;
      }
    }
    return null;
  }

  function akarEn(kata) {
    const coba = [];
    if (/ies$/.test(kata)) coba.push(kata.slice(0, -3) + 'y');
    if (/ied$/.test(kata)) coba.push(kata.slice(0, -3) + 'y');
    coba.push(kata.replace(/ing$/, ''), kata.replace(/ed$/, ''),
      kata.replace(/ly$/, ''), kata.replace(/es$/, ''), kata.replace(/s$/, ''));
    for (const c of coba) {
      if (c && BALIK[c]) return c;
      if (c && /(.)\1$/.test(c) && BALIK[c.slice(0, -1)]) return c.slice(0, -1);
    }
    return null;
  }

  function padanan(kata, arah) {
    const k = kata.toLowerCase();
    if (arah === 'id-en') {
      if (KAMUS[k]) return KAMUS[k];
      const akar = akarId(k);
      return akar ? KAMUS[akar] : null;
    }
    if (BALIK[k]) return BALIK[k];
    const akar = akarEn(k);
    return akar ? BALIK[akar] : null;
  }

  /* ---------- penerjemahan ---------- */
  const POLA = /[A-Za-zÀ-ÿ]+(?:['’][A-Za-zÀ-ÿ]+)?|[^A-Za-zÀ-ÿ]+/g;
  const hurufBesar = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const escape = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function kamusArah(arah) {
    return arah === 'id-en' ? FRASA : FRASA_EN;
  }

  function terjemah(teks, arah) {
    const token = teks.match(POLA) || [];
    const frasa = kamusArah(arah);
    const kunciFrasa = Object.keys(frasa).sort((a, b) => b.split(' ').length - a.split(' ').length);
    const hasil = [];
    let diterjemah = 0;
    const asing = [];

    let i = 0;
    while (i < token.length) {
      if (!/^[A-Za-zÀ-ÿ]/.test(token[i])) { hasil.push(token[i]); i += 1; continue; }

      let cocok = null;
      for (const f of kunciFrasa) {
        const bagian = f.split(' ');
        const potong = [];
        let j = i;
        let ok = true;
        for (let b = 0; b < bagian.length; b += 1) {
          if (b > 0) {
            if (token[j] !== ' ') { ok = false; break; }
            j += 1;
          }
          if (!token[j] || token[j].toLowerCase() !== bagian[b]) { ok = false; break; }
          potong.push(token[j]);
          j += 1;
        }
        if (ok) { cocok = { teks: frasa[f], akhir: j }; break; }
      }

      if (cocok) {
        hasil.push(/^[A-Z]/.test(token[i]) ? hurufBesar(cocok.teks) : cocok.teks);
        diterjemah += 1;
        i = cocok.akhir;
        continue;
      }

      const kata = token[i];
      const arti = padanan(kata, arah);
      if (arti) {
        hasil.push(/^[A-Z]/.test(kata) ? hurufBesar(arti) : arti);
        diterjemah += 1;
      } else {
        if (asing.indexOf(kata.toLowerCase()) < 0) asing.push(kata.toLowerCase());
        hasil.push('<mark class="trans__unknown" title="' + escape(kata) + '">' + escape(kata) + '</mark>');
      }
      i += 1;
    }

    return { html: hasil.join(''), polos: hasil.join('').replace(/<[^>]+>/g, ''), diterjemah, asing };
  }

  /* ---------- UI ---------- */
  const state = { arah: 'id-en' };
  const LABEL = {
    'id-en': { masuk: 'Bahasa Indonesia', keluar: 'Bahasa Inggris', contoh: 'Tulis kata, frasa, atau kalimat…' },
    'en-id': { masuk: 'Bahasa Inggris', keluar: 'Bahasa Indonesia', contoh: 'Type a word, phrase, or sentence…' }
  };

  const labelMasuk = document.querySelector('[data-label-input]');
  const labelKeluar = document.querySelector('[data-label-output]');
  const catatan = document.querySelector('[data-catatan]');
  const infoAsing = document.querySelector('[data-unknown]');
  const tombolSalin = document.querySelector('[data-salin]');
  let teksPolos = '';

  function pasangArah() {
    const l = LABEL[state.arah];
    labelMasuk.textContent = l.masuk;
    labelKeluar.textContent = l.keluar;
    input.placeholder = l.contoh;
    document.querySelectorAll('[data-arah]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.arah === state.arah);
    });
  }

  function jalan() {
    const teks = input.value.trim();
    if (!teks) {
      out.innerHTML = '<span class="trans__ph">Hasil terjemahan muncul di sini.</span>';
      catatan.textContent = '';
      infoAsing.textContent = 'Kata di luar kamus tetap ditampilkan apa adanya dengan tanda. Hover tanda itu untuk melihat aslinya.';
      teksPolos = '';
      return;
    }
    const r = terjemah(teks, state.arah);
    out.innerHTML = r.html;
    teksPolos = r.polos;
    catatan.textContent = r.diterjemah + ' bagian diterjemahkan';
    infoAsing.textContent = r.asing.length
      ? 'Belum ada di kamus: ' + r.asing.slice(0, 8).join(', ') + (r.asing.length > 8 ? ', dan ' + (r.asing.length - 8) + ' lainnya.' : '.')
      : 'Semua kata dikenali kamus.';
  }

  pasangArah();
  jalan();

  document.querySelectorAll('[data-arah]').forEach(b => b.addEventListener('click', () => {
    if (state.arah === b.dataset.arah) return;
    state.arah = b.dataset.arah;
    pasangArah();
    jalan();
  }));

  document.querySelector('[data-terjemah]').addEventListener('click', jalan);

  const tombolTukar = document.querySelector('[data-tukar]');
  tombolTukar.addEventListener('click', () => {
    state.arah = state.arah === 'id-en' ? 'en-id' : 'id-en';
    input.value = teksPolos || input.value;
    pasangArah();
    jalan();
  });

  document.querySelector('[data-hapus]').addEventListener('click', () => {
    input.value = '';
    input.focus();
    jalan();
  });

  document.querySelectorAll('[data-contoh]').forEach(b => b.addEventListener('click', () => {
    input.value = b.dataset.contoh;
    if (state.arah !== 'id-en') { state.arah = 'id-en'; pasangArah(); }
    jalan();
  }));

  tombolSalin.addEventListener('click', async () => {
    if (!teksPolos) return;
    const lama = tombolSalin.textContent;
    try {
      await navigator.clipboard.writeText(teksPolos);
      tombolSalin.textContent = 'Tersalin';
    } catch (e) {
      tombolSalin.textContent = 'Gagal menyalin';
    }
    setTimeout(() => { tombolSalin.textContent = lama; }, 1600);
  });

  let tunda = null;
  input.addEventListener('input', () => {
    clearTimeout(tunda);
    tunda = setTimeout(jalan, 260);
  });

  input.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); jalan(); }
  });

  window.OwlyTerjemah = { terjemah: terjemah, kamus: KAMUS, frasa: FRASA };
})();
