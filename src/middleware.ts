import { stackMiddlewares } from "@/middlewares/stackMiddlewares";
import { withAuthorization } from "@/middlewares/withAuthorization";
import { withHeaders } from "@/middlewares/withHeaders";
import { withLogging } from "@/middlewares/withLogging";
import { withInternationalization } from "@/middlewares/withInternationalization";

export default stackMiddlewares([
  withAuthorization,
  withLogging,
  withHeaders,
  withInternationalization,
]);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/(en|zh)/:page*",
  ],
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
};
