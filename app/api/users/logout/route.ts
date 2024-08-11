import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest) {
  try {
    const res = NextResponse.json(
      { seccess: true, message: "Logged out successfully" },
      { status: 200 }
    );
    res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { seccess: false, error: error.message },
      { status: 500 }
    );
  }
}
