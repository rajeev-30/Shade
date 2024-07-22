import express from "express";
import isAuthenticated from "../db/auth.js";
import { commentOnPost, createPost, deleteComment, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getPost, getSavedPosts, getUserPosts, likeAndUnlike, saveAndUnSave } from "../controllers/post.controller.js";

const router = express.Router();

router.route('/create').post(isAuthenticated, createPost);
router.route('/likeandunlike/:id').post(isAuthenticated,likeAndUnlike);
router.route('/comment/:id').post(isAuthenticated,commentOnPost);
router.route('/saveandunsave/:id').post(isAuthenticated,saveAndUnSave);
router.route('/deletecomment/:postId/:commentId').post(isAuthenticated,deleteComment);

router.route('/delete/:id').delete(isAuthenticated, deletePost);

router.route('/allposts').get(getAllPosts);
router.route('/post/:id').get(getPost);
router.route('/followingposts').get(isAuthenticated, getFollowingPosts);
router.route('/likedposts').get(isAuthenticated,getLikedPosts);
router.route('/savedposts').get(isAuthenticated,getSavedPosts)
router.route('/userposts/:id').get(isAuthenticated,getUserPosts);

export default router;