import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

import { MiddlewareFactory } from "./types";

export const withHeaders: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com;
      style-src 'self' 'nonce-${nonce}' ;
      img-src 'self' https://www.googletagmanager.com blob: data:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
      connect-src 'self' https://www.googletagmanager.com;
  `
      .replace(/\s{2,}/g, " ")
      .trim();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);

    requestHeaders.set("Content-Security-Policy", cspHeader);

    const res = await next(request, _next);

    if (res) {
      res.headers.set("x-nonce", nonce);
      res.headers.set("x-content-type-options", "nosniff");
      res.headers.set("x-dns-prefetch-control", "off");
      res.headers.set("x-download-options", "noopen");
      res.headers.set("x-frame-options", "SAMEORIGIN");
      if (process.env.NODE_ENV === "production") {
        res.headers.set("Content-Security-Policy", cspHeader);
        res.headers.set("X-Content-Security-Policy", cspHeader); // old browser
      }
    }

    return res;
  };
};
