/* ============================================================
   Router — state-driven view swap with enter/leave transitions,
   reveal observer rebound per route, hash sync.
   ============================================================ */
const { useState: uSt, useEffect: uEf, useRef: uRf, useCallback } = React;

const ROUTES = {
  "/":                               () => <HomeView/>,
  "/roadworthy-certificate-ballarat":() => <RwcView/>,
  "/car-service-ballarat":           () => <CarServiceView/>,
  "/fleet-servicing-ballarat":       () => <FleetView/>,
  "/diesel-mechanic-ballarat":       () => <DieselView/>,
  "/classic-car-roadworthy-ballarat":() => <ClassicView/>,
  "/roadworthy-wendouree":           (r) => <LocationView route={r}/>,
  "/mechanic-wendouree":             (r) => <LocationView route={r}/>,
  "/mechanic-delacombe":             (r) => <LocationView route={r}/>,
  "/blog":                           () => <BlogView/>,
  "/blog-post":                      () => <ArticleView/>,
  "/contact":                        () => <ContactView/>,
  "/book-service":                   () => <BookServiceView/>,
};

function routeFromHash(){
  /* strip any ?query (e.g. /book-service?service=diesel) before matching the
     route; views read their own params straight from location.hash */
  const h = (location.hash || "").replace(/^#/, "");
  const path = h.split("?")[0];
  return ROUTES[path] ? path : "/";
}

function App(){
  const [route, setRoute] = uSt(routeFromHash);
  const [phase, setPhase] = uSt("in");          // 'in' | 'out'
  const [pending, setPending] = uSt(null);
  const scrollRef = uRf(null);

  /* navigate with leave→swap→enter */
  const go = useCallback((to)=>{
    to = to || "/";
    if(!ROUTES[to.split("?")[0]]) to = "/";   // validate by path, keep any ?query
    if(to === route){                          // already on this exact route (no query) → scroll up
      (scrollRef.current || window).scrollTo({ top:0, behavior:"smooth" });
      return;
    }
    setPhase("out");
    setPending(to);
  },[route]);

  /* when leaving anim finishes, swap content */
  uEf(()=>{
    if(phase !== "out") return;
    const t = setTimeout(()=>{
      setRoute(pending.split("?")[0]);   // route state holds the path; ?query stays in the hash
      if(location.hash.replace(/^#/,"") !== pending) location.hash = pending;
      const sc = scrollRef.current; if(sc) sc.scrollTop = 0;
      setPhase("in");
    }, 210);
    return ()=>clearTimeout(t);
  },[phase, pending]);

  /* respond to back/forward */
  uEf(()=>{
    const onHash = ()=>{ const r = routeFromHash(); setRoute(prev => prev===r ? prev : (setPhase("in"), r)); };
    window.addEventListener("hashchange", onHash);
    return ()=>window.removeEventListener("hashchange", onHash);
  },[]);

  /* reveal observer — rebind whenever the rendered view (route) changes */
  uEf(()=>{
    if(phase !== "in") return;
    const scope = scrollRef.current || document;
    const els = Array.from(scope.querySelectorAll("[data-reveal]"));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduce){ els.forEach(el=>el.classList.add("is-in")); return; }

    // stagger siblings: assign --i per group (parent) if not already set
    const groups = new Map();
    els.forEach(el=>{
      if(el.style.getPropertyValue("--i") === ""){
        const p = el.parentElement;
        const n = groups.get(p) || 0;
        el.style.setProperty("--i", n % 6);
        groups.set(p, n+1);
      }
    });

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold:0.12, rootMargin:"0px 0px -6% 0px" });
    els.forEach(el=>io.observe(el));

    // failsafe: any element in view but still hidden after a short beat is
    // force-revealed with the transition cleared, so a stalled transition can
    // never leave visible content invisible. Below-fold items keep their
    // scroll reveal via the observer above.
    const t = setTimeout(()=>{
      const vh = scope.clientHeight || window.innerHeight;
      els.forEach(el=>{
        if(el.classList.contains("is-in")) return;
        if(el.getBoundingClientRect().top < vh){
          el.style.transition = "none";
          el.classList.add("is-in");
        }
      });
    }, 650);
    return ()=>{ io.disconnect(); clearTimeout(t); };
  },[route, phase]);

  /* pointer-tracked glow on primary buttons (event delegation, survives view swaps) */
  uEf(()=>{
    const root = scrollRef.current || document;
    const onMove = (e)=>{
      const btn = e.target.closest && e.target.closest(".btn-primary");
      if(!btn) return;
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--gx", ((e.clientX-r.left)/r.width*100).toFixed(1)+"%");
      btn.style.setProperty("--gy", ((e.clientY-r.top)/r.height*100).toFixed(1)+"%");
    };
    root.addEventListener("pointermove", onMove, { passive:true });
    return ()=>root.removeEventListener("pointermove", onMove);
  },[]);

  const render = ROUTES[route] || ROUTES["/"];

  return (
    <NavCtx.Provider value={{ route, go }}>
      <div className="site-scroll" ref={scrollRef}>
        <Header/>
        <main className={"view " + phase} key={route}>
          {render(route)}
        </main>
        <Footer/>
      </div>
    </NavCtx.Provider>
  );
}

document.documentElement.classList.add("js");
/* Probe whether CSS transitions actually animate here. A running transition
   shows an INTERMEDIATE value shortly after the change; a frozen/disabled one
   stays at the start (0) or jumps to the end (1). Only enable reveal hiding
   ('anim') when we see a true mid-transition value — otherwise content is
   never hidden, so it can't get stuck invisible. */
(function(){
  const p = document.createElement("div");
  p.style.cssText = "position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;transition:opacity .6s linear;pointer-events:none";
  document.body.appendChild(p);
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>{ p.style.opacity = "1"; }); });
  setTimeout(()=>{
    const v = parseFloat(getComputedStyle(p).opacity);
    if(v > 0.02 && v < 0.98) document.documentElement.classList.add("anim");
    p.remove();
  }, 130);
})();
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
