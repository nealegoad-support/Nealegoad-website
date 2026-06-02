/* ============================================================
   PAGES 6–9 — Alfredton, Delacombe, Diesel/Heavy, Classic & Vintage
   ============================================================ */
window.NGA_PAGES_B = [
{
  n:6, id:"alfredton", route:"/mechanic-alfredton", nav:"Alfredton (Location)",
  title:"Mechanic Alfredton | Car Service & Roadworthy | Neale Goad",
  desc:"Alfredton's trusted mechanic — Repco Authorised servicing, logbook & roadworthy certificates. Free pickup & delivery within 10 km of Ballarat CBD.",
  schema:[{type:"LocalBusiness → AutoRepair", prim:true},{type:"Service"}],
  schemaNote:"Suburb signal page. Reuse the master AutoRepair entity with areaServed=Alfredton + a geoMidpoint. Do NOT mint a second physical LocalBusiness address — one workshop, many served suburbs.",
  role:"Local directory-signal page for Alfredton searchers. Leads with proximity + free pickup; reuses the shared Location Template.",
  templateNote:"Pages 6 & 7 share one ACF 'Location' flexible template — only the suburb name, drive-time, map and testimonials differ. Build the component once; populate per-suburb via fields.",
  wireframe:[
    {name:"Sticky Header", note:"global", tag:"global"},
    {name:"Local Hero", note:"H1 'Mechanic in Alfredton', drive-time + pickup cue"},
    {name:"Proximity / Pickup Block", note:"Drive time from Alfredton + free 10 km pickup explainer", tag:"unique"},
    {name:"Services for Locals", note:"Service · logbook · RWC · diesel cards linking to hubs"},
    {name:"NAP + Map", note:"Address card + map + directions (shared)"},
    {name:"Nearby Suburbs", note:"Chip cloud → other location pages"},
    {name:"Reviews", note:"Alfredton-area testimonials"},
    {name:"Booking CTA Band", note:"Phone + form"},
    {name:"NAP Footer", note:"global", tag:"global"},
  ],
  components:[
    { name:"Location Signal Block (shared template)", lang:"blade / html",
      desc:"Reusable proximity card: suburb name, indicative drive-time, and free-pickup radius framed as a local convenience. Drives both relevance and conversion. All copy via ACF location fields.",
      code:
`<section class="mx-auto max-w-7xl px-6 py-20">
  <div class="grid items-center gap-8 rounded-2xl border border-brand-line bg-brand-surface p-8 md:grid-cols-3">
    <div class="md:col-span-2">
      <p class="font-body text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
        Serving <?= esc_html($suburb) ?></p>
      <h2 class="mt-3 font-disp text-4xl font-extrabold uppercase">
        Your local workshop, <?= esc_html($drive_minutes) ?> minutes away</h2>
      <p class="mt-4 max-w-[52ch] text-brand-muted">
        We're a short drive from <?= esc_html($suburb) ?> in Wendouree — and with
        <strong class="text-brand-text">free pickup &amp; delivery inside 10 km of the CBD</strong>,
        you may not need to drive at all.</p>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="rounded-xl border border-brand-line bg-brand-charcoal p-5 text-center">
        <div class="font-disp text-4xl font-extrabold text-brand-yellow"><?= esc_html($drive_minutes) ?></div>
        <div class="mt-1 text-xs uppercase tracking-wide text-brand-faint">min drive</div></div>
      <div class="rounded-xl border border-brand-line bg-brand-charcoal p-5 text-center">
        <div class="font-disp text-4xl font-extrabold text-brand-yellow">10km</div>
        <div class="mt-1 text-xs uppercase tracking-wide text-brand-faint">free pickup</div></div>
    </div>
  </div>
</section>`
    },
  ],
  ix:[
    { el:"Service card", sub:"locals grid", cls:"hover:-translate-y-1.5 hover:border-brand-yellow/40 transition-transform duration-300", note:"Shared with homepage capability card." },
    { el:"Nearby-suburb chip", sub:"internal links", cls:"hover:border-brand-yellow hover:bg-brand-yellow/10 active:scale-95 transition-all", note:"Inter-links location pages for local relevance." },
  ],
},

{
  n:7, id:"delacombe", route:"/mechanic-delacombe", nav:"Delacombe (Location)",
  title:"Mechanic Delacombe | Car Service & Roadworthy | Neale Goad",
  desc:"Delacombe's local mechanic for logbook servicing, repairs & roadworthy certificates. Repco Authorised. Free pickup & delivery within 10 km of the CBD.",
  schema:[{type:"LocalBusiness → AutoRepair", prim:true},{type:"Service"}],
  schemaNote:"Identical structure to Alfredton via the shared Location template — only areaServed=Delacombe, drive-time, map and reviews change. Keeps citation consistency intact.",
  role:"Local directory-signal page for Delacombe. Same Location Template as Alfredton — content differs only by suburb fields.",
  templateNote:"Reuses the Location template from page 6. This entry exists to confirm the suburb-level SEO config + content variables, not new markup.",
  reuseOf:"alfredton",
  wireframe:[
    {name:"Sticky Header", note:"global", tag:"global"},
    {name:"Local Hero", note:"H1 'Mechanic in Delacombe'"},
    {name:"Proximity / Pickup Block", note:"Delacombe drive-time + 10 km pickup (shared)", tag:"shared"},
    {name:"Services for Locals", note:"Same card grid as Alfredton"},
    {name:"NAP + Map", note:"Address + Delacombe-centred map (shared)"},
    {name:"Nearby Suburbs", note:"Chip cloud → other locations"},
    {name:"Reviews", note:"Delacombe-area testimonials"},
    {name:"Booking CTA Band", note:"Phone + form"},
    {name:"NAP Footer", note:"global", tag:"global"},
  ],
  components:[
    { name:"Per-suburb ACF field set", lang:"php (acf)",
      desc:"No new markup — the Location template (page 6) is populated by these fields. Documents exactly which variables a suburb page overrides.",
      code:
`/* Location template — ACF field group: 'location_fields' */
$location = [
  'suburb'         => 'Delacombe',
  'drive_minutes'  => '9',
  'h1'             => 'Mechanic in Delacombe',
  'intro'          => 'Logbook servicing, repairs & roadworthy certificates for Delacombe drivers.',
  'map_embed_url'  => get_field('map_embed_url'),     // Delacombe-centred
  'nearby'         => ['Sebastopol', 'Alfredton', 'Wendouree', 'Ballarat CBD'],
  'testimonials'   => get_field('local_reviews'),     // suburb-tagged
  // meta_title / meta_description set via Yoast/RankMath per the SEO config above
];
get_template_part('template-parts/location', null, $location);`
    },
  ],
  ix:[
    { el:"All interactions", sub:"inherited", cls:"identical to Alfredton location template", note:"No bespoke motion — consistency across suburb pages is the goal." },
  ],
},

{
  n:8, id:"diesel", route:"/diesel-mechanic-ballarat", nav:"Diesel & Heavy Vehicle",
  title:"Diesel & Heavy Vehicle Mechanic Ballarat | Trucks, Plant & Equipment | NGA",
  desc:"Hydraulic diagnosis, engine rebuilds & compliance inspections for trucks, excavators & loaders. Dealer-level diagnostics. Wendouree's heavy vehicle specialists.",
  schema:[{type:"AutoRepair", prim:true},{type:"Service"}],
  schemaNote:"Service node serviceType 'Diesel & Heavy Vehicle Repair'. List equipment categories as serviceOutput. Emphasise 'dealer-level diagnostics' + compliance — the B2B/operator differentiators.",
  role:"Technical specialist page for operators of trucks, plant & equipment. Leads with capability depth and dealer-level diagnostic credibility.",
  wireframe:[
    {name:"Sticky Header", note:"global", tag:"global"},
    {name:"Hero", note:"H1 diesel & heavy vehicle, 'trucks · plant · equipment' kicker"},
    {name:"Capability Grid", note:"Hydraulics · engine rebuilds · compliance · diagnostics", tag:"unique"},
    {name:"Diagnostic Specifications Block", note:"Technical spec table: systems, tooling, standards", tag:"unique"},
    {name:"Equipment Types", note:"Trucks · excavators · loaders · plant icon grid"},
    {name:"Compliance Inspections", note:"Roadworthy/HV compliance + roller brake testing"},
    {name:"Reviews", note:"Operator / trade testimonials"},
    {name:"Booking CTA Band", note:"Phone + form"},
    {name:"NAP Footer", note:"global", tag:"global"},
  ],
  components:[
    { name:"Technical Diagnostic Specifications Block", lang:"blade / html",
      desc:"Engineering-grade spec table grouping capabilities by system (engine, hydraulic, electrical, compliance) with tooling + standards columns. Monospace values signal technical depth.",
      code:
`<div class="overflow-hidden rounded-2xl border border-brand-line">
  <?php foreach ($spec_groups as $g): ?>
    <div class="border-t border-brand-line first:border-t-0">
      <div class="flex items-center gap-3 bg-white/[0.03] px-6 py-4">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-brand-yellow/15 text-brand-yellow">
          <?= nga_icon($g['icon']) ?></span>
        <h3 class="font-semi text-lg font-bold uppercase tracking-wide"><?= esc_html($g['system']) ?></h3>
      </div>
      <dl class="divide-y divide-brand-line">
        <?php foreach ($g['rows'] as $r): ?>
          <div class="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center">
            <dt class="font-semibold text-brand-text"><?= esc_html($r['capability']) ?></dt>
            <dd class="text-sm text-brand-muted"><?= esc_html($r['detail']) ?></dd>
            <dd class="font-mono text-xs text-brand-yellow">
              <span class="rounded-md bg-brand-yellow/10 px-2.5 py-1"><?= esc_html($r['standard']) ?></span>
            </dd>
          </div>
        <?php endforeach; ?>
      </dl>
    </div>
  <?php endforeach; ?>
</div>`
    },
  ],
  ix:[
    { el:"Spec group", sub:"diagnostic table", cls:"[&.is-in]:animate-fade-up — groups reveal sequentially", note:"Staggered --i per system group." },
    { el:"Equipment tile", sub:"types grid", cls:"hover:-translate-y-1.5 hover:border-brand-yellow/40 group-hover:[&_svg]:scale-110 transition", note:"Heavier, more deliberate motion suits the B2B tone." },
    { el:"Hero CTA", sub:"book inspection", cls:"hover:scale-[1.03] active:scale-95 transition-all duration-300", note:"Global primary token." },
  ],
},

{
  n:9, id:"classic", route:"/classic-car-roadworthy-ballarat", nav:"Classic & Vintage RWC",
  title:"Classic & Vintage Roadworthy Ballarat | Club Permit | Neale Goad",
  desc:"Club Permit (CPS) safety inspections & roadworthy certificates for classic, vintage & enthusiast vehicles in Ballarat. Specialist care by Neale Goad Automotive.",
  schema:[{type:"AutoRepair", prim:true},{type:"Service"}],
  schemaNote:"Service node serviceType 'Club Permit & Classic Vehicle Inspection'. Niche enthusiast intent — lean into specialist credibility + CPS (VicRoads Club Permit Scheme) terminology in body copy.",
  role:"Premium enthusiast niche. Speaks to classic/vintage owners with specialist care, Club Permit Scheme expertise, and a more editorial, gallery-led layout.",
  wireframe:[
    {name:"Sticky Header", note:"global", tag:"global"},
    {name:"Editorial Hero", note:"H1 classic & vintage roadworthy, restrained premium tone, hero classic image"},
    {name:"Club Permit (CPS) Explainer", note:"What CPS is, 45/90-day logbook, eligibility", tag:"unique"},
    {name:"Eligibility Checklist", note:"Vehicle age, club membership, condition criteria"},
    {name:"Specialist Care", note:"Why classics need an experienced LVT, careful handling"},
    {name:"Gallery", note:"Premium classic/vintage media grid (placeholder slots)", tag:"unique"},
    {name:"Process", note:"Assess → inspect → CPS / RWC paperwork"},
    {name:"Reviews", note:"Enthusiast/club testimonials"},
    {name:"Booking CTA Band", note:"Phone + form"},
    {name:"NAP Footer", note:"global", tag:"global"},
  ],
  components:[
    { name:"Club Permit (CPS) Eligibility Block", lang:"blade / html",
      desc:"Editorial explainer pairing a CPS definition with an eligibility checklist. Premium, calmer motion; serif-adjacent display weight; generous spacing.",
      code:
`<section class="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
  <div data-reveal class="opacity-0 [&.is-in]:animate-fade-up">
    <p class="font-body text-xs font-bold uppercase tracking-[0.25em] text-brand-yellow">VicRoads Club Permit Scheme</p>
    <h2 class="mt-4 font-disp text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
      Keep your classic road-legal</h2>
    <p class="mt-5 text-lg leading-relaxed text-brand-muted">
      As an experienced Licensed Vehicle Tester, we complete <strong class="text-brand-text">CPS safety
      inspections</strong> and full roadworthy certificates for vehicles 25+ years old — with the careful
      handling enthusiast machines deserve.</p>
  </div>

  <ul class="grid gap-3" data-reveal style="--i:1">
    <?php foreach ($eligibility as $e): ?>
      <li class="flex items-start gap-4 rounded-xl border border-brand-line bg-brand-surface p-5
                 transition-colors duration-300 hover:border-brand-yellow/40">
        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-yellow/15 text-brand-yellow">
          <?= nga_icon('check') ?></span>
        <div>
          <p class="font-semi font-bold text-brand-text"><?= esc_html($e['title']) ?></p>
          <p class="mt-1 text-sm text-brand-muted"><?= esc_html($e['detail']) ?></p>
        </div>
      </li>
    <?php endforeach; ?>
  </ul>
</section>`
    },
  ],
  ix:[
    { el:"Gallery tile", sub:"classic media grid", cls:"overflow-hidden [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-105", note:"Slow 700ms zoom — premium, never snappy." },
    { el:"Eligibility item", sub:"checklist", cls:"hover:border-brand-yellow/40 transition-colors duration-300", note:"Colour-only hover; restrained for the editorial tone." },
    { el:"Hero CTA", sub:"book inspection", cls:"hover:scale-[1.03] active:scale-95 transition-all duration-300", note:"Global primary token." },
  ],
},
];
