import express from "express";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
import mongodbConnect from "../server/config/database.js";
import { connectCloudinary } from "../server/config/cloudinary.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

// Import Routes
import authRouter from "../server/routes/authRouter.js";
import profileRouter from "../server/routes/profileRouter.js"
import courseRouter from "../server/routes/courseRouter.js"
import contactUs from "../server/routes/contactRouter.js"
config();

const app = express();

// middleware
app.use(express.json());
app.use(
     fileUpload({
          useTempFiles: true,
          tempFileDir: "/tmp",
     })
);

app.use(
     cors({
          origin: "*"
     })
)

app.use(cookieParser())

// get routes for testing
app.get("/", (req, res) => {
     res.send("welcome to studyNation");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/course", courseRouter)
app.use('/api/v1/', contactUs)
// payment route panding
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
     console.log(`server is running at http://localhost:${PORT}`);
});

// Database
mongodbConnect();

// Cloudinary  asf
connectCloudinary();
