import { Request } from "express";
export interface ValidateUserRequest extends Request {
  user?: {
    _id: string;
    is_admin: boolean;
  };
}
