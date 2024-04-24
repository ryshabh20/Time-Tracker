import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Employee from "@/db/models/employeeSchema";

import { tokenDataId } from "@/helper/tokenData";
import { SortOrder } from "mongoose";
connect();
export async function GET(request: NextRequest) {
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  const search: string = request.nextUrl.searchParams.get("search") || "";
  let sort = request.nextUrl.searchParams.get("sort") || "employeename";
  if (
    sort !== "employeename" &&
    sort !== "department" &&
    sort !== "designation"
  ) {
    sort = "employeename";
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
    const countPromise = Employee.countDocuments({
      createdBy: user._id,

      employeename: { $regex: search, $options: "i" },
    });

    const employeesPromise = Employee.find({
      createdBy: user._id,

      employeename: { $regex: search, $options: "i" },
    })
      .sort({ [sort]: order as SortOrder })
      .limit(items_per_page)
      .skip(skip);
    const [count, employees] = await Promise.all([
      countPromise,
      employeesPromise,
    ]);
    const pageCount = count / items_per_page;

    return NextResponse.json({
      message: "all employees fetched",
      success: true,
      employees,
      pagination: {
        count,
        pageCount,
      },
      role: user.role,
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
