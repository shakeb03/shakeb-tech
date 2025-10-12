# 🚀 Futuristic 3D Portfolio Website

A cutting-edge, futuristic portfolio website built with Next.js 14, Three.js, and Supabase. Features an interactive 3D background, glassmorphic design with neon accents, and a powerful admin panel for content management.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-3D-blue?style=for-the-badge&logo=three.js)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)

## ✨ Features

- **Interactive 3D Background** - 1500 animated particles and geometric shapes using Three.js (subtle and non-distracting)
- **Glassmorphic Design** - Modern UI with backdrop blur and neon glow effects
- **Dynamic Content** - All content loaded from Supabase (zero hardcoded data)
- **Real-time Updates** - Changes in admin panel reflect instantly on the site
- **Password-Protected Admin** - Full CRUD operations for all content
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - GPU-accelerated transitions and scroll effects
- **SEO Optimized** - Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Backend:** Supabase (PostgreSQL + Authentication)
- **Styling:** Tailwind CSS
- **Notifications:** React Hot Toast

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works fine)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd shakeb-tech
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

#### Create a new Supabase project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the database to be ready

#### Run the SQL Schema

Copy and paste the following SQL into your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL DEFAULT '📁',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Education Table
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL DEFAULT '🎓',
  degree TEXT NOT NULL,
  school TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL DEFAULT '💡',
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats Table
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Content Table
CREATE TABLE hero_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  badge_text TEXT NOT NULL,
  main_title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  primary_button_text TEXT NOT NULL,
  secondary_button_text TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Links Table
CREATE TABLE contact_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Seed Data for Projects
INSERT INTO projects (icon, title, description, technologies, order_index) VALUES
('🧠', 'Neural Network Visualizer', 'Real-time 3D visualization of neural network training with interactive layer manipulation and gradient flow analysis', ARRAY['TensorFlow.js', 'Three.js', 'WebGL', 'React'], 1),
('⚛️', 'Quantum Algorithm Simulator', 'Browser-based quantum computing simulator with visual qubit state representations and gate operations', ARRAY['Qiskit', 'WebAssembly', 'TypeScript', 'D3.js'], 2),
('🥽', 'AR Product Configurator', 'Augmented reality product customization platform with real-time 3D rendering and physics simulation', ARRAY['WebXR', 'Three.js', 'Babylon.js', 'ML'], 3),
('🔗', 'Distributed ML Pipeline', 'Scalable machine learning pipeline with auto-scaling, real-time monitoring, and model versioning', ARRAY['Kubernetes', 'Ray', 'MLflow', 'Apache Kafka'], 4),
('⛓️', 'Web3 DeFi Protocol', 'Decentralized finance protocol with automated market making, yield optimization, and governance', ARRAY['Solidity', 'Hardhat', 'Ethers.js', 'The Graph'], 5),
('💻', 'Collaborative Cloud IDE', 'Real-time collaborative development environment with live debugging and AI code completion', ARRAY['Yjs', 'Monaco', 'WebRTC', 'Node.js'], 6);

-- Insert Seed Data for Education
INSERT INTO education (icon, degree, school, year, description, order_index) VALUES
('🎓', 'Master of Computer Science', 'Stanford University', '2020 - 2022', 'Specialized in Machine Learning and Distributed Systems. Thesis on Neural Architecture Search.', 1),
('📚', 'Bachelor of Software Engineering', 'MIT', '2016 - 2020', 'Focus on Full-Stack Development and AI. Dean''s List all semesters. Led 3 major research projects.', 2);

-- Insert Seed Data for Skills
INSERT INTO skills (icon, name, level, order_index) VALUES
('🧠', 'Advanced AI/ML', 98, 1),
('🎮', '3D Graphics & WebGL', 95, 2),
('🔗', 'Distributed Systems', 94, 3),
('⛓️', 'Blockchain & Web3', 92, 4),
('☁️', 'Cloud Architecture', 96, 5),
('⚡', 'Performance Optimization', 97, 6);

-- Insert Seed Data for Stats
INSERT INTO stats (label, value, order_index) VALUES
('Projects Shipped', '50+', 1),
('Client Satisfaction', '99%', 2),
('Tech Stacks', '15+', 3),
('Users Impacted', '10M+', 4);

-- Insert Seed Data for Hero Content
INSERT INTO hero_content (badge_text, main_title, subtitle, description, primary_button_text, secondary_button_text) VALUES
('✨ AVAILABLE FOR HIGH-IMPACT PROJECTS', 'SHAKEBUDDIN MOHAMMED', 'Full-Stack Engineer × Creative Technologist', 'Building the future with AI-powered systems, immersive 3D experiences, and distributed architectures. Transforming complex problems into elegant solutions.', 'Explore My Work', 'Let''s Connect →');

-- Insert Seed Data for Contact Links
INSERT INTO contact_links (icon, label, url, order_index) VALUES
('💼', 'LinkedIn', 'https://linkedin.com/in/shakeb', 1),
('🐙', 'GitHub', 'https://github.com/shakeb03', 2),
('🐦', 'Twitter', 'https://twitter.com/shakeb03', 3),
('📧', 'Email', 'mailto:hello@shakeb.tech', 4);
```

#### Enable Realtime

1. In Supabase Dashboard, go to **Database** → **Replication**
2. Enable replication for these tables:
   - `projects`
   - `education`
   - `skills`
   - `stats`
   - `hero_content`
   - `contact_links`

#### Set up Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Disable email confirmation (or set up SMTP)
4. Go to **Authentication** → **Users**
5. Click **Add User** and create admin account:
   - Email: `admin@shakeb.tech`
   - Password: (choose a secure password)
   - Auto Confirm User: **Yes**

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**To find these values:**
1. Go to your Supabase project
2. Click **Settings** → **API**
3. Copy **Project URL** and **anon/public key**

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Main Website

Navigate to `http://localhost:3000` to view the portfolio:

- **Hero Section** - Displays your introduction and stats
- **Work Section** - Showcases your projects
- **Education Section** - Lists your educational background
- **Skills Section** - Displays your technical skills with animated progress bars
- **Contact Section** - Social links and contact information

### Admin Panel

Navigate to `http://localhost:3000/admin` to access the admin panel:

1. Log in with your admin credentials
2. Use the tabs to manage different content sections:
   - **📁 Projects** - Add/delete projects
   - **🎓 Education** - Manage education records
   - **💡 Skills** - Add/update skills
   - **📊 Stats** - Manage hero statistics
   - **🏠 Hero Content** - Edit hero section content
   - **📱 Contact Links** - Manage social links

All changes are reflected instantly on the main website thanks to Supabase Realtime!

## 🎨 Customization

### Colors

The color scheme is defined in the components. Primary colors:
- Cyan: `#00f3ff`
- Purple: `#7b2ff7`
- Magenta/Pink: `#ff00ff`

You can customize these in the respective component files.

### 3D Background

Adjust the 3D background in `components/ThreeBackground.tsx`:
- Particle count: Change `particleCount` (default: 5000 for desktop)
- Colors: Modify the HSL hue range
- Animation speed: Adjust rotation increments
- Geometric shapes: Modify positions and sizes

### Typography

The site uses the Inter font from Google Fonts. You can change this in `app/layout.tsx`.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click **Import Project**
4. Select your repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click **Deploy**

### Custom Domain

1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `shakeb.tech`)
3. Follow the DNS configuration instructions

## 📝 Database Schema

### Tables

- **projects** - Portfolio projects with technologies
- **education** - Educational background
- **skills** - Technical skills with proficiency levels
- **stats** - Hero section statistics
- **hero_content** - Main hero section content
- **contact_links** - Social media and contact links

All tables include:
- `id` - UUID primary key
- `order_index` - For custom ordering
- `created_at` / `updated_at` - Timestamps

## 🔒 Security

- Admin panel is password-protected via Supabase Authentication
- All database operations use Supabase's built-in security
- Environment variables keep sensitive data secure
- Consider enabling Row Level Security (RLS) in Supabase for production

## ⚡ Performance

- Dynamic import for Three.js (no SSR)
- GPU-accelerated animations (transform/opacity only)
- Optimized particle count for mobile devices
- Efficient Supabase queries with proper indexing
- Real-time subscriptions for instant updates

## 🐛 Troubleshooting

### 3D Background not showing
- Check browser console for WebGL errors
- Ensure browser supports WebGL

### Admin login failing
- Verify Supabase credentials in `.env.local`
- Check that user exists in Supabase Authentication
- Ensure email confirmation is disabled or SMTP is configured

### Data not loading
- Verify Supabase connection
- Check that tables are created with correct schema
- Ensure Realtime is enabled for all tables

### Real-time updates not working
- Enable Realtime replication for all tables
- Check browser console for subscription errors

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Three.js](https://threejs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Built by Shakebuddin Mohammed** | [Portfolio](https://shakeb.tech) | [GitHub](https://github.com/shakeb03)
