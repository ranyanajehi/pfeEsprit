import { User } from "../models/userSchema.js";
import { Message } from "../models/message.js";
import { Room } from "../models/room.js";

export const addMessage = async function (req, res) {
  console.log("req.body", req.body);
  const { userId, content, roomId, media } = req.body;
  let file;
  try {
    if (["image", "video", "pdf", "audio"].includes(media)) {
      file = req.file.filename;
    }
    const room = await Room.findById(roomId);

    if (!room) {
      // console.log("Couldn't find room", roo);
      return res.status(400).json({ error: "Room not found" });
    }
    if (!room.users.includes(userId)) {
      // console.log("Couldn't find room", roo);
      return res.status(400).json({ error: "User is not exist in room" });
    }
    console.log("fileeeeeeeeeeeeeeee", req.file);
    const messages = await Message.create({
      media: media,
      sender: userId,
      message: file ? file : content,
      room: roomId,
    });

    const updatedRoom = await Room.findByIdAndUpdate(roomId, {
      $push: { messages: messages._id },
    });
    return res.status(200).send({ messages, updatedRoom });
  } catch (error) {
    throw error;
  }
};
export const removeMessage = async function (req, res) {
  try {
    const messages = await Message.findByIdAndDelete(req.params.id);

    res.status(200).send(messages);
  } catch (error) {
    throw error;
  }
};
export const getAllMessages = async function (req, res) {
  try {
    const messages = await Message.find({
      room: req.params.roomId,
    }).populate({
      path: "sender",
      model: "User",
    });
    res.status(200).send(messages);
  } catch (error) {
    throw error;
  }
};
export const getAllRoomByUserId = async function (req, res) {
  try {
    const rooms = await User.findById(req.params.userId).populate({
      path: "rooms",
      populate: {
        path: "messages",
        model: "MessageNote",
        populate: {
          path: "sender",
          model: "User",
        },
      },
    });
    res.status(200).send(rooms);
  } catch (error) {
    throw error;
  }
};

export const createRoom = async function (req, res) {
  const { user1, user2 } = req.params;

  try {
    const commonRooms = await Room.findOne({
      users: {
        $all: [req.params.user1, req.params.user2],
        $size: 2,
      },
    });

    // console.log("commonRooms", commonRooms);
    if (commonRooms !== null) {
      return res.status(400).json({ error: "Room  exists" });
    } else {
      const rommsCreate = await Room.create({
        users: [user1, user2],
      });
      const result = await User.updateMany(
        { _id: { $in: rommsCreate.users } },
        { $push: { rooms: rommsCreate._id } }
      );
      res.status(200).json(rommsCreate);
    }
  } catch (error) {
    throw error;
  }
};
export const getAllMessagesByRoomId = async () => {};
// export default s;
