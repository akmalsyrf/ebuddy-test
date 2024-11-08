import { config as dotenvConfig } from "dotenv"
import { z } from "zod"
import { nodeEnv } from "../middleware"

dotenvConfig()

const { PORT, NODE_ENV, TOKEN_API, PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY } = process.env
const config = {
  PORT: z.coerce.number().parse(PORT),
  NODE_ENV: nodeEnv.parse(NODE_ENV),
  TOKEN_API: z.string().parse(TOKEN_API),
  PROJECT_ID: z.string().parse(PROJECT_ID),
  CLIENT_EMAIL: z.string().parse(CLIENT_EMAIL),
  PRIVATE_KEY: z.string().parse(PRIVATE_KEY),
}
console.log(config)

export default config
