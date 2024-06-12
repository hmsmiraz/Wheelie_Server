import { Schema, model } from "mongoose";
import { TBike } from "./bike.interface";

const bikesSchema = new Schema<TBike>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true }
);

bikesSchema.statics.isBikeExists = async function (id: string) {
  const existingBike = await Bike.findOne({ id });
  return existingBike;
};

export const Bike = model<TBike>("Bike", bikesSchema);
