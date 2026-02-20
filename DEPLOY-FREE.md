# Deploy Everything for FREE! 🚀

## Complete Free Deployment Guide

### Step 1: Deploy Backend to Render (FREE)

**Why Render?**
- ✅ 750 hours/month FREE (24/7 uptime)
- ✅ Supports Python + AI models
- ✅ Auto-deploys from GitHub
- ✅ 512MB RAM (enough for YOLO)
- ⚠️ Sleeps after 15 min inactivity (wakes in ~30 sec)

**Steps:**

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Go to [render.com](https://render.com)**
   - Sign up with GitHub (free)
   - Click "New +" → "Web Service"

3. **Connect your repository**
   - Select your portfolio repo
   - Name: `safir-portfolio-backend`
   - Region: Oregon (or closest to you)
   - Branch: `main`
   - Root Directory: `backend`

4. **Configure build settings**
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

5. **Select Free plan**
   - Click "Free" (not "Starter")
   - Click "Create Web Service"

6. **Wait for deployment** (~5-10 minutes)
   - Render will give you a URL like: `https://safir-portfolio-backend.onrender.com`

7. **Copy your backend URL** - you'll need it for frontend!

### Step 2: Deploy Frontend to Vercel (FREE)

**Why Vercel?**
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Instant deployments
- ✅ Free forever

**Steps:**

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up with GitHub (free)
   - Click "Add New..." → "Project"

2. **Import your repository**
   - Select your portfolio repo
   - Click "Import"

3. **Configure project**
   - Framework Preset: `Next.js` (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://safir-portfolio-backend.onrender.com` (your Render URL)
   - Click "Add"

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live at: `https://your-project.vercel.app`

### Step 3: Update Backend CORS

After deployment, update your backend to allow requests from Vercel:

**Edit `backend/app/main.py`:**

```python
from fastapi.middleware.cors import CORSMiddleware

# Add after creating app
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://your-project.vercel.app",  # Your Vercel URL
        "https://*.vercel.app",  # All Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Push changes:**
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy the update!

## 🎉 You're Done!

**Your portfolio is now live:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://safir-portfolio-backend.onrender.com`
- Chatbot: ✅ Working
- YOLO Demo: ✅ Working
- All features: ✅ Working

**Total Cost: $0.00/month** 🎊

## Important Notes

### Render Free Tier Limitations
- **Sleeps after 15 min inactivity**
  - First request after sleep takes ~30 seconds
  - Subsequent requests are instant
  - Good for portfolio/demo purposes

- **750 hours/month**
  - Enough for 24/7 uptime
  - Resets monthly

- **512MB RAM**
  - Enough for YOLOv8n (nano model)
  - If you need more, upgrade to paid ($7/month)

### Keep Backend Awake (Optional)

**Option 1: Use Cron Job (Free)**
Create a free cron job at [cron-job.org](https://cron-job.org):
- URL: `https://safir-portfolio-backend.onrender.com/health`
- Interval: Every 10 minutes
- Keeps your backend awake

**Option 2: UptimeRobot (Free)**
- Sign up at [uptimerobot.com](https://uptimerobot.com)
- Add your backend URL
- Pings every 5 minutes
- Keeps backend awake

## Alternative: Hugging Face Spaces (Also FREE)

If Render doesn't work, try Hugging Face Spaces:

1. Go to [huggingface.co/spaces](https://huggingface.co/spaces)
2. Create new Space
3. Select "Gradio" SDK
4. Upload your backend code
5. Free GPU available!

## Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify `requirements.txt` is correct
- Check if service is sleeping (first request is slow)

### CORS errors
- Update `allow_origins` in backend
- Redeploy backend after changes

### Frontend not connecting to backend
- Verify `NEXT_PUBLIC_API_URL` in Vercel
- Check if URL has trailing slash (remove it)
- Redeploy frontend after env var changes

## Upgrade Options (If Needed)

**If free tier isn't enough:**
- **Render:** $7/month (no sleep, more RAM)
- **Railway:** $5/month credit
- **Vercel:** Free tier is usually enough

## Summary

✅ **Frontend:** Vercel (Free forever)
✅ **Backend:** Render (Free with limitations)
✅ **Total Cost:** $0/month
✅ **All features working**
✅ **Professional portfolio live**

**Deployment time:** ~20 minutes total

Need help? Check the logs in Render/Vercel dashboards!
