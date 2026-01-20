import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallets } from "@privy-io/react-auth/solana";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";

type ChainType = 'evm' | 'solana';

interface ActiveChainContextType {
  activeChainType: ChainType;
  setActiveChainType: (type: ChainType) => void;
}

const ActiveChainContext = createContext<ActiveChainContextType | undefined>(undefined);

export const ActiveChainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { wallets: solanaWallets } = useWallets();
  const { authenticated } = usePrivy();
  const { address: evmAddress } = useAccount();
  
  const solanaWallet = solanaWallets?.[0];
  const isSolanaConnected = !!solanaWallet && !!solanaWallet.address;
  
  const [activeChainType, setActiveChainType] = useState<ChainType>(() => {
    // Initialize based on which wallet is connected
    if (isSolanaConnected && !authenticated) {
      return 'solana';
    }
    return 'evm';
  });

  // Auto-detect chain type changes when wallets connect/disconnect
  useEffect(() => {
    if (!authenticated && !evmAddress && isSolanaConnected) {
      setActiveChainType('solana');
    } else if (authenticated && evmAddress && !isSolanaConnected) {
      setActiveChainType('evm');
    }
  }, [authenticated, evmAddress, isSolanaConnected]);

  return (
    <ActiveChainContext.Provider value={{ activeChainType, setActiveChainType }}>
      {children}
    </ActiveChainContext.Provider>
  );
};

export const useActiveChain = () => {
  const context = useContext(ActiveChainContext);
  if (!context) {
    throw new Error('useActiveChain must be used within ActiveChainProvider');
  }
  return context;
};
