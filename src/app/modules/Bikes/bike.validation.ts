import { z } from "zod";

export const createBikeSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number().min(0),
    isAvailable: z.boolean().default(true),
    cc: z.number().int().positive(),
    year: z.number().int().gte(1900).lte(new Date().getFullYear()),
    model: z.string(),
    brand: z.string(),
  }),
});
export const updateBikeSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().min(0).optional(),
    isAvailable: z.boolean().default(true).optional(),
    cc: z.number().int().positive().optional(),
    year: z.number().int().gte(1900).lte(new Date().getFullYear()).optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
  }),
});

export const bikeValidations = {
  createBikeSchema,
  updateBikeSchema,
};
