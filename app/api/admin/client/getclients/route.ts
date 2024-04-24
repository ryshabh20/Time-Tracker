import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { tokenDataId } from "@/helper/tokenData";
import { SortOrder } from "mongoose";
import Client from "@/db/models/clientSchema";
connect();
export async function GET(request: NextRequest) {
  const items_per_page: number =
    Number(request.nextUrl.searchParams.get("items")) || 7;
  const page: number = Number(request.nextUrl.searchParams.get("page")) || 1;
  const search: string = request.nextUrl.searchParams.get("search") || "";
  let sort = request.nextUrl.searchParams.get("sort") || "clientname";
  if (sort !== "clientname" && sort !== "email") {
    sort = "clientname";
  }
  let order = request.nextUrl.searchParams.get("order") || "asc";
  if (order !== "asc" && order !== "desc" && order !== "-1" && order !== "1") {
    order = "asc";
  }

  try {
    const user = await tokenDataId(request, true);
    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized", success: false },
        { status: 401 }
      );
    }

    const skip = (page - 1) * items_per_page;
    const countPromise = Client.countDocuments({
      clientname: { $regex: search, $options: "i" },
    });

    const clientsPromise = Client.find({
      clientname: { $regex: search, $options: "i" },
    })
      .sort({ [sort]: order as SortOrder })
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
      role: user.role,
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
