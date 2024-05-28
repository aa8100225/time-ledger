import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./types";
import { notFound } from "next/navigation";
const locales = ["en", "zh-TW"];
const baseAllowedPaths = ["/", "/others"];

const createAllowedPaths = (locales: string[], basePaths: string[]) => {
  const paths = locales.flatMap((lang) =>
    basePaths.map((path) => {
      const cleanedPath = path.startsWith("/") ? path : `/${path}`;
      return cleanedPath === "/" ? `/${lang}` : `/${lang}${cleanedPath}`;
    })
  );
  paths.push(...basePaths);
  return Array.from(new Set(paths)); // Ensure unique paths
};

const allowedPaths = createAllowedPaths(locales, baseAllowedPaths);

const isNotFoundPath = (pathname: string) => pathname.includes("/not-found");

const getLocale = (
  pathname: string,
  locales: string[],
  defaultLocale = "en"
) => {
  const [, locale] = pathname.split("/");
  return locales.includes(locale) ? locale : defaultLocale;
};

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;

    if (!isNotFoundPath(pathname) && !allowedPaths.includes(pathname)) {
      const locale = getLocale(pathname, locales);
      const absoluteURL = new URL(
        `/${locale}/not-found`,
        request.nextUrl.origin
      );
      return NextResponse.redirect(absoluteURL);
    }
    //  return NextResponse.redirect(url);
    //  return NextResponse.rewrite(url);

    return next(request, _next);
  };
};
