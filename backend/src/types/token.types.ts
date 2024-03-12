import { Types } from "mongoose";

export interface Payload {
  _id: Types.ObjectId;
  is_admin: boolean;
}

export interface TokenContent {
  user: {
    _id: string;
    is_admin: boolean;
  };
  iat: number;
  exp: number;
}
