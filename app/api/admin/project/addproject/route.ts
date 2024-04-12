import { connect } from "@/db/dbConfig";
import Project from "@/db/models/projectSchema";
import { tokenDataId } from "@/helper/tokenData";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { hoursConsumed, hoursAlloted } = body;

  const calculatedHoursLeft = hoursAlloted - hoursConsumed;
  try {
    const user = await tokenDataId(request, true);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Only an admin can create a project",
          success: "true",
        },
        { status: 401 }
      );
    }
    const newProject = await new Project({
      ...body,
      adminId: user._id,
      hoursLeft: calculatedHoursLeft,
    });

    const savedProject = await newProject.save();
    return NextResponse.json(
      {
        message: "Project created successfully",
        success: true,
        savedProject,
      },
      { status: 200 }
    );
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
