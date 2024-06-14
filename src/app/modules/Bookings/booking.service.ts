import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";
import { Bike } from "../Bikes/bike.model";
import { User } from "../Users/user.model";

const createBookingIntoDB = async (
  email: string,
  payload: Partial<TBooking>
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await User.findOne({ email });
    const newId = new mongoose.Types.ObjectId(user?._id);
    payload.userId = newId;

    const isBikeAvailable = await Bike.findById(payload.bikeId);

    if (!isBikeAvailable?.isAvailable) {
      throw new Error("Bike is not available for rent!");
    }

    const result = await Booking.create([payload], { session });
    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create rental!");
    }
    // Update the bike's isAvailable status to false
    const bikeId = payload.bikeId;
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: false },
      { new: true, session }
    );

    if (!updatedBike) {
      throw new AppError(httpStatus.NOT_FOUND, "Bike not found!");
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getAllBookingsFromDB = async (email: string) => {
  const user = await User.findOne({ email });
  const result = await Booking.find({ userId: user?._id });
  return result;
};

const updateBookingIntoDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the booking data
    const bookingData = await Booking.findById(id).session(session);
    if (!bookingData) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!');
    }

    // Find the associated bike data
    const bookingBike = await Bike.findById(bookingData.bikeId).session(session);
    if (!bookingBike) {
      throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
    }

    // Check if the startTime is valid
    if (!bookingData.startTime) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Date format!');
    }

    // Calculate the total rental duration and cost
    const givenTime = new Date(bookingData.startTime);
    const currentTime = new Date();

    const startTime = givenTime.getTime();
    const endTime = currentTime.getTime();

    const rentTime = endTime - startTime;

    // Ensure rentTime is positive
    if (rentTime < 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Return time cannot be before start time!');
    }

    const totalHours = Math.ceil(rentTime / (1000 * 60 * 60)); // Calculate total hours and round up

    if (!bookingBike.pricePerHour) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Price per hour is not defined!');
    }

    const totalCost = totalHours * bookingBike.pricePerHour;

    // Update the bike availability
    await Bike.findByIdAndUpdate(
      bookingData.bikeId,
      { isAvailable: true },
      { new: true, session }
    );

    // Update the booking with return time, total cost, and isReturned status
    const updateReturnTimeAndCost = await Booking.findByIdAndUpdate(
      id,
      {
        returnTime: currentTime,
        totalCost: totalCost,
        isReturned: true,
      },
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return updateReturnTimeAndCost;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  updateBookingIntoDB,
};
