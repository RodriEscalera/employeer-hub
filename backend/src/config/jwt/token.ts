import { sign, verify } from "jsonwebtoken";
import { APIError } from "../../utils/error.utils";
import { Payload, TokenContent } from "../../types/token.types";

const generateToken = (payload: Payload, expiration?: string): string => {
  const secret = process.env.JWT_SECRET as string;
  const token = sign(
    { user: { _id: payload._id, is_admin: payload.is_admin } },
    secret,
    {
      expiresIn: expiration || "7d",
    }
  );
  if (!token)
    throw new APIError({
      message: "token is not generated",
      status: 404,
    });

  return token;
};

const validateToken = (token: string): TokenContent => {
  const user = verify(token, process.env.JWT_SECRET as string) as TokenContent;
  return user;
};
export { generateToken, validateToken };
