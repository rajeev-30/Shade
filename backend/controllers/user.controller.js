import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import jwt from "jsonwebtoken"

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
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(201)
            .cookie('token', token, {
                httpOnly: true,
                // secure: true
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
            return res.status(401).json({
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
        const token = jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(200)
        .cookie('token', token, {
            httpOnly:true, 
            // secure: true
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

        const user = await User.findById(id);
        if(!user) {
            return res.status(401).json({
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
        console.log("Error getting profile", error);
    }
}

//Get user from token
export const getUser = async (req, res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({
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
        const allUsers = await User.find();
        return res.status(200).json({
            message:"Got all users",
            success: true,
            allUsers
        })
    } catch (error) {
        console.log("getAllUsers error: "+error);
    }
}


//Follow and unFollow
export const followAndUnFollow = async(req, res) => {
    try {
        const loggedInUserId = req.userId;
        const userToFollowId = req.body.id
    
        const loggedInUser = await User.findById(loggedInUserId);
        const userToFollow = await User.findById(userToFollowId);

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

            return res.status(200).json({
                message:`You followed ${userToFollow.username}`,
                success:true
            })
        }

        
    } catch (error) {
        console.log("followAndUnFollow error: "+error);
    }
    
}

//Update user Info
export const updateUserInfo = async(req, res) => {
    try {
        let {username, profession, bio, password} = req.body;
        const loggedInUserId = req.userId;

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findOne({username});

        if(user && user.username === username && !(user._id.equals(loggedInUser._id))) {
            return res.status(400).json({
                message: "Username already exists",
                success: false,
                // loggedInUser,
                // user
            })
        }

        //if user has not given the password set the password to prev password if given hash it nad update the password
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