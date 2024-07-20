import express from "express";
import isAuthenticated from "../db/auth.js";
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, likeAndUnlike } from "../controllers/post.controller.js";

const router = express.Router();

router.route('/create').post(isAuthenticated, createPost);
router.route('/delete/:id').delete(isAuthenticated, deletePost);
router.route('/allposts').get(getAllPosts);
router.route('/followingposts').get(isAuthenticated, getFollowingPosts);
router.route('/likeandunlike/:id').post(isAuthenticated,likeAndUnlike);
router.route('/comment/:id').post(isAuthenticated,commentOnPost);

export default router;