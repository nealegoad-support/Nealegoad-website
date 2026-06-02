/* Global shell: nav context, glass header, trust bar, NAP footer, shared helpers */
const NavCtx = React.createContext({ route:"/", go:()=>{} });
const useNav = () => React.useContext(NavCtx);

const PHONE_DISPLAY = "(03) 5339 2056";
const PHONE_TEL = "tel:+61353392056";

const NAV_ITEMS = [
  { label:"Roadworthy", route:"/roadworthy-certificate-ballarat" },
  { label:"Car Service", route:"/car-service-ballarat" },
  { label:"Fleet", route:"/fleet-servicing-ballarat" },
  { label:"Diesel & Heavy", route:"/diesel-mechanic-ballarat" },
  { label:"Classic", route:"/classic-car-roadworthy-ballarat" },
  { label:"Blog", route:"/blog" },
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

/* ---- header ---- */
function Header(){
  const { route, go } = useNav();
  const [open, setOpen] = React.useState(false);
  React.useEffect(()=>{ setOpen(false); },[route]);
  return (
    <>
    <header className="hdr">
      <div className="wrap hdr-in">
        <div className="hdr-logo" onClick={()=>go("/")} role="link" aria-label="Neale Goad Automotive home">
          <NGLogo style={{height:"36px"}} />
        </div>
        <nav className="hdr-nav">
          {NAV_ITEMS.map(n=>(
            <a key={n.route} className={route===n.route?"on":""} onClick={()=>go(n.route)}>{n.label}</a>
          ))}
        </nav>
        <div className="hdr-cta">
          <span className="hdr-hours"><span className="dot"/> Open today · 8–5</span>
          <a href={PHONE_TEL} className="btn btn-primary hdr-call"><span aria-hidden="true">📞</span> {PHONE_DISPLAY}</a>
          <button className="btn btn-ghost hdr-menu" onClick={()=>setOpen(true)} aria-label="Menu"><Icons.menu/></button>
        </div>
      </div>
    </header>

    <div className={"msheet " + (open?"open":"")}>
      <div className="scrim" onClick={()=>setOpen(false)}/>
      <div className="panel">
        <button className="mclose" onClick={()=>setOpen(false)} aria-label="Close"><Icons.x/></button>
        <a className={route==="/"?"on":""} onClick={()=>go("/")}>Home</a>
        {NAV_ITEMS.map(n=><a key={n.route} className={route===n.route?"on":""} onClick={()=>go(n.route)}>{n.label}</a>)}
        <a onClick={()=>go("/roadworthy-wendouree")}>Roadworthy Wendouree</a>
        <a onClick={()=>go("/mechanic-alfredton")}>Mechanic Alfredton</a>
        <a onClick={()=>go("/mechanic-delacombe")}>Mechanic Delacombe</a>
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
  const { go } = useNav();
  return (
    <footer className="ft" itemScope itemType="https://schema.org/AutoRepair">
      <div className="wrap ft-in">
        <div>
          <NGLogo style={{height:"44px"}} className="ft-logo" />
          <p className="ft-tag"><span itemProp="name">Neale Goad Automotive</span> — Repco Authorised Service · Roadworthy Certificates · Wendouree, Ballarat VIC</p>
          <link itemProp="image" href="#" />
        </div>
        <div className="ft-cols">
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span className="ft-h">Visit</span>
            <p className="ft-p">
              <span itemProp="streetAddress">[ Street address — ACF ]</span><br/>
              <span itemProp="addressLocality">Wendouree</span> <span itemProp="addressRegion">VIC</span> <span itemProp="postalCode">3355</span>
            </p>
          </div>
          <div>
            <span className="ft-h">Hours</span>
            <p className="ft-p"><time itemProp="openingHours" dateTime="Mo-Fr 08:00-17:00">Mon–Fri · 8am–5pm</time><br/>Sat · By appointment</p>
          </div>
          <div>
            <span className="ft-h">Get in touch</span>
            <p className="ft-p"><a href={PHONE_TEL} itemProp="telephone">{PHONE_DISPLAY}</a><br/><span className="muted" style={{fontSize:"13px"}}>Booking confirmed by phone</span></p>
          </div>
        </div>
      </div>
      <div className="wrap ft-bottom">
        <span>© {new Date().getFullYear()} Neale Goad Automotive · Goad Group</span>
        <span style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
          <a onClick={()=>go("/roadworthy-certificate-ballarat")} style={{cursor:"pointer"}}>Roadworthy</a>
          <a onClick={()=>go("/fleet-servicing-ballarat")} style={{cursor:"pointer"}}>Fleet</a>
          <a onClick={()=>go("/diesel-mechanic-ballarat")} style={{cursor:"pointer"}}>Diesel & Heavy</a>
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { NavCtx, useNav, Eyebrow, ImgPh, Media, CallBtn, BookBtn, CtaBand, Header, TrustBar, Footer, PHONE_DISPLAY, PHONE_TEL });
