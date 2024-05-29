import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "@/config/config";

export default getRequestConfig(async ({ locale }) => {
  const baseLocale = new Intl.Locale(locale).baseName;

  if (!locales.includes(baseLocale as any)) notFound();

  return {
    messages: (await import(`../messages/${baseLocale}.json`)).default,
  };
});
