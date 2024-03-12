import { generateToken } from "../config/jwt/token";
import { User } from "../models/Users.model";
import { LoginRequestBody, RegisterRequestBody } from "../types/user.types";
import { APIError } from "../utils/error.utils";

class AuthService {
  static async register(userBody: RegisterRequestBody) {
    const newUser = await new User(userBody).save();
    if (!newUser) {
      throw new APIError({
        message: "Error with creating a User",
        status: 500,
      });
    }
    return { user: newUser };
  }

  static async login(userBody: LoginRequestBody) {
    const foundUser = await User.findOne({ email: userBody.email });

    if (!foundUser) {
      throw new APIError({
        message: "User does not exist",
        status: 404,
      });
    }

    const isValid = await foundUser.validatePassword(userBody.password);
    if (!isValid) {
      throw new APIError({
        message: "Password does not match",
        status: 404,
      });
    }

    const token = generateToken({
      _id: foundUser._id,
      is_admin: foundUser.is_admin,
    });

    const { password, salt, ...userData } = foundUser.toObject();

    return { user: userData, token };
  }
}

export { AuthService };
