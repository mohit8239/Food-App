import express from "express";
import UserControl from "../controllers/userController.js";
const router = express.Router()

router.post('/register',UserControl.UserRegister)

export default router