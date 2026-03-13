import PaymentReceivedIcon from "../../assets/icons/payment-received.svg";
import PaymentLinkCreatedIcon from "../../assets/icons/payment-link-created.svg";
import WithdrawalIcon from "../../assets/icons/withdrawal.svg";
import { useQuery } from "@tanstack/react-query";
import { getOverview } from "../../api/services/dashboard";
import { Skeleton } from "../Skeleton/Skeleton";
import ShareActions from "../Share/ShareActions";

interface OverviewProps {
  dashboardShareUrl?: string;
}

const Overview = ({ dashboardShareUrl }: OverviewProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: getOverview,
  });

  const stats = data?.stats;

  const summaryCards = [
    {
      title: "Total Payments Received",
      value: stats?.totalAmount ?? 0,
      icon: PaymentReceivedIcon,
      bgColor: "bg-[#deffd9]",
      alt: "Payment Received",
    },
    {
      title: "Total Payment Links Created",
      value: data?.paymentLink ? 1 : 0,
      icon: PaymentLinkCreatedIcon,
      bgColor: "bg-[#d9e8ff]",
      alt: "Payment Link Created",
    },
    {
      title: "Total Withdrawals",
      value: 0,
      icon: WithdrawalIcon,
      bgColor: "bg-[#ffedd9]",
      alt: "Withdrawal",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full font-figtree">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium text-[#131313] md:text-[32px]">Overview</h1>
          <p className="text-xs text-[#131313] md:text-sm">Overview of your activities</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <button
            onClick={() => window.open("https://t.me/ObverseBot", "_blank")}
            className="flex h-10 items-center justify-center gap-2 rounded-[96px] bg-[#ff7849] px-4 transition-colors hover:bg-[#e0693e] md:h-[60px] md:px-6 w-full md:w-auto"
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
            <span className="text-xs font-medium text-[#131313] md:text-sm whitespace-nowrap">
              Create Payment Link
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-transparent p-0 md:bg-[#f7f7f7] md:p-4">
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <h2 className="text-base text-[#131313]">Summary</h2>
          {!!dashboardShareUrl && (
            <ShareActions
              shareUrl={dashboardShareUrl}
              shareTitle="Obverse Dashboard"
              variant="compact"
            />
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {summaryCards.map((card, index) =>
            isLoading ? (
              <Skeleton key={index} className="h-[180px] w-full rounded-lg" />
            ) : (
              <div
                key={index}
                className="flex flex-col gap-[15px] rounded-lg border border-[#e0e0e0] bg-white p-4"
              >
                <div
                  className={`flex h-fit w-fit items-center justify-center rounded-[88px] ${card.bgColor} p-2`}
                >
                  <img src={card.icon} alt={card.alt} className="w-8 h-8" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-[#131313]">{card.title}</p>
                  <p className="text-[32px] font-medium text-[#131313]">{card.value}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
