
const Navbar = () => {
  return (
    /* desktop-nav class hides on mobile via index.css */
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 bg-transparent desktop-nav lg:px-16">

      {/* Logo */}
      <div className="flex gap-1 text-3xl tracking-widest text-white font-bebas animate__animated animate__fadeIn"
        style={{ animationDuration: '1s', animationFillMode: 'both' }}>
        <img src="/netset-logo.png" alt="" className="h-7" />etSat
      </div>

      {/* Nav links */}
      <ul className="flex items-center p-0 m-0 list-none gap-9 animate__animated animate__fadeIn"
        style={{ animationDelay: '0.3s', animationDuration: '1s', animationFillMode: 'both' }}>
        {['Home', 'About', 'Skills', 'Projects', 'Career'].map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}
              className="text-sm tracking-widest no-underline uppercase transition-colors duration-300 font-grotesk text-white/70 hover:text-orange-500">
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
        className="animate__animated animate__fadeIn flex items-center gap-2.5 bg-white text-gray-900 rounded-full px-5 py-2.5 text-sm font-bold font-grotesk cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-white border-0 hover:scale-105"
        style={{ animationDelay: '0.5s', animationDuration: '1s', animationFillMode: 'both' }}>
        Get in touch
        <span className="inline-flex items-center justify-center w-6 h-6 text-sm leading-none text-white bg-orange-500 rounded-full group-hover:bg-white">
          →
        </span>
      </button>

    </nav>
  );
};

export default Navbar;
