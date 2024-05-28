import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

const locales: string[] = ["en", "zh-TW"];

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const formatLocale = (locale: string) => {
    return locale.replace("-", "_");
  };

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {locales.map((cur) => (
        <option key={cur} value={cur}>
          {t("locale", { locale: formatLocale(cur) })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
