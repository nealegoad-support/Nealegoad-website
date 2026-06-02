/**
 * lightbox.js — Neale Goad Automotive
 * Self-contained image lightbox. No dependencies.
 * Usage: include once anywhere in the page; all .media img and
 *        [data-lightbox] elements are auto-bound.
 */
(function () {
  'use strict';

  if (window.NGA_LB_INIT) return; // guard against double-init
  window.NGA_LB_INIT = true;

  /* ------------------------------------------------------------------ */
  /* CSS INJECTION                                                         */
  /* ------------------------------------------------------------------ */
  (function injectCSS() {
    if (document.getElementById('nga-lb-styles')) return;
    var style = document.createElement('style');
    style.id = 'nga-lb-styles';
    style.textContent = [
      /* ---- Lightbox root ---- */
      '#nga-lightbox{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;}',
      '#nga-lightbox.lb-open{opacity:1;visibility:visible;}',
      /* ---- Overlay ---- */
      '.lb-overlay{position:absolute;inset:0;background:rgba(0,0,0,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);cursor:zoom-out;}',
      /* ---- Stage ---- */
      '.lb-stage{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding:64px 96px 56px;}',
      '@media(max-width:640px){.lb-stage{padding:72px 12px 36px;}}',
      /* ---- Content wrapper ---- */
      '.lb-content{position:relative;display:flex;flex-direction:column;align-items:center;max-width:calc(100vw - 192px);max-height:calc(100vh - 120px);}',
      '@media(max-width:640px){.lb-content{max-width:calc(100vw - 24px);max-height:calc(100vh - 144px);}}',
      /* ---- Image ---- */
      '.lb-img{display:block;max-width:100%;max-height:calc(100vh - 160px);width:auto;height:auto;object-fit:contain;border-radius:10px;box-shadow:0 40px 100px -30px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.06);opacity:0;transform:scale(.94);transition:opacity .38s cubic-bezier(.22,.61,.36,1),transform .38s cubic-bezier(.22,.61,.36,1);}',
      '.lb-img.lb-loaded{opacity:1;transform:scale(1);}',
      '@media(max-width:640px){.lb-img{max-height:calc(100vh - 180px);border-radius:7px;}}',
      /* ---- Spinner ---- */
      '.lb-spinner{width:42px;height:42px;border:3px solid rgba(255,255,255,.1);border-top-color:#FFCD00;border-radius:50%;animation:lb-spin .75s linear infinite;display:none;}',
      '.lb-spinner.active{display:block;}',
      '@keyframes lb-spin{to{transform:rotate(360deg);}}',
      /* ---- Caption ---- */
      '.lb-caption{margin-top:13px;color:rgba(255,255,255,.58);font-family:-apple-system,system-ui,sans-serif;font-size:13.5px;text-align:center;max-width:min(540px,90vw);line-height:1.55;display:none;}',
      '.lb-caption.visible{display:block;}',
      /* ---- Counter ---- */
      '.lb-counter{position:fixed;top:18px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.38);font-family:-apple-system,system-ui,sans-serif;font-size:12px;font-weight:700;letter-spacing:.1em;white-space:nowrap;display:none;}',
      '.lb-counter.visible{display:block;}',
      /* ---- Buttons ---- */
      '.lb-btn{border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:50%;color:#fff;transition:background .2s,border-color .2s,transform .15s;-webkit-tap-highlight-color:transparent;}',
      '.lb-btn:hover{background:rgba(255,255,255,.18);border-color:rgba(255,255,255,.24);}',
      '.lb-btn:active{transform:scale(.9)!important;}',
      '.lb-btn:focus-visible{outline:2.5px solid #FFCD00;outline-offset:3px;}',
      '.lb-btn:disabled{opacity:.18;cursor:default;pointer-events:none;}',
      /* ---- Close ---- */
      '.lb-close{position:fixed;top:14px;right:14px;width:44px;height:44px;}',
      '.lb-close svg{width:20px;height:20px;}',
      /* ---- Prev / Next ---- */
      '.lb-prev,.lb-next{position:fixed;top:50%;width:52px;height:52px;transform:translateY(-50%);}',
      '.lb-prev{left:14px;} .lb-next{right:14px;}',
      '.lb-prev:hover{transform:translateY(-50%) translateX(-2px);}',
      '.lb-next:hover{transform:translateY(-50%) translateX(2px);}',
      '.lb-prev svg,.lb-next svg{width:22px;height:22px;}',
      '@media(max-width:640px){.lb-prev{left:8px;width:42px;height:42px;} .lb-next{right:8px;width:42px;height:42px;} .lb-prev svg,.lb-next svg{width:19px;height:19px;}}',
      /* ---- Trigger cursor ---- */
      '[data-lb-trigger]{cursor:zoom-in;}',
      /* ---- Swipe hint fade ---- */
      '.lb-swipe-hint{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.28);font-family:-apple-system,system-ui,sans-serif;font-size:12px;letter-spacing:.06em;display:none;pointer-events:none;}',
      '@media(max-width:640px){.lb-swipe-hint{display:block;}}',
    ].join('');
    (document.head || document.documentElement).appendChild(style);
  }());

  /* ------------------------------------------------------------------ */
  /* BUILD DOM                                                             */
  /* ------------------------------------------------------------------ */
  var lb      = null;
  var lbImg   = null;
  var lbSpin  = null;
  var lbCap   = null;
  var lbCnt   = null;
  var lbPrev  = null;
  var lbNext  = null;

  var CLOSE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var PREV_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
  var NEXT_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

  function buildDOM() {
    if (lb) return;
    lb = document.createElement('div');
    lb.id = 'nga-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML =
      '<div class="lb-overlay" id="lb-ov"></div>' +
      '<div class="lb-stage">' +
        '<div class="lb-content">' +
          '<img class="lb-img" id="lb-img" src="" alt="" />' +
          '<div class="lb-spinner" id="lb-spin"></div>' +
          '<div class="lb-caption" id="lb-cap"></div>' +
        '</div>' +
      '</div>' +
      '<button class="lb-btn lb-close" id="lb-close" aria-label="Close image viewer">' + CLOSE_SVG + '</button>' +
      '<button class="lb-btn lb-prev" id="lb-prev" aria-label="Previous image">' + PREV_SVG + '</button>' +
      '<button class="lb-btn lb-next" id="lb-next" aria-label="Next image">' + NEXT_SVG + '</button>' +
      '<div class="lb-counter" id="lb-cnt"></div>' +
      '<div class="lb-swipe-hint">← swipe →</div>';

    document.body.appendChild(lb);

    lbImg  = document.getElementById('lb-img');
    lbSpin = document.getElementById('lb-spin');
    lbCap  = document.getElementById('lb-cap');
    lbCnt  = document.getElementById('lb-cnt');
    lbPrev = document.getElementById('lb-prev');
    lbNext = document.getElementById('lb-next');

    /* Overlay click → close */
    document.getElementById('lb-ov').addEventListener('click', closeLB);
    /* Stop image click from closing */
    lbImg.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  /* ------------------------------------------------------------------ */
  /* STATE                                                                 */
  /* ------------------------------------------------------------------ */
  var currentGroup = [];
  var currentIndex = 0;
  var prevFocus    = null;
  var touchStartX  = 0;

  /* ------------------------------------------------------------------ */
  /* OPEN / CLOSE                                                          */
  /* ------------------------------------------------------------------ */
  function openLB(group, idx) {
    buildDOM();
    currentGroup = group;
    currentIndex = idx;
    prevFocus = document.activeElement;

    showImage(idx);

    lb.classList.add('lb-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    /* Focus close button after transition begins */
    setTimeout(function () {
      var closeBtn = document.getElementById('lb-close');
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  function closeLB() {
    if (!lb) return;
    lb.classList.remove('lb-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    /* Clean up image to prevent flash on next open */
    setTimeout(function () {
      if (lbImg) { lbImg.classList.remove('lb-loaded'); }
    }, 320);

    if (prevFocus && prevFocus.focus) prevFocus.focus();
  }

  function showImage(idx) {
    if (idx < 0 || idx >= currentGroup.length) return;
    currentIndex = idx;

    var item = currentGroup[idx];

    /* Reset image state */
    lbImg.classList.remove('lb-loaded');
    lbImg.src = '';
    lbImg.alt = item.alt || '';
    lbSpin.classList.add('active');

    /* Caption */
    if (item.caption) {
      lbCap.textContent = item.caption;
      lbCap.classList.add('visible');
    } else {
      lbCap.textContent = '';
      lbCap.classList.remove('visible');
    }

    /* Counter */
    if (currentGroup.length > 1) {
      lbCnt.textContent = (idx + 1) + ' / ' + currentGroup.length;
      lbCnt.classList.add('visible');
    } else {
      lbCnt.textContent = '';
      lbCnt.classList.remove('visible');
    }

    /* Prev / Next visibility */
    var showNav = currentGroup.length > 1;
    lbPrev.style.display = showNav ? 'flex' : 'none';
    lbNext.style.display = showNav ? 'flex' : 'none';
    lbPrev.disabled = (idx === 0);
    lbNext.disabled = (idx === currentGroup.length - 1);

    /* Load image */
    var tmpImg = new Image();
    tmpImg.onload = function () {
      lbImg.src = item.src;
      lbSpin.classList.remove('active');
      /* Trigger CSS transition on next frame */
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          lbImg.classList.add('lb-loaded');
        });
      });
    };
    tmpImg.onerror = function () {
      lbSpin.classList.remove('active');
      lbImg.alt = 'Image could not be loaded';
    };
    tmpImg.src = item.src;
  }

  function navigate(dir) {
    var newIdx = currentIndex + dir;
    if (newIdx < 0 || newIdx >= currentGroup.length) return;
    showImage(newIdx);
  }

  /* ------------------------------------------------------------------ */
  /* IMAGE DISCOVERY                                                        */
  /* ------------------------------------------------------------------ */
  var SELECTORS = [
    '.media img[src]:not([src=""])',
    '.sp-hero-media img[src]:not([src=""])',
    '.article-hero img[src]:not([src=""])',
    '.article-hero .phimg[src]:not([src=""])',
    '.bp-card-media img[src]:not([src=""])',
    '.bp-featured-media img[src]:not([src=""])',
    'img[data-lightbox]',
  ].join(',');

  var GALLERY_SELECTORS = '.gallery, .sp-hero-grid, article, .article-body';

  function getCaption(imgEl) {
    var media = imgEl.closest('.media');
    if (media) {
      var cap = media.querySelector('.media-cap, .sp-media-cap');
      if (cap) return cap.textContent.trim();
    }
    return imgEl.getAttribute('data-caption') || imgEl.title || '';
  }

  function buildGroups() {
    var imgs = Array.from(document.querySelectorAll(SELECTORS));
    var groupMap = new Map();

    imgs.forEach(function (img) {
      if (!img.src || img.src === window.location.href || img.getAttribute('data-lb-skip')) return;

      /* Find gallery parent */
      var container = null;
      var galParents = document.querySelectorAll(GALLERY_SELECTORS);
      galParents.forEach(function (gp) {
        if (!container && gp.contains(img)) container = gp;
      });

      /* Fall back to direct parent media/section for pairing */
      if (!container) {
        container = img.closest('.media, section, .sp-hero') || img;
      }

      if (!groupMap.has(container)) groupMap.set(container, []);
      groupMap.get(container).push({
        src:     img.src,
        alt:     img.alt || '',
        caption: getCaption(img),
        el:      img,
      });
    });

    return groupMap;
  }

  function bindImages() {
    var groups = buildGroups();

    groups.forEach(function (items) {
      items.forEach(function (item, idx) {
        var trigger = item.el.closest('.media') || item.el.closest('[data-lightbox]') || item.el;

        if (trigger.dataset.lbBound === '1') return;
        trigger.dataset.lbBound = '1';
        trigger.setAttribute('data-lb-trigger', '');
        trigger.setAttribute('tabindex', trigger.getAttribute('tabindex') || '0');
        trigger.setAttribute('role', trigger.getAttribute('role') || 'button');
        trigger.setAttribute('aria-label', 'View image' + (item.caption ? ': ' + item.caption : ''));

        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          openLB(items, idx);
        });

        trigger.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLB(items, idx);
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* KEYBOARD + SWIPE                                                       */
  /* ------------------------------------------------------------------ */
  document.addEventListener('keydown', function (e) {
    if (!lb || !lb.classList.contains('lb-open')) return;

    switch (e.key) {
      case 'Escape':    e.preventDefault(); closeLB();       break;
      case 'ArrowLeft': e.preventDefault(); navigate(-1);    break;
      case 'ArrowRight':e.preventDefault(); navigate(1);     break;
      case 'Tab': {
        /* Focus trap */
        var focusable = Array.from(lb.querySelectorAll('button:not(:disabled)'));
        if (!focusable.length) return;
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
        }
        break;
      }
    }
  });

  document.addEventListener('touchstart', function (e) {
    if (!lb || !lb.classList.contains('lb-open')) return;
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (!lb || !lb.classList.contains('lb-open')) return;
    var dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) navigate(dx > 0 ? 1 : -1);
  }, { passive: true });

  /* Close / nav button clicks (event delegation on document) */
  document.addEventListener('click', function (e) {
    if (!lb || !lb.classList.contains('lb-open')) return;
    if (e.target.closest('#lb-close')) { closeLB(); return; }
    if (e.target.closest('#lb-prev'))  { navigate(-1); return; }
    if (e.target.closest('#lb-next'))  { navigate(1);  return; }
  });

  /* ------------------------------------------------------------------ */
  /* MUTATION OBSERVER (React SPA route changes)                           */
  /* ------------------------------------------------------------------ */
  function watchForNewImages() {
    if (!window.MutationObserver) return;
    var debounce = null;
    var observer = new MutationObserver(function () {
      clearTimeout(debounce);
      debounce = setTimeout(bindImages, 200);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ------------------------------------------------------------------ */
  /* INIT                                                                   */
  /* ------------------------------------------------------------------ */
  function init() {
    buildDOM();
    bindImages();
    watchForNewImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Public API */
  window.NGA_LB = {
    open:   openLB,
    close:  closeLB,
    rebind: bindImages,
  };

}());
