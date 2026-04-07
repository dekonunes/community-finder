import test from "node:test";
import assert from "node:assert/strict";

import categories from "../data/categories.json" with { type: "json" };
import communities from "../data/communities.json" with { type: "json" };
import events from "../data/events.json" with { type: "json" };
import products from "../data/products.json" with { type: "json" };
import providers from "../data/providers.json" with { type: "json" };

test("only the Brazilian community remains in the dataset", () => {
  assert.deepEqual(
    communities.map((community) => community.slug),
    ["brazil"],
  );

  assert.ok(events.every((event) => event.community === "brazil"));
  assert.ok(products.every((product) => product.community === "brazil"));
  assert.ok(providers.every((provider) => provider.country === "brazil"));
});

test("providers keep Portuguese and English as available languages", () => {
  const languages = [...new Set(providers.flatMap((provider) => provider.languages))].sort();

  assert.deepEqual(languages, ["english", "portuguese"]);
});

test("service categories only include services that have providers", () => {
  const providerServiceSlugs = new Set(providers.map((provider) => provider.service));

  assert.ok(categories.every((category) => providerServiceSlugs.has(category.slug)));
});

test("lawyer service is available with the New Alliance Migration provider", () => {
  const lawyerCategory = categories.find((category) => category.slug === "lawyer");
  const provider = providers.find((entry) => entry.slug === "new-alliance-migration");

  assert.deepEqual(lawyerCategory, {
    slug: "lawyer",
    name: "Lawyers",
    icon: "⚖️",
  });

  assert.deepEqual(provider, {
    slug: "new-alliance-migration",
    name: "New Alliance Migration",
    service: "lawyer",
    country: "brazil",
    languages: ["portuguese", "english"],
    suburb: "sydney-cbd",
    phone: "+61 424 688 763",
    email: "isa.andrade@newalliancemigration.com",
    website: "https://newalliance-landpage.vercel.app/",
    bio: "New Alliance Migration is led by Isa Andrade, a dedicated and registered immigration law consultant with over 10 years of experience helping individuals and families navigate the complexities of Australian migration law. Isa combines deep legal expertise with a genuine passion for her clients' success - guiding them through every step of their visa journey with clarity, care, and determination.",
    address: "Sydney CBD, NSW",
    photo: null,
    instagram: null,
  });
});
