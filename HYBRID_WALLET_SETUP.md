# Hybrid Wallet Integration: Privy + Reown AppKit

## Overview

Your payment platform now uses a **hybrid wallet integration** that combines the best of both worlds:

- **Privy**: For EVM wallets (Ethereum, Base, Lisk, Mantle) and user authentication
- **Reown AppKit**: For native Solana wallet connections (Phantom, Solflare, etc.)

## Architecture

```
Payment Request
      ↓
  Is Solana?
   ↓      ↓
  Yes     No
   ↓      ↓
AppKit  Privy
   ↓      ↓
Phantom  MetaMask
Solflare Coinbase
   ↓      ↓
Solana   EVM
Transfer Transfer
```

## Setup Instructions

### 1. Environment Variables

Create a `.env` file with the following:

```bash
# Privy (for EVM)
VITE_APP_ID=your_privy_app_id
VITE_CLIENT_ID=your_privy_client_id

# Reown AppKit (for Solana)
VITE_REOWN_PROJECT_ID=your_reown_project_id

# Solana RPC
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### 2. Get Your Project IDs

#### Privy
1. Go to [Privy Dashboard](https://dashboard.privy.io/)
2. Create/select your app
3. Copy `App ID` and `Client ID`

#### Reown AppKit
1. Go to [Reown Dashboard](https://dashboard.reown.com/)
2. Create a new project
3. Copy the `Project ID`

## How It Works

### EVM Payments (Ethereum, Base, Mantle, Lisk)

1. User clicks "Connect Wallet"
2. Privy modal opens
3. User connects MetaMask/Coinbase/creates embedded wallet
4. Payment uses Privy's wallet
5. Transaction sent via `useERC20Transfer` hook

### Solana Payments

1. User clicks "Connect Wallet" on Solana payment
2. AppKit modal opens (showing only Solana wallets)
3. User connects Phantom/Solflare/other Solana wallet
4. Payment uses AppKit's provider
5. Transaction sent via `useSolanaTransfer` hook

## File Structure

```
src/
├── config/
│   └── appkit.tsx              # AppKit configuration
├── hooks/
│   ├── useERC20Transfer.ts     # EVM transfers (Privy)
│   └── useSolanaTransfer.ts    # Solana transfers (AppKit + Privy)
└── Pages/
    └── Payment/
        └── Payment.tsx         # Smart routing logic
```

## Key Components

### 1. AppKit Configuration (`src/config/appkit.tsx`)

```tsx
import { createAppKit } from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'

const solanaWeb3JsAdapter = new SolanaAdapter()

export const appKit = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana, solanaDevnet, solanaTestnet],
  projectId: process.env.VITE_REOWN_PROJECT_ID
})
```

### 2. Smart Wallet Detection (`Payment.tsx`)

```tsx
const isSolana = paymentData?.network?.toLowerCase().includes('solana');

if (isSolana) {
  // Use AppKit for Solana
  const { address, isConnected } = useAppKitAccount({ namespace: 'solana' });
} else {
  // Use Privy for EVM
  const { address } = useAccount();
}
```

### 3. Unified Transfer Hook (`useSolanaTransfer.ts`)

```tsx
// Works with both AppKit and Privy providers
const solanaWallet = isAppKitConnected && appKitProvider
  ? appKitProvider
  : privySolanaWallet;
```

## User Experience

### First-Time User (Solana Payment)

1. Lands on payment page
2. Clicks "Proceed to Pay"
3. Sees toast: "Please connect your Solana wallet"
4. AppKit modal opens showing:
   - Phantom
   - Solflare
   - Other Solana wallets
   - WalletConnect (for mobile)
5. Connects wallet
6. Payment proceeds

### Returning User

1. Lands on payment page
2. Wallet auto-detected
3. Clicks "Proceed to Pay"
4. Payment proceeds immediately

## Supported Wallets

### Solana (via AppKit)
- ✅ Phantom
- ✅ Solflare
- ✅ Backpack
- ✅ Glow
- ✅ Exodus
- ✅ Trust Wallet
- ✅ 30+ more via WalletConnect

### EVM (via Privy)
- ✅ MetaMask
- ✅ Coinbase Wallet
- ✅ Rainbow
- ✅ Trust Wallet
- ✅ Embedded wallets (email/social)
- ✅ WalletConnect

## Testing

### Test Solana Payment (Devnet)

1. Create payment link with:
   ```json
   {
     "network": "solana-devnet",
     "address": "YOUR_DEVNET_ADDRESS",
     "amount": "0.1",
     "decimals": 9,
     "token": "SOL"
   }
   ```

2. Visit payment page
3. Connect Phantom (set to Devnet)
4. Complete payment

### Test EVM Payment (Base Sepolia)

1. Create payment link with:
   ```json
   {
     "network": "base-sepolia",
     "tokenAddress": "0x...",
     "address": "0x...",
     "amount": "10",
     "decimals": 6,
     "token": "USDC"
   }
   ```

2. Visit payment page
3. Connect MetaMask
4. Complete payment

## Troubleshooting

### "No Solana wallet connected"
**Solution**: Make sure you have Phantom or Solflare installed, or use WalletConnect for mobile wallets.

### "AppKit modal not opening"
**Solution**: Check that `VITE_REOWN_PROJECT_ID` is set correctly in your `.env` file.

### "Transaction failed"
**Solution**:
- For Solana: Ensure you're on the correct network (mainnet/devnet)
- Check you have enough SOL for gas fees (~0.00001 SOL)
- For SPL tokens: Ensure you have enough SOL for ATA creation (~0.002 SOL)

### "Wallet shows ETH address instead of SOL"
**Solution**: This is expected! When users first authenticate, Privy creates an EVM wallet. For Solana payments, AppKit creates a separate Solana connection. Both can exist simultaneously.

## Benefits of This Approach

✅ **Best UX**: Users get native wallet experiences for each chain
✅ **Fallback Support**: If AppKit fails, Privy can still handle Solana via external wallets
✅ **Unified Codebase**: Single payment component handles all chains
✅ **Future-Proof**: Easy to add more chains (Bitcoin, Cosmos, etc.)
✅ **Production Ready**: Both providers are battle-tested

## Migration Notes

### From Previous Setup

**What Changed:**
- ❌ Removed: Manual Solana wallet prompt
- ✅ Added: AppKit for automatic Solana wallet detection
- ✅ Added: Native Solana wallet UI
- ✅ Improved: Better wallet connection flow

**What Stayed:**
- ✅ Privy for EVM chains (unchanged)
- ✅ All ERC20 transfer logic (unchanged)
- ✅ User authentication (unchanged)

### Backward Compatibility

All existing EVM payments work exactly as before. Only Solana payments use the new flow.

## Production Checklist

- [ ] Set up Reown project at https://dashboard.reown.com
- [ ] Add `VITE_REOWN_PROJECT_ID` to production environment
- [ ] Update `VITE_SOLANA_RPC_URL` to use paid RPC (Helius/QuickNode)
- [ ] Test Solana payments on devnet
- [ ] Test Solana payments on mainnet with small amounts
- [ ] Verify wallet connection flow on mobile
- [ ] Test WalletConnect integration
- [ ] Monitor transaction success rates

## Support

For issues:
- **AppKit**: https://docs.reown.com/appkit/overview
- **Privy**: https://docs.privy.io/
- **Solana**: https://docs.solana.com/

---

**Last Updated**: October 2025
**Integration Version**: 1.0.0
