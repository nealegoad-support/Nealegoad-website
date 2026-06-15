/* Views B — Fleet (B2B form), Car Service (tiers), Diesel (spec table) */

/* ---------- FLEET ---------- */
const FLEET_CAPS = [
  { icon:"gauge", t:"Onsite roller brake testing", d:"Calibrated, compliance-grade brake performance testing for heavy vehicles." },
  { icon:"truck", t:"Diesel & heavy vehicle", d:"Trucks, plant and commercial units serviced by specialists." },
  { icon:"clipboard", t:"Scheduled servicing & reporting", d:"Planned maintenance with single-invoice fleet reporting." },
  { icon:"shield", t:"Priority uptime", d:"Booking priority and fast turnaround to keep your fleet moving." },
];
const FLEET_PARTNERS = ["Victoria SES","Grampians Health","Federation University","Ballarat Hospice Care"];

function FleetForm(){
  const [f, setF] = useS({ company:"", name:"", email:"", phone:"", message:"" });
  const [size, setSize] = useS("6–20 vehicles");
  const [err, setErr] = useS({});
  const [done, setDone] = useS(false);
  const upd = (k)=>(e)=>setF(s=>({...s,[k]:e.target.value}));
  const fld = (name, label, type="text", wide=false) => (
    <div className={"fl " + (wide?"full":"")}>
      <input type={type} value={f[name]} onChange={upd(name)} placeholder=" "
             className={(f[name]?"filled ":"") + (err[name]?"invalid":"")} inputMode={type==="tel"?"tel":undefined}/>
      <label>{label}</label>
      {err[name] && <span className="err">{err[name]}</span>}
    </div>
  );
  const submit = (e)=>{
    e.preventDefault();
    const er={};
    if(!f.company.trim()) er.company="Required";
    if(!f.name.trim()) er.name="Required";
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email="Valid email";
    if(!/^[0-9+()\s-]{8,}$/.test(f.phone)) er.phone="Valid number";
    setErr(er);
    if(Object.keys(er).length===0) setDone(true);
  };
  if(done) return (
    <div className="card"><div className="form-ok">
      <div className="tick"><Icons.check/></div>
      <h3 className="h3">Enquiry received</h3>
      <p className="muted" style={{maxWidth:"38ch",margin:"10px auto 0"}}>Thanks {f.name.split(" ")[0]||"there"} — a fleet specialist will respond to <strong style={{color:"var(--txt)"}}>{f.company}</strong> within one business day. For anything urgent, call {PHONE_DISPLAY}.</p>
      <a href={PHONE_TEL} className="btn btn-primary" style={{marginTop:"18px"}}><span aria-hidden="true">📞</span> {PHONE_DISPLAY}</a>
    </div></div>
  );
  return (
    <form className="card leadform" onSubmit={submit} noValidate>
      <h3 className="h3 full">Request a fleet proposal</h3>
      {fld("company","Company / organisation","text",true)}
      {fld("name","Contact name")}
      {fld("email","Work email","email")}
      {fld("phone","Phone","tel")}
      <div className="fl">
        <select value={size} onChange={(e)=>setSize(e.target.value)}>
          <option>1–5 vehicles</option><option>6–20 vehicles</option><option>21–50 vehicles</option><option>50+ vehicles</option>
        </select>
        <label>Fleet size</label>
        <Icons.chevron className="sel-ico"/>
      </div>
      <div className="fl full">
        <textarea value={f.message} onChange={upd("message")} placeholder=" " className={f.message?"filled":""}></textarea>
        <label>Tell us about your fleet &amp; vehicle mix (optional)</label>
      </div>
      <button className="btn btn-primary btn-block full" type="submit">Send fleet enquiry <Icons.arrow/></button>
      <p className="form-note full">A fleet specialist responds within one business day. Or call {PHONE_DISPLAY}.</p>
    </form>
  );
}

function FleetView(){
  return (
    <div className="view-body">
      <section className="hero"><div className="wrap">
        <Crumb trail={[["Home","/"],["Fleet Servicing"]]}/>
        <div className="hero-grid">
          <div data-reveal>
            <Eyebrow>Corporate &amp; government fleet</Eyebrow>
            <h1 className="h1" style={{marginTop:"18px"}}>Fleet servicing that keeps <span className="hi">critical fleets</span> moving</h1>
            <p className="lead" style={{marginTop:"20px"}}>Selected to service and certify vehicles for the organisations our community depends on — with onsite roller brake testing, diesel specialists and single-invoice reporting.</p>
            <div className="hero-actions"><a href="#/book-service?service=fleet" className="btn btn-primary btn-lg"><Icons.building/> Request a proposal</a><CallBtn lg emoji={false} label={"Call " + PHONE_DISPLAY}/></div>
          </div>
          <div className="hero-right" data-reveal style={{"--i":1}}>
            <Media style={{aspectRatio:"4 / 3.2"}} src="site/img/fleet-bus.jpg" tag="Fleet" caption="Trusted by local institutions" capIcon="building" alt="Bupa Aged Care minibus in for fleet servicing"/>
          </div>
        </div>
      </div></section>

      <TrustBar/>

      <section className="section"><div className="wrap">
        <div className="shead" data-reveal><Eyebrow>Verified partners</Eyebrow><h2 className="h2">Servicing the fleets that serve us</h2></div>
        <div className="partners" style={{marginTop:"30px"}}>
          {FLEET_PARTNERS.map((p,i)=>(
            <div key={i} className="partner" data-reveal style={{"--i":i}}>
              <span className="pmark"><Icons.shield/></span>
              <span className="pn">{p}</span>
            </div>
          ))}
        </div>
      </div></section>

      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead" data-reveal><Eyebrow>Capability</Eyebrow><h2 className="h2">Built for commercial uptime</h2></div>
        <div className="svc-grid">
          {FLEET_CAPS.map((c,i)=>{ const Ico=Icons[c.icon]; return (
            <div key={i} className="svc-card static" style={{"--i":i%4}} data-reveal>
              <span className="svc-ico"><Ico/></span>
              <h3 className="svc-t">{c.t}</h3>
              <p className="svc-d">{c.d}</p>
            </div>
          );})}
        </div>
      </div></section>

      <section className="section" style={{paddingTop:0}} id="fleet-form"><div className="wrap">
        <div className="split">
          <div data-reveal>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="h2" style={{marginTop:"14px"}}>Tell us about your fleet</h2>
            <p className="lead" style={{marginTop:"16px"}}>One point of contact, priority booking, and work backed by the Repco nationwide warranty. Send the details and a specialist will build a tailored proposal.</p>
            <ul className="tlist">
              <li><Icons.check/><span><b>Single invoice</b> across your whole fleet</span></li>
              <li><Icons.check/><span><b>Priority turnaround</b> to minimise downtime</span></li>
              <li><Icons.check/><span><b>Compliance</b> roller brake testing &amp; reporting</span></li>
            </ul>
          </div>
          <div data-reveal style={{"--i":1}}><FleetForm/></div>
        </div>
      </div></section>

      <CtaBand service="fleet" title="Partner with a workshop that shows up" sub="Join VIC SES, Grampians Health and Federation University. Let's build a fleet plan around your uptime."/>
    </div>
  );
}

/* ---------- CAR SERVICE ---------- */
const TIERS = [
  { name:"Essential", price:"$199", feat:false, inc:["Engine oil & filter change","Fluid top-ups & checks","Tyre pressures & condition","Battery & charging test","20-point safety check"] },
  { name:"Logbook", price:"$299", feat:true, inc:["Manufacturer logbook schedule","Genuine/OEM parts & fluids","Stamped & warranty-safe","Full diagnostic scan","Brake & suspension inspection","Free pickup & delivery (10km)"] },
  { name:"Major", price:"$449", feat:false, inc:["Everything in Logbook","Transmission & driveline service","Cooling system flush","Spark plugs / filters as due","Detailed condition report"] },
];

function CarServiceView(){
  return (
    <div className="view-body">
      <section className="hero"><div className="wrap">
        <Crumb trail={[["Home","/"],["Car Service & Logbook"]]}/>
        <div className="hero-grid">
          <div data-reveal>
            <Eyebrow>Factory-trained technicians</Eyebrow>
            <h1 className="h1" style={{marginTop:"18px"}}>Logbook servicing that <span className="hi">won't void</span> your warranty</h1>
            <p className="lead" style={{marginTop:"20px"}}>Warranty-safe logbook servicing for all makes and models at Wendouree's Repco Authorised Service Centre — with free pickup &amp; delivery within 10 km of the CBD.</p>
            <div className="hero-actions"><CallBtn lg/><BookBtn lg label="Book a service" service="vehicle-service"/></div>
            <div className="hero-chips"><span className="chip"><Icons.check/> ACCC-compliant logbook stamps</span><span className="chip"><Icons.truck/> Free pickup &amp; delivery</span></div>
          </div>
          <div className="hero-right" data-reveal style={{"--i":1}}>
            <Media style={{aspectRatio:"4 / 3.1"}} src="site/img/service-suv.jpg" tag="Servicing" caption="Genuine parts, warranty-safe" capIcon="wrench" alt="Modern SUV being serviced in the workshop"/>
          </div>
        </div>
      </div></section>

      <TrustBar/>

      <section className="section"><div className="wrap">
        <div className="card" data-reveal style={{padding:"26px 28px",display:"flex",gap:"18px",alignItems:"center",borderColor:"rgba(255,205,0,.28)"}}>
          <span style={{width:"48px",height:"48px",flex:"none",borderRadius:"12px",background:"var(--yellow)",color:"var(--ink)",display:"grid",placeItems:"center"}}><Icons.shield/></span>
          <p style={{margin:0,fontSize:"17px",color:"var(--txt-2)"}}><strong style={{color:"var(--txt)"}}>Logbook servicing with us won't void your new-car warranty.</strong> Under Australian Consumer Law you're free to choose any qualified workshop — we use genuine/OEM parts and stamp your logbook to schedule.</p>
        </div>

        <div className="shead" data-reveal style={{marginTop:"60px"}}><Eyebrow>Choose your service</Eyebrow><h2 className="h2">Transparent service tiers</h2></div>
        <div className="tiers">
          {TIERS.map((t,i)=>(
            <div key={i} className={"tier " + (t.feat?"feat":"")} data-reveal style={{"--i":i}}>
              {t.feat && <span className="tier-flag">Most popular</span>}
              <span className="tier-n">{t.name}</span>
              <span className="tier-p">{t.price}<span>/from</span></span>
              <ul>{t.inc.map((x,j)=><li key={j}><Icons.check/>{x}</li>)}</ul>
              <BookBtn label="Book this service" className={t.feat?"btn-primary":""} service="vehicle-service"/>
            </div>
          ))}
        </div>
        <p className="muted center" style={{marginTop:"18px",fontSize:"13.5px"}}>Indicative from-prices for common light vehicles. Final quote confirmed on booking.</p>
      </div></section>

      <CtaBand service="vehicle-service" title="Book your next service" sub="Genuine parts, warranty-safe stamps, and free pickup & delivery within 10 km of Ballarat CBD."/>
    </div>
  );
}

/* ---------- DIESEL ---------- */
const SPEC_GROUPS = [
  { system:"Engine & fuel", icon:"engine", rows:[
    { cap:"Common-rail diesel diagnosis", det:"Injector flow testing, rail pressure & ECU fault tracing", val:"≤2000 bar" },
    { cap:"Engine rebuilds", det:"In-frame & full rebuilds, machining liaison, dyno-safe assembly", val:"OEM spec" },
    { cap:"Turbo & induction", det:"Boost, actuator & EGR/DPF system service", val:"VGT / DPF" },
  ]},
  { system:"Hydraulics", icon:"droplet", rows:[
    { cap:"Hydraulic diagnosis", det:"Pump, ram & valve-bank pressure testing on plant & equipment", val:"≤350 bar" },
    { cap:"Hose & cylinder service", det:"Custom hose fabrication, seal kits & cylinder reseals", val:"On-site" },
  ]},
  { system:"Electrical & compliance", icon:"bolt", rows:[
    { cap:"Dealer-level diagnostics", det:"Multiplex/CAN-bus scanning across trucks, loaders & excavators", val:"CAN-bus" },
    { cap:"Roller brake testing", det:"Calibrated heavy-vehicle brake performance & compliance", val:"Calibrated" },
    { cap:"HV roadworthy & compliance", det:"Heavy vehicle inspection & defect rectification", val:"NHVR" },
  ]},
];
const EQUIP = [
  { icon:"truck", t:"Trucks & prime movers" },
  { icon:"cog", t:"Excavators & loaders" },
  { icon:"gauge", t:"Plant & equipment" },
  { icon:"droplet", t:"Hydraulic systems" },
];

function DieselView(){
  return (
    <div className="view-body">
      <section className="hero"><div className="wrap">
        <Crumb trail={[["Home","/"],["Diesel & Heavy Vehicle"]]}/>
        <div className="hero-grid">
          <div data-reveal>
            <Eyebrow>Trucks · Plant · Equipment</Eyebrow>
            <h1 className="h1" style={{marginTop:"18px"}}>Diesel &amp; heavy vehicle <span className="hi">specialists</span></h1>
            <p className="lead" style={{marginTop:"20px"}}>Hydraulic diagnosis, engine rebuilds and compliance inspections for trucks, excavators and loaders — with dealer-level diagnostics in Wendouree.</p>
            <div className="hero-actions"><CallBtn lg/><BookBtn lg label="Book an inspection" service="diesel-truck"/></div>
          </div>
          <div className="hero-right" data-reveal style={{"--i":1}}>
            <Media style={{aspectRatio:"4 / 3.2"}} src="site/img/diesel-patrol.jpg" tag="Heavy vehicle" caption="Dealer-level diagnostics" capIcon="gauge" alt="Nissan Patrol 4x4 raised on the hoist for heavy-vehicle work"/>
          </div>
        </div>
      </div></section>

      <TrustBar/>

      <section className="section"><div className="wrap">
        <div className="shead" data-reveal><Eyebrow>Capability</Eyebrow><h2 className="h2">What we work on</h2></div>
        <div className="svc-grid">
          {EQUIP.map((e,i)=>{ const Ico=Icons[e.icon]; return (
            <div key={i} className="svc-card static" style={{"--i":i%4}} data-reveal>
              <span className="svc-ico"><Ico/></span><h3 className="svc-t" style={{fontSize:"17px"}}>{e.t}</h3>
            </div>
          );})}
        </div>

        <div className="shead" data-reveal style={{marginTop:"60px"}}><Eyebrow>Diagnostic depth</Eyebrow><h2 className="h2">Technical specifications</h2><p className="lead">Capabilities grouped by system — the depth operators rely on for uptime and compliance.</p></div>
        <div className="spec" data-reveal style={{marginTop:"30px"}}>
          {SPEC_GROUPS.map((g,gi)=>{ const Ico=Icons[g.icon]; return (
            <div key={gi} className="spec-group">
              <div className="spec-head"><span className="si"><Ico/></span><h4>{g.system}</h4></div>
              {g.rows.map((r,ri)=>(
                <div key={ri} className="spec-row"><span className="cap">{r.cap}</span><span className="det">{r.det}</span><span className="val">{r.val}</span></div>
              ))}
            </div>
          );})}
        </div>
      </div></section>

      <CtaBand service="diesel-truck" title="Keep your gear earning" sub="Dealer-level diagnostics, hydraulic specialists and compliance testing — book your truck, plant or equipment in."/>
    </div>
  );
}

Object.assign(window, { FleetView, FleetForm, CarServiceView, DieselView });
