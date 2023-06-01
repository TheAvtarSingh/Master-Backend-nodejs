import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true },
  isPresent: { type: Boolean, select: false, required: true },
  isCompleted: { type: Boolean, select: false, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export { AttendanceSchema };
