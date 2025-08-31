import React, { useState, useRef, useEffect } from "react";
import { Button } from "../Button/Button";
import { baseSepolia, liskSepolia } from "viem/chains";
import { useChainManager } from "../../hooks/useChainManager";

const CHAINS = [
  { id: Number(baseSepolia.id), name: "Base Sepolia" },
  { id: Number(liskSepolia.id), name: "Lisk Sepolia" },
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
        variant="default" 
        className="px-3 py-2 text-white bg-[#E85e38] hover:bg-[#D4512A] flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
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
        <div className="absolute top-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 p-1 min-w-[150px] z-50">
          {CHAINS.map((chain) => (
            <button
              key={chain.id}
              onClick={() => handleChainSelect(chain.id)}
              className={`w-full px-3 py-2 text-left cursor-pointer rounded-md text-sm transition-colors ${
                chain.id === chainId 
                  ? "bg-[#E85e38] text-white" 
                  : "text-gray-700 hover:bg-gray-100"
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
