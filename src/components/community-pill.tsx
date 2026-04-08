import { getTranslations } from "next-intl/server";
import { type Community } from "@/lib/data";
import { Link } from "@/i18n/navigation";

export async function CommunityPill({ community }: { community: Community }) {
  const t = await getTranslations("communities");

  return (
    <Link
      href={`/community/${community.slug}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm hover:border-zinc-500 hover:bg-zinc-700"
    >
      <span>{community.flag}</span>
      <span>{t(community.slug as never)}</span>
    </Link>
  );
}
