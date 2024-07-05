import express from "express";
const router = express.Router();
import {
  addMessage,
  getAllMessages,
  removeMessage,
  getAllRoomByUserId,
  createRoom,
} from "../controllers/chat.js";
import uploadFiles from "../middlewares/uploadFiles.js";
router.post("/", uploadFiles, addMessage);
router.get("/:roomId", getAllMessages);
router.post("/:user1/:user2", createRoom);
router.get("/room/:userId", getAllRoomByUserId);
router.delete("/:id", removeMessage);

export default router;
