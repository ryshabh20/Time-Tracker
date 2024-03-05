import mongoose from "mongoose";
import Project from "./projectSchema";
import TimeEntries from "./timeEntries";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user must have a name"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    team: {
      type: String,
      enum: ["Developer", "Designing", "Sales"],
      default: "Developer",
    },
    isTimer: {
      type: Boolean,
      default: false,
    },
    timeentries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeEntries",
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;

//
