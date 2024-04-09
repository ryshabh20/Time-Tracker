import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/db/dbConfig";

import TimeEntries from "@/db/models/timeEntries";

import { tokenDataId } from "@/helper/tokenData";

connect();
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await tokenDataId(request);

    if (!userId) {
      return NextResponse.json(
        {
          message: "Please login first",
          success: "false",
        },
        { status: 401 }
      );
    }
    const timeEntry = await TimeEntries.findById(params.id);
    return NextResponse.json({
      message: "Entry successfully fetched",
      data: timeEntry,
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
        success: "false",
      },
      { status: 500 }
    );
  }
}
