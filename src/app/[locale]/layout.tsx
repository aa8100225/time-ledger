import { Inter } from "next/font/google";
import "../globals.css";
import { ReduxProvider } from "@/provider/reduxProvider";
import ToastProvider from "@/provider/toastProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
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
  return (
    <html lang={locale}>
      <ReduxProvider>
        <body className={inter.className}>
          <ToastProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ToastProvider>
        </body>
      </ReduxProvider>
    </html>
  );
}
