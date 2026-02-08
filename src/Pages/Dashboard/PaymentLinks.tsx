import ComingSoonIcon from "../../assets/icons/coming-soon.svg";

const PaymentLinks = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <img src={ComingSoonIcon} alt="Coming Soon" className="h-32 w-32 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Payment Links</h2>
        <p className="text-gray-500 mt-2">Payment Links flow coming soon.</p>
    </div>
  );
};

export default PaymentLinks;
