import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-zinc-400">Page not found</p>
      <Link href="/" className="mt-4 text-blue-400 hover:underline">
        Back to home
      </Link>
    </div>
  );
}
