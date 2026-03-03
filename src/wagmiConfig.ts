import { http, fallback } from 'wagmi';
import { createConfig } from '@privy-io/wagmi';
import { injected } from 'wagmi/connectors';
import { getEnabledEvmChains } from './config/chainRegistry';

const evmChains = getEnabledEvmChains();
const chainIdByKey = new Map(evmChains.map((chain) => [chain.key, chain.chainId as number]));

const monadChainId = chainIdByKey.get('monad-mainnet');
const baseMainnetChainId = chainIdByKey.get('base-mainnet');
const baseSepoliaChainId = chainIdByKey.get('base-sepolia');

const defaultTransports = evmChains.reduce<Record<number, ReturnType<typeof http>>>((acc, chain) => {
  acc[chain.chainId as number] = http();
  return acc;
}, {});

export const wagmiConfig = createConfig({
  chains: evmChains.map((chain) => chain.viemChain!),
  connectors: [injected()],
  transports: {
    ...defaultTransports,
    ...(monadChainId
      ? {
        [monadChainId]: fallback([
          http(import.meta.env.VITE_MONAD_RPC_URL || 'https://rpc.monad.xyz'),
          http(),
        ]),
      }
      : {}),
    ...(baseMainnetChainId
      ? {
        [baseMainnetChainId]: fallback([
          http(import.meta.env.VITE_BASE_MAINNET_RPC_URL || 'https://mainnet.base.org'),
          http(),
        ]),
      }
      : {}),
    ...(baseSepoliaChainId
      ? {
        [baseSepoliaChainId]: fallback([
          http(import.meta.env.VITE_BASE_SEPOLIA_RPC_URL || 'https://base-sepolia.gateway.tenderly.co'),
          http(),
        ]),
      }
      : {}),
  },
});
