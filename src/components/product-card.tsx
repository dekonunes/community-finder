import Image from "next/image";
import { getProductCategoryBySlug, type Product } from "@/lib/data";
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
  const category = getProductCategoryBySlug(product.category);

  return (
    <div className="relative ml-14 transition-transform duration-300 ease-out hover:-translate-y-2">
      {product.image ? (
        <Image
          src={withBasePath(product.image, basePath)}
          alt={product.name}
          width={96}
          height={96}
          className="absolute -left-12 top-5 h-24 w-24 rounded-xl object-cover ring-2 ring-zinc-700 shadow-lg"
        />
      ) : (
        <div className="absolute -left-12 top-5 flex h-24 w-24 items-center justify-center rounded-xl bg-zinc-800 text-3xl ring-2 ring-zinc-700 shadow-lg">
          {category?.icon ?? "📦"}
        </div>
      )}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-5 pr-5 pl-16">
        <div className="min-w-0">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">
            {category?.icon} {categoryLabel ?? null}
          </p>
        </div>
        <p className="mt-2 text-sm text-zinc-300">{product.description}</p>
        {product.price && (
          <p className="mt-2 text-sm font-medium text-emerald-400">
            {product.price}
          </p>
        )}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          {viewProductLabel}
        </a>
      </div>
    </div>
  );
}
