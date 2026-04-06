import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Community Finder. Sydney, Australia.</p>
        <p className="mt-2">
          <Link href="/list-your-business" className="text-zinc-400 hover:text-white">
            List Your Business
          </Link>
        </p>
      </div>
    </footer>
  );
}
