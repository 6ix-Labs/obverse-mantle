// components/providers/PrivyProvider.tsx

import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";
import { ReactNode } from "react";
import { logo } from "../assets/icons";
import { monad } from "../config/monad";

// Solana RPC endpoints - replace with your preferred RPC provider (Helius, QuickNode, etc.)
const SOLANA_RPC_URL = import.meta.env.VITE_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const SOLANA_WSS_URL = import.meta.env.VITE_SOLANA_WSS_URL || "wss://api.mainnet-beta.solana.com";

// Initialize Solana wallet connectors for external wallets (Phantom, Solflare, etc.)
const solanaConnectors = toSolanaWalletConnectors({
    shouldAutoConnect: true,
});

interface ObversePrivyProviderProps {
    children: ReactNode;
}

export function ObversePrivyProvider({ children }: ObversePrivyProviderProps) {
    return (
        <PrivyProvider
            appId={import.meta.env.VITE_PRIVY_APP_ID || ""}
            config={{
                // Solana configuration
                solana: {
                    rpcs: {
                        "solana:mainnet": {
                            rpc: createSolanaRpc(SOLANA_RPC_URL) as any,
                            rpcSubscriptions: createSolanaRpcSubscriptions(SOLANA_WSS_URL) as any,
                        },
                        // Add devnet for testing
                        "solana:devnet": {
                            rpc: createSolanaRpc("https://api.devnet.solana.com") as any,
                            rpcSubscriptions: createSolanaRpcSubscriptions("wss://api.devnet.solana.com") as any,
                        },
                    },
                },
                // Appearance configuration
                appearance: {
                    theme: "dark",
                    accentColor: "#E7562E", // Obverse brand color
                    showWalletLoginFirst: true,
                    walletChainType: "ethereum-and-solana",
                    logo: logo, // Your logo
                },
                // EVM chain configuration
                defaultChain: monad,
                supportedChains: [monad],
                // Login methods - email, social, and wallet
                loginMethods: ["email", "wallet", "google", "twitter"],
                // External wallet configuration
                externalWallets: {
                    solana: {
                        connectors: solanaConnectors,
                    },
                },
                // Embedded wallet configuration
                embeddedWallets: {
                    ethereum: {
                        createOnLogin: "all-users",
                    },
                    solana: {
                        createOnLogin: "all-users", // Auto-create embedded Solana wallet for all users
                    },
                },
            }}
        >
            {children}
        </PrivyProvider>
    );
}

export default ObversePrivyProvider;
