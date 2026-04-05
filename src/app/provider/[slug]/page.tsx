import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { providers, getProviderBySlug, getCommunityBySlug, getCategoryBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return {};
  const community = getCommunityBySlug(provider.country);
  const category = getCategoryBySlug(provider.service);
  return {
    title: `${provider.name} — ${category?.name} | Community Finder`,
    description: `${community?.name} ${category?.name?.toLowerCase()} in ${provider.suburb}. ${provider.bio}`,
  };
}

export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  const community = getCommunityBySlug(provider.country);
  const category = getCategoryBySlug(provider.service);
  const initials = provider.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 px-6 py-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">{initials}</div>
          <h1 className="mt-4 text-2xl font-bold">{provider.name}</h1>
          <p className="mt-1 text-zinc-400">{category?.name} · {community?.flag} {community?.name}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {provider.languages.map((lang) => (<Badge key={lang} variant="secondary" className="capitalize">{lang}</Badge>))}
          </div>
        </div>
        <div className="space-y-6 p-6">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">About</h2>
            <p className="mt-2 text-zinc-300 leading-relaxed">{provider.bio}</p>
          </div>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Location</h2>
            <p className="mt-2 text-zinc-300">📍 {provider.address}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${provider.phone}`} className="flex-1 rounded-lg bg-blue-600 py-3 text-center font-medium hover:bg-blue-500">📞 {provider.phone}</a>
            <a href={`mailto:${provider.email}`} className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-3 text-center text-blue-400 hover:bg-zinc-700">📧 Email</a>
            {provider.website && (
              <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-3 text-center text-blue-400 hover:bg-zinc-700">🌐 Website</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
