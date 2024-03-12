import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterRequestBody, RegisterResponse } from "../types/user.types";

class AuthController {
  static async register(
    req: Request<
      Record<string, never>,
      RegisterResponse,
      RegisterRequestBody,
      Record<string, never>
    >,
    res: Response,
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
}

export { AuthController };
