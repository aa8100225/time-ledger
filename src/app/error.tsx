"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex h-full min-h-screen flex-col overflow-y-auto  bg-green-100">
          <main className="flex min-h-screen flex-col items-center justify-center ">
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
  );
}
