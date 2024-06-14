import { z } from "zod";

const dateStringSchema = z
  .string()
  .refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid date format, expected ISO 8601 format",
  })
  .transform((date) => new Date(date));

export const createBookingSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z.string(),
    startTime: dateStringSchema,
    returnTime: dateStringSchema.optional().nullable(),
    totalCost: z.number().default(0).optional(),
    isReturned: z.boolean().default(false).optional(),
  }),
});

export const bookingValidations = {
  createBookingSchema,
};
