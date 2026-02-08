import Overview from "../../components/Dashboard/Overview";
import Transactions from "../../components/Dashboard/Transactions";

const OverviewPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <Overview />
      <div className="mt-8">
        <Transactions />
      </div>
    </div>
  );
};

export default OverviewPage;
