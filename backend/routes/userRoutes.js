import express from "express";
import {
  login,
  logout,
  Purchased,
  signup,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/purchased", authenticateUser, Purchased);

export default router;
