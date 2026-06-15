/* Views — Book Service: a premium, Amelia-inspired booking funnel (/book-service)
   NOT a real calendar/scheduling system — it submits a booking REQUEST.
   Field name attributes are the portable keys for WordPress form plugins
   (Fluent Forms / WPForms / Gravity / Elementor / Amelia). */
const { useState: useBk, useEffect: useBkE } = React;

/* ---- Canonical services + aliases for ?service= preselection ---- */
const BOOK_SERVICES = [
  { key:"roadworthy",      label:"Roadworthy Certificate",  icon:"fileCheck", desc:"Licensed Vehicle Tester · same-week" },
  { key:"vehicle-service", label:"Vehicle Service",         icon:"wrench",    desc:"Logbook & general servicing, all makes" },
  { key:"mechanical",      label:"Mechanical Repairs",      icon:"cog",       desc:"Diagnostics & repairs, warranty-safe" },
  { key:"diesel-truck",    label:"Diesel & Truck",          icon:"truck",     desc:"Diesel, 4WD, trucks, plant & equipment" },
  { key:"fleet",           label:"Fleet Service",           icon:"building",  desc:"Commercial & government fleets" },
  { key:"classic",         label:"Classic Vehicles",        icon:"steering",  desc:"Club permit, restoration & care" },
  { key:"brakes",          label:"Brake Repairs",           icon:"gauge",     desc:"Pads, discs & full brake service" },
  { key:"other",           label:"Other / Not sure",        icon:"sparkle",   desc:"Tell us what your vehicle needs" },
];
const BOOK_ALIASES = {
  "service":"vehicle-service", "car-service":"vehicle-service", "car":"vehicle-service",
  "logbook":"vehicle-service", "logbook-service":"vehicle-service",
  "rwc":"roadworthy", "roadworthy-certificate":"roadworthy", "rego":"roadworthy",
  "repairs":"mechanical", "mechanical-repairs":"mechanical", "repair":"mechanical",
  "diesel":"diesel-truck", "truck":"diesel-truck", "4wd":"diesel-truck", "heavy":"diesel-truck",
  "brake":"brakes", "brake-repairs":"brakes",
  "classic-car":"classic", "vintage":"classic", "club-permit":"classic",
};
function normaliseService(raw){
  if(!raw) return "";
  const v = String(raw).toLowerCase().trim();
  if(BOOK_SERVICES.some(s=>s.key===v)) return v;
  return BOOK_ALIASES[v] || "";
}
function serviceFromHash(){
  const h = location.hash || "";
  const qi = h.indexOf("?");
  if(qi < 0) return "";
  try { return normaliseService(new URLSearchParams(h.slice(qi+1)).get("service")); }
  catch(e){ return ""; }
}

const BF_STEPS = ["Service","Vehicle","Time","Details","Review"];
const BF_TIMES = [
  { key:"Morning",   sub:"8am – 12pm",   icon:"sunrise" },
  { key:"Afternoon", sub:"12pm – 5pm",   icon:"sun" },
  { key:"Anytime",   sub:"I'm flexible", icon:"clock" },
];
const _MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmtDate(iso){ if(!iso) return ""; const p = iso.split("-"); return p.length===3 ? (+p[2]+" "+_MONTHS[+p[1]-1]+" "+p[0]) : iso; }

/* ---- floating-label field ---- */
function BkField({ name, label, type, value, onChange, err, wide }){
  return (
    <div className={"fl " + (wide?"full":"")}>
      <input name={name} type={type||"text"} value={value} onChange={onChange} placeholder=" "
             inputMode={type==="tel"?"tel":type==="number"?"numeric":undefined}
             className={(value?"filled ":"") + (err?"invalid":"")}/>
      <label>{label}</label>
      {err && <span className="err">{err}</span>}
    </div>
  );
}

/* persistent trust strip (shown on every step) */
function BfAssure(){
  return (
    <div className="bf-assure">
      <span><Icons.shield/> Repco Authorised</span>
      <span><Icons.fileCheck/> Licensed Vehicle Tester</span>
      <span><Icons.clock/> 30+ years</span>
      <span className="bf-assure-rate"><Icons.star style={{fill:"var(--yellow)",stroke:"none"}}/> 4.9</span>
    </div>
  );
}

/* ============ The premium funnel ============ */
function BookFunnel(){
  const preset = serviceFromHash();
  const [service, setService] = useBk(preset);
  const [step, setStep]       = useBk(preset ? 2 : 1);
  const [f, setF]             = useBk({ make:"", model:"", rego:"", year:"", odo:"", date:"", time:"Anytime", name:"", phone:"", email:"" });
  const [err, setErr]         = useBk({});
  const [done, setDone]       = useBk(false);
  const upd = (k)=>(e)=>setF(s=>({...s,[k]:e.target.value}));

  /* react to a new ?service= arriving from another booking CTA while mounted */
  useBkE(()=>{
    const onHash = ()=>{ const s = serviceFromHash(); if(s){ setService(s); setStep(2); setDone(false); } };
    window.addEventListener("hashchange", onHash);
    return ()=>window.removeEventListener("hashchange", onHash);
  },[]);

  const svc = BOOK_SERVICES.find(s=>s.key===service);
  const pct = Math.round((step / BF_STEPS.length) * 100);

  const goStep = (n)=>{ setErr({}); setStep(n); };
  const validateDetails = ()=>{
    const er={};
    if(!f.name.trim()) er.name="Please enter your name";
    if(!/^[0-9+()\s-]{8,}$/.test(f.phone)) er.phone="Enter a valid phone";
    if(f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email="Enter a valid email";
    setErr(er); return Object.keys(er).length===0;
  };
  const next = ()=>{
    if(step===4){ if(validateDetails()) setStep(5); return; }
    setStep(step+1);
  };
  const submit = (e)=>{ if(e) e.preventDefault(); setDone(true); };

  /* summaries for the review step */
  const vehicleStr = (()=>{
    const main = [f.year, f.make, f.model].filter(Boolean).join(" ");
    const extra = [f.rego && ("Rego "+f.rego.toUpperCase()), f.odo && (f.odo+" km")].filter(Boolean).join(" · ");
    return [main, extra].filter(Boolean).join(" · ") || "To be confirmed";
  })();
  const whenStr = (f.date ? fmtDate(f.date) : "Flexible") + " · " + f.time;
  const contactStr = [f.name, f.phone, f.email].filter(Boolean).join(" · ") || "—";

  /* ---- success ---- */
  if(done) return (
    <div className="bf-wizard bf-wizard--done" id="bf-form">
      <div className="bf-done">
        <div className="bf-done-tick"><Icons.check/></div>
        <h2 className="bf-done-h">Request received</h2>
        <p className="bf-done-p">
          Thanks {f.name.split(" ")[0]||"there"} — we've got your{svc?` ${svc.label.toLowerCase()}`:""} request and we'll call you on <strong>{f.phone}</strong> to confirm a time, usually within the hour during workshop hours.
        </p>
        <div className="bf-done-card">
          <div><span>Service</span><strong>{svc?svc.label:"—"}</strong></div>
          <div><span>Vehicle</span><strong>{vehicleStr}</strong></div>
          <div><span>Preferred</span><strong>{whenStr}</strong></div>
        </div>
        <a href={PHONE_TEL} className="btn btn-primary btn-lg"><span aria-hidden="true">📞</span> {PHONE_DISPLAY}</a>
        <p className="bf-done-note">Need it sooner? Call us now and mention your name.</p>
      </div>
    </div>
  );

  return (
    <div className="bf-wizard" id="bf-form">

      {/* step rail + progress */}
      <div className="bf-prog">
        <ol className="bf-steps" aria-label={"Step "+step+" of "+BF_STEPS.length}>
          {BF_STEPS.map((l,i)=>{ const n=i+1, state = step>n?"done":step===n?"on":""; return (
            <li key={i} className={"bf-stepi "+state}>
              <span className="bf-stepn">{step>n?<Icons.check/>:n}</span>
              <span className="bf-stepl">{l}</span>
            </li>
          );})}
        </ol>
        <p className="bf-stepmob">Step {step} of {BF_STEPS.length} · <strong>{BF_STEPS[step-1]}</strong></p>
        <div className="bf-bar"><span style={{width:pct+"%"}}/></div>
      </div>

      {/* animated step pane */}
      <div className="bf-pane" key={step}>

        {/* STEP 1 — service */}
        {step===1 && (<>
          <h2 className="bf-steptitle">Choose your service</h2>
          <p className="bf-stepsub">Tap a service to continue — you can change it any time.</p>
          <div className="bf-cards" role="radiogroup" aria-label="Choose a service">
            {BOOK_SERVICES.map(s=>{ const Ico=Icons[s.icon]; const on=service===s.key; return (
              <button type="button" key={s.key} role="radio" aria-checked={on}
                      className={"bf-svc "+(on?"on":"")} onClick={()=>{ setService(s.key); setStep(2); }}>
                <span className="bf-svc-ico"><Ico/></span>
                <span className="bf-svc-t">{s.label}</span>
                <span className="bf-svc-d">{s.desc}</span>
                <span className="bf-svc-chk"><Icons.check/></span>
              </button>
            );})}
          </div>
        </>)}

        {/* STEP 2 — vehicle */}
        {step===2 && (<>
          <h2 className="bf-steptitle">Your vehicle</h2>
          <p className="bf-stepsub">Helps us prepare — everything here is optional.</p>
          {svc && <div className="bf-ctx"><span className="bf-ctx-ico"><Icons.check/></span> {svc.label} <button type="button" className="bf-change" onClick={()=>goStep(1)}>change</button></div>}
          <div className="bf-fields">
            <BkField name="vehicle_make"  label="Vehicle make"  value={f.make}  onChange={upd("make")}/>
            <BkField name="vehicle_model" label="Vehicle model" value={f.model} onChange={upd("model")}/>
            <BkField name="vehicle_rego"  label="Registration"  value={f.rego}  onChange={upd("rego")}/>
            <BkField name="vehicle_year"  label="Year"          value={f.year}  onChange={upd("year")} type="number"/>
            <BkField name="vehicle_odo"   label="Odometer (km)" value={f.odo}   onChange={upd("odo")}  type="number" wide/>
          </div>
        </>)}

        {/* STEP 3 — preferred appointment */}
        {step===3 && (<>
          <h2 className="bf-steptitle">Preferred appointment</h2>
          <p className="bf-stepsub">A preference only — we'll call to confirm the exact time.</p>
          <div className="bf-pickdate">
            <span className="bf-pickdate-ico"><Icons.calendar/></span>
            <div className="fl bf-date">
              <input name="preferred_date" type="date" value={f.date} onChange={upd("date")} className="filled"/>
              <label>Preferred date (optional)</label>
            </div>
          </div>
          <p className="bf-q">Preferred time of day</p>
          <div className="bf-times" role="radiogroup" aria-label="Preferred time">
            {BF_TIMES.map(t=>{ const Ico=Icons[t.icon]; const on=f.time===t.key; return (
              <button type="button" key={t.key} role="radio" aria-checked={on}
                      className={"bf-time "+(on?"on":"")} onClick={()=>setF(s=>({...s,time:t.key}))}>
                <span className="bf-time-ico"><Ico/></span>
                <span className="bf-time-t">{t.key}</span>
                <span className="bf-time-s">{t.sub}</span>
                <span className="bf-svc-chk"><Icons.check/></span>
              </button>
            );})}
          </div>
        </>)}

        {/* STEP 4 — your details */}
        {step===4 && (<>
          <h2 className="bf-steptitle">Your details</h2>
          <p className="bf-stepsub">So we can reach you to confirm — we never share your details.</p>
          <div className="bf-fields">
            <BkField name="name"  label="Full name"        value={f.name}  onChange={upd("name")}  err={err.name} wide/>
            <BkField name="phone" label="Phone number"     value={f.phone} onChange={upd("phone")} err={err.phone} type="tel"/>
            <BkField name="email" label="Email (optional)" value={f.email} onChange={upd("email")} err={err.email} type="email"/>
          </div>
        </>)}

        {/* STEP 5 — review */}
        {step===5 && (<>
          <h2 className="bf-steptitle">Review your request</h2>
          <p className="bf-stepsub">All good? Send it through and we'll be in touch.</p>
          <div className="bf-review">
            <div className="bf-rev-row"><span className="bf-rev-k"><Icons.wrench/> Service</span><span className="bf-rev-v">{svc?svc.label:"—"}</span><button type="button" className="bf-edit" onClick={()=>goStep(1)}>Edit</button></div>
            <div className="bf-rev-row"><span className="bf-rev-k"><Icons.car/> Vehicle</span><span className="bf-rev-v">{vehicleStr}</span><button type="button" className="bf-edit" onClick={()=>goStep(2)}>Edit</button></div>
            <div className="bf-rev-row"><span className="bf-rev-k"><Icons.calendar/> Preferred</span><span className="bf-rev-v">{whenStr}</span><button type="button" className="bf-edit" onClick={()=>goStep(3)}>Edit</button></div>
            <div className="bf-rev-row"><span className="bf-rev-k"><Icons.phone/> Contact</span><span className="bf-rev-v">{contactStr}</span><button type="button" className="bf-edit" onClick={()=>goStep(4)}>Edit</button></div>
          </div>
          <button type="button" className="btn btn-primary btn-block btn-lg bf-submit" onClick={submit}><Icons.check/> Request Booking</button>
          <p className="bf-fineprint">No obligation · no deposit · we'll call to confirm. Free pickup &amp; delivery within 10&nbsp;km of the Ballarat CBD.</p>
        </>)}
      </div>

      {/* footer: persistent trust + nav */}
      <div className="bf-foot">
        <BfAssure/>
        {step!==1 && step!==5 && (
          <div className="bf-nav">
            <button type="button" className="btn btn-ghost bf-back" onClick={()=>goStep(step-1)}><Icons.arrow style={{transform:"rotate(180deg)"}}/> Back</button>
            <button type="button" className="btn btn-primary btn-lg bf-next" onClick={next}>Continue <Icons.arrow/></button>
          </div>
        )}
        {step===5 && (
          <div className="bf-nav">
            <button type="button" className="btn btn-ghost bf-back" onClick={()=>goStep(4)}><Icons.arrow style={{transform:"rotate(180deg)"}}/> Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- supporting content ---- */
const BOOK_TRUST = [
  { icon:"shield",    t:"Repco Authorised",        s:"Service Centre · nationwide warranty" },
  { icon:"fileCheck", t:"Licensed Vehicle Tester", s:"Two accredited inspectors on-site" },
  { icon:"clock",     t:"30+ Years Experience",    s:"Serving Ballarat since the 1990s" },
  { icon:"pin",       t:"Local Ballarat Workshop", s:"206 Burnbank St, Wendouree" },
];
const BOOK_FAQS = [
  { q:"Is this a confirmed booking?", a:"It's a booking request — we'll call you back to confirm a time that works for both of us. There's no deposit and no obligation." },
  { q:"How quickly will you get back to me?", a:"During workshop hours (Mon–Fri, 8am–5pm) we usually call back within the hour. Requests sent overnight or on weekends are answered first thing the next business day." },
  { q:"Do you offer pickup and delivery?", a:"Yes — free pickup and delivery within 10 km of the Ballarat CBD. Just mention it when we call and we'll arrange it." },
  { q:"What if my roadworthy fails?", a:"As a full Repco Authorised workshop with two Licensed Vehicle Testers on-site, we can rectify most issues straight away — so you don't need a second visit." },
];

function BookServiceView(){
  return (
    <div className="view-body bf-page">

      {/* ─── Slim premium hero ───────────────────────────────── */}
      <section className="bf-banner"><div className="wrap">
        <Crumb trail={[["Home","/"],["Book a Service"]]}/>
        <div className="bf-banner-in" data-reveal>
          <Eyebrow>Online booking · Wendouree, Ballarat</Eyebrow>
          <h1 className="h1" style={{marginTop:"14px"}}>Book your service in <span className="hi">minutes</span></h1>
          <p className="lead" style={{margin:"16px auto 0",maxWidth:"60ch"}}>Tell us what your vehicle needs and we'll call you back to confirm a time — usually within the hour during workshop hours. No deposit, no obligation.</p>
          <div className="bf-trustrow">
            <span><Icons.shield/> Repco Authorised Service Centre</span>
            <span><Icons.fileCheck/> Licensed Vehicle Tester</span>
            <span><Icons.clock/> 30+ Years Experience</span>
            <span><Icons.pin/> Local Ballarat Workshop</span>
            <span className="bf-rate"><span className="stars">{[0,1,2,3,4].map(i=><Icons.star key={i} style={{fill:"var(--yellow)",stroke:"none"}}/>)}</span> 4.9 · 300+ reviews</span>
          </div>
        </div>
      </div></section>

      {/* ─── The wizard (focal point) ────────────────────────── */}
      <section className="bf-stage"><div className="wrap">
        <BookFunnel/>
        <p className="bf-orcall">Prefer to talk? <a href={PHONE_TEL}><Icons.phone/> {PHONE_DISPLAY}</a> · Mon–Fri 8am–5pm</p>
      </div></section>

      {/* ─── Trust signals ───────────────────────────────────── */}
      <section className="section" style={{paddingTop:"40px"}}><div className="wrap">
        <div className="shead center" data-reveal style={{margin:"0 auto",textAlign:"center"}}>
          <Eyebrow>Why book with us</Eyebrow>
          <h2 className="h2">A Ballarat workshop you can trust</h2>
        </div>
        <div className="bf-badges" data-reveal>
          {BOOK_TRUST.map((b,i)=>{ const Ico=Icons[b.icon]; return (
            <div key={i} className="badge-pill" style={{"--i":i%4}}>
              <span className="bp-ico"><Ico/></span>
              <span><span className="bp-t">{b.t}</span><span className="bp-s">{b.s}</span></span>
            </div>
          );})}
        </div>
      </div></section>

      {/* ─── Booking FAQ ─────────────────────────────────────── */}
      <section className="section" style={{paddingTop:0}}><div className="wrap" style={{maxWidth:"860px"}}>
        <div className="shead center" data-reveal style={{textAlign:"center",margin:"0 auto"}}>
          <Eyebrow>Good to know</Eyebrow>
          <h2 className="h2">Booking questions</h2>
        </div>
        <div data-reveal style={{marginTop:"34px"}}><Accordion items={BOOK_FAQS}/></div>
      </div></section>

      {/* ─── Local NAP CTA ───────────────────────────────────── */}
      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="ctaband" data-reveal>
          <Eyebrow nb>Wendouree, Ballarat</Eyebrow>
          <h2 className="h2" style={{marginTop:"14px"}}>Ready to book your service?</h2>
          <p className="lead center" style={{margin:"16px auto 0"}}>Neale Goad Automotive – Authorised Repco Service Centre · 206 Burnbank Street, Wendouree VIC 3355 · Mon–Fri 8am–5pm</p>
          <div className="ctaband-actions">
            <a href={PHONE_TEL} className="btn btn-primary btn-lg"><span aria-hidden="true">📞</span> Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </div></section>

    </div>
  );
}

Object.assign(window, { BookServiceView, BookFunnel, BOOK_SERVICES, normaliseService });
