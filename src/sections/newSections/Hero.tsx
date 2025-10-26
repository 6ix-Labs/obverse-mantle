import React from "react";

import { FiArrowUpRight } from "react-icons/fi";
import FeatureGrid from "@/Components/FeatureGrid";
import { Button } from "@/Components/Button/Button";


const Hero = () => {
  return (
    <section className="sm:w-[90%] mx-auto w-[95%] sm:mt-14 mt-8">
      <div className="flex flex-col sm:gap-20 gap-14 items-center justify-center w-full">
        <div className="flex flex-col gap-5 items-center justify-center">
          <div>
            <Button
              size="normal"
              variant="normal"
              className="font-onest text-[12px] sm:text-[14px] py-2 px-4 bg-[#2b1e1a] text-[#FF7849] border-[0.5px] border-[#FFBAA224] rounded-[80px]"
            >
              Paystack but for crypto
            </Button>
          </div>

          <div className="flex gap-3 sm:gap-4 flex-col items-center w-full">
            <h1 className="font-onest leading-none font-bold text-[40px] sm:text-[35px] md:text-[38px] lg:text-[50px] max-w-full bg-gradient-to-r from-[#FFFFFF] to-[#FF7849] bg-clip-text text-transparent text-center px-4">
              Accept Stablecoins in chat <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>with built-in invoicing
            </h1>
            <p className="text-[#FFFFFF] font-onest text-[14px] sm:text-[16px] md:text-[18px] max-w-[342px] sm:max-w-[550px] text-center px-4">
              Payment links, QR codes, and invoicing, all automated right within
              your communities.
            </p>
          </div>

          <div className="relative flex justify-center items-center">
            <Button
              size="normal"
              variant="normal"
              className="flex mt-2 bg-[#FF7849] text-[#131313] rounded-[40px] border-[#FFBAA2] text-[10px] sm:text-[11px] md:text-[12px] font-medium px-7 sm:px-5 md:px-6 py-2.5 sm:py-3 hover:bg-[#ff8c63] transition-colors whitespace-nowrap"
            >
              Create Payment Link <FiArrowUpRight className="ml-1" />
            </Button>
          </div>
        </div>
       
       <div className="flex flex-col gap-10">
        <div className="relative flex gap-3 sm:gap-4 flex-col items-center w-full">
          <div className="absolute w-[405px] h-[405px] rounded-full bg-gradient-to-b from-[#FF7849] to-[#745846] opacity-60 blur-[360px] -top-[96px] pointer-events-none"></div>
            <h1 className="font-spacegrotesk leading-none font-bold text-[30px] sm:text-[32px] md:text-[33px] lg:text-[42px] max-w-full bg-gradient-to-r from-[#FFFFFF] to-[#99928F] bg-clip-text text-transparent text-center px-4">
             The easiest way to get paid  <br className="hidden sm:block" /> in crypto — anywhere.
            </h1>
            <p className="text-[#FFFFFF] font-onest text-[12px] sm:text-[14px] md:text-[16px] max-w-[342px] sm:max-w-[550px] text-center px-4">
             Whether you’re a small merchant, creator, or community seller, Obverse lets you collect stablecoins instantly from chat. No complicated wallet setups, no jargon. Just send a link and get paid.
            </p>
          </div>
        
        <div>
            <FeatureGrid />
        </div>
       </div>
      </div>
    </section>
  );
};

export default Hero;
