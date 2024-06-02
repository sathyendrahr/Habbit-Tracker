import mongoose from "mongoose";

const url = process.env.DB_URL || "mongodb://localhost:27017/habittracker";

export const connectToDatabase = () => {
  try {
    mongoose.connect(url);
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
};
