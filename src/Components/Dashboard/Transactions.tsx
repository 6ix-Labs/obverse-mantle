import { Search, Calendar, Filter, Download, ChevronDown, Coins, Trash2 } from "lucide-react";
import { useState, useRef, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../api/services/dashboard";
import { Skeleton } from "../Skeleton/Skeleton";
import type { PaymentsResponse, Payment } from "../../api/types";
import { toast } from "sonner";
import { downloadCsv } from "../../lib/utils";
import TransactionDetailModal from "./TransactionDetailModal";

const Transactions = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [chainFilter, setChainFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isFetching, refetch } = useQuery<PaymentsResponse>({
    queryKey: [
      "payments",
      {
        limit: visibleCount,
        skip: 0,
        chain: chainFilter || undefined,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        search: searchTerm || undefined,
      },
    ],
    queryFn: () =>
      getPayments({
        limit: visibleCount,
        skip: 0,
        chain: chainFilter || undefined,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        search: searchTerm || undefined,
      }),
  });

  const payments = data?.payments || [];
  const currentPayments = payments.slice(0, visibleCount);
  const hasMore = data?.pagination?.hasMore ?? false;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, 1000));
    refetch();
  };

  const handleRowClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  // filter selection handled inline for chains

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      setEndDate(end);
    } else {
      setEndDate(null);
    }
  };

  const CustomDateInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button
      onClick={onClick}
      ref={ref}
      className="flex justify-between items-center px-4 py-2 w-full text-sm font-medium text-gray-700 bg-white rounded-3xl border hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 lg:w-auto"
    >
      <div className="flex items-center">
        <Calendar className="mr-2 w-5 h-5" />
        {value || "Date"}
      </div>
    </button>
  ));

  const handleExport = () => {
    if (!payments || payments.length === 0) {
      toast.error("No data to export");
      return;
    }
    setIsExporting(true);
    const headers = [
      "transaction_id",
      "token",
      "amount",
      "chain",
      "from_address",
      "to_address",
      "status",
      "created_at",
      "tx_signature",
      "confirmations",
    ];
    const rows = payments.map((p) => [
      p._id ?? "",
      p.token ?? "",
      String(p.amount ?? ""),
      p.chain ?? "",
      p.fromAddress ?? "",
      p.toAddress ?? "",
      p.status ?? "",
      p.createdAt ?? "",
      (p as any).txSignature ?? "",
      typeof p.confirmations === "number" ? String(p.confirmations) : "",
    ]);
    downloadCsv(`transactions_export_${new Date().toISOString()}.csv`, headers, rows);
    setIsExporting(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border-b-[0.5px] border-gray-200 dark:bg-gray-800">
      <div className="flex flex-col gap-4 justify-between items-start mb-4 lg:flex-row lg:items-center">
        <div className="relative w-full lg:w-96">
          <span className="flex absolute inset-y-0 left-0 items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 pr-4 pl-10 w-full text-gray-700 bg-white rounded-3xl border focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-orange-500"
            placeholder="Search by transaction id..."
          />
          {isFetching && searchTerm.trim().length > 0 && (
            <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400">Searching...</span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto lg:justify-end">
          <div className="hidden gap-2 items-center w-full lg:flex lg:w-auto">
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">Sort by:</span>
            <div className="flex items-center w-full lg:w-auto">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                customInput={<CustomDateInput />}
                dateFormat="yyyy-MM-dd"
              />
              {startDate && (
                <button
                  type="button"
                  onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                    refetch();
                  }}
                  className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  aria-label="Clear date"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-3 justify-between items-center w-full lg:w-auto lg:justify-start">
            <div className="relative flex-1 lg:flex-none" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex justify-center items-center px-4 py-2 w-full text-sm font-medium text-gray-700 bg-white rounded-3xl border lg:w-auto lg:justify-start hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Filter className="mr-2 w-5 h-5" />
                {activeFilter || "Filters"}
                <ChevronDown className="ml-2 w-4 h-4" />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 top-full z-10 p-2 mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Filter By Chains</div>
                  <div className="flex flex-col gap-1">
                  
                      <button
                        onClick={() => {
                          setChainFilter("");
                          setActiveFilter("All");
                          setIsFilterOpen(false);
                        }}
                        className="px-3 py-2 text-sm text-left text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                      All
                      </button>
                      <button
                         onClick={() => {
                           setChainFilter("solana");
                           setActiveFilter("Solana");
                           setIsFilterOpen(false);
                         }}
                        className="px-3 py-2 text-sm text-left text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                      Solana
                      </button>
                      <button
                         onClick={() => {
                           setChainFilter("monad");
                           setActiveFilter("Monad");
                           setIsFilterOpen(false);
                         }}
                        className="px-3 py-2 text-sm text-left text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                      Monad
                      </button>
                 
                  </div>
             
                </div>
              )}
            </div>

            <button
              onClick={handleExport}
              className="flex flex-1 justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-3xl border lg:flex-none lg:justify-start dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              <Download className="mr-2 w-5 h-5" />
              {isExporting ? "Exporting..." : "Export Data"}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 rounded-tl-lg">
                <span className="hidden md:inline">Transaction ID</span>
                <span className="md:hidden">ID</span>
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 dark:bg-gray-700">Token</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 dark:bg-gray-700">Amount</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 dark:bg-gray-700">Chain</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 dark:bg-gray-700">
                Wallet Address
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 dark:bg-gray-700">Status</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 rounded-tr-lg">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
            {isLoading || isFetching ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                </tr>
              ))
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <div className="flex flex-col justify-center items-center">
                    <Trash2 className="mb-4 w-24 h-24 text-gray-300 opacity-50" />
                    <p className="text-gray-500 dark:text-gray-400">No results available</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentPayments.map((transaction: Payment) => (
                <tr
                  key={transaction._id}
                  onClick={() => handleRowClick(transaction)}
                  className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {transaction._id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center mr-2 w-8 h-8 bg-orange-100 rounded-full dark:bg-orange-900/20">
                        <Coins className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      {transaction.token}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                    ${transaction.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                    {transaction.chain}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                    {transaction.fromAddress.substring(0, 6)}...{transaction.fromAddress.substring(transaction.fromAddress.length - 4)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        transaction.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status === "confirmed" ? "Completed" : transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-300">
                    {new Date(transaction.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleViewMore}
            className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-500"
          >
            View More Transactions
          </button>
        </div>
      )}

      <TransactionDetailModal
        payment={selectedPayment}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Transactions;
