import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("join", (roomId) => {
    console.log("user join room", roomId);
    socket.join(roomId);
  });

  socket.on("typing", (data) => {
    console.log("user typing", data);
    socket.to(data.roomId).emit("typing", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("chat_message", (msg) => {
    console.log("user message", msg);
    socket.to(msg.roomId).emit("chat_message", msg);
  });
});
const notificationNamespace = io.of("/notification");
notificationNamespace.on("connection", (socket) => {
  console.log("a user connected to notification");

  socket.on("join", (userId) => {
    console.log("user join room", userId);
    socket.join(userId);
  });

  socket.on("notification", (notification) => {
    notificationNamespace
      .to(notification.user._id)
      .emit("notification", notification);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected from notification", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
