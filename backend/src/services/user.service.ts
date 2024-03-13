import { User } from "../models/Users.model";
import { CreateUserRequest, UserUpdateRequest } from "../types/user.types";
import { APIError } from "../utils/error.utils";

class UserService {
  static async findOneUser(_id: string) {
    const user = await User.find({ _id });
    if (!user) {
      throw new APIError({ message: "User not found.", status: 404 });
    }
    return user;
  }

  static async getUsers() {
    const users = await User.find({});
    if (!users) {
      throw new APIError({ message: "Users not found.", status: 404 });
    }
    return users;
  }

  static async createUser(userFields: CreateUserRequest) {
    const newUser = await new User(userFields).save();
    if (!newUser) {
      throw new APIError({ message: "Could not create user.", status: 500 });
    }
    return newUser;
  }
  static async updateUser(userFields: UserUpdateRequest, _id: string) {
    const updatedUser = await User.findByIdAndUpdate({ _id }, userFields, {
      new: true,
    });
    if (!updatedUser) {
      throw new APIError({ message: "Could not update user.", status: 500 });
    }
    return updatedUser;
  }
  static async deleteUser(_id: string) {
    const deletedUser = await User.deleteOne({ _id });
    if (!deletedUser) {
      throw new APIError({
        message: "User not exist",
        status: 404,
      });
    }
  }
}
export { UserService };
