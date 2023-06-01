import mongoose from "mongoose";
import { userSchema } from "../Schema/userSchema.js";

export const User = mongoose.model("User", userSchema);