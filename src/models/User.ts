import mongoose from "mongoose";
import crypto from "crypto";

const generateHashedPassword = (salt: string, password: string) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

const REQUIRED_VALIDATION_MESSAGE = "{PATH} is required";

export interface IUser extends Document {
  email: string;
  username: string;
  salt: string;
  password: string;
  roles: string[];
  authenticate: Function;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
  username: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  salt: String,
  password: String,
  roles: [String],
});

userSchema.method({
  authenticate: function (password: string) {
    return generateHashedPassword(this.salt, password) === this.password;
  },
});

export let User = mongoose.model("User", userSchema);
