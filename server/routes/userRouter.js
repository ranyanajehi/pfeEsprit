import express from "express";
import {
  studentRegister,
  getAllStudent,
  getUserDetails,
  login,
  logoutAdmin,
  logoutStudent,
  avatarStudent,
  getStudentCount,
  updateStudent,
  getPendingStudents,
  updateStudentStatus,
  getAcceptedStudents,
} from "../controllers/userController.js";
import { addNewAdmin } from "../controllers/userController.js";
import {
  isStudentAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/student/register", upload.single("file"), studentRegister);
router.put("/update/:id", updateStudent);

router.post("/login", login);
router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin);
router.get("/student/getStudent", isAdminAuthenticated, getAllStudent);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/student/me", isStudentAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/student/logout", isStudentAuthenticated, logoutStudent);
router.post("/student/addInformation", isAdminAuthenticated, avatarStudent);
router.get("/count", getStudentCount);

// Route pour obtenir les étudiants en attente
router.get("/students/pending", isAdminAuthenticated, getPendingStudents);

// Route pour mettre à jour le statut d'un étudiant
router.put(
  "/student/update-status/:id",
  isAdminAuthenticated,
  updateStudentStatus
);
router.get("/students/accepted", isAdminAuthenticated, getAcceptedStudents);

export default router;
