/* Global shell: nav context, glass header, trust bar, NAP footer, shared helpers */
const NavCtx = React.createContext({ route:"/", go:()=>{} });
const useNav = () => React.useContext(NavCtx);

const PHONE_DISPLAY = "(03) 5339 2056";
const PHONE_TEL = "tel:+61353392056";

const NAV_ITEMS = [
  { label:"Roadworthy",     route:"/roadworthy-certificate-ballarat" },
  { label:"Car Service",    route:"/car-service-ballarat" },
  { label:"Fleet",          route:"/fleet-servicing-ballarat" },
  { label:"Diesel & Truck", route:"/diesel-mechanic-ballarat" },
  { label:"Classic",        route:"/classic-car-roadworthy-ballarat" },
  { label:"Blog",           route:"/blog" },
];

/* Services mega menu groups — link to standalone SEO pages */
const MEGA_GROUPS = [
  { label:"General Automotive", items:[
    { t:"Car Servicing",        sub:"All makes, warranty-safe",          icon:"wrench",    href:"car-servicing-ballarat.html" },
    { t:"Logbook Servicing",    sub:"Manufacturer schedule stamped",     icon:"clipboard", href:"logbook-servicing-ballarat.html" },
    { t:"Mechanical Repairs",   sub:"All faults, Repco warranty",        icon:"cog",       href:"mechanical-repairs-ballarat.html" },
    { t:"Air Conditioning",     sub:"Re-gas, repair & full service",     icon:"snowflake", href:"air-conditioning-service-ballarat.html" },
    { t:"EV Service & Repairs", sub:"Hybrid & full electric vehicles",   icon:"bolt",      href:"ev-service-ballarat.html" },
  ]},
  { label:"Roadworthy & Inspections", items:[
    { t:"Roadworthy Certificates", sub:"Licensed Vehicle Tester · 2 inspectors", icon:"fileCheck", href:"roadworthy-certificates.html" },
    { t:"Classic & Vintage",       sub:"RWC, Club Permit (CPS) & repairs",       icon:"steering",  href:"classic-car-roadworthy-ballarat.html" },
  ]},
  { label:"Commercial & Fleet", items:[
    { t:"Fleet Servicing",     sub:"PINARC, Grampians Health & more", icon:"building", href:"fleet-servicing-ballarat.html" },
    { t:"Diesel, 4WD & Truck", sub:"Diesel vehicles, 4WDs & trucks",  icon:"truck",    href:"diesel-repairs-ballarat.html" },
  ]},
  { label:"Local & All Services", items:[
    { t:"Mechanic Wendouree",  sub:"Your local Ballarat workshop",    icon:"pin",      href:"mechanic-wendouree-ballarat.html" },
    { t:"All Services",        sub:"Full service capability list",    icon:"arrow",    href:"services-ballarat.html" },
  ]},
];

/* ---- shared bits ---- */
function Eyebrow({ children, nb }){ return <p className={"eyebrow " + (nb?"nb":"")}>{children}</p>; }

function ImgPh({ label, flag, icon, style, className, src, alt }){
  const Ico = icon ? Icons[icon] : null;
  if(src) return <img className={"phimg " + (className||"")} src={src} alt={alt||label||""} loading="lazy" style={style} />;
  return (
    <div className={"imgph " + (className||"")} style={style}>
      {flag && <span className="flag">{flag}</span>}
      <div>
        {Ico && <Ico className="ico" />}
        <div className="tag">{label}</div>
      </div>
    </div>
  );
}

function Media({ label, tag, caption, capIcon, slow, style, className, src, alt }){
  const Cap = capIcon ? Icons[capIcon] : null;
  return (
    <div className={"media " + (slow?"slow ":"") + (className||"")} style={style}>
      {src
        ? <img className="ph zoom phimg" src={src} alt={alt||caption||label||""} loading="lazy" />
        : <ImgPh className="ph zoom" label={label} icon="car" />}
      {tag && <span className="media-tag">{tag}</span>}
      {caption && <span className="media-cap">{Cap && <Cap/>}{caption}</span>}
    </div>
  );
}

function CallBtn({ lg, label="Call " + PHONE_DISPLAY + " to Book", emoji=true, className="" }){
  return (
    <a href={PHONE_TEL} className={"btn btn-primary " + (lg?"btn-lg ":"") + className}>
      {emoji && <span aria-hidden="true">📞</span>}<Icons.phone style={emoji?{display:"none"}:{}}/>{label}
    </a>
  );
}

function BookBtn({ lg, label="Book an inspection", className="" }){
  const { go } = useNav();
  return (
    <button className={"btn btn-ghost " + (lg?"btn-lg ":"") + className} onClick={()=>go("/roadworthy-certificate-ballarat")}>
      <Icons.calendar/>{label}
    </button>
  );
}

function CtaBand({ title="Get your vehicle sorted this week", sub="Two accredited inspectors, same-week slots, and on-site rectification if anything fails. One visit, one call." }){
  return (
    <section className="section"><div className="wrap">
      <div className="ctaband" data-reveal>
        <Eyebrow nb>Ready when you are</Eyebrow>
        <h2 className="h2" style={{marginTop:"14px"}}>{title}</h2>
        <p className="lead center" style={{margin:"16px auto 0"}}>{sub}</p>
        <div className="ctaband-actions">
          <CallBtn lg/>
          <BookBtn lg/>
        </div>
      </div>
    </div></section>
  );
}

/* ---- mega menu ---- */
function ServicesMega({ open, onEnter, onLeave, onClose }){
  return (
    /* Rendered OUTSIDE <header> so position:fixed isn't hijacked by
       the header's backdrop-filter containing block. onEnter/onLeave
       keep the timer-based hover stable across the header→mega gap. */
    <div
      className={"mega " + (open?"open":"")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      role="region"
      aria-label="Services menu"
    >
      <div className="wrap mega-inner">
        {MEGA_GROUPS.map((g,gi)=>(
          <div key={gi} className="mega-col">
            <div className="mega-col-head">{g.label}</div>
            {g.items.map((it,ii)=>{ const Ico = Icons[it.icon]; return (
              <a key={ii} className="mega-link" href={it.href} onClick={onClose}>
                <span className="mega-link-ico"><Ico/></span>
                <span>
                  <span className="mega-link-title">{it.t}</span>
                  <span className="mega-link-sub">{it.sub}</span>
                </span>
                <span className="mega-link-arr"><Icons.arrow/></span>
              </a>
            );})}
          </div>
        ))}
      </div>
      <div className="mega-foot">
        <div className="mega-foot-in">
          <span className="mega-foot-text">Need help choosing? <strong>Call us</strong></span>
          <a href={PHONE_TEL} className="btn btn-primary" style={{fontSize:"14px",padding:"10px 18px"}} onClick={onClose}>
            <Icons.phone/> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---- header ---- */
function Header(){
  const { route, go } = useNav();
  const [open,        setOpen]        = React.useState(false);
  const [megaOpen,    setMegaOpen]    = React.useState(false);
  const [svcExpanded, setSvcExpanded] = React.useState(false);
  const [scrolled,    setScrolled]    = React.useState(false);
  const megaTimer = React.useRef(null);

  /* Transparent-header scroll detection.
     Listen on both .site-scroll and window to cover both scroll containers. */
  React.useEffect(()=>{
    const check = ()=>{
      const el  = document.querySelector('.site-scroll');
      const pos = (el && el.scrollTop) || window.scrollY || window.pageYOffset || 0;
      setScrolled(pos > 40);
    };
    window.addEventListener('scroll', check, {passive:true});
    const el = document.querySelector('.site-scroll');
    if(el) el.addEventListener('scroll', check, {passive:true});
    check();
    return ()=>{
      window.removeEventListener('scroll', check);
      if(el) el.removeEventListener('scroll', check);
    };
  },[]);

  /* Reset to transparent when navigating back to homepage */
  React.useEffect(()=>{
    if(route==="/") setScrolled(false);
  },[route]);

  React.useEffect(()=>{ setOpen(false); setMegaOpen(false); setSvcExpanded(false); },[route]);

  /* Header is transparent only on the homepage when at the very top */
  const isHeroTop = !scrolled && route === "/";

  /* Hover-intent helpers — 220ms delay eliminates flicker when cursor
     travels from trigger button across the header-bottom gap to the
     mega panel. openMega / cancelClose keep the menu open; scheduleMegaClose
     gives the cursor time to reach the mega before deciding to close. */
  const openMega        = ()=>{ clearTimeout(megaTimer.current); setMegaOpen(true); };
  const cancelClose     = ()=>{ clearTimeout(megaTimer.current); };
  const scheduleMegaClose = ()=>{
    clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(()=>setMegaOpen(false), 220);
  };
  const closeMegaNow    = ()=>{ clearTimeout(megaTimer.current); setMegaOpen(false); };

  /* Close mega on outside click */
  React.useEffect(()=>{
    if(!megaOpen) return;
    const handler = (e)=>{
      const mega = document.querySelector('.mega');
      const btn  = document.querySelector('.hdr-svc-btn');
      if(mega && !mega.contains(e.target) && btn && !btn.contains(e.target)) closeMegaNow();
    };
    document.addEventListener('mousedown', handler);
    return ()=>document.removeEventListener('mousedown', handler);
  },[megaOpen]);

  return (
    <>
    <header className={"hdr" + (isHeroTop?" hdr--top":"")}>
      <div className="wrap hdr-in">
        <div className="hdr-logo" onClick={()=>go("/")} role="link" tabIndex={0}
             aria-label="Neale Goad Automotive home"
             onKeyDown={(e)=>{ if(e.key==="Enter") go("/"); }}>
          {/* Logo wordmark switches to white when header is transparent over dark hero */}
          <NGLogo
            style={{height:"36px"}}
            wordColor={isHeroTop ? "#f3f5f7" : "#15181d"}
          />
        </div>
        <div className="hdr-repco" aria-label="Repco Authorised Service Centre">
          <img src="assets/photos/Repco authorised service logo.png" alt="Repco Authorised Service Centre"/>
        </div>
        <nav className="hdr-nav" aria-label="Main navigation">
          <button
            className={"hdr-svc-btn " + (megaOpen?"open":"")}
            onMouseEnter={openMega}
            onMouseLeave={scheduleMegaClose}
            onClick={()=>{ megaOpen ? closeMegaNow() : openMega(); }}
            aria-haspopup="true"
            aria-expanded={megaOpen}
            aria-controls="spa-mega"
          >
            Services <Icons.chevron/>
          </button>
          {NAV_ITEMS.map(n=>(
            <a key={n.route}
               className={route===n.route?"on":""}
               onClick={()=>{ closeMegaNow(); go(n.route); }}
               onMouseEnter={scheduleMegaClose}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hdr-cta">
          <span className="hdr-hours"><span className="dot"/> Open today · 8–5</span>
          <a href={PHONE_TEL} className="btn btn-primary hdr-call"><span aria-hidden="true">📞</span> {PHONE_DISPLAY}</a>
          <button className="btn btn-ghost hdr-menu" onClick={()=>setOpen(true)} aria-label="Open menu"><Icons.menu/></button>
        </div>
      </div>
    </header>

    {/* Mega is a sibling of header — no backdrop-filter containment */}
    <ServicesMega
      id="spa-mega"
      open={megaOpen}
      onEnter={cancelClose}
      onLeave={scheduleMegaClose}
      onClose={closeMegaNow}
    />

    <div className={"msheet " + (open?"open":"")}>
      <div className="scrim" onClick={()=>setOpen(false)}/>
      <div className="panel">
        <button className="mclose" onClick={()=>setOpen(false)} aria-label="Close"><Icons.x/></button>
        <a className={route==="/"?"on":""} onClick={()=>go("/")}>Home</a>
        {/* Services accordion */}
        <button className={"msheet-svc-btn " + (svcExpanded?"open":"")}
          onClick={()=>setSvcExpanded(v=>!v)}>
          Services <Icons.chevron/>
        </button>
        <div className={"msheet-svc-items " + (svcExpanded?"open":"")}>
          {MEGA_GROUPS.map((g,gi)=>(
            <React.Fragment key={gi}>
              <div className="msheet-svc-group-label">{g.label}</div>
              {g.items.map((it,ii)=>(
                <a key={ii} className="msheet-svc-link" href={it.href} onClick={()=>setOpen(false)}>{it.t}</a>
              ))}
            </React.Fragment>
          ))}
        </div>
        {NAV_ITEMS.map(n=><a key={n.route} className={route===n.route?"on":""} onClick={()=>go(n.route)}>{n.label}</a>)}
        <a href={PHONE_TEL} className="btn btn-primary" style={{marginTop:"14px",justifyContent:"center"}}><span aria-hidden="true">📞</span> {PHONE_DISPLAY}</a>
      </div>
    </div>
    </>
  );
}

/* ---- trust bar ---- */
const TRUST = [
  { icon:"shield", t:"Repco Nationwide Warranty", s:"Australia's largest service network" },
  { icon:"fileCheck", t:"Licensed Vehicle Tester", s:"2 accredited inspectors on-site" },
  { icon:"pin", t:"30+ years local", s:"Serving Ballarat since the 1990s" },
  { icon:"truck", t:"Free pickup & delivery", s:"Within 10 km of Ballarat CBD" },
];
function TrustBar(){
  return (
    <section className="trustbar">
      <ul className="wrap" style={{maxWidth:"var(--maxw)"}}>
        {TRUST.map((t,i)=>{ const Ico = Icons[t.icon]; return (
          <li key={i}><span className="ti"><Ico/></span><span><span className="tt">{t.t}</span><span className="ts">{t.s}</span></span></li>
        );})}
      </ul>
    </section>
  );
}

/* ---- footer (NAP microdata) ---- */
function Footer(){
  return (
    <footer className="ft" itemScope itemType="https://schema.org/AutoRepair">

      {/* ── Brand row: logo + tagline left · phone + CTA right ── */}
      <div className="wrap ft-top">
        <div className="ft-brand">
          <NGLogo style={{height:"42px"}} className="ft-logo"/>
          <p className="ft-tag">
            <span itemProp="name">Neale Goad Automotive – Authorised Repco Service Centre</span><br/>
            206 Burnbank St, Wendouree VIC 3355
          </p>
          <img
            src="assets/photos/Repco authorised service logo.png"
            alt="Repco Authorised Service Centre"
            className="ft-repco-logo"
          />
          <link itemProp="image" href="#"/>
        </div>
        <div className="ft-contact">
          <a href={PHONE_TEL} itemProp="telephone" className="ft-phone">{PHONE_DISPLAY}</a>
          <p className="ft-hours">
            <time itemProp="openingHours" dateTime="Mo-Fr 08:00-17:00">Mon–Fri · 8am–5pm</time>
            <br/>Sat · By appointment
          </p>
          <a href="roadworthy-certificates.html" className="ft-book-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{width:"15px",height:"15px",flex:"none"}}><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>
            Book a Service
          </a>
        </div>
      </div>

      {/* ── Services grid: full width, 5-col ── */}
      <div className="wrap ft-svc-section">
        <span className="ft-h">Services</span>
        <div className="ft-svc-grid">
          {MEGA_GROUPS.map(g=>g.items).flat().map((it,i)=>(
            <a key={i} href={it.href} className="ft-svc-link">{it.t}</a>
          ))}
        </div>
      </div>

      {/* ── Info row: visit · hours · ABN ── */}
      <div className="wrap ft-info">
        <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span className="ft-h">Visit</span>
          <p className="ft-p">
            <span itemProp="streetAddress">206 Burnbank St</span><br/>
            <span itemProp="addressLocality">Wendouree</span>{" "}
            <span itemProp="addressRegion">VIC</span>{" "}
            <span itemProp="postalCode">3355</span>
          </p>
        </div>
        <div>
          <span className="ft-h">Hours</span>
          <p className="ft-p">
            <time itemProp="openingHours" dateTime="Mo-Fr 08:00-17:00">Mon–Fri · 8am–5pm</time><br/>
            Sat · By appointment
          </p>
        </div>
        <div>
          <span className="ft-h">Contact</span>
          <p className="ft-p">
            <a href={PHONE_TEL} style={{color:"var(--txt)"}}>{PHONE_DISPLAY}</a><br/>
            <a href="mailto:service@nealegoad.com.au" style={{color:"var(--txt-2)",fontSize:"13.5px"}}>service@nealegoad.com.au</a>
          </p>
        </div>
        <div>
          <span className="ft-h">Legal</span>
          <p className="ft-p" style={{color:"var(--txt-3)"}}>ABN 36 071 243 402<br/>Goad Group Pty Ltd</p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="wrap ft-bottom">
        <span>© {new Date().getFullYear()} Neale Goad Automotive – Authorised Repco Service Centre</span>
        <span style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
          <a href="index.html">Home</a>
          <a href="services-ballarat.html">Services</a>
          <a href="roadworthy-certificates.html">Roadworthy</a>
          <a href="car-servicing-ballarat.html">Car Servicing</a>
          <a href="mechanic-wendouree-ballarat.html">Contact</a>
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms-of-service.html">Terms</a>
        </span>
      </div>

    </footer>
  );
}

Object.assign(window, { NavCtx, useNav, Eyebrow, ImgPh, Media, CallBtn, BookBtn, CtaBand, Header, TrustBar, Footer, PHONE_DISPLAY, PHONE_TEL });
