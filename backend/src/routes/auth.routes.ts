import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post(
  "/generate-update-password-token",
  AuthController.generateUpdatePasswordToken
);
router.patch("/reset-password", AuthController.resetPassword);

export { router as authRoutes };
