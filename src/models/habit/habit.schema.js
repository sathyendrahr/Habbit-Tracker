import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdOn: {
    type: String,
    default: new Date().toISOString().substring(0, 10),
  },
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  doneCount: { type: Number, default: 0 },
});

habitSchema.methods.updateStreak = function (streak) {
  this.currentStreak = streak;

  if (this.longestStreak < this.currentStreak) {
    this.longestStreak = this.currentStreak;
  }
};

const habitModel = mongoose.model("Habit", habitSchema);

export default habitModel;
