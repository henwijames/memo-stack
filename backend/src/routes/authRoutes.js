import express from "express";
import {
  getProfile,
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.get("/profile", protect, getProfile);

export default router;
