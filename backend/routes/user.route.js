import {Router} from "express"
import { Login, Logout, Register, followAndUnFollow, getAllUsers, getProfile, getUser, updateUserInfo } from "../controllers/user.controller.js";
import isAuthenticated from "../db/auth.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(isAuthenticated,Logout);
router.route("/profile/:id").get(isAuthenticated,getProfile);
router.route("/getuser").get(isAuthenticated, getUser);
router.route("/allusers").get(getAllUsers);
router.route("/followandunfollow").post(isAuthenticated, followAndUnFollow);
router.route("/updateuserinfo").post(isAuthenticated, updateUserInfo);

export default router;