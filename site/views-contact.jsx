/* Views — Contact (NAP details, message form, map embed, why-choose-us) */
const { useState: useCs } = React;

/* ---------- Message / booking form (modelled on FleetForm) ---------- */
function ContactForm(){
  const [f, setF] = useCs({ name:"", phone:"", email:"", vehicle:"", message:"" });
  const [err, setErr] = useCs({});
  const [done, setDone] = useCs(false);
  const upd = (k)=>(e)=>setF(s=>({...s,[k]:e.target.value}));
  const fld = (name, label, type="text", wide=false) => (
    <div className={"fl " + (wide?"full":"")}>
      <input type={type} value={f[name]} onChange={upd(name)} placeholder=" "
             className={(f[name]?"filled ":"") + (err[name]?"invalid":"")}
             inputMode={type==="tel"?"tel":undefined}/>
      <label>{label}</label>
      {err[name] && <span className="err">{err[name]}</span>}
    </div>
  );
  const submit = (e)=>{
    e.preventDefault();
    const er={};
    if(!f.name.trim()) er.name="Please enter your name";
    if(!/^[0-9+()\s-]{8,}$/.test(f.phone)) er.phone="Enter a valid phone";
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email="Enter a valid email";
    setErr(er);
    if(Object.keys(er).length===0) setDone(true);
  };
  if(done) return (
    <div className="card"><div className="form-ok">
      <div className="tick"><Icons.check/></div>
      <h3 className="h3">Message sent</h3>
      <p className="muted" style={{maxWidth:"40ch",margin:"10px auto 0"}}>
        Thanks {f.name.split(" ")[0]||"there"} — we've got your message and will get back to you shortly. For anything urgent, call {PHONE_DISPLAY}.
      </p>
      <a href={PHONE_TEL} className="btn btn-primary" style={{marginTop:"18px"}}><span aria-hidden="true">📞</span> {PHONE_DISPLAY}</a>
    </div></div>
  );
  return (
    <form className="card leadform" onSubmit={submit} noValidate>
      <h3 className="h3 full">Send us a message</h3>
      {fld("name","Your name")}
      {fld("phone","Phone number","tel")}
      {fld("email","Email address","email")}
      {fld("vehicle","Vehicle make & model (optional)")}
      <div className="fl full">
        <textarea value={f.message} onChange={upd("message")} placeholder=" " className={f.message?"filled":""}></textarea>
        <label>How can we help? (optional)</label>
      </div>
      <button className="btn btn-primary btn-block full" type="submit">Send message <Icons.arrow/></button>
      <p className="form-note full">No obligation — we usually reply within the hour during workshop hours. Or call {PHONE_DISPLAY}.</p>
    </form>
  );
}

/* ---------- Why choose us ---------- */
const WHY_US = [
  { icon:"award",     tag:"Local & independent",      title:"Family Owned",                        body:"A local, family-run workshop — the same trusted faces looking after Ballarat drivers for over 30 years." },
  { icon:"fileCheck", tag:"Approved & audited",        title:"Licensed Vehicle Testers",            body:"Two accredited Licensed Vehicle Testers on-site, approved to issue Victorian Certificates of Roadworthiness." },
  { icon:"clipboard", tag:"Fast & documented",         title:"Roadworthy Certificates",             body:"Properly-documented RWCs — and because we're a full workshop, we can rectify minor fails on the spot." },
  { icon:"shield",    tag:"Protection that travels",   title:"Nationwide Warranty",                 body:"As a Repco Authorised Service Centre, our work is backed by the Repco nationwide warranty, Australia-wide." },
  { icon:"truck",     tag:"Dealer-level diagnostics",  title:"Heavy Vehicle & Diesel Specialists",  body:"Diesel vehicles, 4WDs, trucks, plant and equipment — diagnosed and repaired for uptime and compliance." },
  { icon:"building",  tag:"Commercial & government",   title:"Fleet Servicing",                     body:"Trusted by VIC SES, Grampians Health and Federation University, with priority booking and single-invoice reporting." },
];

const MAP_QUERY = "206+Burnbank+Street,+Wendouree+VIC+3355";

function ContactView(){
  return (
    <div className="view-body">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="hero"><div className="wrap">
        <Crumb trail={[["Home","/"],["Contact"]]}/>
        <div className="hero-grid">
          <div data-reveal>
            <Eyebrow>Get in touch · Wendouree, Ballarat</Eyebrow>
            <h1 className="h1" style={{marginTop:"18px"}}>Contact Neale Goad <span className="hi">Automotive</span></h1>
            <p className="lead" style={{marginTop:"20px"}}>Booking a service, chasing a roadworthy, or after a quote? Our Wendouree workshop is here to help — call us, drop in, or send a message and we'll get straight back to you.</p>
            <div className="hero-actions"><CallBtn lg label="Call Now"/><BookBtn lg label="Book a Service"/></div>
            <p className="biz-line" style={{marginTop:"22px"}}><strong>Neale Goad Automotive – Authorised Repco Service Centre</strong> · Licensed Vehicle Tester</p>
            <div className="hero-chips"><span className="chip"><Icons.clock/> Open Mon–Fri · 8am–5pm</span><span className="chip"><Icons.truck/> Free pickup within 10 km</span></div>
          </div>
          <div className="hero-right" data-reveal style={{"--i":1}}>
            <Media style={{aspectRatio:"4 / 3.2"}} src="assets/photos/facade.jpg" tag="Visit us" caption="206 Burnbank St, Wendouree" capIcon="pin" alt="Neale Goad Automotive workshop at 206 Burnbank Street, Wendouree"/>
          </div>
        </div>
      </div></section>

      <TrustBar/>

      {/* ─── Contact information ──────────────────────────────── */}
      <section className="section"><div className="wrap">
        <div className="shead" data-reveal>
          <Eyebrow>Contact details</Eyebrow>
          <h2 className="h2">How to reach us</h2>
          <p className="lead">Everything you need to get in touch or find the workshop.</p>
        </div>
        <div className="svc-grid">
          <div className="svc-card static" data-reveal style={{"--i":0}}>
            <span className="svc-ico"><Icons.pin/></span>
            <h3 className="svc-t">Visit the workshop</h3>
            <p className="svc-d">206 Burnbank Street<br/>Wendouree VIC 3355</p>
          </div>
          <div className="svc-card static" data-reveal style={{"--i":1}}>
            <span className="svc-ico"><Icons.phone/></span>
            <h3 className="svc-t">Call us</h3>
            <p className="svc-d"><a href={PHONE_TEL} style={{color:"var(--txt)",fontWeight:700}}>{PHONE_DISPLAY}</a></p>
          </div>
          <div className="svc-card static" data-reveal style={{"--i":2}}>
            <span className="svc-ico"><Icons.mail/></span>
            <h3 className="svc-t">Email us</h3>
            <p className="svc-d"><a href="mailto:service@goadgroup.com.au" style={{color:"var(--txt)",fontWeight:700,wordBreak:"break-word"}}>service@goadgroup.com.au</a></p>
          </div>
          <div className="svc-card static" data-reveal style={{"--i":3}}>
            <span className="svc-ico"><Icons.clock/></span>
            <h3 className="svc-t">Opening hours</h3>
            <p className="svc-d">Mon–Fri: 8:00 AM – 5:00 PM<br/>Saturday: Closed<br/>Sunday: Closed</p>
          </div>
        </div>
      </div></section>

      {/* ─── Message form + assurances ────────────────────────── */}
      <section className="section" style={{paddingTop:0}} id="contact-form"><div className="wrap">
        <div className="split">
          <div data-reveal>
            <Eyebrow>Send a message</Eyebrow>
            <h2 className="h2" style={{marginTop:"14px"}}>Request a booking or a quote</h2>
            <p className="lead" style={{marginTop:"16px"}}>Tell us about your vehicle and what you need. We'll get back to you quickly during workshop hours — or call us for an immediate answer.</p>
            <ul className="tlist">
              <li><Icons.check/><span><b>Two accredited inspectors</b> and same-week availability</span></li>
              <li><Icons.check/><span><b>Repco nationwide warranty</b> on all work</span></li>
              <li><Icons.check/><span><b>Free pickup &amp; delivery</b> within 10 km of the Ballarat CBD</span></li>
            </ul>
          </div>
          <div data-reveal style={{"--i":1}}><ContactForm/></div>
        </div>
      </div></section>

      {/* ─── Map ──────────────────────────────────────────────── */}
      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead center" data-reveal style={{margin:"0 auto",textAlign:"center"}}>
          <Eyebrow nb>Find us</Eyebrow>
          <h2 className="h2">206 Burnbank Street, Wendouree</h2>
          <p className="lead" style={{margin:"16px auto 0"}}>Easy to find in Wendouree with on-site parking — just minutes from the Ballarat CBD.</p>
        </div>
        <div className="contact-map-frame" data-reveal>
          <iframe
            title="Map to Neale Goad Automotive – 206 Burnbank Street, Wendouree VIC 3355"
            src={"https://www.google.com/maps?q=" + MAP_QUERY + "&output=embed"}
            loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"24px"}} data-reveal>
          <a href={"https://maps.google.com/?q=" + MAP_QUERY} target="_blank" rel="noopener" className="btn btn-primary">
            <Icons.nav/> Get directions
          </a>
        </div>
      </div></section>

      {/* ─── Why choose us ────────────────────────────────────── */}
      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead" data-reveal>
          <Eyebrow>Why choose us</Eyebrow>
          <h2 className="h2">A workshop Ballarat trusts</h2>
        </div>
        <div className="pillars">
          {WHY_US.map((p,i)=>{ const Ico = Icons[p.icon]; return (
            <article key={i} className="pillar" data-reveal style={{"--i":i%3}}>
              <span className="pillar-ico"><Ico/></span>
              <span className="pillar-tag">{p.tag}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-body">{p.body}</p>
            </article>
          );})}
        </div>
      </div></section>

      <CtaBand title="Book your service today" sub="One call sorts it — roadworthy, logbook service, diesel or fleet. Our Repco-backed Wendouree workshop usually has same-week availability."/>
    </div>
  );
}

Object.assign(window, { ContactView, ContactForm, WHY_US });
