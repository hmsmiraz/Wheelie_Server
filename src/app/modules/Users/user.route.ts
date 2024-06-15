import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.get("/", UserControllers.getAllUsers);

router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getUser,
);

router.put(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
