/* Page sections — premium overhaul with real NGA photography */

/* resolve images: bundled blob (standalone) → fallback to relative path (prototype) */
const IMG = (id, path) => (typeof window !== "undefined" && window.__resources && window.__resources[id]) || path;
const PHOTO = {
  torino:   IMG("torino",   "assets/photos/torino.jpg"),
  facade:   IMG("facade",   "assets/photos/facade.jpg"),
  workshop: IMG("workshop", "assets/photos/workshop.jpg"),
  heritage: IMG("heritage", "assets/photos/heritage.jpg"),
  fleet:    IMG("fleet",    "assets/photos/fleet-bupa.jpg"),
  aston:    IMG("aston",    "assets/photos/aston.jpg"),
  sedan:    IMG("sedan",    "assets/photos/classic-sedan.jpg"),
  fx:       IMG("fx",       "assets/photos/fx-holden.jpg"),
};

/* ---------- HEADER ---------- */
function Header({ onBook }){
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(()=>{
    const el = document.querySelector(".ng-scroll") || window;
    const onScroll = () => {
      const y = el === window ? window.scrollY : el.scrollTop;
      setScrolled(y > 12);
    };
    el.addEventListener("scroll", onScroll);
    return ()=> el.removeEventListener("scroll", onScroll);
  },[]);
  return (
    <header className={"hdr" + (scrolled ? " is-stuck" : "")}>
      <div className="wrap hdr-in">
        <a href="#top" className="hdr-logo" aria-label="Neale Goad Automotive home">
          <NGLogo className="hdr-logo-svg" />
        </a>
        <nav className="hdr-nav">
          <a href="#why">Why us</a>
          <a href="#credentials">Credentials</a>
          <a href="#work">Our work</a>
          <a href="#fleet">Fleet partners</a>
        </nav>
        <div className="hdr-cta">
          <span className="hdr-hours"><span className="dot" /> Open today · 8am–5pm</span>
          <a href="tel:+61353392056" className="btn btn-primary hdr-call" data-magnetic data-glow>
            <span className="cta-emoji" aria-hidden="true">📞 </span><Phone className="hdr-call-ico"/>Call (03) 5339 2056 to Book
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero({ onBook, variant="showcase" }){
  const showImg = variant === "showcase";
  return (
    <section className={"hero hero-" + variant} id="top">
      <div className="wrap hero-grid">
        <div className="hero-left">
          <p className="eyebrow" data-reveal>Licensed Vehicle Tester · Wendouree</p>
          <h1 className="h1" data-reveal style={{"--i":1}}>
            <span className="h1-line">Roadworthy Certificates</span>
            <span className="h1-line hi">Wendouree &amp; Ballarat</span>
            <span className="h1-line">Licensed Vehicle Tester</span>
          </h1>
          <p className="lead" data-reveal style={{"--i":2}}>
            Book a fast, properly-documented RWC with a Repco Authorised workshop that's served the region for 30+ years — and can fix what fails on the spot.
          </p>

          <div className="hero-actions" data-reveal style={{"--i":3}}>
            <button className="btn btn-primary btn-lg" onClick={onBook} data-magnetic data-glow><Calendar/> Book an inspection</button>
            <a href="tel:+61353392056" className="btn btn-ghost btn-lg" data-magnetic><Phone/> (03) 5339 2056</a>
          </div>

          <div className="hero-chips" data-reveal style={{"--i":4}}>
            <span className="chip"><Star/> 4.9★ Google · 300+ local reviews</span>
            <span className="chip"><Check/> Same-week availability</span>
          </div>
        </div>

        <div className="hero-right" data-reveal="scale" style={{"--i":2}}>
          {showImg && (
            <div className="media hero-img">
              <img src={PHOTO.torino} alt="Restored classic at Neale Goad Automotive, Wendouree" loading="eager" />
              <span className="media-tag">On-site, Wendouree</span>
              <span className="media-cap"><MapPin/> Our Wendouree workshop</span>
            </div>
          )}
          <div className="hero-badges">
            <div className="badge-pill">
              <span className="bp-ico"><ShieldCheck/></span>
              <span>
                <span className="bp-t">Licensed Vehicle Tester (LVT)</span>
                <span className="bp-s">Approved &amp; audited testing workshop</span>
              </span>
            </div>
            <div className="badge-pill">
              <span className="bp-ico"><FileCheck/></span>
              <span>
                <span className="bp-t">2 Accredited Inspectors</span>
                <span className="bp-s">On-site — no outsourcing, no delays</span>
              </span>
            </div>
            {!showImg && (
              <div className="badge-pill">
                <span className="bp-ico"><MapPin/></span>
                <span>
                  <span className="bp-t">30+ Years in Wendouree</span>
                  <span className="bp-s">A Goldfields fixture, not a pop-up</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tactical Advantage Alert Block */}
      <div className="wrap">
        <div className="tactical" id="why" data-reveal>
          <span className="tactical-ico"><Wrench/></span>
          <div className="tactical-body">
            <span className="tactical-kicker">The on-site advantage</span>
            <p className="tactical-text">
              <strong>Failed inspection? Rectification repairs can be completed right here on-site</strong> — saving you a second trip and additional vehicle downtime.
            </p>
          </div>
          <button className="btn btn-primary tactical-btn" onClick={onBook} data-magnetic data-glow>Book &amp; beat the re-test <ArrowRight/></button>
        </div>
      </div>
    </section>
  );
}

/* ---------- TRUST ARCHITECTURE ---------- */
const PILLARS = [
  { ico:<MapPin/>,  tag:"Local since the early '90s", title:"30+ Years Local History",
    body:"Three decades testing and repairing vehicles for Ballarat families, traders and fleets. We're not a pop-up — we're a fixture." },
  { ico:<Award/>,   tag:"Backed nationwide", title:"Repco Authorised Warranty",
    body:"Work is covered by the Repco Authorised Service nationwide warranty guarantee — protection that travels with you, anywhere in Australia." },
  { ico:<Steering/>,tag:"Specialist capability", title:"Vintage & Classic Club Rego",
    body:"Accredited for Club Permit (CPS) safety inspections — keeping vintage and classic vehicles road-legal and properly certified." },
];
function Trust(){
  return (
    <section className="section" id="credentials">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Trust architecture</p>
          <h2 className="h2">Three pillars of authority</h2>
          <p className="lead">Why drivers across the Goldfields choose Neale Goad for certification they can rely on.</p>
        </div>
        <div className="pillars">
          {PILLARS.map((p,i)=>(
            <article className="pillar card" key={i} data-reveal style={{"--i":i+1}}>
              <span className="pillar-ico">{p.ico}</span>
              <span className="pillar-tag">{p.tag}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-body">{p.body}</p>
              <span className="pillar-no">{String(i+1).padStart(2,"0")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SHOWCASE GALLERY ---------- */
const SHOW = [
  { src:PHOTO.aston, cls:"sc-tall", tag:"European", cap:"European & luxury vehicle servicing", ico:<Star/> },
  { src:PHOTO.facade, cls:"sc-wide", tag:"Our workshop", cap:"Wendouree — Repco Authorised", ico:<MapPin/> },
  { src:PHOTO.workshop, cls:"", tag:"Rectification", cap:"Fixed on-site", ico:<Wrench/> },
  { src:PHOTO.fx, cls:"", tag:"Classic", cap:"Club-permit ready", ico:<Steering/> },
  { src:PHOTO.sedan, cls:"sc-wide", tag:"Vintage", cap:"Three decades on the tools", ico:<Clock/> },
];
function Showcase(){
  return (
    <section className="section" id="work" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="eyebrow">From the workshop floor</p>
          <h2 className="h2">Daily drivers to concours classics</h2>
          <p className="lead">From late-model SUVs to luxury European and vintage club cars — all certified under one roof in Wendouree.</p>
        </div>
        <div className="showcase-grid">
          {SHOW.map((s,i)=>(
            <div className={"media " + s.cls} key={i} data-reveal="scale" style={{"--i":i}}>
              <img src={s.src} alt={s.cap} loading="lazy" />
              <span className="media-tag">{s.tag}</span>
              <span className="media-cap">{s.ico} {s.cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HERITAGE SPLIT ---------- */
function Heritage(){
  return (
    <section className="section" id="heritage" style={{paddingTop:0}}>
      <div className="wrap heritage-in">
        <div className="media heritage-media" data-reveal="scale">
          <img src={PHOTO.heritage} alt="Two generations working in the Neale Goad Automotive workshop" loading="lazy" />
          <span className="media-tag">Family run</span>
          <span className="media-cap"><Wrench/> Two generations, one bench</span>
        </div>
        <div className="heritage-copy" data-reveal>
          <p className="eyebrow">The people behind the plate</p>
          <h2 className="h2">Three decades of doing it properly</h2>
          <p className="lead">
            Neale Goad Automotive has tested, repaired and certified vehicles in Wendouree for over 30 years. Two accredited inspectors, hands-on owners, and the same standard whether it's a work ute or a show-day classic.
          </p>
          <div className="heritage-stats">
            <div className="hstat"><div className="hstat-n">30+</div><div className="hstat-l">Years certifying locally</div></div>
            <div className="hstat"><div className="hstat-n">2</div><div className="hstat-l">Accredited LVT inspectors</div></div>
            <div className="hstat"><div className="hstat-n">4.9★</div><div className="hstat-l">Google rating</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FLEET CONTRACTS ---------- */
const CONTRACTS = [
  { t:"Bupa Aged Care", s:"Community transport fleet" },
  { t:"Victoria SES", s:"Emergency response vehicles" },
  { t:"Grampians Health", s:"Patient & service vehicles" },
];
function Fleet(){
  return (
    <section className="fleet-band" id="fleet">
      <div className="wrap fleet-in">
        <div className="fleet-copy" data-reveal>
          <p className="eyebrow">Verified institutional contracts</p>
          <h2 className="h2" style={{fontSize:"clamp(28px,3vw,42px)"}}>Trusted to keep critical fleets moving</h2>
          <p className="lead" style={{marginTop:"14px"}}>
            Selected to service and certify vehicles for the organisations our community depends on — held to the same standard, on the same hoists.
          </p>
          <div className="fleet-contracts">
            {CONTRACTS.map((c,i)=>(
              <div className="fleet-contract" key={i} data-reveal style={{"--i":i+1}}>
                <span className="fc-dot" />
                <span>
                  <span className="fc-t">{c.t}</span><br/>
                  <span className="fc-s">{c.s}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="media fleet-media" data-reveal="scale">
          <img src={PHOTO.fleet} alt="Bupa Aged Care community transport van serviced on the hoist at Neale Goad Automotive" loading="lazy" />
          <span className="media-tag">On the hoist today</span>
          <span className="media-cap"><Check/> Serviced &amp; certified on-site</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA({ onBook }){
  return (
    <section className="section">
      <div className="wrap">
        <div className="final card" data-reveal="scale">
          <div className="final-glow" />
          <p className="eyebrow no-rule">Ready when you are</p>
          <h2 className="h2 final-h">Get your roadworthy sorted this week</h2>
          <p className="lead final-lead">Two accredited inspectors, same-week slots, and on-site rectification if anything fails. One visit, one call.</p>
          <div className="final-actions">
            <a href="tel:+61353392056" className="btn btn-primary btn-lg" data-magnetic data-glow><Phone/><span className="cta-emoji" aria-hidden="true">📞 </span>Call (03) 5339 2056 to Book</a>
            <button className="btn btn-ghost btn-lg" onClick={onBook} data-magnetic><Calendar/> Request online</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer(){
  return (
    <footer className="ft">
      <div className="wrap ft-in">
        <div className="ft-brand">
          <NGLogo className="ft-logo" />
          <p className="ft-tag">Licensed Vehicle Tester · Repco Authorised Service · Wendouree, Ballarat VIC</p>
        </div>
        <div className="ft-cols">
          <div className="ft-col">
            <span className="ft-h">Visit the workshop</span>
            <p className="ft-p">206 Burnbank St<br/>Wendouree VIC 3355</p>
          </div>
          <div className="ft-col">
            <span className="ft-h">Hours</span>
            <p className="ft-p">Mon–Fri · 8:00am – 5:00pm<br/>Sat · By appointment</p>
          </div>
          <div className="ft-col">
            <span className="ft-h">Get in touch</span>
            <p className="ft-p"><a href="tel:+61353392056">(03) 5339 2056</a><br/>Booking confirmed by phone</p>
          </div>
        </div>
      </div>
      <div className="wrap ft-bottom">
        <span>© {new Date().getFullYear()} Neale Goad Automotive</span>
        <span>Roadworthy Certificates · Wendouree &amp; Ballarat</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Hero, Trust, Showcase, Heritage, Fleet, FinalCTA, Footer });
