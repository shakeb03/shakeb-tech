export interface Project {
  id: string;
  icon: string;
  title: string;
  description: string; // Short description for card
  detailed_description?: string; // Detailed description for modal
  project_link?: string; // URL to visit project
  technologies: string[];
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  icon: string;
  degree: string;
  school: string;
  year: string;
  description?: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  icon: string;
  name: string;
  level: number | string; // Can be number (legacy) or comma-separated string
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface HeroContent {
  id: string;
  badge_text: string;
  main_title: string;
  subtitle: string;
  description: string;
  primary_button_text: string;
  secondary_button_text: string;
  updated_at?: string;
}

export interface ContactLink {
  id: string;
  icon: string;
  label: string;
  url: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

