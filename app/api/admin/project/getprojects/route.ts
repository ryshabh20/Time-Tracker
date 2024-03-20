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

  try {
    const user = await tokenDataId(request, true);
    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 401 }
      );
    }

    const query = {
      adminId: user._id,
    };
    if (search) {
      const skip = (page - 1) * items_per_page;
      const countPromise = Project.countDocuments({
        adminId: user._id,

        projectname: { $regex: search, $options: "i" },
      });
      const projectsPromise = Project.find({
        adminId: user._id,
        projectname: { $regex: search, $options: "i" },
      })
        .limit(items_per_page)
        .skip(skip);
      const [count, projects] = await Promise.all([
        countPromise,
        projectsPromise,
      ]);
      const pageCount = count / items_per_page;
      console.log(
        "count",
        "itemsperpage",
        "pageCount",
        count,
        items_per_page,
        pageCount
      );
      return NextResponse.json({
        message: "all entries fetched",
        success: true,
        projects,
        pagination: {
          count,
          pageCount,
        },
      });
    }

    // Not necessary
    if (!page) {
      const projects = await Project.find(query);
      return NextResponse.json({
        message: "all entries fetched",
        success: true,
        projects,
      });
    }
    const skip = (page - 1) * items_per_page;
    const countPromise = Project.countDocuments(query);
    const projectsPromise = Project.find(query)
      .limit(items_per_page)
      .skip(skip);
    const [count, projects] = await Promise.all([
      countPromise,
      projectsPromise,
    ]);
    const pageCount = count / items_per_page;

    // if (userId !== tokenId || userRole !== "admin") {
    //   return NextResponse.json(
    //     { message: "You are not authorized", success: false },
    //     { status: 401 }
    //   );
    // }
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
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
