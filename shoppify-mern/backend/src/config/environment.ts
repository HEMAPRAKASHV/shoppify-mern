import * as dotenv from "dotenv"

dotenv.config();

export const env_config = {
    mongoUrl :  process.env.MONGO_URI!,
    port : process.env.PORT!,
    jwtSecret : process.env.JWT_SECRET!,
}