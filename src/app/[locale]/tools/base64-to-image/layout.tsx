import Footer from "@/components/common/Footer";

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
