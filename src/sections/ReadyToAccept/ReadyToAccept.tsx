import { Button } from "../../Components/Button/Button";
import { bitcoinImg, lImg, rImg, usdImg } from "../../assets/images";
import { motion, Variants } from "framer-motion";

const ReadyToAccept = () => {
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: custom,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const slowBounce: Variants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const subtleFloat: Variants = {
    animate: {
      y: [0, -8, 0],
      x: [0, 5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  return (
    <section className="flex justify-center items-center w-full bg-background-main padding-x padding-y max-container">
      <div className="w-full overflow-hidden relative flex items-center justify-center flex-col bg-background-sub max-w-screen-xl mx-auto lg:min-h-[65vh] md:min-h-[70vh] sm:min-h-[70vh] max-412:min-h-[95vh] min-h-[80vh] max-se:min-h-[100vh] max-s8:min-h-[93vh] rounded-2xl px-7 sm:py-20 py-10 sm:my-24 my-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="flex flex-col gap-4 items-center w-full sm:gap-7"
        >
          <motion.h1
            custom={0.3}
            variants={fadeIn}
            className="sm:text-[72px] text-[40px] text-white leading-[1] md:leading-[0.9] tracking-[-0.04em] md:tracking-[-0.04em] font-calsans text-center"
          >
            Ready to Accept <br className="hidden sm:flex" /> That <br className="flex sm:hidden" />
            Stablecoin Payments?
          </motion.h1>
          <motion.p custom={0.6} variants={fadeIn} className="text-white info-text">
            Obverse is a Telegram-based AI Agent that lets you send and receive stablecoin payments with a simple
            message. No friction. No fees. No crypto confusion.
          </motion.p>
          <a
            href="https://t.me/ObverseBot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10"
          >
            <motion.div custom={0.9} variants={fadeIn}>
              <Button variant="normal" size="normal">
                Get started
              </Button>
            </motion.div>
          </a>
        </motion.div>
        <motion.img
          className="absolute -bottom-24 max-sm:-bottom-36 -left-6 max-sm:left-14 w-[250px] max-lg:w-[250px] h-[250px] max-lg:h-[250px] max-sm:h-[250px] max-sm:w-[250px] max-se:h-[225px] flex"
          src={bitcoinImg}
          alt="BitCoin Img"
          variants={slowBounce}
          animate="animate"
        />
        <motion.img
          className="absolute -bottom-10 max-lg:w-[300px] -right-20 max-sm:hidden flex"
          src={rImg}
          alt="BitCoin Img"
          variants={subtleFloat}
          animate="animate"
        />
        <motion.img
          className="absolute -top-12 max-sm:-top-32 -right-10 max-sm:-right-8 w-[200px] max-lg:w-[250px] h-[200px] max-lg:h-[250px] max-sm:h-[250px] max-sm:w-[250px] max-se:h-[225px] flex"
          src={usdImg}
          alt="BitCoin Img"
          variants={slowBounce}
          animate="animate"
        />
        <motion.img
          className="absolute -top-20 max-sm:-top-28 -left-14 max-sm:-left-14 w-[250px] max-lg:w-[250px] h-[220px]  max-lg:h-[270px] max-sm:h-[200px] max-sm:w-[200px] max-se:h-[180px] flex"
          src={lImg}
          alt="BitCoin Img"
          variants={subtleFloat}
          animate="animate"
        />
      </div>
    </section>
  );
};

export default ReadyToAccept;
