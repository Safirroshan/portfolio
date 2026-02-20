# Deployment Guide

## Overview
This portfolio has two parts:
1. **Frontend (Next.js)** - Can be deployed to Vercel
2. **Backend (FastAPI)** - Needs separate deployment for AI features

## Frontend Deployment to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

### Step 3: Configure Environment Variables (After Backend Deployment)
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.com`
3. Redeploy the project

## Backend Deployment Options

### Option 1: Railway (Recommended - Easy & Free Tier)
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Select the `backend` folder
4. Add environment variables if needed
5. Railway will provide a URL like `https://your-app.railway.app`
6. Update `NEXT_PUBLIC_API_URL` in Vercel with this URL

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Set root directory to `backend`
5. Build command: `pip install -r requirements.txt`
6. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Option 3: Disable AI Features (Quick Deploy)
If you want to deploy quickly without backend:

1. Comment out or disable AI features in the code
2. Show "Demo Available on Request" messages
3. Deploy only the frontend to Vercel

## What Works Without Backend

✅ **Works:**
- All UI/animations
- Project showcase
- About section
- Contact section
- Navigation
- All visual components

❌ **Needs Backend:**
- AI Chatbot
- YOLO Detection Demo
- Any real-time AI features

## Environment Variables

### Local Development (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Production (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## Testing Deployment

1. **Test locally first:**
   ```bash
   npm run build
   npm run start
   ```

2. **Check for errors:**
   - Open browser console
   - Look for API connection errors
   - Verify all pages load correctly

## CORS Configuration

Your FastAPI backend needs CORS enabled for production:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-domain.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

### Issue: AI features not working
- Check if `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is running and accessible
- Check browser console for CORS errors

### Issue: Build fails on Vercel
- Check for TypeScript errors locally first
- Run `npm run build` locally to catch issues
- Check Vercel build logs for specific errors

### Issue: Images not loading
- Ensure images are in the `public` folder
- Use relative paths starting with `/`
- Check image file names match exactly (case-sensitive)

## Recommended Deployment Strategy

**Phase 1: Frontend Only**
- Deploy to Vercel without backend
- Show "Coming Soon" for AI features
- Get the portfolio live quickly

**Phase 2: Add Backend**
- Deploy FastAPI backend to Railway/Render
- Update environment variables
- Enable AI features

## Cost Estimates

- **Vercel (Frontend):** Free tier available
- **Railway (Backend):** $5/month (free tier available with limits)
- **Render (Backend):** Free tier available (with sleep after inactivity)

## Need Help?

If you need assistance with deployment:
1. Check Vercel/Railway documentation
2. Review error logs carefully
3. Test locally before deploying
4. Ensure all environment variables are set correctly
