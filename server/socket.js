import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const server = http.createServer(app);
const io = new Server(server);
app.use(
  cors({
    origin: "*",
  })
);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("join", (userId) => {
    console.log("user join room", userId);
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat_message", (msg) => {
    io.to(data.user._id).emit("chat_message", msg);
  });
  socket.on("notification", (notification) => {
    io.to(data.user._id).emit("notification", notification);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
