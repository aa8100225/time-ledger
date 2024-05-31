import Footer from "@/components/common/Footer";

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params) {
  return {
    description:
      "This tool is designed to effortlessly convert base64 encoded strings into images, supporting features like direct downloading and zoom-in previews. Ideal for extracting and transforming images from web elements, especially useful on sites that disable right-click functionality.",
    keywords:
      "base64 to image, image converter, download image, zoom image preview, extract images, disable right-click, image extraction tool, web image downloader",
    authors: [{ name: "SanCeltum" }],
    applicationName: "Time Ledger - Tool",
    generator: "Next.js",
    referrer: "no-referrer",
    robots: "index, follow",

    alternates: {
      canonical: "https://time-ledger.vercel.app/tools/base64-to-image",
      languages: {
        en: "https://time-ledger.vercel.app/tools/base64-to-image/en",
        "zh-TW": "https://time-ledger.vercel.app/tools/base64-to-image/zh-TW",
      },
    },
    category: "Tool",
    openGraph: {
      title:
        "Easily Convert Base64 to Pictures – Download & Preview Features Included",
      description:
        "This tool is designed to effortlessly convert base64 encoded strings into images, supporting features like direct downloading and zoom-in previews. Ideal for extracting and transforming images from web elements, especially useful on sites that disable right-click functionality.",
      url: "https://time-ledger.vercel.app/tools/base64-to-image",
      siteName: "Time Ledger - Tool",
      images: [
        {
          url: "https://time-ledger.vercel.app/images/tools-base64-to-image.png",
          width: 800,
          height: 600,
          alt: "tools-base64-to-image",
        },
      ],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Easily Convert Base64 to Pictures – Download & Preview Features Included",
      description:
        "This tool is designed to effortlessly convert base64 encoded strings into images, supporting features like direct downloading and zoom-in previews. Ideal for extracting and transforming images from web elements, especially useful on sites that disable right-click functionality.",
      site: "@your_twitter_handle",
      creator: "@your_twitter_handle",
      images: [
        {
          url: "https://time-ledger.vercel.app/images/tools-base64-to-image.png",
          alt: "tools-base64-to-image",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-full min-h-screen flex-col overflow-y-auto bg-pink-100">
        <main className="flex flex-grow flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
