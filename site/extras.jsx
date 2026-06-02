/* Extras — hero quote form, action/contact bar, testimonials, home FAQ data */
const { useState: uSx } = React;

/* ---------- Compact hero quote form ---------- */
function QuoteForm(){
  const [f, setF] = uSx({ name:"", phone:"", vehicle:"" });
  const [svc, setSvc] = uSx("Roadworthy certificate");
  const [err, setErr] = uSx({});
  const [done, setDone] = uSx(false);
  const upd = (k)=>(e)=>setF(s=>({...s,[k]:e.target.value}));
  const submit = (e)=>{
    e.preventDefault();
    const er={};
    if(!f.name.trim()) er.name="Please enter your name";
    if(!/^[0-9+()\s-]{8,}$/.test(f.phone)) er.phone="Enter a valid phone";
    setErr(er);
    if(Object.keys(er).length===0) setDone(true);
  };
  if(done) return (
    <div className="quote-card">
      <div className="form-ok" style={{padding:"10px 4px"}}>
        <div className="tick"><Icons.check/></div>
        <h3 className="h3" style={{fontSize:"24px"}}>Request sent</h3>
        <p className="muted" style={{margin:"8px 0 0",fontSize:"14.5px"}}>Thanks {f.name.split(" ")[0]||"there"} — we'll call {f.phone} to confirm your {svc.toLowerCase()}.</p>
        <a href={PHONE_TEL} className="btn btn-primary" style={{marginTop:"16px"}}><span aria-hidden="true">📞</span> {PHONE_DISPLAY}</a>
      </div>
    </div>
  );
  return (
    <form className="quote-card" onSubmit={submit} noValidate>
      <div className="quote-head">
        <span className="quote-kick">Fast response</span>
        <h3 className="quote-title">Book a service / request a quote</h3>
      </div>
      <div className="fl">
        <input value={f.name} onChange={upd("name")} placeholder=" " className={(f.name?"filled ":"") + (err.name?"invalid":"")}/>
        <label>Your name</label>{err.name && <span className="err">{err.name}</span>}
      </div>
      <div className="fl">
        <input value={f.phone} onChange={upd("phone")} placeholder=" " inputMode="tel" className={(f.phone?"filled ":"") + (err.phone?"invalid":"")}/>
        <label>Phone number</label>{err.phone && <span className="err">{err.phone}</span>}
      </div>
      <div className="fl">
        <input value={f.vehicle} onChange={upd("vehicle")} placeholder=" " className={f.vehicle?"filled":""}/>
        <label>Vehicle make &amp; model (optional)</label>
      </div>
      <div className="fl">
        <select value={svc} onChange={(e)=>setSvc(e.target.value)} style={{paddingTop:"22px"}}>
          <option>Roadworthy certificate</option><option>Car service / logbook</option>
          <option>Diesel / heavy vehicle</option><option>Classic / club permit</option><option>Fleet servicing</option>
        </select>
        <label style={{top:"8px",fontSize:"11px",letterSpacing:".05em",textTransform:"uppercase",color:"#7a6000"}}>What do you need?</label>
        <Icons.chevron className="sel-ico"/>
      </div>
      <button type="submit" className="btn btn-primary btn-block btn-lg">Request a quote <Icons.arrow/></button>
      <p className="form-note">No obligation · we usually reply within the hour during workshop hours.</p>
    </form>
  );
}

/* ---------- Prominent action / contact bar (below hero) ---------- */
function ActionBar(){
  const { go } = useNav();
  return (
    <section className="actionbar"><div className="wrap actionbar-in">
      <div className="ab-item">
        <span className="ab-ico"><Icons.phone/></span>
        <span className="ab-text"><span className="ab-l">Call us today</span><a className="ab-v" href={PHONE_TEL}>{PHONE_DISPLAY}</a></span>
      </div>
      <span className="ab-div"/>
      <div className="ab-item">
        <span className="ab-ico"><Icons.clock/></span>
        <span className="ab-text"><span className="ab-l">Open hours</span><span className="ab-v">Mon–Fri · 8am–5pm</span></span>
      </div>
      <button className="btn btn-primary btn-lg ab-cta" onClick={()=>go("/roadworthy-certificate-ballarat")}>
        <Icons.fileCheck/> Get a Roadworthy Inspection
      </button>
    </div></section>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  { n:"Margaret W.", loc:"Wendouree", t:"Booked a roadworthy and they found a small issue — fixed it the same day so I didn't have to come back. Lovely, honest people." },
  { n:"Trevor S.", loc:"Ballarat", t:"Been bringing our cars here for over fifteen years. Always straight with you about what needs doing and what can wait." },
  { n:"Daniel K.", loc:"Alfredton", t:"Logbook service done properly with genuine parts and stamped. Free pickup from home made it effortless." },
  { n:"Joanne P.", loc:"Delacombe", t:"Took my late father's classic in for a club permit inspection. They treated it with real care. Couldn't recommend more." },
  { n:"Fleet Manager", loc:"Grampians Health", t:"Reliable turnaround across our fleet with one point of contact. They keep our vehicles on the road." },
  { n:"Brett M.", loc:"Sebastopol", t:"Diesel ute had a power issue nobody else could pin down. Their diagnostics sorted it first go." },
];
function Stars(){ return (
  <span className="stars" aria-label="5 out of 5 stars">
    {[0,1,2,3,4].map(i=><Icons.star key={i} style={{fill:"var(--yellow)",stroke:"none"}}/>)}
  </span>
);}
function Testimonials({ light }){
  return (
    <section className="section" style={{paddingTop:0}}><div className="wrap">
      <div className="shead" data-reveal>
        <Eyebrow>What locals say</Eyebrow>
        <h2 className="h2">Trusted across the Goldfields</h2>
        <p className="lead">Real feedback from Ballarat &amp; Wendouree drivers, traders and fleets.</p>
      </div>
      <div className="tgrid">
        {TESTIMONIALS.map((r,i)=>(
          <figure key={i} className="tcard" data-reveal style={{"--i":i%3}}>
            <Stars/>
            <blockquote className="tquote">“{r.t}”</blockquote>
            <figcaption className="tauthor">
              <span className="ta-mark">{r.n.split(" ").map(w=>w[0]).join("").slice(0,2)}</span>
              <span><span className="ta-n">{r.n}</span><span className="ta-l">{r.loc}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="treview-strip" data-reveal>
        <Stars/>
        <span><strong>4.9 / 5</strong> · 300+ Google reviews</span>
      </div>
    </div></section>
  );
}

/* ---------- Home FAQ (the requested top queries) ---------- */
const HOME_FAQS = [
  { q:"How much does a roadworthy certificate cost in Ballarat?", a:"Roadworthy certificate pricing depends on the vehicle type, but light vehicles typically start from a competitive flat rate. Because we're a full workshop, if your vehicle needs minor rectification to pass we can quote and complete it on-site — so you avoid a separate booking. Call us for an exact price on your vehicle." },
  { q:"What is included in a basic car service?", a:"A basic (interim) service covers engine oil and filter replacement, fluid level checks and top-ups, tyre pressure and condition, a battery and charging test, and a multi-point safety inspection of brakes, lights and belts. We'll flag anything that needs attention before it becomes a problem." },
  { q:"How long does a vehicle inspection take?", a:"Most light-vehicle roadworthy inspections take around 1 to 1.5 hours. A basic service is usually completed the same day. We offer same-week bookings, and free pickup and delivery within 10 km of the Ballarat CBD if it's easier for you." },
  { q:"Do I need to book, or can I just drop in?", a:"We recommend booking so we can have an inspector ready for you, especially mid-week. Call (03) 5339 2056 or use the quote form and we'll confirm a time that suits." },
  { q:"Do you service all makes and models?", a:"Yes. As a Repco Authorised Service Centre our factory-trained technicians service all makes and models — and your logbook servicing with us won't void your new-car warranty." },
];
function HomeFaq(){
  return (
    <section className="section"><div className="wrap" style={{maxWidth:"860px"}}>
      <div className="shead center" data-reveal style={{textAlign:"center"}}>
        <Eyebrow>Frequently asked questions</Eyebrow>
        <h2 className="h2">Your questions, answered</h2>
      </div>
      <div data-reveal style={{marginTop:"34px"}}><Accordion items={HOME_FAQS}/></div>
    </div></section>
  );
}

Object.assign(window, { QuoteForm, ActionBar, Testimonials, HomeFaq, HOME_FAQS, TESTIMONIALS });
