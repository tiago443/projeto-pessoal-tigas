import { Router } from "express";
import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject
} from "../controllers/subjectsController.js";

const router = Router();

router.get("/", getSubjects);
router.post("/", addSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;
