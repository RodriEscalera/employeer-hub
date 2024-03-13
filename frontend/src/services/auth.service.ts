import { AxiosInstance, addAuthorizationHeader } from "@/utils/axiosinstance";
import { LoginServiceRequest, RegisterServiceRequest } from "@/types";

export const registerService = async (
  registerData: RegisterServiceRequest
): Promise<void> => {
  const response = await AxiosInstance.post("/api/auth/register", {
    ...registerData,
  });
  if (response.status === 500) throw new Error(response.data.message);
};

export const loginService = async (loginData: LoginServiceRequest) => {
  const response = await AxiosInstance.post("/api/auth/login", {
    ...loginData,
  });

  if (response.status === 500) throw new Error(response.data.message);

  const { data } = response;
  localStorage.setItem("token", data.data.token);
  return data.data.user;
};

export const meService = async () => {
  const token = localStorage.getItem("token");
  if (token) addAuthorizationHeader(token);

  const response = await AxiosInstance.get("/api/auth/me");

  if (response.status === 500) throw new Error(response.data.message);
  return response.data.data;
};
