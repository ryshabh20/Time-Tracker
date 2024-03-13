import { connect } from "@/db/dbConfig";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/db/models/userSchema";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await tokenDataId(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
