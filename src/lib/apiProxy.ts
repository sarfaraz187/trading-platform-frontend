// lib/apiProxy.ts
import { NextRequest, NextResponse } from "next/server";

type ProxyOptions = {
  req: NextRequest;
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export async function proxyToBackend({ req, endpoint, method = "GET", body }: ProxyOptions) {
  const idToken = req.cookies.get("idToken")?.value;

  if (!idToken) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = backendRes.headers.get("content-type");
  const data = contentType?.includes("application/json") ? await backendRes.json() : await backendRes.text();

  return NextResponse.json(data, { status: backendRes.status });
}
