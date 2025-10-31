# Solana Payment Integration Guide

## Overview
Your payment component now supports both **EVM (Ethereum/Base/Lisk/Mantle)** and **Solana** blockchain transfers. The component automatically detects the network type and uses the appropriate transfer method.

## ✅ What's Been Implemented

### 1. Solana Transfer Hook (`src/hooks/useSolanaTransfer.ts`)
- **Native SOL transfers**: Send SOL directly
- **SPL token transfers**: Send USDC and other SPL tokens
- **Automatic ATA creation**: Creates associated token accounts if needed
- **Transaction confirmation**: Waits for transaction finality
- **Error handling**: Comprehensive error messages

### 2. Updated Payment Component (`src/Pages/Payment/Payment.tsx`)
- **Network detection**: Automatically detects if payment is Solana or EVM
- **Dual wallet support**: Connects both EVM and Solana wallets
- **Dynamic validation**: Different validation rules per network
- **Block explorer links**: Links to Solana Explorer or EVM explorers

### 3. Privy Configuration (`src/index.tsx`)
- **Solana support enabled**: Users can connect Solana wallets
- **Embedded wallets**: Creates Solana wallets for new users

## 🚀 How to Use

### Backend Response Format

For **Solana payments**, your API should return:

```json
{
  "network": "solana",           // or "solana-devnet", "solana-testnet"
  "address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "tokenAddress": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",  // USDC mint address (optional)
  "amount": "10",
  "decimals": 6,                 // 6 for USDC, 9 for SOL
  "token": "USDC",
  "title": "Coffee shop order",
  "payerDetails": {
    "name": "",
    "email": ""
  }
}
```

For **EVM payments** (existing format):

```json
{
  "network": "base",             // or "mantle", "lisk", etc.
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "tokenAddress": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "amount": "10",
  "decimals": 6,
  "token": "USDC"
}
```

### Network Detection Logic

The component checks if `paymentData.network` contains "solana":
- `"solana"` → Uses Solana transfer
- `"solana-devnet"` → Uses Solana devnet
- `"solana-testnet"` → Uses Solana testnet
- `"base"`, `"mantle"`, etc. → Uses EVM transfer

## 📋 Environment Configuration

Create a `.env` file with:

```bash
# Privy Configuration
VITE_APP_ID=your_privy_app_id
VITE_CLIENT_ID=your_privy_client_id

# Solana RPC (choose based on network)
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
# VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### Recommended RPC Providers

**For Production:**
- [Helius](https://helius.xyz) - Free tier available
- [QuickNode](https://quicknode.com) - Reliable and fast
- [Alchemy](https://alchemy.com) - Enterprise grade

**For Development:**
- Public devnet: `https://api.devnet.solana.com`
- Public testnet: `https://api.testnet.solana.com`

## 🔧 Common Solana Token Addresses

### Mainnet
- **USDC**: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
- **USDT**: `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB`
- **SOL**: Leave `tokenAddress` empty/null

### Devnet
- **USDC**: `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
- Test tokens available from [Solana Faucet](https://faucet.solana.com/)

## 🎯 Testing Guide

### 1. Test Solana Devnet Payment

```bash
# 1. Start the dev server
npm start

# 2. Create a payment link on backend with:
{
  "network": "solana-devnet",
  "address": "YOUR_DEVNET_WALLET_ADDRESS",
  "amount": "1",
  "decimals": 9,
  "token": "SOL"
}

# 3. Visit the payment link
# 4. Connect Solana wallet via Privy
# 5. Complete the payment
```

### 2. Test SPL Token Payment (USDC)

```json
{
  "network": "solana-devnet",
  "tokenAddress": "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
  "address": "RECIPIENT_ADDRESS",
  "amount": "10",
  "decimals": 6,
  "token": "USDC"
}
```

## 🐛 Troubleshooting

### Error: "No Solana wallet connected"
**Solution**: Make sure user has connected a Solana wallet through Privy. The component will prompt for connection.

### Error: "Insufficient funds"
**Solution**: Ensure the user has enough SOL for:
1. The transfer amount (if sending SOL)
2. Transaction fees (~0.00001 SOL)
3. ATA creation fee (~0.002 SOL, if creating new token account)

### Error: "TokenAccountNotFoundError"
**Solution**: The hook automatically creates associated token accounts. If this fails, check:
- User has enough SOL for rent (~0.002 SOL)
- Token mint address is correct
- RPC endpoint is responsive

### Transaction taking too long
**Solution**:
- Check RPC endpoint health
- Try different commitment level in hook
- Use paid RPC provider for better reliability

## 📊 Transaction Flow

1. **User clicks "Proceed to Pay"**
2. **Wallet validation**
   - Solana: Checks for Solana wallet connection
   - EVM: Checks for EVM wallet connection
3. **Form validation**
   - Validates required payer details
   - Validates payment configuration
4. **Transfer execution**
   - Solana: Uses `useSolanaTransfer` hook
   - EVM: Uses `useERC20Transfer` hook
5. **Transaction confirmation**
   - Waits for blockchain confirmation
   - Shows success/error message
   - Displays block explorer link

## 🔒 Security Notes

- Private keys never leave the Privy wallet
- Transactions are signed client-side
- No backend access to user funds
- Users approve each transaction

## 📦 Dependencies

```json
{
  "@solana/web3.js": "^1.98.4",
  "@solana/spl-token": "^0.4.14",
  "@privy-io/react-auth": "^2.24.0"
}
```

## 🎉 Features

✅ Native SOL transfers
✅ SPL token transfers (USDC, USDT, etc.)
✅ Automatic ATA creation
✅ Transaction confirmation tracking
✅ Block explorer integration
✅ Error handling with user-friendly messages
✅ Loading states and progress indicators
✅ Support for mainnet, devnet, and testnet
✅ Backward compatible with existing EVM payments

## 📝 Next Steps

1. **Test on devnet** with small amounts
2. **Update backend** to return correct network types
3. **Configure RPC endpoints** for production
4. **Test user flow** end-to-end
5. **Deploy to production** when ready

## 🆘 Support

For issues or questions:
- Check Privy documentation: https://docs.privy.io/
- Solana documentation: https://docs.solana.com/
- Report bugs to your team
