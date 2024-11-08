import { type NextFunction, type Request, type Response } from "express"
import { tracer } from "./requestId"

/**
 * Assign success response
 */
export function middlewareResponseInit() {
  return function (req: Request, res: Response, next: NextFunction) {
    const shouldDebug = ["development", undefined].includes(process.env.NODE_ENV)
    res.success = function (data: unknown, message = "Success", code = 200, dev: unknown) {
      return res.status(code ?? 200).json({
        message,
        content: data,
        debug: shouldDebug
          ? {
              requestId: tracer.id(),
            }
          : undefined,
        dev: shouldDebug ? dev : undefined,
      })
    }
    next()
  }
}
