import TimeEntries from "@/db/models/timeEntries";
import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { tokenDataId } from "@/helper/tokenData";
import User from "@/db/models/userSchema";
import { SortOrder } from "mongoose";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  const search: string = request.nextUrl.searchParams.get("search") || "";
  let sort = request.nextUrl.searchParams.get("sort") || "projectname";
  if (sort !== "projectname" && sort !== "clientname") {
    sort = "clientname";
  }
  let order = request.nextUrl.searchParams.get("order") || "asc";
  if (order !== "asc" && order !== "desc" && order !== "-1" && order !== "1") {
    order = "asc";
  }
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
    });
    const userId = await User.findOne({ employee: params.id }).select("_id");
    const employees = await TimeEntries.find({
      user_id: userId._id,
    })
      .populate("project_id")
      .sort({ [sort]: order as SortOrder })
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
