import { WhatMakes1, WhatMakes2 } from '../../constants'
import { motion } from "framer-motion"

const WhatMakes = () => {
    return (
        <section className='flex overflow-x-hidden flex-col gap-5 justify-center items-center w-full padding-t padding-x padding-y padding-b max-container bg-background-main'>
            <div className='flex items-center'>
                <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
                    viewport={{ once: false }}
                    className='sm:text-[55px] text-[36px] leading-text tracking-text font-calsans text-[#2e1109] text-center'>What Makes Obverse <br /> Different?</motion.h1>
            </div>
            <div className="grid gap-6 w-full lg:px-10">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {
                        WhatMakes1.map((item) => (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: false }}
                                key={item.label} className="bg-background-card rounded-[40px] flex flex-col lg:gap-5 p-4 lg:p-8">
                                <img src={item.icon} alt={item.label} className='flex h-[280px] w-[280px] lg:h-[320px] lg:w-[320px] items-center justify-center self-center object-contain object-center' />
                                <div className='flex flex-col gap-2 items-start px-2 pb-2'>
                                    <h3 className='flex text-2xl font-semibold font-figtree text-brown'>{item.label}</h3>
                                    <p className='text-[#000000] sm:text-[16px] text-[14px] font-figtree leading-relaxed'>{item.text}</p>
                                </div>
                            </motion.div>

                        ))
                    }</div>


                {/* <!-- Bottom row with 3 equal items --> */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 md:grid-cols-2">
                    {
                        WhatMakes2.map((item) => (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: false }}
                                key={item.label} className="bg-background-card rounded-[40px] flex flex-col lg:gap-5 p-6 lg:p-8">
                                <img src={item.icon} alt={item.label} className='flex h-[280px] w-[280px] lg:h-[320px] lg:w-[320px] items-center justify-center self-center object-contain object-center' />
                                <div className='flex flex-col gap-2 items-start'>
                                    <h3 className='flex text-2xl font-semibold font-figtree text-brown'>{item.label}</h3>
                                    <p className='text-[#000000] sm:text-[16px] text-[14px] font-figtree leading-relaxed'>{item.text}</p>
                                </div>
                            </motion.div>

                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default WhatMakes