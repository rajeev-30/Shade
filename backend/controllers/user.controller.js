import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import jwt from "jsonwebtoken"
import { Notification } from '../models/notification.model.js';

//Register
export const Register = async (req, res) => {
    try {
        const { username, profession, bio, gender, password } = req.body;

        if (!username) {
            return res.status(400).json({
                message: "Username is required",
                success: false
            });
        }
        if (!gender) {
            return res.status(400).json({
                message: "Gender is required",
                success: false
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required",
                success: false
            });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(401).json({
                message: "Username already exists",
                success: false
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const maleAvatar = `https://avatar.iran.liara.run/public/boy?username=${username.toLowerCase()}`;
        const femaleAvatar = `https://avatar.iran.liara.run/public/girl?username=${username.toLowerCase()}`;
        const avatar = gender === 'M' ? maleAvatar : femaleAvatar;

        const user = await User.create({
            username,
            profession,
            bio,
            gender,
            avatar,
            password: hashedPass
        });

        const tokenData = { userId: user._id }; 
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '30d'});


        user.password = null;  //Because we don't want to send password to user, it doesn't save in the database, 

        return res.status(201)
            .cookie('token', token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true,
            })
            .json({
                message: "User registered successfully",
                success: true,
                user
            });
    } catch (error) {
        console.log("Register failed: " + error);
        return res.status(500).json({
            message: "Registration failed due to server issue",
            success: false,
            errorMsg:error?.errors?.username?.message || error?.errors?.gender?.message
        })
    }
}


//Login
export const Login = async(req, res) =>{
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            })
        }
    
        const user = await User.findOne({username});
    
        if(!user) {
            return res.status(404).json({
                message:"User does not exist",
                success:false
            })
        }
    
        const isPassMatch = await bcrypt.compare(password, user.password);
        if(!isPassMatch) {
            return res.status(401).json({
                message:"Invalid credentials",
                success:false
            })
        }
    
        const tokenData = {
            userId:user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn:'30d'})

        user.password = null;  //Because we don't want to send password to user, it doesn't save in the database, 
        return res.status(200)
        .cookie('token', token, {
            httpOnly:true, 
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true
        })
        .json({
            message:`Welcome back ${user.username}`,
            success: true,
            user
        })
    } catch (error) {
        console.log("Login error: " + error);
    }
}


//Logout
export const Logout = async(req, res) =>{

    return res.status(200)
    .cookie('token','',{
        expiresIn: new Date(Date.now()),
        httpOnly:true,
        secure: true
    })
    .json({
        message: `You logged out successfully`,
        success: true,
    })
}

//get profile
export const getProfile = async (req, res) => {
    try {
        const {id} = req.params

        const user = await User.findById(id).select("-password");
        if(!user) {
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"User profile found",
            success:true,
            user
        })

    } catch (error) {
        console.log("Error getting profile: ", error.message);
    }
}

//Get user from token
export const getUser = async (req, res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"user found",
            success:true,
            user
        })
    } catch (error) {
        console.log("Get user from token failed: ", error);
    }
}

//Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().sort({createdAt:-1}).select("-password");
        return res.status(200).json({
            message:"Got all users",
            success: true,
            allUsers
        })
    } catch (error) {
        console.log("getAllUsers error: "+error);
    }
}


//Follow and unFollow user and notification 
export const followAndUnFollow = async(req, res) => {
    try {
        const loggedInUserId = req.userId;
        const userToFollowId = req.params.id;
    
        const loggedInUser = await User.findById(loggedInUserId);
        const userToFollow = await User.findById(userToFollowId);

        if(!userToFollow) {
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        if(loggedInUser.following.includes(userToFollow._id)) {
            //Unfollow
            //pull userToFollow id from loggedInUser following list
            await User.findByIdAndUpdate(loggedInUser._id, {
                $pull: {following: userToFollow._id}
            })

            //pull loggedInUser id from userToFollow followers list
            await User.findByIdAndUpdate(userToFollow._id, {
                $pull:{followers: loggedInUser._id}
            })

            //delete notification when user unfollows
            await Notification.findOneAndDelete(...[{from:loggedInUser._id, to:userToFollow._id, type: 'follow'}]);
            
            return res.status(200).json({
                message:`You unfollowed ${userToFollow.username}`,
                success:true
            })
        }else{
            //Follow

            //push userToFollow id in loggedInUser following list
            await User.findByIdAndUpdate(loggedInUser._id, {
                $push: {following: userToFollow._id}
            })

            //push loggedInUser id in userToFollow followers list
            await User.findByIdAndUpdate(userToFollow._id, {
                $push : {followers: loggedInUser._id}
            })

            //create notification when user follows
            await Notification.create({
                from: loggedInUser._id,
                to: userToFollow._id,
                type: 'follow'
            })

            return res.status(200).json({
                message:`You followed ${userToFollow.username}`,
                success:true
            })
        }

        
    } catch (error) {
        console.log("followAndUnFollow error: "+error);
    }
    
}

//Update user Profile
export const updateProfile = async(req, res) => {
    try {
        let {username, profession, bio, password} = req.body;
        const loggedInUserId = req.userId;

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findOne({username});

        if(!username) {
            return res.status(400).json({
                message: "Username is required",
                success: false,
            })
        }
        
        if(user && user.username === username && !(user._id.equals(loggedInUser._id))) {
            return res.status(400).json({
                message: "Username already exists",
                success: false,
            })
        }

        //if user has not given the password set the password to previous password if given hash it and update the password
        if(!password) {
            password = loggedInUser.password
        }else{
            password = await bcrypt.hash(password, 10);
        }

        await User.findByIdAndUpdate(loggedInUser?._id, {
            $set:{username, profession, bio, password}
        })
        
        return res.status(200).json({
            message:"Profile updated successfully",
            success:true,
            
        })
    } catch (error) {
        console.log("updateUserInfo error: "+error);
    }
}

//Get following
export const getFollowings = async(req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
    
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false,
            })
        }
    
        const followings = await User.find({_id: {$in: user.following}}).select("-password").sort({createdAt:-1});
    
        return res.status(200).json({
            message: "Got add the following",
            success:true,
            user,
            followings,
        })
    } catch (error) {
        console.log("getFolloweing error: "+error.message);
    }

}


//Get Followers
export const getFollowers = async(req,res) =>{
    try {
        const {id} = req.params;
    
        const user = await User.findById(id);
    
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
    
        const followers = await User.find({_id :{$in: user.followers}}).select("-password").sort({createdAt:-1});
    
        return res.status(200).json({
            message:"Got all the followers",
            success:true,
            user,
            followers
        })
    } catch (error) {
        console.log("getFollowers error: "+error.message);
    }
}

//get unfollowed users
export const getUnfollowedUsers = async (req, res)=>{
    try {
        const id= req.userId;
    
        const user = await User.findById(id);
    
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }
    
        const unFollowed = await User.find({_id: {$nin: [...user.following, user.id]}}).select("-password").sort({createdAt:-1});
    
        return res.status(200).json({
            message:"Got all the unfollowed users",
            success:true,
            unFollowed,
        })
    } catch (error) {
        console.log("getUnfollowedUsers: "+error.message);
    }
}