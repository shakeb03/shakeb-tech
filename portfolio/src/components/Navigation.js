import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Education', path: '/#education' },
    { name: 'Knowledge Transfer', path: '/blog' },
  ];

  const scrollToSection = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const sectionId = path.substring(2);
      if (location.pathname !== '/') {
        window.location.href = path;
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-cyan-500/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyber-cyan via-cyber-purple to-cyber-pink rounded-lg flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
              S
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
              shakeb.tech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => scrollToSection(e, item.path)}
                className="text-gray-300 hover:text-cyber-cyan transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Link
              to="/admin"
              className="px-4 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-200"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-cyber-cyan hover:bg-gray-800/50 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/98 backdrop-blur-xl border-t border-cyan-500/20">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={(e) => {
                  scrollToSection(e, item.path);
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-2 text-gray-300 hover:text-cyber-cyan hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-lg text-white font-semibold text-center"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;


