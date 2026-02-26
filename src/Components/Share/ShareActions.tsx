import React from "react";
import { FiShare2, FiCopy } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "../Button/Button";

interface ShareActionsProps {
    shareUrl: string;
    shareTitle: string;
    className?: string;
}

const ShareActions: React.FC<ShareActionsProps> = ({ shareUrl, shareTitle, className }) => {
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
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

    return (
        <div className={`flex items-center gap-2 ${className || ""}`.trim()}>
            <Button
                type="button"
                onClick={handleShare}
                size="normal"
                variant="normal"
                className="gap-2"
            >
                <FiShare2 className="h-4 w-4" />
                Share
            </Button>
            <Button
                type="button"
                onClick={handleCopyLink}
                size="normal"
                variant="normal"
                className="gap-2"
            >
                <FiCopy className="h-4 w-4" />
                Copy link
            </Button>
        </div>
    );
};

export default ShareActions;
