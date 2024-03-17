import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Client from "@/db/models/clientSchema";

import { tokenDataId } from "@/helper/tokenData";
connect();
const items_per_page = 7;
export async function GET(request: NextRequest) {
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;

  try {
    const user = await tokenDataId(request, true);
    const query = {
      adminId: user._id,
      // status: true,
    };
    const skip = (page - 1) * items_per_page;
    const countPromise = Client.countDocuments(query);
    const clientsPromise = Client.find(query).limit(items_per_page).skip(skip);
    const [count, clients] = await Promise.all([countPromise, clientsPromise]);
    const pageCount = count / items_per_page;
    console.log(count);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 401 }
      );
    }

    // if (userId !== tokenId || userRole !== "admin") {
    //   return NextResponse.json(
    //     { message: "You are not authorized", success: false },
    //     { status: 401 }
    //   );
    // }
    return NextResponse.json({
      message: "all entries fetched",
      success: true,
      clients,
      pagination: {
        count,
        pageCount,
      },
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
