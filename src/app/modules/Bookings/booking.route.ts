import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingSchema } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.post(
  "/rentals",
  validateRequest(createBookingSchema),
  BookingControllers.createBooking
);
router.get("/rentals", BookingControllers.getAllBookings);

router.put("/rentals/:id/return", BookingControllers.updateBooking);

export const BookingRoutes = router;
