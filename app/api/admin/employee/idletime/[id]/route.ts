import Employee from "@/db/models/employeeSchema";
import TimeEntries from "@/db/models/timeEntries";
import User from "@/db/models/userSchema";
import { tokenDataId } from "@/helper/tokenData";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  const search: string = request.nextUrl.searchParams.get("search") || "";
  const sort = request.nextUrl.searchParams.get("sort") || "employeename";
  const order = request.nextUrl.searchParams.get("order") || "asc";
  try {
    const user = await tokenDataId(request, true);
    const employeeId = params.id;
    console.log("employeeId", employeeId);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Please login to access this account ",
          success: true,
        },
        { status: 401 }
      );
    }

    const userId = await User.findOne({ employee: employeeId }).select("_id");

    if (!userId) {
      return NextResponse.json(
        {
          message: "Employee does not exist",
          success: false,
        },
        { status: 404 }
      );
    }
    const skip = (page - 1) * items_per_page;
    const durationPromise = TimeEntries.aggregate([
      {
        $match: {
          user_id: userId._id,
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

          // createdAt: { $first: "$createdAt" },
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    const countPromise = TimeEntries.aggregate([
      {
        $match: {
          user_id: userId._id,
          end_time: { $exists: true },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$start_time" } },
        },
      },
      {
        $count: "count",
      },
    ]);

    const [duration, finalCount] = await Promise.all([
      durationPromise,
      countPromise,
    ]);
    const count = finalCount[0].count;
    const pageCount = count / items_per_page;

    return NextResponse.json({
      message: "All Entries",
      success: true,
      duration,
      pagination: {
        count,
        pageCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
