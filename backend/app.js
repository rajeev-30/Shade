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
const allowedOrigins = ["http://localhost:5173", ""];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allow credentials
};

app.use(cors(corsOptions));

app.use(cors(corsOptions));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/notification", notificationRoute);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);

})

export default app;