import type { Metadata } from "next";
import type { Viewport } from "next";

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
    authors: [{ name: "SanCeltum" }],
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
      canonical: "https://time-ledger.vercel.app",
      languages: {
        en: "https://time-ledger.vercel.app/en",
        "zh-TW": "https://time-ledger.vercel.app/zh-TW",
      },
    },
    category: "Community",
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: "https://time-ledger.vercel.app",
      siteName: "Time Ledger",
      images: [
        {
          url: "https://time-ledger.vercel.app/images/time-ledger.jpeg",
          width: 800,
          height: 600,
          alt: t("openGraph.images.alt"),
        },
      ],
      locale: "en",
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
          url: "https://time-ledger.vercel.app/images/time-ledger.jpeg",
          alt: t("twitter.images.alt"),
        },
      ],
    },
  };
}

export function generateViewport(): Viewport {
  return {
    colorScheme: "light",
    width: "device-width",
    initialScale: 1.0,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
