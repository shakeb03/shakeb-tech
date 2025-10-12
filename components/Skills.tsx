'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Skill } from '@/lib/types';

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
    subscribeToChanges();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true });

      if (data) setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel('skills-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'skills' }, () => {
        fetchSkills();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  if (loading) {
    return (
      <section id="skills" className="min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <div className="text-center text-white/50">Loading skills...</div>
        </div>
      </section>
    );
  }

  if (skills.length === 0) {
    return (
      <section id="skills" className="min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <div className="text-center text-white/50">
            No skills yet. Add some from the admin panel!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent mt-4"></div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card container */}
              <div className="relative bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8 hover:border-cyan-400/60 transition-all duration-300 h-full">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-cyan-400/40"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-purple-400/40"></div>

                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-cyan-300 group-hover:text-cyan-200 transition-colors uppercase tracking-wide">
                      {skill.name}
                    </h3>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-400 to-transparent mt-1"></div>
                  </div>
                </div>

                {/* Skills List - stored in level field as comma-separated */}
                <div className="flex flex-wrap gap-2">
                  {String(skill.level).split(',').map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-block bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 text-cyan-200 px-4 py-2 text-sm font-semibold hover:border-cyan-400/50 hover:text-cyan-100 hover:scale-105 transition-all duration-300"
                      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

