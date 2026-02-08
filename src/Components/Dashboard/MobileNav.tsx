import { LayoutDashboard, FileText, ArrowLeftRight, Settings } from "lucide-react";

const MobileNav = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 border-t bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden">
      <div className="flex h-16 items-center justify-around">
        <a href="#" className="flex flex-col items-center justify-center text-orange-500 dark:text-orange-500">
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xs font-medium">Overview</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <FileText className="h-6 w-6" />
          <span className="text-xs font-medium">Invoices</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <ArrowLeftRight className="h-6 w-6" />
          <span className="text-xs font-medium">Transactions</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <Settings className="h-6 w-6" />
          <span className="text-xs font-medium">Settings</span>
        </a>
      </div>
    </div>
  );
};

export default MobileNav;
