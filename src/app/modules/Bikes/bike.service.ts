import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newBike = await Bike.create([payload], { session });
    if (!newBike.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Bike!");
    }

    await session.commitTransaction();
    await session.endSession();

    return newBike;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const getSingleBikeFromDB = async (id: string) => {
  const result = await Bike.findById(id);
  return result;
};
const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
};
