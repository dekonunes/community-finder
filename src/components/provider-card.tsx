import Link from "next/link";
import { getCommunityBySlug, getCategoryBySlug, type Provider } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function ProviderCard({ provider }: { provider: Provider }) {
  const community = getCommunityBySlug(provider.country);
  const category = getCategoryBySlug(provider.service);
  const initials = provider.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/provider/${provider.slug}`} className="font-semibold hover:text-blue-400">
                {provider.name}
              </Link>
              <p className="text-sm text-zinc-400">{category?.name}</p>
            </div>
            {community && <span className="text-xl">{community.flag}</span>}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {provider.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs capitalize">
                {lang}
              </Badge>
            ))}
          </div>
          <p className="mt-2 text-sm text-zinc-400">📍 {provider.suburb.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
          <div className="mt-3 flex gap-4 text-sm">
            {provider.phone && (
              <a href={`tel:${provider.phone}`} className="text-blue-400 hover:underline">📞 Call</a>
            )}
            {provider.email && (
              <a href={`mailto:${provider.email}`} className="text-blue-400 hover:underline">📧 Email</a>
            )}
            {provider.website && (
              <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">🌐 Website</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
