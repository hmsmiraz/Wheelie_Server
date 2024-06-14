import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "./booking.model";
import { TBooking } from "./booking.interface";

const createBookingIntoDB = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newBooking = await Booking.create([payload], { session });
    if (!newBooking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create rental!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newBooking;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getAllBookingsFromDB = async () => {
  const result = await Booking.find();
  return result;
};


const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  updateBookingIntoDB,
};
