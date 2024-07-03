import express, { urlencoded } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./routes/messageRouer.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import studentRouter from "./routes/userRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import jobRouter from "./routes/jobRouter.js";
import morgan from "morgan";
const app = express();
config({ path: "./config/config.env" });
console.log("config", process.env.FRONTEND_URL);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
// app.use(cors());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.get("/hello", function (req, res) {
  res.send("hello");
});
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", studentRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();
app.use(errorMiddleware);
export default app;
