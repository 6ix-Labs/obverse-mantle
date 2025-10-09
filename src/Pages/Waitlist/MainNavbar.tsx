import { useState } from "react";
// import { Link } from "react-router-dom";
// import { logo, logoDark, logoText, logoTextDark } from "@/assets/icons";
// import { Button } from "./ui/Button";
import { Link } from "react-router";
import { Button } from "../../Components/Button/Button";
import { logoDark, logoTextDark } from "../../assets/icons";
import { toast } from "sonner";
const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);


  const popUp = () => {
    toast("Kindly fill the form below to join the waitlist!", {
      position: "top-left",
    });
  }

  return (
    <header className="w-full bg-transparent">
      <nav className="sm:px-10 lg:mx-20 sm:mx-15 mx-5 px-5 flex justify-between py-3  items-center rounded-[64px] bg-[#22201D] border border-[#2d2b29]">

        <Link to="/" onClick={closeMenu}>
          <div className="flex sm:gap-4 gap-2">
            <img src={logoDark} alt="logo" />
            <img src={logoTextDark} alt="logoText" />
          </div>
        </Link>
        <Button className="flex bg-[#FF7849] text-[#131313] rounded-[50px] border-[#FFBAA2] text-[12px] font-medium max-sm:px-5" variant="normal" size="normal" onClick={() => popUp()}>
          Join Waitlist
        </Button>
      </nav>
    </header>
  );
};

export default MainNavbar;