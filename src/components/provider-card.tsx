import Image from "next/image";
import {
  getCategoryBySlug,
  getProviderSuburbsDisplay,
  type Provider,
} from "@/lib/data";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";
import { Badge } from "@/components/ui/badge";
import { EmailButton } from "@/components/copy-email-button";
import { ShareButton } from "@/components/share-button";
import { Link } from "@/i18n/navigation";

const { basePath } = getSiteConfig(process.env);

function PhoneIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13 19.79 19.79 0 0 1 1 4.18 2 2 0 0 1 2.96 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WebsiteIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function InstagramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.88 1.75a1.12 1.12 0 1 1 0 2.25 1.12 1.12 0 0 1 0-2.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
    </svg>
  );
}

export function ProviderCard({
  provider,
  categoryLabel,
  languageLabels,
  websiteLabel,
  instagramLabel,
  shareLabel,
  copiedLabel,
}: {
  provider: Provider;
  categoryLabel?: string | null;
  languageLabels: string[];
  websiteLabel: string;
  instagramLabel: string;
  shareLabel: string;
  copiedLabel: string;
}) {
  const category = getCategoryBySlug(provider.service);
  const initials = provider.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative ml-14 transition-transform duration-300 ease-out hover:-translate-y-2">
      {provider.photo ? (
        <Image
          src={withBasePath(provider.photo, basePath)}
          alt={provider.name}
          width={96}
          height={96}
          className="absolute -left-12 top-5 h-24 w-24 rounded-xl object-cover ring-2 ring-zinc-700 shadow-lg"
        />
      ) : (
        <div className="absolute -left-12 top-5 flex h-24 w-24 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold ring-2 ring-zinc-700 shadow-lg">
          {initials}
        </div>
      )}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-5 pr-5 pl-16">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-snug text-zinc-100">
            <Link
              href={`/provider/${provider.slug}`}
              className="hover:text-blue-400"
            >
              {provider.name}
            </Link>
          </h3>
          <p className="text-sm text-zinc-400">
            {category ? (categoryLabel ?? null) : null}
          </p>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {provider.languages.map((language, index) => (
            <Badge
              key={language}
              variant="secondary"
              className="text-xs capitalize"
            >
              {languageLabels[index]}
            </Badge>
          ))}
        </div>
        <p className="mt-2 text-sm text-zinc-400">
          📍 {getProviderSuburbsDisplay(provider)}
        </p>
        <div className="mt-3 flex items-center gap-3 text-sm">
          {provider.phone && (
            <a
              href={`tel:${provider.phone}`}
              className="flex items-center gap-2 text-blue-400 hover:underline"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              {provider.phone}
            </a>
          )}
          {provider.email && <EmailButton email={provider.email} />}
          {provider.website && (
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              title={websiteLabel}
              className="text-blue-400 hover:text-blue-300"
            >
              <WebsiteIcon className="h-4 w-4" />
            </a>
          )}
          {provider.instagram && (
            <a
              href={provider.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title={instagramLabel}
              className="text-pink-400 hover:text-pink-300"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          )}
          <ShareButton title={provider.name} shareLabel={shareLabel} copiedLabel={copiedLabel} />
        </div>
      </div>
    </div>
  );
}
