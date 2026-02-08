import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import Overview from "../../components/Dashboard/Overview";
import Transactions from "../../components/Dashboard/Transactions";
import MobileNav from "../../components/Dashboard/MobileNav";

const Dashboard = () => {
  return (
    <div className="bg-background-dashboard flex h-screen font-figtree dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden p-2 md:p-6">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="container mx-auto px-6 py-8">
              <Overview />
              <div className="mt-8">
                <Transactions />
              </div>
            </div>
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Dashboard;
