/* Main app — landing page + device-frame showcase + Tweaks */
const { useState: uS, useEffect: uE, useRef: uR } = React;

function LandingPage({ onBook, heroVariant }){
  return (
    <div className="ng">
      <Header onBook={onBook} />
      <main>
        <Hero onBook={onBook} variant={heroVariant} />
        <Trust />
        <Showcase />
        <Heritage />
        <Fleet />
        <FinalCTA onBook={onBook} />
      </main>
      <Footer />
      <div className="mobile-callbar">
        <a href="tel:+61353392056" className="btn btn-primary"><Phone/> Call to book</a>
        <button className="btn btn-ghost" onClick={onBook}><Calendar/> Online</button>
      </div>
    </div>
  );
}

/* ===== Motion system: scroll reveals + magnetic buttons + pointer glow ===== */
function useMotion(scopeRef, deps){
  uE(()=>{
    const root = scopeRef.current || document;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scroller = root.querySelector(".ng-scroll");          // phone-screen in mobile, else null=window
    const vh = () => window.innerHeight || 800;

    // 1) scroll-reveal — Web Animations API locks the end state (immune to React re-renders)
    const revealEls = Array.from(root.querySelectorAll("[data-reveal]"));
    document.documentElement.classList.add("motion-ready");   // gate the hidden state (JS alive)
    const EASE = "cubic-bezier(.22,.61,.36,1)";
    const reveal = (el) => {
      if(el.__rv) return; el.__rv = 1;
      const i = parseFloat(el.style.getPropertyValue("--i")) || 0;
      const scaled = el.getAttribute("data-reveal") === "scale";
      const from = { opacity:0, transform: scaled ? "translateY(26px) scale(.972)" : "translateY(26px)" };
      try{
        el.animate([from, { opacity:1, transform:"none" }],
          { duration: reduce ? 1 : 720, delay: reduce ? 0 : i*90, easing: EASE, fill:"both" });
      }catch(e){ el.style.opacity = "1"; el.style.transform = "none"; }
    };
    const sweep = () => {
      revealEls.forEach(el=>{
        if(el.__rv) return;
        const r = el.getBoundingClientRect();
        if(r.top < vh() * 1.02 && r.bottom > -80) reveal(el);
      });
    };
    let io;
    if(window.IntersectionObserver){
      io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ reveal(e.target); io.unobserve(e.target); } });
      }, { root: scroller || null, threshold:0.1, rootMargin:"0px 0px -6% 0px" });
      revealEls.forEach(el=>io.observe(el));
    }
    requestAnimationFrame(sweep);
    [120, 400, 900].forEach(t=>setTimeout(sweep, t));
    setTimeout(()=>revealEls.forEach(reveal), 1600);   // failsafe: never leave content hidden
    const onScroll = () => sweep();
    const scTarget = scroller || window;
    scTarget.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("load", sweep);

    // 2) magnetic buttons + pointer-tracked glow
    const cleanups = [];
    if(!reduce && !window.matchMedia("(hover: none)").matches){
      root.querySelectorAll("[data-magnetic]").forEach(el=>{
        const strength = 0.26;
        const move = (ev)=>{
          const r = el.getBoundingClientRect();
          const x = ev.clientX - (r.left + r.width/2);
          const y = ev.clientY - (r.top + r.height/2);
          el.style.setProperty("--mx", (x*strength).toFixed(1)+"px");
          el.style.setProperty("--my", (y*strength).toFixed(1)+"px");
          if(el.hasAttribute("data-glow")){
            el.style.setProperty("--gx", ((ev.clientX-r.left)/r.width*100).toFixed(1)+"%");
            el.style.setProperty("--gy", ((ev.clientY-r.top)/r.height*100).toFixed(1)+"%");
          }
        };
        const reset = ()=>{ el.style.setProperty("--mx","0px"); el.style.setProperty("--my","0px"); };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", reset);
        cleanups.push(()=>{ el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); });
      });
    }
    return ()=>{
      if(io) io.disconnect();
      scTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", sweep);
      cleanups.forEach(fn=>fn());
    };
  }, deps);
}

/* derive a soft glow rgba from a hex accent */
function hexGlow(hex, a){
  const h = hex.replace("#",""); const n = h.length===3 ? h.split("").map(c=>c+c).join("") : h;
  const r=parseInt(n.slice(0,2),16), g=parseInt(n.slice(2,4),16), b=parseInt(n.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FFCD00",
  "heroVariant": "showcase",
  "cardStyle": "filled",
  "phoneEmoji": true
}/*EDITMODE-END*/;

function App(){
  const [mode, setMode] = uS("desktop");        // desktop | mobile
  const [booking, setBooking] = uS(false);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const phoneRef = uR(null);
  const [scale, setScale] = uS(1);
  const stageRef = uR(null);

  /* (re)bind motion whenever the rendered tree changes (mode/variant) */
  useMotion(stageRef, [mode, t.heroVariant, t.cardStyle]);

  /* apply accent tokens globally */
  uE(()=>{
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-2", t.accent);
    r.setProperty("--accent-glow", hexGlow(t.accent, .16));
  },[t.accent]);

  /* scale the phone bezel to fit the viewport height */
  uE(()=>{
    if(mode!=="mobile") return;
    const fit = ()=>{
      const avail = window.innerHeight - 130;       // leave room for toggle
      const s = Math.min(1, avail / 860);
      setScale(s);
    };
    fit(); window.addEventListener("resize", fit);
    return ()=> window.removeEventListener("resize", fit);
  },[mode]);

  const rootClass =
    (t.cardStyle === "outline" ? "style-outline " : "") +
    (t.phoneEmoji ? "" : "no-emoji ");

  const page = <LandingPage onBook={()=>setBooking(true)} heroVariant={t.heroVariant} />;

  return (
    <div className={"stage " + rootClass} data-mode={mode} ref={stageRef}>
      {mode === "desktop" ? (
        <div className="desktop-flow">{page}</div>
      ) : (
        <div className="phone-stage">
          <div className="phone" style={{ transform:`scale(${scale})` }}>
            <div className="phone-notch" />
            <div className="phone-screen ng-scroll is-mobile" ref={phoneRef}>{page}</div>
          </div>
        </div>
      )}

      {/* viewport toggle */}
      <div className="vp-toggle">
        <span className="vp-label">Preview</span>
        <button className={mode==="desktop"?"on":""} onClick={()=>setMode("desktop")}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          Desktop
        </button>
        <button className={mode==="mobile"?"on":""} onClick={()=>setMode("mobile")}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>
          Mobile
        </button>
      </div>

      <BookingModal open={booking} onClose={()=>setBooking(false)} />

      <TweaksPanel>
        <TweakSection label="Brand accent" />
        <TweakColor label="Logo yellow" value={t.accent}
          options={["#FFCD00","#FFE000","#FFB000","#F4C20D"]}
          onChange={(v)=>setTweak("accent", v)} />
        <TweakSection label="Hero layout" />
        <TweakRadio label="Right column" value={t.heroVariant}
          options={["showcase","badges"]}
          onChange={(v)=>setTweak("heroVariant", v)} />
        <TweakSection label="Cards & icons" />
        <TweakRadio label="Style" value={t.cardStyle}
          options={["filled","outline"]}
          onChange={(v)=>setTweak("cardStyle", v)} />
        <TweakSection label="Copy" />
        <TweakToggle label="📞 emoji in call buttons" value={t.phoneEmoji}
          onChange={(v)=>setTweak("phoneEmoji", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
