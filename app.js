import express from "express";
import userRoutes from "./Routes/users.js";
import {config} from "dotenv";

config({
  path:"./data/config.env"
})

export const app = express();

// Middle ware
app.use(express.json());
app.use("/users",userRoutes);


