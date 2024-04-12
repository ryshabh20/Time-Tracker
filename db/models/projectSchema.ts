import mongoose, { Mongoose } from "mongoose";
import User from "./userSchema";
import Client from "./clientSchema";
const projectSchema = new mongoose.Schema(
  {
    projectname: {
      type: String,
      required: [true, "Please provide a project name"],
      unique: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
      required: [true, "Project should have a client Id"],
    },
    clientname: {
      type: "String",
      required: true,
    },
    technology: {
      type: String,
      required: true,
    },
    hoursAlloted: {
      type: Number,
      required: true,
    },
    hoursConsumed: {
      type: Number,
      default: 0,
    },
    hoursLeft: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTeam: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;
