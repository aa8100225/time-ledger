import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { Pathnames } from "next-intl/navigation";

const defaultLocale = "en" as const;
const locales = ["en", "zh"] as const;

const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    zh: "/pathnames",
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
