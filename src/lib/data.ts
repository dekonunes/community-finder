import categoriesData from "../../data/categories.json";
import communitiesData from "../../data/communities.json";
import statesData from "../../data/states.json";
import suburbsData from "../../data/suburbs.json";
import providersData from "../../data/providers.json";
import eventsData from "../../data/events.json";
import productsData from "../../data/products.json";
import productCategoriesData from "../../data/product-categories.json";

export type Provider = {
  slug: string;
  name: string;
  service: string;
  country: string;
  languages: string[];
  suburb?: string;
  suburbs?: string[];
  states?: string[];
  phone: string[] | null;
  email: string | null;
  website: string | null;
  bio: string;
  address: string;
  photo: string | null;
  instagram: string | null;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
  parentCategory: string;
};

export type ParentCategory = {
  slug: string;
  name: string;
  icon: string;
};

export const parentCategories: ParentCategory[] = [
  { slug: "health-medical", name: "Health & Medical", icon: "🏥" },
  { slug: "mental-health", name: "Mental Health", icon: "🧠" },
  { slug: "body-wellness", name: "Body & Wellness", icon: "🧘" },
  { slug: "professional-services", name: "Professional Services", icon: "💼" },
];

export function getCategoriesByParent(parentSlug: string): Category[] {
  return categories.filter((c) => c.parentCategory === parentSlug);
}

export function getParentCategoryBySlug(slug: string): ParentCategory | undefined {
  return parentCategories.find((c) => c.slug === slug);
}

export function getParentCategoryForService(serviceSlug: string): ParentCategory | undefined {
  const category = getCategoryBySlug(serviceSlug);
  if (!category) return undefined;
  return getParentCategoryBySlug(category.parentCategory);
}

export type Community = {
  slug: string;
  name: string;
  country: string;
  flag: string;
  languages: string[];
};

export type State = {
  slug: string;
  name: string;
};

export type Suburb = {
  slug: string;
  name: string;
  state: string;
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

export type Product = {
  slug: string;
  name: string;
  category: string;
  community: string;
  description: string;
  price: string | null;
  link: string | null;
  image: string | null;
  phone?: string | null;
  email?: string | null;
  instagram?: string | null;
  suburb?: string | null;
};

export type ProductCategory = {
  slug: string;
  name: string;
  icon: string;
};

export const categories: Category[] = categoriesData;
export const communities: Community[] = communitiesData;
export const states: State[] = statesData;
export const suburbs: Suburb[] = suburbsData;
export const providers: Provider[] = providersData;
export const events: CommunityEvent[] = eventsData;
export const products: Product[] = productsData;
export const productCategories: ProductCategory[] = productCategoriesData;

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

export function getProductCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export function getAvailableProductCategories(communitySlug?: string): ProductCategory[] {
  const usedCategories = new Set(
    products
      .filter((product) => !communitySlug || product.community === communitySlug)
      .map((product) => product.category),
  );

  return productCategories.filter((category) => usedCategories.has(category.slug));
}

export function getProductsByCommunity(communitySlug: string): Product[] {
  return products.filter((p) => p.community === communitySlug);
}

export function getProducts(communitySlug?: string, categorySlug?: string): Product[] {
  return products
    .filter((p) => !communitySlug || p.community === communitySlug)
    .filter((p) => !categorySlug || p.category === categorySlug);
}

export function getAllLanguages(): string[] {
  const langs = new Set<string>();
  providers.forEach((p) => p.languages.forEach((l) => langs.add(l)));
  return Array.from(langs).sort();
}

export function getSuburbsForService(serviceSlug: string): Suburb[] {
  const suburbSlugs = new Set<string>();
  providers
    .filter((p) => p.service === serviceSlug)
    .forEach((p) => getProviderSuburbs(p).forEach((s) => suburbSlugs.add(s)));
  return suburbs.filter((s) => suburbSlugs.has(s.slug));
}

export function getProviderSuburbs(provider: Provider): string[] {
  if (provider.suburbs && provider.suburbs.length > 0) {
    return provider.suburbs;
  }
  return provider.suburb ? [provider.suburb] : [];
}

function getSuburbLabel(slug: string): string {
  const match = suburbs.find((s) => s.slug === slug);
  if (match) return match.name;
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getProviderSuburbsDisplay(provider: Provider): string {
  const suburbList = getProviderSuburbs(provider);
  return suburbList.map(getSuburbLabel).join(" / ");
}

export function getStatesWithProviders(): State[] {
  const stateSlugs = new Set<string>();
  providers.forEach((p) => (p.states ?? []).forEach((s) => { if (s !== "all") stateSlugs.add(s); }));
  return states.filter((s) => stateSlugs.has(s.slug));
}

export function getSuburbsForServiceAndState(
  serviceSlug: string | null,
  stateSlug: string | null,
): Suburb[] {
  let result = suburbs;

  if (serviceSlug) {
    const suburbSlugs = new Set<string>();
    providers
      .filter((p) => p.service === serviceSlug)
      .forEach((p) => getProviderSuburbs(p).forEach((s) => suburbSlugs.add(s)));
    result = result.filter((s) => suburbSlugs.has(s.slug));
  }

  if (stateSlug) {
    result = result.filter((s) => s.state === stateSlug || s.state === "all");
  }

  return result;
}
