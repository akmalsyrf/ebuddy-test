import { type z } from "zod"
import { BadRequest } from "."

/**
 * @example
 * function controller(req: Request) {
 *   const { example } = badRequestValidator(
 *    req.body,
 *    z.object({
 *      example: z.string(),
 *    })
 *  )
 * }
 */
export function badRequestValidator<TSchema extends z.ZodTypeAny>(
  data: unknown,
  schema: TSchema,
  message: string | null = "Invalid validation, Please check your input!",
) {
  const validated = schema.safeParse(data)
  if (!validated.success) throw new BadRequest(message, null, { context: validated.error })
  return validated.data as z.infer<typeof schema>
}
