import User from "@/db/models/userSchema";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await tokenDataId(request, true);

    if (!user) {
      return NextResponse.json(
        {
          message: "You are not logged in ",
          success: false,
        },
        { status: 401 }
      );
    }
    const userData = await User.findById(user._id);
    if (!userData) {
      return NextResponse.json(
        {
          message: "Please login again",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "All screenshots",
        success: true,
        screenshots: userData.screenshots,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 400,
      }
    );
  }
}
