# 🗄️ MongoDB Atlas - Automated Setup Guide

## Copy-Paste Configuration

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with: **sarthaknimje@gmail.com**
3. Choose **FREE** tier (M0)

### Step 2: Quick Cluster Setup

**Cluster Name**: `consentchain-cluster`  
**Provider**: AWS  
**Region**: Choose closest to your location  
**Tier**: M0 Sandbox (FREE)

### Step 3: Database User (Copy-Paste)

```
Username: consentchain-admin
Password: (Auto-generate or use: ConsentChain2025!)
```

### Step 4: Network Access

**Option 1 (Recommended for Vercel):**
- IP Address: `0.0.0.0/0`
- Description: Allow from anywhere (Vercel needs this)

**Option 2 (More Secure):**
Add these Vercel IP ranges:
```
76.76.21.0/24
76.76.21.21
76.76.21.142
76.76.21.164
76.76.21.98
```

### Step 5: Connection String

Your connection string will look like:
```
mongodb+srv://consentchain-admin:YOUR_PASSWORD@consentchain-cluster.xxxxx.mongodb.net/consentchain?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_PASSWORD` with your actual password
- `xxxxx` with your cluster ID (MongoDB will show you)

---

## For Vercel Environment Variable

Go to: https://vercel.com/dashboard  
→ Select your `consentchain` project  
→ Settings  
→ Environment Variables  
→ Add:

```
Name: MONGODB_URI
Value: mongodb+srv://consentchain-admin:YOUR_PASSWORD@consentchain-cluster.xxxxx.mongodb.net/consentchain?retryWrites=true&w=majority
Apply to: Production, Preview, Development
```

Click **Save** → **Redeploy**

---

## Test Connection

After deploying, test your API:

```bash
curl https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "mongodb": "connected",
  "algorand": "connected"
}
```

---

## Database Collections (Auto-Created)

Your app will automatically create these collections:
- `consentrequests` - All consent requests
- `documents` - Document metadata
- `users` - User profiles
- `notifications` - User notifications

---

## MongoDB Compass (Optional - for GUI)

1. Download: https://www.mongodb.com/try/download/compass
2. Paste your connection string
3. View your data visually!

---

## Backup & Monitoring

**Free Features:**
- ✅ Automatic backups (point-in-time)
- ✅ Performance monitoring
- ✅ Query profiler
- ✅ Alerts

Access in MongoDB Atlas dashboard

---

## Troubleshooting

### Can't Connect?
✅ Check IP whitelist (0.0.0.0/0 for Vercel)  
✅ Verify username/password  
✅ Ensure database name in connection string  
✅ Check Vercel environment variable

### Slow Queries?
✅ Create indexes (app does this automatically)  
✅ Check MongoDB Atlas performance tab  
✅ Upgrade to M2+ for better performance

---

## Upgrade Path (When You Need It)

**Current**: M0 (512 MB storage, 100 connections)  
**Next**: M2 - $9/month (2 GB storage, 500 connections)  
**Scale**: M10+ for production with 1000+ users

---

✅ **You're all set!** MongoDB will scale automatically with your app.

