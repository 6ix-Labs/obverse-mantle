import React, { useState, useEffect } from "react";
import { paymentDarkBg, paymentLightBg } from "../../assets/images";
import { Navbar, NavBody, MobileNav, MobileNavHeader, NavbarLogo } from "../../Components/Navbar/ResizableNavbar";
import { Button } from "../../Components/Button/Button";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { logo } from "../../assets/icons";
import { useNavigate } from "react-router";

const Login = () => {
  const [theme, setTheme] = useState("light");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const SunIcon = GoSun as unknown as React.FC;
  const MoonIcon = IoMoonOutline as unknown as React.FC;

  return (
    <div
      className="flex min-h-screen flex-col items-center bg-cover bg-top bg-no-repeat px-4 text-gray-800"
      style={{
        backgroundImage: `url(${theme === "light" ? paymentLightBg : paymentDarkBg})`,
      }}
    >
      <Navbar className="top-4" scrollThreshold={50}>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-2 sm:gap-4">
            <Button size="icon" variant="ghost" onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-700">
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-700">
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </div>
          </MobileNavHeader>
        </MobileNav>
      </Navbar>
      <div className="mt-40 w-full max-w-[450px] rounded-xl border border-[#E1E4EA] bg-white p-6 shadow-xl dark:border-[#2B303B] dark:bg-[#0e121b]">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="max-s20:w-7" />
            <div>
              <h2 className="font-figtree text-[24px] font-semibold tracking-text text-[#0e121b] dark:text-white">
                Login
              </h2>
              <p className="text-[16px] tracking-text text-[#525866] dark:text-[#99A0AE]">
                Login with one-time details from Agent
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block font-figtree text-[16px] text-[#0E121B] dark:text-white" htmlFor="identifier">
              Identifier
            </label>
            <input
              type="text"
              id="identifier"
              className="w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-[#99A0AE] placeholder:font-figtree focus:shadow-md focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your identifier"
            />
          </div>
          <div className="relative">
            <label className="mb-1 block font-figtree text-[16px] text-[#0E121B] dark:text-white" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-[#99A0AE] placeholder:font-figtree focus:shadow-md focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 pt-7"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-[10px] bg-[#E7562E] py-3 font-semibold text-white transition-colors hover:bg-[#E0793E] disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
