import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"

dotenv.config({
    path: "./.env",
})

const app = express();
const port = process.env.PORT || 4000

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

//api
app.use("/api/v1/user", userRoute);

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
    
})

export default app;