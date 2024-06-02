import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.ObjectId, ref: "Habit", required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Done", "Not done", "None"] },
  date: { type: String, default: new Date().toISOString().substring(0, 10) },
});

const trackerModel = mongoose.model("Tracker", trackerSchema);

export default trackerModel;
