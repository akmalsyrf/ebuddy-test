import { z } from "zod"

export const userSchema = z.object({
  id: z.string().optional(),
  accountId: z.string(),
  fullName: z.string(),
  age: z.coerce.number(),
  address: z.array(z.string()),
  university: z.object({
    bachelor: z.string().optional(),
    master: z.string().optional(),
  }).default({}),
})

export type User = z.infer<typeof userSchema>
