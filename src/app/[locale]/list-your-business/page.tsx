import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPageAlternates } from "@/i18n/metadata";
import { isValidLocale } from "@/i18n/routing";

const WHATSAPP_NUMBER = "61468445803";
const EMAIL = "dekonunesss@gmail.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "listBusiness" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: getPageAlternates(locale, "/list-your-business"),
  };
}

export default async function ListYourBusinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "listBusiness" });
  const templateMessage = encodeURIComponent(t("templateMessage"));

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-zinc-400">{t("subtitle")}</p>

      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">{t("howItWorks")}</h2>
        <ol className="list-inside list-decimal space-y-2 text-zinc-300">
          <li>{t("step1")}</li>
          <li>{t("step2")}</li>
          <li>{t("step3")}</li>
        </ol>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${templateMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-green-600 py-4 text-center text-lg font-medium hover:bg-green-500"
        >
          💬 {t("whatsApp")}
        </a>
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent(t("emailSubject"))}&body=${templateMessage}`}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-4 text-center text-lg font-medium text-blue-400 hover:bg-zinc-700"
        >
          📧 {t("email")}
        </a>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">{t("recommendations")}</h2>
        <ul className="mt-4 space-y-2 text-zinc-300">
          <li>✅ {t("recommendation1")}</li>
          <li>✅ {t("recommendation2")}</li>
          <li>✅ {t("recommendation3")}</li>
          <li>✅ {t("recommendation4")}</li>
          <li>✅ {t("recommendation5")}</li>
          <li>✅ {t("recommendation6")}</li>
          <li>✅ {t("recommendation7")}</li>
          <li>✅ {t("recommendation8")}</li>
          <li>✅ {t("recommendation9")}</li>
        </ul>
      </div>
    </div>
  );
}
