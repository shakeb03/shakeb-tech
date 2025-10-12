-- ============================================
-- SUPABASE DATABASE SETUP
-- Portfolio Website by Shakebuddin Mohammed
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: projects
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL DEFAULT '📁',
  title TEXT NOT NULL,
  description TEXT NOT NULL, -- Short description for card display
  detailed_description TEXT, -- Detailed description for modal/popup
  project_link TEXT, -- URL to visit the project
  technologies TEXT[] NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: education
-- ============================================
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

-- ============================================
-- TABLE: skills (Category-based with comma-separated technologies)
-- ============================================
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL DEFAULT '💡',
  name TEXT NOT NULL,
  level TEXT NOT NULL, -- Stores comma-separated technologies
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: stats
-- ============================================
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: hero_content
-- ============================================
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

-- ============================================
-- TABLE: contact_links
-- ============================================
CREATE TABLE contact_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SEED DATA: projects
-- ============================================
INSERT INTO projects (icon, title, description, detailed_description, project_link, technologies, order_index) VALUES
('🧠', 'Neural Network Visualizer', 'Real-time 3D visualization of neural network training with interactive layer manipulation', 'An advanced neural network visualization platform that provides real-time 3D rendering of deep learning models during training. Features include interactive layer manipulation, gradient flow analysis, weight visualization, and performance metrics. Built with TensorFlow.js for computation and Three.js for stunning 3D graphics. Supports multiple network architectures including CNNs, RNNs, and Transformers.', 'https://github.com/shakeb03/neural-viz', ARRAY['TensorFlow.js', 'Three.js', 'WebGL', 'React'], 1),
('⚛️', 'Quantum Algorithm Simulator', 'Browser-based quantum computing simulator with visual qubit state representations', 'A comprehensive quantum computing simulator running entirely in the browser using WebAssembly for near-native performance. Visualize quantum states, gates, and algorithms in real-time. Includes implementations of Shor''s algorithm, Grover''s search, and quantum teleportation. Educational tools help users understand quantum mechanics principles through interactive demonstrations.', 'https://github.com/shakeb03/quantum-sim', ARRAY['Qiskit', 'WebAssembly', 'TypeScript', 'D3.js'], 2),
('🥽', 'AR Product Configurator', 'Augmented reality product customization platform with real-time 3D rendering', 'An enterprise AR solution enabling customers to visualize and customize products in their real environment. Features real-time 3D rendering, physics simulation, texture mapping, and material customization. Supports WebXR for cross-platform compatibility. Used by furniture and automotive industries to reduce returns and increase customer satisfaction.', 'https://github.com/shakeb03/ar-configurator', ARRAY['WebXR', 'Three.js', 'Babylon.js', 'ML'], 3),
('🔗', 'Distributed ML Pipeline', 'Scalable machine learning pipeline with auto-scaling and real-time monitoring', 'Production-grade distributed machine learning pipeline built on Kubernetes. Features include automatic model versioning with MLflow, real-time data processing with Apache Kafka, distributed training with Ray, and comprehensive monitoring. Handles petabytes of data with horizontal scaling. Deployed across multiple cloud providers for high availability.', 'https://github.com/shakeb03/ml-pipeline', ARRAY['Kubernetes', 'Ray', 'MLflow', 'Apache Kafka'], 4),
('⛓️', 'Web3 DeFi Protocol', 'Decentralized finance protocol with automated market making and yield optimization', 'A fully decentralized finance protocol deployed on Ethereum and Polygon. Features automated market making (AMM), liquidity pools, yield farming, and governance via DAO. Smart contracts audited by leading security firms. Total Value Locked (TVL) exceeded $50M. Implements advanced strategies for impermanent loss mitigation and capital efficiency.', 'https://github.com/shakeb03/defi-protocol', ARRAY['Solidity', 'Hardhat', 'Ethers.js', 'The Graph'], 5),
('💻', 'Collaborative Cloud IDE', 'Real-time collaborative development environment with live debugging', 'A cloud-based IDE enabling multiple developers to code together in real-time using operational transformation via Yjs. Features include live debugging, AI-powered code completion, integrated terminal, Git integration, and voice/video chat. Built with Monaco Editor (VS Code''s editor). Supports 50+ programming languages with syntax highlighting and IntelliSense.', 'https://github.com/shakeb03/cloud-ide', ARRAY['Yjs', 'Monaco', 'WebRTC', 'Node.js'], 6);

-- ============================================
-- SEED DATA: education
-- ============================================
INSERT INTO education (icon, degree, school, year, description, order_index) VALUES
('🎓', 'Master of Computer Science', 'Stanford University', '2020 - 2022', 'Specialized in Machine Learning and Distributed Systems. Thesis on Neural Architecture Search.', 1),
('📚', 'Bachelor of Software Engineering', 'MIT', '2016 - 2020', 'Focus on Full-Stack Development and AI. Dean''s List all semesters. Led 3 major research projects.', 2);

-- ============================================
-- SEED DATA: skills (Category-based with technologies)
-- ============================================
INSERT INTO skills (icon, name, level, order_index) VALUES
('💻', 'Languages', 'Python, Java, JavaScript, TypeScript, React, Angular, Swift', 1),
('🤖', 'AI/ML & Frameworks', 'LLM, AI Agents, PyTorch, Pandas, NumPy, Node, REST API, Git, FastAPI, Fastify, Linux', 2),
('💾', 'Database', 'SQL, MongoDB, NoSQL, PostgreSQL', 3),
('☁️', 'Cloud & DevOps', 'AWS (Lambda, S3, EC2), Azure, Docker, Kubernetes, CI/CD, GitHub Actions', 4);

-- ============================================
-- SEED DATA: stats
-- ============================================
INSERT INTO stats (label, value, order_index) VALUES
('Projects Shipped', 'DYNAMIC', 1), -- Will be replaced with count from projects table
('Tech Stacks', '15+', 2),
('Users Impacted', '45K+', 3);

-- ============================================
-- SEED DATA: hero_content
-- ============================================
INSERT INTO hero_content (badge_text, main_title, subtitle, description, primary_button_text, secondary_button_text) VALUES
('✨ AVAILABLE FOR HIGH-IMPACT PROJECTS', 'SHAKEBUDDIN MOHAMMED', 'Full-Stack Engineer × Creative Technologist', 'Building the future with AI-powered systems, immersive 3D experiences, and distributed architectures. Transforming complex problems into elegant solutions.', 'Explore My Work', 'Let''s Connect →');

-- ============================================
-- SEED DATA: contact_links
-- ============================================
INSERT INTO contact_links (icon, label, url, order_index) VALUES
('💼', 'LinkedIn', 'https://linkedin.com/in/shakeb', 1),
('🐙', 'GitHub', 'https://github.com/shakeb03', 2),
('🐦', 'Twitter', 'https://twitter.com/shakeb03', 3),
('📧', 'Email', 'mailto:hello@shakeb.tech', 4);

-- ============================================
-- IMPORTANT: Enable Realtime Replication
-- ============================================
-- Go to Supabase Dashboard → Database → Replication
-- Enable replication for ALL tables above:
-- - projects
-- - education
-- - skills
-- - stats
-- - hero_content
-- - contact_links

-- ============================================
-- AUTHENTICATION SETUP
-- ============================================
-- 1. Go to Authentication → Providers
-- 2. Enable Email provider
-- 3. Disable email confirmation (or configure SMTP)
-- 4. Go to Authentication → Users
-- 5. Click "Add User"
--    Email: admin@shakeb.tech
--    Password: (your secure password)
--    Auto Confirm User: Yes

