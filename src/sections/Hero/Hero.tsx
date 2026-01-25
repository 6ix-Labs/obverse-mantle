import { motion, Variants } from "framer-motion";
import { Button } from "../../Components/Button/Button";
import { bitcoinImg, handePhoneSm, handPhone, lImg, rImg, usdImg } from "../../assets/images";


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


const handMotion: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: custom,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
};

const slowBounce: Variants = {
    animate: {
        y: [0, -15, 0],
        transition: {
            duration: 5,
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
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

const Hero = () => {
    return (
        <section className="flex justify-center items-center w-full bg-background-main padding-x padding-y max-container">
            <div className="w-full relative flex flex-col bg-background-sub max-w-screen-xl mx-auto lg:min-h-screen md:min-h-[70vh] sm:min-h-[70vh] max-412:min-h-[97vh] max-414:min-h-[80vh] 430:min-h-[80vh]  min-h-[95vh] max-se:min-h-[100vh] max-s8:min-h-[93vh] max-pro:min-h-[85vh] rounded-2xl px-7 sm:pt-14 pt-10 overflow-hidden">

                {/* TextContent */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="flex flex-col gap-2 items-center w-full sm:gap-7 max-xl:mt-14 max-lg:mt-0"
                >
                    <motion.h1
                        custom={0.2}
                        variants={fadeIn}
                        className="sm:text-5xl text-3xl text-white leading-[1] md:leading-[0.9] tracking-[-0.04em] md:tracking-[-0.04em] font-calsans text-center"
                    >
                        Stablecoin Payments<br className="hidden sm:flex" /> That{" "}
                        <br className="flex sm:hidden" /> feel Like Chat
                    </motion.h1>

                    <motion.p
                        custom={0.4}
                        variants={fadeIn}
                        className="text-white info-text"
                    >
                        Obverse is a Telegram-based AI Agent that lets you send and receive stablecoin
                        payments with a simple message. No friction. No fees. No crypto confusion.
                    </motion.p>

                    <a href="https://t.me/ObverseBot" target="_blank" rel="noopener noreferrer" className="mt-5 sm:mt-10 xl:mb-10">
                        <motion.div custom={0.6} variants={fadeIn}>
                            <Button variant="normal" size="normal">
                                Get started
                            </Button>
                        </motion.div>
                    </a>
                </motion.div>


                <div className="hidden flex-1 items-center px-10 mx-auto mb-32 w-full md:flex iPadAir:justify-between max-iPadAir:gap-52 max-xl:px-0 max-iPadAir:mt-16">
                    <div className="flex flex-col space-y-24">
                        <motion.img 
                            src={lImg} 
                            alt="left-coin" 
                            className="w-[269px] h-[182px]"
                            variants={subtleFloat}
                            animate="animate"
                        />
                        <motion.img
                            src={bitcoinImg}
                            alt="Bitcoin"
                            className="w-[320px] max-xl:w-[295px] max-iPadAir:w-[250px] max-iPadAir:h-[250px] h-[320px]"
                            variants={slowBounce}
                            animate="animate"
                        />
                    </div>
                    <div className="flex flex-col space-y-24">
                        <motion.img
                            src={usdImg}
                            alt="Usdcoin"
                            className="w-[270px] h-[270px] max-iPadAir:w-[200px] max-iPadAir:h-[200px]"
                            variants={slowBounce}
                            animate="animate"
                        />
                        <motion.img
                            src={rImg}
                            alt="right-coin"
                            className="w-[210px] max-xl:[200px] h-[142px]"
                            variants={subtleFloat}
                            animate="animate"
                        />
                    </div>
                </div>


                <motion.img
                    variants={handMotion}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    custom={1.2}
                    src={handPhone}
                    alt="Holding Phone"
                    className="absolute sm:flex hidden bottom-[0%] xl:left-[450px] 1024:left-[320px] 980:left-[300px] left-[230px]  w-[590px] max-iPadAir:w-[480px] max-xl:w-[550px] max-sm:w-[500px] h-auto"
                />

                <motion.img
                    variants={handMotion}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    custom={1.5}
                    src={handePhoneSm}
                    alt="Holding Phone Mobile"
                    className="absolute -bottom-12 max-se:-bottom-20 -right-5 max-sm:-right-2 max-se:-right-4 w-[305px] max-pro:w-[280px] max-sm:w-[300px] h-auto sm:hidden"
                />
            </div>
        </section>
    );
};

export default Hero;
