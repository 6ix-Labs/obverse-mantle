import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../../components/Button/Button";
import { cn } from "../../lib/utils";
import { IoClose, IoWalletOutline } from "react-icons/io5";
import { ChevronDownIcon } from "lucide-react";

interface TransferModalProps {
  children: React.ReactNode;
  userBalance?: string;
  tokenSymbol?: string;
}

export const TransferModal: React.FC<TransferModalProps> = ({ children, userBalance = "0", tokenSymbol = "USDC" }) => {
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
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold text-gray-900 font-calsans">Transfer</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 text-gray-500 rounded-lg hover:text-gray-700 hover:bg-gray-100"
            >
              <IoClose className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Amount Input Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="px-4 py-4 w-full text-2xl font-medium text-gray-900 bg-gray-50 rounded-2xl border border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex absolute right-3 top-1/2 gap-2 items-center -translate-y-1/2">
                <Button
                  variant="ghost"
                  className="flex gap-2 items-center px-4 h-10 text-white bg-blue-600 rounded-xl shadow-sm hover:bg-blue-700"
                >
                  <div className="flex justify-center items-center w-6 h-6 bg-blue-500 rounded-full">
                    <span className="text-xs font-bold text-white">$</span>
                  </div>
                  <span className="text-sm font-medium">{selectedToken}</span>
                  <ChevronDownIcon className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Balance Display */}
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Balance</span>
            <div className="flex gap-2 items-center">
              <button
                onClick={handleMaxClick}
                className="text-xs font-medium text-blue-600 underline hover:text-blue-700"
              >
                Max
              </button>
              <span className="font-medium text-gray-900">
                {userBalance} {selectedToken}
              </span>
            </div>
          </div>

          {/* Recipient Address Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Recipient Address</label>
            <div className="relative">
              <IoWalletOutline className="absolute left-3 top-1/2 w-4 h-4 text-gray-500 -translate-y-1/2" />
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter recipient wallet address"
                className="px-10 py-4 w-full placeholder-gray-400 text-gray-900 bg-gray-50 rounded-2xl border border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md transform hover:-translate-y-0.5",
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
