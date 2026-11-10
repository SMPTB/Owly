/* =========================================================
   belajar.js — menampilkan satu bab materi (belajar.html?bab=mtk-1)
   Isi materi ada di materi.js. Tanda "sudah dibaca" disimpan di
   perangkat lewat progress.js (Owly.markRead).

   Materi Matematika punya versi Inggris di materi-en.js. Saat sakelar
   bahasa ada di EN, bab Matematika ditampilkan dari versi itu. Bab
   Bahasa Indonesia selalu tampil apa adanya.
   ========================================================= */
(function () {
  'use strict';

  const MATERI = window.MATERI || [];
  const EN = window.MATERI_EN || {};
  const O = window.Owly;
  const $ = id => document.getElementById(id);
  const LETTER = 'ABCDEFGH';
  const icon = n => '<svg class="icon"><use href="#' + n + '"/></svg>';

  const babId = new URLSearchParams(location.search).get('bab');
  const idx = MATERI.findIndex(b => b.id === babId);
  if (idx < 0) { location.replace('materi.html'); return; }

  const TEKS = {
    id: {
      materi: 'Materi', contoh: 'Contoh soal', langkah: 'Lihat langkah penyelesaian',
      jawaban: 'Jawaban:', tugas: 'Tugas', tandai: 'Tandai selesai dibaca',
      sudah: '✓ Sudah dibaca (klik untuk batal)', penutup: 'Penutup', rangkuman: 'Rangkuman',
      latihan: 'Latihan soal bab ini', berikut: 'Bab berikutnya', toc: 'Di halaman ini',
      dari: 'dari', dibaca: 'materi dibaca', subj: { mtk: 'Matematika', ind: 'Bahasa Indonesia' }
    },
    en: {
      materi: 'Lesson', contoh: 'Worked example', langkah: 'Show the working',
      jawaban: 'Answer:', tugas: 'Task', tandai: 'Mark as read',
      sudah: '✓ Read (click to undo)', penutup: 'Wrap-up', rangkuman: 'Summary',
      latihan: 'Practise this chapter', berikut: 'Next chapter', toc: 'On this page',
      dari: 'of', dibaca: 'sections read', subj: { mtk: 'Mathematics', ind: 'Bahasa Indonesia' }
    }
  };

  function bahasaAktif() {
    try { return localStorage.getItem('owly-bahasa-v1') === 'en' ? 'en' : 'id'; } catch (e) { return 'id'; }
  }

  /* Bab versi Inggris hanya dipakai untuk Matematika. */
  function babPakai(b, bahasa) {
    const terjemahan = b.subject === 'mtk' && bahasa === 'en' ? EN[b.id] : null;
    if (!terjemahan) return b;
    return {
      id: b.id,
      subject: b.subject,
      no: b.no,
      bab: terjemahan.bab || b.bab,
      intro: terjemahan.intro || b.intro,
      goals: terjemahan.goals || b.goals,
      summary: terjemahan.summary || b.summary,
      lessons: b.lessons.map(l => {
        const t = terjemahan.lessons && terjemahan.lessons[l.id];
        return t ? Object.assign({}, l, { title: t.title || l.title, blocks: t.blocks || l.blocks }) : l;
      })
    };
  }

  let bahasa = 'id';
  let T = TEKS.id;
  let bab = MATERI[idx];

  /* ---------- Satu block -> HTML ---------- */
  function block(b) {
    switch (b[0]) {
      case 'h':    return '<h3>' + b[1] + '</h3>';
      case 'p':    return '<p>' + b[1] + '</p>';
      case 'ul':   return '<ul>' + b[1].map(i => '<li>' + i + '</li>').join('') + '</ul>';
      case 'ol':   return '<ol>' + b[1].map(i => '<li>' + i + '</li>').join('') + '</ol>';
      case 'note': return '<aside class="callout callout--note"><b>' + b[1] + '</b><p>' + b[2] + '</p></aside>';
      case 'warn': return '<aside class="callout callout--warn"><b>' + b[1] + '</b><p>' + b[2] + '</p></aside>';
      case 'text': return '<figure class="sample"><figcaption>' + b[1] + '</figcaption><p>' + b[2] + '</p></figure>';
      case 'table':
        return '<div class="ltable"><table><thead><tr>' + b[1].map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
          b[2].map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
      /* Widget interaktif: gambar & logikanya dipasang oleh interaktif.js */
      case 'graph': {
        const c = b[1] || {};
        return '<figure class="inter" data-widget="graph" data-a="' + (c.a != null ? c.a : 2) +
          '" data-b="' + (c.b != null ? c.b : 1) + '" data-x="' + (c.x != null ? c.x : 1) +
          '" data-p="' + (c.p != null ? c.p : 0) + '" data-q="' + (c.q != null ? c.q : 0) + '"></figure>';
      }
      /* Minigame diagram panah: hubungkan setiap anggota daerah asal ke f(x). */
      case 'panah': {
        const c = b[1] || {};
        return '<figure class="inter" data-widget="panah" data-fungsi="' +
          (c.fungsi || 'tambah') + '"></figure>';
      }
      /* Dua sudut berpelurus: geser sudut kiri, sudut kanan ikut menyesuaikan. */
      case 'sudut': {
        const c = b[1] || {};
        return '<figure class="inter" data-widget="sudut" data-a="' + (c.a != null ? c.a : 55) + '"></figure>';
      }
      case 'net': {
        const c = b[1] || {};
        return '<figure class="inter" data-widget="net" data-shape="' + (c.shape || 'kubus') + '"></figure>';
      }
      /* Paragraf untuk widget ide pokok: dikirim sebagai JSON di dalam figure,
         jadi tanda kutip dan tag di dalam kalimat tidak perlu di-escape. */
      case 'sorot':
        return '<figure class="inter" data-widget="sorot"><script type="application/json">' +
          JSON.stringify(b[1] || {}).replace(/</g, '\\u003c') + '</script></figure>';
      /* Dua widget peluang: dadu (percobaan vs teoretis) dan mesin capit
         (peluang berubah karena tanpa pengembalian). */
      case 'dadu':
        const d = b[1] || {};
        return '<figure class="inter" data-widget="dadu" data-mata="' + (d.mata || 6) + '">' +
          (d.note ? '<p class="dadu__note">' + d.note + '</p>' : '') +
        '</figure>';
      /* Roda putar peluang: delapan sektor sama besar untuk membandingkan
         peluang teoretis dengan hasil percobaan. */
      case 'roulette': {
        return '<figure class="inter" data-widget="roulette"></figure>';
      }
      case 'capit':
        return '<figure class="inter" data-widget="capit"><script type="application/json">' +
          JSON.stringify(b[1] || {}).replace(/</g, '\\u003c') + '</script></figure>';
      /* Penggeser barisan: pilih pola, geser posisi suku, ubah beda/rasio. */
      case 'barisan': {
        const c = b[1] || {};
        return '<figure class="inter" data-widget="barisan" data-jenis="' + (c.jenis || 'aritmetika') +
          '" data-a="' + (c.a != null ? c.a : 3) + '" data-b="' + (c.b != null ? c.b : 4) +
          '" data-n="' + (c.n != null ? c.n : 6) + '"></figure>';
      }
      case 'ex':
        return '<div class="example"><span class="example__label">' + T.contoh + '</span><p class="example__q">' + b[1] + '</p>' +
          '<details><summary>' + T.langkah + '</summary><ol>' + b[2].map(s => '<li>' + s + '</li>').join('') + '</ol>' +
          '<p class="example__a"><b>' + T.jawaban + '</b> ' + b[3] + '</p></details></div>';
      case 'task':
        return '<div class="task"><span class="task__label">' + T.tugas + '</span><b>' + b[1] + '</b><ol>' + b[2].map(q => '<li>' + q + '</li>').join('') + '</ol></div>';
      default: return '';
    }
  }

  function gambar() {
    bahasa = bahasaAktif();
    T = TEKS[bahasa];
    bab = babPakai(MATERI[idx], bahasa);

    /* ---------- Kepala halaman ---------- */
    document.title = bab.bab + ' · Ωwly';
    $('crumbLast').textContent = bab.bab;
    $('lhSubject').textContent = T.subj[bab.subject];
    $('lhNo').textContent = 'BAB ' + bab.no;
    $('lhTitle').textContent = bab.bab;
    $('lhIntro').textContent = bab.intro;
    $('lhGoals').innerHTML = bab.goals.map(g => '<li>' + g + '</li>').join('');

    /* ---------- Isi bab ---------- */
    const practice = 'kerjakan.html?mode=alpha&subject=' + bab.subject + '&topic=' + encodeURIComponent(bab.bab);
    $('lessons').innerHTML = bab.lessons.map((l, i) =>
      '<article class="lesson" id="L-' + l.id + '">' +
        '<span class="lesson__tag">' + T.materi + ' ' + LETTER[i] + '</span>' +
        '<h2>' + l.title + '</h2>' +
        l.blocks.map(block).join('') +
        '<div class="lesson__foot"><button type="button" class="btn-act" data-read="' + l.id + '"><span>' + T.tandai + '</span></button></div>' +
      '</article>'
    ).join('') +
    '<article class="lesson lesson--summary" id="L-rangkuman">' +
      '<span class="lesson__tag">' + T.penutup + '</span><h2>' + T.rangkuman + '</h2>' +
      '<ul>' + bab.summary.map(s => '<li>' + s + '</li>').join('') + '</ul>' +
      '<div class="lesson__foot">' +
        '<a class="btn-act btn-act--red" href="' + practice + '"><span>' + T.latihan + '</span>' + icon('arrow-right') + '</a>' +
        (idx < MATERI.length - 1 ? '<a class="btn-act" href="belajar.html?bab=' + MATERI[idx + 1].id + '"><span>' + T.berikut + '</span>' + icon('chev-right') + '</a>' : '') +
      '</div>' +
    '</article>';

    /* ---------- Daftar isi (kanan) ---------- */
    function renderToc() {
      const read = O ? O.readMap() : {};
      const done = bab.lessons.filter(l => read[l.id]).length;
      const pct = Math.round(done / bab.lessons.length * 100);
      $('toc').innerHTML =
        '<h3>' + T.toc + '</h3>' +
        '<div class="bar bar--5"><i style="width:' + pct + '%"></i></div>' +
        '<p class="toc__meta">' + done + ' ' + T.dari + ' ' + bab.lessons.length + ' ' + T.dibaca + '</p>' +
        '<ol class="toc__list">' + bab.lessons.map((l, i) =>
          '<li class="' + (read[l.id] ? 'is-done' : '') + '"><a href="#L-' + l.id + '"><span class="toc__mark">' +
          (read[l.id] ? icon('check') : LETTER[i]) + '</span><span>' + l.title + '</span></a></li>').join('') +
          '<li><a href="#L-rangkuman"><span class="toc__mark">★</span><span>' + T.rangkuman + '</span></a></li></ol>' +
        '<a class="btn-act btn-act--red" href="' + practice + '"><span>' + T.latihan + '</span>' + icon('arrow-right') + '</a>';

      document.querySelectorAll('[data-read]').forEach(btn => {
        const r = !!read[btn.dataset.read];
        btn.classList.toggle('is-read', r);
        btn.querySelector('span').textContent = r ? T.sudah : T.tandai;
      });
    }

    $('lessons').onclick = e => {
      const b = e.target.closest('[data-read]');
      if (!b || !O) return;
      O.markRead(b.dataset.read, !O.readMap()[b.dataset.read], bab.subject + '|' + bab.bab);
      renderToc();
    };
    window.onstorage = renderToc;

    renderToc();
    if (location.hash && $(location.hash.slice(1))) $(location.hash.slice(1)).scrollIntoView();
  }

  gambar();

  /* Sakelar bahasa menggambar ulang isi bab, termasuk saat diganti dari tab lain. */
  document.addEventListener('owly-bahasa', gambar);
  window.addEventListener('storage', e => {
    if (e.key === 'owly-bahasa-v1') gambar();
  });
})();
