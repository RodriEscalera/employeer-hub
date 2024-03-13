import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

const addAuthorizationHeader = (token: string | null): void => {
  AxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export { AxiosInstance, addAuthorizationHeader };
