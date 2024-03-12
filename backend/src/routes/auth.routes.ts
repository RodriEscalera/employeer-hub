import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", AuthMiddleware.validateUser, AuthController.me);
router.post(
  "/generate-update-password-token",
  AuthController.generateUpdatePasswordToken
);
router.patch("/reset-password", AuthController.resetPassword);

export { router as authRoutes };
