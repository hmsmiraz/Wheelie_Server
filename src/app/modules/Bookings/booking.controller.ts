import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import AppError from "../../errors/AppError";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(
    req.user.email,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const email = req.user?.email;

  if (!email) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "User email not found in request!",
    );
  }

  const result = await BookingServices.getAllBookingsFromDB(email);

  if (!result.length) {
    res.json({
      success: false,
      message: "No Data Found",
      data: result,
    });
  }

  res.json({
    success: true,
    statusCode: 200,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

const returnBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});
export const BookingControllers = {
  createBooking,
  getAllBookings,
  returnBooking,
};
