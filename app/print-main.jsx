/* Print entry — static desktop render of the landing page, no chrome/animations */
function PrintPage(){
  const noop = ()=>{};
  // lock brand accent token for print
  React.useEffect(()=>{
    const r = document.documentElement.style;
    r.setProperty("--accent", "#FFCD00");
    r.setProperty("--accent-2", "#FFCD00");
    r.setProperty("--accent-glow", "rgba(255,205,0,.16)");
  },[]);
  return (
    <div className="stage" data-mode="desktop">
      <div className="desktop-flow">
        <div className="ng">
          <Header onBook={noop} />
          <main>
            <Hero onBook={noop} variant="showcase" />
            <Trust />
            <Showcase />
            <Heritage />
            <Fleet />
            <FinalCTA onBook={noop} />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PrintPage/>);

/* Auto-print once fonts + images + JSX are ready */
(function(){
  function waitImages(){
    const imgs = Array.from(document.images);
    return Promise.all(imgs.map(img => img.complete ? Promise.resolve()
      : new Promise(res => { img.addEventListener("load", res); img.addEventListener("error", res); })));
  }
  const fonts = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.all([fonts, waitImages()]).then(()=> setTimeout(()=> window.print(), 600));
})();
