import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, type Address, erc20Abi } from 'viem';
import { usePrivy } from '@privy-io/react-auth';


export interface UseERC20TransferParams {
  tokenAddress: Address;
  toAddress: Address;
  amount: string;
  decimals?: number;
}

export interface UseERC20TransferReturn {
  transfer: () => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  transactionHash: string | undefined;
  reset: () => void;
}

export const useERC20Transfer = (): {
  transferToken: (params: UseERC20TransferParams) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  transactionHash: string | undefined;
  reset: () => void;
} => {
  const { address } = useAccount();
  const { user } = usePrivy();
  const userAddress = user?.wallet?.address || address;
  const [customError, setCustomError] = useState<Error | null>(null);

  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: waitError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const transferToken = useCallback(async (params: UseERC20TransferParams) => {
    try {
      setCustomError(null);

      if (!userAddress) {
        throw new Error('No wallet connected');
      }

      if (!params.tokenAddress) {
        throw new Error('Token address is required');
      }

      if (!params.toAddress) {
        throw new Error('Recipient address is required');
      }

      if (!params.amount || params.amount === '0') {
        throw new Error('Amount must be greater than 0');
      }

      const decimals = params.decimals ?? 18;
      const amountInWei = parseUnits(params.amount, decimals);

      await writeContract({
        address: params.tokenAddress,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [params.toAddress, amountInWei],
        maxFeePerGas: BigInt("0x132b3a0"),
        maxPriorityFeePerGas: BigInt("0x132b3a0"),
      });

      console.log("Transaction hash:", hash);
      console.log("Transaction success:", isSuccess);


    } catch (error) {
      const errorMessage = error instanceof Error ? error : new Error('Unknown error occurred');
      setCustomError(errorMessage);
      throw errorMessage;
    }
  }, [userAddress, writeContract]);

  const reset = useCallback(() => {
    resetWrite();
    setCustomError(null);
  }, [resetWrite]);

  const isLoading = isWritePending || isConfirming;
  const isError = !!writeError || !!waitError || !!customError;
  const error = customError || writeError || waitError;

  return {
    transferToken,
    isLoading,
    isSuccess,
    isError,
    error,
    transactionHash: hash,
    reset,
  };
};
