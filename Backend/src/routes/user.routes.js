import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import askToAssistant from "../controllers/userController.js";

const router = express.Router();

router.post("/asktoassistant", authMiddleware, askToAssistant);

export default router;
