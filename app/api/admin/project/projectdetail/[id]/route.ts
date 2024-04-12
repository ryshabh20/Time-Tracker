import { connect } from "@/db/dbConfig";
import Employee from "@/db/models/employeeSchema";
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
    const employee = Employee.find({});
    const projectDetailsPromise = Project.find({ _id: params.id });
    const projectId = new mongoose.Types.ObjectId(params.id);
    const groupedTimeEntriesPromise = TimeEntries.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $match: {
          project_id: projectId,
          end_time: { $exists: true },
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
          entries: { $addToSet: "$$ROOT" },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    const durationPromise = TimeEntries.aggregate([
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
        },
      },
    ]);

    const [groupedTimeEntries, duration, projectDetails] = await Promise.all([
      groupedTimeEntriesPromise,
      durationPromise,

      projectDetailsPromise,
    ]);
    const timeEntry = await TimeEntries.find({
      project_id: params.id,
      end_time: { $exists: true },
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
        },
      },
    ]);
    return NextResponse.json(
      {
        message: "All entries fetched",
        groupedTimeEntries,
        projectDetails,
        duration,
        timeEntry,
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
