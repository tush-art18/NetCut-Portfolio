import { useState, useEffect, useRef } from "react";
import "../../index.css";

const steps = [
  {
    id: 1,
    title: "Arham vijja",
    description: [
    <p>
        Videographer, Live Streamer & Video Editor at Arham Vijja,
      <br /><br />
      June 2024 – March 2025 At Arham Vijja,
      <br /><br />
        I managed the full visual production pipeline, focusing on videography and live broadcasting. I operated professional camera equipment and handled complex setups to capture high-quality footage. I also executed seamless YouTube livestreams, managing real-time audio-visual feeds. In post-production, I edited raw footage into polished content, enhancing digital presence while effectively balancing high-pressure live production with detailed editing.
    </p>
    ]
  },
  {
    id: 2,
    title: "Freelance",
    description: [
        <p>
            Freelance Video Editor | Independent
            <br /><br />
            April 2025 - October 2025
            <br /><br />
            As a freelance editor, I specialized in creating cinematic wedding films for diverse clients. I transformed raw footage into emotionally engaging narratives, managing the full post-production process, including audio syncing, pacing, and color grading in DaVinci Resolve. By collaborating closely with clients, I delivered polished, visually striking films that captured meaningful moments while showcasing strong project management and creative expertise.
        </p>
    ]
     
  },
  {
    id: 3,
    title: "TransAviacons",
    description: [
        <p>
            Video Editor | Trans Aviacons
            <br /><br />
            October 2025 – Present
            <br /><br />
            As Video Editor at Trans Aviacons, I create high-impact content for social media, transforming raw footage into engaging visual narratives that boost audience retention and brand awareness. Using DaVinci Resolve, I produce trend-driven edits with strong pacing and quick turnaround times. My work consistently delivers polished, attention-grabbing content that enhances the brand’s digital presence in the aviation industry.
        </p>
    ]  
  },
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const mobileDotRefs = useRef([]);
  const desktopDotRefs = useRef([]);

  // Detect mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Update animated progress line height
  useEffect(() => {
    const updateLine = () => {
      const refs = isMobile ? mobileDotRefs.current : desktopDotRefs.current;
      if (!containerRef.current || refs.length === 0) return;
      const firstDot = refs[0];
      const activeDot = refs[activeIndex];
      if (!firstDot || !activeDot) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const activeRect = activeDot.getBoundingClientRect();

      const start = firstRect.top - containerRect.top + firstRect.height / 2;
      const end = activeRect.top - containerRect.top + activeRect.height / 2;
      setLineHeight(Math.max(0, end - start));
    };

    updateLine();
    window.addEventListener("resize", updateLine);
    return () => window.removeEventListener("resize", updateLine);
  }, [activeIndex, isMobile]);

  // Scroll-based active step detection
  useEffect(() => {
    const handleScroll = () => {
      const refs = isMobile ? mobileDotRefs.current : desktopDotRefs.current;
      const viewportMid = window.innerHeight * 0.45;
      let closest = 0;
      let closestDist = Infinity;

      refs.forEach((dot, i) => {
        if (!dot) return;
        const rect = dot.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Calculate left offset for the animated line
  const getLineStyle = () => {
    const refs = isMobile ? mobileDotRefs.current : desktopDotRefs.current;
    const container = containerRef.current;
    const firstDot = refs[0];
    if (!container || !firstDot) {
      return { left: isMobile ? "1.5rem" : "50%", top: "6rem", height: lineHeight };
    }
    const cRect = container.getBoundingClientRect();
    const dRect = firstDot.getBoundingClientRect();
    const leftPx = dRect.left - cRect.left + dRect.width / 2;
    const topPx = dRect.top - cRect.top + dRect.height / 2;
    return { left: leftPx, top: topPx, height: lineHeight };
  };

  const lineStyle = getLineStyle();

  return (
    <div id="career" className="min-h-screen bg-[#0a0a0a] text-white ">


      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-50 px-5 sm:px-12 py-4 sm:py-6 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <span className="font-mono-alt text-[10px] sm:text-xs tracking-[.3em] text-white/30 uppercase">Process</span>
        <span className="font-mono-alt text-[10px] sm:text-xs tracking-[.3em] text-white/20 uppercase">
          {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </span>
      </div>
      
      <div className="relative z-10 px-4 pt-6 leading-none text-center heading-anim headline mt-[20px]">
        <p>
            Career Timeline
        </p>
      </div>

      {/* ── Timeline wrapper ── */}
      <div ref={containerRef} className="relative max-w-5xl px-5 py-16 mx-auto sm:px-10 md:px-16 sm:py-24 ">

        {/* Track lines */}
        <div className="absolute left-[1.75rem] sm:left-[2.75rem] top-0 bottom-0 w-px bg-white/8 md:hidden" />
        <div className="absolute top-0 bottom-0 hidden w-px -translate-x-1/2 md:block left-1/2 bg-white/8" />

        {/* Animated green progress line */}
        <div
          className="absolute w-px bg-[#F97316] progress-line origin-top z-10 pointer-events-none"
          style={{ left: lineStyle.left, top: lineStyle.top, height: lineStyle.height }}
        />

        {/* Steps */}
        {steps.map((step, i) => {
          const isActive = i === activeIndex;
          const isPast   = i < activeIndex;
          const dotClass = isActive
            ? "active border-[#F97316] bg-[#F97316]"
            : isPast
            ? "border-[#F97316]/40 bg-[#F97316]/20"
            : "border-white/20 bg-transparent";

          return (
            <div key={step.id}>

              {/* ══════════════════════════
                  MOBILE  (< md)
                  Left rail · content right
              ══════════════════════════ */}
              <div className="flex items-start gap-4 py-10 sm:gap-6 md:hidden">
                {/* Dot column */}
                <div className="flex justify-center flex-shrink-0 pt-1 w-7 sm:w-10">
                  <div
                    ref={(el) => (mobileDotRefs.current[i] = el)}
                    className={`dot-ring w-3 h-3 rounded-full border z-10 ${dotClass}`}
                  />
                </div>

                {/* Text column */}
                <div className="flex-1 min-w-0">
                  <span className={`step-num font-mono-alt text-[10px] sm:text-xs tracking-[.25em] block mb-2 ${isActive ? "text-[#F97316]/60" : "text-white/15"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className={`font-display text-[2.4rem] sm:text-5xl leading-none mb-3 step-title ${isActive ? "active" : "inactive"}`}>
                    {step.title}
                  </h2>
                  <p className={`step-text text-[13px] sm:text-sm leading-relaxed ${isActive ? "active text-white/75" : "inactive text-white/30"}`}>
                    {step.description}
                  </p>
                </div>
              </div>

              {/* ══════════════════════════
                  DESKTOP  (≥ md)
                  Centre spine · alternating
              ══════════════════════════ */}
              <div className="hidden md:grid grid-cols-[1fr_2rem_1fr] items-start" style={{ minHeight: 260 }}>

                {/* Left slot */}
                <div className={`py-16 pr-12 flex flex-col justify-center ${i % 2 === 0 ? "items-end text-right" : "invisible pointer-events-none"}`}>
                  {i % 2 === 0 && (
                    <>
                      <span className={`step-num font-mono-alt text-xs tracking-[.25em] mb-4 ${isActive ? "text-[#F97316]/60" : "text-white/15"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className={`font-display text-5xl lg:text-6xl leading-none mb-6 step-title ${isActive ? "active" : "inactive"}`}>
                        {step.title}
                      </h2>
                      <p className={`step-text text-m leading-relaxed max-w-xs ${isActive ? "active text-white/75" : "inactive text-white/30"}`}>
                        {step.description}
                      </p>
                    </>
                  )}
                </div>

                {/* Centre dot */}
                <div className="flex items-start justify-center pt-16">
                  <div
                    ref={(el) => (desktopDotRefs.current[i] = el)}
                    className={`dot-ring w-3 h-3 rounded-full border z-10 ${dotClass}`}
                  />
                </div>

                {/* Right slot */}
                <div className={`py-16 pl-12 flex flex-col justify-center ${i % 2 !== 0 ? "items-start text-left" : "invisible pointer-events-none"}`}>
                  {i % 2 !== 0 && (
                    <>
                      <span className={`step-num font-mono-alt text-xs tracking-[.25em] mb-4 ${isActive ? "text-[#F97316]/60" : "text-white/15"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className={`font-display text-5xl lg:text-6xl leading-none mb-6 step-title ${isActive ? "active" : "inactive"}`}>
                        {step.title}
                      </h2>
                      <p className={`step-text text-m leading-relaxed max-w-xs ${isActive ? "active text-white/75" : "inactive text-white/30"}`}>
                        {step.description}
                      </p>
                    </>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom fade */}
      <div className="h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}