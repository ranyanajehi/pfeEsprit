import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const RoomSchema = new Schema({
  messages: [{ type: ObjectId, ref: "MessageNote" }],
  users: [{ type: ObjectId, ref: "User" }],
});

export const Room = mongoose.model("Room", RoomSchema);
