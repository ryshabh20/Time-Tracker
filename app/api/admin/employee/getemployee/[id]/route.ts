import { connect } from "@/db/dbConfig";

import Employee from "@/db/models/employeeSchema";
import { tokenDataId } from "@/helper/tokenData";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await tokenDataId(request, true);
    const employeeId = params.id;
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Please login to access this account ",
          success: true,
        },
        { status: 401 }
      );
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return NextResponse.json(
        {
          message: "Employee does not exist",
          success: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Employee fetched successfully",
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
