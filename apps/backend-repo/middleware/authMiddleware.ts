import { type NextFunction, type Request, type Response } from "express"
import { verify } from "jsonwebtoken"
import { type Account, type JwtPayload } from "../../../packages/entities"
import config from "../config"
import { BadRequest, InternalError, NotAuthorized } from "."

export function authMiddleware(level: number) {
  return function (req: Request, _: Response, next: NextFunction) {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) throw new NotAuthorized("Access denied!")

    try {
      const verified = verify(token, config.TOKEN_API) as JwtPayload

      req.token = token
      req.users = verified

      const POLICY: Record<number, Account["role"][]> = {
        1: ["USER", "ADMIN"],
        2: ["ADMIN"],
      }
      const policy = POLICY[level]
      if (!policy) {
        throw new InternalError(
          `policy level: ${level} doesnt exist in policy config, policies must be: ${Object.keys(POLICY)}`,
        )
      }

      if (!policy.includes(verified.role)) throw new NotAuthorized("Access denied!!")

      next()
    } catch (error) {
      if (error instanceof NotAuthorized) throw error
      if (error instanceof InternalError) throw error

      throw new BadRequest("Invalid Token")
    }
  }
}
