const resolveAppBaseUrl = () => {
    const configuredBaseUrl =
        import.meta.env.VITE_APP_BASE_URL ||
        import.meta.env.VITE_PUBLIC_APP_URL ||
        import.meta.env.VITE_SITE_URL;

    if (configuredBaseUrl && configuredBaseUrl.trim().length > 0) {
        return configuredBaseUrl.trim().replace(/\/$/, "");
    }

    if (typeof window !== "undefined" && window.location?.origin) {
        return window.location.origin;
    }

    return "https://www.obverse.cc";
};

const withEncodedSegment = (value: string) => encodeURIComponent(value.trim());

export const getPaymentShareUrl = (linkCode: string) =>
    `${resolveAppBaseUrl()}/share/payment/${withEncodedSegment(linkCode)}`;

export const getReceiptShareUrl = (paymentId: string) =>
    `${resolveAppBaseUrl()}/share/receipt/${withEncodedSegment(paymentId)}`;

export const getDashboardShareUrl = (dashboardId: string) =>
    `${resolveAppBaseUrl()}/share/dashboard/${withEncodedSegment(dashboardId)}`;
