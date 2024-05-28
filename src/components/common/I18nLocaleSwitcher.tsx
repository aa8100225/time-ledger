"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useTransition } from "react";
import { Image } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/helper/navigation";
import { useParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";
interface IDropdownOption {
  value: string;
  label: string;
}

const locales: string[] = ["en", "zh-TW"];

const I18nLocaleSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const formatLocale = (locale: string) => {
    return locale.replace("-", "_");
  };

  const options: IDropdownOption[] = locales.map((item, index) => ({
    value: item,
    label: t("locale", { locale: formatLocale(item) }),
  }));

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(key: string | number) {
    const nextLocale = key;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant={"light"} className="h-6 w-6 min-w-0 p-0">
          <Image src="/images/global-localization.svg" alt="Locales" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select Locale"
        variant="light"
        defaultSelectedKeys={locales[0]}
        onAction={onSelectChange}
      >
        {options.map((option) => (
          <DropdownItem key={option.value}>
            <div className="flex w-full items-center justify-between">
              <span>{option.label}</span>
              {locale === option.value && (
                <FaCheck className="ml-2 text-green-500" />
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default I18nLocaleSwitcher;
