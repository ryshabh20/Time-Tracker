import { connect } from "@/db/dbConfig";
import Employee from "@/db/models/employeeSchema";
import { tokenDataId } from "@/helper/tokenData";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const body = await request.json();

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

    console.log(body);
    const employeeemail = (body.employeename + body.code + "@tt.com")
      .split(" ")
      .join("");
    const employeepassword = (body.employeename + "1234").split(" ").join("");

    const newEmployee = await new Employee({
      ...body,
      createdBy: user._id,
      employeeemail,
      employeepassword,
    });

    const savedEmployee = await newEmployee.save();
    return NextResponse.json(
      {
        message: "Employee created successfully",
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
