import { useState, useEffect } from "react";
import data from "./data";
import { BuiltForImg1, BuiltForImg2, BuiltForImg3, BuiltForImg4 } from "../../assets/images";
import { arrowDown } from "../../assets/icons";
import { motion } from "framer-motion";

const BuiltFor = () => {
    const images = [BuiltForImg1, BuiltForImg2, BuiltForImg3, BuiltForImg4];
    
    const textLeft = (delay = 0.6) => ({
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, delay },
        },
    });

    const textRight = (delay = 0.6) => ({
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, delay },
        },
    });
    
    const [selection, setSelection] = useState<string>("1"); // First accordion open by default
    const [isAutoTransitioning, setIsAutoTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const handleAddSelection = (currentId: string) => {
        if (!isAutoTransitioning) {
            setSelection(currentId);
            setIsPaused(true);
            // Resume auto-transition after 5 seconds of manual selection
            setTimeout(() => {
                setIsPaused(false);
            }, 5000);
        }
    };

    // Auto-transition between accordions
    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setIsAutoTransitioning(true);
            const currentIndex = data.findIndex(item => item.id === selection);
            const nextIndex = (currentIndex + 1) % data.length;
            setSelection(data[nextIndex].id);
            
            setTimeout(() => {
                setIsAutoTransitioning(false);
            }, 800);
        }, 4000); // 4 seconds delay - slower transition

        return () => clearInterval(interval);
    }, [selection, isPaused]);

    const dataElement = data.map((dataItem) => (
        <motion.div
            key={dataItem.id}
            className="flex relative flex-col w-full cursor-pointer"
            onClick={() => handleAddSelection(dataItem.id)}
            initial={false}
            animate={{
                scale: selection === dataItem.id ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
        >
            <h3
                className={`${selection === dataItem.id
                    ? "bg-background-card text-brown text-sm font-semibold font-figtree flex items-center p-[24px] rounded-t-[24px]"
                    : "bg-brown text-[#F3aa96] text-sm font-semibold font-figtree flex items-center p-[24px] mb-0 rounded-[24px]"
                    }`}
            >
                {dataItem.question}
            </h3>

            <img
                src={arrowDown}
                alt="Toggle Arrow"
                className={`absolute right-[25px] top-[28px] cursor-pointer transform transition-transform duration-300 ${selection === dataItem.id ? "rotate-180" : "rotate-0"
                    }`}
            />

            {/* Smooth Transition */}
            <motion.div
                initial={false}
                animate={{
                    height: selection === dataItem.id ? "auto" : 0,
                    opacity: selection === dataItem.id ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-background-card rounded-b-[24px] overflow-hidden"
            >
                <div className="p-[5px_25px_15px]">
                    <p className="text-[#000000] -mt-1 font-figtree text-[14px]">
                        {dataItem.answer}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    ));

    const currentImageIndex = data.findIndex(item => item.id === selection);

    return (
        <section className="flex overflow-x-hidden flex-col gap-5 justify-center items-center w-full padding-t padding-x padding-y padding-b max-container bg-background-main">
            <div className="flex max-lg:flex-col justify-center items-start gap-4 max-lg:gap-4 lg:gap-10 px-6 py-10 bg-background-sub rounded-[40px] w-full max-w-screen-xl mx-auto lg:px-10">

                <div className="flex flex-col flex-1 gap-7 w-full lg:w-1/2 max-lg:justify-center max-lg:gap-4">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-background-card font-calsans sm:text-[50px] text-[36px] max-lg:text-center leading-text tracking-text max-s8:text-left max-s8:whitespace-nowrap">
                        Built for Real-World <br /> Use Cases
                    </motion.h1>

                    {/* Desktop Accordion View */}
                    <div className="hidden flex-col flex-1 gap-5 items-start w-full s20:flex">
                        {dataElement}
                    </div>

                    {/* Mobile Chat-like View */}
                    <div className="flex flex-col gap-3 s20:hidden">
                        {data.map((dataItem, index) => {
                            const isActive = selection === dataItem.id;
                            // Active items should be on the right, inactive on the left
                            const shouldBeOnRight = isActive;
                            
                            return (
                                <motion.div
                                    key={dataItem.id}
                                    variants={shouldBeOnRight ? textRight(0.4 + index * 0.1) : textLeft(0.4 + index * 0.1)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    onClick={() => handleAddSelection(dataItem.id)}
                                    className={`${
                                        isActive 
                                            ? "bg-[#FADDD5] text-[#9A391F] rounded-[24px_6px_24px_24px] translate-x-24 max-s8:translate-x-20 ml-auto" 
                                            : "bg-[#9A391F] text-[#F3aa96] rounded-[6px_24px_24px_24px]"
                                    } p-5 w-fit font-figtree cursor-pointer transition-all duration-300`}
                                >
                                    {dataItem.question}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex relative items-start pt-7 w-full lg:w-1/2 max-lg:justify-center lg:pt-0">
                    {/* Always show an image - crossfade effect */}
                    <div className="relative w-full h-[550px] max-lg:h-[300px] rounded-[24px] overflow-hidden">
                        {images.map((img, index) => {
                            const isCurrent = index === currentImageIndex;
                            return (
                                <motion.img
                                    key={index}
                                    src={img}
                                    alt="Use case illustration"
                                    initial={false}
                                    animate={{
                                        opacity: isCurrent ? 1 : 0,
                                        scale: isCurrent ? 1 : 0.95,
                                    }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover object-center rounded-[24px]"
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuiltFor;