import { AxiosInstance, addAuthorizationHeader } from "@/utils/axiosinstance";
import { CreateUserServiceRequest, UserProps } from "@/types";
import { getTokenLocalStorage } from "./localStorage.service";
import { UpdateServiceRequest } from "@/types";

export const getUsers = async (): Promise<UserProps[]> => {
  const token = getTokenLocalStorage();
  if (token) addAuthorizationHeader(token);
  const response = await AxiosInstance.get("/api/user");

  return response.data.data as UserProps[];
};

export const getOneUser = async (_id: string): Promise<UserProps[]> => {
  const token = getTokenLocalStorage();
  if (token) addAuthorizationHeader(token);
  const response = await AxiosInstance.get(`/api/user/find-user/${_id}`);
  return response.data.data as UserProps[];
};

export const deleteUser = async (_id: string): Promise<void> => {
  const token = getTokenLocalStorage();
  if (token) addAuthorizationHeader(token);
  await AxiosInstance.delete(`/api/user/delete/${_id}`);
};

export const updateUser = async (
  _id: string,
  updateData: UpdateServiceRequest
): Promise<void> => {
  const token = getTokenLocalStorage();
  if (token) addAuthorizationHeader(token);
  await AxiosInstance.put(`/api/user/update/${_id}`, updateData);
};

export const createUser = async (
  createUserData: CreateUserServiceRequest
): Promise<void> => {
  const token = getTokenLocalStorage();
  if (token) addAuthorizationHeader(token);
  await AxiosInstance.post(`/api/user/`, createUserData);
};
