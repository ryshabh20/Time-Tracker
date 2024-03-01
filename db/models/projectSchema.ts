import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Project =
  mongoose.models.projects || mongoose.model("projects", projectSchema);
export default Project;
