import { Types } from "mongoose";
import { ResponseBody } from "./request.types";

export interface UserMainProps {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: number;
  dni: number;
  salt: string;
  is_admin: boolean;
  resetToken?: string;
}

export interface UserModelProps extends UserMainProps, Document {
  _id: Types.ObjectId;
  hashPassword: (password: string, salt: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
  generateResetPasswordCode: () => Promise<string>;
  resetPassword: (code: string, password: string) => Promise<void>;
  isNew: boolean;
}

export type RegisterRequestBody = Omit<UserMainProps, "salt">;

export type RegisterResponse = ResponseBody<{
  user: Omit<UserMainProps, "password" | "salt">;
} | null>;

export type LoginResponse = ResponseBody<{
  user: Omit<UserMainProps, "password" | "salt">;
  token: string;
}>;

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface GenerateUpdatePasswordTokenRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  code: string;
  newPassword: string;
}

export type GetUsersResponse = ResponseBody<UserMainProps[]>;

export type CreateUserRequest = Omit<
  UserMainProps,
  "salt" | "resetToken" | "is_admin"
>;

export interface UserUpdateRequest {
  _id?: Types.ObjectId;
  firstname?: string;
  lastname?: string;
  password?: string;
  email?: string;
  phone?: number;
  dni?: number;
  salt?: string;
  is_admin?: boolean;
}
