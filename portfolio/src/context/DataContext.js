import React, { createContext, useContext, useState, useEffect } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import * as supabaseService from '../services/supabaseService';

const DataContext = createContext();

// Default portfolio data (fallback when Supabase is not configured)
const defaultData = {
  personal: {
    name: "Shakeb",
    title: "AI Software Engineer",
    tagline: "Building the future with Artificial Intelligence",
    email: "contact@shakeb.tech",
    location: "Available Worldwide",
    bio: "Passionate AI Software Engineer specializing in machine learning, deep learning, and cutting-edge AI solutions. I transform complex problems into elegant, scalable solutions.",
    availability: "Available for opportunities",
    resumeUrl: "#",
    socialLinks: {
      github: "https://github.com/shakeb",
      linkedin: "https://linkedin.com/in/shakeb",
      twitter: "https://twitter.com/shakeb",
      email: "mailto:contact@shakeb.tech"
    }
  },
  skills: [
    { 
      category: "AI & Machine Learning", 
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenAI API", "Hugging Face", "LangChain", "Computer Vision", "NLP", "Deep Learning"] 
    },
    { 
      category: "Programming Languages", 
      items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "Go", "Rust"] 
    },
    { 
      category: "Web Development", 
      items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Django", "REST APIs", "GraphQL"] 
    },
    { 
      category: "Cloud & DevOps", 
      items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Terraform", "Jenkins"] 
    },
    { 
      category: "Databases", 
      items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Vector Databases", "SQL"] 
    },
    { 
      category: "Tools & Frameworks", 
      items: ["Git", "Linux", "MLOps", "Jupyter", "VS Code", "Postman", "Figma"] 
    }
  ],
  education: [
    {
      id: 1,
      degree: "Master of Science in Artificial Intelligence",
      institution: "Stanford University",
      location: "Stanford, CA",
      period: "2020 - 2022",
      gpa: "4.0/4.0",
      achievements: [
        "Published 3 research papers on Deep Learning",
        "Teaching Assistant for CS229 - Machine Learning",
        "Winner of AI Hackathon 2021"
      ]
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Science",
      institution: "MIT",
      location: "Cambridge, MA",
      period: "2016 - 2020",
      gpa: "3.9/4.0",
      achievements: [
        "Dean's List all semesters",
        "President of AI Club",
        "First Place in ACM Programming Competition"
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "AI-Powered Code Assistant",
      description: "Intelligent code completion and bug detection system using GPT-4 and custom fine-tuned models",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      tags: ["AI", "NLP", "Python", "React", "OpenAI"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      metrics: {
        users: "50K+",
        accuracy: "95%",
        performance: "10x faster"
      }
    },
    {
      id: 2,
      title: "Real-time Object Detection System",
      description: "Computer vision system for autonomous vehicles using YOLO and custom CNN architectures",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      tags: ["Computer Vision", "TensorFlow", "Python", "OpenCV"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      metrics: {
        fps: "60 FPS",
        accuracy: "98.5%",
        latency: "<50ms"
      }
    },
    {
      id: 3,
      title: "NLP Sentiment Analyzer",
      description: "Advanced sentiment analysis platform processing millions of social media posts in real-time",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["NLP", "BERT", "React", "FastAPI", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      metrics: {
        processed: "10M+ posts",
        accuracy: "93%",
        languages: "15+"
      }
    },
    {
      id: 4,
      title: "Predictive Analytics Dashboard",
      description: "Machine learning-powered business intelligence platform for Fortune 500 companies",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["ML", "React", "D3.js", "Python", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      metrics: {
        clients: "50+",
        accuracy: "91%",
        roi: "300%"
      }
    },
    {
      id: 5,
      title: "Voice-Activated AI Assistant",
      description: "Custom voice assistant with natural language understanding and task automation",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop",
      tags: ["NLP", "Speech Recognition", "Python", "React Native"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      metrics: {
        accuracy: "96%",
        languages: "8",
        response: "<1s"
      }
    },
    {
      id: 6,
      title: "AI Image Generator",
      description: "Generative AI platform creating photorealistic images from text descriptions",
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&h=600&fit=crop",
      tags: ["Stable Diffusion", "Python", "Next.js", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      metrics: {
        generated: "1M+ images",
        users: "100K+",
        quality: "High-res"
      }
    }
  ],
  experience: [
    {
      id: 1,
      title: "Senior AI Engineer",
      company: "Tech Giant Inc.",
      period: "2022 - Present",
      description: "Leading AI initiatives and building next-generation ML systems"
    },
    {
      id: 2,
      title: "ML Engineer",
      company: "AI Startup",
      period: "2020 - 2022",
      description: "Developed and deployed production ML models serving millions"
    },
    {
      id: 3,
      title: "Software Engineer Intern",
      company: "FAANG Company",
      period: "2019 - 2020",
      description: "Built scalable backend systems and APIs"
    }
  ],
  blogs: [
    {
      id: 1,
      title: "The Future of Large Language Models in 2025",
      excerpt: "Exploring the evolution of LLMs and their impact on software development, productivity, and human-AI collaboration.",
      content: "Full blog content here...",
      date: "2025-10-05",
      readTime: "8 min read",
      tags: ["AI", "LLM", "Future Tech"],
      views: 15420,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Building Production-Ready AI Systems",
      excerpt: "Best practices for deploying machine learning models at scale, from development to production monitoring.",
      content: "Full blog content here...",
      date: "2025-09-28",
      readTime: "12 min read",
      tags: ["MLOps", "Production", "Best Practices"],
      views: 12890,
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Computer Vision: From Theory to Practice",
      excerpt: "A comprehensive guide to implementing state-of-the-art computer vision systems using modern deep learning frameworks.",
      content: "Full blog content here...",
      date: "2025-09-15",
      readTime: "15 min read",
      tags: ["Computer Vision", "Deep Learning", "Tutorial"],
      views: 18750,
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop"
    }
  ],
  analytics: {
    totalViews: 0,
    uniqueVisitors: 0,
    pageViews: {},
    lastUpdated: new Date().toISOString()
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    pageViews: {},
    visitors: [],
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [useSupabase, setUseSupabase] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      const supabaseConfigured = isSupabaseConfigured();
      setUseSupabase(supabaseConfigured);

      if (supabaseConfigured) {
        console.log('✅ Supabase configured - loading data from database');
        await loadFromSupabase();
      } else {
        console.log('⚠️ Supabase not configured - using LocalStorage');
        loadFromLocalStorage();
      }
      
      setLoading(false);
    };

    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load data from Supabase
  const loadFromSupabase = async () => {
    try {
      const [personal, skills, projects, education, experience, blogs, analyticsData] = await Promise.all([
        supabaseService.getPersonalInfo(),
        supabaseService.getSkills(),
        supabaseService.getProjects(),
        supabaseService.getEducation(),
        supabaseService.getExperience(),
        supabaseService.getBlogs(),
        supabaseService.getAnalytics()
      ]);

      setData({
        personal: personal || defaultData.personal,
        skills: skills.length > 0 ? skills : defaultData.skills,
        projects: projects.length > 0 ? projects : defaultData.projects,
        education: education.length > 0 ? education : defaultData.education,
        experience: experience.length > 0 ? experience : defaultData.experience,
        blogs: blogs.length > 0 ? blogs : defaultData.blogs,
      });

      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading from Supabase:', error);
      loadFromLocalStorage(); // Fallback to LocalStorage
    }
  };

  // Load data from LocalStorage
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('portfolioData');
    const savedAnalytics = localStorage.getItem('portfolioAnalytics');

    if (savedData) {
      setData(JSON.parse(savedData));
    }

    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }
  };

  // Save to LocalStorage when data changes (fallback)
  useEffect(() => {
    if (!useSupabase && !loading) {
      localStorage.setItem('portfolioData', JSON.stringify(data));
    }
  }, [data, useSupabase, loading]);

  useEffect(() => {
    if (!useSupabase && !loading) {
      localStorage.setItem('portfolioAnalytics', JSON.stringify(analytics));
    }
  }, [analytics, useSupabase, loading]);

  // Track page view
  useEffect(() => {
    const trackView = async () => {
      if (useSupabase) {
        await supabaseService.trackPageView(window.location.pathname);
        const analyticsData = await supabaseService.getAnalytics();
        setAnalytics(analyticsData);
      } else {
        // LocalStorage tracking
        const sessionId = sessionStorage.getItem('sessionId') || Date.now().toString();
        if (!sessionStorage.getItem('sessionId')) {
          sessionStorage.setItem('sessionId', sessionId);
          setAnalytics(prev => ({
            ...prev,
            uniqueVisitors: prev.uniqueVisitors + 1,
            visitors: [...prev.visitors, {
              id: sessionId,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent
            }]
          }));
        }
        setAnalytics(prev => ({
          ...prev,
          totalViews: prev.totalViews + 1,
          pageViews: {
            ...prev.pageViews,
            [window.location.pathname]: (prev.pageViews[window.location.pathname] || 0) + 1
          },
          lastUpdated: new Date().toISOString()
        }));
      }
    };
    
    if (!loading) {
      trackView();
    }
  }, [loading, useSupabase]);

  // ==================== CRUD Operations ====================

  const updatePersonal = async (updates) => {
    if (useSupabase) {
      const result = await supabaseService.updatePersonalInfo({ ...data.personal, ...updates });
      if (result) {
        setData(prev => ({ ...prev, personal: result }));
      }
    } else {
      setData(prev => ({ ...prev, personal: { ...prev.personal, ...updates } }));
    }
  };

  const updateSkills = async (skills) => {
    if (useSupabase) {
      await supabaseService.updateSkills(skills);
      setData(prev => ({ ...prev, skills }));
    } else {
      setData(prev => ({ ...prev, skills }));
    }
  };

  const addProject = async (project) => {
    if (useSupabase) {
      const result = await supabaseService.addProject(project);
      if (result) {
        setData(prev => ({ ...prev, projects: [result, ...prev.projects] }));
      }
    } else {
      setData(prev => ({
        ...prev,
        projects: [...prev.projects, { ...project, id: Date.now() }]
      }));
    }
  };

  const updateProject = async (id, updates) => {
    if (useSupabase) {
      const result = await supabaseService.updateProject(id, updates);
      if (result) {
        setData(prev => ({
          ...prev,
          projects: prev.projects.map(p => p.id === id ? result : p)
        }));
      }
    } else {
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
      }));
    }
  };

  const deleteProject = async (id) => {
    if (useSupabase) {
      await supabaseService.deleteProject(id);
    }
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const addEducation = async (education) => {
    if (useSupabase) {
      const result = await supabaseService.addEducation(education);
      if (result) {
        setData(prev => ({ ...prev, education: [result, ...prev.education] }));
      }
    } else {
      setData(prev => ({
        ...prev,
        education: [...prev.education, { ...education, id: Date.now() }]
      }));
    }
  };

  const updateEducation = async (id, updates) => {
    if (useSupabase) {
      const result = await supabaseService.updateEducation(id, updates);
      if (result) {
        setData(prev => ({
          ...prev,
          education: prev.education.map(e => e.id === id ? result : e)
        }));
      }
    } else {
      setData(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === id ? { ...e, ...updates } : e)
      }));
    }
  };

  const deleteEducation = async (id) => {
    if (useSupabase) {
      await supabaseService.deleteEducation(id);
    }
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const addBlog = async (blog) => {
    if (useSupabase) {
      const result = await supabaseService.addBlog(blog);
      if (result) {
        setData(prev => ({ ...prev, blogs: [result, ...prev.blogs] }));
      }
    } else {
      setData(prev => ({
        ...prev,
        blogs: [...prev.blogs, { ...blog, id: Date.now(), date: new Date().toISOString().split('T')[0], views: 0 }]
      }));
    }
  };

  const updateBlog = async (id, updates) => {
    if (useSupabase) {
      const result = await supabaseService.updateBlog(id, updates);
      if (result) {
        setData(prev => ({
          ...prev,
          blogs: prev.blogs.map(b => b.id === id ? result : b)
        }));
      }
    } else {
      setData(prev => ({
        ...prev,
        blogs: prev.blogs.map(b => b.id === id ? { ...b, ...updates } : b)
      }));
    }
  };

  const deleteBlog = async (id) => {
    if (useSupabase) {
      await supabaseService.deleteBlog(id);
    }
    setData(prev => ({
      ...prev,
      blogs: prev.blogs.filter(b => b.id !== id)
    }));
  };

  const addExperience = async (experience) => {
    if (useSupabase) {
      const result = await supabaseService.addExperience(experience);
      if (result) {
        setData(prev => ({ ...prev, experience: [result, ...prev.experience] }));
      }
    } else {
      setData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...experience, id: Date.now() }]
      }));
    }
  };

  const updateExperience = async (id, updates) => {
    if (useSupabase) {
      const result = await supabaseService.updateExperience(id, updates);
      if (result) {
        setData(prev => ({
          ...prev,
          experience: prev.experience.map(e => e.id === id ? result : e)
        }));
      }
    } else {
      setData(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === id ? { ...e, ...updates } : e)
      }));
    }
  };

  const deleteExperience = async (id) => {
    if (useSupabase) {
      await supabaseService.deleteExperience(id);
    }
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  const value = {
    data,
    analytics,
    loading,
    useSupabase,
    updatePersonal,
    updateSkills,
    addProject,
    updateProject,
    deleteProject,
    addEducation,
    updateEducation,
    deleteEducation,
    addBlog,
    updateBlog,
    deleteBlog,
    addExperience,
    updateExperience,
    deleteExperience,
    setData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
