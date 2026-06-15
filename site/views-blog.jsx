/* Blog — listing (featured + filterable grid) and article reading view */
const { useState: uSb } = React;

const POSTS = [
  {
    slug:"roadworthy-checklist-before-you-book",
    cat:"Roadworthy",
    title:"5 things to check before you book a roadworthy",
    excerpt:"A few minutes in the driveway can save you a failed inspection — and a second trip. Here's what our inspectors see fail most often.",
    date:"May 28, 2026", read:"4 min", author:"Neale Goad Automotive",
    icon:"fileCheck", featured:true, img:"site/img/underbody.jpg",
    body:[
      ["p","A roadworthy certificate isn't a formality — it's a safety standard set by VicRoads, and small, easily-fixed faults are the most common reason vehicles don't pass first time. The good news: most are visible from your own driveway."],
      ["quote","If it's visible from the driver's seat or the driveway, an inspector will see it too — a five-minute walk-around saves a wasted trip."],
      ["h","1. Tyres and tread"],
      ["p","Check tread depth across the full width of each tyre (the legal minimum is 1.5mm), and look for uneven wear, cracking or bulges. Mismatched tyres on the same axle are a common fail."],
      ["h","2. Lights, every one of them"],
      ["p","Walk around with the lights on: headlights (low and high beam), indicators, brake lights, reverse and number-plate lights. A blown globe is a 30-second fix that otherwise fails the inspection."],
      ["h","3. Windscreen and wipers"],
      ["p","Chips or cracks in the driver's line of sight are an automatic fail. Worn wiper blades that smear rather than clear are too."],
      ["h","4. Brakes and handbrake"],
      ["p","Listen for grinding and feel for a spongy pedal. Your handbrake should hold the car firmly on a slope."],
      ["h","5. Fluid leaks"],
      ["p","Check where you park for fresh oil or coolant stains. Leaks need rectification before a certificate can be issued."],
      ["h","Your quick pre-check summary"],
      ["ul",["Tyres: tread above 1.5mm, no cracks or bulges","Lights: every globe working, front and rear","Windscreen: no chips in the driver's line of sight","Brakes: firm pedal, handbrake holds on a hill","No fresh oil or coolant pooling under the car"]],
      ["cta","Not sure where you stand? Book an inspection and — because we're a full workshop — we can fix what fails on the spot."],
    ],
  },
  {
    slug:"logbook-servicing-wont-void-warranty",
    cat:"Servicing",
    title:"Logbook servicing won't void your new-car warranty",
    excerpt:"It's one of the most persistent myths in motoring. Under Australian Consumer Law, you can choose where your car is serviced.",
    date:"May 19, 2026", read:"3 min", author:"Neale Goad Automotive",
    icon:"wrench", img:"site/img/service-aircon.jpg",
    body:[
      ["p","Plenty of drivers believe they must return to the dealership for servicing or risk losing their new-car warranty. It isn't true."],
      ["h","What the law actually says"],
      ["p","Under Australian Consumer Law, you're free to have your vehicle serviced by any qualified workshop, provided the work follows the manufacturer's logbook schedule and uses parts that meet specification. Your warranty stays intact."],
      ["h","How we keep it warranty-safe"],
      ["p","We service strictly to your manufacturer's logbook, use genuine or OEM-equivalent parts and fluids, and stamp your logbook to schedule — so your service history is complete and your warranty protected, backed by the Repco nationwide warranty."],
      ["cta","Due for a service? We'll stamp your logbook and pick up and deliver within 10km of the Ballarat CBD."],
    ],
  },
  {
    slug:"winter-driving-ballarat-checklist",
    cat:"Maintenance",
    title:"Getting your car ready for a Ballarat winter",
    excerpt:"Frosty mornings and wet roads are hard on a vehicle. A short pre-winter check keeps you safe through the cold months.",
    date:"May 6, 2026", read:"5 min", author:"Neale Goad Automotive",
    icon:"droplet", img:"site/img/service-renault.jpg",
    body:[
      ["p","Ballarat winters test the parts of your car you rely on most: battery, brakes, tyres and visibility. A quick check now avoids a roadside breakdown later."],
      ["h","Battery"],
      ["p","Cold weather is the most common time for a tired battery to give up. We can test charge and cranking capacity in minutes."],
      ["h","Tyres and brakes"],
      ["p","Wet roads mean longer stopping distances. Good tread and healthy brakes matter more than ever — this is worth a professional check before the worst of the weather."],
      ["h","Visibility"],
      ["p","Top up washer fluid, replace smearing wipers, and make sure your demister and lights all work."],
      ["cta","Book a pre-winter check and head into the cold months with confidence."],
    ],
  },
  {
    slug:"club-permit-scheme-explained",
    cat:"Classic",
    title:"The Club Permit Scheme, explained for enthusiasts",
    excerpt:"Keeping a classic road-legal in Victoria is simpler than many owners think. Here's how the CPS works and what you need.",
    date:"Apr 24, 2026", read:"4 min", author:"Neale Goad Automotive",
    icon:"steering", img:"site/img/classic-monaro.jpg",
    body:[
      ["p","Victoria's Club Permit Scheme (CPS) lets owners of eligible classic and vintage vehicles drive on reduced-cost permits — but it comes with conditions worth understanding."],
      ["h","Eligibility"],
      ["p","Vehicles are generally eligible at 25 years or older. You'll need membership of a VicRoads-recognised car club and a vehicle in roadworthy, safe condition."],
      ["h","45 or 90-day logbooks"],
      ["p","The CPS uses a logbook of permitted days. We help keep your vehicle compliant and properly inspected so your days on the road are trouble-free."],
      ["h","Why a specialist matters"],
      ["p","Classic vehicles deserve an inspector who understands them. As an experienced Licensed Vehicle Tester, we handle CPS safety inspections with the care these machines deserve."],
      ["cta","Own a classic? Book a CPS inspection and keep it road-legal."],
    ],
  },
  {
    slug:"fleet-uptime-preventative-maintenance",
    cat:"Fleet",
    title:"How preventative maintenance protects fleet uptime",
    excerpt:"For organisations like VIC SES and Grampians Health, a vehicle off the road is a service interruption. Planning prevents it.",
    date:"Apr 11, 2026", read:"4 min", author:"Neale Goad Automotive",
    icon:"building", img:"site/img/fleet-van.jpg",
    body:[
      ["p","When your vehicles are essential to delivering a service, unplanned breakdowns cost far more than the repair. Preventative maintenance turns surprises into scheduled, manageable work."],
      ["h","Scheduled servicing"],
      ["p","Planned servicing intervals catch wear before it becomes failure — brakes, belts, fluids and tyres addressed on a known timeline rather than at the roadside."],
      ["h","One point of contact, one invoice"],
      ["p","We coordinate your fleet's servicing with priority booking and consolidated reporting, so your team spends less time managing vehicles and more time on the job."],
      ["h","Compliance built in"],
      ["p","Onsite roller brake testing and heavy-vehicle compliance keep your fleet legal and audit-ready."],
      ["cta","Run a fleet? Request a tailored proposal and protect your uptime."],
    ],
  },
  {
    slug:"diesel-warning-signs-dont-ignore",
    cat:"Diesel",
    title:"6 diesel warning signs you shouldn't ignore",
    excerpt:"Catching diesel and heavy-vehicle issues early is the difference between a service and a rebuild. Know what to watch for.",
    date:"Mar 30, 2026", read:"5 min", author:"Neale Goad Automotive",
    icon:"engine", img:"site/img/diesel-hilux.jpg",
    body:[
      ["p","Diesel engines are built to last — but ignoring early symptoms turns a manageable repair into an expensive rebuild. Here's what our heavy-vehicle technicians tell operators to watch."],
      ["h","Excessive smoke"],
      ["p","Black, blue or white smoke each point to different problems — from injectors to turbo seals. None should be ignored."],
      ["h","Power loss or poor starting"],
      ["p","Hard starting, hesitation or lost power often trace back to the fuel system, glow plugs or air intake."],
      ["h","Unusual noises and vibration"],
      ["p","Knocking, rattles or new vibration warrant a diagnostic scan before they escalate."],
      ["cta","Operating trucks, plant or equipment? Book a dealer-level diagnostic before small issues grow."],
    ],
  },
];

const CATS = ["All", "Roadworthy", "Servicing", "Maintenance", "Fleet", "Diesel", "Classic"];

function postMeta(p){
  return (
    <span className="bp-meta">
      <span className="bp-cat">{p.cat}</span>
      <span className="bp-dot">·</span>{p.date}
      <span className="bp-dot">·</span>{p.read} read
    </span>
  );
}

function openPost(slug, go){ window.__ngaPost = slug; go("/blog-post"); }

function BlogStickyCTA(){
  const { go } = useNav();
  const [hidden, setHidden] = uSb(false);
  React.useEffect(()=>{
    const sc = document.querySelector(".site-scroll");
    if(sc && !hidden) sc.style.paddingBottom = "104px";
    return ()=>{ if(sc) sc.style.paddingBottom = ""; };
  },[hidden]);
  if(hidden) return null;
  return (
    <div className="blog-cta-bar" role="region" aria-label="Book an inspection">
      <div className="wrap blog-cta-in">
        <div className="bcb-text"><strong>Due for a roadworthy?</strong> Licensed Vehicle Tester in Wendouree · same-week bookings.</div>
        <div className="bcb-actions">
          <button className="btn btn-primary" onClick={()=>go("/book-service?service=roadworthy")}><Icons.fileCheck/> Book a Roadworthy Certificate Inspection</button>
          <a className="btn btn-ghost bcb-call" href={PHONE_TEL}><Icons.phone/> Call now</a>
        </div>
        <button className="bcb-close" onClick={()=>setHidden(true)} aria-label="Dismiss"><Icons.x/></button>
      </div>
    </div>
  );
}

function BlogView(){
  const { go } = useNav();
  const [cat, setCat] = uSb("All");
  const [q, setQ] = uSb("");
  const featured = POSTS.find(p=>p.featured) || POSTS[0];
  const rest = POSTS.filter(p=>p!==featured);
  const query = q.trim().toLowerCase();
  const filtering = cat!=="All" || query!=="";
  const matches = POSTS.filter(p=>{
    const okCat = cat==="All" || p.cat===cat;
    const okQ = !query || (p.title+" "+p.excerpt+" "+p.cat).toLowerCase().includes(query);
    return okCat && okQ;
  });
  const shown = filtering ? matches : rest;
  const FIco = Icons[featured.icon];
  return (
    <div className="view-body">
      <section className="hero"><div className="wrap">
        <Crumb trail={[["Home","/"],["Blog & Advice"]]}/>
        <div data-reveal style={{maxWidth:"760px"}}>
          <Eyebrow>From the workshop</Eyebrow>
          <h1 className="h1" style={{marginTop:"16px"}}>Advice from <span className="hi">30+ years</span> on the tools</h1>
          <p className="lead" style={{marginTop:"18px"}}>Practical guides on roadworthy certificates, servicing, fleet uptime and keeping classics road-legal — straight from our Wendouree workshop.</p>
        </div>

        {/* featured (hidden while searching/filtering) */}
        {!filtering && (
        <article className="bp-featured" data-reveal style={{marginTop:"40px"}} onClick={()=>openPost(featured.slug, go)} role="link" tabIndex={0} onKeyDown={(e)=>{ if(e.key==="Enter") openPost(featured.slug, go); }}>
          <div className="bp-featured-media">
            <Media src={featured.img} tag="Featured" caption={featured.title} capIcon={featured.icon} alt={featured.title}/>
          </div>
          <div className="bp-featured-body">
            <span className="bp-flag"><FIco/> Featured</span>
            {postMeta(featured)}
            <h2 className="h2 bp-featured-t">{featured.title}</h2>
            <p className="lead">{featured.excerpt}</p>
            <span className="bp-read">Read article <Icons.arrow/></span>
          </div>
        </article>
        )}
      </div></section>

      <section className="section" style={{paddingTop:"56px"}}><div className="wrap">
        {/* search + category filter toolbar */}
        <div className="bp-toolbar" data-reveal>
          <div className="bp-search">
            <Icons.search/>
            <input type="search" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search articles…" aria-label="Search articles"/>
            {q && <button className="bp-search-clear" onClick={()=>setQ("")} aria-label="Clear search"><Icons.x/></button>}
          </div>
          <div className="bp-filter" role="tablist" aria-label="Filter by category">
            {CATS.map(c=>(
              <button key={c} className={"bp-chip " + (cat===c?"on":"")} onClick={()=>setCat(c)} aria-pressed={cat===c}>{c}</button>
            ))}
          </div>
        </div>

        {filtering && (
          <p className="bp-resultline" data-reveal>
            {shown.length} article{shown.length===1?"":"s"}{cat!=="All" ? " in " + cat : ""}{query ? " matching “"+q.trim()+"”" : ""}
          </p>
        )}

        <div className="bp-grid">
          {shown.map((p,i)=>{ const Ico=Icons[p.icon]; return (
            <article key={p.slug} className="bp-card" data-reveal style={{"--i":i%3}} onClick={()=>openPost(p.slug, go)} role="link" tabIndex={0} onKeyDown={(e)=>{ if(e.key==="Enter") openPost(p.slug, go); }}>
              <div className="bp-card-media"><Media src={p.img} capIcon={p.icon} alt={p.title}/></div>
              <div className="bp-card-body">
                {postMeta(p)}
                <h3 className="bp-card-t">{p.title}</h3>
                <p className="bp-card-x">{p.excerpt}</p>
                <span className="bp-read sm">Read <Icons.arrow/></span>
              </div>
              <span className="bp-card-ico"><Ico/></span>
            </article>
          );})}
        </div>
        {shown.length===0 && (
          <div className="bp-empty" data-reveal>
            <Icons.search/>
            <p>No articles match your search. Try a different term or category.</p>
            <button className="btn btn-ghost" onClick={()=>{ setQ(""); setCat("All"); }}>Clear filters</button>
          </div>
        )}
      </div></section>

      <CtaBand title="Questions about your vehicle?" sub="Reading is good — talking to an accredited inspector is better. Call us or book online."/>
      <BlogStickyCTA/>
    </div>
  );
}

function ArticleView(){
  const { go } = useNav();
  const [slug, setSlug] = uSb(()=> window.__ngaPost || POSTS[0].slug);
  const post = POSTS.find(p=>p.slug===slug) || POSTS[0];
  const Ico = Icons[post.icon];
  const related = POSTS.filter(p=>p.slug!==post.slug && p.cat===post.cat).slice(0,2);
  const more = (related.length ? related : POSTS.filter(p=>p.slug!==post.slug)).slice(0,2);
  const openRelated = (s)=>{ window.__ngaPost = s; setSlug(s); (document.querySelector(".site-scroll")||window).scrollTo({top:0,behavior:"smooth"}); };

  return (
    <div className="view-body">
      <article className="section" style={{paddingTop:"48px"}}><div className="wrap article-wrap">
        <Crumb trail={[["Home","/"],["Blog","/blog"],[post.cat]]}/>
        <div data-reveal>
          <span className="bp-flag"><Ico/> {post.cat}</span>
          <h1 className="h1 article-title">{post.title}</h1>
          <div className="article-meta">
            <span className="article-author"><span className="aa-mark">{post.author.split(" ").map(w=>w[0]).join("").slice(0,2)}</span>{post.author}</span>
            <span className="bp-dot">·</span>{post.date}<span className="bp-dot">·</span>{post.read} read
          </div>
        </div>

        <div className="article-hero media" data-reveal>
          <ImgPh className="ph zoom" src={post.img} alt={post.title} icon={post.icon}/>
        </div>

        <div className="article-body" data-reveal>
          {post.body.map((b,i)=>{
            if(b[0]==="h") return <h2 key={i} className="article-h">{b[1]}</h2>;
            if(b[0]==="h3") return <h3 key={i} className="article-h3">{b[1]}</h3>;
            if(b[0]==="ul") return (
              <ul key={i} className="article-ul">
                {b[1].map((li,j)=><li key={j}><Icons.check/><span>{li}</span></li>)}
              </ul>
            );
            if(b[0]==="quote") return (
              <blockquote key={i} className="article-quote">
                <span>{b[1]}</span>{b[2] && <cite>— {b[2]}</cite>}
              </blockquote>
            );
            if(b[0]==="cta") return (
              <div key={i} className="article-cta">
                <p>{b[1]}</p>
                <div className="article-cta-actions">
                  <CallBtn/>
                  <BookBtn label="Book online" service="roadworthy"/>
                </div>
              </div>
            );
            return <p key={i} className="article-p">{b[1]}</p>;
          })}
        </div>

        <div className="article-share" data-reveal>
          <span className="muted">Share this article</span>
          <div className="article-share-btns">
            <button className="share-b" aria-label="Share on Facebook"><Icons.building/></button>
            <button className="share-b" aria-label="Share by email"><Icons.fileCheck/></button>
            <button className="share-b" aria-label="Copy link"><Icons.arrow/></button>
          </div>
        </div>
      </div></article>

      <section className="section" style={{paddingTop:0}}><div className="wrap">
        <div className="shead" data-reveal><Eyebrow>Keep reading</Eyebrow><h2 className="h2">More from the workshop</h2></div>
        <div className="bp-grid" style={{gridTemplateColumns:"repeat(2,1fr)"}}>
          {more.map((p,i)=>{ const PIco=Icons[p.icon]; return (
            <article key={p.slug} className="bp-card" data-reveal style={{"--i":i}} onClick={()=>openRelated(p.slug)} role="link" tabIndex={0} onKeyDown={(e)=>{ if(e.key==="Enter") openRelated(p.slug); }}>
              <div className="bp-card-media"><Media src={p.img} capIcon={p.icon} alt={p.title}/></div>
              <div className="bp-card-body">
                {postMeta(p)}
                <h3 className="bp-card-t">{p.title}</h3>
                <p className="bp-card-x">{p.excerpt}</p>
                <span className="bp-read sm">Read <Icons.arrow/></span>
              </div>
              <span className="bp-card-ico"><PIco/></span>
            </article>
          );})}
        </div>
        <div className="center" style={{marginTop:"34px"}}>
          <button className="btn btn-ghost" onClick={()=>go("/blog")}><Icons.arrow style={{transform:"rotate(180deg)"}}/> All articles</button>
        </div>
      </div></section>
      <BlogStickyCTA/>
    </div>
  );
}

Object.assign(window, { BlogView, ArticleView, BlogStickyCTA, HomeBlog, POSTS });

function HomeBlog(){
  const { go } = useNav();
  const posts = POSTS;
  const [perView, setPerView] = React.useState(3);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(()=>{
    const calc = ()=>{ const w = window.innerWidth; setPerView(w < 640 ? 1 : w < 980 ? 2 : 3); };
    calc(); window.addEventListener("resize", calc);
    return ()=>window.removeEventListener("resize", calc);
  },[]);

  const maxIndex = Math.max(0, posts.length - perView);
  React.useEffect(()=>{ setIndex(i => Math.min(i, maxIndex)); },[maxIndex]);

  React.useEffect(()=>{
    if(paused || maxIndex === 0) return;
    const t = setInterval(()=> setIndex(i => i >= maxIndex ? 0 : i + 1), 4500);
    return ()=>clearInterval(t);
  },[paused, maxIndex]);

  const slidePct = 100 / perView;
  const go2 = (i)=> setIndex(Math.max(0, Math.min(i, maxIndex)));

  return (
    <section className="section" style={{paddingTop:0}}><div className="wrap">
      <div className="shead hblog-head" data-reveal>
        <div>
          <Eyebrow>From the workshop</Eyebrow>
          <h2 className="h2">Advice &amp; news</h2>
        </div>
        <div className="hblog-ctrl">
          <button className="hblog-arrow" aria-label="Previous" onClick={()=>go2(index-1)} disabled={index===0}>
            <Icons.arrow style={{transform:"rotate(180deg)"}}/>
          </button>
          <button className="hblog-arrow" aria-label="Next" onClick={()=>go2(index+1)} disabled={index>=maxIndex}>
            <Icons.arrow/>
          </button>
          <button className="btn btn-ghost hblog-all" onClick={()=>go("/blog")}>All articles <Icons.arrow/></button>
        </div>
      </div>

      <div className="hblog" data-reveal
           onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
           onFocusCapture={()=>setPaused(true)} onBlurCapture={()=>setPaused(false)}>
        <div className="hblog-viewport">
          <div className="hblog-track" style={{ transform:`translate3d(-${index*slidePct}%,0,0)` }}>
            {posts.map((p,i)=>{ const Ico=Icons[p.icon]; return (
              <div className="hblog-slide" key={p.slug} aria-hidden={ i<index || i>=index+perView }>
                <article className="bp-card" onClick={()=>openPost(p.slug, go)} role="link" tabIndex={0} onKeyDown={(e)=>{ if(e.key==="Enter") openPost(p.slug, go); }}>
                  <div className="bp-card-media"><Media src={p.img} capIcon={p.icon} alt={p.title}/></div>
                  <div className="bp-card-body">
                    {postMeta(p)}
                    <h3 className="bp-card-t">{p.title}</h3>
                    <p className="bp-card-x">{p.excerpt}</p>
                    <span className="bp-read sm">Read <Icons.arrow/></span>
                  </div>
                  <span className="bp-card-ico"><Ico/></span>
                </article>
              </div>
            );})}
          </div>
        </div>
        {maxIndex > 0 && (
          <div className="hblog-dots" role="tablist" aria-label="Article slides">
            {Array.from({length:maxIndex+1}).map((_,i)=>(
              <button key={i} className={"hblog-dot " + (i===index?"on":"")} aria-label={"Go to slide "+(i+1)} aria-selected={i===index} onClick={()=>go2(i)}/>
            ))}
          </div>
        )}
      </div>
    </div></section>
  );
}
