import { User } from "../models/Users.model";
import { RegisterRequestBody } from "../types/user.types";
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
}

export { AuthService };
