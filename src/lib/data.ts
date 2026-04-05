import categoriesData from "../../data/categories.json";
import communitiesData from "../../data/communities.json";
import suburbsData from "../../data/suburbs.json";
import providersData from "../../data/providers.json";
import eventsData from "../../data/events.json";

export type Provider = {
  slug: string;
  name: string;
  service: string;
  country: string;
  languages: string[];
  suburb: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  bio: string;
  address: string;
  photo: string | null;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
};

export type Community = {
  slug: string;
  name: string;
  country: string;
  flag: string;
  languages: string[];
};

export type Suburb = {
  slug: string;
  name: string;
};

export type CommunityEvent = {
  slug: string;
  title: string;
  community: string;
  date: string;
  location: string;
  description: string;
  link: string;
};

export const categories: Category[] = categoriesData;
export const communities: Community[] = communitiesData;
export const suburbs: Suburb[] = suburbsData;
export const providers: Provider[] = providersData;
export const events: CommunityEvent[] = eventsData;

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug);
}

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProvidersByCommunity(communitySlug: string): Provider[] {
  return providers.filter((p) => p.country === communitySlug);
}

export function getUpcomingEvents(communitySlug?: string): CommunityEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return events
    .filter((e) => e.date >= today)
    .filter((e) => !communitySlug || e.community === communitySlug)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getAllLanguages(): string[] {
  const langs = new Set<string>();
  providers.forEach((p) => p.languages.forEach((l) => langs.add(l)));
  return Array.from(langs).sort();
}
