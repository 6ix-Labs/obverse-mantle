import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 h-16 dark:bg-gray-800">
      <div className="flex items-center">
        <button className="mr-4 md:hidden">
          <Menu className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Hello, Jendol Stores</h1>
      </div>
      <div className="flex items-center">
        <div className="hidden relative md:block">
          <span className="flex absolute inset-y-0 left-0 items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="py-2 pr-4 pl-10 w-full text-gray-700 bg-white rounded-lg border focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-orange-500"
            placeholder="Search"
          />
        </div>
        <button className="p-2 ml-4 text-gray-500 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          <Bell className="w-6 h-6" />
        </button>
        <div className="relative ml-4">
          <div className="flex items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="flex justify-center items-center w-10 h-10 text-white bg-orange-500 rounded-full">JS</div>
            <span className="hidden ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:inline">
              Jendol Stores
            </span>
            <ChevronDown className="hidden ml-1 w-5 h-5 text-gray-500 dark:text-gray-400 md:inline" />
          </div>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none dark:bg-gray-800">
              <button
                className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => console.log("Logout clicked")}
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
