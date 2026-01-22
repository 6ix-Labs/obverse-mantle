export interface DataItem {
  id: string;
  question: string;
  answer: string;
}

const data: DataItem[] = [
  {
    id: "1",
    question: "Freelancers & Creators",
    answer:
      "Receive payments from global clients instantly. No delays, no middlemen just borderless, direct crypto payouts.",
  },
  {
    id: "2",
    question: "Brick-and-Mortar Merchants",
    answer:
      "Accept in-store payments via QR codes instantly. Customers scan and pay with stablecoins, no complex setup required.",
  },
  {
    id: "3",
    question: "SaaS & Digital Businesses",
    answer:
      "Streamline subscription payments and one-time purchases. Automated billing with crypto, seamless integration for platforms.",
  },
  {
    id: "4",
    question: "DAOs & GameFi Projects",
    answer:
      "Enable community payments and in-game transactions effortlessly. Distribute funds, collect dues, process rewards instantly.",
  },

];

export default data;
