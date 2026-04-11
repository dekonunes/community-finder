"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Map<Tab, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const tabs: { key: Tab; label: string }[] = [
    { key: "providers", label: tabProviders },
    { key: "products", label: tabProducts },
    { key: "events", label: tabEvents },
  ];

  const tabIndex = (key: Tab) => tabs.findIndex((t) => t.key === key);

  const measure = useCallback(
    (key: Tab, overshootPx = 0) => {
      const container = containerRef.current;
      const btn = btnRefs.current.get(key);
      if (!container || !btn) return null;
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      const left = bRect.left - cRect.left;
      return { left: left + Math.min(overshootPx, 0), width: bRect.width + Math.abs(overshootPx) };
    },
    [],
  );

  // Set initial position without animation
  useEffect(() => {
    const pos = measure(active);
    if (pos) setIndicator(pos);
  }, [active, measure]);

  const handleClick = (nextTab: Tab) => {
    if (nextTab === active) return;
    const direction = tabIndex(nextTab) > tabIndex(active) ? 1 : -1;
    const overshoot = direction * 4;

    // Phase 1: overshoot (slow, 400ms)
    const overshootPos = measure(nextTab, overshoot);
    if (overshootPos) {
      setIndicator(overshootPos);
    }

    // Phase 2: snap to exact position (fast, 150ms) after 400ms
    setTimeout(() => {
      const exact = measure(nextTab);
      if (exact) setIndicator(exact);
    }, 400);

    setActive(nextTab);
  };

  const [phase, setPhase] = useState<"slow" | "fast">("fast");

  // Track phase for transition speed
  const handleClickWrapped = (nextTab: Tab) => {
    if (nextTab === active) return;
    setPhase("slow");
    handleClick(nextTab);
    setTimeout(() => setPhase("fast"), 400);
  };

  return (
    <section className="mx-auto mt-12 max-w-6xl">
      <div ref={containerRef} className="relative mb-6 flex gap-1 border-b border-[#002776]">
        {/* Sliding indicator */}
        <div
          className="pointer-events-none absolute bottom-0 top-0 rounded-t-md bg-[#002776]"
          style={{
            left: indicator.left,
            width: indicator.width,
            transition: phase === "slow"
              ? "left 400ms ease-out, width 400ms ease-out"
              : "left 150ms ease-in, width 150ms ease-in",
          }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.key}
            ref={(el) => {
              if (el) btnRefs.current.set(tab.key, el);
            }}
            onClick={() => handleClickWrapped(tab.key)}
            className={`relative z-10 rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors ${
              active === tab.key ? "text-white" : "text-zinc-400 hover:text-zinc-200"
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
