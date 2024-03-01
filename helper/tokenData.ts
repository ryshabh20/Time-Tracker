import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const tokenData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("authtoken")?.value || "";
    const user: any = jwt.verify(token, process.env.SECRET!);
    console.log(user);
    return user.id;
  } catch (error: any) {
    console.log("this is the error.message from tokenData.js", error.message);
    throw new Error(error.message);
  }
};
