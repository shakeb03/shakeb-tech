'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { HeroContent, Stat } from '@/lib/types';

export default function Hero() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    fetchData();
    subscribeToChanges();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch hero content
      const { data: heroData } = await supabase
        .from('hero_content')
        .select('*')
        .single();

      // Fetch stats
      const { data: statsData } = await supabase
        .from('stats')
        .select('*')
        .order('order_index', { ascending: true });

      // Fetch project count for dynamic stats
      const { count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (heroData) setHeroContent(heroData);
      if (statsData) {
        // Replace DYNAMIC value with actual project count
        const updatedStats = statsData.map(stat => {
          if (stat.label === 'Projects Shipped' && stat.value === 'DYNAMIC') {
            return { ...stat, value: `${count || 0}+` };
          }
          return stat;
        });
        setStats(updatedStats);
      }
      if (count !== null) setProjectCount(count);
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const heroChannel = supabase
      .channel('hero-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hero_content' }, () => {
        fetchData();
      })
      .subscribe();

    const statsChannel = supabase
      .channel('stats-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stats' }, () => {
        fetchData();
      })
      .subscribe();

    // Subscribe to projects changes to update count
    const projectsChannel = supabase
      .channel('projects-changes-hero')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      heroChannel.unsubscribe();
      statsChannel.unsubscribe();
      projectsChannel.unsubscribe();
    };
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const highlightDescription = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const lowerWord = word.toLowerCase();
      if (lowerWord.includes('ai') || lowerWord.includes('ml')) {
        return <span key={index} className="text-cyan-400">{word} </span>;
      } else if (lowerWord.includes('3d')) {
        return <span key={index} className="text-purple-400">{word} </span>;
      } else if (lowerWord.includes('distributed') || lowerWord.includes('architecture')) {
        return <span key={index} className="text-pink-400">{word} </span>;
      }
      return word + ' ';
    });
  };

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-white text-2xl">Loading...</div>
      </section>
    );
  }

  if (!heroContent) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-white/50 text-center">
          <p>No hero content found. Please add content from the admin panel.</p>
        </div>
      </section>
    );
  }

  const titleWords = heroContent.main_title.split(' ');
  const firstWord = titleWords[0];
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 cyber-grid overflow-hidden">
      {/* Animated scan line */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Badge with subtle effect */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="relative bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-400/40 rounded-full px-8 py-3 text-cyan-400 text-sm font-bold uppercase tracking-widest backdrop-blur-sm hover:border-cyan-400/60 transition-all">
              {heroContent.badge_text}
            </div>
          </div>
        </div>

        {/* Main Title with subtle effect */}
        <h1 className="text-center mb-8 relative">
          <div className="text-7xl md:text-9xl font-black tracking-tight animate-gradient bg-gradient-to-r from-white via-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] transform hover:scale-105 transition-transform duration-300">
            {firstWord}
          </div>
          <div className="text-7xl md:text-9xl font-black tracking-tight animate-gradient bg-gradient-to-r from-white via-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] transform hover:scale-105 transition-transform duration-300">
            {restOfTitle}
          </div>
        </h1>

        {/* Subtitle with cyber effect */}
        <p className="text-2xl md:text-3xl text-cyan-300/80 font-light text-center mb-8 tracking-wide">
          <span className="border-l-4 border-cyan-400 pl-4">{heroContent.subtitle}</span>
        </p>

        {/* Description with enhanced highlighting */}
        <p className="text-lg text-white/80 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          {highlightDescription(heroContent.description)}
        </p>

        {/* CTA Buttons with dramatic styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => scrollToSection('work')}
            className="relative group overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 font-bold uppercase tracking-wider hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              ⚡ {heroContent.primary_button_text}
            </span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="relative group overflow-hidden bg-transparent border-2 border-cyan-400 text-cyan-400 px-10 py-5 font-bold uppercase tracking-wider hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
          >
            <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              🚀 {heroContent.secondary_button_text}
            </span>
          </button>
        </div>

        {/* Stats Grid with subtle effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative holographic border border-cyan-400/30 rounded-lg p-6 text-center hover:scale-105 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-cyan-300/70 text-xs uppercase tracking-widest font-semibold">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

