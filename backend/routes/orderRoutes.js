import express from "express";
import { orderData } from "../controllers/orderController.js";
import { authenticateUser } from "../middleware/userMiddleware.js";
const router = express.Router();

router.post("/", authenticateUser, orderData);

export default router;
