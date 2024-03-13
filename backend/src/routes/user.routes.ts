import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.get("/", AuthMiddleware.validateUser, UserController.getUsers);
router.get(
  "/find-user/:_id",
  AuthMiddleware.validateUser,
  UserController.getUsers
);
router.post("/", AuthMiddleware.validateUser, UserController.createUser);
router.put(
  "/update/:_id",
  AuthMiddleware.validateUser,
  UserController.updateUser
);
router.delete(
  "/delete/:_id",
  AuthMiddleware.validateUser,
  UserController.deleteUser
);

export { router as userRoutes };
