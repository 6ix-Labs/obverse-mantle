// utils/solana/transferUsdc.ts
import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";
import {
    getAssociatedTokenAddress,
    createTransferInstruction,
    createAssociatedTokenAccountInstruction,
    getAccount,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

// USDC Token Mint Addresses
export const USDC_MINT_ADDRESSES = {
    mainnet: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    devnet: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU", // Devnet USDC (may vary)
} as const;

// Token decimals
export const USDC_DECIMALS = 6;

// RPC URLs - using multiple fallbacks for reliability
const DEFAULT_RPC_URLS = [
    "https://api.mainnet-beta.solana.com",
];

export const RPC_URLS = {
    mainnet: import.meta.env.VITE_SOLANA_RPC_URL || DEFAULT_RPC_URLS[0],
    devnet: "https://api.devnet.solana.com",
} as const;

export type NetworkType = "mainnet" | "devnet";

interface TransferUsdcParams {
    fromAddress: string;
    toAddress: string;
    amount: number; // Amount in USDC (e.g., 10 for 10 USDC)
    network?: NetworkType;
}

interface TransferResult {
    transaction: Transaction;
    connection: Connection;
    fromTokenAccount: PublicKey;
    toTokenAccount: PublicKey;
    needsCreateAta: boolean;
}

/**
 * Check if a token account exists for a given wallet and mint
 * Uses multiple RPC endpoints with fallback for reliability
 */
export async function checkTokenAccountExists(
    connection: Connection,
    walletAddress: string,
    mintAddress: string
): Promise<{ exists: boolean; address: PublicKey }> {
    const walletPubkey = new PublicKey(walletAddress);
    const mintPubkey = new PublicKey(mintAddress);

    const tokenAccountAddress = await getAssociatedTokenAddress(
        mintPubkey,
        walletPubkey
    );

    try {
        const account = await getAccount(connection, tokenAccountAddress);
        console.log("Token account found:", account);
        return { exists: true, address: tokenAccountAddress };
    } catch (error) {
        console.error("Error checking token account:", error);
        console.log("Error details:", {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
        });

        // Check if it's a TokenAccountNotFoundError (account doesn't exist)
        const errorName = error instanceof Error ? error.name : '';
        const errorMessage = error instanceof Error ? error.message : String(error);

        if (
            errorName === 'TokenAccountNotFoundError' ||
            errorMessage.includes('could not find') ||
            errorMessage.includes('Invalid param: could not find account')
        ) {
            console.log("Token account does not exist (this is normal for new recipients)");
            return { exists: false, address: tokenAccountAddress };
        }

        // For other errors (network, RPC, etc), throw so we can use fallback RPC
        throw error;
    }
}

/**
 * Get USDC balance for a wallet with RPC fallback
 */
export async function getUsdcBalance(
    walletAddress: string,
    network: NetworkType = "mainnet"
): Promise<number> {
    const mintAddress = USDC_MINT_ADDRESSES[network];
    const rpcUrls = network === "mainnet" ? [
        import.meta.env.VITE_SOLANA_RPC_URL,
        "https://api.mainnet-beta.solana.com",
    ].filter(Boolean) : [RPC_URLS[network]];

    console.log("=== getUsdcBalance Debug ===");
    console.log("Wallet Address:", walletAddress);
    console.log("Network:", network);
    console.log("Mint Address:", mintAddress);
    console.log("Available RPC URLs:", rpcUrls.length);

    // Try each RPC URL until one works
    for (let i = 0; i < rpcUrls.length; i++) {
        const rpcUrl = rpcUrls[i];
        console.log(`Trying RPC ${i + 1}/${rpcUrls.length}:`, rpcUrl);

        try {
            const connection = new Connection(rpcUrl as string, "confirmed");

            const { exists, address } = await checkTokenAccountExists(
                connection,
                walletAddress,
                mintAddress
            );

            console.log("Token Account:", address.toBase58());
            console.log("Token Account Exists:", exists);

            if (!exists) {
                console.log("No token account found, returning 0");
                return 0;
            }

            const account = await getAccount(connection, address);
            const balance = Number(account.amount) / Math.pow(10, USDC_DECIMALS);
            console.log("Raw Amount:", account.amount.toString());
            console.log("Balance:", balance, "USDC");
            console.log(`✓ Successfully fetched balance using RPC ${i + 1}`);
            return balance;
        } catch (error) {
            console.error(`RPC ${i + 1} failed:`, error);

            // If this is the last RPC, throw the error
            if (i === rpcUrls.length - 1) {
                console.error("All RPC endpoints failed");
                throw error;
            }

            // Otherwise, continue to next RPC
            console.log(`Trying next RPC...`);
        }
    }

    return 0;
}

/**
 * Create a USDC transfer transaction
 * This handles creating the recipient's ATA if it doesn't exist
 */
export async function createUsdcTransferTransaction({
    fromAddress,
    toAddress,
    amount,
    network = "mainnet",
}: TransferUsdcParams): Promise<TransferResult> {
    // Use the first working RPC URL (same as getUsdcBalance for consistency)
    const rpcUrl = network === "mainnet"
        ? (import.meta.env.VITE_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com")
        : RPC_URLS[network];

    const connection = new Connection(rpcUrl as string, "confirmed");
    const mintAddress = USDC_MINT_ADDRESSES[network];

    console.log("=== createUsdcTransferTransaction ===");
    console.log("Using RPC:", rpcUrl);
    console.log("From:", fromAddress);
    console.log("To:", toAddress);
    console.log("Amount:", amount);

    // Create public key objects
    const fromPubkey = new PublicKey(fromAddress);
    const toPubkey = new PublicKey(toAddress);
    const mintPubkey = new PublicKey(mintAddress);

    // Get associated token accounts
    const fromTokenAccount = await getAssociatedTokenAddress(
        mintPubkey,
        fromPubkey
    );
    const toTokenAccount = await getAssociatedTokenAddress(
        mintPubkey,
        toPubkey
    );

    // Check if sender has a token account
    const senderAccountExists = await checkTokenAccountExists(
        connection,
        fromAddress,
        mintAddress
    );

    if (!senderAccountExists.exists) {
        throw new Error("Sender does not have a USDC token account");
    }

    // Check sender's balance
    const senderBalance = await getUsdcBalance(fromAddress, network);
    if (senderBalance < amount) {
        throw new Error(
            `Insufficient USDC balance. You have ${senderBalance} USDC but trying to send ${amount} USDC`
        );
    }

    // Check if recipient has a token account
    const recipientAccountExists = await checkTokenAccountExists(
        connection,
        toAddress,
        mintAddress
    );

    // Build instructions array
    const instructions: TransactionInstruction[] = [];

    // If recipient doesn't have an ATA, create one
    // The sender pays for the creation (rent)
    if (!recipientAccountExists.exists) {
        const createAtaInstruction = createAssociatedTokenAccountInstruction(
            fromPubkey, // payer
            toTokenAccount, // associated token account address
            toPubkey, // owner
            mintPubkey, // mint
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );
        instructions.push(createAtaInstruction);
    }

    // Convert amount to token units (considering decimals)
    const tokenAmount = BigInt(Math.round(amount * Math.pow(10, USDC_DECIMALS)));

    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        fromPubkey,
        tokenAmount
    );
    instructions.push(transferInstruction);

    // Create transaction and add instructions
    const transaction = new Transaction().add(...instructions);

    // Get recent blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = fromPubkey;

    return {
        transaction,
        connection,
        fromTokenAccount,
        toTokenAccount,
        needsCreateAta: !recipientAccountExists.exists,
    };
}

/**
 * Estimate transaction fee for USDC transfer
 */
export async function estimateTransferFee(
    fromAddress: string,
    toAddress: string,
    amount: number,
    network: NetworkType = "mainnet"
): Promise<{ fee: number; needsCreateAta: boolean; rentCost: number }> {
    const { transaction, connection, needsCreateAta } = await createUsdcTransferTransaction({
        fromAddress,
        toAddress,
        amount,
        network,
    });

    // Get fee for the transaction
    const message = transaction.compileMessage();
    const fee = await connection.getFeeForMessage(message);

    // If we need to create an ATA, there's additional rent cost (~0.002 SOL)
    const rentCost = needsCreateAta ? 0.00203928 : 0;

    return {
        fee: fee.value ? fee.value / 1e9 : 0.000005, // Convert lamports to SOL
        needsCreateAta,
        rentCost,
    };
}

/**
 * Confirm a transaction with retries
 */
export async function confirmTransaction(
    connection: Connection,
    signature: string,
    maxRetries: number = 3
): Promise<boolean> {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const confirmation = await connection.confirmTransaction(signature, "confirmed");
            if (confirmation.value.err) {
                throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
            }
            return true;
        } catch (error) {
            if (i === maxRetries - 1) {
                throw error;
            }
            // Wait before retrying
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
    return false;
}