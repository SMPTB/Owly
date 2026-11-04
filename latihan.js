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
    omega: { letter: 'ω', kind: 'OMEGA', title: 'Latihan interaktif' }
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
    lab.hidden = false;
    render();
    if (lab.scrollIntoView) lab.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function switchMode(mode) {
    if (!MODES[mode]) return;
    state.mode = mode;
    if (mode === 'alpha') alpha = null;
    if (mode === 'delta') delta = null;
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
     4. OMEGA — kegiatan interaktif
     Isi pantun ditulis di sini; dua kegiatan lain memakai widget
     dari interaktif.js (diagram panah dan dua sudut berpelurus).
     ========================================================= */
  const STASIUN = [
    { id: 'pantun', letter: '✎', title: 'Isi pantun', sub: 'Bahasa Indonesia · rima dan isi', teks: 'Satu baris hilang. Pilih baris yang rimanya nyambung dan isinya masih satu jalan.' },
    { id: 'panah', letter: '→', title: 'Pasangkan domain dan kodomain', sub: 'Matematika · relasi dan fungsi', teks: 'Hubungkan tiap anggota A ke pasangannya di B, lalu periksa apakah relasinya fungsi.' },
    { id: 'sudut', letter: '∠', title: 'Dua sudut berpelurus', sub: 'Matematika · geometri', teks: 'Geser sudut kiri, lihat sudut kanan ikut menyesuaikan sampai jumlahnya tetap 180°.' }
  ];

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

  let pantun = null;

  function renderOmega() {
    if (!state.opts.station) {
      body.innerHTML =
        '<div class="omega">' +
          '<p class="omega__intro">Pilih satu kegiatan dulu.</p>' +
          STASIUN.map(s =>
            '<button class="omega__row" type="button" data-station="' + s.id + '">' +
              '<span class="omega__letter" aria-hidden="true">' + s.letter + '</span>' +
              '<span class="omega__info"><b>' + s.title + '</b><span>' + s.sub + '</span><span class="omega__teks">' + s.teks + '</span></span>' +
              icon('chev-right') +
            '</button>').join('') +
        '</div>';

      body.querySelectorAll('[data-station]').forEach(b =>
        b.addEventListener('click', () => { state.opts = { station: b.dataset.station }; render(); }));
      return;
    }

    body.innerHTML =
      '<div class="omega">' +
        '<button class="link-btn omega__back" type="button" data-omega-back>← Semua kegiatan</button>' +
        '<div class="omega__stage" data-stage></div>' +
      '</div>';

    el('[data-omega-back]').addEventListener('click', () => { state.opts = {}; render(); });

    if (state.opts.station === 'pantun') {
      pantun = { i: 0, selesai: 0 };
      renderPantun();
    } else {
      mountStasiun(state.opts.station);
    }
  }

  /* Widget dari interaktif.js dipasang setelah HTML-nya disisipkan */
  function mountStasiun(id) {
    const stage = el('[data-stage]');
    stage.innerHTML = id === 'panah'
      ? '<figure class="inter" data-widget="panah" data-fungsi="tambah"></figure>'
      : '<figure class="inter" data-widget="sudut" data-a="55"></figure>';

    if (window.OwlyInteraktif && window.OwlyInteraktif.mountAll) {
      window.OwlyInteraktif.mountAll(stage);
    } else {
      stage.insertAdjacentHTML('beforeend',
        '<p class="omega__note">Kegiatan ini butuh interaktif.js. Kamu masih bisa mencobanya di halaman materi.</p>');
    }
  }

  /* ---------- Isi pantun ---------- */
  function renderPantun() {
    const p = PANTUN[pantun.i];
    const stage = el('[data-stage]');

    stage.innerHTML =
      '<div class="pantun">' +
        '<div class="pantun__top"><span>Pantun ' + (pantun.i + 1) + ' dari ' + PANTUN.length + '</span><span>Rima a–b–a–b</span></div>' +
        '<p class="pantun__hint">Satu baris hilang. Pilih yang bunyi akhirnya sama dengan baris kedua dan isinya masih nyambung.</p>' +
        '<div class="pantun__sheet">' + p.baris.map((b, i) =>
          '<p class="pantun__line' + (b === null ? ' is-blank' : '') + '" data-line="' + i + '">' +
            '<i aria-hidden="true">' + p.rima[i] + '</i>' +
            '<span data-slot>' + (b === null ? '<em>baris yang hilang</em>' : b) + '</span>' +
          '</p>').join('') +
        '</div>' +
        '<div class="pantun__opts" data-pilhan>' + p.pilihan.map((o, i) =>
          '<button class="pantun__opt" type="button" data-pil="' + i + '">' + o + '</button>').join('') +
        '</div>' +
        '<div class="pantun__res" data-pres></div>' +
      '</div>';

    el('[data-pilhan]').addEventListener('click', e => {
      const b = e.target.closest('[data-pil]');
      if (!b || b.disabled) return;
      pilihPantun(parseInt(b.dataset.pil, 10));
    });
  }

  function pilihPantun(pilih) {
    const p = PANTUN[pantun.i];
    const res = el('[data-pres]');

    if (pilih !== p.jawab) {
      el('[data-pil="' + pilih + '"]').classList.add('is-no');
      res.className = 'pantun__res is-no';
      res.innerHTML = '<b>Belum pas.</b> Baris keempat harus bunyi akhirnya sama kayak baris kedua (“' +
        kataAkhir(p.baris[1]) + '”), yaitu “' + bunyiAkhir(p.baris[1]) + '”. Coba lagi.';
      return;
    }

    el('[data-pilhan]').querySelectorAll('[data-pil]').forEach(b => { b.disabled = true; });
    el('[data-pil="' + pilih + '"]').classList.add('is-ok');

    const slot = body.querySelector('.pantun__line.is-blank');
    slot.classList.remove('is-blank');
    slot.classList.add('is-filled');
    slot.querySelector('[data-slot]').textContent = p.pilihan[p.jawab];
    pantun.selesai++;

    res.className = 'pantun__res is-ok';
    res.innerHTML = '<b>Tepat.</b> ' + p.alasan +
      '<div class="pantun__foot"><button class="btn-act btn-act--red" type="button" data-pantun-next><span>' +
      (pantun.i + 1 < PANTUN.length ? 'Pantun berikutnya' : 'Lihat hasil') + '</span>' + icon('arrow-right') + '</button></div>';

    el('[data-pantun-next]').addEventListener('click', () => {
      if (pantun.i + 1 < PANTUN.length) {
        pantun.i++;
        renderPantun();
      } else {
        selesaiPantun();
      }
    });
  }

  function selesaiPantun() {
    el('[data-stage]').innerHTML =
      '<div class="quiz quiz--done">' +
        '<span class="quiz__badge">' + pantun.selesai + ' / ' + PANTUN.length + '</span>' +
        '<h3>Rima dan isi sama-sama penting.</h3>' +
        '<p>Pantun rimanya a–b–a–b. Baris ketiga nyambung sama baris pertama, baris keempat sama baris kedua. Isinya juga harus nyambung.</p>' +
        '<div class="quiz__foot">' +
          '<button class="btn-act btn-act--red" type="button" data-pantun-ulang><span>Ulangi pantun</span>' + icon('arrow-right') + '</button>' +
          '<button class="btn-act" type="button" data-omega-back2><span>Kegiatan lain</span>' + icon('chev-right') + '</button>' +
        '</div>' +
      '</div>';

    el('[data-pantun-ulang]').addEventListener('click', () => { pantun = { i: 0, selesai: 0 }; renderPantun(); });
    el('[data-omega-back2]').addEventListener('click', () => { state.opts = {}; render(); });
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

  window.OwlyLatihan = { open: open, switchMode: switchMode };
})();
