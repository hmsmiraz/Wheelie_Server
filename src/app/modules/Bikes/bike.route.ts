import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bikeValidations, createBikeSchema } from "./bike.validation";
import { BikeControllers } from "./bike.controller";

const router = express.Router();

router.post(
  "/create-bike",
  validateRequest(createBikeSchema),
  BikeControllers.createBike
);
router.get("/", BikeControllers.getAllBikes);

router.get("/:bikeId", BikeControllers.getSingleBike);

router.put(
  "/:bikeId",
  validateRequest(bikeValidations.updateBikeSchema),
  BikeControllers.updateBike
);

export const BikeRoutes = router;
