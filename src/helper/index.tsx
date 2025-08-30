import { baseSepolia, liskSepolia, mantleSepoliaTestnet } from "viem/chains";
import { type Address } from "viem";

export const handleUSDCAddress = (chainId: number) => {
  if (chainId === baseSepolia.id) {
    return "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Address;
  }
  if (chainId === liskSepolia.id) {
    return "0x1E39A0C4E8271f256E9C8260e102493d13875f8e" as Address;
  }
  if (chainId === mantleSepoliaTestnet.id) {
    return "0x827C54Bd992e7E60f9FAd50675ca9990aDf50001" as Address;
  }
};
