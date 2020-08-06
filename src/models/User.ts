import mongoose from "mongoose";

const REQUIRED_VALIDATION_MESSAGE = "{PATH} is required";

const userSchema = new mongoose.Schema({
  email: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  username: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  salt: String,
  password: String,
  roles: [String],
});

export let User = mongoose.model("User", userSchema);
