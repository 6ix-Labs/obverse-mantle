import { baseSepolia, liskSepolia } from 'viem/chains';
import { http, fallback } from 'wagmi';
import { createConfig } from '@privy-io/wagmi';
import { injected } from 'wagmi/connectors';
import { monad } from './config/monad';


export const wagmiConfig = createConfig({
  chains: [monad, liskSepolia, baseSepolia],
  connectors: [injected()],
  transports: {
    [monad.id]: http('https://rpc.monad.xyz'),
    [liskSepolia.id]: http(),
    [baseSepolia.id]: fallback([
      http('https://base-sepolia.gateway.tenderly.co'),
    ])
  },
});
