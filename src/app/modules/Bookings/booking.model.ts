import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: "Bike", required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

bookingSchema.statics.isBookingExists = async function (id: string) {
  const existingBooking = await Booking.findOne({ id });
  return existingBooking;
};

export const Booking = model<TBooking>("Booking", bookingSchema);
