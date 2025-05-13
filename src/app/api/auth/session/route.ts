import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) return NextResponse.json({ error: "Token is required" }, { status: 400 });

    // Calculate expiry - Firebase tokens typically last 1 hour
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    // Set the HTTP-only cookie manually using Set-Cookie header
    const cookie = serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: expiry,
      path: "/",
      sameSite: "strict",
    });

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
