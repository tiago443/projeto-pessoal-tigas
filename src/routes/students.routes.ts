import { Router } from "express";
import {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentsController.js";

const router = Router();

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;