import { logoDark, logoTextDark } from "@/assets/icons";
import React from "react";

const Footer = () => {
  return (
    <section className=" bg-gradient-to-b from-[#160F0C] to-[#2d0e03]">
      <div className="flex flex-col gap-15 w-[90%] m-auto mt-15 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-spacegrotesk leading-none font-bold text-[30px] sm:text-[35px] md:text-[38px] lg:text-[50px] bg-gradient-to-r from-[#FFF3EF] to-[#99928F] bg-clip-text text-transparent">
            Get paid in crypto.
            <br className="sm:hidden flex" /> From chat.
          </h1>
          <p className="text-[#FFFFFF] font-onest text-[12px] max-w-[342px] sm:max-w-[350px]">
            Obverse is not another payment app. It’s a movement for
            crypto-native merchants, creators, and micro-entrepreneurs who live
            online and transact in real time.
          </p>
        </div>
        <div className="flex flex-col mt-20">
          <div>
            <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
              <img
                src={logoDark}
                alt="logo"
                className="h-6 sm:h-7 md:h-8 w-auto"
              />
              <img
                src={logoTextDark}
                alt="logoText"
                className="h-4 sm:h-5 md:h-6 w-auto"
              />
            </div>
            <div className="w-full flex sm:flex-row flex-col justify-between">
              <p className="text-[#FFF3EF] sm:text-[14px] text-[14px] font-onest mt-5">
                ©2025 Obverse LTD. RC: 7810789
              </p>
              <p className="text-[#FFF3EF] sm:text-[14px] text-[14px] font-onest">
                All rights reserved
              </p>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
