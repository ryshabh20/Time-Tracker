import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Client from "@/db/models/clientSchema";
import { tokenDataId } from "@/helper/tokenData";

connect();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await tokenDataId(request, true);
    const body = await request.json();

    const clientId = params.id;
    const updatedData = body.formData;

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          message: "You are not authorized",
          success: false,
        },
        { status: 401 }
      );
    }
    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
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
          message: "Client doesnot exists",
          success: false,
        },
        { status: 400 }
      );
    }
    const savedClient = updatedClient.save();
    return NextResponse.json(
      {
        message: "Client updated successfully",
        success: true,
        savedClient,
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
