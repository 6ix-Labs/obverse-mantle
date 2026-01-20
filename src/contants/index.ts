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
  amount: string;
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
    id: "Zxx2d7xyPfg1h...",
    amount: "$2,045",
    date: "14/05/2024",
    description: "4D2E34F34DF34DF34DF23F3...",
    liquidity: "$13.2",
  },
  {
    id: "Zxx2d7xyPfg1h...",
    amount: "$2,045",
    date: "14/05/2024",
    description: "4D2E34F34DF34DF34DF23F3...",
    liquidity: "$13.2",
  },
  {
    id: "Zxx2d7xyPfg1h...",
    amount: "$2,045",
    date: "14/05/2024",
    description: "4D2E34F34DF34DF34DF23F3...",
    liquidity: "$13.2",
  },
  {
    id: "Zxx2d7xyPfg1h...",
    amount: "$2,045",
    date: "14/05/2024",
    description: "4D2E34F34DF34DF34DF23F3...",
    liquidity: "$13.2",
  },
  {
    id: "Zxx2d7xyPfg1h...",
    amount: "$2,045",
    date: "14/05/2024",
    description: "4D2E34F34DF34DF34DF23F3...",
    liquidity: "$13.2",
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
            text: "I started with just one bundle of DeCharge Mini, mostly out of curiosity. We installed them near a college campus where there’s always EV traffic.",
            name: "Cornel Isakiss",
            avatar: avatar1
        },
        {
            text: "It’s an amazing experience with reliable EV charging support everywhere.",
            name: "Cornel Isakiss",
            avatar: avatar2,
        },
        {
            text: "Our sales increased by 40% after installing DeCharge stations.",
            name: "Cornel Isakiss",
            avatar: avatar3,
        },
        {
            text: "The best EV charging solution we’ve ever tried!",
            name: "Cornel Isakiss",
            avatar: avatar4,
        },
        {
            text: "Compact, reliable, and easy to use. Perfect for city locations.",
            name: "Cornel Isakiss",
            avatar: avatar5,
        },
    ];
