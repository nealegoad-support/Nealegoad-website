/* Views C — reusable Location template (Wendouree/Alfredton/Delacombe) + Classic editorial */

const LOCATIONS = {
  "/roadworthy-wendouree": {
    suburb:"Wendouree", driveMin:"0", focus:"roadworthy",
    h1a:"Roadworthy Certificates in", h1b:"Wendouree",
    intro:"We're right here in Wendouree — a Licensed Vehicle Tester with two accredited inspectors and on-site rectification, so a fail never means a second trip across town.",
    nearby:[["Ballarat CBD","/mechanic-alfredton"],["Alfredton","/mechanic-alfredton"],["Delacombe","/mechanic-delacombe"],["Lake Wendouree","/roadworthy-wendouree"]],
  },
  "/mechanic-alfredton": {
    suburb:"Alfredton", driveMin:"7", focus:"mechanic",
    h1a:"Your trusted mechanic in", h1b:"Alfredton",
    intro:"Repco Authorised servicing, logbook and roadworthy certificates for Alfredton drivers — a short drive from Wendouree, with free pickup & delivery so you may not need to drive at all.",
    nearby:[["Wendouree","/roadworthy-wendouree"],["Delacombe","/mechanic-delacombe"],["Ballarat CBD","/mechanic-alfredton"],["Sebastopol","/mechanic-delacombe"]],
  },
  "/mechanic-delacombe": {
    suburb:"Delacombe", driveMin:"9", focus:"mechanic",
    h1a:"Your local mechanic in", h1b:"Delacombe",
    intro:"Logbook servicing, repairs and roadworthy certificates for Delacombe drivers. Repco Authorised, with free pickup & delivery within 10 km of the Ballarat CBD.",
    nearby:[["Wendouree","/roadworthy-wendouree"],["Alfredton","/mechanic-alfredton"],["Sebastopol","/mechanic-delacombe"],["Ballarat CBD","/mechanic-alfredton"]],
  },
};

const LOC_SERVICES = [
  { t:"Roadworthy Certificates", d:"Licensed Vehicle Tester, on-site rectification.", icon:"fileCheck", route:"/roadworthy-certificate-ballarat" },
  { t:"Car Service & Logbook", d:"Warranty-safe, all makes & models.", icon:"wrench", route:"/car-service-ballarat" },
  { t:"Diesel & Heavy Vehicle", d:"Trucks, plant & equipment specialists.", icon:"truck", route:"/diesel-mechanic-ballarat" },
  { t:"Classic & Vintage", d:"Club Permit (CPS) inspections.", icon:"steering", route:"/classic-car-roadworthy-ballarat" },
];

function MapPlaceholder(){
  return (
    <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%",display:"block"}} aria-hidden="true">
      <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="var(--line)" strokeWidth="1"/></pattern></defs>
      <rect width="400" height="340" fill="var(--surface-2)"/>
      <rect width="400" height="340" fill="url(#g)"/>
      <path d="M0 120 Q140 90 200 150 T400 140" fill="none" stroke="rgba(255,204,0,.55)" strokeWidth="6"/>
      <path d="M120 0 Q150 140 90 200 T140 340" fill="none" stroke="var(--line-2)" strokeWidth="10"/>
      <path d="M260 0 Q230 160 300 220 T280 340" fill="none" stroke="var(--line-2)" strokeWidth="8"/>
    </svg>
  );
}

function LocationView({ route }){
  const { go } = useNav();
  const d = LOCATIONS[route];
  if(!d) return null;
  const local = d.driveMin === "0";
  return (
    <div className="view-body">
      <section className="hero"><div className="wrap">
        <Crumb trail={[["Home","/"],[d.suburb]]}/>
        <div className="hero-grid">
          <div data-reveal>
            <Eyebrow>{local ? "Right here in " + d.suburb : d.suburb + " · " + d.driveMin + " min away"}</Eyebrow>
            <h1 className="h1" style={{marginTop:"18px"}}>{d.h1a} <span className="hi">{d.h1b}</span></h1>
            <p className="lead" style={{marginTop:"20px"}}>{d.intro}</p>
            <div className="hero-actions"><CallBtn lg/><BookBtn lg/></div>
            <div className="hero-chips"><span className="chip"><Icons.shield/> Repco Authorised</span><span className="chip"><Icons.truck/> Free pickup within 10 km</span></div>
          </div>
          <div className="hero-right" data-reveal style={{"--i":1}}>
            <div className="prox">
              <div className="prox-l">
                <span className="drive-tag"><Icons.nav/> {local ? "You're here" : "~" + d.driveMin + " min from " + d.suburb}</span>
                <h3 className="h3" style={{marginTop:"16px"}}>{local ? "Find us in " + d.suburb : "A short drive away"}</h3>
                <div className="prox-stats">
                  <div className="prox-stat"><div className="n">{local ? "8–5" : d.driveMin}</div><div className="l">{local ? "Open Mon–Fri" : "min drive"}</div></div>
                  <div className="prox-stat"><div className="n">10km</div><div className="l">free pickup</div></div>
                </div>
                <a href={PHONE_TEL} className="btn btn-primary btn-block" style={{marginTop:"16px"}}><span aria-hidden="true">📞</span> Click to call</a>
              </div>
              <div className="prox-r">
                <div className="prox-map"><MapPlaceholder/></div>
                <div className="prox-pin"><span className="ping"/><span className="dot"/></div>
              </div>
            </div>
          </div>
        </div>
      </div></section>

      <TrustBar/>

      <section className="section"><div className="wrap">
        <div className="shead" data-reveal><Eyebrow>For {d.suburb} drivers</Eyebrow><h2 className="h2">Everything your vehicle needs</h2></div>
        <div className="svc-grid">
          {LOC_SERVICES.map((s,i)=>{ const Ico=Icons[s.icon]; return (
            <div key={i} className="svc-card" data-reveal style={{"--i":i%4}} onClick={()=>go(s.route)} role="link" tabIndex={0} onKeyDown={(e)=>{ if(e.key==="Enter") go(s.route); }}>
              <span className="svc-ico"><Ico/></span><h3 className="svc-t">{s.t}</h3><p className="svc-d">{s.d}</p>
              <span className="svc-go">Explore <Icons.arrow/></span>
            </div>
          );})}
        </div>
      </div></section>

      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead" data-reveal><Eyebrow>Areas we serve</Eyebrow><h2 className="h2">Nearby suburbs</h2></div>
        <div className="nearby" data-reveal style={{marginTop:"22px"}}>
          {d.nearby.map((n,i)=>(
            <a key={i} onClick={()=>go(n[1])}><span className="chip"><Icons.pin/> {n[0]}</span></a>
          ))}
        </div>
      </div></section>

      <CtaBand title={local ? "Book your roadworthy in Wendouree" : "Book in from " + d.suburb}/>
    </div>
  );
}

/* ---------- CLASSIC (editorial) ---------- */
const ELIG = [
  { t:"25+ years old", d:"Vehicles 25 years or older are eligible for the VicRoads Club Permit Scheme.", icon:"clock" },
  { t:"Club membership", d:"Membership of a VicRoads-recognised car club with a valid permit.", icon:"award" },
  { t:"Roadworthy condition", d:"A safety inspection by a Licensed Vehicle Tester — that's us.", icon:"shield" },
  { t:"45 or 90-day logbook", d:"We help you keep the CPS logbook compliant and road-legal.", icon:"clipboard" },
];

function ClassicView(){
  return (
    <div className="view-body">
      <section className="hero"><div className="wrap">
        <Crumb trail={[["Home","/"],["Classic & Vintage"]]}/>
        <div className="hero-grid">
          <div data-reveal>
            <Eyebrow nb>VicRoads Club Permit Scheme</Eyebrow>
            <h1 className="h1" style={{marginTop:"16px"}}>Care your <span className="hi">classic</span> deserves</h1>
            <p className="lead" style={{marginTop:"20px"}}>Club Permit (CPS) safety inspections and roadworthy certificates for classic, vintage and enthusiast vehicles — handled by an experienced Licensed Vehicle Tester who treats your car like their own.</p>
            <div className="hero-actions"><CallBtn lg/><BookBtn lg label="Book an inspection"/></div>
          </div>
          <div className="hero-right" data-reveal style={{"--i":1}}>
            <Media slow style={{aspectRatio:"4 / 3.4"}} src="site/img/classic-tourer.jpg" tag="Heritage" caption="Enthusiast-grade care" capIcon="steering" alt="Restored vintage tourer outside Neale Goad Automotive"/>
          </div>
        </div>
      </div></section>

      <TrustBar/>

      <section className="section"><div className="wrap">
        <div className="editorial">
          <div data-reveal>
            <Eyebrow>Club Permit Scheme</Eyebrow>
            <h2 className="h2" style={{marginTop:"14px"}}>Keep your classic road-legal</h2>
            <p className="lead" style={{marginTop:"16px"}}>As an experienced Licensed Vehicle Tester, we complete CPS safety inspections and full roadworthy certificates for vehicles 25 years and older — with the careful handling enthusiast machines deserve.</p>
          </div>
          <div className="elig" data-reveal style={{"--i":1}}>
            {ELIG.map((e,i)=>{ const Ico=Icons[e.icon]; return (
              <div key={i} className="elig-item"><span className="ei"><Ico/></span><div><div className="et">{e.t}</div><div className="ed">{e.d}</div></div></div>
            );})}
          </div>
        </div>
      </div></section>

      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead" data-reveal><Eyebrow>The collection</Eyebrow><h2 className="h2">Vehicles we've cared for</h2></div>
        <div className="gallery">
          <Media slow src="site/img/classic-torino.jpg" tag="Feature" caption="Ford Torino" capIcon="steering" alt="Yellow Ford Torino outside the workshop"/>
          <Media slow src="site/img/classic-monaro.jpg" alt="Orange Holden Monaro SS in the workshop"/>
          <Media slow src="site/img/classic-sandman.jpg" alt="White Holden Sandman panel van"/>
          <Media slow src="site/img/classic-falcon.jpg" alt="Ford Falcon GT coupe in the workshop"/>
          <Media slow src="site/img/classic-vintage1.jpg" alt="Vintage sedan outside Neale Goad Automotive"/>
        </div>
      </div></section>

      <CtaBand title="Trust your classic to a specialist" sub="Club Permit inspections and roadworthy certificates, handled with enthusiast-grade care in Wendouree."/>
    </div>
  );
}

Object.assign(window, { LocationView, ClassicView, MapPlaceholder });
