import { z } from "zod"

export const accountSchema = z.object({
  id: z.string().optional(),
  username: z.string(),
  email: z.string(),
  role: z.enum(["ADMIN", "USER"]),
  password: z.string(),
})

export type Account = z.infer<typeof accountSchema>
