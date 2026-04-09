import { Suspense } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";

export async function Nav() {
  const t = await getTranslations("nav");

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-1.5 text-lg font-bold">
          <Image src="/flag-32.webp" alt="Brazilian flag" width={24} height={24} className="hidden md:inline-block" />
          Brazuca Hubz
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Suspense
            fallback={<div aria-hidden="true" className="h-8 w-24 rounded-md border border-zinc-700 bg-zinc-900" />}
          >
            <LocaleSwitcher />
          </Suspense>
          <Link href="/search" className="text-zinc-400 hover:text-white">
            {t("services")}
          </Link>
          <Link href="/events" className="text-zinc-400 hover:text-white">
            {t("events")}
          </Link>
          <Link href="/products" className="text-zinc-400 hover:text-white">
            {t("products")}
          </Link>
          <Link
            href="/list-your-business"
            className="rounded-md bg-amber-500 px-3 py-1.5 text-center text-sm font-medium text-black hover:bg-amber-400"
          >
            {t("listBusiness")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
