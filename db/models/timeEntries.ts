import mongoose from "mongoose";
import User from "./userSchema";
import Project from "./projectSchema";

const timeEntriesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      optional: true,
    },
    task: {
      type: String,
      optional: true,
    },
    duration: { type: Number, optional: true },
  },
  { timestamps: true }
);

const TimeEntries =
  mongoose.models.timeentries ||
  mongoose.model("timeentries", timeEntriesSchema);
export default TimeEntries;
