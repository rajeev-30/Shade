import express from "express";
import isAuthenticated from "../db/auth.js";
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getSavedPosts, getUserPost, likeAndUnlike, saveAndUnSave } from "../controllers/post.controller.js";

const router = express.Router();

router.route('/create').post(isAuthenticated, createPost);
router.route('/likeandunlike/:id').post(isAuthenticated,likeAndUnlike);
router.route('/comment/:id').post(isAuthenticated,commentOnPost);
router.route('/saveandunsave/:id').post(isAuthenticated,saveAndUnSave);

router.route('/delete/:id').delete(isAuthenticated, deletePost);

router.route('/allposts').get(getAllPosts);
router.route('/followingposts').get(isAuthenticated, getFollowingPosts);
router.route('/likedposts').get(isAuthenticated,getLikedPosts);
router.route('/savedposts').get(isAuthenticated,getSavedPosts)
router.route('/userposts').get(isAuthenticated,getUserPost);

export default router;