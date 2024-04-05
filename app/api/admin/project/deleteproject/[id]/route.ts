import { connect } from "@/db/dbConfig";
import Project from "@/db/models/projectSchema";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await tokenDataId(request, true);
    const clientId = params.id;
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "You are not authorized to delete this project",
          success: false,
        },
        { status: 401 }
      );
    }
    await Project.findByIdAndDelete(clientId);
    return NextResponse.json(
      {
        message: "Project deleted successfully",
        success: true,
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
