import mongoose from "mongoose";

const url = process.env.DB_URL || "mongodb://localhost:27017/habittracker";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(url, clientOptions);
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
};
