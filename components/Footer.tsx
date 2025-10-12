export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t-2 border-cyan-400/20 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Corner decorations */}
        <div className="absolute top-4 left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30"></div>
        <div className="absolute top-4 right-6 w-8 h-8 border-t-2 border-r-2 border-purple-400/30"></div>
        
        <div className="text-center space-y-4">
          {/* Copyright */}
          <p className="text-cyan-300/70 font-mono tracking-wide">
            <span className="text-cyan-400">©</span> 2025 Shakebuddin Mohammed
            <span className="text-cyan-400 mx-2">|</span>
            <span className="text-purple-400">All rights reserved</span>
          </p>
          
          {/* Tech stack */}
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-white/40">Built with</span>
            <div className="flex items-center gap-2">
              <span className="bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 px-3 py-1 text-xs font-mono rounded">
                Next.js
              </span>
              <span className="text-white/30">+</span>
              <span className="bg-purple-400/10 border border-purple-400/30 text-purple-400 px-3 py-1 text-xs font-mono rounded">
                Three.js
              </span>
              <span className="text-white/30">+</span>
              <span className="bg-pink-400/10 border border-pink-400/30 text-pink-400 px-3 py-1 text-xs font-mono rounded">
                Supabase
              </span>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-center gap-2 text-xs">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400/60 font-mono">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

