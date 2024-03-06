import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,

  { params }: { params: { id: string } }
) {
  const userId = await tokenDataId(request);
  const entryId = params.id;
  console.log(entryId);
  const entryUser = await TimeEntries.findOne({ _id: entryId });
  if (!entryUser) {
    return NextResponse.json(
      { message: "Entry do not exists" },
      { status: 404 }
    );
  }
  if (userId !== entryUser.user_id.toString()) {
    console.log(userId, entryUser.user_id);
    return NextResponse.json(
      {
        message: "You can only delete your time entries",
      },
      { status: 401 }
    );
  }
  try {
    await TimeEntries.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Time Entry deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
