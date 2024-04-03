import mongoose from "mongoose";
import Project from "./projectSchema";
import TimeEntries from "./timeEntries";
import Employee from "./employeeSchema";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user must have a name"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "employee"],
      required: true,
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
      default: "HR",
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
    currentTask: {
      description: { type: String, default: "" },
      currentProject: {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        projectTask: { type: String, default: "" },
        projectName: { type: String, default: "" },
      },
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
    },
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
