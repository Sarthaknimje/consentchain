# 🚀 QUICK DEPLOYMENT GUIDE - 5 Minutes!

## ✅ Prerequisites Done
- ✅ Code pushed to: https://github.com/Sarthaknimje/consentchain.git
- ✅ Smart Contract deployed: APP_ID `749685949`
- ✅ All configurations ready

---

## 📋 Deploy Now - 3 Easy Steps!

### **Step 1: Deploy to Vercel (2 minutes)**

#### Option A: One-Click Deploy 🎯 **EASIEST!**

1. Click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sarthaknimje/consentchain.git&project-name=consentchain&repository-name=consentchain)

2. Sign in with GitHub (use: sarthaknimje@gmail.com)
3. Click "Deploy"
4. Done! ✅

#### Option B: Manual Import

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Paste: `https://github.com/Sarthaknimje/consentchain.git`
4. Click "Import"
5. Click "Deploy"

---

### **Step 2: Setup MongoDB (2 minutes)** 🗄️

#### Quick MongoDB Atlas Setup:

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
   - Sign up with: `sarthaknimje@gmail.com`
   - Choose **FREE** M0 tier

2. **Create Cluster**:
   - Click "Build a Database"
   - Select "FREE" (M0)
   - Choose region closest to you
   - Cluster Name: `consentchain`
   - Click "Create"

3. **Create Database User**:
   - Username: `consentchain-admin`
   - Password: (auto-generate and save it!)
   - Click "Create User"

4. **Network Access**:
   - Click "Network Access" tab
   - Click "Add IP Address"
   - Click "ALLOW ACCESS FROM ANYWHERE"
   - Click "Confirm"

5. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://consentchain-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your password
   - Add database name after `.net/`: 
   ```
   mongodb+srv://consentchain-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/consentchain?retryWrites=true&w=majority
   ```

---

### **Step 3: Add Environment Variable to Vercel (1 minute)** ⚙️

1. **Go to your Vercel project**: https://vercel.com/dashboard
2. Click on your **"consentchain"** project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in sidebar
5. Add this variable:

   **Name**: `MONGODB_URI`  
   **Value**: `mongodb+srv://consentchain-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/consentchain?retryWrites=true&w=majority`  
   **Environment**: ✅ Production, ✅ Preview, ✅ Development

6. Click **"Save"**
7. Go to **"Deployments"** tab
8. Click **"..."** menu on latest deployment
9. Click **"Redeploy"**

---

## 🎉 DONE! Your App is Live!

### Your Live URLs:

- **Frontend**: `https://consentchain.vercel.app`
- **Backend API**: `https://consentchain.vercel.app/api`
- **GitHub**: https://github.com/Sarthaknimje/consentchain.git

---

## 📱 Test Your Deployment

1. **Visit**: Your Vercel URL
2. **Click**: "Connect Wallet"
3. **Open**: Pera Wallet app on mobile
4. **Scan**: QR code to connect
5. **Create**: A consent request
6. **Sign**: Transaction in Pera Wallet
7. **Success**: View transaction on blockchain! 🎊

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| **Live App** | https://consentchain.vercel.app |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **MongoDB Atlas** | https://cloud.mongodb.com |
| **GitHub Repo** | https://github.com/Sarthaknimje/consentchain |
| **Smart Contract** | https://testnet.algoexplorer.io/application/749685949 |

---

## 🐛 Troubleshooting

### Build Fails?
- Check build logs in Vercel dashboard
- Ensure MongoDB URI is correctly set

### MongoDB Connection Error?
- Verify MongoDB URI format
- Check IP whitelist in MongoDB Atlas (allow all: `0.0.0.0/0`)
- Ensure database user has read/write permissions

### Pera Wallet Not Opening?
- Works best on mobile devices
- For desktop, install Pera Wallet browser extension
- Check browser console for errors

---

## 🎯 What You Get

✅ **Blockchain Integration**: All consents on Algorand TestNet  
✅ **Pera Wallet**: Sign transactions securely  
✅ **Smart Contract**: APP_ID `749685949` deployed  
✅ **Document Control**: Auto-hide on expiry/revocation  
✅ **MongoDB Backend**: Store metadata  
✅ **Production Ready**: SSL, CDN, Global deployment

---

## 🚀 You're Live in Production!

**Total Time**: ~5 minutes  
**Cost**: $0 (Free tiers for everything!)  
**Users**: Unlimited  
**Blockchain**: Algorand TestNet  

### Share with users:
📧 Email: sarthaknimje@gmail.com  
🐙 GitHub: @Sarthaknimje  
🌐 App: https://consentchain.vercel.app

---

## 💡 Next Steps

1. ✅ Test all features
2. ✅ Share app URL with users
3. ✅ Monitor Vercel Analytics
4. ✅ Check MongoDB Atlas for data
5. ✅ View transactions on AlgoExplorer

**Your blockchain consent management system is LIVE! 🎊**

