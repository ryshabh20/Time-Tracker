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
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/time-tracker-4863d.appspot.com/o/9434619.jpg?alt=media&token=c3feb8c6-9dba-43a2-9956-7932b2bf0016",
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
    screenshots: [
      {
        type: String,
      },
    ],

    currentTask: {
      description: { type: String, default: "" },
      startedAt: { type: Date },
      currentProject: {
        projectId: { type: String, default: "" },
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
        ref: "projects",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
