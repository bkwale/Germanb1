# Deployment Guide - Vercel

## ✅ Code is now on GitHub!

Your app has been pushed to: **https://github.com/bkwale/Germanb1**

## 🚀 Deploy to Vercel (3 steps)

### Step 1: Go to Vercel
Open: [https://vercel.com](https://vercel.com)

Log in with your existing account.

### Step 2: Create New Project
1. Click **"Add New Project"** or **"Import Project"**
2. Select **"Import Git Repository"**
3. Find and select: **bkwale/Germanb1**

### Step 3: Configure and Deploy
Vercel will auto-detect it's a React app. Just:

**Build Settings** (should auto-fill):
- **Framework Preset:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

Click **"Deploy"**

That's it! In ~2 minutes you'll get a live URL like:
```
https://germanb1.vercel.app
```

## 📱 After Deployment

### Access Your App
- You'll get a URL like `https://germanb1-xxx.vercel.app`
- Works on any device with internet
- Add to phone home screen for app-like experience

### Auto-Updates
Every time you push to GitHub, Vercel will automatically redeploy!

```bash
cd "/Users/BK/Desktop/Saïd Business Sch/Full Course/Tech Idea/berlin-german-web"
git add .
git commit -m "Update dialogues"
git push
```

Vercel will automatically rebuild and deploy within 2 minutes.

## 🎯 For Your Immigration Interview

Now you can:
- Practice from anywhere (work, library, friend's phone)
- Share the URL with your wife
- Practice on commute using phone
- Access all 6 dialogues including your personalized immigration scenarios

## 🔧 Troubleshooting

If deployment fails:
1. Check that `package.json` has all dependencies
2. Make sure `build` script exists
3. Vercel logs will show any errors

## 📊 Custom Domain (Optional)

Want a custom domain like `learn-german.com`?
1. Buy domain (Namecheap, Google Domains, etc.)
2. In Vercel project → Settings → Domains
3. Add your domain
4. Update DNS records as shown

Good luck with your interview! 🇩🇪
