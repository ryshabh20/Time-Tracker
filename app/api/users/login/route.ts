import { connect } from "@/db/dbConfig";
import User from "@/db/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, stayLoggedIn } = body;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Wrong Credentials" }, { status: 400 });
    }

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      team: user.team,
      role: user.role,
    };
    const token = jwt.sign(userData, process.env.SECRET!, {
      expiresIn: stayLoggedIn ? "7d" : "1d",
    });

    const res = NextResponse.json({
      message: "Login successful",
      success: true,
      data: userData,
    });

    res.cookies.set("authtoken", token, {
      httpOnly: true,
      maxAge: stayLoggedIn == "on" ? 2592000 : 604800,
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
