// hooks/useMonadPayment.ts
import { useState, useCallback, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import {
  useAccount,
  usePublicClient,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits, erc20Abi, type Address } from "viem";
import { monad, MONAD_USDC_ADDRESS, MONAD_USDC_DECIMALS } from "../config/monad";
import type { PaymentStatus } from "./useUsdcPayment";

interface PaymentState {
  status: PaymentStatus;
  error: string | null;
  txSignature: string | null;
  balance: number | null;
  estimatedFee: number | null;
}

interface UseMonadPaymentReturn {
  paymentState: PaymentState;
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  checkBalance: () => Promise<number>;
  sendPayment: (
    merchantAddress: string,
    amount: number,
    onSuccess?: (signature: string) => void
  ) => Promise<string | null>;
  resetState: () => void;
}

export function useMonadPayment(): UseMonadPaymentReturn {
  const { login, logout, authenticated, ready } = usePrivy();
  const { address, isConnected: wagmiConnected, chainId } = useAccount();
  const publicClient = usePublicClient({ chainId: monad.id });
  const { switchChainAsync } = useSwitchChain();

  const {
    writeContractAsync,
    data: txHash,
    reset: resetWrite,
  } = useWriteContract();

  const { isSuccess: isTxConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: "idle",
    error: null,
    txSignature: null,
    balance: null,
    estimatedFee: null,
  });

  const walletAddress = address ?? null;
  const isConnected = authenticated && wagmiConnected && !!address;

  const updateState = useCallback((updates: Partial<PaymentState>) => {
    setPaymentState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setPaymentState({
      status: "idle",
      error: null,
      txSignature: null,
      balance: null,
      estimatedFee: null,
    });
    resetWrite();
  }, [resetWrite]);

  // Auto-mark success when tx is confirmed on-chain
  useEffect(() => {
    if (isTxConfirmed && txHash && paymentState.status === "confirming-tx") {
      updateState({ status: "success", txSignature: txHash });
    }
  }, [isTxConfirmed, txHash, paymentState.status, updateState]);

  const connectWallet = useCallback(async () => {
    if (!ready) return;
    try {
      updateState({ status: "connecting", error: null });
      await login();
      updateState({ status: "idle" });
    } catch (error) {
      updateState({
        status: "error",
        error: error instanceof Error ? error.message : "Failed to connect wallet",
      });
    }
  }, [ready, login, updateState]);

  const disconnectWallet = useCallback(async () => {
    try {
      await logout();
      resetState();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  }, [logout, resetState]);

  const checkBalance = useCallback(async (): Promise<number> => {
    if (!address || !publicClient) {
      throw new Error("No wallet connected");
    }

    try {
      updateState({ status: "checking-balance" });

      // Ensure we're on Monad
      if (chainId !== monad.id) {
        await switchChainAsync({ chainId: monad.id });
      }

      const balance = await publicClient.readContract({
        address: MONAD_USDC_ADDRESS as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });

      const formatted = Number(formatUnits(balance, MONAD_USDC_DECIMALS));
      updateState({ status: "idle", balance: formatted });
      return formatted;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to check balance";
      updateState({ status: "error", error: errorMessage });
      throw error;
    }
  }, [address, publicClient, chainId, switchChainAsync, updateState]);

  const sendPayment = useCallback(
    async (
      merchantAddress: string,
      amount: number,
      onSuccess?: (signature: string) => void
    ): Promise<string | null> => {
      if (!address) {
        updateState({ status: "error", error: "No wallet connected" });
        return null;
      }

      try {
        console.log("=== Starting Monad Payment Process ===");
        console.log("Merchant Address:", merchantAddress);
        console.log("Amount:", amount);
        console.log("Wallet Address:", address);

        // Step 1: Ensure on Monad chain
        if (chainId !== monad.id) {
          console.log("Switching to Monad chain...");
          await switchChainAsync({ chainId: monad.id });
        }

        // Step 2: Check balance
        console.log("Step 1: Checking balance...");
        updateState({ status: "checking-balance", error: null });

        if (!publicClient) {
          throw new Error("Public client not available for Monad");
        }

        const rawBalance = await publicClient.readContract({
          address: MONAD_USDC_ADDRESS as Address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        });

        const balance = Number(formatUnits(rawBalance, MONAD_USDC_DECIMALS));
        updateState({ balance });
        console.log("Balance check complete:", balance, "USDC");

        if (balance < amount) {
          throw new Error(
            `Insufficient balance. You have ${balance.toFixed(2)} USDC but need ${amount} USDC`
          );
        }

        // Step 3: Estimate gas fee
        console.log("Step 2: Estimating fees...");
        try {
          const gasPrice = await publicClient.getGasPrice();
          const estimatedGas = 65000n; // ERC-20 transfer typically ~60k gas
          const feeInWei = gasPrice * estimatedGas;
          const feeInMon = Number(formatUnits(feeInWei, 18));
          updateState({ estimatedFee: feeInMon });
          console.log("Estimated fee:", feeInMon, "MON");
        } catch (error) {
          console.warn("Fee estimation failed, proceeding anyway:", error);
          updateState({ estimatedFee: 0.001 }); // Fallback estimate
        }

        // Step 4: Confirm payment
        updateState({ status: "confirming" });

        // Step 5: Send ERC-20 transfer
        console.log("Step 3: Sending transaction...");
        updateState({ status: "sending" });

        const amountInWei = parseUnits(amount.toString(), MONAD_USDC_DECIMALS);

        const hash = await writeContractAsync({
          address: MONAD_USDC_ADDRESS as Address,
          abi: erc20Abi,
          functionName: "transfer",
          args: [merchantAddress as Address, amountInWei],
          chainId: monad.id,
        });

        console.log("Transaction hash:", hash);

        // Step 6: Wait for confirmation
        updateState({ status: "confirming-tx", txSignature: hash });

        const receipt = await publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 1,
        });

        if (receipt.status === "success") {
          console.log("Transaction confirmed on-chain");
          updateState({ status: "success", txSignature: hash });
        } else {
          throw new Error("Transaction reverted on-chain");
        }

        console.log("=== Monad Payment Complete ===");

        if (onSuccess) {
          await onSuccess(hash);
        }

        return hash;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Payment failed";

        // Provide user-friendly error messages
        let friendlyError = errorMessage;
        if (errorMessage.includes("User rejected") || errorMessage.includes("user rejected")) {
          friendlyError = "Transaction was cancelled by user";
        } else if (errorMessage.includes("insufficient funds") || errorMessage.includes("Insufficient")) {
          friendlyError = errorMessage;
        }

        updateState({ status: "error", error: friendlyError });
        console.error("=== Monad Payment Error ===");
        console.error("Error:", error);
        return null;
      }
    },
    [address, chainId, publicClient, switchChainAsync, writeContractAsync, updateState]
  );

  return {
    paymentState,
    isConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    checkBalance,
    sendPayment,
    resetState,
  };
}

export default useMonadPayment;
