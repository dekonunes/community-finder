const DEFAULT_SITE_URL = "https://dekonunes.github.io";

export function normalizeBasePath(basePath = "") {
  const trimmed = basePath.trim();

  if (!trimmed) {
    return "";
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

export function normalizeSiteUrl(siteUrl = DEFAULT_SITE_URL) {
  return (siteUrl || DEFAULT_SITE_URL).trim().replace(/\/+$/g, "");
}

export function getSiteConfig(env = process.env) {
  const basePath = normalizeBasePath(env.NEXT_PUBLIC_BASE_PATH);
  const siteOrigin = normalizeSiteUrl(env.NEXT_PUBLIC_SITE_URL);

  return {
    basePath,
    siteOrigin,
    siteUrl: `${siteOrigin}${basePath}`,
  };
}

export function withBasePath(path, basePath = getSiteConfig().basePath) {
  if (!path) {
    return basePath || "/";
  }

  if (/^(?:[a-z]+:)?\/\//i.test(path) || /^(?:data|mailto|tel):/i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${basePath}${normalizedPath}`;
}
