import { getTranslations } from "next-intl/server";

const WEBSITE_HELP_GMAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=dekonunesss@gmail.com&su=" +
  encodeURIComponent("Help my business website.");

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500">
        <p>
          <a
            href={WEBSITE_HELP_GMAIL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white"
          >
            {t("cta")}
          </a>
        </p>
        <p className="mt-2">{t("copyright", { year: new Date().getFullYear() })}</p>
        <p className="mt-4">
          <a
            href="https://buymeacoffee.com/dekonunessh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-[#FFDF00] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>
            {t("buyMeACoffee")}
          </a>
        </p>
      </div>
    </footer>
  );
}
