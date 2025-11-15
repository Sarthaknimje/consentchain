import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  loading: boolean;
}

interface WalletContextType {
  wallet: WalletState;
  isConnectedToPeraWallet: boolean;
  isConnected: boolean;
  accounts: string[];
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  peraWallet: PeraWalletConnect | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnectedToPeraWallet, setIsConnectedToPeraWallet] = useState<boolean>(false);
  const [peraWallet, setPeraWallet] = useState<PeraWalletConnect | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [address, setAddress] = useState<string | null>(null);

  // Handle disconnect - defined first so it can be used in effects
  const handleDisconnect = () => {
    setAccounts([]);
    setAddress(null);
    setIsConnectedToPeraWallet(false);
  };

  const connectWallet = async () => {
    if (!peraWallet) {
      console.error('Pera Wallet not initialized');
      return;
    }
    
    try {
      const accounts = await peraWallet.connect();
      
      // Setup disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnect);
      
      setAccounts(accounts);
      setAddress(accounts[0]);
      setIsConnectedToPeraWallet(true);
    } catch (error) {
      console.error('Error connecting to Pera Wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    if (!peraWallet) {
      console.error('Pera Wallet not initialized');
      return;
    }
    
    try {
      await peraWallet.disconnect();
      handleDisconnect();
    } catch (error) {
      console.error('Error disconnecting from Pera Wallet:', error);
    }
  };

  useEffect(() => {
    const peraWalletInstance = new PeraWalletConnect({
      chainId: 416002 // TestNet
    });
    setPeraWallet(peraWalletInstance);

    // Check if already connected
    const checkConnection = async () => {
      try {
        const accounts = await peraWalletInstance.reconnectSession();
        
        // Setup disconnect event listener
        peraWalletInstance.connector?.on("disconnect", handleDisconnect);
        
        if (accounts.length > 0) {
          setAccounts(accounts);
          setAddress(accounts[0]);
          setIsConnectedToPeraWallet(true);
        }
      } catch (error) {
        console.error('Error checking Pera Wallet connection:', error);
      }
    };

    checkConnection();
  }, []);

  // Create a wallet object that matches the expected interface
  const wallet = {
    address,
    isConnected: isConnectedToPeraWallet,
    loading: false,
  };

  const value = {
    wallet, // New unified wallet object
    isConnectedToPeraWallet,
    isConnected: isConnectedToPeraWallet, // Alias for compatibility
    accounts,
    address,
    connectWallet,
    disconnectWallet,
    peraWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 