import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { Pathnames } from "next-intl/navigation";
import { locales } from "@/config/config";

const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    "zh-TW": "/pathnames",
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
