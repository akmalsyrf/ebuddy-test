import { Router } from "express"
import { authRouter } from "./authRoutes"
import { errorHandler } from "./errorHandler"
import { userRouter } from "./userRoutes"

const router = Router()
router.use("/auth", authRouter)
router.use("/profile", userRouter)

router.use(errorHandler)

router.use("*", (req, res) => {
  console.log(`${req.method} ${req.baseUrl}`)
  res.status(404).json({
    message: "Routes not found",
    url: req.originalUrl,
  })
})

export default router
