export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .footer-root { font-family: 'DM Sans', sans-serif; }

        /* link underline sweep */
        .f-link { position: relative; }
        .f-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #e87808;
          transition: width 0.3s ease;
        }
        .f-link:hover::after { width: 100%; }

        /* social icon */
        .soc:hover { background: #e87808 !important; color: #fff !important; }
      `}</style>

      <footer id="footer" className="w-full footer-root" style={{ background: "#111111" }}>

        {/* ── Orange banner ── */}
        <div className="px-6 pt-6 pb-6">
          <div
            className="flex flex-wrap items-center justify-center gap-6 mx-auto rounded-2xl max-w"
            style={{
              background: "#F97316",
              padding: "clamp(28px,5vw,44px) clamp(24px,5vw,52px)",
              maxWidth: 1200
            }}
          >
            <div className="text-center">
              <p className="font-extrabold leading-tight text-white"
                style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)" }}>
                Let's Create Something Good<br />Together
              </p>
            </div>
          </div>
        </div>

        {/* ── Main footer body ── */}
        <div className="flex flex-wrap items-start justify-between gap-10 px-10 pt-8 pb-8">

          {/* LEFT — brand + tagline + socials */}
          <div className="max-w-xs">

            {/* Brand */}
            <div className="flex items-center gap-1.5 mb-3 ">
              <span className="text-2xl font-extrabold tracking-tight text-white">NetSet</span>
            </div>

            {/* Tagline */}
            <p className="mb-5 leading-relaxed text-m"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Contact me to hire and collaborate 
            </p>
            
            <div>
                <p className="mb-5 leading-relaxed text-m"
              style={{ color: "rgba(255,255,255,0.4)" }}>📍Shri Parshwnath Digambar Jain Gurukul
                                    15-2-262, Jain Bhavan,
                                    Maharaj Gunj, Jam Bagh,
                                    Hyderabad, Telangana 500012</p>
                <p className="mb-5 leading-relaxed text-m"
              style={{ color: "rgba(255,255,255,0.4)" }}>📞 +91 8668385519</p>
                <p className="mb-5 leading-relaxed text-m"
              style={{ color: "rgba(255,255,255,0.4)" }}>🌐 netreshsatpute@gmail.com</p>
            </div>
          </div>
          {/* Navbar Links */}
            <div>
              <p className="mb-4 text-xs font-bold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}>
                Navbar Links
              </p>
            <div className="flex flex-col gap-3">
                {[
                    { name: "Home", link: "/" },
                    { name: "About", link: "#about" },
                    { name: "Skills", link: "#skills" },
                    { name: "Projects", link: "#projects" },
                    { name: "Career", link: "#career" },
                ].map((item) => (
                    <a
                    key={item.name}
                    href={item.link}
                    className="transition-colors duration-200 text-m f-link hover:text-white"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                    {item.name}
                    </a>
                ))}
            </div>
            </div>
          {/* RIGHT — link columns */}
          <div className="flex flex-wrap gap-12 pr-20 md:gap-16">
            
            <div className="flex items-center gap-2.5 flex-col">

              {/* Instagram */}
              <a href="https://www.instagram.com/its_night07?igsh=Zzc4cThvZHJ6d255" target="_blank" aria-label="Instagram"
                className="flex items-center justify-center transition-transform duration-200 rounded-full cursor-pointer soc w-9 h-9 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com/@itsnight07?si=Cyoq9QB1_vxJrZeJ" target="_blank" aria-label="YouTube"
                className="flex items-center justify-center transition-transform duration-200 rounded-full cursor-pointer soc w-9 h-9 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.8 12 2.8 12 2.8s-4.2 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.5v2.1C.7 16 1 18 1 18s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22.2 12 22.2 12 22.2s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5v-2C23.3 9.2 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" aria-label="Facebook"
                className="flex items-center justify-center transition-transform duration-200 rounded-full cursor-pointer soc w-9 h-9 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a href="https://x.com/NetreshJ?s=20" target="_blank" aria-label="Twitter"
                className="flex items-center justify-center transition-transform duration-200 rounded-full cursor-pointer soc w-9 h-9 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/netresh-s-8aa3642bb?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" aria-label="LinkedIn"
                className="flex items-center justify-center transition-transform duration-200 rounded-full cursor-pointer soc w-9 h-9 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

            </div>

          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div
          className="flex items-center justify-between px-10 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-x" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} NetSet. All rights reserved.
          </p>
          <p className="text-x" style={{ color: "rgba(255,255,255,0.25)" }}>
            Built with ⚡
          </p>
        </div>
        <div className="px-10 py-4">
            <p className="text-x" style={{ color: "rgba(255,255,255,0.25)" }}>
            <a href="https://tushartportfolio.netlify.app/" target="_blank">Developed by : <span className="text-[#F97316]">TushArt</span></a>
        </p>
        </div>

      </footer>
    </>
  );
}