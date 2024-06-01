import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import { ReduxProvider } from "@/provider/reduxProvider";
import ToastProvider from "@/provider/toastProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { NextUIProvider } from "@nextui-org/react";
import { headers } from "next/headers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();
  const nonce = headers().get("x-nonce");

  return (
    <html lang={locale}>
      <ReduxProvider>
        <body className={inter.className}>
          <ToastProvider>
            <NextIntlClientProvider messages={messages}>
              <NextUIProvider>{children}</NextUIProvider>
            </NextIntlClientProvider>
          </ToastProvider>
        </body>
      </ReduxProvider>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
        id="_next-ga"
        nonce={nonce ?? "undefined"}
      />
      <Script
        id="_next-ga-init"
        strategy="afterInteractive"
        nonce={nonce ?? "undefined"}
        dangerouslySetInnerHTML={{
          __html: `
          window['dataLayer'] = window['dataLayer'] || [];
          function gtag(){window['dataLayer'].push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
        }}
      />

      {/* <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GA_ID ?? "cannot-get-id"}
      /> */}
    </html>
  );
}
