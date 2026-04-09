import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductsClient } from "@/components/products-client";
import { getPageAlternates, getPageOpenGraph } from "@/i18n/metadata";
import { isValidLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "products" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: getPageAlternates(locale, "/products"),
    openGraph: getPageOpenGraph(locale, {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      pathname: "/products",
    }),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Suspense>
      <ProductsClient />
    </Suspense>
  );
}
