import app from "./app.js";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv"
import {v2 as cloudnary} from "cloudinary"

dotenv.config({
    path: "./.env"
})

connectDB();

cloudnary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})