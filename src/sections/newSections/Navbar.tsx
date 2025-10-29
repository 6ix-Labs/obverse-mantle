import { useState } from "react";
// import { Link } from "react-router-dom";
// import { logo, logoDark, logoText, logoTextDark } from "@/assets/icons";
// import { Button } from "./ui/Button";
import { Link } from "react-router";

import { logoDark, logoTextDark } from "../../assets/icons";
import { Button } from "@/Components/Button/Button";
// import { toast } from "sonner";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // const popUp = () => {
  //   toast("Kindly fill the form below to join the waitlist!", {
  //     position: "top-left",
  //   });
  // }

  return (
    <header className="w-full cursor-pointer bg-transparent sm:px-5 pt-5">

      <nav className="px-2 sm:px-5 w-[85%] md:w-[60%] mx-auto flex justify-between py-2.5 sm:py-3 md:py-3.5 items-center rounded-[64px] bg-[#22201D] border border-[#2d2b29]">

        <Link to="/" onClick={closeMenu}>
          <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
            <img src={logoDark} alt="logo" className="h-6 sm:h-7 md:h-8 w-auto" />
            <img src={logoTextDark} alt="logoText" className="h-4 sm:h-5 md:h-6 w-auto" />
          </div>
        </Link>
        <a href="https://t.me/ObverseBot" target="_blank" rel="noopener noreferrer">
          <Button
            className="flex bg-[#FF7849] text-[#131313] rounded-[40px] border-[#FFBAA2] text-[10px] sm:text-[11px] md:text-[12px] font-medium px-7 sm:px-5 md:px-6 py-2.5 sm:py-3 hover:bg-[#ff8c63] transition-colors whitespace-nowrap"
            variant="normal"
            size="normal"
          >
            Launch App
          </Button>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;