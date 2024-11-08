import { Router } from "express"
import ApiHandler from "../controller/api"
import { authMiddleware } from "../middleware"

const router = Router()
  .post("/register", ApiHandler.registerHandler)
  .post("/login", ApiHandler.loginHandler)
  .get("/check-auth", authMiddleware(1), ApiHandler.checkAuthHandler)

export { router as authRouter }
