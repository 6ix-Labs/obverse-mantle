import React, { useState, useRef, useEffect } from "react";
import { Button } from "../Button/Button";
import { baseSepolia, liskSepolia, arbitrumSepolia, optimismSepolia } from "viem/chains";
import { useChainManager } from "../../hooks/useChainManager";

const CHAINS = [
  { id: Number(baseSepolia.id), name: "Base Sepolia" },
  { id: Number(liskSepolia.id), name: "Lisk Sepolia" },
  { id: Number(arbitrumSepolia.id), name: "Arbitrum Sepolia" },
  { id: Number(optimismSepolia.id), name: "Optimism Sepolia" },
];

export const ChainDropdown: React.FC = () => {
  const { chainId, switchChain, ready } = useChainManager();
  const [isOpen, setIsOpen] = useState(false);
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

  if (!ready) return null;

  const current = CHAINS.find((c) => c.id === chainId) || CHAINS[0];

  const handleChainSelect = (chainId: number) => {
    switchChain(chainId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        size="normal"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-2 text-gray-800 hover:bg-gray-100"
      >
        {current.name}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-1 min-w-[170px] z-50">
          {CHAINS.map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleChainSelect(chain.id)}
              className={`w-full px-3 py-2 text-left rounded-lg text-sm transition-colors ${
                chain.id === chainId
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
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
