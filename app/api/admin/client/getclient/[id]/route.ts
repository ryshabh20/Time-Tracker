import { connect } from "@/db/dbConfig";
import Client from "@/db/models/clientSchema";
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
    const client = await Client.findById(clientId);
    if (!client) {
      return NextResponse.json(
        {
          message: "Client does not exits",
          success: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Client fetched successfully",
        success: true,
        client,
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
