import mongoose, { Mongoose } from "mongoose";
import User from "./userSchema";
import { MdEmail } from "react-icons/md";
const employeeSchema = new mongoose.Schema({
  employeename: {
    type: String,
    required: true,
  },
  employeeemail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  employeepassword: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  permission: {
    type: [String],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Employee =
  mongoose.models.employees || mongoose.model("employees", employeeSchema);

export default Employee;
