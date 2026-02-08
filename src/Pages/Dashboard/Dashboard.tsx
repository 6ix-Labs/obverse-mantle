import { Outlet } from "react-router";
import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import MobileNav from "../../components/Dashboard/MobileNav";

const Dashboard = () => {
  return (
    <div className="bg-background-dashboard flex h-screen font-figtree dark:bg-gray-900">
      <Sidebar />
      <div className="mb-16 flex flex-1 flex-col overflow-hidden p-2 md:mb-0 md:p-6">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Dashboard;
