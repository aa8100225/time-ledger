import { ReduxProvider } from "@/provider/reduxProvider";
import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    author: "SanCeltum",
    applicationName: "Time Ledger",
    generator: "Next.js",
    referrer: "no-referrer",
    robots: "index, follow",
    icons: {
      icon: "/images/favicon_io/favicon.ico",
      shortcut: "/images/favicon_io/favicon.ico",
      apple: "/images/favicon_io/apple-touch-icon.png",
    },
    alternates: {
      canonical: "http://localhost:3000",
      languages: {
        en: "http://localhost:3000/en",
        "zh-TW": "http://localhost:3000/zh-TW",
      },
    },
    category: "Community",
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: "http://localhost:3000",
      siteName: "Time Ledger",
      images: [
        {
          url: "http://localhost:3000/images/time-ledger.jpeg",
          width: 800,
          height: 600,
          alt: t("openGraph.images.alt"),
        },
      ],
      locale: {
        default: "en",
        "zh-TW": "zh-TW",
      },
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      site: "@your_twitter_handle",
      creator: "@your_twitter_handle",
      images: [
        {
          url: "http://localhost:3000/images/time-ledger.jpeg",
          alt: t("twitter.images.alt"),
        },
      ],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
