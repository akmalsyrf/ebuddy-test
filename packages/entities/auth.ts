import { z } from "zod"

export const authSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or Email is required"),
  password: z.string().min(1, "Password is required"),
})

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

export const jwtPayloadSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "USER"]),
})

export type Auth = z.infer<typeof authSchema>
export type JwtPayload = z.infer<typeof jwtPayloadSchema>
