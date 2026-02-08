import { Outlet } from "react-router";
import Sidebar from "../../Components/Dashboard/Sidebar";
import Header from "../../Components/Dashboard/Header";
import MobileNav from "../../Components/Dashboard/MobileNav";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background-dashboard font-figtree dark:bg-gray-900">
      <Sidebar />
      <div className="flex overflow-hidden flex-col flex-1 p-2 mb-16 md:mb-0 md:p-6">
        <div className="flex overflow-hidden flex-col flex-1 bg-white rounded-2xl shadow-sm dark:bg-gray-800">
          <Header />
          <main className="overflow-y-auto overflow-x-hidden flex-1">
            <Outlet />
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Dashboard;
