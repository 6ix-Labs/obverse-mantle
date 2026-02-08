const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// USDC token mint address on Solana mainnet
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

async function checkBalance() {
  try {
    const walletAddress = 'MHjUsJ6NNNZJboc53qq7TEBgVRDYk37dfNEXdB29ePy';
    const rpcUrl = 'https://mainnet.helius-rpc.com/?api-key=1ecf6d0f-bd66-4e41-9e97-c424fe872828';

    const connection = new Connection(rpcUrl, 'confirmed');
    const publicKey = new PublicKey(walletAddress);

    console.log(`\n🔍 Checking balances for wallet: ${walletAddress}\n`);

    // Get SOL balance
    const solBalance = await connection.getBalance(publicKey);
    const solBalanceInSol = solBalance / LAMPORTS_PER_SOL;
    console.log(`💰 SOL Balance: ${solBalanceInSol.toFixed(4)} SOL`);

    // Get all token accounts
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: TOKEN_PROGRAM_ID }
    );

    // Find USDC account
    let usdcBalance = 0;
    for (const account of tokenAccounts.value) {
      const mintAddress = account.account.data.parsed.info.mint;
      if (mintAddress === USDC_MINT) {
        const balance = account.account.data.parsed.info.tokenAmount.uiAmount;
        usdcBalance = balance;
        break;
      }
    }

    console.log(`💵 USDC Balance: ${usdcBalance.toFixed(2)} USDC`);

    console.log(`\n📊 Summary:`);
    console.log(`   SOL:  ${solBalanceInSol.toFixed(4)} SOL`);
    console.log(`   USDC: ${usdcBalance.toFixed(2)} USDC\n`);

  } catch (error) {
    console.error('❌ Error checking balance:', error.message);
  }
}

checkBalance();
