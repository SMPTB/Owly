/* =========================================================
   latihan.js — tiga cara latihan di halaman Latihan Soal
     · Alpha (α) — pilihan ganda: pilih jawaban, langsung dibahas.
     · Delta (δ) — flashcard: balik kartu, tandai yang sudah paham.
     · Omega (ω) — kegiatan interaktif: isi pantun, pasangkan
                   domain–kodomain, geser dua sudut berpelurus.
   Semua berjalan di halaman ini. Bank Soal tetap ada untuk
   menjelajahi seluruh koleksi soal.
   ========================================================= */
(function () {
  'use strict';

  const SOAL = window.SOAL || [];
  const O = window.Owly || { recordAnswer() {} };
  const SUBJ = { mtk: 'Matematika', ind: 'Bahasa Indonesia' };
  const LETTERS = ['A', 'B', 'C', 'D', 'E'];
  const ALPHA_SIZE = 5;

  const lab = document.getElementById('lab');
  const body = document.getElementById('labBody');
  const tabs = Array.prototype.slice.call(document.querySelectorAll('.lab__tabs [data-mode]'));
  if (!lab || !body || !SOAL.length) return;

  const icon = n => '<svg class="icon"><use href="#' + n + '"/></svg>';
  const el = sel => body.querySelector(sel);
  const plain = html => String(html || '')
    .replace(/<sup>(.*?)<\/sup>/g, '^$1')
    .replace(/<sub>(.*?)<\/sub>/g, '_$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const kataAkhir = s => (String(s).trim().split(/\s+/).pop() || '').toLowerCase();
  const bunyiAkhir = s => kataAkhir(s).slice(-1);

  const MODES = {
    alpha: { letter: 'α', kind: 'ALPHA', title: 'Pilihan ganda' },
    delta: { letter: 'δ', kind: 'DELTA', title: 'Flashcard' },
    omega: { letter: 'ω', kind: 'OMEGA', title: 'Campuran acak' }
  };

  const state = { mode: 'alpha', opts: {} };

  /* =========================================================
     1. KERANGKA: buka panel, ganti tab, tutup
     ========================================================= */
  function open(mode, opts) {
    state.mode = MODES[mode] ? mode : 'alpha';
    state.opts = opts || {};
    if (state.mode === 'alpha') alpha = null;
    if (state.mode === 'delta') delta = null;
    if (state.mode === 'omega') sesi = null;
    lab.hidden = false;
    render();
    if (lab.scrollIntoView) lab.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function switchMode(mode) {
    if (!MODES[mode]) return;
    state.mode = mode;
    if (mode === 'alpha') alpha = null;
    if (mode === 'delta') delta = null;
    if (mode === 'omega') sesi = null;
    render();
  }

  function render() {
    const m = MODES[state.mode];
    document.querySelector('[data-lab-letter]').textContent = m.letter;
    document.querySelector('[data-lab-kind]').textContent = m.kind;
    document.querySelector('[data-lab-title]').textContent = m.title;
    tabs.forEach(t => {
      const on = t.dataset.mode === state.mode;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    body.innerHTML = '';
    if (state.mode === 'alpha') renderAlpha();
    else if (state.mode === 'delta') renderDelta();
    else renderOmega();
  }

  /* =========================================================
     2. ALPHA — pilihan ganda
     ========================================================= */
  let alpha = null;

  function alphaPool(subject, topic) {
    return SOAL.filter(q => q.type === 'pg' &&
      (!subject || q.subject === subject) &&
      (!topic || q.bab === topic));
  }

  function startAlpha(opts) {
    opts = opts || {};
    const pool = alphaPool(opts.subject, opts.topic);
    const list = pool.length ? pool : alphaPool();
    let awal = opts.question ? list.findIndex(q => q.id === opts.question) : 0;
    if (awal < 0) awal = 0;
    const soal = [];
    for (let i = 0; i < Math.min(ALPHA_SIZE, list.length); i++) soal.push(list[(awal + i) % list.length]);
    alpha = { list: soal, i: 0, benar: 0, dijawab: false };
  }

  function renderAlpha() {
    if (!alpha) startAlpha(state.opts);
    const q = alpha.list[alpha.i];
    const n = alpha.list.length;

    body.innerHTML =
      '<div class="quiz">' +
        '<div class="quiz__top"><span>Soal ' + (alpha.i + 1) + ' dari ' + n + '</span>' +
          '<span>' + SUBJ[q.subject] + ' · ' + q.bab + ' · ' + q.level + '</span></div>' +
        '<div class="quiz__card">' +
          (q.stimulus ? '<div class="quiz__stimulus">' + q.stimulus + '</div>' : '') +
          '<p class="quiz__q">' + q.question + '</p>' +
          '<div class="quiz__opts" data-opts>' + q.options.map((o, i) =>
            '<button class="opt" type="button" data-opt="' + i + '"><b>' + LETTERS[i] + '</b><span>' + o + '</span></button>').join('') +
          '</div>' +
          '<p class="quiz__hint">Pilih satu. Pembahasannya langsung muncul.</p>' +
          '<div class="quiz__res" data-res></div>' +
          '<div class="quiz__foot" data-foot></div>' +
        '</div>' +
        '<div class="quiz__dots">' + alpha.list.map((_, i) =>
          '<i class="' + (i < alpha.i ? 'is-done' : i === alpha.i ? 'is-now' : '') + '"></i>').join('') + '</div>' +
      '</div>';

    el('[data-opts]').addEventListener('click', e => {
      const b = e.target.closest('[data-opt]');
      if (!b || alpha.dijawab) return;
      jawabAlpha(parseInt(b.dataset.opt, 10));
    });
  }

  function jawabAlpha(pilih) {
    const q = alpha.list[alpha.i];
    const tepat = pilih === q.answer;
    alpha.dijawab = true;
    if (tepat) alpha.benar++;
    if (O.recordAnswer) O.recordAnswer(q.id, tepat);

    body.querySelectorAll('[data-opt]').forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('is-ok');
      if (i === pilih && !tepat) b.classList.add('is-no');
      if (i === pilih) b.setAttribute('aria-pressed', 'true');
    });

    const res = el('[data-res]');
    res.className = 'quiz__res is-' + (tepat ? 'ok' : 'no');
    res.innerHTML = '<b>' + (tepat ? 'Tepat.' : 'Belum tepat.') + '</b><p>' + q.explain + '</p>';

    el('[data-foot]').innerHTML =
      '<button class="btn-act btn-act--red" type="button" data-next><span>' +
        (alpha.i + 1 < alpha.list.length ? 'Soal berikutnya' : 'Lihat hasil') + '</span>' + icon('arrow-right') + '</button>';

    el('[data-next]').addEventListener('click', () => {
      if (alpha.i + 1 < alpha.list.length) {
        alpha.i++;
        alpha.dijawab = false;
        renderAlpha();
      } else {
        hasilAlpha();
      }
    });
  }

  function hasilAlpha() {
    const n = alpha.list.length, b = alpha.benar;
    const pct = Math.round(b / n * 100);
    const judul = b === n ? 'Semua tepat!' : b > n / 2 ? 'Sudah lumayan.' : 'Masih bisa naik.';
    body.innerHTML =
      '<div class="quiz quiz--done">' +
        '<span class="quiz__badge">' + b + ' / ' + n + '</span>' +
        '<h3>' + judul + '</h3>' +
        '<p>Benar ' + b + ' dari ' + n + ' soal (' + pct + '%). ' +
          (b === n ? 'Kalau mau, ulang pakai Delta biar alasannya juga nempel.'
                   : 'Baca ulang pembahasannya, lalu coba lagi pelan-pelan di Delta.') + '</p>' +
        '<div class="quiz__foot">' +
          '<button class="btn-act btn-act--red" type="button" data-ulang><span>Ulangi Alpha</span>' + icon('arrow-right') + '</button>' +
          '<button class="btn-act" type="button" data-mode-jump="delta"><span>Coba Delta</span>' + icon('chev-right') + '</button>' +
          '<a class="btn-act" href="bank-soal.html"><span>Buka bank soal</span>' + icon('library-big') + '</a>' +
        '</div>' +
      '</div>';

    el('[data-ulang]').addEventListener('click', () => { startAlpha(state.opts); renderAlpha(); });
    el('[data-mode-jump]').addEventListener('click', e => switchMode(e.currentTarget.dataset.modeJump));
  }

  /* =========================================================
     3. DELTA — flashcard
     ========================================================= */
  let delta = null;

  function startDelta(subject) {
    const deck = SOAL.filter(q => !subject || q.subject === subject).slice();
    delta = { deck: deck, i: 0, open: false, paham: 0, total: deck.length };
  }

  /* Jawaban ringkas untuk sisi belakang kartu */
  function jawaban(q) {
    if (q.type === 'pg') return LETTERS[q.answer] + '. ' + q.options[q.answer];
    if (q.type === 'multi') return q.answer.map(i => LETTERS[i]).join(', ') + ' — ' + q.answer.map(i => q.options[i]).join('; ');
    if (q.type === 'table') return q.rows.map(r => q.cols[r.a] + ': ' + plain(r.t)).join(' · ');
    return '';
  }

  function renderDelta() {
    if (!delta) startDelta(state.opts.subject);
    const q = delta.deck[delta.i];
    if (!q) return selesaiDelta();

    body.innerHTML =
      '<div class="flash">' +
        '<div class="flash__top"><span>Kartu ' + (delta.i + 1) + ' dari ' + delta.deck.length + '</span>' +
          '<span>' + SUBJ[q.subject] + ' · ' + q.bab + '</span></div>' +
        '<button class="flash__card' + (delta.open ? ' is-open' : '') + '" type="button" data-flip>' +
          '<span class="flash__label">' + (delta.open ? 'Pembahasan' : 'Pertanyaan') + '</span>' +
          '<span class="flash__text">' +
            (delta.open
              ? q.explain + '<em class="flash__ans">Jawaban: ' + jawaban(q) + '</em>'
              : (q.stimulus ? plain(q.stimulus) + ' ' : '') + q.question) +
          '</span>' +
          '<span class="flash__tip">' + (delta.open ? 'Klik untuk kembali ke pertanyaan' : 'Klik kartu untuk melihat jawaban') + '</span>' +
        '</button>' +
        '<div class="flash__foot">' +
          '<button class="btn-act" type="button" data-again><span>Ulangi nanti</span></button>' +
          '<button class="btn-act btn-act--red" type="button" data-know><span>Sudah paham</span>' + icon('arrow-right') + '</button>' +
        '</div>' +
      '</div>';

    el('[data-flip]').addEventListener('click', () => { delta.open = !delta.open; renderDelta(); });
    el('[data-know]').addEventListener('click', () => { delta.paham++; majuDelta(); });
    el('[data-again]').addEventListener('click', () => {
      delta.deck.push(delta.deck.splice(delta.i, 1)[0]);
      majuDelta();
    });
  }

  function majuDelta() {
    delta.i++;
    delta.open = false;
    if (delta.i >= delta.deck.length) selesaiDelta();
    else renderDelta();
  }

  function selesaiDelta() {
    const total = delta.total, paham = delta.paham;
    body.innerHTML =
      '<div class="quiz quiz--done">' +
        '<span class="quiz__badge">' + paham + ' / ' + total + '</span>' +
        '<h3>Satu putaran selesai.</h3>' +
        '<p>' + paham + ' dari ' + total + ' kartu kamu tandai sudah paham. Kartu yang tadi kamu ulang sudah ikut lewat.</p>' +
        '<div class="quiz__foot">' +
          '<button class="btn-act btn-act--red" type="button" data-ulang><span>Ulangi Delta</span>' + icon('arrow-right') + '</button>' +
          '<button class="btn-act" type="button" data-mode-jump="alpha"><span>Coba Alpha</span>' + icon('chev-right') + '</button>' +
          '<a class="btn-act" href="bank-soal.html"><span>Buka bank soal</span>' + icon('library-big') + '</a>' +
        '</div>' +
      '</div>';

    el('[data-ulang]').addEventListener('click', () => { startDelta(state.opts.subject); renderDelta(); });
    el('[data-mode-jump]').addEventListener('click', e => switchMode(e.currentTarget.dataset.modeJump));
  }

  /* =========================================================
     4. OMEGA — campuran acak
     Tiap kali dibuka, Omega menyusun enam bagian dari tujuh
     jenis kegiatan: pilihan ganda, flashcard, isi pantun,
     timbangan bruto–netto, dua toko diskon, diagram panah, dan
     sudut berpelurus. Urutannya diacak dan jenis boleh muncul
     lagi, asal tidak dua kali berturut-turut.
     ========================================================= */
  const PANTUN = [
    {
      baris: ['Pergi ke pasar membeli bayam', 'Bayam dimasak bersama tahu', 'Rajin-rajinlah belajar malam', null],
      rima: ['a', 'b', 'a', 'b'],
      pilihan: ['Agar kelak menjadi orang berilmu', 'Agar kelak menjadi orang yang pandai', 'Karena belajar membuat kita lelah'],
      jawab: 0,
      alasan: 'Baris keempat nyambung sama baris kedua, jadi bunyi akhirnya harus “u”. “tahu” dan “berilmu” dua-duanya berakhir “u”, dan isinya masih lanjutin ajakan belajar di baris ketiga.'
    },
    {
      baris: ['Pohon mangga tumbuh di halaman', 'Buahnya manis berwarna jingga', 'Belajarlah dengan penuh kesabaran', null],
      rima: ['a', 'b', 'a', 'b'],
      pilihan: ['Agar cepat sampai di tujuan', 'Agar masa depanmu bahagia', 'Tanpa perlu berusaha keras'],
      jawab: 1,
      alasan: '“jingga” di baris kedua berakhir “a”, jadi baris keempat juga harus “a”. “bahagia” pas, dan isinya masih nyambung sama ajakan sabar di baris ketiga.'
    },
    {
      baris: ['Burung pipit terbang ke utara', 'Hinggap sebentar di dahan randu', 'Hormati selalu kedua orang tua', null],
      rima: ['a', 'b', 'a', 'b'],
      pilihan: ['Agar kelak hidupmu bahagia', 'Supaya kamu dianggap anak baik', 'Doanya mengalir sepanjang waktu'],
      jawab: 2,
      alasan: '“randu” berakhir “u”, jadi baris keempat harus “u” juga. “waktu” cocok, dan isinya masih soal orang tua kayak baris ketiga.'
    }
  ];

  const JENIS = ['pg', 'flash', 'pantun', 'bruto', 'diskon', 'panah', 'sudut'];
  const PANJANG_SESI = 6;
  const namaJenis = {
    pg: 'pilihan ganda', flash: 'flashcard', pantun: 'pantun',
    bruto: 'bruto–netto', diskon: 'diskon', panah: 'diagram panah', sudut: 'sudut berpelurus'
  };

  let sesi = null;

  function acak(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const rp = n => 'Rp' + Math.round(n).toLocaleString('id-ID');

  function susunRencana() {
    const rencana = [];
    while (rencana.length < PANJANG_SESI) {
      const kandidat = JENIS.filter(j => j !== rencana[rencana.length - 1]);
      rencana.push(kandidat[ri(0, kandidat.length - 1)]);
    }
    return rencana;
  }

  function mulaiSesi(paksa) {
    const rencana = paksa && paksa.length ? paksa.slice() : susunRencana();
    sesi = {
      rencana: rencana,
      i: 0,
      benar: 0,
      dinilai: 0,
      antrePg: acak(SOAL.filter(q => q.type === 'pg').map(q => q.id)),
      antreFlash: acak(SOAL.map(q => q.id)),
      antrePantun: acak(PANTUN.map((_, k) => k))
    };
    renderBagian();
  }

  function renderOmega() {
    if (!sesi) mulaiSesi();
    else renderBagian();
  }

  function catat(tepat) {
    sesi.dinilai++;
    if (tepat) sesi.benar++;
    const skor = body.querySelector('[data-skor]');
    if (skor) skor.textContent = sesi.benar + ' / ' + sesi.dinilai + ' benar';
  }

  function tawarkanLanjut(teks) {
    const foot = el('[data-lanjut-foot]');
    if (!foot) return;
    foot.innerHTML = '<button class="btn-act btn-act--red" type="button" data-lanjut><span>' + teks +
      '</span>' + icon('arrow-right') + '</button>';
    foot.querySelector('[data-lanjut]').addEventListener('click', () => {
      sesi.i++;
      renderBagian();
    });
  }

  function renderBagian() {
    if (sesi.i >= sesi.rencana.length) return selesaiSesi();
    const jenis = sesi.rencana[sesi.i];

    body.innerHTML =
      '<div class="omega">' +
        '<div class="omega__top">' +
          '<span>Bagian ' + (sesi.i + 1) + ' / ' + sesi.rencana.length + '</span>' +
          '<span class="omega__dots">' + sesi.rencana.map((_, k) =>
            '<i class="' + (k < sesi.i ? 'is-done' : k === sesi.i ? 'is-now' : '') + '"></i>').join('') + '</span>' +
          '<span data-skor>' + (sesi.dinilai ? sesi.benar + ' / ' + sesi.dinilai + ' benar' : namaJenis[jenis]) + '</span>' +
        '</div>' +
        '<div data-stage></div>' +
        '<div class="omega__foot" data-lanjut-foot></div>' +
      '</div>';

    const stage = el('[data-stage]');
    if (jenis === 'pg') bagianPg(stage);
    else if (jenis === 'flash') bagianFlash(stage);
    else if (jenis === 'pantun') bagianPantun(stage);
    else if (jenis === 'bruto') bagianBruto(stage);
    else if (jenis === 'diskon') bagianDiskon(stage);
    else bagianWidget(stage, jenis);
  }

  /* ---------- Pilihan ganda ---------- */
  function bagianPg(stage) {
    const daftar = SOAL.filter(q => q.type === 'pg');
    const id = sesi.antrePg.length ? sesi.antrePg.shift() : daftar[0].id;
    const q = SOAL.find(x => x.id === id) || daftar[0];

    stage.innerHTML =
      '<div class="quiz">' +
        '<div class="quiz__card">' +
          (q.stimulus ? '<div class="quiz__stimulus">' + q.stimulus + '</div>' : '') +
          '<p class="quiz__q">' + q.question + '</p>' +
          '<div class="quiz__opts" data-opts>' + q.options.map((o, k) =>
            '<button class="opt" type="button" data-opt="' + k + '"><b>' + LETTERS[k] + '</b><span>' + o + '</span></button>').join('') +
          '</div>' +
          '<div class="quiz__res" data-res></div>' +
        '</div>' +
      '</div>';

    stage.querySelector('[data-opts]').addEventListener('click', e => {
      const b = e.target.closest('[data-opt]');
      if (!b || stage.dataset.dijawab) return;
      stage.dataset.dijawab = '1';
      const pilih = parseInt(b.dataset.opt, 10);
      const tepat = pilih === q.answer;
      if (O.recordAnswer) O.recordAnswer(q.id, tepat);

      stage.querySelectorAll('[data-opt]').forEach((x, k) => {
        x.disabled = true;
        if (k === q.answer) x.classList.add('is-ok');
        if (k === pilih && !tepat) x.classList.add('is-no');
      });

      const res = stage.querySelector('[data-res]');
      res.className = 'quiz__res is-' + (tepat ? 'ok' : 'no');
      res.innerHTML = '<b>' + (tepat ? 'Tepat.' : 'Belum tepat.') + '</b><p>' + q.explain + '</p>';
      catat(tepat);
      tawarkanLanjut('Bagian berikutnya');
    });
  }

  /* ---------- Flashcard ---------- */
  function bagianFlash(stage) {
    const id = sesi.antreFlash.length ? sesi.antreFlash.shift() : SOAL[0].id;
    const q = SOAL.find(x => x.id === id) || SOAL[0];
    let terbuka = false;

    const gambar = () => {
      stage.innerHTML =
        '<div class="flash">' +
          '<button class="flash__card' + (terbuka ? ' is-open' : '') + '" type="button" data-flip>' +
            '<span class="flash__label">' + (terbuka ? 'Pembahasan' : 'Pertanyaan') + '</span>' +
            '<span class="flash__text">' +
              (terbuka
                ? q.explain + '<em class="flash__ans">Jawaban: ' + jawaban(q) + '</em>'
                : (q.stimulus ? plain(q.stimulus) + ' ' : '') + q.question) +
            '</span>' +
            '<span class="flash__tip">' + (terbuka ? 'Klik untuk balik lagi' : 'Klik kartu untuk lihat jawaban') + '</span>' +
          '</button>' +
        '</div>';
      stage.querySelector('[data-flip]').addEventListener('click', () => { terbuka = !terbuka; gambar(); });
    };

    gambar();
    tawarkanLanjut('Bagian berikutnya');
  }

  /* ---------- Isi pantun ---------- */
  function bagianPantun(stage) {
    const p = PANTUN[sesi.antrePantun.length ? sesi.antrePantun.shift() : 0];

    stage.innerHTML =
      '<div class="pantun">' +
        '<p class="pantun__hint">Satu baris hilang. Pilih yang bunyi akhirnya sama dengan baris kedua dan isinya masih nyambung.</p>' +
        '<div class="pantun__sheet">' + p.baris.map((b, k) =>
          '<p class="pantun__line' + (b === null ? ' is-blank' : '') + '">' +
            '<i aria-hidden="true">' + p.rima[k] + '</i>' +
            '<span data-slot>' + (b === null ? '<em>baris yang hilang</em>' : b) + '</span>' +
          '</p>').join('') +
        '</div>' +
        '<div class="pantun__opts" data-pilhan>' + p.pilihan.map((o, k) =>
          '<button class="pantun__opt" type="button" data-pil="' + k + '">' + o + '</button>').join('') +
        '</div>' +
        '<div class="pantun__res" data-pres></div>' +
      '</div>';

    stage.querySelector('[data-pilhan]').addEventListener('click', e => {
      const b = e.target.closest('[data-pil]');
      if (!b || b.disabled) return;
      const pilih = parseInt(b.dataset.pil, 10);
      const res = stage.querySelector('[data-pres]');

      if (pilih !== p.jawab) {
        stage.dataset.salah = '1';
        b.classList.add('is-no');
        res.className = 'pantun__res is-no';
        res.innerHTML = '<b>Belum pas.</b> Baris keempat harus berakhir “' + bunyiAkhir(p.baris[1]) +
          '”, sama seperti “' + kataAkhir(p.baris[1]) + '”. Coba lagi.';
        return;
      }

      stage.querySelectorAll('[data-pil]').forEach(x => { x.disabled = true; });
      b.classList.add('is-ok');
      const slot = stage.querySelector('.pantun__line.is-blank');
      slot.classList.remove('is-blank');
      slot.classList.add('is-filled');
      slot.querySelector('[data-slot]').textContent = p.pilihan[p.jawab];

      res.className = 'pantun__res is-ok';
      res.innerHTML = '<b>Tepat.</b> ' + p.alasan;
      catat(!stage.dataset.salah);
      tawarkanLanjut('Bagian berikutnya');
    });
  }

  /* ---------- Timbangan: bruto, netto, tara ---------- */
  function bagianBruto(stage) {
    const tara = ri(2, 8) / 2;
    const netto = ri(8, 30) / 2;
    const bruto = netto + tara;

    stage.innerHTML =
      '<div class="mini">' +
        '<p class="mini__q">Karung beras ini ditimbang <b>' + bruto + ' kg</b>. Karung kosongnya <b>' +
          tara + ' kg</b>. Berapa berat berasnya saja?</p>' +
        '<div class="mini__rows">' +
          '<div class="mini__row"><span>Bruto (isi + karung)</span><b>' + bruto + ' kg</b></div>' +
          '<div class="mini__row"><span>Tara (karung)</span><b>' + tara + ' kg</b></div>' +
          '<div class="mini__row"><span>Netto (isi)</span><b>?</b></div>' +
        '</div>' +
        '<div class="mini__jawab">' +
          '<input class="mini__input" type="number" step="0.5" min="0" inputmode="decimal" placeholder="kg" aria-label="Netto dalam kg" data-jawab>' +
          '<button class="btn-act btn-act--red" type="button" data-cek><span>Cek</span>' + icon('arrow-right') + '</button>' +
        '</div>' +
        '<div class="quiz__res" data-res></div>' +
      '</div>';

    const cek = () => {
      if (stage.dataset.dijawab) return;
      const isi = stage.querySelector('[data-jawab]');
      const nilai = parseFloat(String(isi.value).replace(',', '.'));
      const res = stage.querySelector('[data-res]');
      if (isNaN(nilai)) { isi.focus(); return; }

      if (Math.abs(nilai - netto) > 0.001) {
        stage.dataset.salah = '1';
        res.className = 'quiz__res is-no';
        res.innerHTML = '<b>Belum tepat.</b><p>Netto itu berat isinya saja. Kurangi bruto dengan tara, lalu coba lagi.</p>';
        return;
      }

      stage.dataset.dijawab = '1';
      isi.disabled = true;
      stage.querySelector('[data-cek]').disabled = true;
      res.className = 'quiz__res is-ok';
      res.innerHTML = '<b>Tepat.</b><p>Netto = bruto − tara = ' + bruto + ' − ' + tara + ' = ' + netto +
        ' kg. Tara ' + tara + ' kg itu ' + Math.round(tara / bruto * 100) + '% dari bruto.</p>';
      catat(!stage.dataset.salah);
      tawarkanLanjut('Bagian berikutnya');
    };

    stage.querySelector('[data-cek]').addEventListener('click', cek);
    stage.querySelector('[data-jawab]').addEventListener('keydown', e => { if (e.key === 'Enter') cek(); });
  }

  /* ---------- Dua toko: diskon ---------- */
  function bagianDiskon(stage) {
    const harga = ri(10, 40) * 5000;
    let dA = ri(2, 6) * 10;
    let dB = ri(2, 6) * 10;
    while (dB === dA) dB = ri(2, 6) * 10;

    const akhirA = harga * (100 - dA) / 100;
    const akhirB = harga * (100 - dB) / 100;
    const murah = akhirA < akhirB ? 'a' : 'b';

    stage.innerHTML =
      '<div class="mini">' +
        '<p class="mini__q">Sepatu yang sama harganya <b>' + rp(harga) +
          '</b> di dua toko. Toko mana yang bikin kamu bayar lebih sedikit?</p>' +
        '<div class="mini__pilih">' +
          '<button class="mini__toko" type="button" data-toko="a"><b>Toko A</b><span>Diskon ' + dA + '%</span><span>Harga ' + rp(harga) + '</span></button>' +
          '<button class="mini__toko" type="button" data-toko="b"><b>Toko B</b><span>Diskon ' + dB + '%</span><span>Harga ' + rp(harga) + '</span></button>' +
        '</div>' +
        '<div class="quiz__res" data-res></div>' +
      '</div>';

    stage.querySelectorAll('[data-toko]').forEach(b => b.addEventListener('click', () => {
      if (stage.dataset.dijawab) return;
      stage.dataset.dijawab = '1';
      const pilih = b.dataset.toko;
      const tepat = pilih === murah;

      stage.querySelectorAll('[data-toko]').forEach(x => {
        x.disabled = true;
        if (x.dataset.toko === murah) x.classList.add('is-ok');
        if (x.dataset.toko === pilih && !tepat) x.classList.add('is-no');
      });

      const res = stage.querySelector('[data-res]');
      res.className = 'quiz__res is-' + (tepat ? 'ok' : 'no');
      res.innerHTML = '<b>' + (tepat ? 'Tepat.' : 'Belum tepat.') + '</b><p>Toko A: ' + rp(harga) + ' − ' + dA +
        '% = ' + rp(akhirA) + '. Toko B: ' + rp(harga) + ' − ' + dB + '% = ' + rp(akhirB) +
        '. Yang lebih murah Toko ' + murah.toUpperCase() + ', selisih ' + rp(Math.abs(akhirA - akhirB)) + '.</p>';
      catat(tepat);
      tawarkanLanjut('Bagian berikutnya');
    }));
  }

  /* ---------- Widget dari interaktif.js ---------- */
  function bagianWidget(stage, jenis) {
    stage.innerHTML = jenis === 'panah'
      ? '<div class="mini"><p class="mini__q">Pasangkan tiap anggota A dengan pasangannya di B. Relasi yang semua anggotanya tersambung dan tidak bercabang itu namanya fungsi.</p><figure class="inter" data-widget="panah" data-fungsi="tambah"></figure></div>'
      : '<div class="mini"><p class="mini__q">Geser sudut kirinya. Berapa pun nilainya, dua sudut ini harus berjumlah 180°.</p><figure class="inter" data-widget="sudut" data-a="' + ri(35, 75) + '"></figure></div>';

    if (window.OwlyInteraktif && window.OwlyInteraktif.mountAll) {
      window.OwlyInteraktif.mountAll(stage);
    } else {
      stage.insertAdjacentHTML('beforeend', '<p class="omega__note">Kegiatan ini butuh interaktif.js.</p>');
    }
    tawarkanLanjut('Bagian berikutnya');
  }

  function selesaiSesi() {
    const total = sesi.rencana.length, benar = sesi.benar, dinilai = sesi.dinilai;
    body.innerHTML =
      '<div class="quiz quiz--done">' +
        '<span class="quiz__badge">' + (dinilai ? benar + ' / ' + dinilai : total) + '</span>' +
        '<h3>Campuran selesai.</h3>' +
        '<p>' + total + ' bagian: ' + sesi.rencana.map(j => namaJenis[j]).join(', ') + '. ' +
          (dinilai ? 'Benar ' + benar + ' dari ' + dinilai + ' soal yang dinilai.' : 'Belum ada soal yang dinilai.') +
        '</p>' +
        '<div class="quiz__foot">' +
          '<button class="btn-act btn-act--red" type="button" data-acak><span>Acak campuran baru</span>' + icon('arrow-right') + '</button>' +
          '<button class="btn-act" type="button" data-mode-jump="alpha"><span>Coba Alpha</span>' + icon('chev-right') + '</button>' +
          '<a class="btn-act" href="latihan.html"><span>Kembali ke pilihan</span>' + icon('chev-right') + '</a>' +
        '</div>' +
      '</div>';

    body.querySelector('[data-acak]').addEventListener('click', () => mulaiSesi());
    body.querySelector('[data-mode-jump]').addEventListener('click', () => switchMode('alpha'));
  }

  /* =========================================================
     5. PINTU MASUK
     ========================================================= */
  document.addEventListener('click', e => {
    const modeBtn = e.target.closest('[data-mode]');
    if (modeBtn) {
      open(modeBtn.dataset.mode, {});
      return;
    }
    const alphaBtn = e.target.closest('[data-alpha]');
    if (alphaBtn) {
      e.preventDefault();
      open('alpha', { question: alphaBtn.dataset.alpha });
      return;
    }
    const rec = e.target.closest('[data-rec-link]');
    if (rec) {
      e.preventDefault();
      const m = (rec.getAttribute('href') || '').match(/q=([A-Z]+-\d+)/);
      open('alpha', m ? { question: m[1] } : {});
      return;
    }
    if (e.target.closest('[data-lab-close]')) lab.hidden = true;
  });

  window.OwlyLatihan = {
    open: open,
    switchMode: switchMode,
    omegaMulai: mulaiSesi,
    omegaRencana: () => (sesi ? sesi.rencana.slice() : [])
  };
})();
