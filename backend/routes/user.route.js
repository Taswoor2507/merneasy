import { Router } from "express";
import {
  logOutUser,
  loginUser,
  registerUser,
} from "../controller/user.controller.js";
const router = Router();

// register user
router.route("/register").post(registerUser);
//login user
router.route("/login").post(loginUser);
//logout user
router.route("/logout").get(logOutUser);

export default router;
