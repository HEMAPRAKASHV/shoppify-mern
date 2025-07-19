import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import { env_config } from "./src/config/environment";
import connectDB from "./src/config/database";
import logger from "./src/utils/logger";
import morgan, { StreamOptions } from "morgan";
import router from "./src/routes";

dotenv.config();

const app: Application = express();

const morganFormat = ":method :url :status :response-time ms";
const stream: StreamOptions = {
  write: (message: string) => {
    const [method, url, status, responseTime] = message.trim().split(" ");
    const logObject = {
      method,
      url,
      status,
      responseTime,
    };
    logger.info(JSON.stringify(logObject));
  },
};

//Database
connectDB();

//Required methods
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

//Routes
app.use("/api", router);

app.use(morgan(morganFormat, { stream }));

//Server
app.listen(parseInt(env_config.port), () => {
  console.log("Server running on :", env_config.port);
});
