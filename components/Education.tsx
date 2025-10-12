'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Education } from '@/lib/types';

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
    subscribeToChanges();
  }, []);

  const fetchEducation = async () => {
    try {
      const { data } = await supabase
        .from('education')
        .select('*')
        .order('order_index', { ascending: true });

      if (data) setEducation(data);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel('education-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'education' }, () => {
        fetchEducation();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  if (loading) {
    return (
      <section id="education" className="min-h-screen py-20 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="text-center text-white/50">Loading education...</div>
        </div>
      </section>
    );
  }

  if (education.length === 0) {
    return (
      <section id="education" className="min-h-screen py-20 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="text-center text-white/50">
            No education records yet. Add some from the admin panel!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="min-h-screen py-20 px-6 bg-black/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent tracking-tight">
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:scale-105 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500"
            >
              {/* Icon */}
              <div className="text-6xl mb-4">{edu.icon}</div>

              {/* Degree */}
              <h3 className="text-2xl font-bold text-purple-400 mb-2">
                {edu.degree}
              </h3>

              {/* School */}
              <p className="text-xl text-white/80 mb-2">{edu.school}</p>

              {/* Year */}
              <p className="text-white/50 mb-4">{edu.year}</p>

              {/* Description */}
              {edu.description && (
                <p className="text-white/70 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

