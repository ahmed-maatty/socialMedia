import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dataBase from "./db/dataBase.js";
import authRouter from "./routers/authRoute.js";
import userRouter from "./routers/userRoute.js";
import postRouter from "./routers/postRoute.js"


// app inialization
const app = express();

// middleWares
app.use(express.json());
app.use(bodyParser.json({ limit : "30mb" , extended : true }));
app.use(bodyParser.urlencoded({ limit : "30mb" , extended : true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(cors({
    origin : ["http://localhost:3000"],
    credentials : true
}));

//Routes
app.use("/api/auth" , authRouter);
app.use("/api/user" , userRouter);
app.use("/api/post" , postRouter)

// app Running
app.listen(process.env.PORT,()=>{
    dataBase();
    console.log("Server Running Successfully >_<");
});