import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "./wagmiConfig";
import { base, baseSepolia, lisk, liskSepolia } from "viem/chains";
import { ChainProvider } from "./hooks/useChainManager";
import { ActiveChainProvider } from "./contexts/ActiveChainContext";
import ObversePrivyProvider from "./providers/PrivyProvider";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <PrivyProvider
      appId={import.meta.env.VITE_APP_ID}
      clientId={import.meta.env.VITE_CLIENT_ID}
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
          solana: {
            createOnLogin: "users-without-wallets",
          },
          showWalletUIs: true,
          priceDisplay: {
            primary: "fiat-currency",
            secondary: "native-token",
          },
        },
        appearance: {
          showWalletLoginFirst: false,
          accentColor: "#E85e38",
          walletChainType: "ethereum-and-solana",
        },

        externalWallets: { solana: { connectors: toSolanaWalletConnectors() } },
        solana: {
          rpcs: {
            "solana:mainnet": {
              rpc: createSolanaRpc("https://api.mainnet-beta.solana.com"),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                "wss://api.mainnet-beta.solana.com"
              ),
            },
            "solana:devnet": {
              rpc: createSolanaRpc("https://api.devnet.solana.com"),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                "wss://api.devnet.solana.com"
              ),
            },
          },
        },

        loginMethods: ["wallet", "email"],
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia, base, lisk, liskSepolia],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ChainProvider>
            <ActiveChainProvider> */}
    <ObversePrivyProvider>
      <App />
    </ObversePrivyProvider>

    {/* </ActiveChainProvider>
          </ChainProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
