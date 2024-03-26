import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import User from "@/db/models/userSchema";

export const tokenDataId = async (
  request: NextRequest,
  sendUser: boolean = false
) => {
  try {
    const token = request.cookies.get("authtoken")?.value || "";
    const user: any = jwt.verify(token, process.env.SECRET!);
    if (token && !user) {
      request.cookies.delete("authtoken");
    }

    const validuser = await ValidUser(user.id, sendUser);

    return validuser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const ValidUser = async (id: string, sendUser: boolean = false) => {
  const validuser = await User.findOne({ _id: id });
  if (!sendUser) {
    return validuser._id.toString();
  }
  if (sendUser) {
    return validuser;
  }
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
