import { baseSepolia, liskSepolia, mantleSepoliaTestnet } from "viem/chains";
import { type Address } from "viem";
import { monad, MONAD_USDC_ADDRESS } from "../config/monad";

export const handleUSDCAddress = (chainId: number) => {
  if (chainId === monad.id) {
    return MONAD_USDC_ADDRESS as Address;
  }
  if (chainId === baseSepolia.id) {
    return "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Address;
  }
  if (chainId === liskSepolia.id) {
    return "0x57a07bE8f177f743C2a85735E095c42e0EDdd39c" as Address;
  }
  if (chainId === mantleSepoliaTestnet.id) {
    return "0x827C54Bd992e7E60f9FAd50675ca9990aDf50001" as Address;
  }
};

export const handleExplorerUrl = (chainId: number) => {
  if (chainId === monad.id) {
    return "https://monadscan.com/tx";
  }
  if (chainId === baseSepolia.id) {
    return "https://sepolia.basescan.org/tx";
  }
  if (chainId === liskSepolia.id) {
    return "https://sepolia-blockscout.lisk.com/transaction";
  }
};
