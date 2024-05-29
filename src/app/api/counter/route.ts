import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   runtime: "experimental-edge",
// };

export const runtime = "experimental-edge";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("type") === "401") {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  } else if (req.nextUrl.searchParams.get("type") === "error") {
    return new NextResponse("Bad Request", {
      status: 400,
    });
  } else if (req.nextUrl.searchParams.get("type") === "timeout") {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return new NextResponse(
      JSON.stringify({
        message: "This should be timeout simulation, not implemented",
      }),
      { status: 200 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({
        randomNumber: Math.floor(Math.random() * (100 - 1) + 1),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export function POST(req: NextRequest) {
  return new NextResponse(
    JSON.stringify({
      randomNumber: Math.floor(Math.random() * (100 - 1) + 1),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
