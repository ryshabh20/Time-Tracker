import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Employee from "@/db/models/employeeSchema";
import { tokenDataId } from "@/helper/tokenData";

connect();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await tokenDataId(request);
    const body = await request.json();
    const user = body.user._id;
    const employeeId = params.id;
    const updatedData = body.formData;

    if (!userId || userId !== user) {
      return NextResponse.json(
        {
          message: "You are not authorized",
          success: false,
        },
        { status: 401 }
      );
    }
    const updatedClient = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $set: {
          ...updatedData,
        },
      },
      { new: true }
    );
    if (!updatedClient) {
      return NextResponse.json(
        {
          message: "Employee doesnot exists",
          success: false,
        },
        { status: 400 }
      );
    }
    const savedEmployee = updatedClient.save();
    console.log("savedEmployee", savedEmployee);
    return NextResponse.json(
      {
        message: "Employee updated successfully",
        success: true,
        savedEmployee,
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
