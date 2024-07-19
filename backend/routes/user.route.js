import {Router} from "express"
import { Login, Logout, Register, followAndUnFollow, getAllUsers, getFollowers, getFollowings, getProfile, getUnfollowedUsers, getUser, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../db/auth.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/allusers").get(getAllUsers);
router.route("/logout").get(isAuthenticated,Logout);
router.route("/profile/:id").get(isAuthenticated,getProfile);
router.route("/getuser").get(isAuthenticated, getUser);
router.route("/followandunfollow/:id").post(isAuthenticated, followAndUnFollow);
router.route("/updateprofile").post(isAuthenticated, updateProfile);
router.route("/followings/:id").get(isAuthenticated, getFollowings);
router.route("/followers/:id").get(isAuthenticated, getFollowers);
router.route("/unfollowed").get(isAuthenticated, getUnfollowedUsers);

export default router;