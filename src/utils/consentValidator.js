/**
 * Consent Validation Utilities
 * Validates if a user has access to documents based on consent status and expiry
 */

/**
 * Check if consent is valid (granted and not expired)
 * @param {Object} consentRequest - The consent request object
 * @returns {boolean} - True if consent is valid, false otherwise
 */
export const isConsentValid = (consentRequest) => {
  if (!consentRequest) return false;
  
  // Check status is granted
  if (consentRequest.status !== 'granted') {
    return false;
  }
  
  // Check if not expired
  if (consentRequest.expiryDate) {
    const expiryDate = new Date(consentRequest.expiryDate);
    const now = new Date();
    if (now > expiryDate) {
      return false;
    }
  }
  
  // Check if grantedAt exists (sanity check)
  if (!consentRequest.grantedAt) {
    return false;
  }
  
  return true;
};

/**
 * Check if consent has expired
 * @param {Object} consentRequest - The consent request object
 * @returns {boolean} - True if expired, false otherwise
 */
export const isConsentExpired = (consentRequest) => {
  if (!consentRequest || !consentRequest.expiryDate) {
    return false;
  }
  
  const expiryDate = new Date(consentRequest.expiryDate);
  const now = new Date();
  return now > expiryDate;
};

/**
 * Check if consent is revoked
 * @param {Object} consentRequest - The consent request object
 * @returns {boolean} - True if revoked, false otherwise
 */
export const isConsentRevoked = (consentRequest) => {
  if (!consentRequest) return false;
  return consentRequest.status === 'revoked';
};

/**
 * Check if user can view document
 * @param {Object} consentRequest - The consent request object
 * @param {string} userAddress - The user's wallet address
 * @returns {Object} - { canView: boolean, reason: string }
 */
export const canViewDocument = (consentRequest, userAddress) => {
  if (!consentRequest) {
    return { canView: false, reason: 'No consent request found' };
  }
  
  // Check if user is part of the consent (sender or recipient)
  const isParticipant = 
    consentRequest.sender === userAddress || 
    consentRequest.recipient === userAddress;
    
  if (!isParticipant) {
    return { canView: false, reason: 'You are not part of this consent' };
  }
  
  // Check if revoked
  if (isConsentRevoked(consentRequest)) {
    return { canView: false, reason: 'Consent has been revoked' };
  }
  
  // Check if expired
  if (isConsentExpired(consentRequest)) {
    return { canView: false, reason: 'Consent has expired' };
  }
  
  // Check if granted
  if (consentRequest.status !== 'granted') {
    return { canView: false, reason: 'Consent not granted yet' };
  }
  
  return { canView: true, reason: 'Access granted' };
};

/**
 * Get consent status label and color
 * @param {Object} consentRequest - The consent request object
 * @returns {Object} - { label: string, color: string, icon: string }
 */
export const getConsentStatusDisplay = (consentRequest) => {
  if (!consentRequest) {
    return { label: 'Unknown', color: 'gray', icon: '❓' };
  }
  
  if (isConsentRevoked(consentRequest)) {
    return { label: 'Revoked', color: 'red', icon: '🚫' };
  }
  
  if (isConsentExpired(consentRequest)) {
    return { label: 'Expired', color: 'orange', icon: '⏰' };
  }
  
  if (consentRequest.status === 'granted') {
    return { label: 'Active', color: 'green', icon: '✅' };
  }
  
  if (consentRequest.status === 'pending') {
    return { label: 'Pending', color: 'yellow', icon: '⏳' };
  }
  
  return { label: consentRequest.status, color: 'gray', icon: '📋' };
};

/**
 * Calculate remaining time for consent
 * @param {Object} consentRequest - The consent request object
 * @returns {string} - Human readable remaining time
 */
export const getRemainingTime = (consentRequest) => {
  if (!consentRequest || !consentRequest.expiryDate) {
    return 'No expiry';
  }
  
  const expiryDate = new Date(consentRequest.expiryDate);
  const now = new Date();
  
  if (now > expiryDate) {
    return 'Expired';
  }
  
  const diff = expiryDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  }
  
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
  }
  
  return 'Less than 1 hour';
};

export default {
  isConsentValid,
  isConsentExpired,
  isConsentRevoked,
  canViewDocument,
  getConsentStatusDisplay,
  getRemainingTime
};

