import React from "react";
import { Timeline } from "@/Components/ui/timeline";
import { CreateLinkImg, handPhone, HomeImg, WT } from "@/assets/images";

export function TimelineDemo() {
  const data = [
    {
      title: "On Farcaster..",
      buttontext: "Launch App",
      content: (
        <div className="flex flex-col gap-5 overflow-x-hidden">
                      <div className="absolute w-[605px] h-[605px] rounded-full bg-gradient-to-b from-[#FF7849] to-[#745846] opacity-60 blur-[360px] top-[196px] left-[18px] pointer-events-none"></div>
          <p className="font-onest leading-tight font-bold text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] bg-gradient-to-r from-[#FFF3EF] to-[#99928F] bg-clip-text text-transparent">
           Recently, Obverse launched as mini app on Farcaster
          </p>
          <div className="grid grid-cols-2 relative">

            <img
              src={HomeImg}
              alt="Home template"
              width={500}
              height={500}
              className="w-full object-cover"
            />
            <img
              src={CreateLinkImg}
              alt="Create template"
              width={500}
              height={500}
              className="w-full object-cover mt-14"
            />
          </div>
        </div>
      ),
    },
    {
      title: "On Telegram..",
      buttontext: "Launch App",
      content: (
        <div className="flex flex-col gap-5">
          <p className="font-onest leading-tight font-bold text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] bg-gradient-to-r from-[#FFF3EF] to-[#99928F] bg-clip-text text-transparent">
         Obverse AI agent is live on Telegram!
          </p>

          <div className="grid grid-cols-1">
            <img
              src={handPhone}
              alt="Hand Phone"
              width={500}
              height={500}
              className="w-full object-cover "
            />
          </div>
        </div>
      ),
    },
    {
       title: "Discord, Whatsapp",
      buttontext: "Notify Me",
      content: (
        <div className="flex flex-col gap-5 sm:mt-24">
          <p className="font-onest leading-tight font-bold text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] bg-gradient-to-r from-[#FFF3EF] to-[#99928F] bg-clip-text text-transparent">
          Coming right to you, very soon...
          </p>
          <div className="grid grid-cols-1">
            <img
              src={WT}
              alt="Whatsapp Telegram"
              width={500}
              height={500}
              className="w-full object-cover"
            />
           
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
