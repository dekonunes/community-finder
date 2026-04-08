import Image from "next/image";
import { getCommunityBySlug, getProductCategoryBySlug, type Product } from "@/lib/data";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";

const { basePath } = getSiteConfig(process.env);

export function ProductCard({
  product,
  categoryLabel,
  viewProductLabel,
}: {
  product: Product;
  categoryLabel?: string | null;
  viewProductLabel: string;
}) {
  const community = getCommunityBySlug(product.community);
  const category = getProductCategoryBySlug(product.category);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      {product.image && (
        <div className="relative aspect-[3/4] w-full bg-zinc-800">
          <Image
            src={withBasePath(product.image, basePath)}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">
              {category?.icon} {categoryLabel ?? null}
            </p>
          </div>
          {community && <span className="shrink-0 text-xl">{community.flag}</span>}
        </div>
        <p className="mt-2 text-sm text-zinc-300">{product.description}</p>
        {product.price && (
          <p className="mt-2 text-sm font-medium text-emerald-400">{product.price}</p>
        )}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500"
        >
          {viewProductLabel}
        </a>
      </div>
    </div>
  );
}
