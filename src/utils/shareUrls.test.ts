import { describe, it, expect } from "vitest";
import { getDashboardShareUrl, getPaymentShareUrl, getReceiptShareUrl } from "./shareUrls";

describe("share URL helpers", () => {
    it("builds payment share URL", () => {
        expect(getPaymentShareUrl("abc123")).toContain("/share/payment/abc123");
    });

    it("builds receipt share URL", () => {
        expect(getReceiptShareUrl("pay_001")).toContain("/share/receipt/pay_001");
    });

    it("builds dashboard share URL", () => {
        expect(getDashboardShareUrl("dash_9")).toContain("/share/dashboard/dash_9");
    });

    it("encodes special characters safely", () => {
        expect(getPaymentShareUrl("link code/1")).toContain("/share/payment/link%20code%2F1");
    });
});
