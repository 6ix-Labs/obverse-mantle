import PaymentReceivedIcon from "../../assets/icons/payment-received.svg";
import PaymentLinkCreatedIcon from "../../assets/icons/payment-link-created.svg";
import WithdrawalIcon from "../../assets/icons/withdrawal.svg";
import { useQuery } from "@tanstack/react-query";
import { getOverview } from "../../api/services/dashboard";
import { Skeleton } from "../Skeleton/Skeleton";

const Overview = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: getOverview,
  });

  const stats = data?.stats;

  return (
    <div className="flex flex-col gap-6 w-full font-figtree">
      <div className="flex flex-row gap-4 justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium text-[#131313] md:text-[32px]">Overview</h1>
          <p className="text-xs text-[#131313] md:text-sm">Overview of your activities</p>
        </div>
        <button
          onClick={() => window.open("https://t.me/ObverseBot", "_blank")}
          className="flex h-10 items-center justify-center gap-2 rounded-[96px] bg-[#ff7849] px-4 transition-colors hover:bg-[#e0693e] md:h-[60px] md:px-6"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 md:h-6 md:w-6"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="#131313"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-medium text-[#131313] md:text-sm">Create Payment Link</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-transparent p-0 md:bg-[#f7f7f7] md:p-4">
        <h2 className="text-base text-[#131313]">Summary</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Total Payments Received */}
          {isLoading ? (
            <Skeleton className="h-[180px] w-full rounded-lg" />
          ) : (
            <div className="flex flex-col gap-[15px] rounded-lg border border-[#e0e0e0] bg-white p-4">
              <div className="flex h-fit w-fit items-center justify-center rounded-[88px] bg-[#deffd9] p-2">
                <img src={PaymentReceivedIcon} alt="Payment Received" className="w-8 h-8" />
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-[#131313]">Total Payments Received</p>
                <p className="text-[32px] font-medium text-[#131313]">{stats?.totalAmount ?? 0}</p>
              </div>
            </div>
          )}

          {/* Total Payment Links Created */}
          {isLoading ? (
            <Skeleton className="h-[180px] w-full rounded-lg" />
          ) : (
            <div className="flex flex-col gap-[15px] rounded-lg border border-[#e0e0e0] bg-white p-4">
              <div className="flex h-fit w-fit items-center justify-center rounded-[88px] bg-[#d9e8ff] p-2">
                <img src={PaymentLinkCreatedIcon} alt="Payment Link Created" className="w-8 h-8" />
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-[#131313]">Total Payment Links Created</p>
                <p className="text-[32px] font-medium text-[#131313]">{data?.paymentLink ? 1 : 0}</p>
              </div>
            </div>
          )}

          {/* Total Withdrawals */}
          {isLoading ? (
            <Skeleton className="h-[180px] w-full rounded-lg" />
          ) : (
            <div className="flex flex-col gap-[15px] rounded-lg border border-[#e0e0e0] bg-white p-4">
              <div className="flex h-fit w-fit items-center justify-center rounded-[88px] bg-[#ffedd9] p-2">
                <img src={WithdrawalIcon} alt="Withdrawal" className="w-8 h-8" />
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-[#131313]">Total Withdrawals</p>
                <p className="text-[32px] font-medium text-[#131313]">0</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
