import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  type Community,
  type Provider,
  getProviderSuburbsDisplay,
} from "@/lib/data";
import { getSiteConfig, withBasePath } from "@/lib/site-config.mjs";
import { Badge } from "@/components/ui/badge";
import { EmailButton } from "@/components/copy-email-button";

const { basePath } = getSiteConfig(process.env);

function InstagramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.88 1.75a1.12 1.12 0 1 1 0 2.25 1.12 1.12 0 0 1 0-2.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
    </svg>
  );
}

function GlobeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function PhoneIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l1.92-1.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
    </svg>
  );
}

export async function ProviderDetail({
  provider,
  community,
}: {
  provider: Provider;
  community: Community | undefined;
}) {
  const t = await getTranslations("provider");
  const categoriesT = await getTranslations("categories");
  const communitiesT = await getTranslations("communities");
  const languagesT = await getTranslations("languages");
  const commonT = await getTranslations("common");
  const initials = provider.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 px-6 py-8 text-center">
          {provider.photo ? (
            <Image
              src={withBasePath(provider.photo, basePath)}
              alt={provider.name}
              width={80}
              height={80}
              className="mx-auto h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">{initials}</div>
          )}
          <h1 className="mt-4 text-2xl font-bold">{provider.name}</h1>
          <p className="mt-1 text-zinc-400">
            {categoriesT(provider.service as never)} · {community?.flag} {community ? communitiesT(community.slug as never) : null}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {provider.languages.map((language) => (
              <Badge key={language} variant="secondary" className="capitalize">
                {languagesT(language as never)}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-6 p-6">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">{t("about")}</h2>
            <p className="mt-2 leading-relaxed text-zinc-300">{provider.bio}</p>
          </div>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">{t("location")}</h2>
            <p className="mt-2 text-zinc-300">📍 {provider.address}</p>
            <p className="mt-1 text-sm text-zinc-500">{getProviderSuburbsDisplay(provider)}</p>
          </div>
          <div className="space-y-3">
            {provider.phone && (
              <a href={`tel:${provider.phone}`} className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-500">
                <PhoneIcon className="h-5 w-5" /> {provider.phone}
              </a>
            )}
            {(provider.email || provider.website || provider.instagram) && (
              <div className="flex gap-3">
                {provider.email && <EmailButton email={provider.email} variant="icon-button" />}
                {provider.website && (
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" title={commonT("website")} className="flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-blue-400 hover:bg-zinc-700">
                    <GlobeIcon className="h-5 w-5" />
                  </a>
                )}
                {provider.instagram && (
                  <a href={provider.instagram} target="_blank" rel="noopener noreferrer" title={commonT("instagram")} className="flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-pink-400 hover:bg-zinc-700">
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
