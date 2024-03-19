import { connect } from "@/db/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Client from "@/db/models/clientSchema";

import { tokenDataId } from "@/helper/tokenData";
connect();
export async function GET(request: NextRequest) {
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  console.log(items_per_page);
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  const search: string = request.nextUrl.searchParams.get("search") || "";

  try {
    const user = await tokenDataId(request, true);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 401 }
      );
    }

    const query = {
      adminId: user._id,
      status: true,
    };
    if (search) {
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
        .limit(items_per_page)
        .skip(skip);
      const [count, clients] = await Promise.all([
        countPromise,
        clientsPromise,
      ]);
      const pageCount = count / items_per_page;
      console.log(
        "count",
        "itemsperpage",
        "pageCount",
        count,
        items_per_page,
        pageCount
      );
      return NextResponse.json({
        message: "all entries fetched",
        success: true,
        clients,
        pagination: {
          count,
          pageCount,
        },
      });
    }
    if (!page) {
      const clients = await Client.find(query);
      return NextResponse.json({
        message: "all entries fetched",
        success: true,
        clients,
      });
    }
    const skip = (page - 1) * items_per_page;
    const countPromise = Client.countDocuments(query);
    const clientsPromise = Client.find(query).limit(items_per_page).skip(skip);
    const [count, clients] = await Promise.all([countPromise, clientsPromise]);
    const pageCount = count / items_per_page;

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
