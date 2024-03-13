import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import {
  CreateUserRequest,
  GetUsersResponse,
  UserUpdateRequest,
} from "../types/user.types";

class UserController {
  static async getUsers(
    _req: Request<
      Record<string, never>,
      Response<GetUsersResponse>,
      Record<string, never>,
      Record<string, never>
    >,
    res: Response<GetUsersResponse>,
    next: NextFunction
  ) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json({
        data: users,
        status: 200,
        message: "Users found successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findOneUser(
    req: Request<
      { _id: string },
      Response,
      Record<string, never>,
      Record<string, never>
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.findOneUser(req.params._id);
      res.status(200).json({
        data: user,
        status: 200,
        message: "User found successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  static async createUser(
    req: Request<
      Record<string, never>,
      Response,
      CreateUserRequest,
      Record<string, never>
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({
        data: newUser,
        status: 201,
        message: "User created successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(
    req: Request<
      { _id: string },
      Response,
      UserUpdateRequest,
      Record<string, never>
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedUser = await UserService.updateUser(
        req.body,
        req.params._id
      );
      res.status(200).json({
        data: updatedUser,
        status: 200,
        message: "User updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(
    req: Request<
      { _id: string },
      Response,
      Record<string, never>,
      Record<string, never>
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      await UserService.deleteUser(req.params._id);
      res.status(200).json({
        data: null,
        status: 200,
        message: "User deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
