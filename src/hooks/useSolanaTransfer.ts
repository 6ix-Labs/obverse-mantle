import { useState, useCallback } from 'react';
import { useWallets, useSignAndSendTransaction } from '@privy-io/react-auth/solana';
import { useAppKitProvider, useAppKitAccount } from '@reown/appkit/react';
import type { Provider } from '@reown/appkit-adapter-solana/react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import bs58 from 'bs58';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction
} from '@solana/spl-token';

export interface UseSolanaTransferParams {
  tokenMintAddress?: string; // SPL token mint address (optional - if not provided, transfers SOL)
  toAddress: string;
  amount: string;
  decimals?: number;
}

export interface UseSolanaTransferReturn {
  transferToken: (params: UseSolanaTransferParams) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  transactionHash: string | undefined;
  reset: () => void;
}

export const useSolanaTransfer = (): UseSolanaTransferReturn => {
  const { wallets } = useWallets();
  const { signAndSendTransaction } = useSignAndSendTransaction();
  const privySolanaWallet = wallets?.[0];

  // AppKit integration
  const { walletProvider: appKitProvider } = useAppKitProvider<Provider>('solana');
  const { isConnected: isAppKitConnected } = useAppKitAccount({ namespace: 'solana' });

  // Prioritize AppKit provider if connected, fallback to Privy
  const solanaWallet = isAppKitConnected && appKitProvider ? appKitProvider : privySolanaWallet;

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);

  const transferToken = useCallback(async (params: UseSolanaTransferParams) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setIsSuccess(false);

    try {
      // Validate wallet connection
      if (!solanaWallet) {
        throw new Error('No Solana wallet connected');
      }

      // Get user address - AppKit provider has publicKey, Privy has address
      const userAddress = (appKitProvider && isAppKitConnected)
        ? appKitProvider.publicKey?.toString()
        : privySolanaWallet?.address;

      console.log("Solana transfer - wallet info:", {
        isAppKitConnected,
        hasAppKitProvider: !!appKitProvider,
        appKitPublicKey: appKitProvider?.publicKey?.toString(),
        privySolanaAddress: privySolanaWallet?.address,
        selectedAddress: userAddress,
      });

      if (!userAddress) {
        throw new Error('Wallet address not available');
      }

      // Validate parameters
      if (!params.toAddress) {
        throw new Error('Recipient address is required');
      }

      if (!params.amount || params.amount === '0') {
        throw new Error('Amount must be greater than 0');
      }

      // TEMPORARILY DISABLED FOR DEMO
      // // Validate addresses are valid base58 strings
      // const validateSolanaAddress = (address: string): boolean => {
      //   // Check if address contains only valid base58 characters
      //   const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
      //   return base58Regex.test(address) && address.length >= 32 && address.length <= 44;
      // };

      // if (!validateSolanaAddress(userAddress)) {
      //   throw new Error(`Invalid sender address format: ${userAddress}`);
      // }

      // if (!validateSolanaAddress(params.toAddress)) {
      //   throw new Error(`Invalid recipient address format: ${params.toAddress}. Please check the address.`);
      // }

      // Setup connection (defaulting to devnet, adjust based on your needs)
      const connection = new Connection(
        import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.devnet.solana.com',
        'confirmed'
      );

      let fromPubkey: PublicKey;
      let toPubkey: PublicKey;

      try {
        fromPubkey = new PublicKey(userAddress);
      } catch (err) {
        throw new Error(`Invalid sender address: ${userAddress}`);
      }

      try {
        toPubkey = new PublicKey(params.toAddress);
      } catch (err) {
        throw new Error(`Invalid recipient address: ${params.toAddress}. Please verify the Solana address.`);
      }

      let transaction: Transaction;

      if (params.tokenMintAddress) {
        // SPL Token Transfer
        let mintPubkey: PublicKey;

        try {
          mintPubkey = new PublicKey(params.tokenMintAddress);
        } catch (err) {
          throw new Error(`Invalid token mint address: ${params.tokenMintAddress}`);
        }
        const decimals = params.decimals ?? 6;
        const amountInSmallestUnit = Math.floor(parseFloat(params.amount) * Math.pow(10, decimals));

        // Get or create associated token accounts
        const fromTokenAccount = await getAssociatedTokenAddress(
          mintPubkey,
          fromPubkey
        );

        const toTokenAccount = await getAssociatedTokenAddress(
          mintPubkey,
          toPubkey
        );

        // Check if recipient token account exists
        const toTokenAccountInfo = await connection.getAccountInfo(toTokenAccount);

        transaction = new Transaction();

        // Create associated token account if it doesn't exist
        if (!toTokenAccountInfo) {
          transaction.add(
            createAssociatedTokenAccountInstruction(
              fromPubkey, // payer
              toTokenAccount, // associated token account
              toPubkey, // owner
              mintPubkey // mint
            )
          );
        }

        // Add transfer instruction
        transaction.add(
          createTransferInstruction(
            fromTokenAccount,
            toTokenAccount,
            fromPubkey,
            amountInSmallestUnit,
            [],
            TOKEN_PROGRAM_ID
          )
        );
      } else {
        // Native SOL Transfer
        const amountInLamports = Math.floor(parseFloat(params.amount) * LAMPORTS_PER_SOL);

        transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: amountInLamports,
          })
        );
      }

      // Get recent blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      let signature: string;

      // Sign and send transaction - different methods for AppKit vs Privy
      if (appKitProvider && isAppKitConnected) {
        // AppKit provider method
        signature = await appKitProvider.signAndSendTransaction(transaction);
      } else {
        // Privy wallet method - serialize transaction to Uint8Array for v3 API
        const serializedTransaction = transaction.serialize({
          requireAllSignatures: false,
          verifySignatures: false,
        });
        const result = await signAndSendTransaction({
          transaction: serializedTransaction,
          wallet: privySolanaWallet!,
        });
        // Convert Uint8Array signature to base58 string
        signature = bs58.encode(result.signature);
      }

      // Wait for confirmation with better error handling
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      }, 'confirmed');

      setTransactionHash(signature);
      setIsSuccess(true);
      console.log("Transaction successful:", signature);

    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(errorMessage);
      setIsError(true);
      console.error("Transfer error:", errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
    }
  }, [solanaWallet, appKitProvider, isAppKitConnected, privySolanaWallet]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    setTransactionHash(undefined);
  }, []);

  return {
    transferToken,
    isLoading,
    isSuccess,
    isError,
    error,
    transactionHash,
    reset,
  };
};
