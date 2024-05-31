import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import { ReduxProvider } from "@/provider/reduxProvider";
import ToastProvider from "@/provider/toastProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { NextUIProvider } from "@nextui-org/react";
import { headers } from "next/headers";

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
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GA_ID ?? "cannot-get-id"}
      />
    </html>
  );
}
