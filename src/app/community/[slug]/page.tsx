import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { communities, getCommunityBySlug, getProvidersByCommunity, getUpcomingEvents, getCategoryBySlug } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
import { EventCard } from "@/components/event-card";

export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) return {};
  return {
    title: `${community.name} Community Sydney — Services & Events | Community Finder`,
    description: `Find ${community.name} GPs, accountants, lawyers, migration agents, childcare, and restaurants in Sydney.`,
  };
}

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const community = getCommunityBySlug(slug);
  if (!community) notFound();

  const communityProviders = getProvidersByCommunity(slug);
  const upcomingEvents = getUpcomingEvents(slug);

  const grouped = communityProviders.reduce<Record<string, typeof communityProviders>>((acc, p) => {
    if (!acc[p.service]) acc[p.service] = [];
    acc[p.service].push(p);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{community.flag} {community.name} Community Sydney</h1>
        <p className="mt-2 text-zinc-400">Find {community.name} services and events in Sydney</p>
      </div>

      {communityProviders.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-zinc-400">No providers listed yet for the {community.name} community.</p>
          <Link href="/list-your-business" className="mt-2 inline-block text-blue-400 hover:underline">Be the first to list your business →</Link>
        </div>
      ) : (
        Object.entries(grouped).map(([serviceSlug, serviceProviders]) => {
          const category = getCategoryBySlug(serviceSlug);
          return (
            <section key={serviceSlug} className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">{category?.icon} {category?.name}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {serviceProviders.map((p) => (<ProviderCard key={p.slug} provider={p} />))}
              </div>
            </section>
          );
        })
      )}

      {upcomingEvents.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Upcoming Events</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((e) => (<EventCard key={e.slug} event={e} />))}
          </div>
        </section>
      )}
    </div>
  );
}
