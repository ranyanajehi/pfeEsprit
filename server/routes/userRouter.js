import express from "express"
import { studentRegister ,
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
    getAcceptedStudents
} 
from "../controllers/userController.js";
import {addNewAdmin} from "../controllers/userController.js";
import {
    isStudentAuthenticated,
    isAdminAuthenticated
}

from "../middlewares/auth.js"
import multer from 'multer';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const router =express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {

  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("filesddsssssssssssssssss",file)
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log("filesddsssssssssssssssss",file)
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
  
  // Route pour enregistrer un nouvel étudiant avec avatar
  router.post('/student/register', upload.single('studentAvatar'),studentRegister);
  router.put('/update/:id', upload.single('studentAvatar'), updateStudent);

router.post("/login",login);
router.post("/admin/addNew",isAdminAuthenticated,addNewAdmin)
router.get("/student/getStudent",isAdminAuthenticated,getAllStudent)
router.get("/admin/me",isAdminAuthenticated,getUserDetails)
router.get("/student/me",isStudentAuthenticated,getUserDetails)
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin)
router.get("/student/logout",isStudentAuthenticated,logoutStudent)
router.post("/student/addInformation",isAdminAuthenticated,avatarStudent)
router.get("/count", getStudentCount);

// Route pour obtenir les étudiants en attente
router.get('/students/pending', isAdminAuthenticated, getPendingStudents);

// Route pour mettre à jour le statut d'un étudiant
router.put('/student/update-status/:id', isAdminAuthenticated, updateStudentStatus);
router.get('/students/accepted',  isAdminAuthenticated,getAcceptedStudents);







 export default router;
