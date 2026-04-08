import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsClient } from "@/components/products-client";

export const metadata: Metadata = {
  title: "Brazilian Products",
  description: "Discover books, music, food, art, and more from the Brazilian community across Australia.",
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsClient />
    </Suspense>
  );
}
