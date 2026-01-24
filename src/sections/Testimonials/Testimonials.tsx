import React from "react";
import { testimonials } from "../../constants";
import { motion } from "framer-motion";

const Testimonials = () => {
  const cards = [...testimonials, ...testimonials];

  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-[#c04826] padding-x py-14">
      <h2 className="text-background-card sm:text-[65px] text-[40px] leading-text tracking-text font-calsans mb-10">
        Testimonials
      </h2>

      <div className="relative w-full max-w-7xl overflow-hidden h-[600px]">
        {/* Top fade */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#c04826] to-transparent z-10" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#c04826] to-transparent z-10" />

        <motion.div
          className="grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3"
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-[#9A391f] font-figtree backdrop-blur-sm rounded-xl p-6 text-white shadow-lg"
            >
              <p className="font-figtree text-[14px] mb-6">
                {item.text}
              </p>

              <div className="flex gap-3 items-center">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-[16px] font-figtree">
                    {item.name}
                  </span>
                  <span className="text-[14px] text-[#742B17]">
                    Community Member
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
