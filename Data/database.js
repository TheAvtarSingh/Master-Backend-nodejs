import mongoose from "mongoose";

const uri =
  process.env.MONGO_URI;
// Database
export const connectDb = ()=>{ mongoose
    .connect(uri, {
      dbName: "backend",
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });}
