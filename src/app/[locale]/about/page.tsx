import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const t = useTranslations("notFound");
  const locale = useLocale();
  return (
    <>
      <div className="relative mx-auto mb-4 w-full max-w-xs">
        <Image
          src="/images/not-found.jpeg"
          alt="not-found"
          layout="responsive"
          width={300}
          height={300}
          objectFit="cover"
          priority={true}
          className="rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 rounded-lg border-4 border-green-100 blur-[20px]"></div>
      </div>
      <div className="text-center">
        <h2 className="mb-2 text-4xl font-bold">{t("pageTitle")}</h2>
        <p className="mb-2">{t("pageDescription")}</p>
        <Link className="block w-full" href={`/${locale}`}>
          <div className="mt-4 inline-block rounded bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-600">
            {t("backHomeButton")}
          </div>
        </Link>
      </div>
    </>
  );
}
