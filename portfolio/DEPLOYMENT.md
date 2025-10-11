# 🚀 Deployment Guide for shakeb.tech

## Pre-Deployment Checklist

### 1. Update Content
- [ ] Update all personal information in Admin Panel
- [ ] Add your real projects with live URLs
- [ ] Update education and experience
- [ ] Write at least 3 blog posts for SEO
- [ ] Update social media links
- [ ] Add your actual resume PDF

### 2. Change Default Credentials
**CRITICAL:** Update admin credentials before deploying!

Edit `src/components/admin/AdminLogin.js`:
```javascript
const DEFAULT_USERNAME = 'your_secure_username';
const DEFAULT_PASSWORD = 'your_very_secure_password_123!';
```

### 3. Update Domain References

Find and replace `shakeb.tech` with your actual domain in:
- `public/index.html` (meta tags)
- `public/sitemap.xml` (URLs)
- `src/components/SEO.js` (canonical URLs)

### 4. Optimize for Production

```bash
# Build the project
npm run build

# Test the build locally
npx serve -s build
```

Visit `http://localhost:3000` and test everything works.

## Deployment Options

### Option 1: Netlify (Recommended - Easiest)

**Step 1: Prepare Repository**
```bash
# Initialize git if not already
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

**Step 2: Deploy to Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Click "Deploy site"

**Step 3: Configure Custom Domain**
1. In Netlify, go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter: `shakeb.tech`
4. Netlify will provide DNS settings

**Step 4: Update Domain DNS**
Go to your domain registrar (GoDaddy, Namecheap, etc.):

**Option A: Netlify DNS (Recommended)**
- Point nameservers to Netlify's DNS

**Option B: Custom DNS**
Add these records:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME  
Name: www
Value: your-site.netlify.app
```

**Step 5: Enable HTTPS**
- Netlify automatically provisions SSL certificate
- Force HTTPS in domain settings

**Step 6: Add Redirects**
Create `public/_redirects`:
```
/* /index.html 200
```

This ensures React Router works correctly.

---

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add custom domain
vercel domains add shakeb.tech
```

Follow prompts to configure DNS.

---

### Option 3: GitHub Pages

**Step 1: Install gh-pages**
```bash
npm install --save-dev gh-pages
```

**Step 2: Update package.json**
```json
{
  "homepage": "https://shakeb.tech",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

**Step 3: Deploy**
```bash
npm run deploy
```

**Step 4: Configure Custom Domain**
1. Create `public/CNAME` file with content: `shakeb.tech`
2. In GitHub repo settings → Pages → Custom domain
3. Enter: `shakeb.tech`
4. Update DNS at registrar:
```
Type: A
Name: @
Values: 
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

---

### Option 4: AWS S3 + CloudFront

**For Advanced Users**

**Step 1: Build**
```bash
npm run build
```

**Step 2: Create S3 Bucket**
- Name: `shakeb.tech`
- Enable static website hosting
- Upload `build/` contents

**Step 3: Configure CloudFront**
- Create distribution
- Origin: S3 bucket
- Enable HTTPS
- Add CNAME: `shakeb.tech`

**Step 4: Update DNS**
```
Type: CNAME
Name: @
Value: your-cloudfront-url.cloudfront.net
```

**Step 5: Request SSL Certificate**
- Use AWS Certificate Manager
- Validate via DNS

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit https://shakeb.tech
- [ ] Test all pages load correctly
- [ ] Test mobile responsiveness
- [ ] Test admin login works
- [ ] Verify HTTPS is enabled
- [ ] Check all links work
- [ ] Test contact form (if added)

### 2. SEO Setup

**Google Search Console**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://shakeb.tech`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://shakeb.tech/sitemap.xml`

**Bing Webmaster Tools**
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site: `https://shakeb.tech`
3. Verify ownership
4. Submit sitemap

**Google Analytics (Optional)**
1. Create GA4 property
2. Add tracking code to `public/index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Performance Optimization

**Lighthouse Audit**
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Aim for 90+ scores

**Optimize Images**
- Compress all images
- Use WebP format
- Lazy load images

**Enable Caching**
Add to `public/_headers` (Netlify):
```
/static/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

### 4. Social Media Setup

**LinkedIn**
1. Share your portfolio link
2. Add to LinkedIn profile
3. Post about your projects

**Twitter/X**
1. Pin tweet with portfolio link
2. Tweet about blog posts
3. Use #buildinpublic hashtag

**GitHub**
1. Add website URL to profile
2. Pin portfolio repository
3. Add comprehensive README

### 5. Monitoring

**Set up monitoring:**
- Google Search Console (traffic)
- Analytics (user behavior)
- Uptime monitoring (UptimeRobot)

## Continuous Deployment

### Automatic Deploys (Netlify/Vercel)

Every time you push to GitHub:
```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main
```

Site automatically rebuilds and deploys!

### Update Content

**Via Admin Panel:**
1. Visit: https://shakeb.tech/admin
2. Login
3. Make changes
4. Changes save to browser Local Storage

**Note:** Local Storage is browser-specific. To persist across devices, consider:
- Adding a backend (Firebase, Supabase)
- Export/Import feature
- Or update via code and redeploy

## Troubleshooting

### Issue: Site not loading after deployment
- Check DNS propagation (can take 24-48 hours)
- Verify DNS records are correct
- Clear browser cache

### Issue: 404 on page refresh
- Add redirect rules for SPA routing
- Netlify: `_redirects` file
- Vercel: `vercel.json` with rewrites
- Apache: `.htaccess` with mod_rewrite

### Issue: Images not loading
- Check image URLs are absolute
- Verify images are in `public/` folder or external URLs
- Check CORS settings for external images

### Issue: Admin can't login
- Check credentials in code
- Clear browser cache and Local Storage
- Test in incognito mode

## Maintenance

### Regular Updates
- [ ] Add new blog posts monthly (for SEO)
- [ ] Update projects as you build them
- [ ] Keep skills section current
- [ ] Monitor analytics
- [ ] Respond to contact inquiries quickly

### Annual Tasks
- [ ] Review and update resume
- [ ] Refresh design if needed
- [ ] Update dependencies: `npm update`
- [ ] Rebuild and redeploy

## Security Best Practices

1. **Change admin credentials** immediately
2. Never commit sensitive data to git
3. Use environment variables for secrets
4. Enable HTTPS (SSL)
5. Keep dependencies updated
6. Regular security audits: `npm audit`

## Cost Estimate

**Free Options:**
- Netlify: Free tier (100GB bandwidth)
- Vercel: Free tier (100GB bandwidth)
- GitHub Pages: Free (unlimited)

**Domain Cost:**
- ~$12-15/year for `.tech` domain

**Total: $12-15/year** (just domain cost!)

---

## Quick Deploy Commands

```bash
# 1. Final build
npm run build

# 2. Test locally
npx serve -s build

# 3. Deploy to Netlify
netlify deploy --prod

# OR deploy to Vercel
vercel --prod

# OR deploy to GitHub Pages
npm run deploy
```

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Review deployment logs
3. Test in incognito mode
4. Clear cache and try again

---

**Congratulations! Your portfolio is now live at https://shakeb.tech! 🎉**

**Time to start applying for those dream jobs!** 🚀


