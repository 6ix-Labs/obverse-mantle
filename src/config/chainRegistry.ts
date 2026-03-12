import type { Address, Chain } from "viem";
import { base, baseSepolia, liskSepolia, mantleSepoliaTestnet } from "viem/chains";
import { monad, MONAD_USDC_ADDRESS, MONAD_USDC_DECIMALS } from "./monad";

export type ChainFamily = "evm" | "solana";

export interface ChainTokenConfig {
    symbol: string;
    address?: Address;
    decimals: number;
    isNative?: boolean;
}

export interface ChainRegistryEntry {
    key: string;
    aliases: string[];
    displayName: string;
    family: ChainFamily;
    chainId?: number;
    viemChain?: Chain;
    nativeCurrencySymbol: string;
    explorerTxBaseUrl: string;
    tokens: Record<string, ChainTokenConfig>;
    enabled: boolean;
}

const REGISTRY: ChainRegistryEntry[] = [
    {
        key: "monad-mainnet",
        aliases: ["monad", "eip155:143", "143"],
        displayName: "Monad",
        family: "evm",
        chainId: monad.id,
        viemChain: monad,
        nativeCurrencySymbol: "MON",
        explorerTxBaseUrl: "https://monadscan.com/tx",
        tokens: {
            USDC: {
                symbol: "USDC",
                address: MONAD_USDC_ADDRESS,
                decimals: MONAD_USDC_DECIMALS,
            },
        },
        enabled: true,
    },
    {
        key: "base-mainnet",
        aliases: [
            "base",
            "base-mainnet",
            "base mainnet",
            "base_mainnet",
            "basemainnet",
            "eip155:8453",
            "8453",
        ],
        displayName: "Base",
        family: "evm",
        chainId: base.id,
        viemChain: base,
        nativeCurrencySymbol: "ETH",
        explorerTxBaseUrl: "https://basescan.org/tx",
        tokens: {
            USDC: {
                symbol: "USDC",
                address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address,
                decimals: 6,
            },
        },
        enabled: true,
    },
    {
        key: "base-sepolia",
        aliases: [
            "base-sepolia",
            "base sepolia",
            "base_sepolia",
            "basesepolia",
            "eip155:84532",
            "84532",
        ],
        displayName: "Base Sepolia",
        family: "evm",
        chainId: baseSepolia.id,
        viemChain: baseSepolia,
        nativeCurrencySymbol: "ETH",
        explorerTxBaseUrl: "https://sepolia.basescan.org/tx",
        tokens: {
            USDC: {
                symbol: "USDC",
                address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Address,
                decimals: 6,
            },
        },
        enabled: true,
    },
    {
        key: "lisk-sepolia",
        aliases: ["lisk", "lisk-sepolia", "eip155:4202", "4202"],
        displayName: "Lisk Sepolia",
        family: "evm",
        chainId: liskSepolia.id,
        viemChain: liskSepolia,
        nativeCurrencySymbol: "ETH",
        explorerTxBaseUrl: "https://sepolia-blockscout.lisk.com/transaction",
        tokens: {
            USDC: {
                symbol: "USDC",
                address: "0x57a07bE8f177f743C2a85735E095c42e0EDdd39c" as Address,
                decimals: 6,
            },
        },
        enabled: true,
    },
    {
        key: "mantle-sepolia",
        aliases: ["mantle", "mantle-sepolia", "eip155:5003", "5003"],
        displayName: "Mantle Sepolia",
        family: "evm",
        chainId: mantleSepoliaTestnet.id,
        viemChain: mantleSepoliaTestnet,
        nativeCurrencySymbol: "MNT",
        explorerTxBaseUrl: "https://sepolia.mantlescan.xyz/tx",
        tokens: {
            USDC: {
                symbol: "USDC",
                address: "0x827C54Bd992e7E60f9FAd50675ca9990aDf50001" as Address,
                decimals: 6,
            },
        },
        enabled: true,
    },
    {
        key: "solana-mainnet",
        aliases: ["solana", "solana-mainnet", "solana:mainnet"],
        displayName: "Solana",
        family: "solana",
        nativeCurrencySymbol: "SOL",
        explorerTxBaseUrl: "https://solscan.io/tx",
        tokens: {
            USDC: {
                symbol: "USDC",
                decimals: 6,
            },
        },
        enabled: true,
    },
    {
        key: "solana-devnet",
        aliases: ["solana-devnet", "solana:devnet"],
        displayName: "Solana Devnet",
        family: "solana",
        nativeCurrencySymbol: "SOL",
        explorerTxBaseUrl: "https://solscan.io/tx",
        tokens: {
            USDC: {
                symbol: "USDC",
                decimals: 6,
            },
        },
        enabled: true,
    },
];

const aliasLookup = new Map<string, ChainRegistryEntry>();

const normalizeAliasKey = (value: string): string =>
    value
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-");

for (const chain of REGISTRY) {
    aliasLookup.set(chain.key.toLowerCase(), chain);
    aliasLookup.set(normalizeAliasKey(chain.key), chain);
    aliasLookup.set(chain.key.toLowerCase().replace(/-/g, ""), chain);

    for (const alias of chain.aliases) {
        const lowerAlias = alias.toLowerCase();
        aliasLookup.set(lowerAlias, chain);
        aliasLookup.set(normalizeAliasKey(alias), chain);
        aliasLookup.set(normalizeAliasKey(alias).replace(/-/g, ""), chain);
    }
}

export const DEFAULT_EVM_CHAIN_KEY = "monad-mainnet";
export const DEFAULT_SOLANA_CHAIN_KEY = "solana-mainnet";

export const getChainRegistry = () => REGISTRY;

export const normalizeChainInput = (input?: string | number | null): string => {
    if (input === null || input === undefined) return "";
    return normalizeAliasKey(String(input));
};

export const resolveChainConfig = (input?: string | number | null): ChainRegistryEntry | undefined => {
    const normalized = normalizeChainInput(input);
    if (!normalized) return undefined;
    return aliasLookup.get(normalized) || aliasLookup.get(normalized.replace(/-/g, ""));
};

export const resolveEvmChainConfig = (input?: string | number | null): ChainRegistryEntry | undefined => {
    const chain = resolveChainConfig(input);
    return chain?.family === "evm" ? chain : undefined;
};

export const resolveSolanaChainConfig = (input?: string | number | null): ChainRegistryEntry | undefined => {
    const chain = resolveChainConfig(input);
    return chain?.family === "solana" ? chain : undefined;
};

export const getDefaultEvmChainConfig = () => resolveChainConfig(DEFAULT_EVM_CHAIN_KEY)!;
export const getDefaultSolanaChainConfig = () => resolveChainConfig(DEFAULT_SOLANA_CHAIN_KEY)!;

export const getEnabledEvmChains = (): ChainRegistryEntry[] =>
    REGISTRY.filter((chain) => chain.enabled && chain.family === "evm" && !!chain.viemChain && !!chain.chainId);

export const getChainDisplayName = (input?: string | number | null): string => {
    const chain = resolveChainConfig(input);
    if (chain) return chain.displayName;
    const fallback = normalizeChainInput(input);
    return fallback ? `${fallback.charAt(0).toUpperCase()}${fallback.slice(1)}` : "Unknown";
};

export const getChainNativeCurrency = (input?: string | number | null): string => {
    return resolveChainConfig(input)?.nativeCurrencySymbol ?? "ETH";
};

export const getExplorerTxUrlForChain = (input: string | number | null | undefined, txHash: string): string => {
    const chain = resolveChainConfig(input);
    if (!chain) return txHash;
    return `${chain.explorerTxBaseUrl}/${txHash}`;
};

export const getExplorerNameForChain = (input?: string | number | null): string => {
    const chain = resolveChainConfig(input);
    if (!chain) return "Explorer";

    if (chain.key.includes("solana")) return "Solscan";
    if (chain.key.includes("base")) return "Basescan";
    if (chain.key.includes("lisk")) return "Blockscout";
    if (chain.key.includes("monad")) return "Monadscan";
    return "Explorer";
};

export const getUsdcConfigForChain = (input?: string | number | null): ChainTokenConfig | undefined => {
    const chain = resolveChainConfig(input);
    return chain?.tokens.USDC;
};
