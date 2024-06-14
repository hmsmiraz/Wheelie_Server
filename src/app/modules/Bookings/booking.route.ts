import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingSchema } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Users/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(createBookingSchema),
  BookingControllers.createBooking
);
router.get("/", auth(USER_ROLE.user), BookingControllers.getAllBookings);

router.put(
  "/:id/return",
  auth(USER_ROLE.admin),
  BookingControllers.updateBooking
);

export const BookingRoutes = router;
