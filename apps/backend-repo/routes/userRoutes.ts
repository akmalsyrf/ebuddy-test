import { Router } from "express"
import ApiHandler from "../controller/api"
import { authMiddleware } from "../middleware"

const router = Router()
  .get("/", authMiddleware(2), ApiHandler.getAllUserHandler)
  .get("/:id", authMiddleware(2), ApiHandler.getUserByIdHandler)
  .post("/", authMiddleware(1), ApiHandler.createUserHandler)
  .put("/", authMiddleware(1), ApiHandler.updateUserHandler)
  .delete("/", authMiddleware(1), ApiHandler.deleteAccountHandler)

export { router as userRouter }
