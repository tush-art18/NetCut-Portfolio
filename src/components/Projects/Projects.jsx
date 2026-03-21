import { useState, useEffect, useRef } from "react";
import "../../index.css";

const ORANGE = "#e87808";

// ─────────────────────────────────────────────
// Helper: converts any YouTube URL to an embed URL
// Handles: youtu.be/ID, youtube.com/watch?v=ID, already-embed URLs
// autoplay=1&mute=1&loop=1&playlist=ID is required for silent autoloop
// ─────────────────────────────────────────────
function toEmbedUrl(url, { muted = true, controls = false } = {}) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/
  );
  if (!match) return url;
  const id = match[1];
  const mute     = muted    ? 1 : 0;
  const ctrl     = controls ? 1 : 0;
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=${mute}&loop=1&playlist=${id}&controls=${ctrl}&modestbranding=1&rel=0&playsinline=1`;
}

// ─────────────────────────────────────────────
// CARD DATA — 5 cards with videos, titles, tags
// ─────────────────────────────────────────────
const cards = [
  { id: 1, video: "https://youtu.be/2KSx4UKKFXo?si=ccYdZVfgHclUkYN", title: "Event Documentry",  tag: "Documentry", delay: 400 },
  { id: 2, video: "https://youtu.be/DMGoPhWHiJ4?si=gLGi_4v9IkY3IJbI", title: "Crime Documentry", tag: "2.5D video",  delay: 200 },
  { id: 3, video: "https://youtu.be/mjQCvh6bLi0?si=nvqtxSHv6BlI8f0I", title: "3d Cinematic",     tag: "Cinematic",  delay: 0 },
  { id: 4, video: "https://youtu.be/XnKydi28Nec?si=nI2To3uFaU3tzTKW", title: "Primium Saas",     tag: "Saas video", delay: 200 },
  { id: 5, video: "https://youtu.be/M2CVNThTGsU?si=eeJK3sQlEjc9zrMx", title: "3D Documentry",   tag: "3d video",   delay: 400 },
];

const positions = [
  { rotateY:  45, translateX: -580, cardWidth: 250, cardHeight: 440, scale: 1.00, opacity: 0.90 },
  { rotateY:  22, translateX: -280, cardWidth: 210, cardHeight: 405, scale: 1.00, opacity: 0.95 },
  { rotateY:   0, translateX:    0, cardWidth: 240, cardHeight: 370, scale: 1.00, opacity: 1.00 },
  { rotateY: -22, translateX:  280, cardWidth: 210, cardHeight: 405, scale: 1.00, opacity: 0.95 },
  { rotateY: -45, translateX:  580, cardWidth: 250, cardHeight: 440, scale: 1.00, opacity: 0.90 },
];

// Card iframe — muted autoplay, fills card fully like object-fit:cover, pointer-events off
function YTEmbed({ url }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <iframe
        src={toEmbedUrl(url, { muted: true, controls: false })}
        allow="autoplay; encrypted-media"
        title="video"
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "180%", height: "180%",
          transform: "translate(-50%, -50%)",
          border: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// Active overlay iframe — unmuted with controls so user can adjust volume
function YTEmbedActive({ url }) {
  return (
    <iframe
      src={toEmbedUrl(url, { muted: false, controls: true })}
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="video-active"
      style={{
        position: "absolute",
        top: 3, left: 0,
        width: "100%",
        height: "calc(100% - 3px)",
        border: "none",
      }}
    />
  );
}

export default function Projects() {
  const [activeCard,   setActiveCard]   = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [isMobile,     setIsMobile]     = useState(false);

  const sectionRef  = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setVisibleCards([]);
            cards.forEach((c, idx) => {
              const distFromCentre = Math.abs(idx - 2);
              const staggerDelay = distFromCentre * 300;
              setTimeout(() => setVisibleCards((p) => [...p, c.id]), staggerDelay + 150);
            });
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isMobile]);

  const activeData = cards.find((c) => c.id === activeCard);

  return (
    <>


      {/* ── ACTIVE CARD OVERLAY ── */}
      {activeData && (
        <>
          <div
            className="fixed inset-0 cursor-pointer overlay-back"
            style={{ zIndex: 998, background: "rgba(0,0,0,.75)", backdropFilter: "blur(8px)" }}
            onClick={() => setActiveCard(null)}
          />
          <div
            className="fixed overflow-hidden cursor-pointer overlay-card rounded-2xl"
            style={{
              zIndex: 999,
              top: "50%", left: "50%",
              width:  isMobile ? "82vw" : 750,
              height: isMobile ? "74vw" : 450,
              maxWidth: 900, maxHeight: 500,
              boxShadow: `0 40px 100px #000, 0 0 0 2.5px ${ORANGE}ee, 0 0 80px ${ORANGE}55`,
            }}
            onClick={() => setActiveCard(null)}
          >
            {/* orange top bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg,${ORANGE},#ffb347)` }} />

            {/* ── YouTube iframe (active / enlarged) ── */}
            <YTEmbedActive url={activeData.video} />

            <div className="absolute w-2 h-2 rounded-full top-3 right-3" style={{ background: ORANGE, zIndex: 10 }} />
          </div>
        </>
      )}

      {/* ── MAIN SECTION ── */}
      <div
        ref={sectionRef}
        id="projects"
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* Orbs */}
        <div className="absolute pointer-events-none orb1" style={{ top:"56%", left:"50%", transform:"translate(-50%,-50%)", width:"min(760px,95vw)", height:"min(380px,48vw)", borderRadius:"50%", background:`radial-gradient(ellipse,${ORANGE}55 0%,${ORANGE}18 40%,transparent 70%)`, filter:"blur(32px)" }}/>
        <div className="absolute pointer-events-none orb2" style={{ top:"7%", left:"4%", width:"min(300px,38vw)", height:"min(300px,38vw)", borderRadius:"50%", background:`radial-gradient(circle,${ORANGE}40 0%,${ORANGE}10 50%,transparent 70%)`, filter:"blur(40px)" }}/>
        <div className="absolute pointer-events-none orb3" style={{ bottom:"5%", right:"4%", width:"min(260px,33vw)", height:"min(260px,33vw)", borderRadius:"50%", background:`radial-gradient(circle,${ORANGE}35 0%,${ORANGE}0a 55%,transparent 72%)`, filter:"blur(36px)" }}/>
        <div className="absolute pointer-events-none orb4" style={{ top:"10%", right:"7%", width:"min(170px,22vw)", height:"min(170px,22vw)", borderRadius:"50%", background:`radial-gradient(circle,${ORANGE}50 0%,transparent 65%)`, filter:"blur(28px)" }}/>
        <div className="absolute pointer-events-none orb5" style={{ bottom:"11%", left:"6%", width:"min(190px,25vw)", height:"min(190px,25vw)", borderRadius:"50%", background:`radial-gradient(circle,${ORANGE}45 0%,transparent 68%)`, filter:"blur(32px)" }}/>

        <h1 className="relative z-10 px-4 pt-6 mb-8 leading-none text-center heading-anim headline">
          Best Work of Art
        </h1>

        {/* ── DESKTOP FAN ── */}
        {!isMobile && (
          <div
            className="relative z-10 flex items-center justify-center w-full"
            style={{ height: 480, perspective: 1100, perspectiveOrigin: "50% 50%" }}
          >
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              {cards.map((card, i) => {
                const p     = positions[i];
                const isVis = visibleCards.includes(card.id);

                return (
                  <div
                    key={card.id}
                    className={`fan-card absolute cursor-pointer rounded-2xl overflow-hidden
                      ${isVis
                        ? (i < 2 ? "deal-left" : i > 2 ? "deal-right" : "deal-centre")
                        : "opacity-0"}`}
                    onClick={() => setActiveCard(card.id)}
                    style={{
                      "--tx": `${p.translateX}px`,
                      "--ry": `${p.rotateY}deg`,
                      "--sc": p.scale,
                      "--op": p.opacity,
                      width:  p.cardWidth,
                      height: p.cardHeight,
                      top:  "50%", left: "50%",
                      marginTop:  -(p.cardHeight / 2),
                      marginLeft: -(p.cardWidth  / 2),
                      animationDelay: `${card.delay}ms`,
                      opacity: isVis ? p.opacity : 0,
                      transform: `translateX(${p.translateX}px) rotateY(${p.rotateY}deg) scale(${p.scale})`,
                      zIndex: Math.abs(i - 2) + 1,
                      boxShadow: "0 20px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07)",
                    }}
                  >
                    {/* orange top bar */}
                    <div className="absolute top-0 left-0 right-0 z-20 top-bar" style={{ height: 3, background: `linear-gradient(90deg,${ORANGE},#ffb347)` }} />

                    {/* ── YouTube iframe fills full card (muted autoplay) ── */}
                    <YTEmbed url={card.video} />

                    {/* gradient overlay */}
                    <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.22) 55%,transparent 100%)" }} />

                    {/* tag + title */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
                      <div className="card-label">
                        <span style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:ORANGE, marginBottom:3 }}>
                          {card.tag}
                        </span>
                        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, color:"#fff", lineHeight:1.2 }}>
                          {card.title}
                        </p>
                      </div>
                    </div>

                    <div className="corner-dot absolute top-2 right-2 w-1.5 h-1.5 rounded-full z-20" style={{ background: ORANGE, opacity: 0.6 }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── MOBILE GRID ── */}
        {isMobile && (
          <div className="relative z-10 w-full px-4 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {cards.map((card) => {
                const isVis = visibleCards.includes(card.id);
                return (
                  <div
                    key={card.id}
                    className={`grid-card cursor-pointer rounded-2xl overflow-hidden relative ${isVis ? "grid-rise" : "opacity-0"}`}
                    style={{ height: 200, animationDelay: `${card.delay}ms`, boxShadow: "0 6px 24px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.06)" }}
                    onClick={() => setActiveCard(card.id)}
                  >
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${ORANGE},#ffb347)`, zIndex:2 }}/>

                    {/* ── YouTube iframe (mobile grid) ── */}
                    <YTEmbed url={card.video} />

                    <div className="absolute inset-0 z-10" style={{ background:"linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.2) 55%,transparent 100%)" }}/>
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-3 label-always">
                      <span style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:8, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:ORANGE, marginBottom:2 }}>{card.tag}</span>
                      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, color:"#fff", lineHeight:1.2 }}>{card.title}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full z-20" style={{ background:ORANGE, opacity:.7 }}/>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <p
          className="relative z-10 tracking-widest uppercase"
          style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,.18)", marginTop: isMobile ? "0.4rem" : "2.5rem", marginBottom: isMobile ? "1.4rem" : "1.5rem" }}
        >
          {isMobile ? "Tap any card to expand" : "Click any card to better experience"}
        </p>
      </div>
    </>
  );
}