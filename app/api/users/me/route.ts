import { connect } from "@/db/dbConfig";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/db/models/userSchema";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await tokenDataId(request);
    if (!userId) {
      return NextResponse.json(
        {
          message: "Please Login First",
          success: "false",
        },
        {
          status: 400,
        }
      );
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    const { email, name, role, isTimer, team, currentTask, avatar } = user;
    const userInfo = { email, name, role, isTimer, team, currentTask, avatar };
    if (!user) {
      return NextResponse.json(
        {
          message: "User does not exist",
          sucess: "false",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User found",
      success: "true",
      data: userInfo,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: "false" },
      { status: 400 }
    );
  }
}
