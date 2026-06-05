/**
 * nav-shared.js — Neale Goad Automotive
 * Injects the full mega-menu navigation into every standalone service page.
 * Include once at the END of <body>. Requires app/service-pages.css.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* DATA                                                                 */
  /* ------------------------------------------------------------------ */
  var PHONE_DISPLAY = '(03) 5339 2056';
  var PHONE_TEL     = 'tel:+61353392056';
  var HOME          = 'index.html';

  var GROUPS = [
    {
      label: 'General Automotive',
      items: [
        { t:'Car Servicing',           sub:'All makes, warranty-safe',         href:'car-servicing-ballarat.html',          icon:'wrench' },
        { t:'Logbook Servicing',       sub:'Manufacturer schedule stamped',    href:'logbook-servicing-ballarat.html',      icon:'clip'   },
        { t:'Mechanical Repairs',      sub:'All faults, Repco warranty',       href:'mechanical-repairs-ballarat.html',     icon:'cog'    },
        { t:'Air Conditioning',        sub:'Re-gas, repair & full service',    href:'air-conditioning-service-ballarat.html', icon:'snow' },
        { t:'EV Service & Repairs',    sub:'Hybrid & full electric vehicles',  href:'ev-service-ballarat.html',             icon:'bolt'   },
      ]
    },
    {
      label: 'Roadworthy & Inspections',
      items: [
        { t:'Roadworthy Certificates', sub:'Licensed Vehicle Tester · 2 inspectors', href:'roadworthy-certificates.html',         icon:'shield' },
        { t:'Classic & Vintage',       sub:'RWC, Club Permit (CPS) & repairs',       href:'classic-car-roadworthy-ballarat.html', icon:'steer'  },
      ]
    },
    {
      label: 'Commercial & Fleet',
      items: [
        { t:'Fleet Servicing',         sub:'PINARC, Grampians Health & more',  href:'fleet-servicing-ballarat.html',        icon:'bldg'  },
        { t:'Diesel, 4WD & Truck',     sub:'Diesel vehicles, 4WDs & trucks',   href:'diesel-repairs-ballarat.html',         icon:'truck' },
      ]
    },
    {
      label: 'Local & All Services',
      items: [
        { t:'Mechanic Wendouree',      sub:'Your local Ballarat workshop',      href:'mechanic-wendouree-ballarat.html',    icon:'pin'   },
        { t:'All Services',            sub:'Full service capability list',      href:'services-ballarat.html',              icon:'arrow' },
      ]
    }
  ];

  /* ------------------------------------------------------------------ */
  /* SVG ICONS                                                            */
  /* ------------------------------------------------------------------ */
  var ICONS = {
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/></svg>',
    clip:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 12h6M9 16h4"/><path d="M8 4h8"/></svg>',
    cog:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 7.5 19.4l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15H4.5a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 6 7.5l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 11 4.6V4.5a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 18 6l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 11.5z"/></svg>',
    snow:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
    steer:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/><path d="M3.5 11h6.1M14.4 11h6.1M11.3 14.3 9 20.5M12.7 14.3 15 20.5"/></svg>',
    bldg:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01"/></svg>',
    truck:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 17h4V5H2v12h3"/><path d="M15 8h4l3 3v6h-3"/><circle cx="7.5" cy="17.5" r="1.6"/><circle cx="17.5" cy="17.5" r="1.6"/></svg>',
    flame:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 0 1-7 7 7 7 0 0 1-7-7c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    bolt:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    pin:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    phone:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12 19.79 19.79 0 0 1 1.14 3.35 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>',
    chev:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    menu:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  };

  /* ------------------------------------------------------------------ */
  /* HELPERS                                                              */
  /* ------------------------------------------------------------------ */
  var currentFile = (function () {
    var p = window.location.pathname;
    return p.substring(p.lastIndexOf('/') + 1) || 'index.html';
  }());

  function allItems() {
    var out = [];
    GROUPS.forEach(function (g) { g.items.forEach(function (it) { out.push(it); }); });
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* BUILD: MEGA MENU HTML                                                */
  /* ------------------------------------------------------------------ */
  function buildMegaHTML() {
    var cols = GROUPS.map(function (g) {
      var links = g.items.map(function (it) {
        var active = currentFile === it.href ? ' class="mega-link mega-link--active"' : ' class="mega-link"';
        return '<a href="' + it.href + '"' + active + '>' +
               '<span class="mega-link-ico">' + ICONS[it.icon] + '</span>' +
               '<span class="mega-link-text">' +
                 '<span class="mega-link-title">' + it.t + '</span>' +
                 '<span class="mega-link-sub">' + it.sub + '</span>' +
               '</span>' +
               '<span class="mega-link-arrow">' + ICONS.arrow + '</span>' +
               '</a>';
      }).join('');

      return '<div class="mega-col">' +
             '<div class="mega-col-head">' + g.label + '</div>' +
             links +
             '</div>';
    }).join('');

    return '<div class="mega" id="sp-mega" role="menu" aria-label="Services menu">' +
           '<div class="sp-wrap mega-inner">' + cols + '</div>' +
           '<div class="mega-foot">' +
             '<div class="sp-wrap mega-foot-in">' +
               '<span class="mega-foot-text">Need help choosing? <strong>Call us</strong></span>' +
               '<a href="' + PHONE_TEL + '" class="btn btn-primary mega-foot-call">' +
                 ICONS.phone + ' ' + PHONE_DISPLAY +
               '</a>' +
             '</div>' +
           '</div>' +
           '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* BUILD: MOBILE DRAWER HTML                                            */
  /* ------------------------------------------------------------------ */
  function buildDrawerHTML() {
    var groups = GROUPS.map(function (g) {
      var links = g.items.map(function (it) {
        var cls = currentFile === it.href ? ' class="drawer-svc-link drawer-svc-link--active"' : ' class="drawer-svc-link"';
        return '<a href="' + it.href + '"' + cls + '>' + it.t + '</a>';
      }).join('');
      return '<div class="drawer-svc-group"><div class="drawer-svc-group-label">' + g.label + '</div>' + links + '</div>';
    }).join('');

    var logoSvg = '<svg viewBox="0 0 356.14 178.98" role="img" aria-label="Neale Goad Automotive" style="height:30px;width:auto;display:block;">' +
      '<g fill="none" stroke="#FFCC00" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M79.22,57V4.5c29,0,52.5,23.5,52.5,52.5V.5"/>' +
      '<path d="M197.72,6c-29,0-52.5,23.5-52.5,52.5s23.5,52.5,52.5,52.5V41.5h-21"/>' +
      '<path d="M264.18,57c0-29-23.5-52.5-52.5-52.5v52.5"/>' +
      '<line x1="210.68" y1="40.5" x2="261.68" y2="40.5"/>' +
      '</g></svg>';

    return '<div class="sp-drawer sp-drawer--nav" id="sp-mega-drawer" aria-hidden="true" role="dialog" aria-label="Services navigation">' +
           '<div class="sp-drawer-scrim" id="sp-mega-scrim"></div>' +
           '<div class="sp-drawer-panel">' +
             '<div class="sp-drawer-head">' +
               '<a href="' + HOME + '" class="sp-drawer-logo">' + logoSvg + '</a>' +
               '<button class="sp-drawer-close" id="sp-mega-close" aria-label="Close menu">' + ICONS.close + '</button>' +
             '</div>' +
             '<nav aria-label="All services">' +
               '<a href="' + HOME + '" class="drawer-home-link">← Home</a>' +
               '<div class="drawer-svc-acc">' +
                 '<button class="drawer-svc-toggle" id="sp-drawer-svc-toggle" aria-expanded="false">' +
                   'Services ' + ICONS.chev +
                 '</button>' +
                 '<div class="drawer-svc-items" id="sp-drawer-svc-items">' + groups + '</div>' +
               '</div>' +
             '</nav>' +
             '<div class="drawer-cta">' +
               '<a href="' + PHONE_TEL + '" class="btn btn-primary btn-block">' +
                 ICONS.phone + ' ' + PHONE_DISPLAY +
               '</a>' +
             '</div>' +
           '</div>' +
           '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* BUILD: HEADER NAV (replaces .sp-nav content)                        */
  /* ------------------------------------------------------------------ */
  function buildNavLinksHTML() {
    return '<a href="' + HOME + '" class="sp-nav-home">Home</a>' +
           '<button class="sp-nav-svc-btn" id="sp-mega-trigger" aria-haspopup="true" aria-expanded="false">' +
             'Services ' + ICONS.chev +
           '</button>';
  }

  /* ------------------------------------------------------------------ */
  /* BUILD: FOOTER SERVICES COLUMN                                        */
  /* ------------------------------------------------------------------ */
  function buildFooterServicesHTML() {
    var links = allItems().map(function (it) {
      return '<a href="' + it.href + '">' + it.t + '</a>';
    }).join('');
    return '<div class="sp-footer-services-col">' +
           '<span class="sp-footer-h">Services</span>' +
           '<div class="sp-footer-p sp-footer-svc-links">' + links + '</div>' +
           '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* FIX: BREADCRUMBS (inject "Services" middle crumb)                   */
  /* ------------------------------------------------------------------ */
  function fixBreadcrumbs() {
    var crumb = document.querySelector('.sp-crumb');
    if (!crumb) return;
    var spans = crumb.querySelectorAll('span');
    if (spans.length === 0) return;
    var lastSpan = spans[spans.length - 1];
    var serviceName = lastSpan.textContent.trim();

    // Check if "Services" crumb already present
    if (crumb.innerHTML.indexOf('Services') !== -1) return;

    // Build new breadcrumb: Home > Services > Service Name
    var chevSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;opacity:.45;flex:none;"><path d="m9 18 6-6-6-6"/></svg>';
    crumb.innerHTML =
      '<a href="' + HOME + '">Home</a>' +
      chevSvg +
      '<a href="index.html#services" class="sp-crumb-services">Services</a>' +
      chevSvg +
      '<span>' + serviceName + '</span>';
  }

  /* ------------------------------------------------------------------ */
  /* FOOTER HELPERS                                                        */
  /* ------------------------------------------------------------------ */

  /* Inject "Book a Service" CTA button after the telephone link in footer */
  function injectFooterBookBtn() {
    if (document.querySelector('.sp-ftr-book-btn')) return; // already injected
    var telLink = document.querySelector('.sp-footer a[href^="tel:"]');
    if (!telLink) return;
    var parentEl = telLink.closest('p') || telLink.parentElement;
    if (!parentEl) return;
    var btn = document.createElement('a');
    btn.href = 'roadworthy-certificates.html';
    btn.className = 'sp-ftr-book-btn';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex:none;"><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg> Book a Service';
    parentEl.insertAdjacentElement('afterend', btn);
  }

  /* Standardise footer bottom quick links across all standalone pages */
  function updateFooterBottomLinks() {
    var ftBottom = document.querySelector('.sp-footer-bottom');
    if (!ftBottom) return;
    var spans = ftBottom.querySelectorAll(':scope > span');
    var linkSpan = spans[spans.length - 1];
    if (!linkSpan) return;
    linkSpan.style.cssText = 'display:flex;gap:16px;flex-wrap:wrap;';
    linkSpan.innerHTML =
      '<a href="index.html">Home</a>' +
      '<a href="services-ballarat.html">Services</a>' +
      '<a href="roadworthy-certificates.html">Roadworthy</a>' +
      '<a href="car-servicing-ballarat.html">Car Servicing</a>' +
      '<a href="mechanic-wendouree-ballarat.html">Contact</a>' +
      '<a href="privacy-policy.html">Privacy Policy</a>' +
      '<a href="terms-of-service.html">Terms</a>';
  }

  /* ------------------------------------------------------------------ */
  /* INJECT INTO DOM                                                       */
  /* ------------------------------------------------------------------ */
  function inject() {
    /* 1. Replace .sp-nav content with Services mega trigger */
    var nav = document.querySelector('.sp-nav');
    if (nav) {
      nav.innerHTML = buildNavLinksHTML();
    }

    /* 2. Inject mega panel into header */
    var hdr = document.querySelector('.sp-hdr');
    if (hdr) {
      var megaEl = document.createElement('div');
      megaEl.innerHTML = buildMegaHTML();
      hdr.appendChild(megaEl.firstElementChild);
    }

    /* 3. Remove old drawer and inject new one */
    var oldDrawer = document.querySelector('.sp-drawer');
    if (oldDrawer) oldDrawer.parentNode.removeChild(oldDrawer);
    var newDrawerEl = document.createElement('div');
    newDrawerEl.innerHTML = buildDrawerHTML();
    document.body.insertBefore(newDrawerEl.firstElementChild, document.body.firstChild);

    /* 4. Add Services column to footer (grid-column:1/-1 via CSS → full-width row) */
    var footerCols = document.querySelector('.sp-footer-cols');
    if (footerCols && !footerCols.querySelector('.sp-footer-services-col')) {
      var colEl = document.createElement('div');
      colEl.innerHTML = buildFooterServicesHTML();
      footerCols.appendChild(colEl.firstElementChild);
    }

    /* 5. Fix breadcrumbs */
    fixBreadcrumbs();

    /* 6. Update hamburger button to open new drawer */
    var openBtn = document.getElementById('sp-drawer-open');
    if (openBtn) {
      openBtn.id = 'sp-drawer-open-v2';
      openBtn.addEventListener('click', openDrawer);
    }

    /* 7. Inject "Book a Service" CTA into footer contact column */
    injectFooterBookBtn();

    /* 8. Standardise footer bottom quick links */
    updateFooterBottomLinks();
  }

  /* ------------------------------------------------------------------ */
  /* MEGA MENU INTERACTION                                                 */
  /* ------------------------------------------------------------------ */
  var megaTimer = null;
  var mouseX = 0, mouseY = 0;

  /* Track current cursor position so we can verify hover state when
     the close timer fires (prevents premature close on diagonal movement). */
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX; mouseY = e.clientY;
  }, { passive: true });

  function rectContains(el, x, y, padding) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    var p = padding || 6;
    return x >= r.left - p && x <= r.right + p && y >= r.top - p && y <= r.bottom + p;
  }

  function getMegaEls() {
    return {
      mega:    document.getElementById('sp-mega'),
      trigger: document.getElementById('sp-mega-trigger'),
    };
  }

  function openMega() {
    clearTimeout(megaTimer);
    var els = getMegaEls();
    if (els.mega)    { els.mega.classList.add('mega--open'); els.mega.setAttribute('aria-hidden','false'); }
    if (els.trigger) { els.trigger.setAttribute('aria-expanded','true'); els.trigger.classList.add('sp-nav-svc-btn--open'); }
  }

  function closeMegaNow() {
    clearTimeout(megaTimer);
    var els = getMegaEls();
    if (els.mega)    { els.mega.classList.remove('mega--open'); els.mega.setAttribute('aria-hidden','true'); }
    if (els.trigger) { els.trigger.setAttribute('aria-expanded','false'); els.trigger.classList.remove('sp-nav-svc-btn--open'); }
  }

  function cancelClose() { clearTimeout(megaTimer); }

  function scheduleMegaClose() {
    clearTimeout(megaTimer);
    megaTimer = setTimeout(function () {
      /* Only close if cursor has actually left both trigger and mega panel.
         This prevents premature closure during diagonal cursor movement. */
      var els = getMegaEls();
      if (!rectContains(els.trigger, mouseX, mouseY) && !rectContains(els.mega, mouseX, mouseY)) {
        closeMegaNow();
      }
    }, 220);
  }

  function bindMegaEvents() {
    var els = getMegaEls();
    if (!els.trigger || !els.mega) return;

    /* Desktop hover — onMouseEnter opens, onMouseLeave schedules close.
       cancelClose keeps menu open while cursor is over trigger OR mega. */
    els.trigger.addEventListener('mouseenter', openMega);
    els.trigger.addEventListener('mouseleave', scheduleMegaClose);
    els.mega.addEventListener('mouseenter',    cancelClose);
    els.mega.addEventListener('mouseleave',    scheduleMegaClose);

    /* Click toggle (also supports touch devices) */
    els.trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      els.mega.classList.contains('mega--open') ? closeMegaNow() : openMega();
    });

    /* Close on outside click */
    document.addEventListener('mousedown', function (e) {
      var current = getMegaEls();
      if (current.mega && current.mega.classList.contains('mega--open')) {
        if (!current.mega.contains(e.target) && !current.trigger.contains(e.target)) {
          closeMegaNow();
        }
      }
    });

    /* Close on other nav links hover */
    document.querySelectorAll('.sp-nav a:not(.sp-nav-svc-btn)').forEach(function (a) {
      a.addEventListener('mouseenter', scheduleMegaClose);
    });

    /* Keyboard */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMegaNow();
    });
  }

  /* ------------------------------------------------------------------ */
  /* MOBILE DRAWER INTERACTION                                             */
  /* ------------------------------------------------------------------ */
  function openDrawer() {
    var d = document.getElementById('sp-mega-drawer');
    if (!d) return;
    d.classList.add('sp-drawer--open');
    d.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    var d = document.getElementById('sp-mega-drawer');
    if (!d) return;
    d.classList.remove('sp-drawer--open');
    d.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function bindDrawerEvents() {
    /* Open from hamburger (id may have been updated) */
    ['sp-drawer-open', 'sp-drawer-open-v2'].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', openDrawer);
    });

    var closeBtn = document.getElementById('sp-mega-close');
    var scrim    = document.getElementById('sp-mega-scrim');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (scrim)    scrim.addEventListener('click',    closeDrawer);

    /* Services accordion */
    var toggle = document.getElementById('sp-drawer-svc-toggle');
    var items  = document.getElementById('sp-drawer-svc-items');
    if (toggle && items) {
      toggle.addEventListener('click', function () {
        var isOpen = items.classList.contains('drawer-svc-items--open');
        items.classList.toggle('drawer-svc-items--open', !isOpen);
        toggle.classList.toggle('drawer-svc-toggle--open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    /* Close drawer on link click */
    var drawer = document.getElementById('sp-mega-drawer');
    if (drawer) {
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeDrawer);
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* SCROLL REVEAL                                                         */
  /* ------------------------------------------------------------------ */
  function initScrollReveal() {
    document.documentElement.classList.add('motion-ready');
    if (!window.IntersectionObserver) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el, i) {
      if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', i % 6);
      io.observe(el);
    });
    /* Failsafe: reveal any above-fold elements after 600ms */
    setTimeout(function () {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) { el.style.transition = 'none'; el.classList.add('is-in'); }
      });
    }, 600);
  }

  /* ------------------------------------------------------------------ */
  /* POINTER GLOW ON PRIMARY BUTTONS                                       */
  /* ------------------------------------------------------------------ */
  function initButtonGlow() {
    document.addEventListener('mousemove', function (e) {
      var btn = e.target && e.target.closest && e.target.closest('.btn-primary');
      if (!btn) return;
      var r = btn.getBoundingClientRect();
      btn.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      btn.style.setProperty('--gy', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* INIT                                                                  */
  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */
  /* LIGHTBOX LOADER                                                        */
  /* ------------------------------------------------------------------ */
  function loadLightbox() {
    if (window.NGA_LB_INIT) return; // already loaded (e.g. both nav-shared + explicit script)
    var s = document.createElement('script');
    /* Resolve path relative to this script's own location */
    var base = (function () {
      var scripts = document.querySelectorAll('script[src]');
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf('nav-shared') !== -1) {
          return scripts[i].src.replace('nav-shared.js', '');
        }
      }
      return 'app/';
    }());
    s.src = base + 'lightbox.js';
    document.body.appendChild(s);
  }

  /* ------------------------------------------------------------------ */
  /* REPCO AUTHORITY BADGE                                                 */
  /* ------------------------------------------------------------------ */

  /* Inject the Repco Authorised Service Centre logo into .sp-hdr-cta,
     between the hours indicator and the phone button. CSS hides it below
     1100px. Skipped if already present (e.g. hand-coded in HTML). */
  function injectRepcoBadge() {
    if (document.querySelector('.sp-hdr-repco')) return;
    var hdrCta = document.querySelector('.sp-hdr-cta');
    if (!hdrCta) return;
    var phoneBtn = hdrCta.querySelector('a.btn');
    if (!phoneBtn) return;
    var badge = document.createElement('span');
    badge.className = 'sp-hdr-repco';
    var img = document.createElement('img');
    img.src = 'assets/photos/Repco authorised service logo.png';
    img.alt = 'Repco Authorised Service Centre';
    img.className = 'sp-hdr-repco-img';
    badge.appendChild(img);
    hdrCta.insertBefore(badge, phoneBtn);
  }

  /* ------------------------------------------------------------------ */
  /* INIT                                                                  */
  /* ------------------------------------------------------------------ */
  function init() {
    inject();
    bindMegaEvents();
    bindDrawerEvents();
    initScrollReveal();
    initButtonGlow();
    loadLightbox();
    injectRepcoBadge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
