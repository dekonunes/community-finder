import test from "node:test";
import assert from "node:assert/strict";

import categories from "../data/categories.json" with { type: "json" };
import communities from "../data/communities.json" with { type: "json" };
import events from "../data/events.json" with { type: "json" };
import enMessages from "../messages/en.json" with { type: "json" };
import esMessages from "../messages/es.json" with { type: "json" };
import ptBrMessages from "../messages/pt-BR.json" with { type: "json" };
import products from "../data/products.json" with { type: "json" };
import providers from "../data/providers.json" with { type: "json" };

const localeMessages = {
  "pt-BR": ptBrMessages,
  en: enMessages,
  es: esMessages,
};

test("only the Brazilian community remains in the dataset", () => {
  assert.deepEqual(
    communities.map((community) => community.slug),
    ["brazil"],
  );

  assert.ok(events.every((event) => event.community === "brazil"));
  assert.ok(products.every((product) => product.community === "brazil"));
  assert.ok(providers.every((provider) => provider.country === "brazil"));
});

test("providers keep the expected language set", () => {
  const languages = [
    ...new Set(providers.flatMap((provider) => provider.languages)),
  ].sort();

  assert.deepEqual(languages, ["english", "portuguese", "spanish"]);
});

test("service categories only include services that have providers", () => {
  const providerServiceSlugs = new Set(
    providers.map((provider) => provider.service),
  );

  assert.ok(
    categories.every((category) => providerServiceSlugs.has(category.slug)),
  );
});

test("every service category has a localized label in every locale", () => {
  for (const [locale, messages] of Object.entries(localeMessages)) {
    const missingCategoryLabels = categories
      .filter((category) => !(category.slug in messages.categories))
      .map((category) => category.slug);

    assert.deepEqual(
      missingCategoryLabels,
      [],
      `Missing category labels for locale ${locale}: ${missingCategoryLabels.join(", ")}`,
    );
  }
});
