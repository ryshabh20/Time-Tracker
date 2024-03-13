import { connect } from "@/db/dbConfig";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import { truncate } from "fs/promises";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await tokenDataId(request);

    const timeEntries = await TimeEntries.find({
      user_id: userId,
      end_time: { $exists: true },
      start_time: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    }).sort({
      createdAt: -1,
    });

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
          createdAt: { $first: "$createdAt" }, // Assuming createdAt field is available
        },
      },
      {
        $sort: {
          createdAt: 1, // Sort by createdAt field in ascending order
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
      success: true,
      duration,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 400 }
    );
  }
}
