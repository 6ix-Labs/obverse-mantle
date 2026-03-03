// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ShareActions from "./ShareActions";
import { getPaymentShareUrl, getReceiptShareUrl } from "../../utils/shareUrls";

vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("ShareActions", () => {
    afterEach(() => {
        cleanup();
    });

    beforeEach(() => {
        Object.defineProperty(navigator, "clipboard", {
            value: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
            configurable: true,
        });
    });

    it("copies /share/payment URL on copy action", async () => {
        const shareUrl = getPaymentShareUrl("abc123");

        render(<ShareActions shareUrl={shareUrl} shareTitle="Payment Link" />);

        fireEvent.click(screen.getByRole("button", { name: /copy link/i }));

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining("/share/payment/abc123"));
    });

    it("uses native share with /share/receipt URL", async () => {
        const shareMock = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, "share", {
            value: shareMock,
            configurable: true,
        });

        const shareUrl = getReceiptShareUrl("pay_001");

        render(<ShareActions shareUrl={shareUrl} shareTitle="Receipt" />);

        fireEvent.click(screen.getByRole("button", { name: /share/i }));

        expect(shareMock).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining("/share/receipt/pay_001"),
            }),
        );
    });

    it("shares backend preview URL but copies frontend URL when copyUrl is provided", async () => {
        const shareMock = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, "share", {
            value: shareMock,
            configurable: true,
        });

        const backendShareUrl = getPaymentShareUrl("abc123");
        const frontendCopyUrl = "https://www.obverse.cc/pay/abc123";

        render(
            <ShareActions
                shareUrl={backendShareUrl}
                copyUrl={frontendCopyUrl}
                shareTitle="Payment Link"
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: /share/i }));
        expect(shareMock).toHaveBeenCalledWith(
            expect.objectContaining({
                url: expect.stringContaining("/share/payment/abc123"),
            }),
        );

        fireEvent.click(screen.getByRole("button", { name: /copy link/i }));
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(frontendCopyUrl);
    });
});
