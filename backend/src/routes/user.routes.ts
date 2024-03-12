import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get(
  "/",
  AuthMiddleware.validateUser,
  AuthMiddleware.checkAdmin,
  UserController.getUsers
);
router.post(
  "/",
  AuthMiddleware.validateUser,
  AuthMiddleware.checkAdmin,
  UserController.createUser
);
router.put(
  "/update/:_id",
  AuthMiddleware.validateUser,
  AuthMiddleware.checkAdmin,
  UserController.updateUser
);
router.delete(
  "/delete/:_id",
  AuthMiddleware.validateUser,
  AuthMiddleware.checkAdmin,
  UserController.deleteUser
);

export { router as userRoutes };
