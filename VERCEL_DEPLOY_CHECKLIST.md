# ✅ Vercel Deployment Checklist

## Pre-Deployment (Already Done!)

- [x] Code pushed to GitHub
- [x] Smart contract deployed (APP_ID: 749685949)
- [x] Pera Wallet integration complete
- [x] vercel.json configured
- [x] Build scripts ready
- [x] Environment variables documented

---

## Deploy to Vercel (Follow These Steps)

### 🚀 ONE-CLICK DEPLOY (Easiest!)

**Step 1:** Click this URL:
```
https://vercel.com/new/clone?repository-url=https://github.com/Sarthaknimje/consentchain.git&project-name=consentchain&repository-name=consentchain&env=MONGODB_URI
```

**Step 2:** Sign in
- Click "Continue with GitHub"
- Use: sarthaknimje@gmail.com
- Authorize Vercel

**Step 3:** Configure
- Project Name: `consentchain`
- Framework: `Create React App` (auto-detected)
- Root Directory: `./`

**Step 4:** Environment Variables
- Add `MONGODB_URI` (see setup-mongodb.md)

**Step 5:** Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Done! ✅

---

## Post-Deployment Checklist

### Immediately After Deploy:

- [ ] Visit your Vercel URL
- [ ] Check if homepage loads
- [ ] Connect Pera Wallet (should open QR code)
- [ ] Test navigation (Dashboard, Consents, Documents)
- [ ] Check browser console for errors

### Within 5 Minutes:

- [ ] Create a test consent request
- [ ] Sign transaction in Pera Wallet
- [ ] Verify transaction on AlgoExplorer
- [ ] Check MongoDB for new data
- [ ] Test grant consent flow
- [ ] Test revoke consent

### Within 1 Hour:

- [ ] Set custom domain (optional)
- [ ] Enable Vercel Analytics
- [ ] Set up monitoring alerts
- [ ] Share URL with test users
- [ ] Document any issues

---

## Vercel Project Settings

### Recommended Configuration:

**Build & Development Settings:**
```
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
Development Command: npm start
```

**Environment Variables:**
```
MONGODB_URI=mongodb+srv://... (required)
NODE_ENV=production (automatic)
```

**Domains:**
- Default: `consentchain.vercel.app`
- Custom: Add your domain in settings

---

## Performance Optimization (Already Configured!)

✅ **vercel.json settings:**
- Static file caching
- API route optimization
- Automatic compression
- Global CDN enabled

✅ **Build optimization:**
- Code splitting
- Tree shaking
- Minification
- Source maps

---

## Monitoring & Analytics

### Enable These (Free):

1. **Vercel Analytics**
   - Project Settings → Analytics → Enable
   - Track real user metrics
   - Page performance

2. **Speed Insights**
   - Automatically enabled
   - Core Web Vitals
   - Performance score

3. **Logs**
   - Deployments → Functions → View Logs
   - Real-time error tracking
   - API request logs

---

## Common Issues & Solutions

### Build Fails

**Problem:** Build fails with module errors

**Solution:**
```bash
# Locally test build
npm run build

# Check package.json dependencies
# Ensure all used packages are listed
```

### API Routes 404

**Problem:** `/api/*` returns 404

**Solution:**
- Verify `server/index.js` exists
- Check `vercel.json` routing
- Ensure MongoDB URI is set

### Pera Wallet Not Opening

**Problem:** QR code doesn't appear

**Solution:**
- Check browser console
- Verify Pera Wallet script loaded
- Test on mobile device

### Slow Load Times

**Problem:** App loads slowly

**Solution:**
- Check Vercel region (should be closest to users)
- Enable Edge Functions (if needed)
- Review MongoDB query performance

---

## Scaling Your App

### Free Tier Limits:
- ✅ 100 GB bandwidth
- ✅ Unlimited deploys
- ✅ 100 GB-hours compute
- ✅ Serverless function invocations

### When to Upgrade:
- 🚀 More than 10k monthly users
- 🚀 Need custom deployment protection
- 🚀 Require advanced analytics
- 🚀 Need team collaboration

---

## Security Checklist

- [x] HTTPS enabled (automatic)
- [x] Environment variables secured
- [ ] Enable Vercel Authentication (optional)
- [ ] Set up domain security headers
- [ ] Configure CORS if needed
- [ ] Review MongoDB IP whitelist

---

## Backup & Rollback

### Rollback to Previous Version:
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find working deployment
4. Click "..." → "Promote to Production"

### Create Backup:
1. MongoDB Atlas: Auto-backup enabled
2. GitHub: All code versioned
3. Vercel: Keeps all deployments

---

## Support Resources

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Status: https://www.vercel-status.com

**ConsentChain:**
- GitHub: https://github.com/Sarthaknimje/consentchain
- Issues: Report on GitHub Issues
- Email: sarthaknimje@gmail.com

---

## Testing Checklist

### Functional Tests:

- [ ] Connect Pera Wallet
- [ ] Request consent
- [ ] Grant consent
- [ ] View documents
- [ ] Revoke consent
- [ ] Document disappears after revoke
- [ ] Document disappears after expiry

### Cross-Browser Tests:

- [ ] Chrome/Brave
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance Tests:

- [ ] Page load < 3 seconds
- [ ] Time to interactive < 5 seconds
- [ ] API response < 1 second
- [ ] Transaction signing < 10 seconds

---

## 🎉 Launch Checklist

Before announcing to users:

- [ ] All features tested ✅
- [ ] No console errors ✅
- [ ] MongoDB connected ✅
- [ ] Blockchain transactions working ✅
- [ ] Mobile responsive ✅
- [ ] Custom domain set (optional)
- [ ] Analytics enabled ✅
- [ ] README updated ✅
- [ ] License added ✅

---

## 🚀 You're Production Ready!

**Your Live App:**
```
https://consentchain.vercel.app
```

**Share with users:**
- Tweet about launch 🐦
- Post on LinkedIn 💼
- Share on GitHub 🐙
- Add to portfolio 📂

---

## Next Steps

1. ✅ Monitor initial users
2. ✅ Gather feedback
3. ✅ Fix any issues
4. ✅ Add new features
5. ✅ Scale as needed

**Congratulations on your deployment! 🎊**

