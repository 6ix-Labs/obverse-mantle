import { Link } from 'react-router'
import { logo, logoText, teleGram, Twitter } from '../../assets/icons'
import { obverse } from '../../assets/images'
import { motion } from 'framer-motion'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <section className='flex bg-[#f7c7b9] w-full padding-b padding-r padding-l padding-t justify-center items-center max-container'>
       <div className='flex flex-col gap-20 w-full sm:gap-12'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
          viewport={{ once: true }}
          className='flex justify-between items-center w-full'
        >
          <Link to="/">
            <div className="flex gap-2">
              <img src={logo} alt="logo" />
              <img src={logoText} alt="logoText" />
            </div>
          </Link>

          <div className='flex gap-5 items-center'>
            <a
              href="https://x.com/observe_cc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Twitter} alt="Twitter" />
            </a>

            <a
              href="https://t.me/ObverseBot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={teleGram} alt="telegram" />
            </a>
          </div>
        </motion.div>

        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.6 }}
          viewport={{ once: true }}
          src={obverse}
          alt='Obverse'
          className='object-contain object-center w-full'
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.7 }}
          viewport={{ once: true }}
          className='flex justify-between items-center mt-5 w-full'
        >
          <h4 className='sm:text-[16px] text-[14px] font-calsans text-[#561908]'>
            ©{year} Obverse LTD. RC: 7810789
          </h4>
          <h4 className='sm:text-[16px] text-[14px] font-calsans text-[#561908]'>
            All rights reserved
          </h4>
        </motion.div>
      </div>
    </section>
  )
}

export default Footer
