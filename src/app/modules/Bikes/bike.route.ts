import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bikeValidations, createBikeSchema } from "./bike.validation";
import { BikeControllers } from "./bike.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Users/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(bikeValidations.createBikeSchema),
  BikeControllers.createBike,
);
router.get("/", BikeControllers.getAllBikes);

router.put(
  "/:bikeId",
  auth(USER_ROLE.admin),
  validateRequest(bikeValidations.updateBikeSchema),
  BikeControllers.updateBike,
);
router.delete("/:bikeId", auth(USER_ROLE.admin), BikeControllers.deleteBike);

export const BikeRoutes = router;
