import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value || "";
  const ispublicPath = path === "/login" || path === "/register";

  if (ispublicPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  
  if (!ispublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
