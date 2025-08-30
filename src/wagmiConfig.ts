import { baseSepolia, liskSepolia } from 'viem/chains';
import { http, fallback } from 'wagmi';
import { createConfig } from '@privy-io/wagmi';


export const wagmiConfig = createConfig({
  chains: [baseSepolia, liskSepolia],
  transports: {
    [baseSepolia.id]: fallback([
      http('https://base-sepolia.gateway.tenderly.co'),
    ]),
    [liskSepolia.id]: http()
  },
});
