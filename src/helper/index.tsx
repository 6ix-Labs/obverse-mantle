import { type Address } from "viem";
import { getExplorerTxUrlForChain, getUsdcConfigForChain, resolveChainConfig } from "../config/chainRegistry";

export const handleUSDCAddress = (chainId: number) => {
  return getUsdcConfigForChain(chainId)?.address as Address | undefined;
};

export const handleExplorerUrl = (chainId: number) => {
  const chain = resolveChainConfig(chainId);
  if (!chain) return undefined;

  // Preserve existing behavior: this helper returns explorer transaction base URL.
  return getExplorerTxUrlForChain(chainId, "").replace(/\/$/, "");
};
