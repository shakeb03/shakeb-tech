'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ContactLink } from '@/lib/types';

export default function Contact() {
  const [contactLinks, setContactLinks] = useState<ContactLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactLinks();
    subscribeToChanges();
  }, []);

  const fetchContactLinks = async () => {
    try {
      const { data } = await supabase
        .from('contact_links')
        .select('*')
        .order('order_index', { ascending: true });

      if (data) setContactLinks(data);
    } catch (error) {
      console.error('Error fetching contact links:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel('contact-links-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_links' }, () => {
        fetchContactLinks();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  if (loading) {
    return (
      <section id="contact" className="min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white/50">Loading contact information...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative min-h-screen py-20 px-6 flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-950/10 to-black"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
            <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Let&apos;s Build Something
            </div>
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Extraordinary
            </div>
          </h2>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        </div>

        {/* Description */}
        <p className="text-xl text-cyan-300/60 text-center max-w-2xl mx-auto mb-12 leading-relaxed border-l-4 border-cyan-400/50 pl-6">
          Ready to push the boundaries of what&apos;s possible? Let&apos;s collaborate on your next 
          groundbreaking project. I&apos;m always excited to work on innovative solutions.
        </p>

        {/* Primary CTA */}
        <div className="flex justify-center mb-20">
          <a
            href="mailto:hello@shakeb.tech"
            className="relative group overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-6 font-bold text-lg uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-3"
            style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
          >
            <span className="text-3xl">📧</span>
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        {contactLinks.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {contactLinks.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card */}
                <div className="relative bg-black/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8 text-center hover:scale-105 hover:border-cyan-400/60 transition-all duration-300">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyan-400/40"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-purple-400/40"></div>
                  
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div className="text-white group-hover:text-cyan-300 transition-colors font-bold uppercase tracking-wide text-sm">
                    {link.label}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

