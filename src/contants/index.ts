import { Get, Receive, Track, Type, avatar1, avatar2, avatar3, avatar4, avatar5 } from "../assets/icons";
import {
  BuyandSell,
  faceCoin,
  Ligthening,
  QRCode,
  Stack,
  Payment1,
  Get1,
} from "../assets/images";

export interface NavLink {
  label: string;
  link: string;
}

export interface SSDItems {
  label: string;
  icon: string;
  text: string;
  deg: number;
  className?: string;
  id: number
}

export interface Normal {
  label: string;
  icon: string;
  text: string;
  id?: number
}

export interface Transaction {
  id: string;
  walletId: string;
  userId: string;
  type: string;
  hash?: string;
  amount: string;
  token: string;
  tokenAddress: string;
  network: string;
  fromAddress: string;
  toAddress: string;
  status: string;
  gasFee?: string;
  gasPrice?: string;
  gasUsed?: string;
  blockNumber?: number;
  blockHash?: string;
  confirmations?: number;
  paymentLinkId?: string;
  telegramChatId?: string;
  memo?: string;
  isInternal: boolean;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    deviceInfo?: string;
    initiatedBy?: 'user' | 'agent' | 'system';
    [key: string]: any;
  };
  payerDetails?: { [key: string]: any };
  errorCode?: string;
  errorMessage?: string;
  confirmedAt?: Date;
  failedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  date: string;
  description: string;
  liquidity: string;
}

export interface topTItems {
  id: number;
  label: string;
}
export interface testimonialsItems {
  text: string;
  name: string;
  avatar: string;
}


export const navLinks: NavLink[] = [
  { label: "Home", link: "" },
  { label: "Why us", link: "about" },
  { label: "Features", link: "features" },
];

export const SSD: SSDItems[] = [
  {
    label: "Type",
    icon: Type,
    text: "Open your Telegram and send a simple command to Obverse, like: generate $50 USDC payment link",
    deg: 3,
    id: 1

  },
  {
    label: "Get",
    icon: Get,
    text: "Within seconds, you’ll receive a payment link and a QR code generated specifically for that request.",
    deg: 2,
    id: 2
  },
  {
    label: "Receive",
    icon: Receive,
    text: "Once your customer completes the payment, the funds are delivered directly to your non-custodial wallet, like Phantom on Solana.",
    deg: -2,
    id: 3
  },
  {
    label: "Track",
    icon: Track,
    text: "Once your customer completes the payment, the funds are delivered directly to your non-custodial wallet, like Phantom on Solana.",
    deg: -3,
    id: 4
  },
];

export const WhatMakes1: Normal[] = [
  {
    label: "Buy & Sell Instantly",
    text: "Trade assets with ease. Whether it’s tokens, , or digital goods, buying and selling is seamless and lightning-fast.",
    icon: BuyandSell,
    id: 1
  },
  {
    label: "Scan & Go with QR Code",
    text: "Send and receive funds or access features instantly with smart QR code integration—no long addresses, just tap and go.",
    icon: QRCode,
    id: 2
  },
];
export const WhatMakes2: Normal[] = [
  {
    label: "Crowd Fund with Your Community",
    text: "Launch, manage, or support crowdfunding campaigns with full transparency and smart contract protection.",
    icon: faceCoin,
    id: 1
  },
  {
    label: "Track Everything in Real-Time",
    text: "Keep an eye on your portfolio, transactions, and campaigns with live updates and clean dashboards.",
    icon: Ligthening,
    id: 2
  },
  {
    label: "Seamless Integration",
    text: "Plug-and-play for websites, SaaS platforms, or social storefronts",
    icon: Stack,
    id: 3
  },
];

export const PaymentAppItesm: Normal[] = [
  {
    label: "A Payment App Built for the Platforms You Already Use",
    text: "Obverse doesn’t require customers to understand blockchain. It wraps powerful DeFi tools in a friendly social interface that works on",
    icon: Payment1,
  },
  {
    label: "A Payment App Built for the Platforms You Already Use",
    text: "Obverse doesn’t require customers to understand blockchain. It wraps powerful DeFi tools in a friendly social interface that works on",
    icon: Get1,
  },
];

export const transactions: Transaction[] = [
  {
    id: 'trx-12345',
    walletId: 'wallet-123',
    userId: 'user-123',
    type: 'DEPOSIT',
    hash: '0x1234567890abcdef',
    amount: '10.00',
    token: 'USDC',
    tokenAddress: '0x1234567890abcdef',
    network: 'Ethereum',
    fromAddress: '0x1234567890abcdef',
    toAddress: '0x9876543210fedcba',
    status: 'CONFIRMED',
    gasFee: '0.01',
    gasPrice: '20',
    gasUsed: '10000',
    blockNumber: 12345,
    blockHash: '0x1234567890abcdef',
    confirmations: 10,
    paymentLinkId: 'payment-link-123',
    telegramChatId: '1234567890',
    memo: 'Test deposit',
    isInternal: false,
    metadata: {
      userAgent: 'Mozilla/5.0',
      ipAddress: '192.168.1.100',
      deviceInfo: 'Desktop',
      initiatedBy: 'user',
    },
    payerDetails: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    confirmedAt: new Date('2022-01-01T12:00:00.000Z'),
    createdAt: new Date('2022-01-01T11:00:00.000Z'),
    updatedAt: new Date('2022-01-01T12:00:00.000Z'),
    date: "",
    description: "",
    liquidity: ""
  },
  {
    id: 'trx-12345',
    walletId: 'wallet-123',
    userId: 'user-123',
    type: 'DEPOSIT',
    hash: '0x1234567890abcdef',
    amount: '10.00',
    token: 'USDC',
    tokenAddress: '0x1234567890abcdef',
    network: 'Ethereum',
    fromAddress: '0x1234567890abcdef',
    toAddress: '0x9876543210fedcba',
    status: 'CONFIRMED',
    gasFee: '0.01',
    gasPrice: '20',
    gasUsed: '10000',
    blockNumber: 12345,
    blockHash: '0x1234567890abcdef',
    confirmations: 10,
    paymentLinkId: 'payment-link-123',
    telegramChatId: '1234567890',
    memo: 'Test deposit',
    isInternal: false,
    metadata: {
      userAgent: 'Mozilla/5.0',
      ipAddress: '192.168.1.100',
      deviceInfo: 'Desktop',
      initiatedBy: 'user',
    },
    payerDetails: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    confirmedAt: new Date('2022-01-01T12:00:00.000Z'),
    createdAt: new Date('2022-01-01T11:00:00.000Z'),
    updatedAt: new Date('2022-01-01T12:00:00.000Z'),
    date: "",
    description: "",
    liquidity: ""
  },
  {
    id: 'trx-12345',
    walletId: 'wallet-123',
    userId: 'user-123',
    type: 'DEPOSIT',
    hash: '0x1234567890abcdef',
    amount: '10.00',
    token: 'USDC',
    tokenAddress: '0x1234567890abcdef',
    network: 'Ethereum',
    fromAddress: '0x1234567890abcdef',
    toAddress: '0x9876543210fedcba',
    status: 'CONFIRMED',
    gasFee: '0.01',
    gasPrice: '20',
    gasUsed: '10000',
    blockNumber: 12345,
    blockHash: '0x1234567890abcdef',
    confirmations: 10,
    paymentLinkId: 'payment-link-123',
    telegramChatId: '1234567890',
    memo: 'Test deposit',
    isInternal: false,
    metadata: {
      userAgent: 'Mozilla/5.0',
      ipAddress: '192.168.1.100',
      deviceInfo: 'Desktop',
      initiatedBy: 'user',
    },
    payerDetails: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    confirmedAt: new Date('2022-01-01T12:00:00.000Z'),
    createdAt: new Date('2022-01-01T11:00:00.000Z'),
    updatedAt: new Date('2022-01-01T12:00:00.000Z'),
    date: "",
    description: "",
    liquidity: ""
  },

];

export const topT: topTItems[] = [
  { id: 1, label: "4h" },
  { id: 2, label: "1m" },
  { id: 3, label: "1h" },
  { id: 4, label: "4h" },
];

export const topT2: topTItems[] = [
  { id: 1, label: "Transcation ID" },
  { id: 2, label: "Amount" },
  { id: 3, label: "Date" },
  { id: 4, label: "Description" },
  { id: 5, label: "Liquidity" },
];




export const testimonials: testimonialsItems[] = [
  {
    text: "I started using Obverse to explore better ways of managing digital assets. The platform felt intuitive from day one, and it made cross-border access seamless.",
    name: "Amina Bello",
    avatar: avatar1,
  },
  {
    text: "With Obverse, sending and receiving value across regions became simple. It’s empowering to have a solution that actually works globally, especially for Africa.",
    name: "Lerato Mokoena",
    avatar: avatar2,
  },
  {
    text: "Obverse helped me streamline transactions without worrying about borders. The speed and reliability made it an easy choice for everyday use.",
    name: "Kwame Mensah",
    avatar: avatar3,
  },
  {
    text: "The experience with Obverse has been smooth and dependable. It’s built for real-world usage and scales well beyond local markets.",
    name: "David Okafor",
    avatar: avatar4,
  },
  {
    text: "What stood out with Obverse is how accessible it feels. Whether locally or globally, it bridges the gap in modern digital finance.",
    name: "Samuel Adeyemi",
    avatar: avatar5,
  },
];

