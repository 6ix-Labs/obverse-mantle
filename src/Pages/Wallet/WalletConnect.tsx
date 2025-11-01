"use client";

import { useState } from "react";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth/solana";
import { Button } from "../../Components/Button/Button";
import { ChainDropdown } from "../../Components/Dropdown/ChainDropdown";
import WalletSheet from "./WalletSheet";
import { useChainManager } from "../../hooks/useChainManager";

function WalletConnect() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, ready, authenticated } = usePrivy();

  // Privy Solana wallets
  const { wallets: solanaWallets } = useWallets();
  const solanaWallet = solanaWallets?.[0];
  const isSolanaConnected = !!solanaWallet && !!solanaWallet.address;

  // Check current chain/network
  const { chain } = useChainManager();

  // Determine if we're on Solana or EVM based on the current network
  const isSolanaNetwork =
    isSolanaConnected || chain?.name?.toLowerCase().includes("solana");

  const { login } = useLogin({
    onComplete: () => setIsLoading(false),
    onError: () => setIsLoading(false),
  });

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  const handleConnectSolana = async () => {
    // For Solana, Privy handles the connection through the same login flow
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error("Solana connection error:", error);
      setIsLoading(false);
    }
  };

  // Check if either Privy (EVM) or Reown (Solana) is connected
  const isConnected =
    (authenticated && user && user.wallet?.address) || isSolanaConnected;

  return (
    <div>
      {isConnected ? (
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-3">
          <WalletSheet />
          {(authenticated || isSolanaConnected) && <ChainDropdown />}
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center space-x-2">
            {ready ? (
              <button
                disabled={isLoading}
                onClick={isSolanaNetwork ? handleConnectSolana : handleLogin}
                className={`w-full lg:w-fit rounded-xl px-2 sm:px-4 py-2 bg-white text-xs sm:text-base text-[#E85e38] border border-[#E85e38] hover:bg-[#E85e38] hover:text-white ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </button>
            ) : (
              <Button
                disabled={true}
                size="normal"
                variant="default"
                className="w-full lg:w-fit rounded-xl px-4 py-2 bg-white text-[#E85e38] border border-[#E85e38] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Loading...
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default WalletConnect;
