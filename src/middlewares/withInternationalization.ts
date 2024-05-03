import { MiddlewareFactory } from "./types";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localeDetection: false,
});

export const withInternationalization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    await next(request, _next);
    return intlMiddleware(request);
  };
};
