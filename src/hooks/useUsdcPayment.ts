// hooks/useUsdcPayment.ts
import { useState, useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets, useSignAndSendTransaction } from "@privy-io/react-auth/solana";
import bs58 from "bs58";
import {
    createUsdcTransferTransaction,
    getUsdcBalance,
    estimateTransferFee,
    confirmTransaction,
    NetworkType,
} from "../utils/solana/transferUsdc";

export type PaymentStatus =
    | "idle"
    | "connecting"
    | "checking-balance"
    | "confirming"
    | "sending"
    | "confirming-tx"
    | "success"
    | "error";

interface PaymentState {
    status: PaymentStatus;
    error: string | null;
    txSignature: string | null;
    balance: number | null;
    estimatedFee: number | null;
}

interface UseUsdcPaymentReturn {
    // State
    paymentState: PaymentState;
    isConnected: boolean;
    walletAddress: string | null;

    // Actions
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

export function useUsdcPayment(network: NetworkType = "mainnet"): UseUsdcPaymentReturn {
    const { login, logout, authenticated, ready } = usePrivy();
    const { wallets } = useWallets();
    const { signAndSendTransaction } = useSignAndSendTransaction();

    const [paymentState, setPaymentState] = useState<PaymentState>({
        status: "idle",
        error: null,
        txSignature: null,
        balance: null,
        estimatedFee: null,
    });

    // Get the first connected Solana wallet
    // Privy wallets from useWallets() don't have walletClientType exposed in the standard way
    const activeWallet = wallets[0];
    const walletAddress = activeWallet?.address || null;
    const isConnected = authenticated && !!activeWallet;

    // Debug logging
    console.log("=== useUsdcPayment Debug ===");
    console.log("Authenticated:", authenticated);
    console.log("Wallets count:", wallets.length);
    console.log("Active wallet:", activeWallet);
    console.log("Wallet address:", walletAddress);
    console.log("Is connected:", isConnected);

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
    }, []);

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
        if (!walletAddress) {
            throw new Error("No wallet connected");
        }

        try {
            updateState({ status: "checking-balance" });
            const balance = await getUsdcBalance(walletAddress, network);
            updateState({ status: "idle", balance });
            return balance;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to check balance";
            updateState({ status: "error", error: errorMessage });
            throw error;
        }
    }, [walletAddress, network, updateState]);

    const sendPayment = useCallback(
        async (
            merchantAddress: string,
            amount: number,
            onSuccess?: (signature: string) => void
        ): Promise<string | null> => {
            if (!activeWallet || !walletAddress) {
                updateState({ status: "error", error: "No wallet connected" });
                return null;
            }

            try {
                console.log("=== Starting Payment Process ===");
                console.log("Merchant Address:", merchantAddress);
                console.log("Amount:", amount);
                console.log("Wallet Address:", walletAddress);

                // Step 1: Check balance
                console.log("Step 1: Checking balance...");
                updateState({ status: "checking-balance", error: null });
                const balance = await getUsdcBalance(walletAddress, network);
                updateState({ balance });
                console.log("Balance check complete:", balance, "USDC");

                if (balance < amount) {
                    throw new Error(
                        `Insufficient balance. You have ${balance.toFixed(2)} USDC but need ${amount} USDC`
                    );
                }

                // Step 2: Estimate fees
                console.log("Step 2: Estimating fees...");
                try {
                    const feeEstimate = await estimateTransferFee(
                        walletAddress,
                        merchantAddress,
                        amount,
                        network
                    );
                    updateState({ estimatedFee: feeEstimate.fee + feeEstimate.rentCost });
                    console.log("Fee estimate:", {
                        fee: feeEstimate.fee,
                        rent: feeEstimate.rentCost,
                        total: feeEstimate.fee + feeEstimate.rentCost,
                        needsCreateAta: feeEstimate.needsCreateAta
                    });
                } catch (error) {
                    console.error("Fee estimation failed:", error);
                    throw new Error(`Failed to estimate transaction fees: ${error instanceof Error ? error.message : String(error)}`);
                }

                // Step 3: Show confirmation (status change triggers UI)
                updateState({ status: "confirming" });

                // Step 4: Create and send transaction
                console.log("Step 4: Creating transaction...");
                updateState({ status: "sending" });

                let transaction;
                let connection;
                try {
                    const result = await createUsdcTransferTransaction({
                        fromAddress: walletAddress,
                        toAddress: merchantAddress,
                        amount,
                        network,
                    });
                    transaction = result.transaction;
                    connection = result.connection;
                    console.log("Transaction created successfully");
                } catch (error) {
                    console.error("Transaction creation failed:", error);
                    throw new Error(`Failed to create transaction: ${error instanceof Error ? error.message : String(error)}`);
                }

                // Serialize the transaction for Privy
                console.log("Serializing transaction...");
                let serializedTx;
                try {
                    serializedTx = transaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false,
                    });
                    console.log("Transaction serialized, size:", serializedTx.length, "bytes");
                } catch (error) {
                    console.error("Transaction serialization failed:", error);
                    throw new Error(`Failed to serialize transaction: ${error instanceof Error ? error.message : String(error)}`);
                }

                // Sign and send using Privy
                console.log("Signing and sending transaction with Privy...");
                console.log("Active wallet:", activeWallet);
                let result;
                try {
                    result = await signAndSendTransaction({
                        transaction: new Uint8Array(serializedTx),
                        wallet: activeWallet,
                    });
                    console.log("Transaction signed and sent:", result);
                } catch (error) {
                    console.error("Privy sign/send failed:", error);

                    // Provide more specific error messages
                    if (error instanceof Error) {
                        if (error.message.includes("User rejected")) {
                            throw new Error("Transaction was cancelled by user");
                        } else if (error.message.includes("Insufficient funds") || error.message.includes("insufficient")) {
                            throw new Error("Insufficient SOL for transaction fees. You need ~0.003 SOL in your wallet to complete this payment.");
                        } else if (error.message.includes("simulation failed") || error.message.includes("Transaction simulation")) {
                            throw new Error("Transaction simulation failed. This usually means you don't have enough SOL (~0.003 SOL) for transaction fees and account rent. Please add SOL to your wallet.");
                        } else if (error.message.includes("not connected")) {
                            throw new Error("Wallet is not properly connected. Please reconnect and try again.");
                        } else {
                            throw new Error(`Transaction failed: ${error.message}`);
                        }
                    }
                    throw new Error("Failed to sign and send transaction. Please try again.");
                }

                // Convert signature from Uint8Array to base58 string (Solana format)
                const signature = bs58.encode(result.signature);
                console.log("Transaction signature (base58):", signature);

                // Step 5: Confirm transaction
                updateState({ status: "confirming-tx", txSignature: signature });

                // Confirm transaction on-chain
                try {
                    console.log("Confirming transaction on-chain...");
                    const confirmed = await confirmTransaction(connection, signature);
                    if (confirmed) {
                        console.log("Transaction confirmed on-chain");
                        updateState({ status: "success", txSignature: signature });
                    } else {
                        throw new Error("Transaction confirmation timed out");
                    }
                } catch (confirmError) {
                    console.error("Transaction confirmation failed:", confirmError);
                    // Even if confirmation fails, the transaction may have succeeded
                    // So we still mark it as success but log the error
                    updateState({ status: "success", txSignature: signature });
                    console.warn("Transaction sent but confirmation uncertain. Check explorer with signature:", signature);
                }

                console.log("=== Payment Complete ===");

                if (onSuccess) {
                    await onSuccess(signature);
                }

                return signature;
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : "Payment failed";
                updateState({ status: "error", error: errorMessage });
                console.error("=== Payment Error ===");
                console.error("Error:", error);
                console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
                return null;
            }
        },
        [activeWallet, walletAddress, network, signAndSendTransaction, updateState]
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

export default useUsdcPayment;