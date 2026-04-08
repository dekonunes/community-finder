"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getProductCategoryBySlug, getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ProductCommunityFilter } from "@/components/product-community-filter";

export function ProductsClient() {
  const t = useTranslations("products");
  const categoriesT = useTranslations("productCategories");
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const filteredProducts = getProducts(undefined, category);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">{t("title")}</h1>
      <p className="mb-6 text-zinc-400">{t("subtitle")}</p>
      <div className="mb-6">
        <ProductCommunityFilter currentCommunity={undefined} currentCategory={category} />
      </div>
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-zinc-400">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const productCategory = getProductCategoryBySlug(product.category);

            return (
              <ProductCard
                key={product.slug}
                product={product}
                categoryLabel={productCategory ? categoriesT(productCategory.slug as never) : null}
                viewProductLabel={t("viewProduct")}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
