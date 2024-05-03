import { NextFetchEvent, NextRequest } from "next/server";

import { MiddlewareFactory } from "./types";

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    //  return NextResponse.redirect(url);
    //  return NextResponse.rewrite(url);

    return next(request, _next);
  };
};
