import React, { useEffect, useState } from 'react';

const services = [
  { num: '01', label: 'Video Editing' },
  { num: '02', label: 'Motion Graphics' },
  { num: '03', label: 'Color Grading' },
  { num: '04', label: 'Visual Storytelling' },
];

const ticker = [
  'Video Editing', '✦', 'Motion Graphics', '✦',
  'Color Grading', '✦', 'Visual Storytelling', '✦',
  'Cinematic Films', '✦', 'Brand Content', '✦',
  'Video Editing', '✦', 'Motion Graphics', '✦',
  'Color Grading', '✦', 'Visual Storytelling', '✦',
  'Cinematic Films', '✦', 'Brand Content', '✦',
];

const Hero = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Short tick so CSS transitions are registered before adding .active
    const t = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(t);
  }, []);

  const delay = (ms) => ({ animationDelay: `${ms}ms`, animationFillMode: 'both' });

  return (
    <section className="film-grain relative w-full min-h-screen bg-[#0a0a0a] font-outfit overflow-hidden" id='hero'>

      {/* ── Ambient orange glow (always visible) ── */}
      <div className="ambient-glow absolute top-[-10%] left-[35%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
           style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.05) 50%, transparent 75%)' }} />

      {/* ── Deep gradient vignette ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 70% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)' }} />

      {/* ── Left side dark fade ── */}
      <div className="absolute inset-y-0 left-0 w-[38%] z-[3] pointer-events-none"
           style={{ background: 'linear-gradient(to right, #0a0a0a 0%, transparent 100%)' }} />

      {/* ── Right side dark fade ── */}
      <div className="absolute inset-y-0 right-0 w-[38%] z-[3] pointer-events-none"
           style={{ background: 'linear-gradient(to left, #0a0a0a 0%, transparent 100%)' }} />

      {/* ── Bottom dark fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] pointer-events-none"
           style={{ background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)' }} />

      {/* ══════════ PHOTO (always visible, Ken Burns) ══════════ */}
      {/* DESKTOP: side-blended full-height photo */}
      <div className="hidden md:block hero-photo-wrap absolute top-0 left-1/2 z-[2] w-[52%] max-w-[700px] h-full">
        <img src="/photo.png" alt="Video Editor" className="hero-photo" />
      </div>

      {/* MOBILE: centred portrait photo, top section */}
      <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 z-[2] w-[90%] max-w-[360px]"
           style={{ height: '58vh' }}>
        <img src="/photo.png" alt="Video Editor"
             className="object-cover object-top w-full h-full"
             style={{
               maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
               WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
               filter: 'brightness(0.9) contrast(1.1)',
             }} />
      </div>

      {/* ══════════ DESKTOP LAYOUT ══════════ */}
      <div className="relative z-10 hidden w-full h-screen md:block">

        {/* Left text block */}
        <div className="absolute -translate-y-1/2 left-10 lg:left-16 top-1/2">

          {/* "Hey, I'm a" */}
          <p className={`slide-up ${active ? 'active' : ''} font-grotesk text-white/60 text-base tracking-[0.3em] uppercase mb-3`}
             style={delay(300)}>
            Hey, I'm a
          </p>

          {/* VIDEO — Bebas Neue, clip-path reveal */}
          <div className="overflow-hidden">
            <div className={`clip-reveal ${active ? 'active' : ''} font-bebas text-[clamp(5rem,10vw,9rem)] leading-none text-white text-cinematic-shadow`}
                 style={{ animationDelay: '500ms' }}>
              VIDEO
            </div>
          </div>

          {/* EDITOR — slight offset right */}
          <div className="overflow-hidden">
            <div className={`clip-reveal ${active ? 'active' : ''} font text-[clamp(5rem,13vw,9rem)] leading-none tracking-widest text-cinematic-shadow`}
                 style={{ animationDelay: '700ms', color: 'transparent', WebkitTextStroke: '2px #ffffff' }}>
              EDITOR
            </div>
          </div>

          {/* Orange rule */}
          <div className={`slide-up ${active ? 'active' : ''} mt-5 w-16 h-[3px] bg-orange-500 rounded-full`}
               style={delay(1100)} />
        </div>

        {/* Right text block */}
        <div className={`slide-up ${active ? 'active' : ''} absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 max-w-[280px]`}
             style={delay(900)}>
          <p className={`orange-line ${active ? 'active' : ''} font-grotesk text-white text-xl lg:text-2xl font-bold leading-snug mb-4`}>
            Great edits should<br />feel invisible.
          </p>
          <p className="text-sm leading-relaxed text-white/50 font-outfit">
            From concept to cut, I craft stories that captivate, connect, and convert.
          </p>

          {/* CTA */}
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className={`slide-up ${active ? 'active' : ''} mt-8 flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold font-grotesk rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 border-0 cursor-pointer`}
                  style={delay(1200)}>
            View My Work
            <span className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-white/20">→</span>
          </button>
        </div>

        {/* Services — bottom */}
        <div className={`slide-up ${active ? 'active' : ''} absolute bottom-20 left-0 right-0 flex justify-around px-10 z-10`}
             style={delay(1400)}>
          {services.map((s) => (
            <div key={s.num} className="flex items-center gap-3 cursor-default group">
              <span className="text-xs font-bold tracking-widest text-orange-500 font-grotesk">#{s.num}</span>
              <span className="text-sm transition-colors duration-300 text-white/60 font-outfit group-hover:text-white">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ MOBILE LAYOUT ══════════ */}
      <div className="relative z-10 flex flex-col min-h-screen px-5 pt-3 md:hidden">

        {/* Logo only — no nav links per wireframe */}
        <div className="pt-4 pb-2 text-3xl tracking-widest text-white font-bebas">NetCut</div>

        {/* Spacer for photo area */}
        <div style={{ height: '50vh' }} />

        {/* Text centered */}
        <div className={`slide-up ${active ? 'active' : ''} text-center flex flex-col items-center gap-2 pb-4`}
             style={delay(400)}>
          <p className="font-grotesk text-white/55 text-xs tracking-[0.3em] uppercase">Hey, I'm a</p>
          <h1 className="font-bebas text-[clamp(4.5rem,20vw,7rem)] leading-none text-white text-cinematic-shadow m-0">
            VIDEO
          </h1>
          <h1 className="font-bebas text-[clamp(4.5rem,20vw,7rem)] leading-none m-0 text-cinematic-shadow"
              style={{ color: 'transparent', WebkitTextStroke: '2px #ffffff' }}>
            EDITOR
          </h1>
          <p className={`orange-line ${active ? 'active' : ''} font-grotesk text-white text-base font-semibold mt-3`}>
            Great edits should feel invisible.
          </p>
        </div>

        {/* Mobile services grid */}
        <div className={`slide-up ${active ? 'active' : ''} grid grid-cols-2 gap-2.5 pb-8`}
             style={delay(700)}>
          {services.map((s) => (
            <div key={s.num}
                 className="flex flex-col gap-0.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <span className="text-orange-500 text-[10px] font-bold font-grotesk tracking-widest">#{s.num}</span>
              <span className="text-xs text-white/70 font-outfit">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ MARQUEE TICKER (both) ══════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-20 py-3 overflow-hidden border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="flex gap-10 marquee-track whitespace-nowrap w-max">
          {ticker.map((item, i) => (
            <span key={i}
                  className={`text-xs font-grotesk tracking-widest ${item === '✦' ? 'text-orange-500' : 'text-white/40'}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;