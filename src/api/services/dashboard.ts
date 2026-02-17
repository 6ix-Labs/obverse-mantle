import { apiClient } from "../client";
import { OverviewResponse, PaymentsResponse } from "../types";

export const getOverview = async (): Promise<OverviewResponse> => {
  const response = await apiClient.get<OverviewResponse>("/dashboard/overview");
  return response.data;
};

export interface PaymentsQueryParams {
  limit?: number;
  skip?: number;
  token?: string;
  chain?: "solana" | "ethereum" | "base" | "polygon" | "arbitrum" | string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export const getPayments = async (params?: PaymentsQueryParams): Promise<PaymentsResponse> => {
  const response = await apiClient.get<PaymentsResponse>("/dashboard/payments", { params });
  return response.data;
};
