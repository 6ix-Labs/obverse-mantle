import React, { useState, useEffect } from "react";

// import { Ellipse, paymentDarkBg } from "../";
// import { Button } from "./ui/Button";
import { Button } from "../../components/Button/Button.tsx";

import { sendEmailToTelegram } from "../../helper/telegram.ts";
import { toast } from "sonner";

import MainNavbar from "./MainNavbar.tsx";
import CardDemo from "@/components/cards-demo-3.tsx";
import { BackgroundLines } from "@/components/ui/background-lines.tsx";

const Main = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Merchants", "Online Communities", "Individuals", "Traders"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    const success = await sendEmailToTelegram(email);

    if (success) {
      toast.success("Thanks! You've been added to the waitlist.");
      setEmail("");
    } else {
      toast.error("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };
  return (
    <BackgroundLines className="w-full min-h-screen flex flex-col items-center justify-start px-3 bg-[#070707]">
      <section className="flex relative flex-col justify-start items-center pt-5 min-h-screen sm:w-full sm:px-4">
        <MainNavbar />

        {/* <div className="w-full max-w-[700px] flex flex-col items-center gap-5 sm:gap-8 mt-10 sm:mt-40 md:mt-20 z-10 px-4 relative"> */}

        <div className="w-full max-w-[700px] flex flex-col items-center gap-5 sm:gap-8 mt-10 sm:mt-40 md:mt-20 z-10 relative">
          <div>
            <Button
              size="normal"
              variant="normal"
              className="font-onest text-[12px] sm:text-[14px] py-2 px-4 bg-[#2b1e1a] text-[#FF7849] border-[0.5px] border-[#FFBAA224] rounded-[80px]"
            >
              Coming Soon!
            </Button>
          </div>

          <div className="flex flex-col gap-3 items-center w-full sm:gap-4">
            <h1 className="font-onest sm:leading-tight leading-none font-bold text-[40px] sm:text-[35px] md:text-[38px] lg:text-[50px] max-w-full bg-gradient-to-r from-[#FFFFFF] to-[#FF7849] bg-clip-text text-transparent text-center px-4">
              Accept Stablecoins in chat <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>with built-in invoicing
            </h1>
            <p className="text-[#FFFFFF] font-onest text-[14px] sm:text-[16px] md:text-[18px] max-w-[342px] sm:max-w-[450px] text-center px-4">
              Payment links, QR codes, and invoicing, all automated right within your communities.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex relative gap-3 items-center mt-5 w-full max-w-md max-sm:flex-col sm:gap-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              className="flex-1 p-4 max-sm:w-full md:p-5 bg-transparent border-[0.5px] border-[#393939] text-white rounded-[40px] sm:text-[15px] md:text-[16px] focus:outline-none placeholder:font-onest placeholder:text-[14px] placeholder:text-white focus:border-[#FF7849] transition-colors  disabled:opacity-50"
            />
            <Button
              type="submit"
              size="normal"
              variant="normal"
              disabled={isSubmitting}
              className="sm:absolute max-sm:w-full sm:right-3 max-sm:block bg-[#FF7849] text-[#131313] rounded-[40px] border-[#FFBAA2] text-[13px] sm:text-[11px] md:text-[12px] font-mediumpx-3 sm:px-7 px-5 md:px-10 py-3.5 sm:py-3.5 md:py-3 disabled:opacity hover:bg-[#ff8c63] transition-colors whitespace-nowrap"
            >
              {isSubmitting ? "Sending..." : "Join Waitlist"}
            </Button>
          </form>

          <div className="border lg:min-w-[700px] w-full mx-auto mt-10 border-transparent bg-gradient-to-b from-[#232323] to-[#464646] rounded-[16px]">
            <div className="flex flex-col gap-5 items-center justify-center bg-transparent brightness-75 bg-gradient-to-b from-[#28120a] to-[#1f1814] rounded-[16px] p-6 w-full h-full">
              <div></div>
              <CardDemo />
              <div className="flex flex-col gap-1 items-center">
                <h2 className="text-[#FFF3ef] font-spacegrotesk font-semibold lg:text-[50px] md:text-[40px] text-[36px] whitespace-nowrap">
                  <span className="inline-block transition-all duration-500 ease-in-out">
                    {texts[currentTextIndex]}
                  </span>
                </h2>
                <p className="text-[#FFF3ef] font-onest lg:text-[20px] md:text-[16px] text-center text-[14px]">
                  Stablecoin payments, invoicing, and business insights in one AI Agent. Leave the clunky wallets and
                  confusing crypto UX behind.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[96%] mx-auto flex sm:flex-row flex-col sm:justify-between sm:items-center sm:gap-0 gap-1 mt-32 pb-5">
          <p className="text-[#FFF3EF] sm:text-[14px] text-[14px] font-onest">©2025 Obverse LTD. </p>
          <p className="text-[#FFF3EF] sm:text-[14px] text-[14px] font-onest">All rights reserved</p>
        </div>
      </section>
    </BackgroundLines>
  );
};

export default Main;
