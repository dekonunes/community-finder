"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { communities } from "@/lib/data";
import { usePathname, useRouter } from "@/i18n/navigation";
import { trackFilter } from "@/lib/analytics";

export function EventCommunityFilter({ current }: { current?: string }) {
  const t = useTranslations("events");
  const communitiesT = useTranslations("communities");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateCommunity(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("community", value);
      trackFilter("community", value);
    } else {
      params.delete("community");
    }

    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  }

  return (
    <select
      value={current ?? ""}
      onChange={(e) => updateCommunity(e.target.value)}
      className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white"
    >
      <option value="">{t("filterAllCommunities")}</option>
      {communities.map((c) => (
        <option key={c.slug} value={c.slug}>{c.flag} {communitiesT(c.slug as never)}</option>
      ))}
    </select>
  );
}
