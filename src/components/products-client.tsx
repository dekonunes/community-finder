"use client";

import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ProductCommunityFilter } from "@/components/product-community-filter";

export function ProductsClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const filteredProducts = getProducts(undefined, category);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Brazilian Products</h1>
      <p className="mb-6 text-zinc-400">Books, music, food, art, and more from the Brazilian community</p>
      <div className="mb-6">
        <ProductCommunityFilter currentCommunity={undefined} currentCategory={category} />
      </div>
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-zinc-400">No products found.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
