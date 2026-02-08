import React, { useState, useEffect } from "react";
import { paymentDarkBg, paymentLightBg } from "../../assets/images";
import { Button } from "../../components/Button/Button";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { logo } from "../../assets/icons";
import { useNavigate } from "react-router";

const Login = () => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
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
    // For now, we'll just navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <div
      className="flex h-screen w-full flex-col items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${theme === "light" ? paymentLightBg : paymentDarkBg})`,
      }}
    >
      <div className="absolute right-4 top-4">
        <button onClick={toggleTheme} className="rounded-full p-2 text-gray-500 dark:text-gray-400">
          {theme === "light" ? <IoMoonOutline size={24} /> : <GoSun size={24} />}
        </button>
      </div>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Login</h1>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="identifier">
              Identifier
            </label>
            <input
              type="text"
              id="identifier"
              className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Enter your identifier"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
