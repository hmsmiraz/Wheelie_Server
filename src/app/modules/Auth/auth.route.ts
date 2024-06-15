import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { createUserValidationSchema } from "../Users/user.validation";
import { UserControllers } from "../Users/user.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
