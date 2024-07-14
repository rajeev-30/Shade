import mongoose from "mongoose";

const connectDB = async() =>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("mongoDB connected");
    })
    .catch((err)=>{
        console.log("mongoDB connection error: ",  err);
    })
}

export default connectDB