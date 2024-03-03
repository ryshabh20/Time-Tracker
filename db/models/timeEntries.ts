import mongoose from "mongoose";

const timeEntriesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // project_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Task",
  //   optional: true,
  // },
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
});

const TimeEntries =
  mongoose.models.timeentries ||
  mongoose.model("timeentries", timeEntriesSchema);
export default TimeEntries;
