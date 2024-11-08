import cors from "cors"
import express, { json, urlencoded } from "express"
import helmet from "helmet"
import morgan from "morgan"
import config from "../config"
import { createLogger, middlewareResponseInit, tracer } from "../middleware"
import { initRequestId } from "../middleware/requestId"
import routes from "../routes"

const logger = createLogger({ name: "APP", env: config.NODE_ENV })
const app = express()

app.use(cors())
app.use(helmet())
app.use(initRequestId())
app.use(urlencoded({ extended: true }))
app.use(json())

app.use(
  morgan(
    (tokens, req, res) => {
      return [
        `[${tracer.id()}]`,
        `[${req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.ip}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        "-",
        tokens["response-time"](req, res) + "ms",
      ].join(" ")
    },
    {
      skip(req) {
        return req.url === "/health"
      },
    },
  ),
)

app.use(middlewareResponseInit())
app.use(routes)

export async function runApp(port: number) {
  app.listen(port, () => {
    logger.info(`Server is running in port ${port}`)
  })
}

export { app }
