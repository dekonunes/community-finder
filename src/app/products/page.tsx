import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ProductCommunityFilter } from "@/components/product-community-filter";

export const metadata: Metadata = {
  title: "Community Products | Community Finder",
  description: "Discover books, music, food, art, and more from multicultural communities in Sydney.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ community?: string; category?: string }>;
}) {
  const params = await searchParams;
  const filteredProducts = getProducts(params.community, params.category);

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Community Products</h1>
      <p className="mb-6 text-zinc-400">Books, music, food, art, and more from our communities</p>
      <div className="mb-6">
        <ProductCommunityFilter currentCommunity={params.community} currentCategory={params.category} />
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
