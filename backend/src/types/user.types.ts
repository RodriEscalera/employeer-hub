import { Types } from "mongoose";
import { ResponseBody } from "./request.types";

export interface UserMainProps {
  _id: Types.ObjectId;
  name: string;
  lastname: string;
  password: string;
  email: string;
  phone: number;
  dni: number;
  salt: string;
  is_admin: boolean;
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
  token?: string;
} | null>;
