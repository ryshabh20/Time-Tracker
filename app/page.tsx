import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full flex items-center justify-center py-12 md:py-24">
      <div className="container flex flex-col items-center gap-4 px-4 md:px-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Time Tracker
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Track your time and stay productive with this in-house time tracking
            app.
          </p>
        </div>
        <Link
          className="inline-flex p-4 text-md items-center justify-center rounded-md border border-gray-200 bg-blue-400 px-8  font-medium shadow-sm transition-colors text-white hover:bg-gray-100 hover:text-gray-900  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="/login"
        >
          Start Time Tracking
        </Link>
      </div>
    </section>
  );
}
