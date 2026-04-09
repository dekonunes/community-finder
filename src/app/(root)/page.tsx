"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_LOCALE = "pt-BR";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${DEFAULT_LOCALE}`);
  }, [router]);

  return <></>;
}
