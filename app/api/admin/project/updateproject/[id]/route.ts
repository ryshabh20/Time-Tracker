import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/db/models/projectSchema";
import { tokenDataId } from "@/helper/tokenData";

connect();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await tokenDataId(request, true);
    const body = await request.json();

    const projectId = params.id;

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "You are not authorized",
          success: false,
        },
        { status: 401 }
      );
    }
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: {
          ...body,
        },
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        {
          message: "Project doesnot exists",
          success: false,
        },
        { status: 400 }
      );
    }
    const project = await updatedProject.save();

    return NextResponse.json(
      {
        message: "Project updated successfully",
        success: true,
        project,
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
