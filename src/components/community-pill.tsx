import Link from "next/link";
import { type Community } from "@/lib/data";

export function CommunityPill({ community }: { community: Community }) {
  return (
    <Link
      href={`/community/${community.slug}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm hover:border-zinc-500 hover:bg-zinc-700"
    >
      <span>{community.flag}</span>
      <span>{community.name}</span>
    </Link>
  );
}
