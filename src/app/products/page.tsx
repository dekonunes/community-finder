import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsClient } from "@/components/products-client";

export const metadata: Metadata = {
  title: "Community Products | Community Finder",
  description: "Discover books, music, food, art, and more from multicultural communities in Sydney.",
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsClient />
    </Suspense>
  );
}
