import { DollarSign, Link, Download } from "lucide-react";

const Overview = () => {
  const overviewData = [
    {
      title: "Total Payments Received",
      value: "0",
      icon: <DollarSign className="h-6 w-6 text-orange-500" />,
    },
    {
      title: "Total Payment Links Created",
      value: "0",
      icon: <Link className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Total Withdrawals",
      value: "0",
      icon: <Download className="h-6 w-6 text-green-500" />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Overview</h2>
      <p className="text-gray-600 dark:text-gray-400">Overview of your activities</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {overviewData.map((item, index) => (
          <div key={index} className="shadow-xs flex items-center rounded-lg bg-white p-4 dark:bg-gray-800">
            <div className="mr-4 rounded-full bg-orange-100 p-3 dark:bg-orange-500">{item.icon}</div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{item.title}</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
