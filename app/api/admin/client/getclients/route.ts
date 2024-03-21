import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Client from "@/db/models/clientSchema";

import { tokenDataId } from "@/helper/tokenData";
connect();

export async function GET(request: NextRequest) {
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  const search: string = request.nextUrl.searchParams.get("search") || "";
  const sort = request.nextUrl.searchParams.get("sort") || "clientname";
  const order = request.nextUrl.searchParams.get("order") || "asc";

  try {
    const user = await tokenDataId(request, true);
    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 401 }
      );
    }
    const query = {
      adminId: user._id,
      status: true,
    };
    const skip = (page - 1) * items_per_page;
    const countPromise = Client.countDocuments({
      adminId: user._id,
      status: true,
      clientname: { $regex: search, $options: "i" },
    });

    const clientsPromise = Client.find({
      adminId: user._id,
      status: true,
      clientname: { $regex: search, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(items_per_page)
      .skip(skip);
    const [count, clients] = await Promise.all([countPromise, clientsPromise]);
    const pageCount = count / items_per_page;

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
    console.log("error", error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
