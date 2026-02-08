import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../Components/Button/Button";
import { useChainManager } from "../../hooks/useChainManager";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useActiveChain } from "../../contexts/ActiveChainContext";

// import {  } from "@privy-io/react-auth/solana";
// import { baseSepolia, liskSepolia, arbitrumSepolia, optimismSepolia } from "viem/chains";

// Define chain types
type ChainType = "evm" | "solana";

interface ChainConfig {
  id: number | string;
  name: string;
  type: ChainType;
  chainId?: string;
}

const CHAINS: ChainConfig[] = [
  // EVM Chains
  // { id: Number(baseSepolia.id), name: "Base Sepolia", type: 'evm' },
  // { id: Number(liskSepolia.id), name: "Lisk Sepolia", type: 'evm' },
  // { id: Number(arbitrumSepolia.id), name: "Arbitrum Sepolia", type: 'evm' },
  // { id: Number(optimismSepolia.id), name: "Optimism Sepolia", type: 'evm' },
  // { id: 'solana:mainnet', name: "Solana Mainnet", type: 'solana', chainId: 'solana:mainnet' },
  { id: "solana:devnet", name: "Solana Devnet", type: "solana", chainId: "solana:devnet" },
];

export const ChainDropdown: React.FC = () => {
  const { chainId, switchChain, ready } = useChainManager();
  const { wallets: solanaWallets } = useWallets();
  const { user } = usePrivy();
  const { address: evmAddress } = useAccount();
  const solanaWallet = solanaWallets?.[0];
  const isSolanaConnected = !!solanaWallet && !!solanaWallet.address;
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const { activeChainType, setActiveChainType } = useActiveChain();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!ready && !isSolanaConnected) return null;

  const getCurrentSolanaChain = () => {
    if (!solanaWallet) return CHAINS[5];
    const walletChainId = (solanaWallet as any).chainId || "solana:devnet";
    const chainMatch = CHAINS.find((c) => c.chainId === walletChainId);
    return chainMatch || CHAINS[5];
  };

  // Determine current chain based on active chain type
  const currentChain =
    activeChainType === "solana"
      ? getCurrentSolanaChain()
      : CHAINS.find((c) => c.type === "evm" && c.id === chainId) || CHAINS[0];

  // Get current wallet address based on active chain type
  const currentAddress = currentChain.type === "solana" ? solanaWallet?.address : evmAddress || user?.wallet?.address;

  const handleChainSelect = async (chain: ChainConfig) => {
    const previousChainType = activeChainType;
    setIsSwitching(true);
    try {
      // Update active chain type
      setActiveChainType(chain.type);

      if (chain.type === "solana") {
        if (!isSolanaConnected || !solanaWallet) {
          toast.warning("Please connect a Solana wallet first", { position: "top-right" });
          setActiveChainType(previousChainType); // Revert on warning
          setIsSwitching(false);
          setIsOpen(false);
          return;
        }

        if (chain.chainId) {
          await (solanaWallet as any).switchChain(chain.chainId);
          toast.success(`Switched to ${chain.name}`, { position: "top-right" });
        }
      } else {
        if (!ready) {
          toast.warning("Please connect an EVM wallet first", { position: "top-right" });
          setActiveChainType(previousChainType); // Revert on warning
          setIsSwitching(false);
          setIsOpen(false);
          return;
        }

        await switchChain(chain.id as number);
        toast.success(`Switched to ${chain.name}`, { position: "top-right" });
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Chain switch error:", error);
      toast.error(`Failed to switch to ${chain.name}`, { position: "top-right" });
      setActiveChainType(previousChainType); // Revert on error
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        size="normal"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSwitching}
        className="flex gap-2 items-center px-3 py-2 text-xs text-gray-800 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex flex-col items-start">
          <span className="font-medium">{isSwitching ? "Switching..." : currentChain.name}</span>
          {currentAddress && (
            <span className="text-[10px] text-gray-500">
              {currentAddress.slice(0, 4)}...{currentAddress.slice(-4)}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-1 min-w-[170px] z-50">
          {/* EVM Chains Section */}
          <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">EVM Chains</div>
          {CHAINS.filter((c) => c.type === "evm").map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleChainSelect(chain)}
              disabled={isSwitching}
              className={`w-full px-3 py-2 text-left rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                chain.id === chainId && activeChainType === "evm"
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {chain.name}
            </button>
          ))}

          {/* Solana Chains Section */}
          <div className="px-3 py-1.5 mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-100">
            Solana Chains
          </div>
          {CHAINS.filter((c) => c.type === "solana").map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleChainSelect(chain)}
              disabled={isSwitching}
              className={`w-full px-3 py-2 text-left rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                chain.chainId === currentChain.chainId && activeChainType === "solana"
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {chain.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
