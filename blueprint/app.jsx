/* ============================================================
   Blueprint renderer — sidebar scrollspy + safe code highlighter
   ============================================================ */
const { useState: uS, useEffect: uE, useRef: uR } = React;

/* ---- tiny inline icon set ---- */
const ic = (d, sw=2) => (p={}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw}
       strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...p}>{d}</svg>
);
const I = {
  shield: ic(<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></>),
  file: ic(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></>),
  pin: ic(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></>),
  truck: ic(<><path d="M10 17h4V5H2v12h3"/><path d="M15 8h4l3 3v6h-3"/><circle cx="7.5" cy="17.5" r="1.6"/><circle cx="17.5" cy="17.5" r="1.6"/></>),
  check: ic(<path d="M20 6 9 17l-5-5"/>, 2.3),
  arrow: ic(<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>),
  clock: ic(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  info: ic(<><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>),
  layers: ic(<><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>),
  code: ic(<><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></>),
  seo: ic(<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>),
  spark: ic(<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>),
  menu: ic(<><path d="M3 6h18M3 12h18M3 18h18"/></>),
};

/* ---- safe HTML/Blade highlighter (operates on escaped text) ---- */
function highlight(raw){
  let s = raw.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const TOKEN = /(\/\*[\s\S]*?\*\/)|((?<![:\/])\/\/[^\n]*)|(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?)([a-zA-Z][\w:-]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|([a-zA-Z_:][\w:-]*)(=)/g;
  return s.replace(TOKEN, (m, blk, line, html, br, tag, str, attr, eq) => {
    if(blk!=null)  return `<span class="c">${blk}</span>`;
    if(line!=null) return `<span class="c">${line}</span>`;
    if(html!=null) return `<span class="c">${html}</span>`;
    if(tag!=null)  return `${br}<span class="t">${tag}</span>`;
    if(str!=null)  return `<span class="s">${str}</span>`;
    if(attr!=null) return `<span class="a">${attr}</span>${eq}`;
    return m;
  });
}
function Code({ name, lang, code }){
  return (
    <div className="code">
      <div className="code-bar">
        <span className="code-dot" style={{background:"#ff5f57"}}></span>
        <span className="code-dot" style={{background:"#febc2e"}}></span>
        <span className="code-dot" style={{background:"#28c840"}}></span>
        {name && <span className="code-name" style={{marginLeft:"6px"}}>{name}</span>}
        <span className="code-lang">{lang}</span>
      </div>
      <pre><code dangerouslySetInnerHTML={{__html: highlight(code)}} /></pre>
    </div>
  );
}

/* ---- SEO config card ---- */
function SeoCard({ p }){
  const tLen = p.title.length, dLen = p.desc.length;
  const tOk = tLen <= 60, dOk = dLen >= 120 && dLen <= 160;
  return (
    <div className="card seo">
      <div className="seo-row">
        <div className="seo-k">Meta title</div>
        <div className="seo-v">
          <div className="val">{p.title}</div>
          <span className={"count " + (tOk?"ok":"warn")}><span className="dot"></span>{tLen} chars · {tOk?"within ~60":"trim toward ≤60"}</span>
        </div>
      </div>
      <div className="seo-row">
        <div className="seo-k">Meta description</div>
        <div className="seo-v">
          <div className="val">{p.desc}</div>
          <span className={"count " + (dOk?"ok":"warn")}><span className="dot"></span>{dLen} chars · {dOk?"in 120–160 sweet spot":"aim 120–160"}</span>
        </div>
      </div>
      <div className="seo-row">
        <div className="seo-k">Schema (JSON-LD)</div>
        <div className="seo-v">
          <div className="schema-tags">
            {p.schema.map((s,i)=><span key={i} className={"schema-tag " + (s.prim?"prim":"")}>{s.type}</span>)}
          </div>
          <p className="schema-note">{p.schemaNote}</p>
        </div>
      </div>
    </div>
  );
}

function Block({ n, title, icon, children }){
  return (
    <div className="block">
      <div className="block-h"><span className="bn">{n}</span>{icon}{title}</div>
      {children}
    </div>
  );
}

function PageSection({ p }){
  return (
    <section className="page-sec" id={p.id}>
      <div className="page-head">
        <span className={"page-badge " + (p.reuseOf?"ghost":"")}>{p.n}</span>
        <div>
          <h2>{p.nav}</h2>
          <code className="route">{p.route}</code>
          <p className="role">{p.role}</p>
        </div>
      </div>

      {p.templateNote &&
        <div className="note-card acc" style={{marginTop:"18px"}}>
          <span className="ni">{I.layers()}</span><div><b style={{color:"var(--txt)"}}>Template note — </b>{p.templateNote}</div>
        </div>}

      <Block n="1" title="Technical SEO Configuration" icon={I.seo({style:{color:"var(--accent)"}})}>
        <SeoCard p={p} />
      </Block>

      <Block n="2" title="Layout & Wireframe Architecture" icon={I.layers({style:{color:"var(--accent)"}})}>
        <div className="wire">
          {p.wireframe.map((w,i)=>(
            <div className="wire-row" key={i}>
              <span className="wire-i">{String(i+1).padStart(2,"0")}</span>
              <span className="wire-name">{w.name}</span>
              <span className="wire-note">{w.note}</span>
              {w.tag && <span className="wire-tag">{w.tag}</span>}
            </div>
          ))}
        </div>
      </Block>

      <Block n="3" title="Reusable Component Skeletons" icon={I.code({style:{color:"var(--accent)"}})}>
        {p.components.map((c,i)=>(
          <div key={i}>
            <div className="comp-name">{c.name}</div>
            <p className="comp-desc">{c.desc}</p>
            <Code name={c.name} lang={c.lang} code={c.code} />
          </div>
        ))}
      </Block>

      <Block n="4" title="Interactive Micro-Interactions" icon={I.spark({style:{color:"var(--accent)"}})}>
        <div className="card ix">
          {p.ix.map((x,i)=>(
            <div className="ix-row" key={i}>
              <div className="ix-el">{x.el}<span className="sub">{x.sub}</span></div>
              <div className="ix-cls">
                <code>{x.cls}</code>
                {x.note && <div className="note">{x.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </Block>
    </section>
  );
}

function Foundations({ g }){
  return (
    <section className="page-sec" id="foundations">
      <div className="page-head" style={{marginTop:0}}>
        <span className="page-badge ghost" style={{fontSize:"22px"}}>{I.layers({width:26,height:26})}</span>
        <div>
          <h2>Global Foundations</h2>
          <p className="role">Build these once. Every page template and ACF flexible block inherits the same tokens, trust spine, NAP and motion system — so the matrix stays consistent and maintainable.</p>
        </div>
      </div>

      <Block n="A" title="Brand Tokens" icon={I.spark({style:{color:"var(--accent)"}})}>
        <div className="kv">
          {g.brand.map((b,i)=>(
            <div className="kv-item" key={i}>
              <div className="k" style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <span style={{width:"14px",height:"14px",borderRadius:"4px",background:b.v,border:"1px solid rgba(255,255,255,.2)",flex:"none"}}></span>{b.k}
              </div>
              <div className="v mono">{b.v}</div>
              <div className="v mono" style={{color:"var(--txt-3)",fontSize:"12px",marginTop:"2px"}}>{b.token}</div>
            </div>
          ))}
        </div>
        <Code name="tailwind.config.js" lang="js" code={g.tailwindConfig} />
      </Block>

      <Block n="B" title="Cross-Page Trust Signals" icon={I.shield({style:{color:"var(--accent)"}})}>
        <div className="trust-grid">
          {g.trust.map((t,i)=>(
            <div className="trust-item" key={i}>
              <span className="ti">{I[t.icon] ? I[t.icon]() : I.check()}</span>
              <div><div className="tt">{t.t}</div><div className="ts">{t.s}</div></div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"14px"}} className="block-h">Institutional fleet partners</div>
        <div className="partner-row">
          {g.partners.map((p,i)=>(
            <div className="partner" key={i}>{p.n}<span className="ptype">{p.t}</span></div>
          ))}
        </div>
      </Block>

      <Block n="C" title="NAP — Canonical Citation" icon={I.pin({style:{color:"var(--accent)"}})}>
        <div className="card" style={{padding:"6px"}}>
          {g.nap.map((r,i)=>(
            <div className="seo-row" key={i}>
              <div className="seo-k">{r.k}</div>
              <div className="seo-v"><div className={"val " + (r.mono?"mono":"")}>{r.v}</div></div>
            </div>
          ))}
        </div>
        <div className="note-card" style={{marginTop:"14px"}}>
          <span className="ni">{I.info()}</span>
          <div>Keep NAP byte-for-byte identical across all 9 templates and your Google Business Profile. One master <b style={{color:"var(--txt)"}}>AutoRepair</b> entity — suburb pages vary only <code style={{fontFamily:"var(--ff-mono)",color:"var(--accent)"}}>areaServed</code>, never the address.</div>
        </div>
      </Block>

      <Block n="D" title="Shared Components" icon={I.code({style:{color:"var(--accent)"}})}>
        {g.components.map((c,i)=>(
          <div key={i}>
            <div className="comp-name">{c.name}</div>
            <p className="comp-desc">{c.desc}</p>
            <Code name={c.name} lang={c.lang} code={c.code} />
          </div>
        ))}
      </Block>

      <Block n="E" title="Baseline Micro-Interactions" icon={I.spark({style:{color:"var(--accent)"}})}>
        <div className="card ix">
          {g.baseIx.map((x,i)=>(
            <div className="ix-row" key={i}>
              <div className="ix-el">{x.el}<span className="sub">{x.sub}</span></div>
              <div className="ix-cls"><code>{x.cls}</code>{x.note && <div className="note">{x.note}</div>}</div>
            </div>
          ))}
        </div>
        <div className="comp-name" style={{marginTop:"22px"}}>Global reveal observer</div>
        <p className="comp-desc">One IntersectionObserver drives every <code style={{fontFamily:"var(--ff-mono)",color:"var(--accent)"}}>data-reveal</code> entrance, with per-group stagger and reduced-motion fallback.</p>
        <Code name="assets/js/global.js" lang="js" code={g.revealJS} />
      </Block>
    </section>
  );
}

function App(){
  const pages = [...window.NGA_PAGES_A, ...window.NGA_PAGES_B];
  const g = window.NGA_GLOBAL;
  const [active, setActive] = uS("foundations");
  const [open, setOpen] = uS(false);

  uE(()=>{
    const ids = ["foundations", ...pages.map(p=>p.id)];
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin:"-15% 0px -70% 0px", threshold:0 });
    ids.forEach(id=>{ const el=document.getElementById(id); if(el) io.observe(el); });
    return ()=>io.disconnect();
  },[]);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
  };

  const NavLink = ({id, num, label, route}) => (
    <a className={"side-link " + (active===id?"active":"")} onClick={(e)=>{e.preventDefault(); go(id);}} href={"#"+id}>
      <span className="side-num">{num}</span>
      <span style={{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{label}</span>
    </a>
  );

  return (
    <>
      <div className="toc-mobile">
        <button onClick={()=>setOpen(true)}>{I.menu({width:18,height:18})} Pages</button>
        <span className="tm-t">NGA Blueprint</span>
      </div>
      <div className={"scrim " + (open?"show":"")} onClick={()=>setOpen(false)}></div>

      <div className="doc">
        <aside className={"side " + (open?"open":"")}>
          <div className="side-brand">
            <NGLogo className="" style={{height:"30px"}} />
          </div>
          <div className="side-kicker" style={{padding:"0 10px"}}>Frontend &amp; Content Blueprint</div>
          <div className="side-sec">Foundations</div>
          <NavLink id="foundations" num={I.layers({width:13,height:13})} label="Global Foundations" />
          <div className="side-sec">9 Approved Pages</div>
          {pages.map(p=>(
            <NavLink key={p.id} id={p.id} num={p.n} label={p.nav} />
          ))}
        </aside>

        <main className="main">
          <div className="main-inner">
            <header className="doc-hero">
              <span className="eyebrow">Neale Goad Automotive – Authorised Repco Service Centre</span>
              <h1>Website Frontend &amp;<br/><span className="hl">Content Blueprint</span></h1>
              <p>A component-based build spec for the full site matrix — technical SEO, wireframe architecture, reusable Tailwind skeletons and micro-interactions, ready to parse into custom WordPress templates and ACF flexible-content loops.</p>
              <div className="doc-meta">
                <span className="meta-chip"><b>9</b> approved pages</span>
                <span className="meta-chip"><b>Repco</b> Authorised Service</span>
                <span className="meta-chip"><b>LVT</b> · 2 inspectors</span>
                <span className="meta-chip"><b>30+</b> yrs · Wendouree</span>
                <span className="meta-chip excl">LPG Conversion excluded</span>
              </div>
            </header>

            <Foundations g={g} />
            {pages.map(p=><PageSection key={p.id} p={p} />)}

            <footer style={{marginTop:"70px",paddingTop:"26px",borderTop:"1px solid var(--line)",color:"var(--txt-3)",fontSize:"13px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}}>
              <span>Neale Goad Automotive — site build blueprint</span>
              <span>Charcoal / vivid-yellow system · Barlow type · Tailwind + ACF</span>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
