import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/dbConnecion";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      user: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.Token_Secret!, {
      expiresIn: "1d",
    });
    const res = NextResponse.json(
      {
        success: true,
        message: `welcome back ${user.username}`,
      },
      { status: 200 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
