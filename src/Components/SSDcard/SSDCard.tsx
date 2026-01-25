import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type SSdProps = {
    label: string;
    icon: string;
    text: string;
    deg: number;
    className?: string;
    id: number
};

const SSDCard = ({ label, text, icon, className }: SSdProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 420px)");
        const checkScreen = () => setIsMobile(mediaQuery.matches);

        checkScreen();
        mediaQuery.addEventListener("change", checkScreen);
        return () => mediaQuery.removeEventListener("change", checkScreen);
    }, []);

    const baseClasses = `flex flex-col gap-6 bg-background-card sm:p-5 px-7 py-12 rounded-[24px] shadow-md flex-shrink-0 ${className ?? ""}`;
    const rotation = {};

    if (isMobile) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: false }}
                className={baseClasses} 
                style={rotation}
            >
                <img src={icon} alt={label} className="object-center object-contain w-[56px] h-[56px] rounded-[9.5px]" />
                <h3 className="text-[24px] font-figtree font-semibold leading-text tracking-text text-pale-brown">{label}</h3>
                <p className="sm:text-[16px] text-[13px] md:max-w-lg font-figtree text-slate-gray">{text}</p>
            </motion.div>
        );
    }

    // Desktop: Straight cards with fixed width (no rotation)
    return (
        <div
            className={`${baseClasses} w-[320px] max-w-[320px]`}
        >
            <img src={icon} alt={label} className="object-center object-contain w-[56px] h-[56px] rounded-[9.5px]" />
            <h3 className="text-[24px] font-figtree font-semibold leading-text tracking-text text-pale-brown">{label}</h3>
            <p className="sm:text-[16px] text-[13px] font-figtree text-slate-gray">{text}</p>
        </div>
    );
};

export default SSDCard;
