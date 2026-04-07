import { Suspense } from "react";
import { SearchClient } from "@/components/search-client";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchClient />
    </Suspense>
  );
}
