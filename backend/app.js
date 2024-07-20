import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import notificationRoute from "./routes/notification.route.js"
import cors from 'cors'

dotenv.config({
    path: "./.env",
})

const app = express();
const port = process.env.PORT || 4000

//cors
const corsOptions = {
    origin: "http://localhost:5173",
    credentials:true
}

app.use(cors(corsOptions));

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit: '5mb'}));
app.use(cookieParser());

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/notification", notificationRoute);

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
    
})

export default app;