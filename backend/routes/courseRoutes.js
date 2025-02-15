import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  buyCourse,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/userMiddleware.js";
import { authenticateAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/create", authenticateAdmin, createCourse);
router.get("/courses", getAllCourses);
router.get("/:id", getCourseById);
router.put("/update/:courseId", authenticateAdmin, updateCourse);
router.delete("/delete/:id", authenticateAdmin, deleteCourse);
router.post("/buy/:courseId", authenticateUser, buyCourse);
export default router;
