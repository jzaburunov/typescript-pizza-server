import mongoose from "mongoose";

const REQUIRED_VALIDATION_MESSAGE = "{PATH} is required";

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: REQUIRED_VALIDATION_MESSAGE,
    unique: [true, "Pizza already exists."],
  },
  private: { type: Boolean, default: false },
  ingredients: [{ type: String }],
  weight: {
    type: Number,
    required: REQUIRED_VALIDATION_MESSAGE,
  },
  description: { type: String },
  price: {
    type: Number,
    required: REQUIRED_VALIDATION_MESSAGE,
  },
  image: {
    type: String,
    required: REQUIRED_VALIDATION_MESSAGE,
  },
  likes: [{ type: String }],
  reviews: [],
});

export const Pizza = mongoose.model("Pizza", pizzaSchema);
