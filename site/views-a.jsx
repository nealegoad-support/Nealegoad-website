/* Views A — Homepage hub + RWC landing */
const { useState: useS } = React;

const SERVICES = [
  { t:"Roadworthy Certificates", d:"Licensed Vehicle Tester. Cars, bikes, trucks & heavy vehicles.", icon:"fileCheck", href:"roadworthy-certificates.html" },
  { t:"Car Servicing", d:"Factory-trained, warranty-safe logbook servicing, all makes.", icon:"wrench", href:"car-servicing-ballarat.html" },
  { t:"Logbook Servicing", d:"Manufacturer schedule stamped. Won't void your warranty.", icon:"clipboard", href:"logbook-servicing-ballarat.html" },
  { t:"Fleet Servicing", d:"Trusted by VIC SES, Grampians Health & Federation Uni.", icon:"building", href:"fleet-servicing-ballarat.html" },
  { t:"Diesel & Heavy Vehicle", d:"Trucks, plant & equipment. Dealer-level diagnostics.", icon:"truck", href:"diesel-repairs-ballarat.html" },
  { t:"Classic & Vintage RWC", d:"Club Permit (CPS) inspections for enthusiast vehicles.", icon:"steering", href:"classic-car-roadworthy-ballarat.html" },
  { t:"Mechanical Repairs", d:"All faults diagnosed and fixed. Repco nationwide warranty.", icon:"cog", href:"mechanical-repairs-ballarat.html" },
  { t:"Air Conditioning", d:"Re-gas, leak detection, compressor repair & full service.", icon:"snowflake", href:"air-conditioning-service-ballarat.html" },
  { t:"Truck Repairs", d:"Prime movers, rigids, tippers & compliance inspections.", icon:"truck", href:"truck-repairs-ballarat.html" },
  { t:"Plant Equipment Repairs", d:"Excavators, loaders, hydraulic diagnosis & engine rebuilds.", icon:"cog", href:"plant-equipment-repairs-ballarat.html" },
  { t:"LPG Conversions", d:"Certified LPG installation with compliance certificate.", icon:"droplet", href:"lpg-conversions-ballarat.html" },
  { t:"Mechanic Alfredton", d:"A short drive away, with free pickup & delivery.", icon:"nav", href:"mechanic-alfredton.html" },
];

const PILLARS = [
  { icon:"pin", tag:"Local since the early '90s", title:"30+ Years Local History", body:"Three decades testing and repairing vehicles for Ballarat families, traders and fleets. A fixture, not a pop-up." },
  { icon:"award", tag:"Backed nationwide", title:"Repco Authorised Warranty", body:"Work is covered by the Repco Authorised Service nationwide warranty — protection that travels anywhere in Australia." },
  { icon:"steering", tag:"Specialist capability", title:"Vintage & Classic Club Rego", body:"Accredited for Club Permit (CPS) safety inspections — keeping classic vehicles road-legal and certified." },
];

const PARTNERS = [
  { n:"Victoria SES", t:"Emergency services fleet", icon:"shield" },
  { n:"Grampians Health", t:"Healthcare fleet", icon:"building" },
  { n:"Federation University", t:"Institutional fleet", icon:"award" },
  { n:"Ballarat Hospice Care", t:"Community fleet", icon:"pin" },
];

function HomeView(){
  const { go } = useNav();
  return (
    <div className="view-body">
      <section className="hero"><div className="wrap">
        <div className="hero-grid">
          <div data-reveal>
            <Eyebrow>Repco Authorised Service · Wendouree</Eyebrow>
            <h1 className="h1" style={{marginTop:"18px"}}>One workshop for <span className="hi">every job</span> your vehicle needs</h1>
            <p className="lead" style={{marginTop:"20px"}}>From roadworthy certificates to logbook servicing, diesel, fleet and classic vehicles — 30+ years of trusted, warranty-safe work in Ballarat.</p>
            <p className="biz-line"><strong>Neale Goad Automotive</strong> · Repco Authorised Service · Roadworthy Certificates</p>
            <div className="hero-actions">
              <CallBtn lg/>
              <BookBtn lg/>
            </div>
            <div className="hero-chips">
              <span className="chip"><Icons.star/> 4.9★ Google · 300+ reviews</span>
              <span className="chip"><Icons.check/> Same-week availability</span>
            </div>
          </div>
          <div className="hero-right" data-reveal style={{"--i":1}}>
            <Media style={{aspectRatio:"16 / 10"}} src="site/img/storefront.jpg" tag="Repco Authorised" caption="Our Wendouree workshop" capIcon="building" alt="Neale Goad Automotive workshop exterior with Repco signage"/>
            <QuoteForm/>
          </div>
        </div>
      </div></section>

      <ActionBar/>
      <TrustBar/>

      <section className="section" id="services"><div className="wrap">
        <div className="shead" data-reveal>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="h2">Every capability, under one roof</h2>
          <p className="lead">Every service has a dedicated page with full details, pricing, FAQs and direct booking.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s,i)=>{ const Ico = Icons[s.icon]; return (
            <a key={s.href} className="svc-card" data-reveal style={{"--i":i%4}}
               href={s.href} aria-label={s.t}>
              <span className="svc-no">{String(i+1).padStart(2,"0")}</span>
              <span className="svc-ico"><Ico/></span>
              <h3 className="svc-t">{s.t}</h3>
              <p className="svc-d">{s.d}</p>
              <span className="svc-go">Explore <Icons.arrow/></span>
            </a>
          );})}
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"36px"}} data-reveal>
          <a href="roadworthy-certificates.html" className="btn btn-ghost">
            <Icons.arrow/> View all services
          </a>
        </div>
      </div></section>

      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead" data-reveal>
          <Eyebrow>Why Neale Goad</Eyebrow>
          <h2 className="h2">Three pillars of authority</h2>
        </div>
        <div className="pillars">
          {PILLARS.map((p,i)=>{ const Ico = Icons[p.icon]; return (
            <article key={i} className="pillar" data-reveal style={{"--i":i}}>
              <span className="pillar-ico"><Ico/></span>
              <span className="pillar-tag">{p.tag}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-body">{p.body}</p>
            </article>
          );})}
        </div>
      </div></section>

      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead" data-reveal>
          <Eyebrow>Verified institutional contracts</Eyebrow>
          <h2 className="h2">Trusted to keep critical fleets moving</h2>
        </div>
        <div className="partners">
          {PARTNERS.map((p,i)=>{ const Ico = Icons[p.icon]; return (
            <div key={i} className="partner" data-reveal style={{"--i":i}}>
              <span className="pmark"><Ico/></span>
              <span className="pn">{p.n}</span>
              <span className="pt">{p.t}</span>
            </div>
          );})}
        </div>
      </div></section>

      <HomeBlog/>
      <Testimonials/>
      <HomeFaq/>

      <CtaBand title="One call sorts it" sub="Whatever your vehicle needs, our two accredited inspectors and Repco-backed workshop can handle it — usually within the week."/>
    </div>
  );
}

/* ---------- RWC ---------- */
const CHECKLIST = [
  { area:"Brakes", checks:"Pad/disc wear, lines, handbrake, balance & operation", std:"VSI 1" },
  { area:"Steering & suspension", checks:"Play, bushes, joints, shock absorbers, alignment", std:"VSI 3" },
  { area:"Tyres & wheels", checks:"Tread depth, condition, rating, matching, fixings", std:"VSI 11" },
  { area:"Lights & electrical", checks:"Headlights, indicators, brake & reverse lamps, wiring", std:"VSI 7" },
  { area:"Body & chassis", checks:"Rust, structural integrity, doors, mounting points", std:"VSI 2" },
  { area:"Windscreen & glass", checks:"Cracks, chips in driver's view, wipers & washers", std:"VSI 9" },
  { area:"Seatbelts & restraints", checks:"Operation, anchorage, webbing, buckles", std:"VSI 5" },
  { area:"Exhaust & driveline", checks:"Leaks, mounts, emissions, fluid leaks", std:"VSI 13" },
];
const FAQS = [
  { q:"How long does a roadworthy inspection take?", a:"Most light vehicle inspections take 1–1.5 hours. We offer same-week bookings, and if minor faults are found we can often rectify them the same day rather than booking you in again." },
  { q:"What happens if my vehicle fails?", a:"You receive a written report of exactly what didn't pass. Because we're a full workshop with two accredited inspectors, rectification repairs can be completed right here on-site — saving you a second trip and additional downtime." },
  { q:"What vehicles can you test?", a:"Cars, motorcycles, light commercials, trucks and heavy vehicles. We're also accredited for Club Permit (CPS) inspections on classic and vintage vehicles." },
  { q:"How long is a roadworthy certificate valid?", a:"A Certificate of Roadworthiness is generally valid for 30 days from the date of issue for the purpose of registration or sale." },
  { q:"Do I need a roadworthy to sell my car?", a:"In Victoria, a current roadworthy certificate is required to transfer registration when selling a registered vehicle (with some exemptions). We'll guide you through what applies." },
  { q:"Can you do the repairs if something fails?", a:"Yes — that's our biggest advantage. As a Repco Authorised workshop we carry out rectification on-site, with work backed by the Repco nationwide warranty." },
];

function Accordion({ items }){
  const [open, setOpen] = useS(0);
  return (
    <div className="faq">
      {items.map((f,i)=>(
        <div key={i} className={"faq-item " + (open===i?"open":"")}>
          <button className="faq-q" onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}>
            {f.q}<span className="pm"><Icons.plus/></span>
          </button>
          <div className="faq-a"><div><p>{f.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

function RwcView(){
  return (
    <div className="view-body">
      <section className="hero"><div className="wrap">
        <Crumb trail={[["Home","/"],["Roadworthy Certificate"]]}/>
        <div className="hero-grid">
          <div data-reveal>
            <Eyebrow>Licensed Vehicle Tester · Wendouree</Eyebrow>
            <h1 className="h1" style={{marginTop:"18px"}}>Roadworthy Certificates <span className="hi">Wendouree &amp; Ballarat</span></h1>
            <p className="lead" style={{marginTop:"20px"}}>A fast, properly-documented RWC from a Repco Authorised workshop with two accredited inspectors — and the ability to fix what fails on the spot.</p>
            <div className="hero-actions"><CallBtn lg/><BookBtn lg label="Book inspection"/></div>
          </div>
          <div className="hero-right" data-reveal style={{"--i":1}}>
            <div className="hero-badges">
              <div className="badge-pill"><span className="bp-ico"><Icons.shield/></span><span><span className="bp-t">Licensed Vehicle Tester (LVT)</span><span className="bp-s">Approved &amp; audited testing workshop</span></span></div>
              <div className="badge-pill"><span className="bp-ico"><Icons.fileCheck/></span><span><span className="bp-t">2 Accredited Inspectors</span><span className="bp-s">On-site — no outsourcing, no delays</span></span></div>
              <div className="badge-pill"><span className="bp-ico"><Icons.car/></span><span><span className="bp-t">Cars · Bikes · Trucks · Heavy</span><span className="bp-s">Full range of vehicle classes</span></span></div>
            </div>
          </div>
        </div>
        <div className="tactical" data-reveal>
          <span className="tactical-ico"><Icons.wrench/></span>
          <div style={{flex:1}}>
            <span className="tactical-kicker">The on-site advantage</span>
            <p className="tactical-text"><strong>Failed inspection? Rectification repairs can be completed right here on-site</strong> — saving you a second trip and additional vehicle downtime.</p>
          </div>
          <BookBtn label="Book &amp; beat the re-test" className="tactical-btn"/>
        </div>
      </div></section>

      <ActionBar/>
      <TrustBar/>

      <section className="section"><div className="wrap">
        <div className="shead" data-reveal>
          <Eyebrow>Full transparency</Eyebrow>
          <h2 className="h2">What the inspection covers</h2>
          <p className="lead">Every certificate follows the VicRoads Vehicle Standards. Here's what our inspectors work through.</p>
        </div>
        <div className="dtable-wrap" data-reveal>
          <table className="dtable">
            <thead><tr><th>Inspection area</th><th>What we check</th><th className="std">Standard</th></tr></thead>
            <tbody>
              {CHECKLIST.map((r,i)=>(
                <tr key={i}><td><span className="area"><span className="bullet"/>{r.area}</span></td><td>{r.checks}</td><td className="std"><span className="std-pill">{r.std}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div></section>

      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead" data-reveal>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="h2">Roadworthy FAQ</h2>
        </div>
        <div data-reveal style={{marginTop:"34px"}}><Accordion items={FAQS}/></div>
      </div></section>

      <Testimonials/>

      <CtaBand title="Book your roadworthy this week"/>
    </div>
  );
}

function Crumb({ trail }){
  const { go } = useNav();
  return (
    <div className="crumb" data-reveal>
      {trail.map((t,i)=>(
        <React.Fragment key={i}>
          {i>0 && <Icons.chevron style={{transform:"rotate(-90deg)"}}/>}
          {t[1] ? <a onClick={()=>go(t[1])}>{t[0]}</a> : <span style={{color:"var(--txt-2)"}}>{t[0]}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

Object.assign(window, { HomeView, RwcView, Accordion, Crumb });
