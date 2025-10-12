# 🚀 Quick Setup Guide

Follow these steps to get your portfolio website up and running in under 10 minutes!

## Step 1: Install Dependencies ⚡

```bash
npm install
```

## Step 2: Set Up Supabase 🗄️

### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Choose a name, database password, and region
4. Wait for the project to be ready (~2 minutes)

### Run the Database Setup

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase-setup.sql`
4. Paste it into the SQL Editor
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see success messages for all tables and seed data

### Enable Realtime

1. Go to **"Database"** → **"Replication"** (left sidebar)
2. You'll see a list of tables
3. For each of these tables, click the toggle to enable replication:
   - ✅ `projects`
   - ✅ `education`
   - ✅ `skills`
   - ✅ `stats`
   - ✅ `hero_content`
   - ✅ `contact_links`

### Create Admin User

1. Go to **"Authentication"** (left sidebar)
2. Click on **"Providers"** tab
3. Make sure **"Email"** is enabled
4. Go back to **"Users"** tab
5. Click **"Add user"** → **"Create new user"**
6. Enter:
   - **Email:** `admin@shakeb.tech` (or your preferred email)
   - **Password:** Choose a strong password
   - **Auto Confirm User:** ✅ Check this box
7. Click **"Create user"**

## Step 3: Configure Environment Variables 🔐

1. In your Supabase dashboard, go to **"Settings"** → **"API"**
2. Copy the **"Project URL"**
3. Copy the **"anon/public"** key

Create a file named `.env.local` in the root of your project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Run the Development Server 🎉

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see your beautiful portfolio with all the seed data!

## Step 5: Access the Admin Panel 🔒

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Log in with the credentials you created:
   - **Email:** `admin@shakeb.tech` (or what you chose)
   - **Password:** Your password
3. Start managing your content!

## Customization Tips 🎨

### Update Hero Content

1. Go to admin panel
2. Click **"🏠 Hero Content"** tab
3. Update your name, title, description, etc.
4. Click **"Update Hero Content"**
5. Changes reflect instantly on the main page!

### Add Your Projects

1. Go to **"📁 Projects"** tab
2. Fill in project details
3. Add technologies as comma-separated values
4. Click **"Add Project"**

### Update Your Skills

1. Go to **"💡 Skills"** tab
2. Add skills with percentage levels (0-100)
3. Skills will show with animated progress bars

### Change Social Links

1. Go to **"📱 Contact Links"** tab
2. Update URLs to your actual profiles
3. Add or remove links as needed

## Troubleshooting 🔧

### "Failed to fetch" errors
- ✅ Check that `.env.local` exists with correct values
- ✅ Make sure Supabase project is running
- ✅ Verify the URL and key are correct

### 3D background not showing
- ✅ Check browser console for errors
- ✅ Make sure browser supports WebGL
- ✅ Try a different browser (Chrome/Firefox recommended)

### Admin login not working
- ✅ Verify you created the user in Supabase
- ✅ Check that "Auto Confirm User" was enabled
- ✅ Try resetting the password in Supabase dashboard

### Real-time updates not working
- ✅ Ensure Realtime replication is enabled for all tables
- ✅ Check browser console for subscription errors
- ✅ Refresh the page

## Deploy to Production 🚀

### Quick Deploy to Vercel

1. Push your code to GitHub (remember to commit `.env.local` to `.gitignore`!)
2. Go to [https://vercel.com](https://vercel.com)
3. Click **"Import Project"**
4. Select your GitHub repository
5. Add the same environment variables from `.env.local`
6. Click **"Deploy"**
7. Done! Your site will be live in ~2 minutes

### Add Custom Domain

1. In Vercel dashboard, go to **"Settings"** → **"Domains"**
2. Add your domain (e.g., `yourdomain.com`)
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (~24 hours max)

## What's Next? 🎯

- [ ] Replace seed data with your actual projects
- [ ] Update social media links
- [ ] Customize colors and styling
- [ ] Add your own images/photos
- [ ] Set up a custom domain
- [ ] Share your amazing portfolio with the world!

---

Need help? Check the main [README.md](README.md) for detailed documentation.

**Happy building! 🚀**

