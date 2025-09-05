import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Components/ui/dialog";
import { Button } from "../Button/Button";
import { cn } from "../../lib/utils";
import { IoClose, IoWalletOutline } from "react-icons/io5";
import { ChevronDownIcon } from "lucide-react";

interface TransferModalProps {
  children: React.ReactNode;
  userBalance?: string;
  tokenSymbol?: string;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  children,
  userBalance = "0",
  tokenSymbol = "USDC",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [selectedToken] = useState(tokenSymbol);

  const handleMaxClick = () => {
    setAmount(userBalance);
  };

  const handleTransfer = () => {
    // Handle transfer logic here
    console.log("Transfer:", { amount, recipientAddress, selectedToken });
    setIsOpen(false);
  };

  const isTransferDisabled = !amount || !recipientAddress || parseFloat(amount) <= 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white text-gray-900 border-gray-200 rounded-[30px] shadow-xl">
        <DialogHeader className="space-y-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900 font-calsans">
              Transfer
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <IoClose className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount Input Section */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-gray-50 text-gray-900 text-2xl font-medium px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <span className="text-sm font-medium">{selectedToken}</span>
                  <ChevronDownIcon className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Balance Display */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">Balance</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMaxClick}
                className="text-blue-600 hover:text-blue-700 font-medium text-xs underline"
              >
                Max
              </button>
              <span className="text-gray-900 font-medium">{userBalance} {selectedToken}</span>
            </div>
          </div>

          {/* Recipient Address Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-600 font-medium">Recipient Address</label>
            <div className="relative">
              <IoWalletOutline className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter recipient wallet address"
                className="w-full bg-gray-50 text-gray-900 px-10 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
              />
            </div>
          </div>

          {/* Confirm Transfer Button */}
          <Button
            onClick={handleTransfer}
            disabled={isTransferDisabled}
            className={cn(
              "w-full py-4 rounded-2xl font-medium transition-all duration-200 shadow-sm",
              isTransferDisabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md transform hover:-translate-y-0.5"
            )}
          >
            Confirm transfer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferModal;
