import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { logo, logoText } from "../../assets/icons";
import { Button } from "../Button/Button"
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleScrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    handleScrollToSection("hero");
  };

  const menuItems = [
    { label: "Home", action: handleHomeClick },
    { label: "Why Us", action: () => handleScrollToSection("why-us") },
    { label: "Features", action: () => handleScrollToSection("features") },
  ];

  return (
    <header className="pt-0 w-full sm:pt-0 bg-background-main">
      <nav className="flex justify-between items-center px-8 py-6 w-full sm:px-20">
        <Link to="/">
          <div className="flex gap-2">
            <img src={logo} alt="logo" />
            <img src={logoText} alt="logoText" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden flex-1 gap-10 justify-center items-center lg:flex">
          <li className="relative">
            <Link to="/" className="text-sm text-gray-600 transition-colors font-figtree hover:text-gray-800">
              Home
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => handleScrollToSection("why-us")}
              className="text-sm text-gray-600 transition-colors font-figtree hover:text-gray-800"
            >
              Why Us
            </button>
          </li>
          <li className="relative">
            <button
              onClick={() => handleScrollToSection("features")}
              className="text-sm text-gray-600 transition-colors font-figtree hover:text-gray-800"
            >
              Features
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <motion.button
          className="lg:hidden flex flex-col gap-1.5 p-2 z-50 relative"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="w-7 h-0.5 bg-gray-600 rounded-full"
            animate={menuOpen ? { rotate: 45, y: 8, opacity: 1 } : { rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-7 h-0.5 bg-gray-600 rounded-full"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-7 h-0.5 bg-gray-600 rounded-full"
            animate={menuOpen ? { rotate: -45, y: -8, opacity: 1 } : { rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Mobile Full-Screen Menu */}
        <AnimatePresence mode="wait">
          {menuOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 right-0 bottom-0 left-0 z-40 w-full min-h-screen flex flex-col bg-[#FFEDE8] lg:hidden"
            >
              {/* Header with Logo */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="w-full flex justify-start items-center h-[8vh] border-b border-gray-300 px-6"
              >
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="flex gap-2"
                  >
                    <img src={logo} alt="logo" />
                    <img src={logoText} alt="logoText" />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Navigation Items */}
              <ul className="flex flex-col flex-1 gap-2 justify-center px-6">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden relative group"
                  >
                    <button
                      onClick={item.action}
                      className="text-5xl sm:text-6xl md:text-7xl leading-tight font-semibold tracking-tight text-[#2e1109] block relative group-hover:text-[#742B17] transition-colors duration-300 ease-out uppercase font-calsans w-full text-left"
                    >
                      <motion.span
                        className="block"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {item.label}
                      </motion.span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="px-6 pb-8"
              >
                <Button
                  className="w-full text-white bg-background-sub"
                  size="normal"
                  href="https://t.me/ObverseBot"
                  onClick={() => setMenuOpen(false)}
                >
                  Get started
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button className="hidden lg:flex" variant="normal" size="normal" href="https://t.me/ObverseBot">
          Get started
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
