import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import TimeEntries from "@/db/models/timeEntries";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("this is ", request);
    const newTimeEntry = await new TimeEntries({
      user_id: reqBody.user._id,
      start_time: new Date(),
      task: reqBody.task,
    });
    const userId = reqBody.user._id;
    const savedEntry = await newTimeEntry.save();
    return NextResponse.json({
      message: "time entry created success",
      success: true,
      savedEntry,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
