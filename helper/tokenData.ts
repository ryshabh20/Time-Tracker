import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const tokenData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("authtoken")?.value || "";
    const user: any = jwt.verify(token, process.env.SECRET!);
    return user.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
