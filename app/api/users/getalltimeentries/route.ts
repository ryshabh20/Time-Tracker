import mongoose from "mongoose";
import { connect } from "@/db/dbConfig";
import Project from "@/db/models/projectSchema";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const userId = await tokenDataId(request);
    if (!userId) {
      return NextResponse.json(
        {
          message: "Please login",
          success: false,
        },
        { status: 401 }
      );
    }
    const project = await Project.find({});
    const timeEntries = await TimeEntries.find({
      user_id: userId,
      end_time: { $exists: true },
      start_time: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    })
      .sort({
        createdAt: -1,
      })
      .populate("project_id", ["projectname"])
      .lean();

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
          entries: { $push: "$$ROOT" },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);

    return NextResponse.json({
      message: "All entries fetched",
      data: timeEntries,
      success: true,
      duration,
    });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 400 }
    );
  }
}
