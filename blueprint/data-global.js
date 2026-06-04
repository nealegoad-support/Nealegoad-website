/* ============================================================
   GLOBAL FOUNDATIONS — tokens, config, trust signals, NAP,
   shared cross-template components + baseline micro-interactions.
   Code skeletons stored as template strings (rendered via textContent
   + a light highlighter, so no HTML-escaping needed here).
   ============================================================ */
window.NGA_GLOBAL = {
  brand: [
    { k:"Charcoal (page bg)",   v:"#111419", token:"brand-charcoal" },
    { k:"Panel",                v:"#161a20", token:"brand-panel" },
    { k:"Surface (cards)",      v:"#1c2128", token:"brand-surface" },
    { k:"Hairline",             v:"rgba(255,255,255,.09)", token:"brand-line" },
    { k:"Vivid Yellow",         v:"#FFCD00", token:"brand-yellow" },
    { k:"Yellow (hover)",       v:"#FFD94D", token:"brand-yellowSoft" },
    { k:"Ink on yellow",        v:"#161300", token:"brand-ink" },
    { k:"Text",                 v:"#F2F4F7", token:"slate-50 / brand-text" },
    { k:"Muted text",           v:"#AAB0BA", token:"brand-muted" },
  ],

  tailwindConfig:
`// tailwind.config.js  —  shared theme for every page template
module.exports = {
  content: ['./**/*.php', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal:   '#111419',
          panel:      '#161a20',
          surface:    '#1c2128',
          line:       'rgba(255,255,255,0.09)',
          yellow:     '#FFCD00',
          yellowSoft: '#FFD94D',
          ink:        '#161300',
          text:       '#F2F4F7',
          muted:      '#AAB0BA',
          faint:      '#79808B',
        },
      },
      fontFamily: {
        disp: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
        semi: ['"Barlow Semi Condensed"', 'system-ui', 'sans-serif'],
        body: ['Barlow', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 20px 50px -14px rgba(255,205,0,0.5)',
        'card':        '0 24px 60px -34px rgba(0,0,0,0.9)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(26px)' },
                     '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: { 'fade-up': 'fade-up .72s cubic-bezier(.22,.61,.36,1) both' },
    },
  },
};`,

  nap: [
    { k:"Trading name (PUBLIC)",  v:"Neale Goad Automotive – Authorised Repco Service Centre", mono:false },
    { k:"Legal entity (PRIVATE)", v:"Goad Group Pty Ltd", mono:true },
    { k:"ABN",                    v:"36 071 243 402", mono:true },
    { k:"Address",                v:"206 Burnbank St, Wendouree VIC 3355", mono:true },
    { k:"Phone",                  v:"(03) 5339 2056   ·   tel:+61353392056", mono:true },
    { k:"Hours",                  v:"Mon–Fri 8:00am–5:00pm · Sat by appointment", mono:false },
    { k:"Service area",           v:"Wendouree, Ballarat CBD, Alfredton, Delacombe, Sebastopol, Lake Wendouree", mono:false },
    { k:"Pickup radius",          v:"Free pickup & delivery within 10 km of Ballarat CBD", mono:false },
    { k:"Contact email",          v:"service@nealegoad.com.au (confirm canonical address with Danny)", mono:true },
  ],

  trust: [
    { icon:"shield", t:"Repco Nationwide Warranty", s:"Australia's largest independent service network" },
    { icon:"file",   t:"Licensed Vehicle Tester",   s:"2 accredited inspectors on-site" },
    { icon:"pin",    t:"30+ years local",           s:"Serving Ballarat & Wendouree since the 1990s" },
    { icon:"truck",  t:"Free pickup & delivery",     s:"Within a 10 km radius of Ballarat CBD" },
  ],

  partners: [
    { n:"Victoria SES", t:"Emergency services fleet" },
    { n:"Grampians Health", t:"Healthcare fleet" },
    { n:"Federation University", t:"Institutional fleet" },
    { n:"Ballarat Hospice Care", t:"Community fleet" },
  ],

  /* shared components every template re-uses (build once, ACF-driven) */
  components: [
    {
      name:"Sticky Conversion Header + tel CTA",
      desc:"Global header. Logo + nav (animated underlines) + always-visible call button. Becomes a glass bar on scroll; collapses to an icon-only call button under lg.",
      lang:"blade / html",
      code:
`<header x-data="{ stuck: false }" @scroll.window="stuck = window.scrollY > 12"
        :class="stuck ? 'bg-brand-charcoal/80 backdrop-blur-xl border-brand-line' : 'border-transparent'"
        class="sticky top-0 z-40 border-b transition-colors duration-300">
  <div class="mx-auto flex h-[76px] max-w-7xl items-center gap-6 px-6">
    <a href="/" class="shrink-0"><?php nga_logo(); ?></a>

    <nav class="ml-2 hidden flex-1 items-center gap-7 lg:flex">
      <?php foreach ($nav as $item): ?>
        <a href="<?= esc_url($item['url']) ?>"
           class="group relative py-1 text-[14.5px] font-semibold text-brand-muted
                  transition-colors duration-200 hover:text-brand-text">
          <?= esc_html($item['label']) ?>
          <span class="absolute inset-x-0 -bottom-1 h-0.5 origin-center scale-x-0 rounded-full
                       bg-gradient-to-r from-brand-yellow to-brand-yellowSoft
                       transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
      <?php endforeach; ?>
    </nav>

    <a href="tel:+61353392056"
       class="ml-auto inline-flex items-center gap-2 rounded-[10px] bg-brand-yellow px-5 py-3
              font-semibold text-brand-ink shadow-glow-yellow ring-1 ring-brand-yellow/60
              transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellowSoft">
      <span aria-hidden="true">📞</span>
      <span class="hidden sm:inline">Call (03) 5339 2056 to Book</span>
    </a>
  </div>
</header>`
    },
    {
      name:"Trust Bar (Repco / LVT / Local / Pickup)",
      desc:"4-up credential strip placed directly under the hero on every template. Pull copy from a shared ACF clone field so edits propagate site-wide.",
      lang:"blade / html",
      code:
`<section class="border-y border-brand-line bg-white/[0.015]">
  <ul class="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
    <?php foreach ($trust_signals as $sig): ?>
      <li class="flex items-start gap-3 px-6 py-6">
        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg
                     bg-brand-yellow/15 text-brand-yellow"><?= nga_icon($sig['icon']) ?></span>
        <span>
          <span class="block font-semibold leading-tight"><?= esc_html($sig['title']) ?></span>
          <span class="mt-0.5 block text-[13px] text-brand-faint"><?= esc_html($sig['sub']) ?></span>
        </span>
      </li>
    <?php endforeach; ?>
  </ul>
</section>`
    },
    {
      name:"NAP Footer (LocalBusiness anchor)",
      desc:"Name/Address/Phone footer, identical markup on every page so NAP citation is consistent. Wrap in itemscope for LocalBusiness microdata if not using JSON-LD.",
      lang:"blade / html",
      code:
`<footer class="border-t border-brand-line bg-brand-charcoal">
  <div class="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_2fr]">
    <div>
      <?php nga_logo('h-12'); ?>
      <p class="mt-4 max-w-[34ch] text-sm text-brand-faint">
        Licensed Vehicle Tester · Repco Authorised Service · Wendouree, Ballarat VIC
      </p>
    </div>
    <div class="grid gap-8 sm:grid-cols-3">
      <div>
        <h3 class="font-semibold uppercase tracking-wider text-brand-yellow">Visit</h3>
        <p class="mt-3 text-[15px] leading-7 text-brand-muted"><?= nga_acf('address_full') ?></p>
      </div>
      <div>
        <h3 class="font-semibold uppercase tracking-wider text-brand-yellow">Hours</h3>
        <p class="mt-3 text-[15px] leading-7 text-brand-muted">Mon–Fri 8–5<br>Sat by appointment</p>
      </div>
      <div>
        <h3 class="font-semibold uppercase tracking-wider text-brand-yellow">Call</h3>
        <a href="tel:+61353392056"
           class="group relative mt-3 inline-block text-[15px] text-brand-text">(03) 5339 2056
          <span class="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-yellow
                       transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
      </div>
    </div>
  </div>
</footer>`
    },
  ],

  /* baseline interaction tokens reused across all CTAs */
  baseIx: [
    { el:"Primary CTA", sub:"yellow call/book buttons",
      cls:"transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-glow-yellow active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-yellowSoft focus-visible:outline-none",
      note:"Magnetic offset (optional) layered via a tiny pointermove handler that sets translate vars." },
    { el:"Secondary / ghost", sub:"outline buttons",
      cls:"transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-yellow active:scale-95",
      note:"Same timing as primary so paired buttons feel unified." },
    { el:"Nav link", sub:"header items",
      cls:"relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:bg-brand-yellow after:transition-transform after:duration-300 hover:after:scale-x-100",
      note:"Center-expanding underline. Footer links use after:origin-left for a left-to-right wipe." },
    { el:"Content card", sub:"service / pillar / media",
      cls:"transition-transform duration-300 will-change-transform hover:-translate-y-1.5 hover:border-brand-yellow/40",
      note:"Pair with data-reveal for staggered scroll entrance (see global JS)." },
    { el:"Scroll reveal", sub:"sections & grids",
      cls:"data-[reveal]:opacity-0 data-[reveal]:translate-y-7 [&.is-in]:animate-fade-up",
      note:"IntersectionObserver adds .is-in; stagger children with style=\"--i\" → animation-delay:calc(var(--i)*90ms)." },
  ],

  revealJS:
`// global.js — one observer drives every fade-up reveal, site-wide.
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');           // triggers animate-fade-up
    io.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('[data-reveal]').forEach((el, i) => {
  el.style.setProperty('--i', (i % 6));        // stagger within a group
  io.observe(el);
});

// prefers-reduced-motion: reveal instantly, no transform
if (matchMedia('(prefers-reduced-motion: reduce)').matches)
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));`
};
