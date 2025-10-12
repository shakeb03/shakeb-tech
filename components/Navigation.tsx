'use client';

export default function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b-2 border-cyan-400/20">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Corner decorations */}
        <div className="absolute top-0 left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
        <div className="absolute top-0 right-6 w-8 h-8 border-t-2 border-r-2 border-purple-400/50"></div>

        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          SHAKEB.TECH
        </button>

        {/* Navigation items */}
        <div className="hidden md:flex items-center gap-2">
          {['HOME', 'WORK', 'EDUCATION', 'SKILLS', 'CONTACT'].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="relative group px-4 py-2"
            >
              {/* Background on hover */}
              <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                   style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}></div>
              
              {/* Text */}
              <span className="relative text-cyan-300/70 group-hover:text-cyan-300 font-semibold text-sm uppercase tracking-widest transition-all">
                {item}
              </span>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              
              {/* Index number */}
              <span className="absolute -top-1 -left-1 text-[10px] text-cyan-400/40 font-mono">
                0{index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
    </nav>
  );
}

