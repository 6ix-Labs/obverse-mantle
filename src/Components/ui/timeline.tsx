import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button/Button";
import { FiArrowUpRight } from "react-icons/fi";

interface TimelineEntry {
  title: string;
  buttontext: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-[#070707] md:px-10" ref={containerRef}>
      <div ref={ref} className="relative pb-20 mx-auto max-w-7xl">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 mb-5 md:pt-40 md:gap-10 sm:mb-0">
            <div className="flex sticky top-40 z-40 flex-col items-center self-start max-w-xs md:flex-row lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[rgba(32,30,31,0.31)] shadow-[inset_1px_11px_8px_-5px_rgba(255,199,225,0.08),inset_1px_-4px_8px_1px_rgba(255,199,225,0.14)] flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-[rgba(32,30,31,0.31)] shadow-[inset_1px_11px_8px_-5px_rgba(255,199,225,0.08),inset_1px_-4px_8px_1px_rgba(255,199,225,0.14)] p-2" />
              </div>

              <div className="hidden flex-col gap-5 items-start pl-10 md:flex md:pl-20">
                <h1 className="font-spacegrotesk leading-none font-bold text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] bg-gradient-to-r from-[#FFF3EF] to-[#99928F] bg-clip-text text-transparent whitespace-nowrap px-4">
                  {item.title}
                </h1>
                <div className="flex relative justify-center items-center">
                  <Button
                    size="normal"
                    variant="normal"
                    className="flex mt-2 bg-[#FF7849] text-[#131313] rounded-[40px] border-[#FFBAA2] text-[10px] sm:text-[11px] md:text-[12px] font-medium px-7 sm:px-5 md:px-6 py-2.5 sm:py-3 hover:bg-[#ff8c63] transition-colors whitespace-nowrap"
                  >
                    {item.buttontext} <FiArrowUpRight className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex relative flex-col gap-3 pr-4 pl-20 w-full md:pl-4">
              <h3 className="md:hidden block font-spacegrotesk leading-none font-bold text-[30px] sm:text-[25px] md:text-[30px] lg:text-[40px] bg-gradient-to-r from-[#FFF3EF] to-[#99928F] bg-clip-text text-transparent whitespace-nowrap">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#ff7849] via-[#2f0c00] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
