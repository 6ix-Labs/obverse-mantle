import { logo } from "../../assets/icons";
import { LayoutDashboard, FileText, ArrowLeftRight, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden w-64 flex-col md:flex">
      <div className="flex h-16 items-center justify-center">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <span className="ml-2 text-lg font-bold text-gray-800 dark:text-white">Obverse</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          <a
            href="#"
            className="flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-200"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Overview
          </a>
          <a
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-200 dark:hover:bg-gray-900"
          >
            <FileText className="mr-3 h-5 w-5" />
            Invoices
          </a>
          <a
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-200 dark:hover:bg-gray-900"
          >
            <ArrowLeftRight className="mr-3 h-5 w-5" />
            Transactions
          </a>
        </nav>
        <div className="mt-4 px-2 py-4">
          <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">System</h3>
          <nav className="mt-2 space-y-1">
            <a
              href="#"
              className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-200 dark:hover:bg-gray-900"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </a>
          </nav>
        </div>
        <div className="p-4">
          <button className="flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
