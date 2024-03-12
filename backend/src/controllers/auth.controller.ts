import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import {
  GenerateUpdatePasswordTokenRequest,
  LoginRequestBody,
  LoginResponse,
  RegisterRequestBody,
  RegisterResponse,
  ResetPasswordRequest,
} from "../types/user.types";
import { ResponseBody } from "../types/request.types";

class AuthController {
  static async register(
    req: Request<
      Record<string, never>,
      RegisterResponse,
      RegisterRequestBody,
      Record<string, never>
    >,
    res: Response<RegisterResponse>,
    next: NextFunction
  ) {
    try {
      const newUser = await AuthService.register(req.body);
      res.status(200).json({
        data: newUser,
        status: 200,
        message: "User was registered successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request<
      Record<string, never>,
      LoginResponse,
      LoginRequestBody,
      Record<string, never>
    >,
    res: Response<LoginResponse>,
    next: NextFunction
  ) {
    try {
      const userData = await AuthService.login(req.body);

      const { user, token } = userData;

      res.status(200).json({
        data: { user, token },
        status: 200,
        message: "User logged in successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async generateUpdatePasswordToken(
    req: Request<
      Record<string, never>,
      ResponseBody,
      GenerateUpdatePasswordTokenRequest,
      Record<string, never>
    >,
    res: Response<ResponseBody>,
    next: NextFunction
  ) {
    try {
      await AuthService.generateUpdatePasswordToken(req.body.email);

      res.status(200).send({
        status: 200,
        message: "Started reset password process.",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(
    req: Request<
      Record<string, never>,
      ResponseBody,
      ResetPasswordRequest,
      Record<string, never>
    >,
    res: Response<ResponseBody>,
    next: NextFunction
  ) {
    try {
      await AuthService.resetPassword(req.body);
      res.status(200).send({
        status: 200,
        message: "Password reset successfully.",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController };
