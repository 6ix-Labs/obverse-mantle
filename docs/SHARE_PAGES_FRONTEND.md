# Share pages frontend integration

Use backend `/share/*` URLs for outbound share/copy actions.

Why:
- WhatsApp/Facebook crawlers often read only server-rendered HTML.
- SPA-only runtime head updates are not always picked up.
- Backend share routes already return crawler-friendly OG/Twitter tags.

## Helpers

- `getPaymentShareUrl(linkCode)` -> `/share/payment/:linkCode`
- `getReceiptShareUrl(paymentId)` -> `/share/receipt/:paymentId`
- `getDashboardShareUrl(dashboardId)` -> `/share/dashboard/:dashboardId`

## Examples

- Payment link share URL: `https://www.obverse.cc/share/payment/x7k9m2`
- Receipt share URL: `https://www.obverse.cc/share/receipt/67b8e17f...`
- Dashboard share URL: `https://www.obverse.cc/share/dashboard/merchant_123`

## Important

- Normal app navigation remains unchanged (`/pay/:linkCode`, `/receipt/:paymentId`, `/dashboard`).
- Only outbound share/copy actions should use `/share/*` routes.
- Frontend must never generate or sign preview image URLs.
