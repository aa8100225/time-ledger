import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./types";
import { notFound } from "next/navigation";
import {
  locales,
  defaultLocale,
  baseAllowedPaths,
  Locale,
} from "@/config/config";

const createAllowedPaths = (
  locales: readonly string[],
  basePaths: readonly string[]
): string[] => {
  const paths: string[] = locales.flatMap((lang) =>
    basePaths.map((path) => {
      const cleanedPath = path.startsWith("/") ? path : `/${path}`;
      return cleanedPath === "/" ? `/${lang}` : `/${lang}${cleanedPath}`;
    })
  );

  paths.push(...basePaths);
  return paths;
};

const allowedPaths = createAllowedPaths([...locales], [...baseAllowedPaths]);

const isNotFoundPath = (pathname: string) => {
  return pathname.includes("/not-found");
};

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    const [, locale, ...segments] = pathname.split("/");

    if (!isNotFoundPath(pathname) && !allowedPaths.includes(pathname)) {
      const absoluteURL = new URL(
        `/${!locale || !locales.includes(locale as Locale) ? defaultLocale : locale}/not-found`,
        request.nextUrl.origin
      );
      return NextResponse.redirect(absoluteURL);
    }
    return next(request, _next);
  };
};
