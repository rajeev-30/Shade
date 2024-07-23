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
            return res.status(400).json({
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

        if(post.img) {
            const imgId = post.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imgId)
        }

        await Post.findByIdAndDelete(id);

        //Delete all notifications related to this post
        await Notification.deleteMany({post: id});

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
            select: "username avatar profession createdAt"
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

//Get single post
export const getPost = async(req, res) => {
    try {
        const {id} = req.params;

        const post = await Post.findById(id)
        .populate({
            path:"user",
            select: "username avatar profession createdAt"
        })
        .populate({
            path: "comments.user",
            select: "username avatar createdAt"
        })
        .sort({createdAt:-1});

        if(!post){
            return res.status(404).json({
                message: "Post not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Got a post",
            success:true,
            post
        })

    } catch (error) {
        console.log("getPost error: " + error.message)
        
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
            select:"username avatar profession createdAt"
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

//LineAndUnlke post and notification
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

            //Unlike notification
            await Notification.findOneAndDelete(...[{post: post._id, from: user._id, type: 'like'}]);

            return res.status(200).json({
                message: "You Unliked the Post",
                success:true
            })
        }
        else {
            await Post.findByIdAndUpdate(post._id, {$push: {likes: user._id}});

            // like notification
            //if user like his own post then do not send notification
            if(!user._id.equals(post.user)) {
                await Notification.create({
                    from: user._id,
                    to: post.user,
                    post: post._id,
                    type: 'like'
                });
            }

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

//Comment on a post and notification
export const commentOnPost = async(req, res) => {
    try {
        const userId = req.userId;
        const {id} = req.params;
        const {text} = req.body;

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

        await Post.findByIdAndUpdate(post._id, {$push: {comments: {text,user:user._id}}});

        //comment notification
        //if user comment on his own post then do not send notification
        if(!user._id.equals(post.user)) {
            await Notification.create({
                from: user._id,
                to: post.user,
                post: post._id,
                commentText: text,
                type: 'comment'
            })
        }

        return res.status(200).json({
            message:"Comment created successfully",
            success: true
        })
    } catch (error) {
        console.log("likeAndUnlike error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//get Liked posts
export const getLikedPosts = async(req, res) => {
    try {
        const id = req.userId;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        }

        const posts = await Post.find({ likes: id, user: { $ne: id } })
        .populate({
            path:"user",
            select:"username avatar profession createdAt"
        })
        .sort({createdAt:-1});

        return res.status(200).json({
            message: "Got all liked posts",
            success:true,
            posts,
        })
    } catch (error) {
        console.log("getLikedPosts error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//SaveAndUnSave post
export const saveAndUnSave = async (req, res) => {
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

        if(post.saves.includes(user._id)){
            await Post.findByIdAndUpdate(post._id, {$pull: {saves: user._id}})

            return res.status(200).json({
                message: "You Unsaved a post",
                success:true
            })
        }
        else{
            await Post.findByIdAndUpdate(post._id, {$push: {saves: user._id}})

            return res.status(200).json({
                message: "You Saved a post",
                success:true
            })
        }

        

    } catch (error) {
        console.log("saveAndUnSave error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//get Save posts
export const getSavedPosts = async (req,res) =>{
    try {
        const id = req.userId;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        }

        const posts = await Post.find({saves: id})
        .populate({
            path:"user",
            select:"username avatar profession createdAt"
        })
        .sort({createdAt:-1});

        return res.status(200).json({
            message: "Got all saved posts",
            success:true,
            posts,
        })
    } catch (error) {
        console.log("getSavedPost error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//get user posts
export const getUserPosts = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        }

        const posts = await Post.find({user: id})
        .populate({
            path:"user",
            select:"username avatar profession createdAt"
        })
        .sort({createdAt:-1});

        return res.status(200).json({
            message: "Got user post",
            success:true,
            posts
        })
    } catch (error) {
        console.log("getUserPost error: " + error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//Delete comment and notification
export const deleteComment = async(req, res) => {
    try {
        const {postId, commentId} = req.params
    
        const post = await Post.findById(postId);
        const comment = await Post.find({comments: {_id: commentId}});
        
        if(!post) {
            return res.status(404).json({
                message: "Post not found",
                success:false
            })
        }
        if(!comment) {
            return res.status(404).json({
                message: "Comment not found",
                success:false
            })
        }

        await Post.findByIdAndUpdate(postId, {$pull : {comments: {_id: commentId}}});

        await Notification.findOneAndDelete({from: req.userId, to:post.user, type: 'comment'})
        
        return res.status(200).json({
            message: "Comment deleted successfully",
            success: true,
        })
    } catch (error) {
        console.log("Delete Comment error: " , error.message)
        
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

