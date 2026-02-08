import React, { useState, useEffect } from "react";
import { topT, topT2 } from "../../constants";
import { Link, useParams } from "react-router";
import axios from "axios";
import { logo, logoText, walletIcon, walletIconDark } from "../../assets/icons";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { Button } from "../../components/Button/Button";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { FaSearch, FaTimes } from "react-icons/fa";

const Wallet = () => {
  const [darkMode, setDarkMode] = useState(false);
  type PaymentLinkData = {
    paymentLink?: {
      title?: string;
      totalAmountReceived?: number;
    };
  };

  const [data, setData] = useState<PaymentLinkData | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { linkId } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://obverse-server.onrender.com/payment-link/transactions/${linkId}`);
        console.log(response.data);
        setData(response.data);
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    if (linkId) {
      fetchTransactions();
    }
  }, [linkId]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const SunIcon = GoSun as unknown as React.FC;
  const MoonIcon = IoMoonOutline as unknown as React.FC;
  const SearchIcon = FaSearch as unknown as React.FC;
  const TimesIcon = FaTimes as unknown as React.FC;

  return (
    <div className="overflow-x-auto min-h-screen bg-gray-100 dark:bg-black dark:text-white padding-x">
      <header className="flex justify-between items-center px-2 py-6 w-full bg-white sm:px-20 dark:bg-black">
        <Link to="/">
          <div className="flex gap-2">
            <img src={logo} alt="logo" className="max-s20:w-7" />
            <img src={logoText} alt="logoText" className="max-s20:w-24" />
          </div>
        </Link>

        <div className="flex gap-2 items-center sm:gap-4">
          {loading ? (
            <Skeleton className="h-[20px] sm:w-32 w-20" />
          ) : (
            <h2 className="sm:text-[20px] text-[12px] max-s8:text-[10px] font-sans font-medium  leading-text tracking-text dark:text-white text-slate-gray cursor-pointer">
              {data?.paymentLink?.title}
            </h2>
          )}
          <Button size="icon" variant="ghost" onClick={toggleDarkMode} className="bg-gray-200 dark:bg-gray-700">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </header>

      <div className="flex md:w-4/5 mx-auto flex-col justify-center items-center gap-10 dark:bg-background-paymentDark bg-background-payment text-white text-center py-20 rounded-[15px] mb-10">
        <button className="flex justify-center items-center">
          {darkMode ? <img src={walletIconDark} alt="Wallet Icon Dark" /> : <img src={walletIcon} alt="WalletIcon" />}
        </button>
        <div className="flex flex-col gap-2">
          {loading ? (
            <Skeleton className="h-[48px] w-40 mx-auto bg-[#E7562E]/60 dark:bg-[#E7562E]/70" />
          ) : (
            <h2 className="text-[40px] font-calsans leading-text tracking-text font-bold">
              $ {data?.paymentLink?.totalAmountReceived}
            </h2>
          )}
          <p className="text-[14px] font-figtree">Total transactions</p>
        </div>
      </div>
      <div className="p-6 overflow-x-auto bg-[#F5F7FA] dark:bg-[#191B1F] rounded-[15px] dark:rounded-[20px]">
        <div className="flex gap-5 justify-between items-center mx-auto md:w-4/5 max-md:flex-col-reverse">
          <div className="grid justify-center items-center sm:w-1/2 w-full grid-cols-4 bg-white shadow-md dark:bg-black rounded-[10px]">
            {topT.map((item) => (
              <div
                key={item.id}
                className="p-3 text-center rounded-sm font-figtree text-md text-slate-gray transition-all duration-300 ease-in-out hover:bg-[#F5F7FA] hover:text-black dark:hover:text-white  dark:hover:bg-[#191B1F]  hover:px-5 hover:py-2 hover:rounded-[10px]"
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="relative">
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-1 top-1/2 -translate-y-1/2 rounded-none hover:rounded-[10px] text-gray-400 bg-none dark:bg-none dark:hover:bg-gray-700 cursor-pointer"
            >
              <SearchIcon />
            </Button>
            <input
              type="text"
              placeholder="Search.."
              className="w-full pl-12 pr-10 py-3 text-md font-figtree text-[#99A0AE] border border-gray-300 dark:bg-black focus:outline-none focus:shadow-md rounded-[10px]"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-[10px] text-gray-400 bg-gray-200 dark:bg-gray-700 cursor-pointer"
            >
              <TimesIcon />
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:w-4/5 mx-auto min-w-[900px] mt-5 overflow-x-auto w-full border-separate border-spacing-y-5">
          <div className="grid justify-center items-center w-full grid-cols-5 bg-white shadow-md dark:bg-black rounded-[10px]">
            {topT2.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-sm font-figtree text-md text-slate-gray transition-all duration-300 ease-in-out hover:bg-[#F5F7FA] hover:text-black dark:hover:text-white  dark:hover:bg-[#191B1F]  hover:px-5 hover:py-2 hover:rounded-[10px]"
              >
                {item.label}
              </div>
            ))}
          </div>
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="grid mt-2 grid-cols-5 border-b text-sm font-figtree text-[#525866] dark:text-white border-gray-300 dark:border-gray-700"
              >
                <div className="p-3">
                  <Skeleton className="w-20 h-4" />
                </div>
                <div className="p-3">
                  <Skeleton className="w-16 h-4" />
                </div>
                <div className="p-3">
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="p-3">
                  <Skeleton className="w-32 h-4" />
                </div>
                <div className="p-3">
                  <Skeleton className="h-4 w-18" />
                </div>
              </div>
            ))
          ) : transactions.length > 0 ? (
            transactions.map((tx, idx) => (
              <div
                key={idx}
                className="grid mt-2 grid-cols-6 border-b text-sm font-figtree text-[#525866] dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="p-3 text-sm dark:text-[#99a0ae]">{tx.id}</div>
                <div className="p-3">{tx.amount}</div>
                <div className="p-3">{tx.network}</div>
                <div className="p-3 truncate">{tx.memo || tx.description}</div>
                <div className="p-3">{tx.token}</div>
                <div className="p-3">{tx.status}</div>
              </div>
            ))
          ) : (
            <div className="p-6 text-md dark:text-[#99a0ae]">No transactions found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
