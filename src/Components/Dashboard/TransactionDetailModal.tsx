import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Skeleton } from "../Skeleton/Skeleton";
import { Coins, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";
import type { Payment } from "../../api/types";

interface TransactionDetailModalProps {
  payment: Payment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
  });

const DetailRow = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number | undefined;
  mono?: boolean;
}) => (
  <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <span className="text-sm font-medium text-[#6b6b6b]">{label}</span>
    <span
      className={`text-sm font-medium text-[#131313] break-all text-right ${mono ? "font-mono" : ""}`}
    >
      {value ?? "-"}
    </span>
  </div>
);

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  payment,
  open,
  onOpenChange,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open && payment) {
      setIsLoading(true);
      const t = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(t);
    }
  }, [open, payment]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95vw] max-w-2xl sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-[#e0e0e0] rounded-xl sm:rounded-2xl shadow-xl p-0 gap-0"
      >
        <DialogHeader className="p-4 pb-0 sm:p-6">
          <div className="flex gap-4 justify-between items-center">
            <DialogTitle className="text-lg font-medium text-[#131313] sm:text-xl">
              Transaction details
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#e0e0e0] bg-white text-[#131313] transition-colors hover:bg-[#f7f7f7] hover:border-[#d0d0d0]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-4 sm:p-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex gap-4 items-center pb-4">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-12 rounded-lg" />
              ))}
            </div>
          ) : payment ? (
            <div className="space-y-0">
              <div className="flex items-center gap-4 pb-6 mb-4 border-b border-[#e0e0e0]">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ffedd9]">
                  <Coins className="w-7 h-7 text-[#ff7849]" />
                </div>
                <div>
                  <p className="text-2xl font-medium text-[#131313]">
                    {payment.amount} {payment.token}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      payment.status === "confirmed"
                        ? "text-green-600"
                        : payment.status === "pending"
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status === "confirmed"
                      ? "Completed"
                      : payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                  </p>
                </div>
              </div>

              <div className="space-y-0 divide-y-0">
                <DetailRow label="Transaction ID" value={payment._id} mono />
                <DetailRow label="Payment Link ID" value={payment.paymentLinkId} mono />
                <DetailRow label="Token" value={payment.token} />
                <DetailRow label="Amount" value={`${payment.amount} ${payment.token}`} />
                <DetailRow label="Chain" value={payment.chain} />
                <DetailRow label="Status" value={payment.status} />
                <DetailRow label="Confirmations" value={payment.confirmations} />
                <DetailRow
                  label="From address"
                  value={payment.fromAddress}
                  mono
                />
                <DetailRow label="To address" value={payment.toAddress} mono />
                {payment.customerData?.name && (
                  <DetailRow label="Customer name" value={payment.customerData.name} />
                )}
                {payment.customerData?.email && (
                  <DetailRow label="Customer email" value={payment.customerData.email} />
                )}
                <DetailRow label="Created" value={formatDate(payment.createdAt)} />
                {payment.confirmedAt && (
                  <DetailRow label="Confirmed" value={formatDate(payment.confirmedAt)} />
                )}
                <DetailRow
                  label="Transaction signature"
                  value={payment.txSignature}
                  mono
                />
              </div>

              {payment.txSignature && (
                <button
                  type="button"
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#e0e0e0] bg-white text-[#131313] font-medium text-sm transition-colors hover:bg-[#f7f7f7]"
                  onClick={() => toast.info("Coming soon")}
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Explorer
                </button>
              )}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailModal;
