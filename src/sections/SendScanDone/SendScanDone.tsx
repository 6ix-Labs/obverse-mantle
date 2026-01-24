import React from 'react'
import { SSD } from '../../constants'
import SSDCard from '../../Components/SSDcard/SSDCard'
import { motion } from 'framer-motion'

const SendScanDone = () => {
  return (
    <section className='flex flex-col justify-center items-center gap-5 padding-t max-sm:padding-x padding-b w-full max-container bg-background-main border-t border-slate-300 overflow-hidden'>
      <div className='flex flex-col gap-2 sm:mt-5 mt-7 items-center'>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
          viewport={{ once: true }}
          className='sm:text-[72px] text-[36px] tracking-text font-calsans text-[#2e1109]'>Send. Scan. Done.</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
          viewport={{ once: true }}
          className='info-text text-[#742B17]'>Obverse turns your Telegram into a powerful payment tool. No apps. No wallets to build. Just one command.</motion.p>
      </div>
      <div className="grid s20:grid-cols-4 grid-cols-1 w-full xl:gap-5 s20:gap-72 gap-6 mt-7 overflow-visible">
        {SSD.map((item, index) => (
          <SSDCard
            key={item.label}
            {...item}
            className={`${index === SSD.length - 1 ? "s20:-mr-5" : ""} ${index === 0 ? "s20:-ml-5" : ""
              }`}
          />
        ))}
      </div>

    </section>
  )
}

export default SendScanDone
