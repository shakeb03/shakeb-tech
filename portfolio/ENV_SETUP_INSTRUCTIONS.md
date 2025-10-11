# ⚡ Quick .env Setup Instructions

## Step 1: Create .env File

In your portfolio folder (`/Users/lenovo/Desktop/shakeb-tech/portfolio/`), create a file named `.env`

## Step 2: Add These Lines

Copy and paste this into your `.env` file:

```
REACT_APP_SUPABASE_URL=your-project-url-here.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=shakeb123
```

## Step 3: Get Your Supabase Credentials

1. Go to your Supabase project: https://app.supabase.com
2. Click on **Settings** (gear icon in sidebar)
3. Click on **API**
4. Copy these two values:
   - **Project URL** → Replace `your-project-url-here.supabase.co`
   - **anon public** key → Replace `your-anon-key-here`

## Example .env File

```bash
# Replace with YOUR actual values from Supabase
REACT_APP_SUPABASE_URL=https://abcdefghijk.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyNzA4MDAsImV4cCI6MTk5MDg0NjgwMH0.EXAMPLE-TOKEN-HERE
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=shakeb123
```

## ⚠️ Important Notes

- **Don't commit .env to git** - It's already in .gitignore ✅
- **Keep your keys secret** - Never share them publicly
- **Restart dev server** after creating .env file:
  ```bash
  npm start
  ```

## ✅ Verification

After restarting, check browser console:
- Should see: `"✅ Supabase configured - loading data from database"`
- If you see: `"⚠️ Supabase not configured"` → Check your .env file

---

**That's it! Your Supabase is ready to use!** 🎉


