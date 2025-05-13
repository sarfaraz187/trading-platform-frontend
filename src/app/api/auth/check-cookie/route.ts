import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const hasAuthCookie = cookieStore.has("authToken");

  return NextResponse.json({ authenticated: hasAuthCookie });
}
