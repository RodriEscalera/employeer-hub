import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.get("/register", AuthController.register);

export { router as authRoutes };
