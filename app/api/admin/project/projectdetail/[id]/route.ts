import { connect } from "@/db/dbConfig";
import Project from "@/db/models/projectSchema";
import TimeEntries from "@/db/models/timeEntries";
import { tokenDataId } from "@/helper/tokenData";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await tokenDataId(request, true);
    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized", success: "false" },
        { status: 401 }
      );
    }
    const timeEntry = await TimeEntries.find({
      project_id: params.id,
    }).populate([
      {
        path: "project_id",
        select: ["projectname", "hoursLeft", "hoursAlloted", "hoursConsumed"],
      },
      {
        path: "user_id",
        select: ["name"],
        populate: {
          path: "employee",
          select: ["designation"],
        },
      },
    ]);
    const projectDetails = await Project.findById(params.id);

    const projectId = new mongoose.Types.ObjectId(params.id);
    const groupedTimeEntries = await TimeEntries.aggregate([
      {
        $match: {
          project_id: projectId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },

      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$start_time" } },
          entries: { $addToSet: "$$ROOT" }, // Add all documents to the 'entries' array
        },
      },
    ]);

    if (!timeEntry) {
      return NextResponse.json(
        {
          message: "No entries for that user",
          success: false,
        },
        { status: 404 }
      );
    }

    const duration = await TimeEntries.aggregate([
      {
        $match: {
          project_id: projectId,
          end_time: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$start_time" },
          },

          totalDuration: {
            $sum: {
              $subtract: ["$end_time", "$start_time"],
            },
          },
          entries: { $push: "$$ROOT" },

          // createdAt: { $first: "$createdAt" },
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);
    return NextResponse.json(
      {
        message: "All entries fetched",
        timeEntry,
        groupedTimeEntries,
        projectDetails,
        duration,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
        status: false,
      },
      { status: 400 }
    );
  }
}
