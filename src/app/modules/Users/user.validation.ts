import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().max(20),
      needsPasswordChange: z.boolean().default(true),
      passwordChangedAt: z.date().optional(),
      phone: z.string(),
      address: z.string(),
      role: z.enum(["admin", "user"]),
      status: z.enum(["in-progress", "blocked"]).default("in-progress"),
      isDeleted: z.boolean().default(false),
  }),
});
export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().max(20).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});
export const userValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
