import { motion } from "framer-motion";

const Herotext = () => {
  return (
    <div
      className='overflow-x-hidden w-full padding-t padding-b bg-background-main'
    >
      <motion.h1 animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className='font-calsans text-coral-red leading-text md:leading-text-sm tracking-text lg:text-[120px] sm:text-[90px] text-[60px] whitespace-nowrap'>Get stablecoin payments with Links and QRcodes. Get stablecoin payments with Links and QRcodes. Get stablecoin payments with Links and QRcodes.
      </motion.h1>
    </div>
  )
}
  
export default Herotext
