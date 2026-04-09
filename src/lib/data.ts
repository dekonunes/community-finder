import categoriesData from "../../data/categories.json";
import communitiesData from "../../data/communities.json";
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
  phone: string | null;
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

export type Product = {
  slug: string;
  name: string;
  category: string;
  community: string;
  description: string;
  price: string | null;
  link: string;
  image: string | null;
};

export type ProductCategory = {
  slug: string;
  name: string;
  icon: string;
};

export const categories: Category[] = categoriesData;
export const communities: Community[] = communitiesData;
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

export function getProviderSuburbs(provider: Provider): string[] {
  if (provider.suburbs && provider.suburbs.length > 0) {
    return provider.suburbs;
  }
  return provider.suburb ? [provider.suburb] : [];
}

export function getProviderSuburbsDisplay(provider: Provider): string {
  const suburbList = getProviderSuburbs(provider);
  return suburbList
    .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" / ");
}
