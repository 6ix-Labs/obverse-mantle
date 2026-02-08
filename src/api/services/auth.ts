import { apiClient } from "../client";
import { LoginPayload, AuthResponse } from "../types";

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", payload, {
    headers: {
      "user-agent": payload.identifier,
    },
  });
  return response.data;
};
