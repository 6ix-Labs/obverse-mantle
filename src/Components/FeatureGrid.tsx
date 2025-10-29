import { D, Icon1, icon3, icon4, icon5, icon6, icon7 } from "@/assets/icons";
import React from "react";

interface Feature {
  icon: string;
  title: string;

}

const features: Feature[] = [
  {
    icon: Icon1,
    title: "Collect payments straight from Telegram or Farcaster conversations.",
  },
  {
    icon: icon3,
    title: "Your buyers just sign up with email — we handle the crypto magic behind the scenes.",
  },
  {
    icon: icon4,
    title: "Works seamlessly across Base, Arbitrum, and Lisk.",
  },
  {
    icon: icon6,
    title: "Every payment comes with details you require — organized automatically.",
    
  },
  {
    icon: icon5,
    title: "Our agent helps you track, manage, and automate your payments — all from chat.",
  },
  {
    icon: icon7,
    title: "You’re always in control. Funds go straight to your wallet.",
  },
];

const FeatureGrid: React.FC = () => {
  return (
    <div className="bg-[#070707] border border-[#464646] rounded-[32px] flex items-center justify-center px-4 py-5 shadow-inner">
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full">
        
        <div className="flex cursor-pointer flex-col gap-4  px-4 py-5 rounded-[32px] border border-[#464646] shadow-inner">
          {features.slice(0, 3).map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>

        <div className="flex cursor-pointer flex-col gap-4  px-4 py-5 rounded-[32px] border border-[#464646] shadow-inner">
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
      className="relative rounded-[16px] border border-[#464646] bg-[#070707] hover:border-[#ff8157] hover:bg-gradient-to-b hover:from-[#160F0C] hover:to-[#2d0e03] shadow-inner p-4 text-gray-300 transition-all duration-50"
    >
      <div className="flex flex-col gap-2">
        <div
          className=""
        > 
        <img src={feature.icon} />

        </div>
        <p className="text-[16px] font-onest leading-[25px]">{feature.title}</p>
      </div>
    </div>
  );
};

export default FeatureGrid;