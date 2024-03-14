import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/db/dbConfig";
import User from "@/db/models/userSchema";

export const tokenDataId = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("authtoken")?.value || "";
    const user: any = jwt.verify(token, process.env.SECRET!);

    const validuser = await ValidUser(user.id);

    return validuser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const ValidUser = async (id: string) => {
  const validuser = await User.findOne({ _id: id });
  return validuser._id.toString();
};

export const getSessionData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("authtoken")?.value || "";
    const user: any = jwt.verify(token, process.env.SECRET!);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
