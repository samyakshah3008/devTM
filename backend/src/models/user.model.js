import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [3, "length must be at least 3 characters long."],
      maxLength: [30, "length cannot exceed 30 characters."],
    },
    firstName: {
      type: String,
      required: [true, "First Name is required."],
      trim: true,
      maxLength: [50, "first name cannot exceed 50 chars"],
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: [50, "last name cannot exceed 50 chars"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minLength: [6, "A strong password must be of 6 chars at least"],
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
