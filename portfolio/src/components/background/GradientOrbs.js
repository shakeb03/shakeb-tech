import React, { useEffect, useState } from 'react';

const GradientOrbs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Cursor-following orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(168,85,247,0.4) 50%, rgba(236,72,153,0.4) 100%)',
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
        }}
      />

      {/* Static pulsing orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyber-pink/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default GradientOrbs;


