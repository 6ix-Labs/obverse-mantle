import { Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Merchant } from "../../api/types";
import Cookies from "js-cookie";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMerchant = Cookies.get("merchant");
    if (storedMerchant) {
      try {
        setMerchant(JSON.parse(storedMerchant));
      } catch (e) {
        console.error("Failed to parse merchant data", e);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("merchant");
    Cookies.remove("paymentLinkId");
    navigate("/login");
  };

  const initials = merchant ? `${merchant.firstName[0]}${merchant.lastName[0]}`.toUpperCase() : "JS";
  const displayName = merchant ? `${merchant.firstName} ${merchant.lastName}` : "Jendol Stores";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b-[0.5px] border-gray-200 px-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Hello, {displayName}</h1>
      </div>
      <div className="flex items-center">
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full rounded-3xl border bg-white py-2 pl-10 pr-4 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-orange-500"
            placeholder="Search"
          />
        </div>
        <div className="relative ml-4" ref={dropdownRef}>
          <div
            className="flex cursor-pointer items-center rounded-3xl p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-orange-600 to-orange-400 text-white">
              {initials}
            </div>

            <ChevronDown className="ml-1 hidden h-5 w-5 text-gray-500 dark:text-gray-400 md:inline" />
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
              <button
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
