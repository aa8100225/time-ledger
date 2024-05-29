import Footer from "@/components/common/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-full min-h-screen flex-col overflow-y-auto bg-gray-50">
        <main className="flex flex-grow flex-col items-center justify-center p-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
