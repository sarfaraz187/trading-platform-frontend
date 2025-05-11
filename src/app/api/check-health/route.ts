import { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/apiProxy";

export async function GET(req: NextRequest) {
  return proxyToBackend({ req, endpoint: "/health" });
}
