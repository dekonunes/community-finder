"use client";

import { useState } from "react";

type Tab = "providers" | "products" | "events";

export function HomeTabs({
  tabProviders,
  tabProducts,
  tabEvents,
  providersContent,
  productsContent,
  eventsContent,
}: {
  tabProviders: string;
  tabProducts: string;
  tabEvents: string;
  providersContent: React.ReactNode;
  productsContent: React.ReactNode;
  eventsContent: React.ReactNode;
}) {
  const [active, setActive] = useState<Tab>("providers");

  const tabs: { key: Tab; label: string }[] = [
    { key: "providers", label: tabProviders },
    { key: "products", label: tabProducts },
    { key: "events", label: tabEvents },
  ];

  return (
    <section className="mt-12">
      <div className="mb-6 flex gap-2 border-b border-zinc-800">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              active === tab.key
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {active === "providers" && providersContent}
      {active === "products" && productsContent}
      {active === "events" && eventsContent}
    </section>
  );
}
