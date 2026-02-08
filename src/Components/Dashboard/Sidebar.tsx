import { NavbarLogo } from "../Navbar/ResizableNavbar";
import { LayoutDashboard, FileText, Link as LinkIcon, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper to determine if link is active
  const isActive = (path: string) => {
    if (path === "/dashboard" && currentPath === "/dashboard") return true;
    if (path !== "/dashboard" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getLinkClass = (path: string) => {
    const active = isActive(path);
    return `flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-white text-gray-900 shadow-sm"
        : "text-gray-700 hover:bg-white hover:shadow-sm dark:text-gray-200 dark:hover:bg-gray-900"
    }`;
  };

  return (
    <div className="hidden w-64 flex-col md:flex">
      <div className="flex h-16 items-center justify-center">
        <div className="scale-90">
          <NavbarLogo />
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <h3 className="mt-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Main Menu</h3>
        <nav className="flex-1 space-y-1 px-2 py-4">
          <Link to="/dashboard" className={getLinkClass("/dashboard")}>
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Overview
          </Link>
          <Link to="/dashboard/invoices" className={getLinkClass("/dashboard/invoices")}>
            <FileText className="mr-3 h-5 w-5" />
            Invoices
          </Link>
          <Link to="/dashboard/payment-links" className={getLinkClass("/dashboard/payment-links")}>
            <LinkIcon className="mr-3 h-5 w-5" />
            Payment Links
          </Link>
        </nav>
        <div className="mt-4 px-2 py-4">
          <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">System</h3>
          <nav className="mt-2 space-y-1">
            <Link
              to="/dashboard/settings"
              className={getLinkClass("/dashboard/settings")}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
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
