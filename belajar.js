/* =========================================================
   belajar.js — menampilkan satu bab materi (belajar.html?bab=mtk-1)
   Isi materi ada di materi.js. Tanda "sudah dibaca" disimpan di
   perangkat lewat progress.js (Owly.markRead).
   ========================================================= */
(function () {
  'use strict';

  const MATERI = window.MATERI || [];
  const O = window.Owly;
  const $ = id => document.getElementById(id);
  const SUBJ = { mtk: 'Matematika', ind: 'Bahasa Indonesia' };
  const LETTER = 'ABCDEFGH';
  const icon = n => '<svg class="icon"><use href="#' + n + '"/></svg>';

  const id = new URLSearchParams(location.search).get('bab');
  const idx = MATERI.findIndex(b => b.id === id);
  if (idx < 0) { location.replace('materi.html'); return; }
  const bab = MATERI[idx];

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
          '" data-b="' + (c.b != null ? c.b : 1) + '" data-x="' + (c.x != null ? c.x : 1) + '"></figure>';
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
        return '<figure class="inter" data-widget="dadu" data-mata="' + ((b[1] && b[1].mata) || 6) + '"></figure>';
      case 'capit':
        return '<figure class="inter" data-widget="capit"><script type="application/json">' +
          JSON.stringify(b[1] || {}).replace(/</g, '\\u003c') + '</script></figure>';
      case 'ex':
        return '<div class="example"><span class="example__label">Contoh soal</span><p class="example__q">' + b[1] + '</p>' +
          '<details><summary>Lihat langkah penyelesaian</summary><ol>' + b[2].map(s => '<li>' + s + '</li>').join('') + '</ol>' +
          '<p class="example__a"><b>Jawaban:</b> ' + b[3] + '</p></details></div>';
      case 'task':
        return '<div class="task"><span class="task__label">Tugas</span><b>' + b[1] + '</b><ol>' + b[2].map(q => '<li>' + q + '</li>').join('') + '</ol></div>';
      default: return '';
    }
  }

  /* ---------- Kepala halaman ---------- */
  document.title = bab.bab + ' · Ωwly';
  $('crumbLast').textContent = bab.bab;
  $('lhSubject').textContent = SUBJ[bab.subject];
  $('lhNo').textContent = 'BAB ' + bab.no;
  $('lhTitle').textContent = bab.bab;
  $('lhIntro').textContent = bab.intro;
  $('lhGoals').innerHTML = bab.goals.map(g => '<li>' + g + '</li>').join('');

  /* ---------- Isi bab ---------- */
  const practice = 'bank-soal.html?subject=' + bab.subject + '&topic=' + encodeURIComponent(bab.bab);
  $('lessons').innerHTML = bab.lessons.map((l, i) =>
    '<article class="lesson" id="L-' + l.id + '">' +
      '<span class="lesson__tag">Materi ' + LETTER[i] + '</span>' +
      '<h2>' + l.title + '</h2>' +
      l.blocks.map(block).join('') +
      '<div class="lesson__foot"><button type="button" class="btn-act" data-read="' + l.id + '"><span>Tandai selesai dibaca</span></button></div>' +
    '</article>'
  ).join('') +
  '<article class="lesson lesson--summary" id="L-rangkuman">' +
    '<span class="lesson__tag">Penutup</span><h2>Rangkuman</h2>' +
    '<ul>' + bab.summary.map(s => '<li>' + s + '</li>').join('') + '</ul>' +
    '<div class="lesson__foot">' +
      '<a class="btn-act btn-act--red" href="' + practice + '"><span>Latihan soal bab ini</span>' + icon('arrow-right') + '</a>' +
      (idx < MATERI.length - 1 ? '<a class="btn-act" href="belajar.html?bab=' + MATERI[idx + 1].id + '"><span>Bab berikutnya</span>' + icon('chev-right') + '</a>' : '') +
    '</div>' +
  '</article>';

  /* ---------- Daftar isi (kanan) ---------- */
  function renderToc() {
    const read = O ? O.readMap() : {};
    const done = bab.lessons.filter(l => read[l.id]).length;
    const pct = Math.round(done / bab.lessons.length * 100);
    $('toc').innerHTML =
      '<h3>Di halaman ini</h3>' +
      '<div class="bar bar--5"><i style="width:' + pct + '%"></i></div>' +
      '<p class="toc__meta">' + done + ' dari ' + bab.lessons.length + ' materi dibaca</p>' +
      '<ol class="toc__list">' + bab.lessons.map((l, i) =>
        '<li class="' + (read[l.id] ? 'is-done' : '') + '"><a href="#L-' + l.id + '"><span class="toc__mark">' +
        (read[l.id] ? icon('check') : LETTER[i]) + '</span><span>' + l.title + '</span></a></li>').join('') +
        '<li><a href="#L-rangkuman"><span class="toc__mark">★</span><span>Rangkuman</span></a></li></ol>' +
      '<a class="btn-act btn-act--red" href="' + practice + '"><span>Latihan soal bab ini</span>' + icon('arrow-right') + '</a>';

    document.querySelectorAll('[data-read]').forEach(btn => {
      const r = !!read[btn.dataset.read];
      btn.classList.toggle('is-read', r);
      btn.querySelector('span').textContent = r ? '✓ Sudah dibaca (klik untuk batal)' : 'Tandai selesai dibaca';
    });
  }

  $('lessons').addEventListener('click', e => {
    const b = e.target.closest('[data-read]');
    if (!b || !O) return;
    O.markRead(b.dataset.read, !O.readMap()[b.dataset.read], bab.subject + '|' + bab.bab);
    renderToc();
  });
  window.addEventListener('storage', renderToc);

  renderToc();
  if (location.hash && $(location.hash.slice(1))) $(location.hash.slice(1)).scrollIntoView();
})();
