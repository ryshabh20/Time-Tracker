import TimeEntries from "@/db/models/timeEntries";
import User from "@/db/models/userSchema";
import { tokenDataId } from "@/helper/tokenData";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,

  { params }: { params: { id: string } }
) {
  try {
    const userId = await tokenDataId(request);
    const entryId = params.id;
    const entryUser = await TimeEntries.findOne({ _id: entryId });
    if (!entryUser) {
      return NextResponse.json(
        { message: "Entry does not exist" },
        { status: 404 }
      );
    }
    if (userId !== entryUser.user_id.toString()) {
      return NextResponse.json(
        {
          message: "You can only delete your time entries",
          success: false,
        },
        { status: 401 }
      );
    }
    await TimeEntries.findByIdAndDelete(params.id);
    const timeEntryIdtoDelete = new mongoose.Types.ObjectId(params.id);
    const response = await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { timeentries: timeEntryIdtoDelete },
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "Time Entry deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        sucess: false,
      },
      { status: 400 }
    );
  }
}
