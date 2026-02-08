import { apiClient } from "../client";
import { OverviewResponse, PaymentsResponse } from "../types";

export const getOverview = async (): Promise<OverviewResponse> => {
  const response = await apiClient.get<OverviewResponse>("/dashboard/overview");
  return response.data;
};

export const getPayments = async (): Promise<PaymentsResponse> => {
  const response = await apiClient.get<PaymentsResponse>("/dashboard/payments");
  return response.data;
};
