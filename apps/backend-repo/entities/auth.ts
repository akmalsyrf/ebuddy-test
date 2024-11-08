import { z } from "zod"

export const authSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
})

export const jwtPayloadSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "USER"]),
})

export type Auth = z.infer<typeof authSchema>
export type JwtPayload = z.infer<typeof jwtPayloadSchema>
