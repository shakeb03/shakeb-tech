'use client';

import { Project } from '@/lib/types';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative bg-black/90 backdrop-blur-xl border border-cyan-400/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-400"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-400"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-pink-400"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 border border-white/20 rounded-full hover:border-cyan-400/60 transition-all">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="text-7xl transform hover:scale-110 transition-transform">
              {project.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
                {project.title}
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
            </div>
          </div>

          {/* Detailed Description */}
          {project.detailed_description && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-300 mb-4 uppercase tracking-wide">
                About This Project
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                {project.detailed_description}
              </p>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-purple-300 mb-4 uppercase tracking-wide">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-400/30 text-cyan-200 px-4 py-2 text-sm font-semibold hover:border-cyan-400/50 hover:scale-105 transition-all"
                  style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Link */}
          {project.project_link && (
            <div className="flex justify-center pt-6">
              <a
                href={project.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 font-bold text-lg uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
                style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Visit Project
              </a>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Custom scrollbar for modal */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00f3ff, #7b2ff7);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

