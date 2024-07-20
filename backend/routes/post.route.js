import express from "express";
import isAuthenticated from "../db/auth.js";
import { createPost, deletePost, getAllPosts, getFollowingPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.route('/create').post(isAuthenticated, createPost);
router.route('/delete/:id').delete(isAuthenticated, deletePost);
router.route('/allposts').get(getAllPosts);
router.route('/followingposts').get(isAuthenticated, getFollowingPosts);

export default router;