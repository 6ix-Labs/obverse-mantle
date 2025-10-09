import React, { useState } from "react";
import MainNavbar from "./MainNavbar.tsx";
// import { Ellipse, paymentDarkBg } from "../";
// import { Button } from "./ui/Button";
import { Button } from "../../Components/Button/Button.tsx";
import { Ellipse } from "../../assets/images/index.ts";
import { sendEmailToTelegram } from "../../helper/telegram.ts";
import { toast } from "sonner";

const Main = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <section
      className="w-full min-h-screen flex flex-col items-center justify-start pt-5 px-4 relative bg-[#070707] "
    >
      {/* <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto pointer-events-none">
        <img src={Ellipse} alt="Ellipse" className="w-full object-contain opacity-50" />
      </div> */}

      <MainNavbar />

      <div className="w-full max-w-[700px] flex flex-col items-center justify-center mb-[60px] md:mb-0 gap-5 sm:gap-8 flex-1 z-10 px-4 relative">
        <div>
          <Button
            size="normal"
            variant="normal"
            className="font-onest text-[12px] sm:text-[14px] bg-[#2b1e1a] border-[0.5px] border-[#F8cfcb] text-primary px-4 sm:px-6"
          >
            Coming Soon!
          </Button>
        </div>

        <div className="flex gap-3 sm:gap-4 flex-col items-center w-full">
          <h1 className="font-onest leading-tight font-bold text-[24px] sm:text-[35px] md:text-[38px] lg:text-[50px] max-w-full bg-gradient-to-r from-[#FFFFFF] to-[#FF7849] bg-clip-text text-transparent text-center px-4">
            Accept Stablecoins in chat <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>with built-in invoicing
          </h1>
          <p className="text-[#FFFFFF] font-onest text-[14px] sm:text-[16px] md:text-[18px] max-w-[342px] sm:max-w-[450px] text-center px-4">
            Payment links, QR codes, and invoicing, all automated right within
            your communities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center relative w-full mt-5 max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={isSubmitting}
            className="flex-1 p-3 sm:p-4 md:p-5 pr-[110px] sm:pr-[140px] md:pr-[160px] bg-transparent border-[0.5px] border-[#393939] text-white text-[13px] sm:text-[15px] md:text-[16px] rounded-[30px] sm:rounded-[35px] md:rounded-[40px] focus:outline-none focus:border-[#FF7849] transition-colors placeholder:font-onest placeholder:text-[11px] sm:placeholder:text-[13px] md:placeholder:text-[14px] placeholder:text-gray-400 disabled:opacity-50"
          />
          <Button
            type="submit"
            size="normal"
            variant="normal"
            disabled={isSubmitting}
            className="absolute text-[#131313] rounded-[15px] sm:rounded-[18px] md:rounded-[20px] bg-[#FF7849] right-2 sm:right-3 font-medium font-figtree text-[11px] sm:text-[13px] md:text-[14px] px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 disabled:opacity-50 hover:bg-[#ff8c63] transition-colors whitespace-nowrap"
          >
            {isSubmitting ? "Sending..." : "Get Notified"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Main;