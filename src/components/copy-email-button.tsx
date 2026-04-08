"use client";

import { useCallback } from "react";

function EmailIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function EmailButton({ email, variant = "icon" }: { email: string; variant?: "icon" | "detail" }) {
  const handleClick = useCallback(() => {
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, [email]);

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex-1 cursor-pointer rounded-lg border border-zinc-700 bg-zinc-800 py-3 text-center text-blue-400 hover:bg-zinc-700"
      >
        📧 {email}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={email}
      className="cursor-pointer text-blue-400 hover:text-blue-300"
    >
      <EmailIcon className="h-4 w-4" />
    </button>
  );
}
