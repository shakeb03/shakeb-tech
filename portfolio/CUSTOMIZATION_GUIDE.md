# 🎨 Customization Guide

## Quick Start Customization

### 1️⃣ Update Your Personal Information

**Option A: Use Admin Panel (Recommended)**
1. Start the app: `npm start`
2. Navigate to: `http://localhost:3000/admin`
3. Login with credentials:
   - Username: `admin`
   - Password: `shakeb123`
4. Update all sections through the dashboard

**Option B: Edit Default Data**
Edit `src/context/DataContext.js`, find the `defaultData` object:

```javascript
const defaultData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    tagline: "Your Tagline",
    email: "your@email.com",
    // ... update all fields
  },
  // ... other sections
};
```

### 2️⃣ Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'cyber-cyan': '#06b6d4',    // Change this
  'cyber-purple': '#a855f7',  // And this
  'cyber-pink': '#ec4899',    // And this
}
```

Popular color schemes:
- **Matrix Green**: `#00ff41`, `#008f11`, `#00ff7f`
- **Neon Blue**: `#00d4ff`, `#0066ff`, `#00ffff`
- **Sunset Orange**: `#ff6b35`, `#f7931e`, `#ff9a56`

### 3️⃣ Update SEO & Meta Tags

1. Edit `public/index.html`
2. Edit `src/components/SEO.js`
3. Update:
   - Site title
   - Description
   - Keywords
   - Social media images
   - Domain name (change from shakeb.tech to yours)

### 4️⃣ Add Your Projects

**Via Admin Panel:**
1. Go to Admin → Projects
2. Click "Add Project"
3. Fill in:
   - Title
   - Description
   - Image URL (use Unsplash or your own)
   - Tags
   - Live URL
   - GitHub URL
   - Featured toggle

**Recommended Image Sources:**
- [Unsplash](https://unsplash.com) - Free high-quality images
- [Pexels](https://pexels.com) - Free stock photos
- Your own project screenshots

### 5️⃣ Update Skills

Edit via Admin Panel or `src/context/DataContext.js`:

```javascript
skills: [
  { 
    category: "Your Category",
    items: ["Skill 1", "Skill 2", "Skill 3"]
  },
  // Add more categories
]
```

### 6️⃣ Change Animation Speed

Edit `tailwind.config.js`:

```javascript
animation: {
  'gradient': 'gradient 3s ease infinite',  // Change 3s to speed up/down
  'marquee': 'marquee 30s linear infinite', // Change 30s
  'float': 'float 6s ease-in-out infinite', // Change 6s
}
```

### 7️⃣ Modify Neural Network

Edit `src/components/background/NeuralNetwork.js`:

```javascript
const nodeCount = 80;        // Number of nodes (change this)
const maxDistance = 150;     // Connection distance
```

More nodes = More connections (but slower performance)
Less nodes = Cleaner look (better performance)

### 8️⃣ Update Resume Link

In Admin Panel → Personal Info, update the `resumeUrl` field, or edit directly:

```javascript
personal: {
  resumeUrl: "https://yoursite.com/resume.pdf",
}
```

### 9️⃣ Add Blog Posts

Via Admin Panel:
1. Go to Blogs section
2. Click "Add Blog"
3. Fill in:
   - Title
   - Excerpt (summary)
   - Content (full article)
   - Image URL
   - Tags
   - Read time

**Tips for SEO-friendly blogs:**
- Use keywords in title
- Write 1000+ word articles
- Include relevant images
- Add internal links
- Update regularly

### 🔟 Change Admin Credentials

**Important:** Change default credentials before deployment!

Edit `src/components/admin/AdminLogin.js`:

```javascript
const DEFAULT_USERNAME = 'your_username';
const DEFAULT_PASSWORD = 'your_secure_password';
```

**Better:** Use environment variables (see README.md)

## Advanced Customization

### Add New Sections

1. Create component in `src/components/sections/YourSection.js`
2. Import and add to `src/pages/Home.js`:

```javascript
import YourSection from '../components/sections/YourSection';

const Home = () => {
  return (
    <>
      <Hero />
      <Skills />
      <YourSection />  {/* Add here */}
      <Projects />
    </>
  );
};
```

### Modify Terminal Commands

Edit `src/components/sections/Hero.js`:

```javascript
const terminalCommands = [
  'npm install your-command',
  'Your custom message',
  'Another line',
];
```

### Change Background Effects

**Disable Neural Network:**
Comment out in `src/App.js`:
```javascript
// <NeuralNetwork />
```

**Disable Gradient Orbs:**
```javascript
// <GradientOrbs />
```

### Add Custom Fonts

1. Import in `public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
```

2. Update `tailwind.config.js`:
```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
}
```

### Modify Stats/Metrics

Edit `src/components/sections/Skills.js`:

```javascript
{[
  { value: '5+', label: 'Years Experience' },      // Update these
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Technologies' },
  { value: '100%', label: 'Client Satisfaction' },
].map((stat, index) => (
  // ...
))}
```

## Performance Optimization

### Reduce Animation Load
- Decrease neural network nodes (default: 80 → 50)
- Reduce gradient orbs (in GradientOrbs.js)
- Use smaller images

### Image Optimization
- Use WebP format
- Compress images (TinyPNG, Squoosh)
- Use appropriate sizes (1920x1080 max for hero)

### Lazy Loading
Add to image components:
```javascript
<img loading="lazy" src={image} alt={alt} />
```

## Common Issues & Solutions

**Issue: Colors not applying**
- Run: `npm run build` to rebuild Tailwind
- Check Tailwind config syntax

**Issue: Admin login not working**
- Clear browser cache
- Check Local Storage in browser DevTools

**Issue: Data not saving**
- Check browser privacy settings
- Ensure Local Storage is enabled

**Issue: Animations too fast/slow**
- Adjust duration in tailwind.config.js
- Test on different devices

## Testing Checklist

Before deploying:
- [ ] Update all personal information
- [ ] Change admin credentials
- [ ] Test on mobile devices
- [ ] Test all links work
- [ ] Optimize images
- [ ] Update SEO meta tags
- [ ] Test admin panel CRUD operations
- [ ] Check console for errors
- [ ] Test in multiple browsers
- [ ] Verify responsive design

## Deployment Checklist

- [ ] Build project: `npm run build`
- [ ] Test build locally: `npx serve -s build`
- [ ] Update domain in SEO files
- [ ] Configure hosting (Netlify/Vercel/etc.)
- [ ] Set up custom domain
- [ ] Enable HTTPS
- [ ] Submit sitemap to Google Search Console
- [ ] Test live site thoroughly

## Need Help?

- Check README.md for detailed instructions
- Review code comments
- Test in browser DevTools
- Check console for error messages

---

**Happy Customizing! 🚀**

Make this portfolio truly yours and land those interviews!


