import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Client from "@/db/models/clientSchema";

import { tokenDataId } from "@/helper/tokenData";
connect();

export async function GET(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = reqBody.user._id;
    const userRole = reqBody.user.role;
    const tokenId = await tokenDataId(request);
    console.log(tokenId, userRole, userId, reqBody);
    if (userId !== tokenId || userRole !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 401 }
      );
    }
    const clients = await Client.find({
      adminId: userId,
    });
    console.log("clients", clients);
    console.log(clients);
    return NextResponse.json({
      message: "all entries fetched",
      success: true,
      clients,
    });
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
