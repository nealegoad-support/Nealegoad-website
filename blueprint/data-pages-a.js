/* ============================================================
   PAGES 1–5 — Home, RWC, Wendouree, Car Service, Fleet
   ============================================================ */
window.NGA_PAGES_A = [
{
  n:1, id:"home", route:"/", nav:"Homepage",
  title:"Neale Goad Automotive | Repco Service Centre Wendouree Ballarat",
  desc:"Authorised Repco Service Centre in Wendouree. 30+ years serving Ballarat. Roadworthy certificates, logbook servicing, diesel, fleet & heavy vehicles. Book online.",
  schema:[{type:"AutoRepair", prim:true},{type:"Organization"},{type:"WebSite + SearchAction"}],
  schemaNote:"AutoRepair is the canonical entity (NAP, geo, openingHours, aggregateRating). Organization carries logo + sameAs social profiles; WebSite enables the sitelinks search box.",
  role:"Core hub. Routes every visitor and crawler to the 8 capability pillars while establishing the Repco + LVT + 30-year trust spine above the fold.",
  wireframe:[
    {name:"Sticky Header", note:"Logo · nav · tel CTA (global)", tag:"global"},
    {name:"Hero", note:"H1 capability statement, dual CTA (Book / Call), hero workshop image, LVT badges"},
    {name:"Trust Bar", note:"Repco · LVT · 30+ yrs · Free pickup (global)", tag:"global"},
    {name:"Capability Grid", note:"8 service cards linking to each pillar page — the hub's core job", tag:"unique"},
    {name:"Why Neale Goad", note:"3 authority pillars: history, Repco warranty, accredited inspectors"},
    {name:"Fleet Partner Strip", note:"VIC SES · Grampians Health · Federation Uni · Hospice Care logos"},
    {name:"Reviews", note:"Google rating + 3 featured testimonials (Review schema)"},
    {name:"Service Area", note:"Map + 10 km free pickup radius + suburb chips"},
    {name:"Booking CTA Band", note:"Yellow conversion band, phone + online form trigger"},
    {name:"NAP Footer", note:"Name / address / phone (global)", tag:"global"},
  ],
  components:[
    { name:"Capability Services Grid", lang:"blade / html",
      desc:"The homepage's defining block — an ACF repeater of 8 service cards, each linking to a pillar page. Staggered fade-up on scroll; lift + yellow ring on hover.",
      code:
`<section class="mx-auto max-w-7xl px-6 py-24">
  <p class="font-body text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">What we do</p>
  <h2 class="mt-3 font-disp text-4xl font-extrabold uppercase md:text-5xl">Every job, under one roof</h2>

  <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <?php foreach ($services as $i => $s): ?>
      <a href="<?= esc_url($s['url']) ?>" data-reveal style="--i:<?= $i % 4 ?>"
         class="group relative flex flex-col rounded-2xl border border-brand-line bg-brand-surface p-6
                opacity-0 transition-transform duration-300 will-change-transform
                hover:-translate-y-1.5 hover:border-brand-yellow/40 [&.is-in]:animate-fade-up">
        <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-yellow/15 text-brand-yellow
                     transition-transform duration-300 group-hover:scale-110">
          <?= nga_icon($s['icon']) ?>
        </span>
        <h3 class="mt-5 font-semi text-xl font-bold"><?= esc_html($s['title']) ?></h3>
        <p class="mt-2 text-sm text-brand-muted"><?= esc_html($s['blurb']) ?></p>
        <span class="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-yellow">
          Learn more
          <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" ...>→</svg>
        </span>
      </a>
    <?php endforeach; ?>
  </div>
</section>`
    },
  ],
  ix:[
    { el:"Service card", sub:"capability grid", cls:"hover:-translate-y-1.5 hover:border-brand-yellow/40 group-hover:[&_svg]:translate-x-1 transition-transform duration-300", note:"Icon scales 1.1, arrow nudges right — two synchronized cues per card." },
    { el:"Hero CTAs", sub:"Book / Call", cls:"hover:scale-[1.03] active:scale-95 transition-all duration-300", note:"Inherits global primary/secondary tokens." },
  ],
},

{
  n:2, id:"rwc", route:"/roadworthy-certificate-ballarat", nav:"RWC Landing",
  title:"Roadworthy Certificate Wendouree & Ballarat | Licensed Tester | Neale Goad",
  desc:"Licensed Vehicle Tester in Wendouree with 2 accredited inspectors. Cars, motorcycles, trucks & heavy vehicles. Rectification work carried out on site.",
  schema:[{type:"AutoRepair", prim:true},{type:"Service"},{type:"FAQPage"}],
  schemaNote:"Service node scopes the RWC offering (serviceType, areaServed, provider→AutoRepair). FAQPage marks up the inspection FAQ for rich results — high CTR on this high-intent query.",
  role:"Primary high-intent conversion page. Leads with the LVT credential and the on-site rectification advantage; closes with checklist transparency + FAQ.",
  wireframe:[
    {name:"Sticky Header", note:"global", tag:"global"},
    {name:"Hero", note:"H1 'Roadworthy Certificates Wendouree & Ballarat', LVT + 2-inspector badge pills"},
    {name:"Tactical Advantage", note:"High-contrast block: failed-inspection rectification done on-site", tag:"unique"},
    {name:"Vehicle Types Covered", note:"Cars · motorcycles · trucks · heavy vehicles icon row"},
    {name:"RWC Checklist Table", note:"What the inspection covers — transparency data table", tag:"unique"},
    {name:"Process Steps", note:"Book → inspect → rectify on-site → certificate issued (4-step)"},
    {name:"Pricing / Turnaround", note:"From-price + same-week availability callout"},
    {name:"FAQ Accordion", note:"FAQPage schema source — 6–8 RWC questions", tag:"unique"},
    {name:"Reviews", note:"RWC-specific testimonials"},
    {name:"Booking CTA Band", note:"Phone + online form"},
    {name:"NAP Footer", note:"global", tag:"global"},
  ],
  components:[
    { name:"RWC Inspection Checklist — Data Table", lang:"blade / html",
      desc:"Transparency table of inspection categories. ACF repeater (category → items → status). Sticky header row, zebra rows, yellow category accents.",
      code:
`<div class="overflow-hidden rounded-2xl border border-brand-line">
  <table class="w-full border-collapse text-left text-sm">
    <thead class="bg-white/[0.03] text-brand-faint">
      <tr class="text-xs font-bold uppercase tracking-wider">
        <th class="px-5 py-4">Inspection area</th>
        <th class="px-5 py-4">What we check</th>
        <th class="w-32 px-5 py-4">Standard</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($checklist as $row): ?>
        <tr class="border-t border-brand-line odd:bg-white/[0.012] transition-colors hover:bg-brand-yellow/[0.04]">
          <td class="px-5 py-4 font-semibold text-brand-text">
            <span class="mr-2 inline-block h-2 w-2 rounded-full bg-brand-yellow align-middle"></span>
            <?= esc_html($row['area']) ?>
          </td>
          <td class="px-5 py-4 text-brand-muted"><?= esc_html($row['checks']) ?></td>
          <td class="px-5 py-4">
            <span class="rounded-md bg-brand-yellow/15 px-2.5 py-1 font-mono text-xs text-brand-yellow">
              VSI 1–13
            </span>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>`
    },
    { name:"FAQ Accordion (FAQPage schema)", lang:"blade / html",
      desc:"Accessible disclosure list driving FAQPage JSON-LD. Smooth height/opacity reveal; yellow plus-to-minus icon rotation.",
      code:
`<div class="divide-y divide-brand-line rounded-2xl border border-brand-line">
  <?php foreach ($faqs as $f): ?>
    <details class="group px-6 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex cursor-pointer items-center justify-between gap-4 py-5
                      font-semi text-lg font-semibold transition-colors hover:text-brand-yellow">
        <?= esc_html($f['q']) ?>
        <svg class="h-5 w-5 shrink-0 text-brand-yellow transition-transform duration-300 group-open:rotate-45"
             viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/></svg>
      </summary>
      <div class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
        <p class="overflow-hidden pb-5 text-brand-muted"><?= esc_html($f['a']) ?></p>
      </div>
    </details>
  <?php endforeach; ?>
</div>`
    },
  ],
  ix:[
    { el:"FAQ item", sub:"<details> toggle", cls:"group-open:rotate-45 transition-transform duration-300 / grid-rows-[0fr]→[1fr]", note:"CSS-grid row trick animates height with no JS." },
    { el:"Checklist row", sub:"table hover", cls:"hover:bg-brand-yellow/[0.04] transition-colors", note:"Subtle yellow wash confirms scan position." },
    { el:"Tactical block CTA", sub:"book & beat the re-test", cls:"hover:scale-[1.03] active:scale-95 + animated sheen", note:"Sheen sweep keyframe on the yellow surface." },
  ],
},

{
  n:3, id:"wendouree", route:"/roadworthy-wendouree", nav:"Wendouree RWC",
  title:"Roadworthy Wendouree | Licensed Vehicle Tester | Neale Goad",
  desc:"Roadworthy certificates in Wendouree from a Licensed Vehicle Tester with 2 accredited inspectors. On-site rectification. Book your local Wendouree RWC today.",
  schema:[{type:"LocalBusiness → AutoRepair", prim:true},{type:"Service"}],
  schemaNote:"Hyper-local variant: identical NAP to canonical, but areaServed pinned to Wendouree (with geo radius). Keep one master AutoRepair entity — don't duplicate LocalBusiness across suburb pages or you split citation signals.",
  role:"Hyper-local capture for 'roadworthy Wendouree'. Mirrors the RWC offer but foregrounds locality, directions and the workshop's Wendouree address.",
  wireframe:[
    {name:"Sticky Header", note:"global", tag:"global"},
    {name:"Local Hero", note:"H1 'Roadworthy Certificates in Wendouree', distance/locality cue"},
    {name:"NAP + Map Block", note:"Address card + embedded map + directions CTA", tag:"unique"},
    {name:"Why a Local LVT", note:"On-site rectification, 2 inspectors, no second trip"},
    {name:"Areas We Serve", note:"Suburb chip cloud linking nearby location pages", tag:"unique"},
    {name:"Checklist Summary", note:"Condensed RWC checklist (links to full /roadworthy-certificate-ballarat)"},
    {name:"Reviews", note:"Wendouree-area testimonials"},
    {name:"Booking CTA Band", note:"Phone + form"},
    {name:"NAP Footer", note:"global", tag:"global"},
  ],
  components:[
    { name:"Local NAP + Map + Directions", lang:"blade / html",
      desc:"Two-column local trust block: address/hours/phone card beside a lazy-loaded map embed. Drives the LocalBusiness signal and 'directions' intent.",
      code:
`<section class="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2">
  <div class="rounded-2xl border border-brand-line bg-brand-surface p-8">
    <h2 class="font-disp text-3xl font-extrabold uppercase">Find us in Wendouree</h2>
    <dl class="mt-6 space-y-4 text-[15px]">
      <div class="flex gap-3"><?= nga_icon('pin') ?>
        <dd class="text-brand-muted"><?= nga_acf('address_full') ?></dd></div>
      <div class="flex gap-3"><?= nga_icon('clock') ?>
        <dd class="text-brand-muted">Mon–Fri 8–5 · Sat by appointment</dd></div>
      <div class="flex gap-3"><?= nga_icon('phone') ?>
        <dd><a href="tel:+61353392056" class="text-brand-text">(03) 5339 2056</a></dd></div>
    </dl>
    <a href="https://maps.google.com/?q=<?= rawurlencode($address) ?>" target="_blank" rel="noopener"
       class="mt-7 inline-flex items-center gap-2 rounded-[10px] bg-brand-yellow px-5 py-3
              font-semibold text-brand-ink transition-all duration-300 hover:scale-[1.03] active:scale-95">
      Get directions <?= nga_icon('arrow') ?>
    </a>
  </div>

  <div class="overflow-hidden rounded-2xl border border-brand-line">
    <iframe loading="lazy" title="Map to Neale Goad Automotive, Wendouree"
            class="h-full min-h-[340px] w-full grayscale-[.3] contrast-[1.05]"
            src="<?= esc_url($map_embed_url) ?>"></iframe>
  </div>
</section>`
    },
  ],
  ix:[
    { el:"Suburb chip", sub:"areas-we-serve cloud", cls:"transition-all duration-200 hover:border-brand-yellow hover:bg-brand-yellow/10 hover:text-brand-text active:scale-95", note:"Each chip is an internal link to a location page." },
    { el:"Directions CTA", sub:"map block", cls:"hover:scale-[1.03] active:scale-95 transition-all duration-300", note:"Opens Google Maps in new tab." },
  ],
},

{
  n:4, id:"car-service", route:"/car-service-ballarat", nav:"Car Service & Logbook",
  title:"Car Service & Logbook Servicing Ballarat | All Makes & Models | NGA Auto",
  desc:"Factory-trained technicians at Wendouree's Repco Authorised Service Centre. Warranty-safe logbook servicing. Free pickup & delivery within 10 km.",
  schema:[{type:"AutoRepair", prim:true},{type:"Service"}],
  schemaNote:"Service node: serviceType 'Logbook Servicing', offers with priceRange, areaServed Ballarat. Reinforce 'warranty-safe' in description meta — common objection for log-book intent.",
  role:"Factory-trained servicing hub. Resolves the 'will it void my warranty?' objection and presents clear service tiers + all-makes coverage.",
  wireframe:[
    {name:"Sticky Header", note:"global", tag:"global"},
    {name:"Hero", note:"H1 logbook/all-makes, free-pickup ribbon"},
    {name:"Warranty-Safe Callout", note:"ACCC-aligned 'logbook servicing won't void your new-car warranty'"},
    {name:"Service Tiers Table", note:"Basic / Logbook / Major comparison w/ inclusions", tag:"unique"},
    {name:"All Makes & Models", note:"Brand logo grid (placeholder slots)", tag:"unique"},
    {name:"Free Pickup & Delivery", note:"10 km radius band + how it works"},
    {name:"Process", note:"Book → courtesy pickup → service → report → return"},
    {name:"Reviews", note:"Servicing testimonials"},
    {name:"Booking CTA Band", note:"Phone + form"},
    {name:"NAP Footer", note:"global", tag:"global"},
  ],
  components:[
    { name:"Service Tiers Comparison Table", lang:"blade / html",
      desc:"3-tier pricing/inclusions grid (Basic · Logbook · Major). Middle tier highlighted with a yellow ring + 'Most popular' flag. ACF: tiers repeater → inclusions list.",
      code:
`<div class="grid gap-5 lg:grid-cols-3">
  <?php foreach ($tiers as $t): ?>
    <div data-reveal style="--i:<?= $loop->index ?>"
         class="relative flex flex-col rounded-2xl border bg-brand-surface p-7 opacity-0 [&.is-in]:animate-fade-up
                <?= $t['featured']
                    ? 'border-brand-yellow/60 ring-1 ring-brand-yellow/40 shadow-glow-yellow'
                    : 'border-brand-line' ?>">
      <?php if ($t['featured']): ?>
        <span class="absolute -top-3 left-7 rounded-full bg-brand-yellow px-3 py-1 text-xs
                     font-bold uppercase tracking-wide text-brand-ink">Most popular</span>
      <?php endif; ?>
      <h3 class="font-disp text-2xl font-extrabold uppercase"><?= esc_html($t['name']) ?></h3>
      <p class="mt-2 font-disp text-4xl font-extrabold text-brand-yellow">
        <?= esc_html($t['price']) ?><span class="text-base text-brand-faint">/from</span></p>
      <ul class="mt-6 space-y-3 text-sm text-brand-muted">
        <?php foreach ($t['inclusions'] as $inc): ?>
          <li class="flex gap-2.5"><?= nga_icon('check', 'text-brand-yellow shrink-0') ?><?= esc_html($inc) ?></li>
        <?php endforeach; ?>
      </ul>
      <a href="#book" class="mt-7 inline-flex justify-center rounded-[10px] py-3 font-semibold transition-all
                duration-300 active:scale-95 hover:scale-[1.02]
                <?= $t['featured'] ? 'bg-brand-yellow text-brand-ink shadow-glow-yellow'
                                   : 'border border-brand-line text-brand-text hover:border-brand-yellow' ?>">
        Book this service</a>
    </div>
  <?php endforeach; ?>
</div>`
    },
  ],
  ix:[
    { el:"Tier card", sub:"comparison table", cls:"[&.is-in]:animate-fade-up + featured: ring-1 ring-brand-yellow/40 shadow-glow-yellow", note:"Featured tier always reads first via ring + flag." },
    { el:"Brand logo", sub:"all-makes grid", cls:"grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100", note:"Logos lift to full colour on hover." },
  ],
},

{
  n:5, id:"fleet", route:"/fleet-servicing-ballarat", nav:"Fleet Servicing",
  title:"Fleet Servicing Ballarat | VIC SES & Grampians Health Approved | NGA",
  desc:"Trusted fleet partner to VIC SES, Grampians Health & Federation University. Fleet packages, onsite roller brake testing, diesel & heavy vehicle specialists.",
  schema:[{type:"AutoRepair", prim:true},{type:"Service"}],
  schemaNote:"B2B Service node (serviceType 'Fleet Vehicle Servicing', audience BusinessAudience). Surface the institutional partners as Review/Organization mentions — these are the page's strongest trust asset.",
  role:"Corporate trust dashboard. Converts fleet managers with named institutional partners, capability metrics, and a dedicated lead-capture form (not a phone-first flow).",
  wireframe:[
    {name:"Sticky Header", note:"global", tag:"global"},
    {name:"Corporate Hero", note:"H1 fleet servicing, 'request a fleet proposal' CTA"},
    {name:"Partner Logo Wall", note:"VIC SES · Grampians Health · Federation Uni · Hospice Care", tag:"unique"},
    {name:"Capability Dashboard", note:"Metric/feature cards: roller brake testing, diesel, heavy vehicle, SLA", tag:"unique"},
    {name:"Fleet Packages", note:"Scheduled servicing, compliance, reporting tiers"},
    {name:"Corporate Lead Form", note:"Multi-field B2B capture: company, fleet size, vehicle types", tag:"unique"},
    {name:"Why Partner With Us", note:"Uptime, single invoice, priority booking"},
    {name:"NAP Footer", note:"global", tag:"global"},
  ],
  components:[
    { name:"Corporate Fleet Lead-Capture Form", lang:"blade / html",
      desc:"B2B enquiry form (company, contact, fleet size, vehicle mix, message). Floating labels, yellow focus rings, validated; posts to ACF/CRM webhook. This is the page's primary conversion — not the phone.",
      code:
`<form action="<?= esc_url($fleet_endpoint) ?>" method="post"
      class="grid gap-5 rounded-2xl border border-brand-line bg-brand-surface p-8 sm:grid-cols-2">
  <h2 class="col-span-full font-disp text-3xl font-extrabold uppercase">Request a fleet proposal</h2>

  <?php foreach ($fields as $f): ?>
    <label class="relative <?= $f['wide'] ? 'sm:col-span-2' : '' ?>">
      <input type="<?= $f['type'] ?>" name="<?= $f['name'] ?>" placeholder=" " required
             class="peer w-full rounded-[10px] border border-brand-line bg-brand-charcoal px-4 pt-6 pb-2
                    text-brand-text outline-none transition
                    focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30" />
      <span class="pointer-events-none absolute left-4 top-4 text-brand-faint transition-all
                   peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-yellow
                   peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
        <?= esc_html($f['label']) ?>
      </span>
    </label>
  <?php endforeach; ?>

  <select name="fleet_size" class="rounded-[10px] border border-brand-line bg-brand-charcoal px-4 py-4
              text-brand-text outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30">
    <option>1–5 vehicles</option><option>6–20 vehicles</option><option>21–50</option><option>50+</option>
  </select>

  <button class="col-span-full inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-yellow
                 px-6 py-4 font-semibold text-brand-ink shadow-glow-yellow transition-all duration-300
                 hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-brand-yellowSoft">
    Send fleet enquiry <?= nga_icon('arrow') ?>
  </button>
  <p class="col-span-full text-center text-xs text-brand-faint">
    A fleet specialist responds within one business day. Or call (03) 5339 2056.</p>
</form>`
    },
  ],
  ix:[
    { el:"Floating-label input", sub:"lead form", cls:"peer · peer-focus:top-2 peer-focus:text-brand-yellow focus:ring-2 focus:ring-brand-yellow/30", note:"Label floats on focus or filled — no JS." },
    { el:"Capability card", sub:"dashboard", cls:"hover:-translate-y-1.5 hover:border-brand-yellow/40 [&.is-in]:animate-fade-up", note:"Counts animate up on reveal (optional countUp)." },
    { el:"Partner logo", sub:"trust wall", cls:"opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0", note:"Restrained — institutional logos shouldn't bounce." },
  ],
},
];
