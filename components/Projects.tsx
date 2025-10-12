'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/lib/types';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
    subscribeToChanges();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (data) setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel('projects-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  if (loading) {
    return (
      <section id="work" className="min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Featured Work
          </h2>
          <div className="text-center text-white/50">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="work" className="min-h-screen py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Featured Work
          </h2>
          <div className="text-center text-white/50">
            No projects yet. Add some from the admin panel!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="relative min-h-screen py-20 px-6 overflow-hidden">
      {/* Section background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header with cyber styling */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-4"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative text-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card */}
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden group-hover:-translate-y-2 cursor-pointer">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-400/40"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-purple-400/40"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-purple-400/40"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-pink-400/40"></div>

                {/* Icon */}
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  <span className="relative">
                    {project.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </h3>

                {/* Description */}
                <p className="text-white/70 mb-6 leading-relaxed text-sm group-hover:text-white/90 transition-colors">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-400/30 text-cyan-300 text-xs px-3 py-1 font-mono uppercase tracking-wider hover:border-cyan-400/50 hover:text-cyan-200 transition-all"
                      style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Click indicator */}
                <div className="flex items-center gap-2 text-cyan-400/60 text-xs uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
                  <span>Click to view details</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 rounded-2xl transition-all duration-500 pointer-events-none" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

