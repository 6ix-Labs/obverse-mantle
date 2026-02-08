import Overview from "../../Components/Dashboard/Overview";
import Transactions from "../../Components/Dashboard/Transactions";

const OverviewPage = () => {
  return (
    <div className="container px-6 py-8 mx-auto">
      <Overview />
      <div className="mt-8">
        <Transactions />
      </div>
    </div>
  );
};

export default OverviewPage;
