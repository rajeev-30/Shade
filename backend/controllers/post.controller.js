import { Notification } from "../models/notification.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import {v2 as cloudinary} from "cloudinary"


//Create post
export const createPost = async(req,res) =>{
    try {
        const id = req.userId;
        const { text } = req.body
        let { img } = req.body

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        if(!text && !img) {
            return res.status(404).json({
                message: "Text or Image required",
                success:false
            })
        }

        if(img) {
            const uploadedRes = await cloudinary.uploader.upload(img);
            img = uploadedRes.secure_url;
        }

        await Post.create({
            text,
            img,
            user: user.id
        })

        return res.status(201).json({
            message: "Post created successfully",
            success:true
        })
    } catch (error) {
        console.log("Create post error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//Delete Post
export const deletePost = async(req, res)=>{
    try {
        const {id} = req.params
    
        const post = await Post.findById(id);
        
        if(!post) {
            return res.status(404).json({
                message: "Post not found",
                success:false
            })
        }
        await Post.findByIdAndDelete(id);

        return res.status(200).json({
            message:"Post deleted successfully",
            success:true
        })

    } catch (error) {
        console.log("Delete post error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//Get all posts
export const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find()
        .populate({
            path:"user",
            select: "username avatar createdAt"
        })
        .sort({createdAt:-1});

        return res.status(200).json({
            message:"Got all posts",
            success:true,
            posts
        })

    } catch (error) {
        console.log("GetAllPosts error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//Get Following posts
export const getFollowingPosts = async(req, res) => {
    try {
        const id = req.userId;

        const loggedInUser = await User.findById(id);

        if(!loggedInUser) {
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        }

        const posts  = await Post.find({user: {$in: loggedInUser.following}})
        .populate({
            path:"user",
            select:"username avatar createdAt"
        })
        .sort({createdAt:-1});

        return res.status(200).json({
            message: "Got all following posts",
            success:true,
            posts
        })

    } catch (error) {
        console.log("getFollowingPosts error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//LineAndUnlke post
export const likeAndUnlike = async(req, res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;

        const user = await User.findById(userId);
        const post = await Post.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        } 
        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success:false
            })
        }

        if(post.likes.includes(user._id)){
            await Post.findByIdAndUpdate(post._id, {$pull: {likes: user._id}});
            await User.findByIdAndUpdate(user._id, {$pull: {likedPosts: post._id}});

            //Unlike notification
            await Notification.findOneAndDelete(...[{post: post._id, from: user._id, type: 'like'}]);

            return res.status(200).json({
                message: "You Unliked the Post",
                success:true
            })
        }
        else {
            await Post.findByIdAndUpdate(post._id, {$push: {likes: user._id}});
            await User.findByIdAndUpdate(user._id, {$push: {likedPosts: post._id}});

            // like notification 
            await Notification.create({
                from: user._id,
                to: post.user,
                post: post._id,
                type: 'like'
            });

            return res.status(200).json({
                message: "You liked the Post",
                success:true
            })
        }

    } catch (error) {
        console.log("likeAndUnlike error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}   
