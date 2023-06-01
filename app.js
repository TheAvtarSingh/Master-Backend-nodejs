import express from "express";
import userRoutes from "./Routes/users.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";

config({
  path:"./data/config.env"
})

export const app = express();

// Middle ware
app.use(cookieParser())
app.use(express.json());
app.use("/api/v1/users",userRoutes);


