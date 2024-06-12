import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema, userValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(createUserValidationSchema),
  UserControllers.createUser
);
router.get("/", UserControllers.getAllUsers);

router.get("/:userId", UserControllers.getSingleUser);

router.put(
  "/:userId",
  validateRequest(userValidations.updateUserValidationSchema),
  UserControllers.updateUser
);

export const UserRoutes = router;
