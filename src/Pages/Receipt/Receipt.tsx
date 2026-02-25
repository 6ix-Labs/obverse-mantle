import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { FiCheckCircle, FiClock, FiAlertTriangle, FiCopy, FiExternalLink, FiPrinter, FiDownload } from "react-icons/fi";
import { useLocation, useParams } from "react-router";
import { logo } from "../../assets/icons";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  NavbarLogo,
} from "../../Components/Navbar/ResizableNavbar";
import PreviewMeta from "../../Components/Seo/PreviewMeta";
import ShareActions from "../../Components/Share/ShareActions";
import { getReceiptShareUrl } from "../../utils/shareUrls";

/**
 * Core payment flow contract (frontend expectation):
 * 1) /pay/:linkCode fetches link details (GET /payment-links/:linkCode)
 * 2) User completes wallet transfer
 * 3) Frontend submits payment proof (POST /payments)
 * 4) POST /payments may include `receipt` for instant UI
 * 5) Receipt page immediately renders optimistic receipt (if present)
 * 6) Receipt page always revalidates with canonical source of truth:
 *    GET /payments/:paymentId/receipt
 */

type ReceiptStatus = "pending" | "confirmed" | "failed";
type SupportedChain = "solana" | "monad" | string;

interface Receipt {
  receiptId: string;
  paymentId: string;
  linkCode: string;
  txSignature: string;
  amount: number;
  token: string;
  chain: SupportedChain;
  fromAddress: string;
  toAddress: string;
  status: ReceiptStatus;
  isConfirmed: boolean;
  confirmedAt: string | null;
  createdAt: string;
  dashboardUrl: string;
  explorerUrl: string;
  customerData?: Record<string, string>;
  previewImageUrl?: string;
}

interface PaymentSubmitResponse {
  _id: string;
  status: ReceiptStatus;
  isConfirmed: boolean;
  txSignature: string;
  amount: number;
  token: string;
  chain: SupportedChain;
  receipt?: Receipt;
}

interface ReceiptPageLocationState {
  receipt?: Receipt;
  payment?: PaymentSubmitResponse;
}

type ReceiptApiResponse = Receipt | { receipt: Receipt } | { data: Receipt } | { data: { receipt: Receipt } };

const API_BASE_URL = (import.meta as ImportMeta & { env: { VITE_API_BASE_URL?: string; NEXT_PUBLIC_API_BASE_URL?: string } }).env
  .VITE_API_BASE_URL ||
  (import.meta as ImportMeta & { env: { VITE_API_BASE_URL?: string; NEXT_PUBLIC_API_BASE_URL?: string } }).env
    .NEXT_PUBLIC_API_BASE_URL ||
  "https://obverse.onrender.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;
const asString = (value: unknown, field: string): string => {
  if (typeof value !== "string") {
    throw new Error(`Invalid receipt field: ${field}`);
  }
  return value;
};

const asNumber = (value: unknown, field: string): number => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`Invalid receipt field: ${field}`);
  }
  return value;
};

const asBoolean = (value: unknown, field: string): boolean => {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid receipt field: ${field}`);
  }
  return value;
};

const asNullableString = (value: unknown, field: string): string | null => {
  if (value === null) return null;
  if (typeof value !== "string") {
    throw new Error(`Invalid receipt field: ${field}`);
  }
  return value;
};

const asReceiptStatus = (value: unknown): ReceiptStatus => {
  if (value === "pending" || value === "confirmed" || value === "failed") {
    return value;
  }
  throw new Error("Invalid receipt field: status");
};

const normalizeReceipt = (payload: unknown): Receipt => {
  if (!isRecord(payload)) {
    throw new Error("Unexpected receipt payload.");
  }

  const source =
    (isRecord(payload.data) && (isRecord(payload.data.receipt) ? payload.data.receipt : payload.data)) ||
    (isRecord(payload.receipt) ? payload.receipt : payload);

  if (!isRecord(source) || typeof source.paymentId !== "string" || typeof source.receiptId !== "string") {
    throw new Error("Invalid receipt response format.");
  }

  const customerData =
    isRecord(source.customerData)
      ? Object.fromEntries(
        Object.entries(source.customerData).map(([key, value]) => [key, typeof value === "string" ? value : String(value)]),
      )
      : undefined;

  return {
    receiptId: asString(source.receiptId, "receiptId"),
    paymentId: asString(source.paymentId, "paymentId"),
    linkCode: asString(source.linkCode, "linkCode"),
    txSignature: asString(source.txSignature, "txSignature"),
    amount: asNumber(source.amount, "amount"),
    token: asString(source.token, "token"),
    chain: asString(source.chain, "chain"),
    fromAddress: asString(source.fromAddress, "fromAddress"),
    toAddress: asString(source.toAddress, "toAddress"),
    status: asReceiptStatus(source.status),
    isConfirmed: asBoolean(source.isConfirmed, "isConfirmed"),
    confirmedAt: asNullableString(source.confirmedAt, "confirmedAt"),
    createdAt: asString(source.createdAt, "createdAt"),
    dashboardUrl: asString(source.dashboardUrl, "dashboardUrl"),
    explorerUrl: asString(source.explorerUrl, "explorerUrl"),
    customerData,
    previewImageUrl: typeof source.previewImageUrl === "string" ? source.previewImageUrl : undefined,
  };
};

// Canonical receipt fetch used for display/share/print and refresh-safe page loads.
const getReceipt = async (paymentId: string): Promise<Receipt> => {
  const { data } = await apiClient.get<ReceiptApiResponse>(`/payments/${encodeURIComponent(paymentId)}/receipt`);
  return normalizeReceipt(data);
};

const formatAmount = (amount: number, token: string) => {
  if (!Number.isFinite(amount)) return `- ${token}`;
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(amount)} ${token}`;
};

const formatDate = (value: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const truncateHash = (value: string, keep = 8) => {
  if (!value || value.length <= keep * 2) return value;
  return `${value.slice(0, keep)}...${value.slice(-keep)}`;
};

const buildDemoReceipt = (paymentId: string): Receipt => ({
  receiptId: paymentId,
  paymentId,
  linkCode: "x7k9m2",
  txSignature: "4j4oYd3pQfR8sY2m9hK1vX7nB6tC5zA3qW1eR9uL2pM8sN4d",
  amount: 50,
  token: "USDC",
  chain: "monad",
  fromAddress: "0xA1b2C3d4E5f60718293aBcDeF001122334455667",
  toAddress: "0xFfEEddCCbBaa99887766554433221100aA123456",
  status: "confirmed",
  isConfirmed: true,
  confirmedAt: new Date().toISOString(),
  createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  dashboardUrl: "https://www.obverse.cc/dashboard",
  explorerUrl: "https://explorer.monad.xyz/tx/4j4oYd3pQfR8sY2m9hK1vX7nB6tC5zA3qW1eR9uL2pM8sN4d",
  customerData: {
    email: "customer@preview.obverse",
    fullName: "Preview Customer",
  },
});

const ReceiptPage: React.FC = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const location = useLocation();
  const state = location.state as ReceiptPageLocationState | null;
  const isPreviewMode = new URLSearchParams(location.search).get("preview") === "demo";

  const initialReceipt = isPreviewMode
    ? buildDemoReceipt(paymentId || "demo-payment-id")
    : (() => {
      try {
        return normalizeReceipt(state?.receipt || state?.payment?.receipt);
      } catch {
        return null;
      }
    })();

  const [receipt, setReceipt] = useState<Receipt | null>(initialReceipt ?? null);
  const [isLoading, setIsLoading] = useState(!initialReceipt);
  const [isRefreshing, setIsRefreshing] = useState(Boolean(initialReceipt));
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const statusMeta = useMemo(() => {
    const status = receipt?.status;
    if (status === "confirmed") {
      return {
        label: "Confirmed",
        classes: "bg-emerald-100 text-emerald-700 border-emerald-200",
        icon: <FiCheckCircle className="h-4 w-4" />,
      };
    }
    if (status === "failed") {
      return {
        label: "Failed",
        classes: "bg-red-100 text-red-700 border-red-200",
        icon: <FiAlertTriangle className="h-4 w-4" />,
      };
    }
    return {
      label: "Pending",
      classes: "bg-amber-100 text-amber-700 border-amber-200",
      icon: <FiClock className="h-4 w-4" />,
    };
  }, [receipt?.status]);

  const fetchCanonicalReceipt = useCallback(async () => {
    if (isPreviewMode) {
      setError(null);
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    if (!paymentId || !paymentId.trim()) {
      setError("Invalid receipt URL: missing payment ID.");
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    const normalizedId = paymentId.trim();
    if (normalizedId.length < 6) {
      setError("Invalid payment ID format.");
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    try {
      setError(null);
      const fresh = await getReceipt(normalizedId);
      setReceipt(fresh);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const statusCode = axiosError.response?.status;

      if (statusCode === 404) {
        setError("Receipt not found. Please verify your payment ID.");
      } else if (statusCode === 400) {
        setError("Invalid payment ID format.");
      } else {
        setError(axiosError.response?.data?.message || "Failed to load receipt. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [isPreviewMode, paymentId]);

  useEffect(() => {
    // Always revalidate against canonical endpoint even when optimistic receipt is available.
    fetchCanonicalReceipt();
  }, [fetchCanonicalReceipt]);

  const copyValue = async (field: string, value?: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1600);
    } catch {
      setCopiedField(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    // Browser-native PDF flow: opens print dialog where user can save as PDF.
    window.print();
  };


  if (isLoading && !receipt) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto w-full max-w-3xl animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 h-6 w-44 rounded bg-white/10" />
          <div className="mb-4 h-12 w-full rounded-xl bg-white/10" />
          <div className="h-64 w-full rounded-2xl bg-white/10" />
        </div>
      </div>
    );
  }

  if (error && !receipt) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-red-400/20 bg-red-500/10 p-6 text-center">
          <p className="text-lg font-semibold">Unable to load receipt</p>
          <p className="mt-2 text-sm text-red-100/80">{error}</p>
          <button
            onClick={fetchCanonicalReceipt}
            className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!receipt) return null;

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const receiptTitle = `Receipt ${receipt.paymentId} | Obverse`;
  const receiptDescription = `Payment receipt for ${formatAmount(receipt.amount, receipt.token)} on ${receipt.chain}.`;
  const receiptShareUrl = getReceiptShareUrl(receipt.paymentId);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef4ff_0%,_#f8fafc_40%,_#f1f5f9_100%)] px-4 pb-8 pt-24 text-slate-900 sm:pb-10 sm:pt-28 print:bg-white print:text-black">
      <PreviewMeta
        title={receiptTitle}
        description={receiptDescription}
        pageUrl={pageUrl}
        previewImageUrl={receipt.previewImageUrl}
      />
      <Navbar className="top-2 sm:top-4 print:hidden" scrollThreshold={50}>
        <NavBody>
          <NavbarLogo />
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
          </MobileNavHeader>
        </MobileNav>
      </Navbar>

      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Transaction Receipt</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Payment Receipt</h1>
            <p className="mt-1 text-sm text-slate-500">Issued {formatDate(receipt.createdAt)}</p>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${statusMeta.classes}`}>
            {statusMeta.icon}
            <span>{statusMeta.label}</span>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-300/60 backdrop-blur-sm sm:p-6 print:border-slate-300 print:bg-white">
          <div className="mb-4 flex items-center gap-2">
            <img src={logo} alt="Obverse" className="h-6 w-6 object-contain" />
            <span className="text-sm font-semibold tracking-wide text-slate-700 print:text-slate-900">Obverse</span>
          </div>
          <div className="mb-5 h-1.5 w-full rounded-full bg-background-sub" />
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-white p-4 print:bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-400 print:text-slate-500">Amount</p>
              <p className="mt-1 text-xl font-semibold">{formatAmount(receipt.amount, receipt.token)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 print:bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-400 print:text-slate-500">Token</p>
              <p className="mt-1 text-xl font-semibold">{receipt.token || "-"}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 print:bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-400 print:text-slate-500">Chain</p>
              <p className="mt-1 text-xl font-semibold capitalize">{receipt.chain || "-"}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 sm:w-auto"
            >
              <FiPrinter className="h-4 w-4" />
              Print
            </button>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 sm:w-auto"
            >
              <FiDownload className="h-4 w-4" />
              Download PDF
            </button>
            <a
              href={receipt.explorerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 sm:w-auto"
            >
              <FiExternalLink className="h-4 w-4" />
              Open Explorer
            </a>
            <ShareActions shareUrl={receiptShareUrl} shareTitle={receiptTitle} className="w-full sm:w-auto" />
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white print:border-slate-300">
            <div className="grid grid-cols-1 divide-y divide-slate-200 text-sm print:divide-slate-300">
              {[
                ["Receipt ID", receipt.receiptId],
                ["Payment ID", receipt.paymentId],
                ["Link Code", receipt.linkCode],
                ["Transaction", receipt.txSignature],
                ["From", receipt.fromAddress],
                ["To", receipt.toAddress],
                ["Created", formatDate(receipt.createdAt)],
                ["Confirmed", formatDate(receipt.confirmedAt)],
              ].map(([label, value]) => {
                const raw = typeof value === "string" ? value : "";
                const isAddressLike = label === "Transaction" || label === "From" || label === "To";
                return (
                  <div key={label} className="flex flex-col gap-1 bg-white px-4 py-3 odd:bg-slate-50/60 sm:flex-row sm:items-center sm:justify-between sm:gap-3 print:bg-white">
                    <span className="text-slate-400 print:text-slate-600">{label}</span>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="max-w-[210px] truncate text-right font-medium text-slate-900 sm:max-w-[420px] print:text-black">
                        {isAddressLike ? truncateHash(raw) : raw || "-"}
                      </span>
                      {!!raw && (
                        <button
                          onClick={() => copyValue(label, raw)}
                          className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-100 print:hidden"
                          title={`Copy ${label}`}
                        >
                          {copiedField === label ? <FiCheckCircle className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {!!receipt.customerData && Object.keys(receipt.customerData).length > 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 print:border-slate-300 print:bg-slate-50">
              <p className="text-sm font-semibold">Customer Data</p>
              <div className="mt-3 grid gap-2 text-sm">
                {Object.entries(receipt.customerData).map(([key, value]) => (
                  <div key={key} className="flex items-start justify-between gap-3 border-b border-slate-200 pb-2 last:border-b-0 print:border-slate-300">
                    <span className="text-slate-400 print:text-slate-600">{key}</span>
                    <span className="max-w-[70%] break-words text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {(error || isRefreshing) && (
          <div className="mt-3 text-xs text-slate-500">
            {isRefreshing ? "Refreshing receipt from canonical source..." : `Showing last available receipt snapshot. ${error}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPage;
