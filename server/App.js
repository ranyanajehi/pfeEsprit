import express, { urlencoded } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./routes/messageRouer.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import studentRouter from "./routes/userRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import jobRouter from "./routes/jobRouter.js";
import chatRouter from "./routes/chatRouter.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
config({ path: "./config/config.env" });
console.log("config", process.env.FRONTEND_URL);
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    preflightContinue: true,
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

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/hello", function (req, res) {
  res.send("hello");
});
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", studentRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/chat", chatRouter);

console.log(path.join(__dirname, "/middlewares/uploads"));
dbConnection();
app.use(errorMiddleware);

export default app;
