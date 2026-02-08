import PaymentReceivedIcon from "../../assets/icons/payment-received.svg";
import PaymentLinkCreatedIcon from "../../assets/icons/payment-link-created.svg";
import WithdrawalIcon from "../../assets/icons/withdrawal.svg";

const Overview = () => {
  return (
    <div className="flex w-full flex-col gap-6 font-figtree">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[32px] font-medium text-[#131313]">Overview</h1>
          <p className="text-sm text-[#131313]">Overview of your activities</p>
        </div>
        <button className="flex h-[60px] items-center justify-center gap-2 rounded-[96px] bg-[#ff7849] px-6 transition-colors hover:bg-[#e0693e]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="#131313"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium text-[#131313]">Create Payment Link</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-[#f7f7f7] p-4">
        <h2 className="text-base text-[#131313]">Summary</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Total Payments Received */}
          <div className="flex flex-col gap-[15px] rounded-lg border border-[#e0e0e0] bg-white p-4">
            <div className="flex h-fit w-fit items-center justify-center rounded-[88px] bg-[#deffd9] p-2">
              <img src={PaymentReceivedIcon} alt="Payment Received" className="h-8 w-8" />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-[#131313]">Total Payments Received</p>
              <p className="text-[32px] font-medium text-[#131313]">0</p>
            </div>
          </div>

          {/* Total Payment Links Created */}
          <div className="flex flex-col gap-[15px] rounded-lg border border-[#e0e0e0] bg-white p-4">
            <div className="flex h-fit w-fit items-center justify-center rounded-[88px] bg-[#d9e8ff] p-2">
              <img src={PaymentLinkCreatedIcon} alt="Payment Link Created" className="h-8 w-8" />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-[#131313]">Total Payment Links Created</p>
              <p className="text-[32px] font-medium text-[#131313]">0</p>
            </div>
          </div>

          {/* Total Withdrawals */}
          <div className="flex flex-col gap-[15px] rounded-lg border border-[#e0e0e0] bg-white p-4">
            <div className="flex h-fit w-fit items-center justify-center rounded-[88px] bg-[#ffedd9] p-2">
              <img src={WithdrawalIcon} alt="Withdrawal" className="h-8 w-8" />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-[#131313]">Total Withdrawals</p>
              <p className="text-[32px] font-medium text-[#131313]">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
