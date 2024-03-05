import { connect } from "@/db/dbConfig";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await tokenDataId(request);
    const timeEntries = await TimeEntries.find({
      user_id: userId,
      end_time: { $exists: true },
    }).sort({
      createdAt: -1,
    });

    const duration = await TimeEntries.aggregate([
      {
        $match: {
          end_time: { $exists: true },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$start_time" } },
          totalDuration: {
            $sum: {
              $subtract: ["$end_time", "$start_time"],
            },
          },
        },
      },
    ]);
    // const timeEntries = await TimeEntries.aggregate([
    //   {
    //     $group: {
    //       _id: { $dateToString: { format: "%Y-%m-%d", date: "$start_time" } },
    //       entries: { $addToSet: "$$ROOT" }, // Add all documents to the 'entries' array
    //     },
    //   },
    // ]);
    return NextResponse.json({
      message: "All entries fetched",
      data: timeEntries,
      duration,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
