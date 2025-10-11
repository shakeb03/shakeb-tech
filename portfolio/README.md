# 🚀 Shakeb.tech - Futuristic AI Engineer Portfolio

A stunning, interview-winning portfolio website built with React, featuring cyberpunk aesthetics, dynamic content management, and comprehensive SEO optimization.

## ✨ Features

### 🎨 Visual Design
- **Cyberpunk meets Apple aesthetic** - Modern, premium, futuristic
- **3D Particle System** - 5000 rainbow-colored particles floating in 3D space ✨
- **3D Geometric Shapes** - Rotating Torus Knot, Icosahedron, and Octahedron 🔷
- **Mouse-Reactive Camera** - 3D camera follows cursor for immersive experience 🖱️
- **Animated Neural Network Background** - 80 interconnected nodes with physics-based motion
- **Cursor-Following Gradient Orbs** - Interactive background effects
- **Glassmorphism UI** - Modern translucent design elements
- **Terminal Animation** - Live typing effect with Mac-style terminal
- **Smooth Animations** - Gradient flows, marquee scrolls, hover effects
- **Responsive Design** - Perfect on all devices

### 📱 Sections
- **Hero** - Eye-catching introduction with status badge and social links
- **Skills** - Categorized tech stack with beautiful cards
- **Experience** - Professional journey with marquee effect
- **Projects** - Filterable project showcase with metrics
- **Education** - Academic timeline with achievements
- **Knowledge Transfer** - Blog section with search functionality

### 🔐 Admin Panel
- **Secure Authentication** - Username/password protected
- **Analytics Dashboard** - Track views, visitors, and page statistics
- **Content Management** - Full CRUD operations for:
  - Personal Information
  - Projects
  - Education
  - Experience
  - Blog Posts
- **Real-time Updates** - Changes reflect immediately
- **Local Storage** - Persistent data without backend

### 🎯 SEO Optimization
- **Meta Tags** - Comprehensive Open Graph and Twitter Cards
- **Structured Data** - Schema.org markup for rich snippets
- **Semantic HTML** - Proper heading hierarchy
- **Mobile-Optimized** - Fast loading on all devices
- **Social Sharing** - Beautiful preview cards

### 📊 Analytics
- **Page View Tracking** - Monitor site traffic
- **Unique Visitor Detection** - Session-based tracking
- **Visitor Logs** - Timestamp and user agent data
- **Real-time Updates** - Live analytics in admin panel

## 🛠️ Tech Stack

- **React 19** - Latest React features
- **Three.js** - 3D graphics and WebGL rendering ✨
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - 3D helpers and utilities
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Helmet Async** - SEO meta tags
- **Local Storage** - Data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html          # SEO-optimized HTML
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── background/
│   │   │   ├── NeuralNetwork.js      # Animated neural network
│   │   │   └── GradientOrbs.js       # Cursor-following orbs
│   │   ├── sections/
│   │   │   ├── Hero.js               # Hero section
│   │   │   ├── Skills.js             # Skills showcase
│   │   │   ├── Projects.js           # Project gallery
│   │   │   ├── Education.js          # Education timeline
│   │   │   ├── Experience.js         # Work experience
│   │   │   ├── BlogList.js           # Blog listing
│   │   │   └── BlogDetail.js         # Blog post detail
│   │   ├── admin/
│   │   │   ├── AdminLogin.js         # Admin authentication
│   │   │   └── AdminDashboard.js     # Content management
│   │   ├── Navigation.js             # Main navigation
│   │   ├── Terminal.js               # Terminal animation
│   │   └── SEO.js                    # SEO component
│   ├── context/
│   │   └── DataContext.js            # Global state management
│   ├── pages/
│   │   └── Home.js                   # Home page
│   ├── App.js                        # Main app component
│   ├── index.js                      # Entry point
│   └── index.css                     # Global styles
├── tailwind.config.js                # Tailwind configuration
├── package.json
└── README.md
```

## 🔐 Admin Access

### Default Credentials
- **Username:** `admin`
- **Password:** `shakeb123`

### Admin Features
1. **Analytics Dashboard** - View site statistics
2. **Personal Info Editor** - Update bio, contact info
3. **Project Management** - Add, edit, delete projects
4. **Education Management** - Manage education entries
5. **Experience Management** - Update work history
6. **Blog Management** - Create and edit blog posts

**Important:** Change these credentials in production! Update the credentials in `src/components/admin/AdminLogin.js`

## 🎨 Customization

### Color Scheme
Edit `tailwind.config.js` to change colors:
```javascript
colors: {
  'cyber-cyan': '#06b6d4',    // Primary tech color
  'cyber-purple': '#a855f7',  // Secondary creative color
  'cyber-pink': '#ec4899',    // Accent energy color
}
```

### Content
All content is managed through:
1. **Admin Panel** (recommended) - Use the web interface
2. **DataContext.js** - Edit the `defaultData` object directly

### Animations
Customize animations in `tailwind.config.js`:
```javascript
animation: {
  'gradient': 'gradient 3s ease infinite',
  'marquee': 'marquee 30s linear infinite',
  'float': 'float 6s ease-in-out infinite',
}
```

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🌐 Deployment

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages
1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

### Custom Domain (shakeb.tech)
1. Build the project: `npm run build`
2. Upload the `build/` folder to your hosting provider
3. Configure DNS:
   - Add an A record pointing to your host's IP
   - Or add a CNAME record pointing to your host's domain
4. Enable HTTPS through your hosting provider

## 🔧 Environment Variables

For production, consider using environment variables for sensitive data:

Create `.env` file:
```env
REACT_APP_ADMIN_USERNAME=your_username
REACT_APP_ADMIN_PASSWORD=your_secure_password
REACT_APP_SITE_URL=https://shakeb.tech
```

Update `AdminLogin.js` to use these:
```javascript
const DEFAULT_USERNAME = process.env.REACT_APP_ADMIN_USERNAME;
const DEFAULT_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;
```

## 🎯 SEO Tips

1. **Update Meta Tags** - Edit `public/index.html` and `src/components/SEO.js`
2. **Add Sitemap** - Generate sitemap.xml and add to public folder
3. **Submit to Search Engines**
   - Google Search Console
   - Bing Webmaster Tools
4. **Generate Robots.txt** - Add to public folder
5. **Optimize Images** - Compress images for faster loading
6. **Blog Regularly** - Add content to "Knowledge Transfer" section

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🎨 Design Philosophy

### Color Psychology
- **Cyan (#06b6d4)** - Technology, AI, Innovation, Trust
- **Purple (#a855f7)** - Creativity, Premium, Luxury
- **Pink (#ec4899)** - Energy, Passion, Action

### Typography Scale
- Hero: 96px (text-8xl)
- Section Headers: 60px (text-6xl)
- Card Titles: 36px (text-4xl)
- Body: 18px (text-lg)

### Animation Principles
- **Purposeful** - Every animation serves a function
- **Smooth** - 300ms transitions with cubic-bezier easing
- **Subtle** - Enhance, don't distract
- **Consistent** - Same timing across similar elements

## 🐛 Troubleshooting

### Issue: Tailwind styles not working
**Solution:** Ensure Tailwind is properly configured and imported in `index.css`

### Issue: React Router not working after deployment
**Solution:** Configure your hosting provider for SPA routing:
- Netlify: Add `_redirects` file with `/* /index.html 200`
- Vercel: Automatically handled
- Apache: Add `.htaccess` with rewrite rules

### Issue: Local Storage data not persisting
**Solution:** Check browser settings - some privacy modes block Local Storage

## 🤝 Contributing

This is a personal portfolio template, but feel free to fork and customize!

## 📄 License

This project is open source and available under the MIT License.

## 🌟 Credits

- **Design & Development:** Shakeb
- **Icons:** Lucide React
- **Images:** Unsplash
- **Animations:** Tailwind CSS & Custom CSS

## 📞 Support

For questions or issues:
- Email: contact@shakeb.tech
- GitHub Issues: [Create an issue](#)

---

**Built with ❤️ using React and Tailwind CSS**

**Made to land interviews and impress recruiters!** 🚀
