import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import AppError from "../../errors/AppError";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(
    req.user.email,
    req.body
  );
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Not Found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {

  const email = req.user?.email; 

  if (!email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User email not found in request!');
  }

  const result = await BookingServices.getAllBookingsFromDB(email);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Not Found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookingServices.updateBookingIntoDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Not Found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike updated successfully",
    data: result,
  });
});
export const BookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
};
