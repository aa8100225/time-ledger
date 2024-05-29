import { MiddlewareFactory } from "./types";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/config/config";

const intlMiddleware = createIntlMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
});

export const withInternationalization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    await next(request, _next);
    return intlMiddleware(request);
  };
};
