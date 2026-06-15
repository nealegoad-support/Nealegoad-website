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

  /* Single source of truth for the NGA logo — the exact inline SVG used by the
     master SPA header (site/icons.jsx → NGLogo, wordColor #15181d / mono #FFCC00).
     Used by both the header bar AND the mobile drawer; no image assets anywhere. */
  var LOGO_SVG =
    '<svg viewBox="0 0 356.14 178.98" role="img" aria-label="Neale Goad Automotive">' +
      '<g fill="none" stroke="#FFCC00" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M79.22,57V4.5c29,0,52.5,23.5,52.5,52.5V.5"/>' +
        '<path d="M197.72,6c-29,0-52.5,23.5-52.5,52.5s23.5,52.5,52.5,52.5V41.5h-21"/>' +
        '<path d="M264.18,57c0-29-23.5-52.5-52.5-52.5v52.5"/>' +
        '<line x1="210.68" y1="40.5" x2="261.68" y2="40.5"/>' +
      '</g>' +
      '<g fill="#15181d">' +
        '<path d="M4.85,62.51h7.08l14.17,24.84v-24.84h6.3v33.99h-6.99l-14.26-24.75v24.75h-6.3v-33.99Z"/>' +
        '<path d="M38.89,62.51h18.26v6.12h-11.96v7.82h11.45v6.12h-11.45v7.82h11.96v6.12h-18.26v-33.99Z"/>' +
        '<path d="M73.02,81.6l3.63-10.3,3.63,10.3h-7.27ZM60,96.5h6.95l3.77-8.79h12.05l3.68,8.79h6.95l-14.31-33.99h-4.92l-14.17,33.99Z"/>' +
        '<path d="M96.85,62.51h6.3v27.88h10.4v6.12h-16.7v-33.99Z"/>' +
        '<path d="M117.09,62.51h18.26v6.12h-11.96v7.82h11.45v6.12h-11.45v7.82h11.96v6.12h-18.26v-33.99Z"/>' +
        '<path d="M236.82,72.49c-2.02-2.81-5.52-4.51-8.92-4.51-2.9,0-5.7,1.06-7.87,2.94-2.35,2.07-3.91,5.43-3.91,8.56,0,2.85,1.29,5.89,3.27,7.91,2.3,2.44,5.52,3.82,8.79,3.82,4,0,8.1-2.48,9.94-6.12h-14.21v-5.93h22.17v.74c0,9.94-8.37,17.43-18.08,17.43s-18.17-7.64-18.17-17.62,8.33-17.85,18.08-17.85c6.9,0,13.89,4.09,16.47,10.63h-7.54Z"/>' +
        '<path d="M277.62,79.66c0,6.35-5.2,11.55-11.45,11.55s-11.41-5.24-11.41-11.5,5.06-11.73,11.41-11.59l-.05-.14c6.35,0,11.5,5.2,11.5,11.68ZM266.17,61.86c-9.8,0-17.71,7.91-17.71,17.85s8.05,17.62,17.76,17.62,17.71-7.87,17.71-17.66-7.96-17.8-17.76-17.8Z"/>' +
        '<path d="M299.06,81.6l3.63-10.3,3.63,10.3h-7.27ZM286.04,96.5h6.95l3.77-8.79h12.05l3.68,8.79h6.95l-14.31-33.99h-4.92l-14.17,33.99Z"/>' +
        '<path d="M329.19,90.38v-21.76h.46c3.31,0,6.81.09,9.66,2.02,2.94,2.02,4.51,5.47,4.51,9.02,0,3.31-1.47,6.39-4.09,8.42-2.94,2.16-6.21,2.3-9.75,2.3h-.78ZM322.88,96.5h7.27c5.2,0,10.03-.41,14.12-3.91,3.68-3.13,5.84-8.19,5.84-12.93s-2.12-10.07-5.84-13.2c-4-3.4-9.2-3.91-14.26-3.96h-7.13v33.99Z"/>' +
      '</g>' +
      '<g fill="#FFCC00">' +
        '<path d="M62.84,132.43l2.21-6.27,2.21,6.27h-4.42ZM54.92,141.5h4.23l2.3-5.35h7.34l2.24,5.35h4.23l-8.71-20.69h-3l-8.62,20.69Z"/>' +
        '<path d="M87.9,120.81v12.91c0,.95-.06,1.93.39,2.8.56,1.06,1.54,1.76,2.74,1.76,1.01,0,2.04-.56,2.6-1.46.59-.95.56-2.02.56-3.11v-12.91h3.84v12.91c0,2.04-.17,3.98-1.51,5.6-1.34,1.6-3.39,2.69-5.49,2.69-1.96,0-4-1.06-5.29-2.52-1.51-1.71-1.68-3.61-1.68-5.77v-12.91h3.84Z"/>' +
        '<path d="M110.8,124.53h-3.81v-3.72h11.51v3.72h-3.86v16.97h-3.84v-16.97Z"/>' +
        '<path d="M143.87,131.25c0,3.86-3.16,7.03-6.97,7.03s-6.94-3.19-6.94-7,3.08-7.14,6.94-7.06l-.03-.08c3.86,0,7,3.16,7,7.11ZM136.9,120.42c-5.96,0-10.78,4.82-10.78,10.86s4.9,10.72,10.81,10.72,10.78-4.79,10.78-10.75-4.84-10.84-10.81-10.84Z"/>' +
        '<path d="M157.42,120.81h5.24l5.54,15.82,5.63-15.82h5.21v20.69h-3.84v-15.51l-5.35,15.51h-3.25l-5.35-15.51v15.51h-3.84v-20.69Z"/>' +
        '<path d="M206.03,131.25c0,3.86-3.16,7.03-6.97,7.03s-6.94-3.19-6.94-7,3.08-7.14,6.94-7.06l-.03-.08c3.86,0,7,3.16,7,7.11ZM199.06,120.42c-5.96,0-10.78,4.82-10.78,10.86s4.9,10.72,10.81,10.72,10.78-4.79,10.78-10.75-4.84-10.84-10.81-10.84Z"/>' +
        '<path d="M221.68,124.53h-3.81v-3.72h11.51v3.72h-3.86v16.97h-3.84v-16.97Z"/>' +
        '<path d="M238.06,120.81h3.84v20.69h-3.84v-20.69Z"/>' +
        '<path d="M250.94,120.81h4.03l5.57,15.74,5.57-15.74h4.03l-8.01,20.69h-3.16l-8.04-20.69Z"/>' +
        '<path d="M278.94,120.81h11.12v3.72h-7.28v4.76h6.97v3.72h-6.97v4.76h7.28v3.72h-11.12v-20.69Z"/>' +
      '</g>' +
    '</svg>';

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

  /* Top-level nav — mirrors the SPA master header; links into the SPA routes */
  var NAV_ITEMS = [
    { label:'Roadworthy',     href:'index.html#/roadworthy-certificate-ballarat' },
    { label:'Car Service',    href:'index.html#/car-service-ballarat' },
    { label:'Fleet',          href:'index.html#/fleet-servicing-ballarat' },
    { label:'Diesel & Truck', href:'index.html#/diesel-mechanic-ballarat' },
    { label:'Classic',        href:'index.html#/classic-car-roadworthy-ballarat' },
    { label:'Blog',           href:'index.html#/blog' },
    { label:'Contact',        href:'index.html#/contact' }
  ];
  /* Which top-nav item to highlight on each standalone page */
  var ACTIVE_MAP = {
    'roadworthy-certificates.html':'Roadworthy',
    'roadworthy-certificate-ballarat.html':'Roadworthy',
    'car-servicing-ballarat.html':'Car Service',
    'logbook-servicing-ballarat.html':'Car Service',
    'fleet-servicing-ballarat.html':'Fleet',
    'diesel-repairs-ballarat.html':'Diesel & Truck',
    'truck-repairs-ballarat.html':'Diesel & Truck',
    'plant-equipment-repairs-ballarat.html':'Diesel & Truck',
    'classic-car-roadworthy-ballarat.html':'Classic'
  };

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

    var logoSvg = LOGO_SVG;  /* single source of truth — same inline SVG as the header bar */

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
  /* BUILD: MASTER HEADER BAR (the single global header — matches the SPA) */
  /* ------------------------------------------------------------------ */
  function buildHeaderHTML() {
    var links = NAV_ITEMS.map(function (n) {
      var on = ACTIVE_MAP[currentFile] === n.label ? ' class="on"' : '';
      return '<a href="' + n.href + '"' + on + '>' + n.label + '</a>';
    }).join('');
    return '<header class="hdr">' +
           '<div class="hdr-in">' +
             '<a class="hdr-logo" href="' + HOME + '" aria-label="Neale Goad Automotive home">' +
               LOGO_SVG +
             '</a>' +
             '<div class="hdr-repco" aria-label="Repco Authorised Service Centre">' +
               '<img src="assets/photos/Repco authorised service logo.png" alt="Repco Authorised Service Centre">' +
             '</div>' +
             '<nav class="hdr-nav" aria-label="Main navigation">' +
               '<button class="hdr-svc-btn" id="sp-mega-trigger" aria-haspopup="true" aria-expanded="false">Services ' + ICONS.chev + '</button>' +
               links +
             '</nav>' +
             '<div class="hdr-cta">' +
               '<span class="hdr-hours"><span class="dot"></span> Open today · 8–5</span>' +
               '<a class="hdr-call" href="' + PHONE_TEL + '"><span aria-hidden="true">📞</span> ' + PHONE_DISPLAY + '</a>' +
               '<button class="hdr-menu" id="sp-drawer-open" aria-label="Open menu">' + ICONS.menu + '</button>' +
             '</div>' +
           '</div>' +
           '</header>';
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
    /* 0. Remove any legacy inline header / drawer so there is exactly ONE
          global header (safety net for any page whose markup wasn't stripped). */
    var legacyHdr = document.querySelector('header.sp-hdr');
    if (legacyHdr) legacyHdr.parentNode.removeChild(legacyHdr);
    var legacyDrawer = document.querySelector('.sp-drawer');
    if (legacyDrawer) legacyDrawer.parentNode.removeChild(legacyDrawer);

    /* 1. Inject the master header bar at the very top of <body> */
    var hWrap = document.createElement('div');
    hWrap.innerHTML = buildHeaderHTML();
    document.body.insertBefore(hWrap.firstElementChild, document.body.firstChild);

    /* 2. Inject the mega panel as a BODY child (NOT inside .hdr) so its
          position:fixed isn't trapped by the header's backdrop-filter. */
    var megaEl = document.createElement('div');
    megaEl.innerHTML = buildMegaHTML();
    document.body.appendChild(megaEl.firstElementChild);

    /* 3. Inject the mobile drawer */
    var drawerEl = document.createElement('div');
    drawerEl.innerHTML = buildDrawerHTML();
    document.body.insertBefore(drawerEl.firstElementChild, document.body.firstChild);

    /* 4. Add Services column to footer (grid-column:1/-1 via CSS → full-width row) */
    var footerCols = document.querySelector('.sp-footer-cols');
    if (footerCols && !footerCols.querySelector('.sp-footer-services-col')) {
      var colEl = document.createElement('div');
      colEl.innerHTML = buildFooterServicesHTML();
      footerCols.appendChild(colEl.firstElementChild);
    }

    /* 5. Fix breadcrumbs + standardise footer */
    fixBreadcrumbs();
    injectFooterBookBtn();
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
    document.querySelectorAll('.hdr-nav a').forEach(function (a) {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
