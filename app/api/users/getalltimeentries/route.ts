import { connect } from "@/db/dbConfig";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import mongoose from "mongoose";
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

    console.log("timeEntries", timeEntries);
    const objectId = new mongoose.Types.ObjectId(userId);
    const duration = await TimeEntries.aggregate([
      {
        $match: {
          user_id: objectId,
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
