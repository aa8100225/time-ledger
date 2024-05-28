import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <html lang="en">
        <body>
          <div className="relative flex h-full min-h-screen flex-col overflow-y-auto  bg-green-100">
            <main className="flex min-h-screen flex-col items-center justify-center ">
              <div className="relative mx-auto mb-4 w-full max-w-xs">
                <Image
                  src="/images/not-found.jpeg"
                  alt="not-found"
                  layout="responsive"
                  width={300}
                  height={300}
                  objectFit="cover"
                  priority={true}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 rounded-lg border-4 border-green-100 blur-[20px]"></div>
              </div>
              <div className="text-center">
                <h2 className="mb-2 text-4xl font-bold">404 Page Not Found</h2>
                <p className="mb-2">
                  Sorry, the page you are looking for does not exist.
                </p>
                <Link className="block w-full" href="/">
                  <div className="mt-4 inline-block rounded bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-600">
                    Back Home
                  </div>
                </Link>
              </div>
            </main>
          </div>
        </body>
      </html>
    </>
  );
}
