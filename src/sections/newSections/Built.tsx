import React from "react";

import { FiArrowUpRight } from "react-icons/fi";
import { community } from "@/assets/images";
import { Button } from "@/Components/Button/Button";

const Built = () => {
  return (
    <section className="w-[90%] mx-auto relative overflow-hidden">
      <div className=" bg-[#070707] mt-10  border border-[#464646] rounded-[32px] flex lg:flex-row flex-col lg:items-center gap-14 justify-betwwen px-5 py-7 shadow-inner">
        <div className="absolute w-[600px] h-[550px] rounded-full bg-gradient-to-b from-[#FF7849] to-[#745846] opacity-60 blur-[360px] top-[296px] left-[118px] pointer-events-none"></div>

        <div className="flex gap-3 md:px-6 sm:gap-4 items-start flex-col w-full md:w-[90%] mx-auto">
          <h1 className="font-spacegrotesk leading-none font-bold text-[40px] sm:text-[35px] md:text-[38px] lg:text-[50px] bg-gradient-to-r from-[#FFF3EF] to-[#99928F] bg-clip-text text-transparent">
            Built for the
            <br className="hidden lg:block" /> Community
          </h1>
          <p className="text-[#FFFFFF] font-onest text-[12px] sm:text-[14px] md:text-[16px] max-w-[342px] sm:max-w-[550px]">
            Obverse is not another payment app. It’s a movement for crypto-native merchants, creators, and micro-entrepreneurs who live online and transact in real time.
          </p>

          <div className="relative flex justify-center items-center">
            <a href="https://t.me/ObverseBot" target="_blank" rel="noopener noreferrer">
              <Button
                size="normal"
                variant="normal"
                className="flex mt-2 bg-[#FF7849] text-[#131313] rounded-[40px] border-[#FFBAA2] text-[10px] sm:text-[11px] md:text-[12px] font-medium px-7 sm:px-5 md:px-6 py-2.5 sm:py-3 hover:bg-[#ff8c63] transition-colors whitespace-nowrap"
              >
                Create Payment Link <FiArrowUpRight className="ml-1" />
              </Button>
            </a>
          </div>
        </div>
        <div className="flex items-start">
          <img src={community} alt="Community" />
        </div>

      </div>
    </section>
  );
};

export default Built;
