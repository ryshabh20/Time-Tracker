import TimeEntries from "@/db/models/timeEntries";
import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { tokenDataId } from "@/helper/tokenData";
import User from "@/db/models/userSchema";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const user = await tokenDataId(request, true);
  // if (!user || user.role !== "admin") {
  //   return NextResponse.json(
  //     {
  //       message: "You are not authorized to access this route",
  //       status: false,
  //     },
  //     { status: 401 }
  //   );
  // }
  // const entries = await TimeEntries.find({ user_id: user._id })
  //   .populate("project_id")
  //   .exec();

  // return NextResponse.json(
  //   {
  //     message: "User time entries",
  //     status: true,
  //     entries,
  //   },
  //   { status: 200 }
  // );
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  const search: string = request.nextUrl.searchParams.get("search") || "";
  const sort = request.nextUrl.searchParams.get("sort") || "technologies";
  // const order = request.nextUrl.searchParams.get("order") === "asc" ? 1 : -1;
  const order = request.nextUrl.searchParams.get("order") || "asc";

  try {
    const user = await tokenDataId(request, true);
    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 401 }
      );
    }

    const skip = (page - 1) * items_per_page;
    const count = await TimeEntries.countDocuments({
      user_id: params.id,

      // technologies: { $regex: search, $options: "i" },
    });
    const userId = await User.findOne({ employee: params.id }).select("_id");
    console.log("userId", userId);
    const employees = await TimeEntries.find({
      user_id: userId._id,
    })
      .populate("project_id")
      .sort({ [sort]: order })
      .limit(items_per_page)
      .skip(skip);

    const pageCount = count / items_per_page;
    const filteredEmployees = employees.filter((entry: any) =>
      entry.project_id.technology.includes(search)
    );
    return NextResponse.json({
      message: "all entries fetched",
      success: true,
      employees: filteredEmployees,
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
