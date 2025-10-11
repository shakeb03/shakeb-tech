import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, Users, Eye, TrendingUp, LogOut, Plus, Edit2, Trash2,
  Save, X, FileText, Briefcase, GraduationCap, FolderGit2
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data, analytics, updatePersonal, addProject, updateProject, deleteProject, 
          addEducation, updateEducation, deleteEducation, addBlog, updateBlog, deleteBlog,
          addExperience, updateExperience, deleteExperience } = useData();
  
  const [activeTab, setActiveTab] = useState('analytics');
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'personal', name: 'Personal Info', icon: Users },
    { id: 'projects', name: 'Projects', icon: FolderGit2 },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'blogs', name: 'Blogs', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-black pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 hover:bg-red-500/30 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-900/50 backdrop-blur-xl rounded-2xl p-2 border border-cyan-500/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingItem(null);
                setIsAddingNew(false);
              }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20">
          {activeTab === 'analytics' && <AnalyticsTab analytics={analytics} />}
          {activeTab === 'personal' && <PersonalInfoTab data={data.personal} updatePersonal={updatePersonal} />}
          {activeTab === 'projects' && (
            <ProjectsTab 
              projects={data.projects} 
              addProject={addProject}
              updateProject={updateProject}
              deleteProject={deleteProject}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              isAddingNew={isAddingNew}
              setIsAddingNew={setIsAddingNew}
            />
          )}
          {activeTab === 'education' && (
            <EducationTab 
              education={data.education}
              addEducation={addEducation}
              updateEducation={updateEducation}
              deleteEducation={deleteEducation}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              isAddingNew={isAddingNew}
              setIsAddingNew={setIsAddingNew}
            />
          )}
          {activeTab === 'experience' && (
            <ExperienceTab 
              experience={data.experience}
              addExperience={addExperience}
              updateExperience={updateExperience}
              deleteExperience={deleteExperience}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              isAddingNew={isAddingNew}
              setIsAddingNew={setIsAddingNew}
            />
          )}
          {activeTab === 'blogs' && (
            <BlogsTab 
              blogs={data.blogs}
              addBlog={addBlog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              isAddingNew={isAddingNew}
              setIsAddingNew={setIsAddingNew}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab = ({ analytics }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Analytics Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Views</span>
            <Eye className="text-cyber-cyan" size={24} />
          </div>
          <div className="text-4xl font-bold text-white">{analytics.totalViews}</div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Unique Visitors</span>
            <Users className="text-cyber-purple" size={24} />
          </div>
          <div className="text-4xl font-bold text-white">{analytics.uniqueVisitors}</div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Last Updated</span>
            <TrendingUp className="text-cyber-pink" size={24} />
          </div>
          <div className="text-sm text-white">
            {new Date(analytics.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20">
        <h3 className="text-xl font-bold text-white mb-4">Recent Visitors</h3>
        <div className="space-y-3">
          {analytics.visitors?.slice(-10).reverse().map((visitor, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
              <span className="text-gray-400 text-sm">{new Date(visitor.timestamp).toLocaleString()}</span>
              <span className="text-cyber-cyan text-xs">{visitor.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Personal Info Tab Component
const PersonalInfoTab = ({ data, updatePersonal }) => {
  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    updatePersonal(formData);
    alert('Personal information updated successfully!');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Personal Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300"
        >
          <Save size={20} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

// Projects Tab Component (continued in next file due to length)
const ProjectsTab = ({ projects, addProject, updateProject, deleteProject, editingItem, setEditingItem, isAddingNew, setIsAddingNew }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
    tagInput: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    metrics: { users: '', accuracy: '', performance: '' }
  });

  const handleEdit = (project) => {
    setEditingItem(project.id);
    setFormData({
      ...project,
      tagInput: '',
    });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: [],
      tagInput: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      metrics: { users: '', accuracy: '', performance: '' }
    });
  };

  const handleSave = () => {
    const projectData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      tags: formData.tags,
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      featured: formData.featured,
      metrics: formData.metrics
    };

    if (isAddingNew) {
      addProject(projectData);
    } else {
      updateProject(editingItem, projectData);
    }

    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleAddTag = () => {
    if (formData.tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: ''
      });
    }
  };

  const handleRemoveTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Projects</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-xl text-white font-semibold hover:scale-105 transition-all"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {(editingItem || isAddingNew) ? (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {isAddingNew ? 'Add New Project' : 'Edit Project'}
          </h3>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-xl text-white"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-xl text-white"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-xl text-white"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Live URL"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-xl text-white"
              />

              <input
                type="text"
                placeholder="GitHub URL"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/20 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5"
                />
                <span>Featured Project</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Tags</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Add tag"
                  value={formData.tagInput}
                  onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-2 bg-gray-900/50 border border-cyan-500/20 rounded-xl text-white"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-cyber-cyan rounded-xl text-white"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-900/50 rounded-full text-sm text-cyber-cyan flex items-center space-x-2"
                  >
                    <span>{tag}</span>
                    <button onClick={() => handleRemoveTag(index)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-xl text-white font-semibold"
              >
                <Save size={20} />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsAddingNew(false);
                }}
                className="px-6 py-3 bg-gray-700 rounded-xl text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(project)}
                className="flex items-center space-x-1 px-4 py-2 bg-cyber-cyan/20 border border-cyber-cyan/50 rounded-lg text-cyber-cyan hover:bg-cyber-cyan/30"
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this project?')) {
                    deleteProject(project.id);
                  }
                }}
                className="flex items-center space-x-1 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Similar components for Education, Experience, and Blogs tabs
const EducationTab = ({ education, addEducation, updateEducation, deleteEducation, editingItem, setEditingItem, isAddingNew, setIsAddingNew }) => {
  // const [formData, setFormData] = useState({
  //   degree: '',
  //   institution: '',
  //   location: '',
  //   period: '',
  //   gpa: '',
  //   achievements: []
  // });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Education</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-xl text-white font-semibold hover:scale-105 transition-all"
        >
          <Plus size={20} />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
            <p className="text-gray-400">{edu.institution} • {edu.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceTab = ({ experience, addExperience, updateExperience, deleteExperience, editingItem, setEditingItem, isAddingNew, setIsAddingNew }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Experience</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-xl text-white font-semibold hover:scale-105 transition-all"
        >
          <Plus size={20} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
            <p className="text-gray-400">{exp.company} • {exp.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogsTab = ({ blogs, addBlog, updateBlog, deleteBlog, editingItem, setEditingItem, isAddingNew, setIsAddingNew }) => {
  // const [formData, setFormData] = useState({
  //   title: '',
  //   excerpt: '',
  //   content: '',
  //   image: '',
  //   tags: [],
  //   readTime: ''
  // });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Blogs</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-xl text-white font-semibold hover:scale-105 transition-all"
        >
          <Plus size={20} />
          <span>Add Blog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{blog.excerpt}</p>
            <div className="text-cyber-cyan text-sm">{blog.views} views • {blog.readTime}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

