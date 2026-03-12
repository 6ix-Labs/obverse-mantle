import { useState, useCallback, useEffect, useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";
import {
    useAccount,
    usePublicClient,
    useSwitchChain,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits, erc20Abi, type Address } from "viem";
import type { PaymentStatus } from "./useUsdcPayment";
import { getUsdcConfigForChain, resolveEvmChainConfig } from "../config/chainRegistry";

interface PaymentState {
    status: PaymentStatus;
    error: string | null;
    txSignature: string | null;
    balance: number | null;
    estimatedFee: number | null;
}

interface UseEvmUsdcPaymentReturn {
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

export function useEvmUsdcPayment(requestedChain?: string): UseEvmUsdcPaymentReturn {
    const { login, logout, authenticated, ready } = usePrivy();
    const { address, isConnected: wagmiConnected, chainId } = useAccount();
    const { switchChainAsync } = useSwitchChain();

    const activeChain = useMemo(() => {
        return resolveEvmChainConfig(requestedChain);
    }, [requestedChain]);

    const usdcConfig = useMemo(() => {
        if (!activeChain) return undefined;
        return getUsdcConfigForChain(activeChain.key);
    }, [activeChain]);

    const publicClient = usePublicClient({ chainId: activeChain?.chainId });

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

    const ensureCorrectChain = useCallback(async () => {
        if (!activeChain?.chainId) {
            throw new Error(`Unsupported EVM chain: ${requestedChain || "unknown"}`);
        }

        if (chainId !== activeChain.chainId) {
            await switchChainAsync({ chainId: activeChain.chainId });
        }
    }, [activeChain?.chainId, chainId, switchChainAsync, requestedChain]);

    const checkBalance = useCallback(async (): Promise<number> => {
        if (!address || !publicClient) {
            throw new Error("No wallet connected");
        }

        if (!activeChain) {
            throw new Error(`Unsupported EVM chain: ${requestedChain || "unknown"}`);
        }

        if (!usdcConfig?.address) {
            throw new Error(`USDC is not configured for ${activeChain.displayName}`);
        }

        try {
            updateState({ status: "checking-balance" });
            await ensureCorrectChain();

            const balance = await publicClient.readContract({
                address: usdcConfig.address,
                abi: erc20Abi,
                functionName: "balanceOf",
                args: [address],
            });

            const formatted = Number(formatUnits(balance, usdcConfig.decimals));
            updateState({ status: "idle", balance: formatted });
            return formatted;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to check balance";
            updateState({ status: "error", error: errorMessage });
            throw error;
        }
    }, [address, publicClient, usdcConfig, activeChain, ensureCorrectChain, updateState, requestedChain]);

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

            if (!activeChain) {
                updateState({ status: "error", error: `Unsupported EVM chain: ${requestedChain || "unknown"}` });
                return null;
            }

            if (!publicClient) {
                updateState({ status: "error", error: `Public client not available for ${activeChain.displayName}` });
                return null;
            }

            if (!usdcConfig?.address) {
                updateState({ status: "error", error: `USDC is not configured for ${activeChain.displayName}` });
                return null;
            }

            try {
                await ensureCorrectChain();

                updateState({ status: "checking-balance", error: null });

                const rawBalance = await publicClient.readContract({
                    address: usdcConfig.address,
                    abi: erc20Abi,
                    functionName: "balanceOf",
                    args: [address],
                });

                const balance = Number(formatUnits(rawBalance, usdcConfig.decimals));
                updateState({ balance });

                if (balance < amount) {
                    throw new Error(
                        `Insufficient balance. You have ${balance.toFixed(2)} USDC but need ${amount} USDC`
                    );
                }

                try {
                    const gasPrice = await publicClient.getGasPrice();
                    const estimatedGas = 65000n;
                    const feeInWei = gasPrice * estimatedGas;
                    const feeInNative = Number(formatUnits(feeInWei, 18));
                    updateState({ estimatedFee: feeInNative });
                } catch (error) {
                    console.warn("Fee estimation failed, proceeding anyway:", error);
                    updateState({ estimatedFee: 0.001 });
                }

                updateState({ status: "confirming" });
                updateState({ status: "sending" });

                const amountInUnits = parseUnits(amount.toString(), usdcConfig.decimals);

                const hash = await writeContractAsync({
                    address: usdcConfig.address,
                    abi: erc20Abi,
                    functionName: "transfer",
                    args: [merchantAddress as Address, amountInUnits],
                    chainId: activeChain.chainId,
                });

                updateState({ status: "confirming-tx", txSignature: hash });

                const receipt = await publicClient.waitForTransactionReceipt({
                    hash,
                    confirmations: 1,
                });

                if (receipt.status !== "success") {
                    throw new Error("Transaction reverted on-chain");
                }

                updateState({ status: "success", txSignature: hash });

                if (onSuccess) {
                    await onSuccess(hash);
                }

                return hash;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Payment failed";

                let friendlyError = errorMessage;
                if (errorMessage.includes("User rejected") || errorMessage.includes("user rejected")) {
                    friendlyError = "Transaction was cancelled by user";
                }

                updateState({ status: "error", error: friendlyError });
                return null;
            }
        },
        [address, publicClient, usdcConfig, activeChain, ensureCorrectChain, writeContractAsync, updateState, requestedChain]
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

export default useEvmUsdcPayment;
