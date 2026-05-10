import express from "express";
import {login, signUp,logout, getMe} from "../controllers/auth.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logout)
router.get("/getme",authMiddleware,getMe)

export default router