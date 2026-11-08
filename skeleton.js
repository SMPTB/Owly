/* =========================================================
   skeleton.js — penanda "sedang memuat".
   Dipakai kalau ada bagian halaman yang menunggu data, supaya
   isinya tidak tiba-tiba muncul dan menggeser tata letak.

   Cara pakai:
     OwlySkeleton.show(el);              // tampilkan di dalam el
     OwlySkeleton.hide(el);              // hapus
     OwlySkeleton.when(el, promise);     // tampil selama promise jalan

   Pilihan: { variant: 'lines' | 'pill' | 'block', delay: 180 }
   Bentuknya bisa juga ditentukan lewat atribut data-sk di elemen.
   ========================================================= */
(function () {
  'use strict';

  // Jangan berkedip untuk sesuatu yang selesai seketika: skeleton baru
  // muncul kalau penantiannya melewati batas ini.
  var DEFAULT_DELAY = 180;
  var timers = new WeakMap();

  function reduceMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function make(variant) {
    var wrap = document.createElement('div');
    wrap.className = 'sk sk--' + variant;
    wrap.setAttribute('aria-hidden', 'true');

    if (variant === 'pill') {
      var pill = document.createElement('span');
      pill.className = 'sk__pill';
      wrap.appendChild(pill);
      return wrap;
    }

    if (variant === 'block') {
      var block = document.createElement('span');
      block.className = 'sk__block';
      wrap.appendChild(block);
      return wrap;
    }

    // default: tiga baris teks, makin pendek ke bawah
    for (var i = 0; i < 3; i++) {
      var line = document.createElement('span');
      line.className = 'sk__line';
      line.style.width = i === 2 ? '58%' : i === 1 ? '86%' : '100%';
      wrap.appendChild(line);
    }
    return wrap;
  }

  function overlayOf(el) {
    for (var i = 0; i < el.children.length; i++) {
      if (el.children[i].classList && el.children[i].classList.contains('sk')) return el.children[i];
    }
    return null;
  }

  function show(el, opts) {
    if (!el) return;
    opts = opts || {};
    hide(el);

    var variant = opts.variant || el.getAttribute('data-sk') || 'lines';
    var delay = opts.delay == null ? DEFAULT_DELAY : opts.delay;

    var timer = setTimeout(function () {
      timers.delete(el);
      if (!el.isConnected) return;
      var overlay = make(variant);
      if (reduceMotion()) overlay.classList.add('sk--still');
      el.classList.add('sk-host');
      el.setAttribute('aria-busy', 'true');
      el.appendChild(overlay);
    }, Math.max(0, delay));

    timers.set(el, timer);
  }

  function hide(el) {
    if (!el) return;
    var timer = timers.get(el);
    if (timer) {
      clearTimeout(timer);
      timers.delete(el);
    }
    var overlay = overlayOf(el);
    if (overlay) overlay.remove();
    el.classList.remove('sk-host');
    el.removeAttribute('aria-busy');
  }

  function when(el, promise, opts) {
    show(el, opts);
    return Promise.resolve(promise).then(function (value) {
      hide(el);
      return value;
    }, function (error) {
      hide(el);
      throw error;
    });
  }

  window.OwlySkeleton = { show: show, hide: hide, when: when };
})();
