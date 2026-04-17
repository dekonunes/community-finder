"use client";

import { useState, useRef, useEffect } from "react";

export function ExpandableDescription({
  text,
  readMoreLabel,
  readLessLabel,
  fillSpace = false,
}: {
  text: string;
  readMoreLabel: string;
  readLessLabel: string;
  fillSpace?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // line-clamp makes scrollHeight === clientHeight in browsers,
    // so temporarily remove clamp to measure the full content height
    el.style.webkitLineClamp = "unset";
    el.style.display = "block";
    const fullHeight = el.scrollHeight;
    // Remove inline overrides so the CSS class clamp re-applies
    el.style.webkitLineClamp = "";
    el.style.display = "";
    setClamped(fullHeight > el.clientHeight);
  }, [text]);

  return (
    <div>
      <p
        ref={ref}
        className={`mt-2 text-sm text-zinc-300 whitespace-pre-line ${!expanded ? "line-clamp-5" : ""}`}
      >
        {text}
      </p>
      {clamped && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-xs font-medium text-blue-400 hover:text-blue-300"
        >
          {expanded ? readLessLabel : readMoreLabel}
        </button>
      )}
    </div>
  );
}
