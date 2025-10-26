import React, { useState } from "react";

import { arrowDown } from "@/assets/icons";
import { PlusIcon } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import data from "./data";

const Faq = () => {
  const [selection, setSelection] = useState<string | null>(null);

  const handleAddSelection = (currentId: string) => {
    setSelection(selection === currentId ? null : currentId);
  };

  const dataElement = data.map((dataItem) => (
    <div
      key={dataItem.id}
      className="flex flex-col relative w-full cursor-pointer border border-[#46484D]"
      onClick={() => handleAddSelection(dataItem.id)}
    >
      <div className="flex w-full items-center gap-5 p-[24px]">
        <FaPlus
          className={`text-white cursor-pointer transform transition-transform duration-300 ${
            selection === dataItem.id ? "rotate-45" : "rotate-0"
          }`}
        />
        <h3
          className={`${
            selection === dataItem.id
              ? "text-[#fff3ef] sm:text-[24px] text-[16px] font-semibold font-onest flex items-center "
              : "text-[#fff3ef] sm:text-[24px] text-[16px] font-semibold font-onest flex items-center"
          }`}
        >
          {dataItem.question}
        </h3>
      </div>

      {/* Smooth Transition */}
      <div
        className={` overflow-hidden transition-all duration-500 ease-in-out ${
          selection === dataItem.id ? "max-h-[160px]" : "max-h-0"
        }`}
      >
        <p className="text-[#fff3ef] -mt-1 font-onest sm:text-[14px] text-[12px] p-[5px_25px_15px]">
          {dataItem.answer}
        </p>
      </div>
    </div>
  ));
  return (
    <section className="w-[90%] mx-auto">
      <div className="flex flex-col gap-10 items-center justify-center sm:mt-20 mt-5">
        <h3 className="font-spacegrotesk leading-none font-bold text-[25px] sm:text-[25px] md:text-[30px] lg:text-[40px] bg-gradient-to-r from-[#FFF3EF] to-[#99928F] bg-clip-text text-transparent whitespace-nowrap text-center">
          Frequently Asked Questions
        </h3>
        <div className="w-full">{dataElement}</div>
      </div>
    </section>
  );
};

export default Faq;
