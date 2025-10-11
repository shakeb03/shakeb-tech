import React from 'react';
import { useData } from '../context/DataContext';
import Terminal from '../components/Terminal';

const Home = () => {
  const { data } = useData();
  const { personal, skills, education, projects, experience } = data || {};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-fade-in">
            {personal?.name || 'Shakeb'}
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-4 animate-fade-in-delay">
            {personal?.title || 'AI Software Engineer'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in-delay-2">
            {personal?.tagline || 'Building the future with Artificial Intelligence'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {personal?.socialLinks && (
              <>
                {personal.socialLinks.github && (
                  <a
                    href={personal.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    GitHub
                  </a>
                )}
                {personal.socialLinks.linkedin && (
                  <a
                    href={personal.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    LinkedIn
                  </a>
                )}
                {personal.socialLinks.email && (
                  <a
                    href={personal.socialLinks.email}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Me
                  </a>
                )}
              </>
            )}
          </div>
          
          {/* Terminal Component */}
          <div className="max-w-4xl mx-auto mt-12">
            <Terminal />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills?.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-purple-600 hover:text-white transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.filter(p => p.featured).map((project) => (
              <div
                key={project.id}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-pink-500 transition-all duration-300 transform hover:scale-105"
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-300 text-sm"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-blue-400">{exp.company}</p>
                    </div>
                    <div className="text-gray-400 mt-2 md:mt-0">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
              Education
            </h2>
            <div className="space-y-8">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-yellow-500 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-yellow-400">{edu.institution}</p>
                    </div>
                    <div className="text-gray-400 mt-2 md:mt-0">
                      <p>{edu.period}</p>
                      <p>{edu.location}</p>
                      {edu.gpa && <p className="font-semibold">GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {personal?.bio || 'Interested in collaborating? Get in touch!'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {personal?.email && (
              <a
                href={`mailto:${personal.email}`}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Email Me
              </a>
            )}
            {personal?.resumeUrl && personal.resumeUrl !== '#' && (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

