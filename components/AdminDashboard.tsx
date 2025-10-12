'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Project, Education, Skill, Stat, HeroContent, ContactLink } from '@/lib/types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Tab = 'projects' | 'education' | 'skills' | 'stats' | 'hero' | 'contacts';

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const router = useRouter();

  const tabs = [
    { id: 'projects' as Tab, label: '📁 Projects', color: 'cyan' },
    { id: 'education' as Tab, label: '🎓 Education', color: 'purple' },
    { id: 'skills' as Tab, label: '💡 Skills', color: 'pink' },
    { id: 'stats' as Tab, label: '📊 Stats', color: 'orange' },
    { id: 'hero' as Tab, label: '🏠 Hero Content', color: 'green' },
    { id: 'contacts' as Tab, label: '📱 Contact Links', color: 'indigo' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back to Site
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white scale-105'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'education' && <EducationTab />}
          {activeTab === 'skills' && <SkillsTab />}
          {activeTab === 'stats' && <StatsTab />}
          {activeTab === 'hero' && <HeroTab />}
          {activeTab === 'contacts' && <ContactsTab />}
        </div>
      </div>
    </div>
  );
}

// Projects Tab
function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [icon, setIcon] = useState('📁');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setProjects(data);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setIcon(project.icon);
    setTitle(project.title);
    setDescription(project.description);
    setDetailedDescription(project.detailed_description || '');
    setProjectLink(project.project_link || '');
    setTechnologies(project.technologies.join(', '));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIcon('📁');
    setTitle('');
    setDescription('');
    setDetailedDescription('');
    setProjectLink('');
    setTechnologies('');
  };

  const handleSubmit = async () => {
    if (!title || !description || !technologies) {
      toast.error('Please fill required fields (title, short description, technologies)');
      return;
    }

    setLoading(true);
    try {
      const techArray = technologies.split(',').map((t) => t.trim());
      const projectData = {
        icon,
        title,
        description,
        detailed_description: detailedDescription || null,
        project_link: projectLink || null,
        technologies: techArray,
      };

      if (editingId) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingId);
        if (error) throw error;
        toast.success('Project updated!');
      } else {
        // Insert new project
        const { error } = await supabase.from('projects').insert([{
          ...projectData,
          order_index: projects.length,
        }]);
        if (error) throw error;
        toast.success('Project added!');
      }

      handleCancelEdit();
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      toast.success('Project deleted!');
      if (editingId === id) handleCancelEdit();
      fetchProjects();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Manage Projects</h2>
      <p className="text-white/60 mb-6">
        Add projects with short description (for cards) and detailed description (for modal popup).
      </p>

      {/* Add/Edit Form */}
      <div className="bg-black/30 rounded-2xl p-6 mb-8">
        {editingId && (
          <div className="mb-4 p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-lg text-cyan-400 text-sm">
            ✏️ Editing mode - Update the fields below and click "Update Project"
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Icon (emoji) - e.g., 🚀"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/50"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title *"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/50"
          />
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short Description * (displays on project card)"
          rows={2}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/50 mb-4"
        />
        <textarea
          value={detailedDescription}
          onChange={(e) => setDetailedDescription(e.target.value)}
          placeholder="Detailed Description (displays in popup modal - optional)"
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/50 mb-4"
        />
        <input
          type="url"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
          placeholder="Project Link (optional) - e.g., https://github.com/user/project"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/50 mb-4"
        />
        <input
          type="text"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="Technologies * (comma-separated) - e.g., React, Node.js, MongoDB"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/50 mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Project' : 'Add Project')}
          </button>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="bg-white/5 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`bg-black/30 rounded-xl p-4 flex items-center justify-between ${
              editingId === project.id ? 'ring-2 ring-cyan-400/50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{project.icon}</span>
              <div>
                <div className="font-semibold">{project.title}</div>
                <div className="text-sm text-white/50">{project.technologies.join(', ')}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Education Tab
function EducationTab() {
  const [education, setEducation] = useState<Education[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [icon, setIcon] = useState('🎓');
  const [degree, setDegree] = useState('');
  const [school, setSchool] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const { data } = await supabase
      .from('education')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setEducation(data);
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setIcon(edu.icon);
    setDegree(edu.degree);
    setSchool(edu.school);
    setYear(edu.year);
    setDescription(edu.description || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIcon('🎓');
    setDegree('');
    setSchool('');
    setYear('');
    setDescription('');
  };

  const handleSubmit = async () => {
    if (!degree || !school || !year) {
      toast.error('Please fill required fields');
      return;
    }

    setLoading(true);
    try {
      const eduData = { icon, degree, school, year, description };

      if (editingId) {
        const { error } = await supabase
          .from('education')
          .update(eduData)
          .eq('id', editingId);
        if (error) throw error;
        toast.success('Education updated!');
      } else {
        const { error } = await supabase.from('education').insert([{
          ...eduData,
          order_index: education.length,
        }]);
        if (error) throw error;
        toast.success('Education added!');
      }

      handleCancelEdit();
      fetchEducation();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const { error } = await supabase.from('education').delete().eq('id', id);
      if (error) throw error;
      toast.success('Education deleted!');
      if (editingId === id) handleCancelEdit();
      fetchEducation();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-purple-400 mb-6">Manage Education</h2>

      <div className="bg-black/30 rounded-2xl p-6 mb-8">
        {editingId && (
          <div className="mb-4 p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg text-purple-400 text-sm">
            ✏️ Editing mode - Update the fields below
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Icon (emoji)"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400/50"
          />
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Degree"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400/50"
          />
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400/50"
          />
        </div>
        <input
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="School/University"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400/50 mb-4"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400/50 mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Education' : 'Add Education')}
          </button>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="bg-white/5 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {education.map((edu) => (
          <div
            key={edu.id}
            className={`bg-black/30 rounded-xl p-4 flex items-center justify-between ${
              editingId === edu.id ? 'ring-2 ring-purple-400/50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{edu.icon}</span>
              <div>
                <div className="font-semibold">{edu.degree}</div>
                <div className="text-sm text-white/50">{edu.school} - {edu.year}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(edu)}
                className="bg-purple-500/20 border border-purple-500/50 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skills Tab
function SkillsTab() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [icon, setIcon] = useState('💻');
  const [name, setName] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setSkills(data);
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setIcon(skill.icon);
    setName(skill.name);
    setTechnologies(String(skill.level));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIcon('💻');
    setName('');
    setTechnologies('');
  };

  const handleSubmit = async () => {
    if (!name || !technologies) {
      toast.error('Please enter category name and technologies');
      return;
    }

    setLoading(true);
    try {
      const skillData = {
        icon,
        name,
        level: technologies,
      };

      if (editingId) {
        const { error } = await supabase
          .from('skills')
          .update(skillData)
          .eq('id', editingId);
        if (error) throw error;
        toast.success('Skill category updated!');
      } else {
        const { error } = await supabase.from('skills').insert([{
          ...skillData,
          order_index: skills.length,
        }]);
        if (error) throw error;
        toast.success('Skill category added!');
      }

      handleCancelEdit();
      fetchSkills();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      toast.success('Skill category deleted!');
      if (editingId === id) handleCancelEdit();
      fetchSkills();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-pink-400 mb-6">Manage Skill Categories</h2>
      <p className="text-white/60 mb-6">
        Create skill categories with comma-separated technologies. Example: "Languages" with "Python, Java, JavaScript"
      </p>

      <div className="bg-black/30 rounded-2xl p-6 mb-8">
        {editingId && (
          <div className="mb-4 p-3 bg-pink-500/10 border border-pink-400/30 rounded-lg text-pink-400 text-sm">
            ✏️ Editing mode - Update the fields below
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Icon (emoji) - e.g., 💻, 🤖, 💾"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-400/50"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name - e.g., Languages, AI/ML"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-400/50"
          />
        </div>
        <textarea
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="Technologies (comma-separated) - e.g., Python, Java, JavaScript, TypeScript"
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-400/50 mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Skill Category' : 'Add Skill Category')}
          </button>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="bg-white/5 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={`bg-black/30 rounded-xl p-4 flex items-center justify-between ${
              editingId === skill.id ? 'ring-2 ring-pink-400/50' : ''
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-3xl">{skill.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-lg text-cyan-300">{skill.name}</div>
                <div className="text-sm text-white/50 mt-1">
                  {String(skill.level).split(',').slice(0, 3).map(t => t.trim()).join(', ')}
                  {String(skill.level).split(',').length > 3 && '...'}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
                className="bg-pink-500/20 border border-pink-500/50 text-pink-400 px-4 py-2 rounded-lg hover:bg-pink-500/30 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Stats Tab
function StatsTab() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase
      .from('stats')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setStats(data);
  };

  const handleEdit = (stat: Stat) => {
    setEditingId(stat.id);
    setLabel(stat.label);
    setValue(stat.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setLabel('');
    setValue('');
  };

  const handleSubmit = async () => {
    if (!label || !value) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const statData = { label, value };

      if (editingId) {
        const { error } = await supabase
          .from('stats')
          .update(statData)
          .eq('id', editingId);
        if (error) throw error;
        toast.success('Stat updated!');
      } else {
        const { error } = await supabase.from('stats').insert([{
          ...statData,
          order_index: stats.length,
        }]);
        if (error) throw error;
        toast.success('Stat added!');
      }

      handleCancelEdit();
      fetchStats();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const { error } = await supabase.from('stats').delete().eq('id', id);
      if (error) throw error;
      toast.success('Stat deleted!');
      if (editingId === id) handleCancelEdit();
      fetchStats();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-orange-400 mb-6">Manage Stats</h2>

      <div className="bg-black/30 rounded-2xl p-6 mb-8">
        {editingId && (
          <div className="mb-4 p-3 bg-orange-500/10 border border-orange-400/30 rounded-lg text-orange-400 text-sm">
            ✏️ Editing mode - Update the fields below
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value (e.g., 50+)"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-400/50"
          />
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label (e.g., Projects Shipped)"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-400/50"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Stat' : 'Add Stat')}
          </button>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="bg-white/5 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`bg-black/30 rounded-xl p-4 flex items-center justify-between ${
              editingId === stat.id ? 'ring-2 ring-orange-400/50' : ''
            }`}
          >
            <div>
              <div className="font-semibold text-xl">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(stat)}
                className="bg-orange-500/20 border border-orange-500/50 text-orange-400 px-4 py-2 rounded-lg hover:bg-orange-500/30 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(stat.id)}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero Content Tab
function HeroTab() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [badgeText, setBadgeText] = useState('');
  const [mainTitle, setMainTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [primaryButtonText, setPrimaryButtonText] = useState('');
  const [secondaryButtonText, setSecondaryButtonText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    const { data } = await supabase.from('hero_content').select('*').single();
    if (data) {
      setHeroContent(data);
      setBadgeText(data.badge_text);
      setMainTitle(data.main_title);
      setSubtitle(data.subtitle);
      setDescription(data.description);
      setPrimaryButtonText(data.primary_button_text);
      setSecondaryButtonText(data.secondary_button_text);
    }
  };

  const handleUpdate = async () => {
    if (!badgeText || !mainTitle || !subtitle || !description) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      if (!heroContent) {
        // Insert if doesn't exist
        const { error } = await supabase.from('hero_content').insert([{
          badge_text: badgeText,
          main_title: mainTitle,
          subtitle,
          description,
          primary_button_text: primaryButtonText,
          secondary_button_text: secondaryButtonText,
        }]);
        if (error) throw error;
      } else {
        // Update existing
        const { error } = await supabase
          .from('hero_content')
          .update({
            badge_text: badgeText,
            main_title: mainTitle,
            subtitle,
            description,
            primary_button_text: primaryButtonText,
            secondary_button_text: secondaryButtonText,
          })
          .eq('id', heroContent.id);
        if (error) throw error;
      }

      toast.success('Hero content updated!');
      fetchHeroContent();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-green-400 mb-6">Edit Hero Content</h2>

      <div className="bg-black/30 rounded-2xl p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-white/70 mb-2">Badge Text</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400/50"
            />
          </div>

          <div>
            <label className="block text-white/70 mb-2">Main Title</label>
            <input
              type="text"
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400/50"
            />
          </div>

          <div>
            <label className="block text-white/70 mb-2">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400/50"
            />
          </div>

          <div>
            <label className="block text-white/70 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 mb-2">Primary Button Text</label>
              <input
                type="text"
                value={primaryButtonText}
                onChange={(e) => setPrimaryButtonText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400/50"
              />
            </div>

            <div>
              <label className="block text-white/70 mb-2">Secondary Button Text</label>
              <input
                type="text"
                value={secondaryButtonText}
                onChange={(e) => setSecondaryButtonText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-400/50"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Hero Content'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Contact Links Tab
function ContactsTab() {
  const [contacts, setContacts] = useState<ContactLink[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [icon, setIcon] = useState('💼');
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data } = await supabase
      .from('contact_links')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setContacts(data);
  };

  const handleEdit = (contact: ContactLink) => {
    setEditingId(contact.id);
    setIcon(contact.icon);
    setLabel(contact.label);
    setUrl(contact.url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIcon('💼');
    setLabel('');
    setUrl('');
  };

  const handleSubmit = async () => {
    if (!label || !url) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const contactData = { icon, label, url };

      if (editingId) {
        const { error } = await supabase
          .from('contact_links')
          .update(contactData)
          .eq('id', editingId);
        if (error) throw error;
        toast.success('Contact link updated!');
      } else {
        const { error } = await supabase.from('contact_links').insert([{
          ...contactData,
          order_index: contacts.length,
        }]);
        if (error) throw error;
        toast.success('Contact link added!');
      }

      handleCancelEdit();
      fetchContacts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const { error } = await supabase.from('contact_links').delete().eq('id', id);
      if (error) throw error;
      toast.success('Contact link deleted!');
      if (editingId === id) handleCancelEdit();
      fetchContacts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-indigo-400 mb-6">Manage Contact Links</h2>

      <div className="bg-black/30 rounded-2xl p-6 mb-8">
        {editingId && (
          <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-400/30 rounded-lg text-indigo-400 text-sm">
            ✏️ Editing mode - Update the fields below
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Icon (emoji)"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-400/50"
          />
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label (e.g., LinkedIn)"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-400/50"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-400/50"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Contact Link' : 'Add Contact Link')}
          </button>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="bg-white/5 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`bg-black/30 rounded-xl p-4 flex items-center justify-between ${
              editingId === contact.id ? 'ring-2 ring-indigo-400/50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{contact.icon}</span>
              <div>
                <div className="font-semibold">{contact.label}</div>
                <div className="text-sm text-white/50 truncate max-w-md">{contact.url}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(contact)}
                className="bg-indigo-500/20 border border-indigo-500/50 text-indigo-400 px-4 py-2 rounded-lg hover:bg-indigo-500/30 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

