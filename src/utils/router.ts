export const ROUTES = {
  AGENCY: '/',
  NORTHFIELD_DENTAL: '/projects/northfield-dental/',
  MAISON_AESTHETICS: '/projects/maison-aesthetics/',
  WILLOWBROOK_MEDICAL: '/projects/willowbrook-medical/',
  APEX_PHYSIOTHERAPY: '/projects/apex-physiotherapy/',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

const VALID_ROUTES: readonly AppRoute[] = [
  ROUTES.AGENCY,
  ROUTES.NORTHFIELD_DENTAL,
  ROUTES.MAISON_AESTHETICS,
  ROUTES.WILLOWBROOK_MEDICAL,
  ROUTES.APEX_PHYSIOTHERAPY,
];

export function normalizeRoute(rawPath: string): AppRoute | null {
  const withoutHash = rawPath.split('#')[0] ?? '';
  const withoutQuery = withoutHash.split('?')[0] ?? '';
  const trimmed = withoutQuery.trim();

  if (trimmed === '' || trimmed === '/') {
    return ROUTES.AGENCY;
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  const match = VALID_ROUTES.find((route) => route === withTrailingSlash);
  return match ?? null;
}

export function extractHash(rawPath: string): string | null {
  const idx = rawPath.indexOf('#');
  if (idx === -1) return null;
  const hash = rawPath.slice(idx + 1).trim();
  return hash.length > 0 ? hash : null;
}

export const ROUTE_CHANGE_EVENT = 'axon:routechange';

export function navigateTo(target: string): void {
  if (typeof window === 'undefined') return;

  const hash = extractHash(target);
  const normalized = normalizeRoute(target);
  const destinationPath = normalized ?? target.split('#')[0] ?? '/';
  const fullUrl = hash ? `${destinationPath}#${hash}` : destinationPath;

  const currentNormalized = normalizeRoute(window.location.pathname);
  const isSameRoute = currentNormalized === normalized;

  if (!isSameRoute || window.location.pathname !== destinationPath) {
    window.history.pushState({}, '', fullUrl);
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT));
  }

  if (hash) {
    window.requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
