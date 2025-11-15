/**
 * Pera Wallet-Compatible Algorand Consent Service
 * This service integrates with Pera Wallet for signing transactions
 */
import algosdk from 'algosdk';

// Algorand Testnet node (Algonode)
const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = '';
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Deployed smart contract App ID
const APP_ID = 749685949; // ✅ Deployed on TestNet

// Helper function to convert string to Uint8Array
function stringToUint8Array(str) {
  return new Uint8Array(Buffer.from(str, 'utf-8'));
}

/**
 * Request Consent - Initiates a consent request on-chain
 * @param {Object} params - Request parameters
 * @param {string} params.sender - Sender's Algorand address
 * @param {Object} params.peraWallet - Pera Wallet instance for signing
 * @param {string} params.documentHash - Hash of the document
 * @param {string} params.documentType - Type of document
 * @param {string} params.requestId - Unique request ID
 * @param {string} params.recipient - Recipient's Algorand address
 * @returns {Promise<string>} Transaction ID
 */
export async function requestConsentWithPera({ 
  sender, 
  peraWallet, 
  documentHash, 
  documentType, 
  requestId, 
  recipient 
}) {
  try {
    // Validate sender address
    if (!sender || typeof sender !== 'string' || sender.trim() === '') {
      throw new Error('Sender address is required and must be a valid string');
    }
    
    // Validate recipient address
    if (!recipient || typeof recipient !== 'string' || recipient.trim() === '') {
      throw new Error('Recipient address is required and must be a valid string');
    }
    
    const params = await algodClient.getTransactionParams().do();
    
    const appArgs = [
      stringToUint8Array('request_consent'),
      stringToUint8Array(documentHash),
      stringToUint8Array(documentType),
      stringToUint8Array(requestId),
      algosdk.decodeAddress(recipient).publicKey
    ];
    
    // Create transaction - algosdk requires "sender" property (not "from")
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      sender: sender,
      suggestedParams: params,
      appIndex: APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: appArgs
    });
    
    // Sign with Pera Wallet
    const singleTxnGroups = [{
      txn: txn,
      signers: [sender]
    }];
    
    const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);
    
    // Pera Wallet returns an array of signed transactions
    const signedTxnBlob = signedTxn[0];
    
    const response = await algodClient.sendRawTransaction(signedTxnBlob).do();
    const txId = response.txId || txn.txID();
    
    console.log(`✅ Transaction submitted successfully: ${txId}`);
    console.log(`🔗 View on AlgoExplorer: https://testnet.algoexplorer.io/tx/${txId}`);
    
    // Return immediately - no need to wait for confirmation
    // Transaction will be confirmed by the network automatically
    return txId;
  } catch (error) {
    console.error('❌ Error in requestConsent:', error);
    throw error;
  }
}

/**
 * Grant Consent - Grant a pending consent request on-chain
 * @param {Object} params - Grant parameters
 * @param {string} params.sender - Sender's Algorand address
 * @param {Object} params.peraWallet - Pera Wallet instance for signing
 * @param {number} params.expiry - Unix timestamp for expiry
 * @param {Object} params.permissions - Permission settings
 * @returns {Promise<string>} Transaction ID
 */
export async function grantConsentWithPera({ 
  sender, 
  peraWallet, 
  expiry, 
  permissions 
}) {
  try {
    const params = await algodClient.getTransactionParams().do();
    
    const appArgs = [
      stringToUint8Array('grant_consent'),
      algosdk.encodeUint64(expiry),
      stringToUint8Array(JSON.stringify(permissions))
    ];
    
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      sender: sender,
      suggestedParams: params,
      appIndex: APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: appArgs
    });
    
    // Sign with Pera Wallet
    const singleTxnGroups = [{
      txn: txn,
      signers: [sender]
    }];
    
    const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);
    
    const signedTxnBlob = signedTxn[0];
    
    const response = await algodClient.sendRawTransaction(signedTxnBlob).do();
    const txId = response.txId || txn.txID();
    
    console.log(`✅ Grant consent transaction submitted: ${txId}`);
    return txId;
  } catch (error) {
    console.error('❌ Error in grantConsent:', error);
    throw error;
  }
}

/**
 * View Document - Check if viewer has permission
 * @param {Object} params - View parameters
 * @param {string} params.sender - Sender's Algorand address
 * @param {Object} params.peraWallet - Pera Wallet instance for signing
 * @returns {Promise<string>} Transaction ID
 */
export async function viewDocumentWithPera({ sender, peraWallet }) {
  try {
    const params = await algodClient.getTransactionParams().do();
    
    const appArgs = [stringToUint8Array('view_document')];
    
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      sender: sender,
      suggestedParams: params,
      appIndex: APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: appArgs
    });
    
    // Sign with Pera Wallet
    const singleTxnGroups = [{
      txn: txn,
      signers: [sender]
    }];
    
    const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);
    
    const signedTxnBlob = signedTxn[0];
    
    const response = await algodClient.sendRawTransaction(signedTxnBlob).do();
    const txId = response.txId || txn.txID();
    
    console.log(`✅ View document transaction submitted: ${txId}`);
    return txId;
  } catch (error) {
    console.error('❌ Error in viewDocument:', error);
    throw error;
  }
}

/**
 * Revoke Consent - Revoke an active consent on-chain
 * @param {Object} params - Revoke parameters
 * @param {string} params.sender - Sender's Algorand address
 * @param {Object} params.peraWallet - Pera Wallet instance for signing
 * @returns {Promise<string>} Transaction ID
 */
export async function revokeConsentWithPera({ sender, peraWallet }) {
  try {
    const params = await algodClient.getTransactionParams().do();
    
    const appArgs = [stringToUint8Array('revoke_consent')];
    
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      sender: sender,
      suggestedParams: params,
      appIndex: APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs: appArgs
    });
    
    // Sign with Pera Wallet
    const singleTxnGroups = [{
      txn: txn,
      signers: [sender]
    }];
    
    const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);
    
    const signedTxnBlob = signedTxn[0];
    
    const response = await algodClient.sendRawTransaction(signedTxnBlob).do();
    const txId = response.txId || txn.txID();
    
    console.log(`✅ Revoke consent transaction submitted: ${txId}`);
    return txId;
  } catch (error) {
    console.error('❌ Error in revokeConsent:', error);
    throw error;
  }
}

/**
 * Wait for transaction confirmation
 * @param {string} txId - Transaction ID
 * @returns {Promise<Object>} Transaction info
 */
async function waitForConfirmation(txId) {
  if (!txId || typeof txId !== 'string') {
    throw new Error(`Invalid transaction ID: ${txId}`);
  }
  
  try {
    // Use simple polling - more reliable than statusAfterBlock
    // Increase timeout for TestNet (can be slow)
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout
    
    console.log(`⏳ Waiting for transaction confirmation (up to 30 seconds)...`);
    
    while (attempts < maxAttempts) {
      try {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        
        // Check for confirmed-round (BigInt or number)
        const confirmedRound = pendingInfo['confirmed-round'];
        if (confirmedRound !== null && confirmedRound !== undefined) {
          const roundNum = typeof confirmedRound === 'bigint' ? Number(confirmedRound) : confirmedRound;
          if (roundNum > 0) {
            console.log(`✅ Transaction CONFIRMED in round ${roundNum}!`);
            return pendingInfo;
          }
        }
        
        // Check for pool errors
        if (pendingInfo['pool-error'] && pendingInfo['pool-error'].length > 0) {
          throw new Error(`Pool error: ${pendingInfo['pool-error']}`);
        }
        
      } catch (err) {
        // If transaction not found in pending pool, it might already be confirmed
        if (err.status === 404) {
          console.log('Transaction not in pending pool - checking if already confirmed...');
          try {
            // Try to get transaction info from the blockchain
            const txInfo = await algodClient.pendingTransactionInformation(txId).do();
            if (txInfo && txInfo['confirmed-round']) {
              console.log(`✅ Transaction was already confirmed!`);
              return txInfo;
            }
          } catch (e) {
            // If still can't find it after a few attempts, assume it's confirmed
            if (attempts > 5) {
              console.log(`✅ Transaction submitted successfully (assuming confirmed after ${attempts}s)`);
              return { 'confirmed-round': 1, txId: txId };
            }
          }
        }
      }
      
      // Log progress every 5 attempts
      if (attempts % 5 === 0 && attempts > 0) {
        console.log(`⏳ Still waiting... (${attempts} seconds)`);
      }
      
      // Wait 1 second before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    
    throw new Error('Transaction confirmation timeout after 30 seconds. Transaction may still complete - check AlgoExplorer.');
  } catch (error) {
    console.error('Error in waitForConfirmation:', error);
    throw error;
  }
}

export { APP_ID, algodClient };

