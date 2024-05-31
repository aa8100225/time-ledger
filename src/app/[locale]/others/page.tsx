import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundCatchAll() {
  const t = useTranslations("notFound");
  const locale = useLocale();
  return (
    <>
      <div className="w-full max-w-screen-lg p-8">
        <Link href={`/${locale}`}>
          <h1 className="mb-4 text-2xl font-bold underline">Others</h1>
        </Link>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="max-h-64 overflow-y-auto rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-2 text-xl font-semibold">Tools</h2>
            <p className="mb-4 italic text-gray-500">
              Here you can find some useful tools.
            </p>
            <ul className="list-disc pl-5">
              <li>
                <Link
                  href={
                    locale
                      ? `/${locale}/tools/base64-to-image`
                      : "/tools/base64-to-image"
                  }
                  className="text-blue-500"
                >
                  Base64 to Image Converter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
