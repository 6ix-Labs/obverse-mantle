import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './wagmiConfig';
import { base, baseSepolia, lisk, liskSepolia } from 'viem/chains';
import { ChainProvider } from './hooks/useChainManager';
import './config/appkit'; // Initialize AppKit

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_APP_ID}
      clientId={import.meta.env.VITE_CLIENT_ID}
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          showWalletUIs: true,
          priceDisplay: {
            primary: "fiat-currency",
            secondary: "native-token",
          },
        },
        appearance: {
          showWalletLoginFirst: false,
          accentColor: "#E85e38",
        },
        loginMethods: ["wallet", "email"],
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia, base, lisk, liskSepolia],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ChainProvider>
            <App />
          </ChainProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
