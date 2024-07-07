import express from "express";
const router = express.Router();
import {
  addMessage,
  getAllMessages,
  removeMessage,
  getAllRoomByUserId,
  createRoom,
} from "../controllers/chat.js";
import { upload } from "../middlewares/multer.js";
router.post("/", upload.single("file"), addMessage);
router.get("/:roomId", getAllMessages);
router.post("/:user1/:user2", createRoom);
router.get("/room/:userId", getAllRoomByUserId);

router.delete("/:id", removeMessage);

export default router;
