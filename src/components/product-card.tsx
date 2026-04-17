import Image from "next/image";
import {
  EmailIcon,
  InstagramIcon,
  PhoneIcon,
} from "@/components/contact-icons";
import { ExpandableDescription } from "@/components/expandable-description";
import { getProductCategoryBySlug, suburbs, type Product } from "@/lib/data";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";

const { basePath } = getSiteConfig(process.env);

function getSuburbName(slug: string): string {
  const match = suburbs.find((s) => s.slug === slug);
  if (match) return match.name;
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function instagramHandle(url: string): string {
  const cleaned = url
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, "")
    .replace(/\/$/, "");
  return `@${cleaned}`;
}

export function ProductCard({
  product,
  categoryLabel,
  viewProductLabel,
  readMoreLabel,
  readLessLabel,
}: {
  product: Product;
  categoryLabel?: string | null;
  viewProductLabel: string;
  readMoreLabel: string;
  readLessLabel: string;
}) {
  const category = getProductCategoryBySlug(product.category);

  return (
    <div className="relative ml-14 flex h-full flex-col transition-transform duration-300 ease-out hover:-translate-y-2">
      {product.image ? (
        <Image
          src={withBasePath(product.image, basePath)}
          alt={product.name}
          width={96}
          height={96}
          className="absolute -left-12 top-5 h-24 w-24 rounded-xl object-fill ring-2 ring-zinc-700 shadow-lg"
        />
      ) : (
        <div className="absolute -left-12 top-5 flex h-24 w-24 items-center justify-center rounded-xl bg-zinc-800 text-3xl ring-2 ring-zinc-700 shadow-lg">
          {category?.icon ?? "📦"}
        </div>
      )}
      <div className="flex flex-1 flex-col rounded-xl border border-zinc-800 bg-zinc-900 py-5 pr-5 pl-16">
        <div className="min-w-0">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">
            {category?.icon} {categoryLabel ?? null}
          </p>
        </div>
        <ExpandableDescription
          text={product.description}
          readMoreLabel={readMoreLabel}
          readLessLabel={readLessLabel}
        />
        {product.price && (
          <p className="mt-2 text-sm font-medium text-emerald-400">
            {product.price}
          </p>
        )}
        <div className="mt-auto pt-3">
          {product.suburb && (
            <p className="text-sm text-zinc-400">
              📍 {getSuburbName(product.suburb)}
            </p>
          )}
          {(product.phone || product.email || product.instagram) && (
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              {product.phone && (
                <a
                  href={`tel:${product.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-blue-400 hover:underline"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  {product.phone}
                </a>
              )}
              {product.email && (
                <a
                  href={`mailto:${product.email}`}
                  className="flex min-w-0 items-center gap-2 text-blue-400 hover:underline"
                >
                  <EmailIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{product.email}</span>
                </a>
              )}
              {product.instagram && (
                <a
                  href={product.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={instagramHandle(product.instagram)}
                  aria-label={instagramHandle(product.instagram)}
                  className="text-pink-400 hover:text-pink-300"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
            </div>
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
    </div>
  );
}
