import { baseSepolia, liskSepolia } from 'viem/chains';
import { http, fallback } from 'wagmi';
import { createConfig } from '@privy-io/wagmi';
import { injected } from 'wagmi/connectors';


export const wagmiConfig = createConfig({
  chains: [liskSepolia, baseSepolia],
  connectors: [injected()],
  transports: {
    [liskSepolia.id]: http(),
    [baseSepolia.id]: fallback([
      http('https://base-sepolia.gateway.tenderly.co'),
    ])
  },
});
