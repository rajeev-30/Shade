import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import jwt from "jsonwebtoken"

//Register
export const Register = async (req, res) => {
    try {
        const { username, profession, bio, gender, password } = req.body;

        if (!username) {
            return res.json({
                message: "Username is required",
                success: false
            });
        }
        if (!gender) {
            return res.json({
                message: "Gender is required",
                success: false
            });
        }
        if (!password) {
            return res.json({
                message: "Password is required",
                success: false
            });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({
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

        const tokenData = { username }; 
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res
            .cookie('token', token, {
                httpOnly: true,
                signed: true
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
    const {username, password} = req.body;
    if(!username || !password) {
        return res.json({
            message: "All fields are required",
            success: false,
        })
    }

    const user = await User.findOne({username});

    if(!user) {
        return res.json({
            message:"User does not exist",
            success:false
        })
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if(!isPassMatch) {
        return res.json({
            message:"Invalid credentials",
            success:false
        })
    }

    const tokenData = {
        username
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn:'1d'})
    return res
    .cookie('token', token, {
        httpOnly:true, 
        signed:true
    })
    .json({
        message:`Welcome back ${user.username}`,
        success: true
    })
}