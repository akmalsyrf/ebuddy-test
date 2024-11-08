import config from "../config"
import { db } from "../config/firebaseConfig"
import { createLogger } from "../middleware"
import { runApp } from "./app"

const logger = createLogger({ name: "SERVER", env: config.NODE_ENV })
db.collection("healthcheck")
  .limit(1)
  .get()
  .then(() => logger.info("Database connected"))
  .then(() => runApp(config.PORT))
  .catch((err) => {
    logger.error(err)
    process.exit(1)
  })
