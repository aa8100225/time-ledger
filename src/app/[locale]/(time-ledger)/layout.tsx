import Footer from "@/components/common/Footer";
import I18nLocaleSwitcher from "@/components/common/I18nLocaleSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative flex h-full min-h-screen flex-col overflow-y-auto  bg-gradient-to-b from-yellow-200 to-white">
        <header className="absolute right-4 top-2">
          <I18nLocaleSwitcher />
        </header>
        <main className="flex flex-grow flex-col items-center justify-center p-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
