export const locales = ["en", "zh-TW"] as const;
export const defaultLocale = "en" as const;
export const baseAllowedPaths = ["/", "/others"] as const;

export type Locale = (typeof locales)[number];
