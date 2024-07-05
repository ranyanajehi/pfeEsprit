import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const MessageShcema = new mongoose.Schema({
  message: { type: String, required: true },
  sender: { type: ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  room: { type: ObjectId, ref: "Room", required: true },
  media: {
    type: String,
    enum: ["image", "video", "text", "pdf", "audio"],
    default: "text",
  },
});

export const Message = mongoose.model("MessageNote", MessageShcema);
