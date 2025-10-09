import React, { useState, useEffect } from "react";
import { paymentDarkBg, paymentLightBg } from "../../assets/images";
import { useParams } from "react-router";
import { Button } from "../../Components/Button/Button";
import { Skeleton } from "../../Components/Skeleton/Skeleton";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { useConnectOrCreateWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  NavbarLogo,
} from "../../Components/Navbar/ResizableNavbar";
import axios from "axios";
import { logo } from "../../assets/icons";
import WalletConnect from "../Wallet/WalletConnect";
import { useERC20Transfer } from "../../hooks";
import { type Address } from "viem";
import { toast } from "react-toastify";
import { handleUSDCAddress } from "../../helper";
import { baseSepolia } from "viem/chains";

import { useChainManager } from "../../hooks/useChainManager";
import WalletSheet from "../Wallet/WalletSheet";

interface PaymentData {
  title?: string;
  amount?: string;
  token?: string;
  tokenAddress?: string;
  address?: string;
  decimals?: number;
  payerDetails?: Record<string, any>;
  network?: string;
  linkId?: string;
  status?: string;
  type?: string;
}

const Payment = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { connectOrCreateWallet } = useConnectOrCreateWallet();
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const activeWallet = wallets?.[0];
  const chainId = activeWallet ? Number(activeWallet.chainId) : undefined;
  const { address } = useAccount();
  const userAddress = address || user?.wallet?.address;
  const { id } = useParams();

  const { chain } = useChainManager();

  const {
    transferToken,
    isLoading: isTransferring,
    isSuccess: transferSuccess,
    isError: transferError,
    error: transferErrorMessage,
    transactionHash,
    reset: resetTransfer,
  } = useERC20Transfer();

  // useEffect(() => {
  //   console.log("Privy state:", { ready, authenticated, user });
  // }, [ready, authenticated, user]);
  // https://obverse-server.onrender.com"
  useEffect(() => {
    console.log("updated successfully");
    const fetchPaymentLink = async () => {
      try {
        const response = await axios.get(
          `https://obverse-server.onrender.com/payment-link/${id}`
        );
        console.log(response.data);
        setPaymentData(response.data);
      } catch (error) {
        console.error("Error fetching payment link:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPaymentLink();
    }
  }, [id]);

  const handleTransaction = () => {

  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleProceedToPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ ready, authenticated, user });

    if (!ready) {
      console.log("Privy not ready yet");
      return;
    }

    setIsConnecting(true);
    try {
      if (!authenticated) {
        console.log("User not authenticated, connecting wallet...");
        connectOrCreateWallet();
      } else {
        console.log("User is authenticated, proceeding with payment...", user?.wallet?.address);
        await handlePayment();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const validatePaymentData = (): {
    isValid: boolean;
    errorMessage?: string;
  } => {
    if (!paymentData || !userAddress) {
      return {
        isValid: false,
        errorMessage: "Missing payment data or wallet not connected",
      };
    }

    // Validate required form fields
    const requiredFields = Object.keys(paymentData.payerDetails || {});
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      return {
        isValid: false,
        errorMessage: `Please fill in all required fields: ${missingFields.join(
          ", "
        )}`,
      };
    }

    // Validate payment configuration
    if (
      !paymentData.tokenAddress ||
      !paymentData.address ||
      !paymentData.amount
    ) {
      return {
        isValid: false,
        errorMessage:
          "Missing payment configuration. Please contact the merchant.",
      };
    }

    return { isValid: true };
  };

  const tokenAddress = handleUSDCAddress(chainId || baseSepolia.id);

  const handlePayment = async () => {
    const validation = validatePaymentData();

    if (!validation.isValid) {
      console.error("Payment validation failed:", validation.errorMessage);
      toast.error(validation.errorMessage, { position: "top-right" });
      return;
    }
    console.log("Transfer params:", {
      tokenAddress: tokenAddress,
      toAddress: paymentData!.address as Address,
      amount: paymentData!.amount,
      decimals: paymentData!.decimals || 6,
    });

    try {
      await transferToken({
        tokenAddress: tokenAddress as Address,
        toAddress: paymentData!.address as Address,
        amount: "1",
        decimals: paymentData!.decimals || 6,
      });
      if (transferSuccess) {
        // handle success endpoint call here
        toast.success('Transaction completed successfully!', { position: "top-right" });
      }
    } catch (error) {
      // handle failure endpoint call here
      console.log("Payment failed:", error);
      toast.error('Transaction failed. Please try again.', { position: "top-right" });
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const renderDynamicFields = () => {
    if (!paymentData?.payerDetails) return null;

    return Object.keys(paymentData.payerDetails).map((fieldName) => {
      const fieldType =
        fieldName === "email"
          ? "email"
          : fieldName === "phone"
            ? "tel"
            : fieldName === "age"
              ? "number"
              : "text";

      return (
        <div key={fieldName}>
          <label className="block font-figtree text-[16px] text-[#0E121B] dark:text-white mb-1">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </label>
          <input
            type={fieldType}
            placeholder={`Enter ${fieldName}`}
            value={formData[fieldName] || ""}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            className="placeholder:font-figtree w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white text-[#99A0AE] focus:outline-none focus:shadow-md rounded-[10px]"
            required
          />
        </div>
      );
    });
  };

  const SunIcon = GoSun as unknown as React.FC;
  const MoonIcon = IoMoonOutline as unknown as React.FC;
  return (
    <div
      style={{
        backgroundImage: `url(${darkMode ? paymentDarkBg : paymentLightBg})`,
      }}
      className="min-h-screen flex flex-col items-center   bg-cover bg-no-repeat bg-top  text-gray-800 px-4"
    >
      <Navbar className="top-4" scrollThreshold={50}>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center sm:gap-4 gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleDarkMode}
              className="bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </Button>
            <WalletConnect />
            {/* <WalletSheet /> */}
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleDarkMode}
                className="bg-gray-200 dark:bg-gray-700"
              >
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </Button>
              <WalletConnect />
            </div>
          </MobileNavHeader>
        </MobileNav>
      </Navbar>
      <div className="bg-white mt-40 dark:bg-[#0e121b] border border-[#E1E4EA] dark:border-[#2B303B] rounded-xl shadow-xl w-full max-w-[450px] p-6">
        {isLoading ? (
          <>
            {/* Header skeleton */}
            <div className="flex justify-between items-center mb-4 pb-7 border-b border-gray-300 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <img src={logo} alt="logo" className="max-s20:w-7" />
                <div>
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-6 w-16 mb-2" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>

            {/* Form skeleton */}
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-12 mb-1" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-12 w-full mt-4" />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4 pb-7 border-b border-gray-300 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <img src={logo} alt="logo" className="max-s20:w-7" />
                <div>
                  <h2 className="text-[24px] text-[#0e121b] dark:text-white font-figtree font-semibold tracking-text">
                    {paymentData?.title || "Payment"}
                  </h2>
                  <p className="text-[16px] text-[#525866] dark:text-[#99A0AE] tracking-text">
                    Fill in this few details to pay
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[24px] font-calsans font-bold text-[#E85e38]">
                  ${paymentData?.amount || "0.00"}
                </div>
                <div className="text-[16px] text-[#525866] dark:text-[#99A0AE]">
                  {paymentData?.token || "TOKEN"}
                </div>
              </div>
            </div>

            <form className="space-y-4">
              {renderDynamicFields()}

              {transferError && transferErrorMessage && (
                <div className="overflow-x-scroll p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    ❌ Payment failed: {transferErrorMessage.message.slice(0, 300)}
                  </p>
                  <button
                    type="button"
                    onClick={resetTransfer}
                    className="mt-2 text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {transferSuccess && transactionHash && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ✅ Payment successful!
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 break-all">
                    Transaction:
                    <a
                      href={`${chain?.blockExplorers?.default.url ?? ''}/tx/${transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      View on {chain?.blockExplorers?.default.name ?? 'Explorer'}
                    </a>
                  </p>
                  <button
                    type="button"
                    onClick={resetTransfer}
                    className="mt-2 text-xs text-green-600 dark:text-green-400 hover:underline"
                  >
                    Make another payment
                  </button>
                </div>
              )}
              {isTransferring && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                      Processing payment... Please wait and do not close this
                      page.
                    </p>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={(e) => {
                  console.log("Raw button click detected!");
                  handleProceedToPay(e);
                }}
                disabled={isConnecting || isTransferring || transferSuccess}
                className="w-full bg-[#E7562E] hover:bg-[#E0793E] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-[10px] transition-colors"
              >
                {isTransferring
                  ? "Processing Payment..."
                  : isConnecting
                    ? "Connecting..."
                    : transferSuccess
                      ? "Payment Completed ✅"
                      : authenticated
                        ? "Proceed to Pay"
                        : "Connect Wallet to Pay"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
