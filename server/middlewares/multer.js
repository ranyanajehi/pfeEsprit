// import path from "path";
// import multer from "multer";
// import fs from "fs";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadDir = path.join(__dirname, "uploads");
// import { fileURLToPath } from "url";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }, // Example limit of 1MB
//   fileFilter: function (req, file, cb) {
//     cb(null, true);
//   },
// });
// .single("file");

import path from "path";
import multer from "multer";
import fs from "fs";

const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from "url";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// Multer middleware instance
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Example limit of 1MB
  fileFilter: function (req, file, cb) {
    // Example file filter
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true); // Acceptable file types
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
});

