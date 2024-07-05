import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
// import Media from '../models/media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default async (req, res, next) => {
  try {
    if (!["image", "video", "pdf"].includes(req.body.media)) {
      //   console.log("no filessssssssssssssssssssssssssssss");
      console.log("req.body inside text", req.body);
      next();
    } else {
      // Use the name of the input field (i.e. "file") to retrieve the uploaded file
      console.log("req.body inside media", req.body);

      let file = req.files?.file;

      // Use the mv() method to place the file in the desired folder (e.g., 'uploads')
      let uploadPath = path.join(__dirname, "uploads", file.name);
      await file.mv(uploadPath);
      //   req.file = `/uploads/${file.name}`;
      // Send response
      next();
    }
  } catch (err) {
    throw err;
  }
};
