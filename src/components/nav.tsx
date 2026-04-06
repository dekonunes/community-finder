import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          🌏 Community Finder
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/search" className="text-zinc-400 hover:text-white">
            Find Services
          </Link>
          <Link href="/events" className="text-zinc-400 hover:text-white">
            Events
          </Link>
          <Link
            href="/list-your-business"
            className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-black hover:bg-amber-400"
          >
            List Your Business
          </Link>
        </nav>
      </div>
    </header>
  );
}
