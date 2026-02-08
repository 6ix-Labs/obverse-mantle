import { Search, Bell, ChevronDown, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center">
        <button className="mr-4 md:hidden">
          <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Hello, Jendol Stores</h1>
      </div>
      <div className="flex items-center">
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-orange-500"
            placeholder="Search"
          />
        </div>
        <button className="ml-4 rounded-full bg-white p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
          <Bell className="h-6 w-6" />
        </button>
        <div className="ml-4 flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">JS</div>
          <span className="ml-2 hidden text-sm font-medium text-gray-700 dark:text-gray-200 md:inline">
            Jendol Stores
          </span>
          <ChevronDown className="ml-1 hidden h-5 w-5 text-gray-500 dark:text-gray-400 md:inline" />
        </div>
      </div>
    </header>
  );
};

export default Header;
