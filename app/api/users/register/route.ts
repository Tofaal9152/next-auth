import { connect } from "@/database/dbConnecion";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, password } = body;
    // console.log(body);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { success: false, message: "user already exist" },
        { status: 400 }
      );
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({
      username,
      email,
      password: hashPassword,
    });

    return NextResponse.json(
      { success: true, message: "user registered successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
