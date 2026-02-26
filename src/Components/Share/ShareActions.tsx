import React from "react";
import { FiShare2, FiCopy } from "react-icons/fi";
import { toast } from "sonner";

interface ShareActionsProps {
  shareUrl: string;
  copyUrl?: string;
  shareTitle: string;
  variant?: "compact" | "inline";
  className?: string;
}

const ShareActions: React.FC<ShareActionsProps> = ({
  shareUrl,
  copyUrl,
  shareTitle,
  variant = "compact",
  className,
}) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(copyUrl || shareUrl);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
        return;
      }
      await handleCopyLink();
    } catch {
      toast.error("Unable to share link");
    }
  };

  const iconSize = "h-5 w-5";
  const buttonBase =
    "inline-flex items-center justify-center rounded-lg border border-[#e0e0e0] bg-white text-[#131313] transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/20";

  if (variant === "inline") {
    return (
      <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className || ""}`.trim()}>
        <button
          type="button"
          onClick={handleShare}
          className={`gap-2 px-4 h-10 rounded-3xl ${buttonBase} md:h-[44px] md:px-5`}
          aria-label="Share dashboard"
        >
          <FiShare2 className={iconSize} />
          <span className="text-sm font-medium">Share</span>
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className={`gap-2 px-4 h-10 rounded-3xl ${buttonBase} md:h-[44px] md:px-5`}
          aria-label="Copy link"
        >
          <FiCopy className={iconSize} />
          <span className="text-sm font-medium">Copy link</span>
        </button>
      </div>
    );
  }

  // Compact variant - better aligned with your UI system
  return (
    <div
      className={`inline-flex items-center gap-2 ${className || ""}`.trim()}
      role="group"
      aria-label="Share dashboard"
    >
      <button
        type="button"
        onClick={handleShare}
        className={`w-10 h-10 rounded-lg shadow-sm ${buttonBase} md:h-[44px] md:w-[44px]`}
        title="Share"
        aria-label="Share"
      >
        <FiShare2 className={iconSize} />
      </button>
      <button
        type="button"
        onClick={handleCopyLink}
        className={`w-10 h-10 rounded-lg shadow-sm ${buttonBase} md:h-[44px] md:w-[44px]`}
        title="Copy link"
        aria-label="Copy link"
      >
        <FiCopy className={iconSize} />
      </button>
    </div>
  );
};

export default ShareActions;