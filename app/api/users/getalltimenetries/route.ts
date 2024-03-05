import { connect } from "@/db/dbConfig";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await tokenDataId(request);
    const timeEntries = await TimeEntries.find({ user_id: userId });
    return NextResponse.json({
      message: "All entries fetched",
      data: timeEntries,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
