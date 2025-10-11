import { supabase, isSupabaseConfigured } from '../lib/supabase';

// ==================== PERSONAL INFO ====================
export const getPersonalInfo = async () => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('personal_info')
    .select('*')
    .single();
  
  if (error) console.error('Error fetching personal info:', error);
  return data;
};

export const updatePersonalInfo = async (updates) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('personal_info')
    .upsert(updates)
    .select()
    .single();
  
  if (error) console.error('Error updating personal info:', error);
  return data;
};

// ==================== SKILLS ====================
export const getSkills = async () => {
  if (!isSupabaseConfigured()) return [];
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (error) console.error('Error fetching skills:', error);
  return data || [];
};

export const updateSkills = async (skills) => {
  if (!isSupabaseConfigured()) return null;
  
  // Delete all existing skills
  await supabase.from('skills').delete().neq('id', 0);
  
  // Insert new skills with order
  const skillsWithOrder = skills.map((skill, index) => ({
    ...skill,
    order_index: index
  }));
  
  const { data, error } = await supabase
    .from('skills')
    .insert(skillsWithOrder)
    .select();
  
  if (error) console.error('Error updating skills:', error);
  return data;
};

// ==================== PROJECTS ====================
export const getProjects = async () => {
  if (!isSupabaseConfigured()) return [];
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) console.error('Error fetching projects:', error);
  return data || [];
};

export const addProject = async (project) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) console.error('Error adding project:', error);
  return data;
};

export const updateProject = async (id, updates) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) console.error('Error updating project:', error);
  return data;
};

export const deleteProject = async (id) => {
  if (!isSupabaseConfigured()) return null;
  
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) console.error('Error deleting project:', error);
  return !error;
};

// ==================== EDUCATION ====================
export const getEducation = async () => {
  if (!isSupabaseConfigured()) return [];
  
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) console.error('Error fetching education:', error);
  return data || [];
};

export const addEducation = async (education) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('education')
    .insert([education])
    .select()
    .single();
  
  if (error) console.error('Error adding education:', error);
  return data;
};

export const updateEducation = async (id, updates) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('education')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) console.error('Error updating education:', error);
  return data;
};

export const deleteEducation = async (id) => {
  if (!isSupabaseConfigured()) return null;
  
  const { error } = await supabase
    .from('education')
    .delete()
    .eq('id', id);
  
  if (error) console.error('Error deleting education:', error);
  return !error;
};

// ==================== EXPERIENCE ====================
export const getExperience = async () => {
  if (!isSupabaseConfigured()) return [];
  
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) console.error('Error fetching experience:', error);
  return data || [];
};

export const addExperience = async (experience) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('experience')
    .insert([experience])
    .select()
    .single();
  
  if (error) console.error('Error adding experience:', error);
  return data;
};

export const updateExperience = async (id, updates) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('experience')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) console.error('Error updating experience:', error);
  return data;
};

export const deleteExperience = async (id) => {
  if (!isSupabaseConfigured()) return null;
  
  const { error } = await supabase
    .from('experience')
    .delete()
    .eq('id', id);
  
  if (error) console.error('Error deleting experience:', error);
  return !error;
};

// ==================== BLOGS ====================
export const getBlogs = async () => {
  if (!isSupabaseConfigured()) return [];
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) console.error('Error fetching blogs:', error);
  return data || [];
};

export const addBlog = async (blog) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('blogs')
    .insert([{ ...blog, views: 0, date: new Date().toISOString() }])
    .select()
    .single();
  
  if (error) console.error('Error adding blog:', error);
  return data;
};

export const updateBlog = async (id, updates) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase
    .from('blogs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) console.error('Error updating blog:', error);
  return data;
};

export const deleteBlog = async (id) => {
  if (!isSupabaseConfigured()) return null;
  
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);
  
  if (error) console.error('Error deleting blog:', error);
  return !error;
};

export const incrementBlogViews = async (id) => {
  if (!isSupabaseConfigured()) return null;
  
  const { data, error } = await supabase.rpc('increment_blog_views', { blog_id: id });
  
  if (error) console.error('Error incrementing blog views:', error);
  return data;
};

// ==================== ANALYTICS ====================
export const trackPageView = async (pathname) => {
  if (!isSupabaseConfigured()) return null;
  
  const { error } = await supabase
    .from('analytics')
    .insert([{
      page: pathname,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString()
    }]);
  
  if (error) console.error('Error tracking page view:', error);
};

export const getAnalytics = async () => {
  if (!isSupabaseConfigured()) return {
    totalViews: 0,
    uniqueVisitors: 0,
    pageViews: {},
    visitors: []
  };
  
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(100);
  
  if (error) {
    console.error('Error fetching analytics:', error);
    return { totalViews: 0, uniqueVisitors: 0, pageViews: {}, visitors: [] };
  }
  
  // Calculate stats
  const totalViews = data.length;
  const uniqueVisitors = new Set(data.map(v => v.user_agent)).size;
  const pageViews = data.reduce((acc, item) => {
    acc[item.page] = (acc[item.page] || 0) + 1;
    return acc;
  }, {});
  
  return {
    totalViews,
    uniqueVisitors,
    pageViews,
    visitors: data,
    lastUpdated: new Date().toISOString()
  };
};


