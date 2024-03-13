import { AxiosInstance } from "@/utils/axiosinstance";
import { RegisterServiceRequest } from "@/types";

export const registerService = async (
  registerData: RegisterServiceRequest
): Promise<void> => {
  const response = await AxiosInstance.post("/api/auth/register", {
    ...registerData,
  });
  if (response.status === 500) throw new Error(response.data.message);
};
