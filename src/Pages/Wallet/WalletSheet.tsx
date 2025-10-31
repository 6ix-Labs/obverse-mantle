import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "../../Components/ui/sheet";
import { Button } from "../../Components/Button/Button";
import { cn } from "../../lib/utils";
import { IoCopyOutline, IoWalletOutline, IoLogOutOutline } from "react-icons/io5";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { handleUSDCAddress } from "../../helper";
import { baseSepolia } from "viem/chains";
import { toast } from "react-toastify";
import { formatUnits, erc20Abi } from "viem";
import { ArrowRightToLineIcon } from "lucide-react";
import TransferModal from "../../Components/Transfer/TransferModal";
import { UserPill } from "@privy-io/react-auth/ui";

// Asset imports
import AvatarIcon from "../../assets/icons/AvatarIcon.svg";
import { FiSettings } from "react-icons/fi";

interface TokenBalance {
  symbol: string;
  amount: string;
  value: string;
  icon: string;
  address?: string;
  decimals?: number;
}

const tokenConfigs = [
  {
    symbol: "USDC",
    icon: "https://assets.kraken.com/marketing/web/icons-uni-webp/s_usdc.webp?i=kds",
    address: handleUSDCAddress(baseSepolia.id),
    decimals: 6,
  },
];

export const WalletSheet: React.FC = () => {
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [totalValue, setTotalValue] = useState("0.00");
  const [isLoading, setIsLoading] = useState(false);

  const tabClasses = (active: boolean) =>
    cn(
      "pb-2 transition-colors", // spacing
      active
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-gray-500 hover:text-gray-700"
    );

  const { user, logout, authenticated } = usePrivy();
  const { address } = useAccount();

  // Reown AppKit for Solana
  const { address: solanaAddress, isConnected: isSolanaConnected } = useAppKitAccount({ namespace: 'solana' });
  const { disconnect: disconnectAppKit } = useDisconnect();

  const userAddress = address || user?.wallet?.address || solanaAddress;

  // Handle logout/disconnect for both Privy and Reown
  const handleLogout = async () => {
    try {
      // Disconnect Reown AppKit (Solana) if connected
      if (isSolanaConnected) {
        await disconnectAppKit();
        toast.success("Solana wallet disconnected", { position: "top-right" });
      }

      // Logout from Privy (EVM) if authenticated
      if (authenticated) {
        await logout();
        toast.success("EVM wallet disconnected", { position: "top-right" });
      }

      // If neither was connected (shouldn't happen, but handle it)
      if (!isSolanaConnected && !authenticated) {
        toast.info("No wallet connected", { position: "top-right" });
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to disconnect wallet", { position: "top-right" });
    }
  };

  // Get native ETH balance
  const { data: ethBalance } = useBalance({
    address: userAddress as `0x${string}`,
    chainId: baseSepolia.id,
  });

  // Get USDC balance
  const { data: usdcBalance } = useReadContract({
    address: handleUSDCAddress(baseSepolia.id),
    abi: erc20Abi,
    functionName: "balanceOf",
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    chainId: baseSepolia.id,
  });

  // Copy address to clipboard
  const copyAddress = async () => {
    if (userAddress) {
      try {
        await navigator.clipboard.writeText(userAddress);
        toast.success("Address copied to clipboard!", {
          position: "top-right",
        });
      } catch (err) {
        console.error("Failed to copy address:", err);
        toast.error("Failed to copy address", { position: "top-right" });
      }
    }
  };

  // Fetch token balances
  useEffect(() => {
    const fetchBalances = async () => {
      if (!userAddress) return;

      setIsLoading(true);
      try {
        const updatedBalances = await Promise.all(
          tokenConfigs.map(async (token) => {
            let amount = "0.00";
            let value = "$0.00";

            if (token.symbol === "USDC") {
              if (usdcBalance) {
                const usdcAmount = parseFloat(formatUnits(usdcBalance, 6));
                amount = usdcAmount.toFixed(6);
                value = `$${usdcAmount.toFixed(2)}`; // USDC is 1:1 with USD
              }
            }

            return {
              symbol: token.symbol,
              amount,
              value,
              icon: token.icon,
              address: token.address,
              decimals: token.decimals,
            };
          })
        );

        setBalances(updatedBalances);

        // Calculate total value
        const total = updatedBalances.reduce((sum, token) => {
          const numericValue = parseFloat(token.value.replace("$", ""));
          return sum + numericValue;
        }, 0);
        setTotalValue(total.toFixed(2));
      } catch (error) {
        console.error("Error fetching balances:", error);
        toast.error("Failed to fetch balances", { position: "top-right" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, [userAddress, ethBalance, usdcBalance]);

  return (
    <>
      {/* Global override to ensure Privy portals appear above Radix sheets */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            [data-radix-popper-content-wrapper],
            [role='dialog'],
            .privy-modal,
            [data-privy-modal],
            .privy-modal-backdrop,
            .privy-modal-content {
              z-index: 1000 !important;
            }
          `,
        }}
      />

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="normal"
            className="px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200"
          >
            <IoWalletOutline className="h-4 w-4 mr-2 text-[#E85e38]" />
            {userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="sm:mr-8 sm:mt-8 rounded-3xl shadow-xl bg-gray-50 text-gray-900 overflow-y-auto max-h-[90vh] p-0 border border-gray-200"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <SheetTitle className="text-xl font-calsans">Wallet</SheetTitle>
              <SheetClose asChild>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowRightToLineIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </SheetClose>
            </div>

            <div className="mt-6 bg-gray-50 rounded-2xl p-6 flex flex-col gap-6 border border-gray-200">
              {/* Address & copy */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="flex gap-2 font-calsans items-center">
                  <img src={AvatarIcon} className="w-4 h-4" />
                  {userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}
                </span>
                <button
                  onClick={copyAddress}
                  className="hover:text-gray-800 text-gray-500 hover:bg-gray-100 p-1 rounded transition-colors"
                  title="Copy address"
                >
                  <IoCopyOutline />
                </button>
              </div>

              {/* Balance */}
              <div className="text-4xl font-medium font-calsans text-gray-900">
                {isLoading ? "Loading..." : `$${totalValue}`}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <TransferModal
                  userBalance={
                    balances.find((b) => b.symbol === "USDC")?.amount || "0"
                  }
                  tokenSymbol="USDC"
                >
                  <Button className="px-3 py-2 flex-1 font-sans text-sm bg-neutral-200 rounded-lg hover:bg-neutral-300 border border-neutral-200">
                    Transfer
                  </Button>
                </TransferModal>

                <Button
                  variant="normal"
                  className="font-sans text-sm px-3 py-2 flex-1 rounded-lg bg-neutral-200 text-gray-800 hover:bg-neutral-300 border border-neutral-200"
                >
                  Fund
                </Button>

                <div className="relative [&_.privy-modal]:z-[9999] [&_[role='dialog']]:z-[9999] [&_[data-radix-popper-content-wrapper]]:z-[9999] [&_.privy-modal-backdrop]:z-[9998] [&_.privy-modal-content]:z-[9999]">
                  <UserPill
                    expanded={true}
                    ui={{
                      minimal: false,
                      background: "secondary",
                    }}
                    label={
                      <Button
                        variant="normal"
                        className="px-3 py-2 w-10 h-10 rounded-lg bg-neutral-200 text-gray-800 hover:bg-neutral-300 border border-neutral-200"
                      >
                        <FiSettings />
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Balances / Transactions tabs */}
            <div className="mt-8">
              <div className="flex gap-6 border-b border-gray-200 text-sm">
                <button className={tabClasses(true)}>Balances</button>
                <button className={tabClasses(false)}>Transactions</button>
              </div>

              {/* Balances list */}
              <div className="mt-6 flex flex-col gap-4">
                {isLoading ? (
                  <div className="text-center text-gray-500 py-4">
                    Loading balances...
                  </div>
                ) : (
                  balances.map((bal) => (
                    <div
                      key={bal.symbol}
                      className="flex justify-between items-center py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={bal.icon} className="w-8 h-8 rounded-full" />
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {bal.symbol}
                          </span>
                          <span className="text-xs text-gray-500">
                            {bal.amount}
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-600 font-medium">
                        {bal.value}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Logout button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="group w-full flex items-center justify-center gap-2 px-4 py-3
                  text-sm font-medium text-gray-600 hover:text-red-600
                  bg-white hover:bg-red-50
                  border border-gray-200 hover:border-red-300
                  rounded-xl transition-all duration-200
                  shadow-sm hover:shadow-md"
              >
                <IoLogOutOutline className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default WalletSheet;
