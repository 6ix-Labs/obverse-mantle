import React from 'react'
import { Button } from '../Button/Button'
import { Link } from 'react-router'
import { logo, logoText, teleGram, Twitter } from '../../assets/icons'
import { obverse } from '../../assets/images'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <section className='flex bg-[#f7c7b9] w-full padding-b padding-r padding-l padding-t justify-center items-center max-container'>
      <div className='w-full flex flex-col sm:gap-12 gap-20'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
          viewport={{ once: true }}
          className='w-full flex items-center justify-between'>
          <Link to="/">
            <div className="flex gap-2">
              <img src={logo} alt="logo" />
              <img src={logoText} alt="logoText" />
            </div>
          </Link>
          <div className='flex gap-5'>
            <img src={Twitter} alt="Twitter" />
            <img src={teleGram} alt="telegram" />
          </div>
        </motion.div>
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.6 }}
          viewport={{ once: true }}
          src={obverse} alt='Obverse' className='w-full object-contain object-center' />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.7 }}
          viewport={{ once: true }}
          className='w-full flex items-center justify-between mt-5'>
          <h4 className='sm:text-[16px] text-[14px] font-calsans text-[#561908]'>©2025 Obverse LTD.</h4>
          <h4 className='sm:text-[16px] text-[14px] font-calsans text-[#561908]'>All rights reserved</h4>
        </motion.div>
      </div>
    </section>
  )
}

export default Footer
