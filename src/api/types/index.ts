export interface Merchant {
  id: string;
  telegramId: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  merchant: Merchant;
  paymentLinkId: string;
  expiresAt: string;
}

export interface LoginPayload {
  identifier: string;
  password?: string;
}

export interface PaymentLink {
  linkId: string;
  description: string;
  amount: number;
  token: string;
  chain: string;
  isActive: boolean;
  isReusable: boolean;
  createdAt: string;
  previewImageUrl?: string;
}

export interface Stats {
  totalPayments: number;
  totalAmount: number;
  pendingPayments: number;
  confirmedPayments: number;
  failedPayments: number;
  successRate: number;
  lastPaidAt: string;
}

export interface CustomerData {
  name: string;
  email: string;
}

export interface Payment {
  _id: string;
  paymentLinkId: string;
  merchantId: string;
  txSignature: string;
  chain: string;
  amount: number;
  token: string;
  fromAddress: string;
  toAddress: string;
  customerData: CustomerData;
  status: string;
  confirmations: number;
  webhookSent: boolean;
  notificationSent: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  confirmedAt?: string;
}

export interface ChartData {
  date: string;
  count: number;
  amount: number;
}

export interface OverviewResponse {
  paymentLink: PaymentLink;
  stats: Stats;
  recentPayments: Payment[];
  chartData: ChartData[];
  dashboard?: {
    previewImageUrl?: string;
  };
}

export interface Pagination {
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
}

export interface PaymentsResponse {
  payments: Payment[];
  pagination: Pagination;
}
