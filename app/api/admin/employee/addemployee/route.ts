import { connect } from "@/db/dbConfig";
import Employee from "@/db/models/employeeSchema";
import User from "@/db/models/userSchema";
import { tokenDataId } from "@/helper/tokenData";
import bcryptjs from "bcryptjs";

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
    const email = (body.employeename + body.code + "@tt.com")
      .split(" ")
      .join("");

    const password = (body.employeename.toLowerCase().substring(0, 4) + "1234")
      .split(" ")
      .join("");
    console.log("body", body);
    console.log("email,password", email, password);
    const newEmployee = await new Employee({
      ...body,
      createdBy: user._id,
    });

    const UserPresent = await User.findOne({ email });

    if (UserPresent) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const savedEmployee = await newEmployee.save();

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await new User({
      name: body.employeename,
      email,
      password: hashedPassword,
      role: "employee",
      team: body.department,
      employee: savedEmployee._id,
    });
    const savedUser = newUser.save();

    return NextResponse.json({
      message: "Employee created successfully",
      success: true,
    });
  } catch (error: any) {
    // try {
    //   const user = await tokenDataId(request, true);
    //   if (!user || user.role !== "admin") {
    //     return NextResponse.json(
    //       {
    //         message: "Only an admin can create a project",
    //         success: "true",
    //       },
    //       { status: 401 }
    //     );
    //   }
    //   const email = (body.employeename + body.code + "@tt.com")
    //     .split(" ")
    //     .join("");
    //   const password = (body.employeename + "1234").split(" ").join("");
    //   const UserPresent = await User.findOne({ email });

    //   if (UserPresent) {
    //     return NextResponse.json(
    //       { error: "User already exists" },
    //       { status: 400 }
    //     );
    //   }
    //   const salt = await bcryptjs.genSalt(10);
    //   const hashedPassword = await bcryptjs.hash(password, salt);
    //   const newUser = await new User({
    //     name: body.employeename,
    //     email,
    //     password: hashedPassword,
    //     role: "employee",
    //     employee: {
    //       employeecode: body.code,
    //       designation: body.designation,
    //       department: body.department,
    //       technologies: body.technologies,
    //       permission: body.permission,
    //       createdBy: user._id,
    //     },
    //   });
    //   const savedUser = newUser.save();

    //   return NextResponse.json({
    //     message: "Employee created successfully",
    //     success: true,
    //     savedUser,
    //   });
    // }
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
