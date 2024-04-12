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
    const user = await tokenDataId(request, true);
    const body = await request.json();
    const employeeId = params.id;
    const updatedData = body;

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "You are not authorized",
          success: false,
        },
        { status: 401 }
      );
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $set: {
          ...updatedData,
        },
      },
      { new: true }
    );
    if (!updatedEmployee) {
      return NextResponse.json(
        {
          message: "Employee doesnot exists",
          success: false,
        },
        { status: 400 }
      );
    }
    const employee = await updatedEmployee.save();

    return NextResponse.json(
      {
        message: "Employee updated successfully",
        success: true,
        employee,
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
