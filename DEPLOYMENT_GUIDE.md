# 🚀 Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

- ✅ Code pushed to GitHub: https://github.com/Sarthaknimje/consentchain.git
- ✅ Smart Contract deployed: APP_ID `749685949`
- ✅ Pera Wallet integration complete
- ✅ Frontend and Backend ready

---

## 🌐 Deploy to Vercel

### Step 1: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select **"GitHub"** and authorize Vercel
5. Search for: `consentchain`
6. Click **"Import"**

### Step 2: Configure Build Settings

Vercel will auto-detect React app. Configure:

**Framework Preset:** `Create React App`

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
build
```

**Install Command:**
```bash
npm install
```

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add:

```env
# MongoDB (REQUIRED)
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/consent-db?retryWrites=true&w=majority

# Node Environment
NODE_ENV=production

# Algorand (Already configured in code, but can override)
REACT_APP_ALGORAND_NETWORK=testnet
REACT_APP_ALGORAND_APP_ID=749685949
REACT_APP_ALGOD_SERVER=https://testnet-api.algonode.cloud
```

### Step 4: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://consentchain.vercel.app`

---

## 🗄️ MongoDB Atlas Setup

### Create Free MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in with: `sarthaknimje@gmail.com`
3. Click **"Build a Database"** → **"Free Tier"**
4. Choose cloud provider and region (closest to you)
5. Click **"Create Cluster"**

### Get Connection String

1. Click **"Connect"** on your cluster
2. Click **"Connect your application"**
3. Copy connection string:
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/
```
4. Replace `<username>` and `<password>` with your credentials
5. Add this to Vercel environment variables

### Whitelist IP Addresses

1. Go to **"Network Access"** in MongoDB Atlas
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Vercel)
4. Confirm

---

## ✅ Post-Deployment

### Test Your Deployment

1. **Visit your Vercel URL**
2. **Connect Pera Wallet**
3. **Create a consent request**
4. **Sign transaction in Pera Wallet**
5. **Verify on blockchain explorer**

### Custom Domain (Optional)

1. Go to Vercel project settings
2. Click **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed

---

## 🔧 Troubleshooting

### Build Fails

**Problem:** Build fails on Vercel

**Solution:**
- Check build logs in Vercel dashboard
- Ensure all dependencies in `package.json`
- Try building locally: `npm run build`

### MongoDB Connection Error

**Problem:** Backend can't connect to MongoDB

**Solution:**
- Verify `MONGODB_URI` in Vercel environment variables
- Check MongoDB Atlas IP whitelist
- Ensure database user has read/write permissions

### Pera Wallet Not Opening

**Problem:** Pera Wallet doesn't open on mobile

**Solution:**
- Pera Wallet integration works best on mobile
- For desktop, ensure Pera Wallet browser extension is installed
- Check console for errors

### Smart Contract Errors

**Problem:** Transactions fail on blockchain

**Solution:**
- Verify APP_ID is correct: `749685949`
- Check Algorand TestNet status
- Ensure wallet has sufficient ALGO for fees (0.001 ALGO per transaction)

---

## 📊 Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
1. Go to project settings
2. Click **"Analytics"**
3. Enable analytics

### MongoDB Atlas Monitoring

1. Go to MongoDB Atlas dashboard
2. View cluster metrics
3. Monitor connections and queries

---

## 🔐 Security

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Use Vercel environment variables
- ✅ Rotate MongoDB credentials regularly

### Smart Contract

- ✅ Contract deployed on TestNet (APP_ID: 749685949)
- ✅ For production, deploy new contract on MainNet
- ✅ Audit smart contract before MainNet deployment

---

## 📞 Support

**Developer:** Sarthak Nimje  
**Email:** sarthaknimje@gmail.com  
**GitHub:** https://github.com/Sarthaknimje/consentchain

---

## 🎉 You're Live!

Your ConsentChain app is now deployed and ready to use! 🚀

**Live URL:** https://consentchain.vercel.app (or your custom domain)

Share with users:
1. Connect Pera Wallet
2. Request consent for documents
3. Grant/revoke consent
4. All recorded on Algorand blockchain!

