import { connect } from "@/db/dbConfig";
import Client from "@/db/models/clientSchema";
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
          message: "You are not authorized to delete this client",
          success: false,
        },
        { status: 401 }
      );
    }
    await Client.findByIdAndDelete(clientId);
    return NextResponse.json(
      {
        message: "Client deleted successfully",
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
