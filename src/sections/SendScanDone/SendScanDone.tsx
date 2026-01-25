import { SSD } from '../../constants'
import SSDCard from '../../Components/SSDcard/SSDCard'
import { motion } from 'framer-motion'

const SendScanDone = () => {
  // Duplicate cards for seamless infinite scroll on desktop
  const duplicatedCards = [...SSD, ...SSD, ...SSD, ...SSD]

  return (
    <section className='flex overflow-hidden flex-col gap-5 justify-center items-center w-full border-t padding-t max-sm:padding-x padding-b max-container bg-background-main border-slate-300'>
      <div className='flex flex-col gap-2 items-center mt-7 sm:mt-5'>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
          viewport={{ once: false }}
          className='sm:text-[72px] text-[36px] tracking-text font-calsans text-[#2e1109]'>Send. Scan. Done.</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
          viewport={{ once: false }}
          className='info-text text-[#742B17]'>Obverse turns your Telegram into a powerful payment tool. No apps. No wallets to build. Just one command.</motion.p>
      </div>
      
      {/* Mobile: Grid layout */}
      <div className="grid overflow-visible grid-cols-1 gap-6 mt-7 w-full s20:hidden">
        {SSD.map((item) => (
          <SSDCard
            key={item.label}
            {...item}
          />
        ))}
      </div>

      {/* Desktop: Infinite horizontal scroll */}
      <div className="hidden overflow-hidden mt-7 w-full s20:block">
        <motion.div
          className="flex gap-8 xl:gap-6"
          animate={{
            x: [0, `-${(100 / 4)}%`]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: 'max-content' }}
        >
          {duplicatedCards.map((item, idx) => (
            <SSDCard
              key={`${item.id}-${idx}`}
              {...item}
              className={`${idx === 0 ? "-ml-5" : ""} ${idx === duplicatedCards.length - 1 ? "-mr-5" : ""}`}
            />
          ))}
        </motion.div>
      </div>

    </section>
  )
}

export default SendScanDone
