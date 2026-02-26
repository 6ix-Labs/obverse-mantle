const normalizeBaseUrl = (value: string) => value.trim().replace(/\/$/, "");

const stripApiSuffix = (value: string) => value.replace(/\/api(?:\/v\d+)?\/?$/i, "");

const resolveShareBaseUrl = () => {
    const explicitShareBase =
        import.meta.env.VITE_SHARE_BASE_URL ||
        import.meta.env.VITE_PUBLIC_SHARE_BASE_URL;

    if (explicitShareBase && explicitShareBase.trim().length > 0) {
        return normalizeBaseUrl(explicitShareBase);
    }

    // Share preview pages are backend-rendered for social crawlers.
    const apiBase = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_BASE_URL;
    if (apiBase && apiBase.trim().length > 0) {
        return normalizeBaseUrl(stripApiSuffix(apiBase));
    }

    const configuredAppBase =
        import.meta.env.VITE_APP_BASE_URL ||
        import.meta.env.VITE_PUBLIC_APP_URL ||
        import.meta.env.VITE_SITE_URL;

    if (configuredAppBase && configuredAppBase.trim().length > 0) {
        return normalizeBaseUrl(configuredAppBase);
    }

    if (typeof window !== "undefined" && window.location?.origin) {
        return window.location.origin;
    }

    return "https://www.obverse.cc";
};

const withEncodedSegment = (value: string) => encodeURIComponent(value.trim());

export const getPaymentShareUrl = (linkCode: string) =>
    `${resolveShareBaseUrl()}/share/payment/${withEncodedSegment(linkCode)}`;

export const getReceiptShareUrl = (paymentId: string) =>
    `${resolveShareBaseUrl()}/share/receipt/${withEncodedSegment(paymentId)}`;

export const getDashboardShareUrl = (dashboardId: string) =>
    `${resolveShareBaseUrl()}/share/dashboard/${withEncodedSegment(dashboardId)}`;
