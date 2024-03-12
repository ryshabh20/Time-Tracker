import mongoose from "mongoose";
import Project from "./projectSchema";
const clientSchema = new mongoose.Schema({
  clientname: {
    type: String,
    required: [true, "client must have a name"],
  },
  contactnumber: {
    type: String,
    unique: true,
    required: [true, "client must have a phone number"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  country: {
    type: String,
    required: true,
  },
  projets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Client =
  mongoose.models.clients || mongoose.model("clients", clientSchema);
export default Client;
