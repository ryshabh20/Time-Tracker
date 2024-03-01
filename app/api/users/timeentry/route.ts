import { connect } from "@/db/dbConfig";
import { tokenData } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";
import TimeEntries from "@/db/models/timeEntries";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("this is from timeentry", reqBody);
    console.log("this is the id of the user", reqBody.user.data.data.data);
    const newTimeEntry = await new TimeEntries({});
    return NextResponse.json({ message: "time entry created success" });
  } catch {}
}
