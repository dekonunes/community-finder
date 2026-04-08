import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-zinc-400">{t("description")}</p>
      <Link href="/" className="mt-4 text-blue-400 hover:underline">
        {t("back")}
      </Link>
    </div>
  );
}
