import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: [true, "name is required"] },
  email: { type: String, unique: true, required: [true, "email is required"] },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
