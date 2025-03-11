import express from "express";
import UserControl from "../controllers/userController.js";
import authmiddleware from "../middlewares/authmiddleware.js";
const router = express.Router()

router.post('/register',UserControl.UserRegister)
router.post('/login',UserControl.UserLogin)
router.get('/getuser',authmiddleware,UserControl.loggedUser)
export default router