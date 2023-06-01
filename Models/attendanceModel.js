import mongoose from "mongoose";
import { AttendanceSchema } from "../Schema/attendanceSchema.js";

export const AttendaceModel  = mongoose.model("Attendance",AttendanceSchema)