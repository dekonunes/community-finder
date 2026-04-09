"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { trackSearch } from "@/lib/analytics";

const PAGE_SIZE = 5;

type PagefindResult = {
  id: string;
  url: string;
  excerpt: string;
  meta: {
    title?: string;
    image?: string;
  };
  sub_results?: {
    title: string;
    url: string;
    excerpt: string;
  }[];
};

type PagefindInstance = {
  search: (query: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] }>;
  destroy: () => void;
};

export function PagefindSearch() {
  const t = useTranslations("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pagefindRef = useRef<PagefindInstance | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    async function loadPagefind() {
      try {
        // Pagefind outputs to /pagefind/ in the build output
        const pagefindPath = "/pagefind/pagefind.js";
        const pf = await import(/* webpackIgnore: true */ pagefindPath);
        pagefindRef.current = pf;
      } catch {
        // Pagefind not available (dev mode) — silently ignore
      }
    }
    loadPagefind();
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!pagefindRef.current || !searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setPage(1);
    try {
      const search = await pagefindRef.current.search(searchQuery);
      const data = await Promise.all(
        search.results.map((r) => r.data())
      );
      setResults(data);
    } catch {
      setResults([]);
    }
    setIsLoading(false);
  }, []);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const paginatedResults = useMemo(
    () => results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [results, page],
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(value);
      if (value.trim()) trackSearch(value.trim());
    }, 200);
  }

  return (
    <div className="mb-6">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={t("textSearchPlaceholder")}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {query.trim() && (
        <div className="mt-4">
          {isLoading ? (
            <p className="text-sm text-zinc-500">{t("searching")}</p>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-zinc-400">
                {t("textResults", { count: results.length })}
              </p>
              {paginatedResults.map((result) => (
                <a
                  key={result.id}
                  href={result.url}
                  className="block rounded-lg border border-zinc-800 bg-zinc-900 p-3 hover:border-zinc-600"
                >
                  <p className="font-medium text-blue-400">
                    {result.meta.title}
                  </p>
                  <p
                    className="mt-1 text-sm text-zinc-400 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                </a>
              ))}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page <= 1}
                    className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t("pagination.previous")}
                  </button>
                  <span className="text-sm text-zinc-400">
                    {t("pagination.page", { current: page, total: totalPages })}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages}
                    className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t("pagination.next")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">{t("textNoResults")}</p>
          )}
        </div>
      )}
    </div>
  );
}
