# ConsentChain - Blockchain-Based Consent Management

A decentralized consent management system built on Algorand blockchain with Pera Wallet integration.

## 🚀 Features

- ✅ **Blockchain Integration**: Consent requests recorded on Algorand TestNet
- ✅ **Pera Wallet**: Secure transaction signing
- ✅ **Smart Contract**: APP ID `749685949` deployed on Algorand
- ✅ **Document Management**: Store and share documents with consent
- ✅ **Expiry & Revocation**: Automatic document hiding when consent expires or is revoked
- ✅ **IPFS Storage**: Decentralized document storage
- ✅ **MongoDB**: Backend database for request metadata

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Pera Wallet Connect SDK
- Algorand JavaScript SDK
- React Hot Toast

### Backend
- Node.js + Express
- MongoDB
- IPFS
- Algorand SDK

### Blockchain
- Algorand TestNet
- Smart Contract (APP_ID: 749685949)
- TEAL Language

## 📦 Installation

```bash
# Install dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

## 🔧 Configuration

1. Create `.env` file:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Algorand
REACT_APP_ALGORAND_NETWORK=testnet
REACT_APP_ALGORAND_APP_ID=749685949
REACT_APP_ALGOD_SERVER=https://testnet-api.algonode.cloud

# IPFS (optional)
IPFS_HOST=ipfs.infura.io
IPFS_PORT=5001
IPFS_PROTOCOL=https
```

## 🚀 Running Locally

```bash
# Start backend server (port 5001)
npm run server

# Start frontend (port 3000)
npm start

# Or run both concurrently
npm run dev
```

## 📱 Pera Wallet Integration

### Connect Wallet
```javascript
import { useWallet } from './context/WalletContext';

const { address, peraWallet, connectWallet } = useWallet();

// Connect
await connectWallet();
```

### Send Transaction
```javascript
import { requestConsentWithPera } from './services/peraWalletConsentService';

const txId = await requestConsentWithPera({
  sender: address,
  peraWallet: peraWallet,
  documentHash: 'hash',
  documentType: 'medical',
  requestId: 'id',
  recipient: 'ALGO_ADDRESS'
});
```

## 🎯 Consent Flow

1. **Request Consent**
   - User A requests consent from User B
   - Transaction recorded on Algorand blockchain
   - Notification sent to User B

2. **Grant Consent**
   - User B reviews and grants consent
   - Expiry time set (e.g., 30 days)
   - Permissions specified (view, download)
   - Transaction recorded on blockchain

3. **Access Document**
   - User A can access document while consent is active
   - System validates: not expired, not revoked
   - Each view triggers blockchain transaction

4. **Revoke Consent**
   - Either party can revoke consent
   - Document immediately becomes inaccessible
   - Transaction recorded on blockchain

## 🔐 Smart Contract Functions

- `request_consent`: Create consent request
- `grant_consent`: Grant consent with expiry
- `view_document`: Verify and record document access
- `revoke_consent`: Revoke active consent

## 🌐 Deployment

### Vercel Deployment

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Vercel
```
MONGODB_URI=your_mongodb_atlas_connection
NODE_ENV=production
```

## 📊 Project Structure

```
algorand/
├── contracts/           # Smart contract TEAL files
│   ├── consent_contract.teal
│   └── deploy_consent.py
├── server/             # Backend API
│   ├── index.js
│   └── models/
├── src/
│   ├── components/     # React components
│   ├── context/        # WalletContext
│   ├── pages/          # Main pages
│   ├── services/       # API & blockchain services
│   └── utils/          # Helper functions
└── public/
```

## 🔗 Links

- **Smart Contract**: [View on AlgoExplorer](https://testnet.algoexplorer.io/application/749685949)
- **GitHub**: https://github.com/Sarthaknimje/consentchain
- **Live Demo**: [Your Vercel URL]

## 👨‍💻 Developer

**Sarthak Nimje**  
Email: sarthaknimje@gmail.com  
GitHub: [@Sarthaknimje](https://github.com/Sarthaknimje)

## 📄 License

MIT License

## 🙏 Acknowledgments

- Algorand Foundation
- Pera Wallet Team
- Algonode for free API access
