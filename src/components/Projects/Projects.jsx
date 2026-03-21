import { useState, useEffect, useRef } from "react";
import "../../index.css";

const ORANGE = "#e87808";

// ─────────────────────────────────────────────
// CARD DATA — 5 cards with videos, titles, tags
// Videos are loaded from the /public folder.
// Replace the src filenames with your actual video filenames.
// Supported formats: .mp4, .webm, .ogg
// ─────────────────────────────────────────────
const cards = [
  { id: 1, video: "https://youtu.be/2KSx4UKKFXo?si=ccYdZVfgHclUkYN", title: "Event Documentry",    tag: "Documentry",      delay: 400 },
  { id: 2, video: "https://youtu.be/DMGoPhWHiJ4?si=gLGi_4v9IkY3IJbI", title: "Crime Documentry",    tag: "2.5D video",       delay: 200 },
  { id: 3, video: "https://youtu.be/mjQCvh6bLi0?si=nvqtxSHv6BlI8f0I", title: "3d Cinematic",    tag: "Cinematic", delay: 0 },
  { id: 4, video: "https://youtu.be/XnKydi28Nec?si=nI2To3uFaU3tzTKW", title: "Primium Saas",  tag: "Saas video",        delay: 200 },
  { id: 5, video: "https://youtu.be/M2CVNThTGsU?si=eeJK3sQlEjc9zrMx", title: "3D Documentry",  tag: "3d video",        delay: 400 },
];

// ─────────────────────────────────────────────────────────────────────────────
// CARD POSITIONS — 5 entries, one per card (index 0 = leftmost, 4 = rightmost)
//
// rotateY   → how much the card turns on Y-axis (3D tilt left/right)
//             positive = tilts left face-on, negative = tilts right face-on
//             centre card = 0 (faces straight), outer cards tilt away more
//
// translateX → how far left/right the card is pushed from centre (in px)
//              negative = left side, positive = right side
//              controls the GAP between cards — increase to add more space
//
// cardWidth  → WIDTH of each card in pixels
//              centre card is SMALLEST, outer cards get progressively BIGGER
//              (matches reference: edges are larger, centre recedes)
//
// cardHeight → HEIGHT of each card in pixels
//              same scaling logic as width — outer cards taller than centre
//
// scale      → additional overall scale multiplier on top of width/height
//              kept at 1 since we're controlling size via cardWidth/cardHeight directly
//
// opacity    → how visible the card is (1 = fully visible, lower = dimmer)
//              outer cards slightly dimmer to enhance depth illusion
// ─────────────────────────────────────────────────────────────────────────────
const positions = [
  // card 0 — far LEFT  (biggest, most tilted)
  { rotateY:  45, translateX: -580, cardWidth: 250, cardHeight: 440, scale: 1.00, opacity: 0.90 },
  // card 1 — inner LEFT (medium-big, moderate tilt)
  { rotateY:  22, translateX: -280, cardWidth: 210, cardHeight: 405, scale: 1.00, opacity: 0.95 },
  // card 2 — CENTRE (smallest, faces straight on)
  { rotateY:   0, translateX:    0, cardWidth: 240, cardHeight: 370, scale: 1.00, opacity: 1.00 },
  // card 3 — inner RIGHT (medium-big, moderate tilt)
  { rotateY: -22, translateX:  280, cardWidth: 210, cardHeight: 405, scale: 1.00, opacity: 0.95 },
  // card 4 — far RIGHT (biggest, most tilted)
  { rotateY: -45, translateX:  580, cardWidth: 250, cardHeight: 440, scale: 1.00, opacity: 0.90 },
  // card 5 — far RIGHT (biggest, most tilted)
  { rotateY: -45, translateX:  580, cardWidth: 250, cardHeight: 440, scale: 1.00, opacity: 0.90 },
  // card 6 — far RIGHT (biggest, most tilted)
  { rotateY: -45, translateX:  580, cardWidth: 250, cardHeight: 440, scale: 1.00, opacity: 0.90 },
];

export default function Projects() {
  const [activeCard,   setActiveCard]   = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [isMobile,     setIsMobile]     = useState(false);

  // ── sectionRef: attached to the main section wrapper ──
  // IntersectionObserver watches this element. When it enters
  // the viewport (threshold: 0.15 = 15% visible), animations fire.
  const sectionRef = useRef(null);

  // ── hasAnimated: ensures animations only fire ONCE per page load ──
  // Without this, scrolling away and back would re-trigger the deal.
  const hasAnimated = useRef(false);

  // ── detect mobile vs desktop ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Intersection Observer — triggers card deal when section scrolls into view ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // entry.isIntersecting = true when section top crosses into viewport
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true; // lock so it never re-runs

            // reset first (in case of hot-reload / dev mode)
            setVisibleCards([]);

            // stagger each card appearance with its delay offset
            cards.forEach((c, idx) => {
                const distFromCentre = Math.abs(idx - 2);
                const staggerDelay = distFromCentre * 300;
                setTimeout(() => setVisibleCards((p) => [...p, c.id]), staggerDelay + 150);
            });

            // once fired, no need to keep observing
            observer.unobserve(section);
          }
        });
      },
      {
        // threshold: 0.15 = fire when 15% of section is visible
        // increase (e.g. 0.3) to wait longer before animating
        threshold: 0.15,

        // rootMargin: fires slightly before the section fully enters viewport
        // "-50px" = trigger 50px before the top edge reaches the bottom of screen
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(section);

    // cleanup on unmount
    return () => observer.disconnect();
  }, [isMobile]); // re-run if layout switches between mobile/desktop

  // find active card data for the overlay
  const activeData = cards.find((c) => c.id === activeCard);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;600;700&display=swap');

        /* ═══ ORB PULSE ═══ */
        @keyframes p1 { 0%,100%{opacity:.18;transform:scale(1);} 50%{opacity:.33;transform:scale(1.13);} }
        @keyframes p2 { 0%,100%{opacity:.11;transform:scale(1);} 50%{opacity:.24;transform:scale(1.18);} }
        @keyframes p3 { 0%,100%{opacity:.07;transform:scale(1);} 50%{opacity:.17;transform:scale(1.1);}  }
        .orb1 { animation: p1 5s   ease-in-out infinite;      }
        .orb2 { animation: p2 7s   ease-in-out infinite 1.5s; }
        .orb3 { animation: p3 6s   ease-in-out infinite 3s;   }
        .orb4 { animation: p2 8s   ease-in-out infinite 0.8s; }
        .orb5 { animation: p1 6.5s ease-in-out infinite 2.2s; }

        /* ═══ CARD DEAL ENTRANCE — each card shoots from a unique origin ═══ */
        @keyframes dealFromLeft {
  0%   { 
    opacity: 0; 
    transform: translateX(0px) rotateY(0deg) scale(0.9); 
  }
  100% { 
    opacity: var(--op); 
    transform: translateX(var(--tx)) rotateY(var(--ry)) scale(var(--sc)); 
  }
}

@keyframes dealFromRight {
  0%   { 
    opacity: 0; 
    transform: translateX(0px) rotateY(0deg) scale(0.9); 
  }
  100% { 
    opacity: var(--op); 
    transform: translateX(var(--tx)) rotateY(var(--ry)) scale(var(--sc)); 
  }
}
        // .deal-left   { animation: dealFromLeft   0.9s cubic-bezier(.23,1,.32,1) both; }
        // .deal-centre { animation: dealFromCentre 0.9s cubic-bezier(.23,1,.32,1) both; }
        // .deal-right  { animation: dealFromRight  0.9s cubic-bezier(.23,1,.32,1) both; }
        .deal-left   { animation: dealFromLeft   1.6s cubic-bezier(.16,1,.3,1) both; }
.deal-centre { animation: dealFromCentre 1.0s cubic-bezier(.16,1,.3,1) both; }
.deal-right  { animation: dealFromRight  1.6s cubic-bezier(.16,1,.3,1) both; }

        /* ═══ HEADING STAMP ═══ */
        @keyframes headStamp {
          0%   { opacity:0; transform:translateY(-60px) scaleY(1.5) skewX(-8deg); filter:blur(10px); }
          55%  { opacity:1; transform:translateY(7px)   scaleY(0.93) skewX(1.5deg); filter:blur(0); }
          78%  {            transform:translateY(-3px)  scaleY(1.03) skewX(0deg); }
          100% {            transform:translateY(0)     scaleY(1)    skewX(0deg); }
        }
        .heading-anim { animation: headStamp 1.05s cubic-bezier(.23,1,.32,1) both; }

        /* ═══ ACTIVE OVERLAY — card flips in like turning a real playing card ═══ */
        @keyframes cardFlipIn {
          0%   { opacity:0; transform:translate(-50%,-50%) rotateY(90deg)  scale(0.55); }
          45%  { opacity:1; transform:translate(-50%,-50%) rotateY(-9deg)  scale(1.07); }
          70%  {            transform:translate(-50%,-50%) rotateY(4deg)   scale(0.97); }
          88%  {            transform:translate(-50%,-50%) rotateY(-2deg)  scale(1.01); }
          100% {            transform:translate(-50%,-50%) rotateY(0deg)   scale(1);    }
        }
        @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
        .overlay-back { animation: fadeIn      0.25s ease both; }
        .overlay-card { animation: cardFlipIn  0.65s cubic-bezier(.23,1,.32,1) both; }

        /* ═══ FAN CARD HOVER ═══ */
        .fan-card {
          transition: transform 0.45s cubic-bezier(.23,1,.32,1), box-shadow 0.35s ease, filter 0.3s ease;
        }
        .fan-card:hover {
          filter: brightness(1.14) saturate(1.22);
          box-shadow: 0 28px 70px rgba(0,0,0,0.9), 0 0 0 1.5px #e8780899, 0 0 45px #e8780833 !important;
        }

        /* rotating fire border on hover */
        .fan-card::before {
          content:''; position:absolute; inset:0; border-radius:inherit; z-index:30;
          background: conic-gradient(from 0deg, transparent 0%, #e87808 20%, #ffb347 35%, transparent 50%, transparent 100%);
          opacity:0; padding:2px;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: destination-out; mask-composite: exclude;
          transition: opacity 0.3s ease;
        }
        @keyframes borderSpin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        .fan-card:hover::before { opacity:1; animation: borderSpin 1.8s linear infinite; }

        /* sheen sweep on hover */
        .fan-card::after {
          content:''; position:absolute; top:0; left:-80%; width:55%; height:100%; z-index:25;
          background: linear-gradient(108deg, transparent 30%, rgba(255,255,255,0.13) 50%, transparent 70%);
          transform: skewX(-18deg); opacity:0;
        }
        @keyframes sheenSweep { 0%{left:-80%;opacity:1;} 100%{left:135%;opacity:1;} }
        .fan-card:hover::after { animation: sheenSweep 0.75s cubic-bezier(.23,1,.32,1) 0.05s both; }

        /* video zoom */
        .card-img { transition: transform 0.55s ease; }
        .fan-card:hover .card-img { transform: scale(1.09); }

        /* text slide-up */
        .card-label { transition: transform 0.35s cubic-bezier(.23,1,.32,1), opacity 0.35s ease; transform:translateY(10px); opacity:0.65; }
        .fan-card:hover .card-label { transform:translateY(0); opacity:1; }

        /* top bar sweeps in from left */
        .top-bar { transform:scaleX(0); transform-origin:left; transition:transform 0.4s cubic-bezier(.23,1,.32,1); opacity:1; }
        .fan-card:hover .top-bar { transform:scaleX(1); }

        /* corner dot pulses */
        @keyframes dotPulse { 0%,100%{box-shadow:0 0 0 0 #e8780888;} 50%{box-shadow:0 0 0 6px #e8780800;} }
        .corner-dot { transition:opacity 0.3s ease; }
        .fan-card:hover .corner-dot { opacity:1 !important; animation:dotPulse 1s ease-in-out infinite; }

        /* ═══ MOBILE GRID ═══ */
        @keyframes gridDeal { 0%{opacity:0;transform:translateY(55px) rotateX(28deg) scale(0.84);} 65%{opacity:1;transform:translateY(-7px) rotateX(-4deg) scale(1.03);} 100%{transform:translateY(0) rotateX(0deg) scale(1);} }
        .grid-rise { animation: gridDeal 0.58s cubic-bezier(.23,1,.32,1) both; }
        .grid-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .grid-card:hover { transform:translateY(-7px) scale(1.03); box-shadow:0 18px 44px rgba(0,0,0,.85), 0 0 0 1.5px #e8780888 !important; }
        .grid-card:hover .card-img { transform:scale(1.07); }
        .label-always { transform:translateY(0) !important; opacity:1 !important; }
      `}</style>

      {/* ─────────────────────────────────────────────────────
          ACTIVE CARD OVERLAY
          Renders as fixed/centred on top of everything when
          a card is clicked. Completely outside the fan layout
          so it can truly float above all other elements.
      ───────────────────────────────────────────────────── */}
      {activeData && (
        <>
          {/* dark blurred backdrop — click to dismiss */}
          <div
            className="fixed inset-0 cursor-pointer overlay-back"
            style={{ zIndex: 998, background: "rgba(0,0,0,.75)", backdropFilter: "blur(8px)" }}
            onClick={() => setActiveCard(null)}
          />

          {/* the popped-up card — fixed, perfectly centred */}
          <div
            className="fixed overflow-hidden cursor-pointer overlay-card rounded-2xl"
            style={{
              zIndex: 999,
              top: "50%",
              left: "50%",
              /* active card width */
              width:  isMobile ? "82vw" : 750,
              /* active card height */
              height: isMobile ? "74vw" : 650,
              maxWidth: 900,
              maxHeight: 500,
              boxShadow: `0 40px 100px #000, 0 0 0 2.5px ${ORANGE}ee, 0 0 80px ${ORANGE}55`,
            }}
            onClick={() => setActiveCard(null)}
          >
            {/* orange accent line at top of active card */}
            <div style={{ height: 3, background: `linear-gradient(90deg,${ORANGE},#ffb347)` }} />

            {/* active overlay video — plays the selected card video enlarged */}
            <video
              className="block object-cover w-full"
              style={{ height: "calc(100% - 3px)" }}
              src={activeData.video}  /* video src from /public folder */
              autoPlay                /* starts playing when overlay opens */
                                 /* required for autoplay to work in browsers */
              loop                    /* loops the video continuously */
              playsInline             /* prevents fullscreen hijack on iOS */
            />

            {/* gradient overlay on active card */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.18) 55%,transparent 100%)" }} />

            {/* active card text */}
            {/* <div className="absolute bottom-0 left-0 right-0 p-5">
              <span style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:ORANGE, marginBottom:5 }}>
                {activeData.tag}
              </span>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:19, fontWeight:700, color:"#fff", lineHeight:1.2 }}>
                {activeData.title}
              </p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,.35)", marginTop:8 }}>
                Tap anywhere to close
              </p>
            </div> */}

            {/* orange dot accent */}
            <div className="absolute w-2 h-2 rounded-full top-3 right-3" style={{ background: ORANGE }} />
          </div>
        </>
      )}

      {/* ─────────────────────────────────────────────────────
          MAIN SECTION WRAPPER
      ───────────────────────────────────────────────────── */}
      <div
        ref={sectionRef}   //← IntersectionObserver watches this element to trigger card animations
        id="projects"
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
        style={{ background: "#080808" }}
      >

        {/* ── Glowing orange orbs in background ── */}

        {/* orb 1 — large centre orb, sits directly behind the card fan */}
        <div className="absolute pointer-events-none orb1" style={{ top:"56%", left:"50%", transform:"translate(-50%,-50%)", width:"min(760px,95vw)", height:"min(380px,48vw)", borderRadius:"50%", background:`radial-gradient(ellipse,${ORANGE}55 0%,${ORANGE}18 40%,transparent 70%)`, filter:"blur(32px)" }}/>
        {/* orb 2 — top-left corner glow */}
        <div className="absolute pointer-events-none orb2" style={{ top:"7%", left:"4%", width:"min(300px,38vw)", height:"min(300px,38vw)", borderRadius:"50%", background:`radial-gradient(circle,${ORANGE}40 0%,${ORANGE}10 50%,transparent 70%)`, filter:"blur(40px)" }}/>
        {/* orb 3 — bottom-right corner glow */}
        <div className="absolute pointer-events-none orb3" style={{ bottom:"5%", right:"4%", width:"min(260px,33vw)", height:"min(260px,33vw)", borderRadius:"50%", background:`radial-gradient(circle,${ORANGE}35 0%,${ORANGE}0a 55%,transparent 72%)`, filter:"blur(36px)" }}/>
        {/* orb 4 — top-right small accent */}
        <div className="absolute pointer-events-none orb4" style={{ top:"10%", right:"7%", width:"min(170px,22vw)", height:"min(170px,22vw)", borderRadius:"50%", background:`radial-gradient(circle,${ORANGE}50 0%,transparent 65%)`, filter:"blur(28px)" }}/>
        {/* orb 5 — bottom-left small accent */}
        <div className="absolute pointer-events-none orb5" style={{ bottom:"11%", left:"6%", width:"min(190px,25vw)", height:"min(190px,25vw)", borderRadius:"50%", background:`radial-gradient(circle,${ORANGE}45 0%,transparent 68%)`, filter:"blur(32px)" }}/>

        {/* ── Section heading ── */}
        <h1
          className="relative z-10 px-4 pt-6 leading-none text-center heading-anim headline"
        >
          Best Work of Art
        </h1>

        {/* ═══════════════════════════════════════════════════════
            DESKTOP — 3D PERSPECTIVE CARD FAN
            All cards are absolutely positioned from the centre of
            this stage, then shifted via translateX per positions[].
            perspective: controls depth of 3D effect (higher = flatter)
        ═══════════════════════════════════════════════════════ */}
        {!isMobile && (
          <div
            className="relative z-10 flex items-center justify-center w-full"
            style={{
              /* stage height — should be >= tallest card height (340px outer cards) + some breathing room */
              height: 480,
              /* 3D perspective depth — lower number = more dramatic 3D, higher = subtler */
              perspective: 1100,
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* inner wrapper preserves 3D context for children */}
            <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>

              {cards.map((card, i) => {
                const p      = positions[i];   // position config for this card
                const isVis  = visibleCards.includes(card.id);

                return (
                  <div
                    key={card.id}
                    className={`fan-card absolute cursor-pointer rounded-2xl overflow-hidden
                      ${isVis
                        ? (i < 2  ? "deal-left"
                            : i > 2 ? "deal-right"
                            :         "deal-centre")
                        : "opacity-0"}
                    `}
                    onClick={() => setActiveCard(card.id)}
                    style={{
                      /* ── CSS custom props used by cardRise animation ── */
                      "--tx": `${p.translateX}px`,   /* horizontal shift          */
                      "--ry": `${p.rotateY}deg`,      /* Y-axis rotation           */
                      "--sc": p.scale,                /* scale multiplier          */
                      "--op": p.opacity,              /* target opacity            */

                      /* ── CARD WIDTH — outer cards wider than centre ── */
                      width: p.cardWidth,

                      /* ── CARD HEIGHT — outer cards taller than centre ── */
                      height: p.cardHeight,

                      /* centre the card in the stage, then translateX shifts it sideways */
                      top:       "50%",
                      left:      "50%",
                      marginTop:  -(p.cardHeight / 2),   /* half of card height — keeps vertical centre */
                      marginLeft: -(p.cardWidth  / 2),   /* half of card width  — keeps horizontal centre */

                      animationDelay: `${card.delay}ms`,
                      opacity:   isVis ? p.opacity : 0,

                      /* final resting transform — translateX spreads cards apart, rotateY tilts them */
                      transform: `translateX(${p.translateX}px) rotateY(${p.rotateY}deg) scale(${p.scale})`,

                      /* z-index: outer cards (index 0 and 4) get highest z so they appear in front */
                      zIndex: Math.abs(i - 2) + 1,

                      boxShadow: "0 20px 60px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07)",
                    }}
                  >
                    {/* orange top accent bar — appears on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 z-20 top-bar"
                      style={{ height: 3, background: `linear-gradient(90deg,${ORANGE},#ffb347)` }}
                    />

                    {/* card video — autoplay, muted, looped, no controls */}
                    <video
                      className="block object-cover w-full h-full card-img"
                      src={card.video}    /* video path e.g. /videos/video1.mp4 */
                      autoPlay            /* plays automatically without user interaction */
                      muted               /* must be muted for autoplay to work */
                      loop                /* loops back to start when it ends */
                      playsInline         /* stays inline on mobile, no fullscreen */
                    />

                    {/* dark gradient overlay — fades photo to black at bottom for text legibility */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.22) 55%,transparent 100%)" }}
                    />

                    {/* card tag + title text — slides up on hover */}
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

                    {/* small orange dot in top-right corner */}
                    <div className="corner-dot absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: ORANGE, opacity: 0.6 }} />
                  </div>
                );
              })}

            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════
            MOBILE — 2-COLUMN GRID
            Flat grid layout for small screens. Tap a card to
            open the fullscreen overlay (same as desktop click).
        ═══════════════════════════════════════════════════════ */}
        {isMobile && (
          <div className="relative z-10 w-full px-4 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {cards.map((card) => {
                const isVis = visibleCards.includes(card.id);
                return (
                  <div
                    key={card.id}
                    className={`grid-card cursor-pointer rounded-2xl overflow-hidden relative ${isVis ? "grid-rise" : "opacity-0"}`}
                    style={{
                      /* mobile card height */
                      height: 200,
                      animationDelay: `${card.delay}ms`,
                      boxShadow: "0 6px 24px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.06)",
                    }}
                    onClick={() => setActiveCard(card.id)}
                  >
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${ORANGE},#ffb347)`, zIndex:2 }}/>
                    {/* mobile grid card video */}
                    <video
                      className="block object-cover w-full h-full card-img"
                      src={card.video}  /* video path from /public folder */
                      autoPlay          /* autoplay on mount */
                      muted             /* muted required for autoplay */
                      loop              /* loops continuously */
                      playsInline       /* inline on iOS */
                    />
                    <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.2) 55%,transparent 100%)" }}/>
                    <div className="absolute bottom-0 left-0 right-0 p-3 label-always">
                      <span style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:8, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:ORANGE, marginBottom:2 }}>{card.tag}</span>
                      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, color:"#fff", lineHeight:1.2 }}>{card.title}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background:ORANGE, opacity:.7 }}/>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── bottom hint text ── */}
        <p
          className="relative z-10 tracking-widest uppercase"
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,.18)",
            marginTop:    isMobile ? "0.4rem" : "2.5rem",
            marginBottom: isMobile ? "1.4rem" : "1.5rem",
          }}
        >
          {isMobile ? "Tap any card to expand" : "Click any card to better experience"}
        </p>

      </div>
    </>
  );
}

