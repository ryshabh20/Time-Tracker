import TimeEntries from "@/db/models/timeEntries";
import User from "@/db/models/userSchema";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  let order: any = request.nextUrl.searchParams.get("order");
  let search: any = request.nextUrl.searchParams.get("search") || "";
  if (search === "Invalid Date") {
    search = "";
  } else {
    console.log(search);
  }

  if (order === "asc") {
    console.log("asc");
    order = 1;
  }
  if (order === "desc") {
    console.log("desc");
    order = -1;
  }

  if (order !== "asc" && order !== "desc" && order !== -1 && order !== 1) {
    order = 1;
  }

  try {
    const user = await tokenDataId(request, true);
    const employeeId = params.id;
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
        },
      },
      {
        $match: {
          _id: { $regex: search },
        },
      },

      {
        $sort: {
          _id: order,
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
        $match: {
          _id: { $regex: search },
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

    const count = finalCount[0]?.count;

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
    console.log(error.message);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
