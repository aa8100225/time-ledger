import { useLocale } from "next-intl";
import Link from "next/link";

export default function Page() {
  const locale = useLocale();
  return (
    <>
      <div className="w-full max-w-screen-lg">
        <Link href={`/${locale}`}>
          <h1 className="mb-4 text-2xl font-bold underline">
            About Time Ledger
          </h1>
        </Link>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Welcome</h2>
          <p className="mb-4">
            Welcome to Time Ledger, an advanced task management application
            designed to enhance your productivity. Inspired by the Pomodoro
            technique, our app allows you to set custom time intervals for your
            tasks and generate receipts upon completion, similar to collecting
            receipts for purchases.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">
            Feedback & Collaboration
          </h2>
          <p className="mb-4">
            If you have any feedback or suggestions for new features, or if you
            think the app could benefit from a UI overhaul ( I know it&apos;s
            quite basic ! ), feel free to reach out. I&apos;m also open to
            collaborations. You can contact me at{" "}
            <Link className="text-blue-500" href={"mailto:sanceltum@gmail.com"}>
              sanceltum@gmail.com
            </Link>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Additional Tools</h2>
          <p className="mb-4">
            Additionally, I occasionally sneak in some small tools under the
            &quot;Others&quot; section, such as base64-to-image converters.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Development Tip</h2>
          <p className="mb-4">
            A small complaint: when developing with Next.js 14, always deploy
            and test in a production environment, no matter how smooth the local
            builds and Docker deployments are. Often, things can go awry only in
            the final stages of deployment.
          </p>
        </section>
      </div>
    </>
  );
}
