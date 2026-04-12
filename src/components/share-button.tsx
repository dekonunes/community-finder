"use client";

import { useState, useCallback } from "react";

function ShareIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ShareButton({
  title,
  variant = "icon",
  shareLabel,
  copiedLabel,
}: {
  title: string;
  variant?: "icon" | "icon-button";
  shareLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled or share failed — ignore
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [title]);

  if (variant === "icon-button") {
    return (
      <button
        type="button"
        onClick={handleShare}
        title={copied ? copiedLabel : shareLabel}
        className="flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 ml-auto"
      >
        {copied ? <CheckIcon className="h-5 w-5 text-green-400" /> : <ShareIcon className="h-5 w-5" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      title={copied ? copiedLabel : shareLabel}
      className="text-zinc-400 hover:text-zinc-200 ml-auto"
    >
      {copied ? <CheckIcon className="h-4 w-4 text-green-400" /> : <ShareIcon className="h-4 w-4" />}
    </button>
  );
}
