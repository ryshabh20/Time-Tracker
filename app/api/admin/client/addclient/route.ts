import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Client from "@/db/models/clientSchema";

import { tokenDataId } from "@/helper/tokenData";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = reqBody.user._id;
    const userRole = reqBody.user.role;
    const tokenId = await tokenDataId(request);
    console.log(tokenId, userRole, userId, reqBody);
    if (userId !== tokenId || userRole !== "admin") {
      return NextResponse.json(
        { message: "You are not authenticated" },
        { status: 401 }
      );
    }
    const { clientname, contactnumber, email, country } = reqBody.formData;
    console.log(clientname, contactnumber, email, country);
    const newClient = await new Client({
      clientname,
      contactnumber,
      email,
      country,
      creator: userId,
    });
    const savedClient = newClient.save();
    console.log("hey", newClient);

    return NextResponse.json(
      {
        message: "Client created successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
