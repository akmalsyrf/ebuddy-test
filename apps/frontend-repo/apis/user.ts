import { z } from "zod";

export const userLoginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const userRegisterSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format"),
    role: z.string(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export const userSchema = z.object({
  id: z.string().optional(),
  accountId: z.string(),
  fullName: z.string(),
  age: z.coerce.number(),
  address: z.array(z.string()),
  university: z.object({
    bachelor: z.string().optional(),
    master: z.string().optional(),
  }).optional(),
});

export type User = z.infer<typeof userSchema>
