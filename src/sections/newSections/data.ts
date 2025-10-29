export interface DataItem {
  id: string;
  question: string;
  answer: string;
}

const data: DataItem[] = [
  {
    id: "1",
    question: "Do I need a wallet?",
    answer:
      "Nope. Just your email and you are good.",
  },
  {
    id: "2",
    question: "Is it safe?",
    answer:
      "Yes. We use industry-standard encryption and security protocols to protect your transactions. Your funds are held in secure smart contracts, and all payments are processed on-chain for transparency and security.",
  },
  {
    id: "3",
    question: "Why stablecoins?",
    answer:
      "Stablecoins combine the speed and borderless nature of crypto with price stability. You get instant, low-cost payments without worrying about volatility—making them perfect for everyday transactions and merchant payments.",
  },

];

export default data;
