# 🔐 Document Visibility Control - IMPLEMENTED

## ✅ **Complete Implementation**

Your consent management system now has **full document visibility control** based on consent status!

---

## 🛡️ **How It Works**

### **When Consent is REVOKED**:
1. ❌ Documents **immediately become invisible** to the other party
2. 🗑️ Consent request **removed from consented documents list**
3. 🚫 Any attempt to view document shows **access denied**
4. ⛓️ **Blockchain transaction** records the revocation
5. 💾 Database updated with revocation status

### **When Consent EXPIRES**:
1. ⏰ System **automatically checks expiry** before showing documents
2. ❌ Expired consents **filtered out** from document list
3. 🚫 Expired documents **cannot be viewed**
4. 📅 User sees **"Consent has expired"** message

---

## 🔗 **Smart Contract Integration**

### ✅ All Operations Now Trigger Blockchain:

#### 1️⃣ **REQUEST CONSENT**
```
Page: /request-consent
Flow:
  1. User fills form
  2. Database: Create request
  3. 📱 Pera Wallet: Opens for signature
  4. ⛓️ Algorand: request_consent() executed
  5. ✅ Transaction recorded on-chain
```

#### 2️⃣ **GRANT CONSENT**
```
Page: /grant-consent or /dashboard
Flow:
  1. User selects documents
  2. 📱 Pera Wallet: Opens for signature
  3. ⛓️ Algorand: grant_consent() executed
  4. 💾 Database: Status → 'granted'
  5. ✅ Documents become visible
```

#### 3️⃣ **REVOKE CONSENT**
```
Page: /consented-documents or /dashboard
Flow:
  1. User clicks "Revoke"
  2. 📱 Pera Wallet: Opens for signature
  3. ⛓️ Algorand: revoke_consent() executed
  4. 💾 Database: Status → 'revoked'
  5. ❌ Documents immediately hidden
```

---

## 🎯 **Consent Validator**

### New Utility: `src/utils/consentValidator.js`

#### Functions:

**1. `canViewDocument(consentRequest, userAddress)`**
   - Returns: `{ canView: boolean, reason: string }`
   - Checks: Revoked, Expired, Granted status
   - Usage: Before displaying any document

**2. `isConsentExpired(consentRequest)`**
   - Returns: `boolean`
   - Compares current time with expiryDate

**3. `isConsentRevoked(consentRequest)`**
   - Returns: `boolean`
   - Checks if status === 'revoked'

**4. `getConsentStatusDisplay(consentRequest)`**
   - Returns: `{ label, color, icon }`
   - Shows visual status indicator

**5. `getRemainingTime(consentRequest)`**
   - Returns: Human-readable time remaining
   - Example: "5 days remaining"

---

## 📋 **Document Visibility Rules**

### ✅ **Documents ARE Visible When:**
- Consent status === 'granted'
- Expiry date hasn't passed
- User is part of consent (sender or recipient)
- Permissions allow viewing

### ❌ **Documents are HIDDEN When:**
- Consent status === 'revoked'
- Consent has expired
- User is not authorized
- Permissions don't allow viewing

---

## 💡 **Implementation Details**

### **ConsentedDocuments.js Updates:**

```javascript
// OLD: Shows all granted consents
const grantedRequests = allRequests.filter(req => 
  req.status === 'granted'
);

// NEW: Only shows valid (not expired/revoked) consents
const grantedRequests = allRequests.filter(req => {
  if (req.status !== 'granted') return false;
  if (isConsentRevoked(req) || isConsentExpired(req)) {
    return false; // ❌ HIDE
  }
  return true; // ✅ SHOW
});
```

### **Document View Validation:**

```javascript
const handleViewDocument = (document) => {
  // ✅ Check consent status first
  const validation = canViewDocument(document, address);
  if (!validation.canView) {
    toast.error(`❌ ${validation.reason}`);
    return; // BLOCKED!
  }
  
  // ✅ Check permissions
  if (!document.permissions?.view) {
    toast.error('❌ No view permission');
    return; // BLOCKED!
  }
  
  // ✅ All checks passed - show document
  setSelectedDocument(document);
};
```

### **Revoke with Blockchain:**

```javascript
const handleRevokeConsent = async (requestId) => {
  // 1. Trigger smart contract
  await revokeConsentWithPera({ sender, peraWallet });
  
  // 2. Update database
  await updateConsentRequest(requestId, { status: 'revoked' });
  
  // 3. Hide documents immediately
  setConsentedDocuments(prev => 
    prev.filter(doc => doc.requestId !== requestId)
  );
  
  // ✅ Documents no longer visible!
};
```

---

## 🔒 **Security Features**

### **Automatic Protections:**

1. **Time-based Access Control**
   - System checks expiry on every access
   - Expired consents automatically hidden

2. **Revocation Enforcement**
   - Instant removal from document list
   - All access attempts blocked

3. **Permission Validation**
   - Each document view validated
   - Screenshot/download/copy controlled

4. **Blockchain Verification**
   - All status changes recorded on-chain
   - Immutable audit trail

---

## 📊 **Test Scenarios**

### **Test 1: Expiry**
```bash
# 1. Grant consent with 1-day expiry
# 2. Wait or manually change expiry date
# 3. Reload /consented-documents
# Result: Document no longer visible ✅
```

### **Test 2: Revocation**
```bash
# 1. Go to /consented-documents
# 2. Click "Revoke" on a consent
# 3. Sign with Pera Wallet
# 4. Observe document disappears
# Result: Document immediately hidden ✅
```

### **Test 3: Blockchain Verification**
```bash
# 1. Revoke a consent
# 2. Check console for transaction ID
# 3. Visit AlgoExplorer with TX ID
# Result: revoke_consent() visible on-chain ✅
```

---

## 🎯 **User Flow Examples**

### **Scenario: Sharing Medical Records**

```
Dr. Smith → Patient John
Grant: Medical records for insurance claim
Expiry: 30 days

After 30 days:
❌ Dr. Smith can no longer view records
✅ John can revoke anytime
⛓️ All actions recorded on blockchain
```

### **Scenario: Employment Verification**

```
Employee → HR Company
Grant: ID & Address proof
Expiry: 7 days

If employee revokes:
❌ HR loses access immediately
📱 Pera Wallet confirms revocation
⛓️ Smart contract records revocation
```

---

## 📱 **Pages with Visibility Control**

### ✅ **/consented-documents**
- Shows only valid (granted, not expired, not revoked) documents
- Auto-hides expired consents
- Removes revoked consents instantly

### ✅ **/dashboard**
- Filters pending/granted/revoked tabs
- Shows status badges
- Enables revocation with blockchain

### ✅ **/grant-consent**
- Records grants on blockchain
- Sets expiry dates
- Defines permissions

---

## 🔗 **Smart Contract Functions**

### **App ID: 749685949**

View on AlgoExplorer:
https://testnet.algoexplorer.io/application/749685949

### **Functions:**
1. `request_consent` - Create new request ✅
2. `grant_consent` - Grant access ✅
3. `revoke_consent` - Revoke access ✅
4. `view_document` - Verify access ✅

---

## ✅ **Summary**

### **What's Now Working:**

✅ **Revoked consents** → Documents hidden  
✅ **Expired consents** → Documents hidden  
✅ **All operations** → Trigger blockchain  
✅ **Pera Wallet** → Signs all transactions  
✅ **Real-time updates** → Immediate UI changes  
✅ **Security validation** → Every access checked  
✅ **Audit trail** → All actions on-chain  

---

## 🚀 **Test Now!**

```bash
# 1. Open app
open http://localhost:3000/consented-documents

# 2. View a consented document
# See: Document visible ✅

# 3. Revoke the consent
# Click "Revoke" → Sign with Pera Wallet

# 4. Observe
# Document immediately disappears! ❌

# 5. Try to access again
# See: "Consent has been revoked" ❌
```

---

**Your consent management system now has COMPLETE document visibility control with blockchain verification!** 🎊🔐

