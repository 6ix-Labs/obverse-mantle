# AppKit Solana Wallet Integration - Quick Start

## The Problem You Had

When users clicked "Connect Wallet" for Solana payments, Privy was opening by default, which only shows **EVM wallets** (and creates an ETH address). This confused users who needed to connect **Solana wallets** (Phantom, Solflare).

## The Solution

Now your app uses **AppKit** specifically for Solana payments, which:
- ✅ Shows **only Solana wallets** (Phantom, Solflare, Backpack, etc.)
- ✅ Creates a **Solana address** (not ETH)
- ✅ Works via WalletConnect for mobile wallets
- ✅ Keeps Privy for EVM payments (unchanged)

## What Changed

### Before (Problem)
```
Solana Payment → Privy Modal → MetaMask/Coinbase → ❌ ETH address
```

### After (Fixed)
```
Solana Payment → AppKit Modal → Phantom/Solflare → ✅ SOL address
EVM Payment → Privy Modal → MetaMask/Coinbase → ✅ ETH address
```

## How to Test It

### 1. Set Up Environment

Add to your `.env`:
```bash
VITE_REOWN_PROJECT_ID=your_project_id_here
```

Get your project ID from: https://dashboard.reown.com

### 2. Start the App

```bash
npm start
```

### 3. Test Solana Payment

1. Create a payment link with `network: "solana"` or `"solana-devnet"`
2. Visit the payment page
3. Click "Connect Solana Wallet"
4. **You should see AppKit modal** with Solana wallets only:
   - Phantom
   - Solflare
   - Backpack
   - Other Solana wallets
   - WalletConnect (QR code for mobile)

### 4. Test EVM Payment

1. Create a payment link with `network: "base"` or `"mantle"`
2. Visit the payment page
3. Click "Connect Wallet"
4. **You should see Privy modal** (unchanged)

## Visual Flow

### Solana Payment Flow

```
┌─────────────────────┐
│  Payment Page       │
│  network: "solana"  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Button Shows:       │
│ "Connect Solana     │
│  Wallet"            │
└──────────┬──────────┘
           │ Click
           ▼
┌─────────────────────┐
│ AppKit Modal Opens  │
│                     │
│ ☑ Phantom           │
│ ☑ Solflare          │
│ ☑ Backpack          │
│ ☑ WalletConnect     │
└──────────┬──────────┘
           │ Connect
           ▼
┌─────────────────────┐
│ Solana Address      │
│ Connected! ✅       │
│ 7xKX...PTg          │
└─────────────────────┘
```

## Troubleshooting

### Issue: "Still showing Privy for Solana payments"

**Check:**
1. Backend returns `network: "solana"` (not "mantle" or "base")
2. AppKit config imported: check `src/config/appkit.tsx` exists
3. `VITE_REOWN_PROJECT_ID` is set in `.env`

**Debug:**
```javascript
// Check in browser console
console.log(paymentData.network); // Should be "solana"
```

### Issue: "AppKit modal not opening"

**Fix:**
1. Check browser console for errors
2. Verify AppKit imported correctly in Payment.tsx
3. Try hard refresh (Ctrl+Shift+R)

### Issue: "No wallets showing in AppKit"

**This is normal if:**
- You don't have Phantom/Solflare installed
- **Solution**: Use WalletConnect option (QR code) to connect mobile wallet

## Backend Requirements

For Solana payments, your API must return:

```json
{
  "network": "solana",           // ← Must contain "solana"
  "address": "7xKX...PTg",       // Solana address (base58)
  "amount": "0.1",
  "decimals": 9,                 // 9 for SOL, 6 for USDC
  "token": "SOL"
}
```

For EVM payments (unchanged):

```json
{
  "network": "base",             // or "mantle", "lisk"
  "tokenAddress": "0x...",       // EVM token address
  "address": "0x...",            // EVM address
  "amount": "10",
  "decimals": 6,
  "token": "USDC"
}
```

## Key Files

| File | Purpose |
|------|---------|
| `src/config/appkit.tsx` | AppKit configuration (Solana only) |
| `src/Pages/Payment/Payment.tsx` | Smart routing logic (Solana → AppKit, EVM → Privy) |
| `src/hooks/useSolanaTransfer.ts` | Works with both AppKit & Privy providers |
| `.env.example` | Environment variable template |

## What Happens Under the Hood

```typescript
// In Payment.tsx
const isSolana = paymentData?.network?.toLowerCase().includes('solana');

if (isSolana) {
  // Use AppKit
  if (!isAppKitConnected) {
    appKit.open({ view: 'Connect' }); // Shows Solana wallets
  }
} else {
  // Use Privy (EVM)
  if (!authenticated) {
    connectOrCreateWallet(); // Shows MetaMask, etc.
  }
}
```

## Benefits

✅ **Better UX**: Users see only relevant wallets for their payment
✅ **Less Confusion**: No more "Why is it asking for MetaMask for Solana?"
✅ **Native Support**: Phantom, Solflare work perfectly
✅ **Mobile Friendly**: WalletConnect for mobile Solana wallets
✅ **Backward Compatible**: EVM payments unchanged

## Production Checklist

Before going live:

- [ ] Get Reown Project ID from https://dashboard.reown.com
- [ ] Add `VITE_REOWN_PROJECT_ID` to production `.env`
- [ ] Test Solana devnet payment end-to-end
- [ ] Test with Phantom desktop extension
- [ ] Test with WalletConnect (mobile Phantom/Solflare)
- [ ] Test EVM payments still work (Base, Mantle)
- [ ] Monitor wallet connection success rates

## Need Help?

**AppKit Docs**: https://docs.reown.com/appkit/react/core/installation
**Privy Docs**: https://docs.privy.io/

---

**Updated**: October 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready
