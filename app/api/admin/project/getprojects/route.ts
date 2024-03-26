import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Project from "@/db/models/projectSchema";

import { tokenDataId } from "@/helper/tokenData";
connect();
export async function GET(request: NextRequest) {
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  const search: string = request.nextUrl.searchParams.get("search") || "";
  const sort = request.nextUrl.searchParams.get("sort") || "clientname";
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
    const countPromise = Project.countDocuments({
      adminId: user._id,
      status: true,
      projectname: { $regex: search, $options: "i" },
    });

    const projectsPromise = Project.find({
      adminId: user._id,

      projectname: { $regex: search, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(items_per_page)
      .skip(skip);
    const [count, projects] = await Promise.all([
      countPromise,
      projectsPromise,
    ]);
    const pageCount = count / items_per_page;

    return NextResponse.json({
      message: "all entries fetched",
      success: true,
      projects,
      pagination: {
        count,
        pageCount,
      },
    });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
