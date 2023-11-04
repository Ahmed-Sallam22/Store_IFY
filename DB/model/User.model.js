import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      unique: [true, "email must be unique value"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    email: {
      type: String,
      unique: [true, `Email is already Token`],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    forgetCode:{
      type:String,
      default:null
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
