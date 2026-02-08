import Sidebar from "../../Components/Dashboard/Sidebar";
import Header from "../../Components/Dashboard/Header";
import Overview from "../../Components/Dashboard/Overview";
import Transactions from "../../Components/Dashboard/Transactions";
import MobileNav from "../../Components/Dashboard/MobileNav";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <Overview />
            <div className="mt-8">
              <Transactions />
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

export default Dashboard;
