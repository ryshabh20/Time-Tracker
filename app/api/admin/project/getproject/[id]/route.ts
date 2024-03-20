import { connect } from "@/db/dbConfig";
import Project from "@/db/models/projectSchema";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await tokenDataId(request, true);
    const clientId = params.id;
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Please login to access this account ",
          success: true,
        },
        { status: 401 }
      );
    }
    const project = await Project.findById(clientId);
    if (!project) {
      return NextResponse.json(
        {
          message: "Project does not exits",
          success: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Project fetched successfully",
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
