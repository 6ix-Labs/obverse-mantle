"use client";
import { D, N, SB, SG, T } from "@/assets/icons";
import { animate } from "motion";
import { useEffect } from "react";
// import { GoCopilot } from "react-icons/go";

export default function LogoAnimation() {
  useEffect(() => {
    const sequence = [
      [".circle-1", { scale: [1, 1.1, 1], y: [0, -4, 0] }, { duration: 0.8 }],
      [".circle-2", { scale: [1, 1.1, 1], y: [0, -4, 0] }, { duration: 0.8 }],
      [".circle-3", { scale: [1, 1.1, 1], y: [0, -4, 0] }, { duration: 0.8 }],
      [".circle-4", { scale: [1, 1.1, 1], y: [0, -4, 0] }, { duration: 0.8 }],
      [".circle-5", { scale: [1, 1.1, 1], y: [0, -4, 0] }, { duration: 0.8 }],
    ];
    animate(sequence, { repeat: Infinity, repeatDelay: 0.5 } as any);
  }, []);

  return (
    <div className="flex gap-4 justify-center items-center pt-7 pb-3">
      <div className="circle-1">
        <img src={N} alt="N" className="sm:w-[48px] w-[37px]" />
      </div>
      <div className="circle-2">
        <img src={SB} alt="SB" className="sm:w-[64px] w-[50px]" />
      </div>
      <div className="circle-3">
        <img src={T} alt="T" className="sm:w-[80px] w-[62px]" />
      </div>
      <div className="circle-4">
        <img src={D} alt="F" className="sm:w-[64px] w-[50px]" />
      </div>
      <div className="circle-5">
        <img src={SG} alt="SG" className="sm:w-[48px] w-[37px]" />
      </div>
    </div>
  );
}
