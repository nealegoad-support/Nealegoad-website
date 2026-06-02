/* Booking modal — real form validation + success state */
const { useState } = React;

const SERVICES = [
  "Roadworthy Certificate (RWC)",
  "RWC + minor rectification",
  "Club permit / Vintage & Classic inspection",
  "General service & repair",
  "Not sure — need advice",
];

function Field({ label, error, children, hint }){
  return (
    <label className="bk-field">
      <span className="bk-label">{label}</span>
      {children}
      {hint && !error && <span className="bk-hint">{hint}</span>}
      {error && <span className="bk-err">{error}</span>}
    </label>
  );
}

function BookingModal({ open, onClose }){
  const [f, setF] = useState({ name:"", phone:"", rego:"", service:SERVICES[0], date:"", notes:"" });
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.value }));

  if(!open) return null;

  const validate = () => {
    const e = {};
    if(!f.name.trim()) e.name = "Please enter your name";
    if(!/^[0-9+()\s-]{8,}$/.test(f.phone.trim())) e.phone = "Enter a valid contact number";
    if(!f.rego.trim()) e.rego = "Vehicle rego or make/model helps us prep";
    if(!f.date) e.date = "Pick a preferred date";
    setErr(e);
    return Object.keys(e).length === 0;
  };
  const submit = (ev) => { ev.preventDefault(); if(validate()) setDone(true); };
  const close = () => { setDone(false); setErr({}); onClose(); };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bk-overlay" onMouseDown={close}>
      <div className="bk-modal card" onMouseDown={e=>e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="bk-close" onClick={close} aria-label="Close"><X/></button>

        {!done ? (
          <>
            <div className="bk-head">
              <p className="eyebrow no-rule">Book an inspection</p>
              <h3 className="h2" style={{fontSize:"32px"}}>Reserve your roadworthy slot</h3>
              <p className="bk-sub">Wendouree &amp; Ballarat · 2 accredited inspectors on-site · same-week availability</p>
            </div>

            <form className="bk-form" onSubmit={submit} noValidate>
              <div className="bk-grid">
                <Field label="Full name" error={err.name}>
                  <input className="inp" value={f.name} onChange={set("name")} placeholder="e.g. Jordan Mills" />
                </Field>
                <Field label="Contact number" error={err.phone}>
                  <input className="inp" value={f.phone} onChange={set("phone")} placeholder="04xx xxx xxx" inputMode="tel" />
                </Field>
                <Field label="Vehicle rego / make &amp; model" error={err.rego}>
                  <input className="inp" value={f.rego} onChange={set("rego")} placeholder="e.g. 1AB-2CD · Toyota Hilux" />
                </Field>
                <Field label="Preferred date" error={err.date}>
                  <input className="inp" type="date" min={today} value={f.date} onChange={set("date")} />
                </Field>
              </div>

              <Field label="What do you need?">
                <div className="bk-select-wrap">
                  <select className="inp" value={f.service} onChange={set("service")}>
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown/>
                </div>
              </Field>

              <Field label="Anything we should know? (optional)" hint="Tell us about known faults — we can plan rectification in the same visit.">
                <textarea className="inp" rows="2" value={f.notes} onChange={set("notes")} placeholder="e.g. brake light intermittent, due for sale next week" />
              </Field>

              <div className="bk-actions">
                <button type="submit" className="btn btn-primary btn-block btn-lg">Request booking <ArrowRight/></button>
                <a href="tel:+61353392056" className="btn btn-ghost btn-block">
                  <Phone/> Or call (03) 5339 2056
                </a>
              </div>
              <p className="bk-fine">No obligation. We'll confirm your slot by phone, usually within the hour during workshop hours.</p>
            </form>
          </>
        ) : (
          <div className="bk-success">
            <div className="bk-tick"><Check/></div>
            <h3 className="h2" style={{fontSize:"34px"}}>Request received</h3>
            <p className="bk-sub" style={{maxWidth:"36ch",margin:"10px auto 0"}}>
              Thanks {f.name.split(" ")[0] || "there"} — we've got your details for a <strong style={{color:"var(--txt)"}}>{f.service}</strong> on <strong style={{color:"var(--txt)"}}>{f.date}</strong>. Our team will call <strong style={{color:"var(--txt)"}}>{f.phone}</strong> to lock it in.
            </p>
            <div className="bk-success-card">
              <span>Prefer to talk now?</span>
              <a href="tel:+61353392056" className="btn btn-primary"><Phone/> (03) 5339 2056</a>
            </div>
            <button className="btn btn-ghost" onClick={close} style={{marginTop:"6px"}}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

window.BookingModal = BookingModal;
