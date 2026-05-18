import express from "express";
import {
  login,
  signUp,
  logout,
  getMe,
  updateAssistant,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getme", authMiddleware, getMe);
router.put(
  "/updateassistant",
  authMiddleware,
  upload.single("assistantImage"),
  updateAssistant,
);

export default router;
