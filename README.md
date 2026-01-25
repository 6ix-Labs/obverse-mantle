# Obverse

<div align="center">

![Obverse Logo](images/OBVERSE%203.jpg)

**Stablecoin Payments That Feel Like Chat**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

[Website](https://obverse.cc) • [Obverse Bot](https://t.me/ObverseBot) • [Documentation](#documentation)

</div>

## Overview

**Obverse** is a next-generation Telegram-based AI agent that revolutionizes how merchants, creators, and businesses accept stablecoin payments. By integrating directly into Telegram, Obverse eliminates the complexity of traditional crypto payment systems, offering a seamless, chat-like experience for sending and receiving payments.

### Key Value Propositions

- **Zero Friction**: Accept payments with a simple Telegram command - no complex wallet setups required
- **Multi-Chain Support**: Native support for Solana and EVM chains (Base, Mantle, Lisk)
- **Instant Payments**: Generate payment links and QR codes in seconds
- **Non-Custodial**: Funds are delivered directly to merchant wallets
- **AI-Powered**: Intelligent payment processing through Telegram bot interface

## Features

### Core Functionality

- **Telegram AI Agent**: Natural language payment processing via Telegram bot
- **Payment Links**: Generate secure, shareable payment links instantly
- **QR Code Payments**: Quick scan-and-pay functionality for in-person transactions
- **Stablecoin Support**: Accept USDC and other stablecoins across multiple networks
- **Hybrid Wallet Integration**: 
  - **Solana**: Native support via Reown AppKit (Phantom, Solflare, etc.)
  - **EVM Chains**: Support via Privy (MetaMask, Coinbase Wallet, embedded wallets)
- **Real-Time Tracking**: Monitor transactions and payment status in real-time
- **Merchant Dashboard**: Comprehensive transaction management and analytics

### Target Use Cases

- **Freelancers & Creators**: Receive global payments instantly without delays or middlemen
- **Brick-and-Mortar Merchants**: Accept in-store payments via QR codes
- **SaaS & Digital Businesses**: Streamline subscription and one-time payments
- **DAOs & GameFi Projects**: Enable community payments and in-game transactions
- **E-commerce Stores**: Seamless integration for online storefronts

## Technology Stack

### Frontend

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.1.0 |
| **Language** | TypeScript | 5.0+ |
| **Build Tool** | Vite | 5.0 |
| **Styling** | Tailwind CSS | 3.4+ |
| **Animation** | Framer Motion | 12.23+ |
| **Routing** | React Router | 7.9+ |
| **UI Components** | Radix UI | 1.1+ |

### Blockchain Integration

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Solana** | Reown AppKit | Native Solana wallet connections |
| **EVM Chains** | Privy + Wagmi | Multi-chain EVM support |
| **Blockchain SDK** | Viem | Type-safe blockchain interactions |
| **State Management** | TanStack Query | Server state & caching |
| **Solana SDK** | @solana/web3.js | Solana program interactions |

### Supported Networks

- **Solana**: Mainnet, Devnet, Testnet
- **EVM Chains**: Base, Base Sepolia, Mantle, Lisk, Lisk Sepolia

### Authentication & Wallets

- **Privy**: Embedded wallets, social login, email authentication
- **Reown AppKit**: Native Solana wallet connections (Phantom, Solflare, Backpack, etc.)
- **WalletConnect**: Cross-platform wallet connectivity

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager
- **Telegram Bot Token**: For Telegram integration
- **Privy App ID & Client ID**: For EVM wallet support
- **Reown Project ID**: For Solana wallet connections

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd obverse-mantle-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Privy Configuration (EVM)
   VITE_PRIVY_APP_ID=your_privy_app_id
   VITE_PRIVY_CLIENT_ID=your_privy_client_id
   
   # Reown AppKit Configuration (Solana)
   VITE_REOWN_PROJECT_ID=your_reown_project_id
   VITE_PROJECT_ID=your_reown_project_id
   
   # Solana RPC Configuration
   VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   VITE_SOLANA_WSS_URL=wss://api.mainnet-beta.solana.com
   
   # API Configuration
   VITE_API_URL=your_backend_api_url
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will be available at [http://localhost:5173](http://localhost:5173)

### Available Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run serve` | Preview production build locally |
| `npm test` | Run test suite with Vitest |

## 📁 Project Structure

```
obverse-mantle-ui/
├── src/
│   ├── assets/          # Images, icons, and static assets
│   ├── Components/      # Reusable UI components
│   │   ├── Button/
│   │   ├── Dropdown/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   └── ui/          # shadcn/ui components
│   ├── config/          # Configuration files
│   │   └── appkit.tsx   # Reown AppKit setup
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   │   ├── useERC20Transfer.ts
│   │   ├── useSolanaTransfer.ts
│   │   └── useChainManager.tsx
│   ├── Pages/           # Page components
│   │   ├── Home/
│   │   ├── Payment/
│   │   └── Wallet/
│   ├── providers/       # Context providers
│   │   └── PrivyProvider.tsx
│   ├── sections/         # Landing page sections
│   │   ├── Hero/
│   │   ├── BuiltFor/
│   │   ├── PaymentApp/
│   │   └── ...
│   ├── utils/           # Utility functions
│   └── wagmiConfig.ts   # Wagmi configuration
├── public/              # Public assets
├── package.json
└── vite.config.ts
```

## Integration Guide

### Wallet Integration

Obverse uses a **hybrid wallet architecture**:

- **Solana Payments**: Handled via Reown AppKit for native Solana wallet connections
- **EVM Payments**: Handled via Privy for EVM-compatible chains

See detailed integration guides:
- [Hybrid Wallet Setup Guide](./HYBRID_WALLET_SETUP.md)
- [Solana Integration Guide](./SOLANA_INTEGRATION.md)
- [AppKit Setup Guide](./APPKIT_SETUP_GUIDE.md)

### Payment Flow

1. **Merchant generates payment link** via Telegram bot
2. **Customer receives link/QR code** with payment details
3. **Customer connects wallet** (auto-detected based on network)
4. **Transaction processed** on-chain
5. **Funds delivered** directly to merchant's non-custodial wallet
6. **Real-time confirmation** and tracking

## Design System

### Color Palette

- **Primary**: `#E7562E` (Obverse Orange)
- **Background**: `#FFEDE8` (Peach)
- **Text**: `#2e1109` (Dark Brown)
- **Accent**: `#742B17` (Rust)

### Typography

- **Headings**: Cal Sans
- **Body**: Figtree
- **Display**: Space Grotesk / Onest

### Components

Built with **shadcn/ui** and **Radix UI** for accessible, customizable components.

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## Deployment

### Production Build

```bash
npm run build
```

The optimized build will be in the `build/` directory, ready for deployment to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

### Environment Variables

Ensure all production environment variables are configured in your hosting platform.

## 🔒 Security

- **Non-Custodial Wallets**: Users maintain full control of their funds
- **Secure Authentication**: Privy-powered authentication with multiple login methods
- **Transaction Validation**: Comprehensive validation before processing
- **Error Handling**: Robust error handling and user feedback

## Contributing

This is a private, proprietary project. For internal contributions:

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request for review
4. Ensure all tests pass

## License

This project is **private and proprietary**. All rights reserved.

## Support & Contact

- **Website**: [obverse.cc](https://obverse.cc)
- **Obverse Bot**: [@ObverseBot](https://t.me/ObverseBot)
- **Documentation**: See `/docs` directory for detailed guides

<div align="center" style="margin-top: 90px">

*Simplifying crypto payments, one message at a time.*

</div>
