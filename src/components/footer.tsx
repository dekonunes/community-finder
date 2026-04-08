import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500">
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        <p className="mt-2">
          <Link href="/list-your-business" className="text-zinc-400 hover:text-white">
            {t("cta")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
