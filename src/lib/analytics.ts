type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: GTagEvent) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function trackClick(category: string, label: string) {
  trackEvent({ action: "click", category, label });
}

export function trackSearch(searchTerm: string) {
  trackEvent({ action: "search", category: "search", label: searchTerm });
}

export function trackFilter(filterType: string, filterValue: string) {
  trackEvent({
    action: "filter",
    category: "engagement",
    label: `${filterType}:${filterValue}`,
  });
}

export function trackOutboundLink(url: string) {
  trackEvent({ action: "click", category: "outbound", label: url });
}

export function trackShare(method: string, contentId: string) {
  trackEvent({
    action: "share",
    category: "engagement",
    label: `${method}:${contentId}`,
  });
}
