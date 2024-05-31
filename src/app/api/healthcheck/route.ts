import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  const isSIGTERM = process.env.SIGTERM_RECEIVED === "true";
  const statusCode = isSIGTERM ? 503 : 200;
  const message = isSIGTERM ? "unhealthy" : "healthy";

  const response = JSON.stringify({
    statusCode: statusCode,
    message: message,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    Expires: "0",
    Pragma: "no-cache",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  };

  return new NextResponse(response, {
    status: statusCode,
    headers: headers,
  });
}
