import { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/api-proxy";

export async function POST(req: NextRequest) {
  return proxyToBackend({ req, endpoint: "/users/", method: "POST" });
}

export async function GET(req: NextRequest, userId: string) {
  console.log("GET userId", userId);
  return proxyToBackend({ req, endpoint: `/users/${userId}` });
}
