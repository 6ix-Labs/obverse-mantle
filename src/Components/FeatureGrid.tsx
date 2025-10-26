import React from "react";

interface Feature {
  icon: string;
  title: string;
  highlight?: boolean;
}

const features: Feature[] = [
  {
    icon: "💬",
    title: "Collect payments straight from Telegram or Farcaster conversations.",
  },
  {
    icon: "📧",
    title: "Your buyers just sign up with email — we handle the crypto magic behind the scenes.",
  },
  {
    icon: "⚙️",
    title: "Works seamlessly across Base, Arbitrum, and Lisk.",
  },
  {
    icon: "💰",
    title: "Every payment comes with details you require — organized automatically.",
    highlight: true,
  },
  {
    icon: "📊",
    title: "Our agent helps you track, manage, and automate your payments — all from chat.",
  },
  {
    icon: "👛",
    title: "You’re always in control. Funds go straight to your wallet.",
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <div className="bg-[#070707] border border-[#464646] rounded-[32px] flex items-center justify-center px-4 py-5 shadow-inner">
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full">
        {/* Left column */}
        <div className="flex flex-col gap-4  px-4 py-5 rounded-[32px] border border-[#464646] shadow-inner">
          {features.slice(0, 3).map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4  px-4 py-5 rounded-[32px] border border-[#464646] shadow-inner">
          {features.slice(3).map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div
      className="relative rounded-[16px] border border-[#464646] bg-[#070707] shadow-inner p-4 text-gray-300 transition-all duration-30"
    >
      <div className="flex flex-col gap-2">
        <span
          className={`text-xl ${
            feature.highlight ? "text-[#ff7849]" : "text-gray-400"
          }`}
        >
          {feature.icon}
        </span>
        <p className="text-[16px] font-onest leading-[25px]">{feature.title}</p>
      </div>
    </div>
  );
};

export default FeatureGrid;