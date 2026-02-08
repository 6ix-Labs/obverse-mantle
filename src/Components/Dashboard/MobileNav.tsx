import { LayoutDashboard, FileText, Link as LinkIcon, Settings } from "lucide-react";
import { NavLink } from "react-router";

const MobileNav = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center ${
      isActive ? "text-orange-500 dark:text-orange-500" : "text-gray-500 dark:text-gray-400"
    }`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white dark:border-gray-700 dark:bg-gray-800 md:hidden">
      <div className="flex h-16 items-center justify-around">
        <NavLink to="/dashboard" end className={getLinkClass}>
          <LayoutDashboard className="h-6 w-6" />
          <span className="text-xs font-medium">Overview</span>
        </NavLink>
        <NavLink to="/dashboard/invoices" className={getLinkClass}>
          <FileText className="h-6 w-6" />
          <span className="text-xs font-medium">Invoices</span>
        </NavLink>
        <NavLink to="/dashboard/payment-links" className={getLinkClass}>
          <LinkIcon className="h-6 w-6" />
          <span className="text-xs font-medium">Payment Links</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className={getLinkClass}>
          <Settings className="h-6 w-6" />
          <span className="text-xs font-medium">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNav;
