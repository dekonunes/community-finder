import Image from "next/image";
import { getProductCategoryBySlug, suburbs, type Product } from "@/lib/data";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";

const { basePath } = getSiteConfig(process.env);

function getSuburbName(slug: string): string {
  const match = suburbs.find((s) => s.slug === slug);
  if (match) return match.name;
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function instagramHandle(url: string): string {
  const cleaned = url.replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "");
  return `@${cleaned}`;
}

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
        <p className="mt-2 text-sm text-zinc-300 whitespace-pre-line">{product.description}</p>
        {product.price && (
          <p className="mt-2 text-sm font-medium text-emerald-400">
            {product.price}
          </p>
        )}
        {(product.suburb || product.phone || product.instagram) && (
          <ul className="mt-3 space-y-1 text-sm text-zinc-300">
            {product.suburb && (
              <li>📍 {getSuburbName(product.suburb)}</li>
            )}
            {product.phone && (
              <li>
                📞{" "}
                <a
                  href={`tel:${product.phone.replace(/\s+/g, "")}`}
                  className="text-zinc-200 hover:text-white"
                >
                  {product.phone}
                </a>
              </li>
            )}
            {product.instagram && (
              <li>
                📷{" "}
                <a
                  href={product.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:text-white"
                >
                  {instagramHandle(product.instagram)}
                </a>
              </li>
            )}
          </ul>
        )}
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            {viewProductLabel}
          </a>
        )}
      </div>
    </div>
  );
}
