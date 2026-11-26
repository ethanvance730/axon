import { AppRoute, ROUTES } from './router';

export interface RouteMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  faviconHref: string;
}

const AGENCY_FAVICON = '/assets/aistudio/69655_6e1d112d.jpg';

function svgDataUri(bg: string, fg: string, glyph: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${bg}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-weight="600" fill="${fg}">${glyph}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const ROUTE_METADATA: Record<AppRoute, RouteMeta> = {
  [ROUTES.AGENCY]: {
    title: 'Axon. — Custom Web Development Agency & UK Clinic Portfolio',
    description:
      'We build distinctive digital experiences for businesses that want to stand out. Custom websites, healthcare clinic web design, and WhatsApp booking integrations.',
    ogTitle: 'Axon. — Custom Web Development Agency & UK Clinic Portfolio',
    ogDescription:
      'Bespoke websites for ambitious UK clinics and businesses, engineered for clarity, speed, and direct patient conversion.',
    faviconHref: AGENCY_FAVICON,
  },
  [ROUTES.NORTHFIELD_DENTAL]: {
    title: 'Northfield Dental Studio — Private Dentistry in Manchester (Demo)',
    description:
      'Fictional portfolio demonstration: Northfield Dental Studio in Manchester. European minimalist private dentistry, cosmetic care, and WhatsApp appointment requests.',
    ogTitle: 'Northfield Dental Studio — Manchester Private Dentistry (Demo)',
    ogDescription:
      'Calm, architecture-led private dentistry in Deansgate, Manchester. Portfolio demonstration project by Axon.',
    faviconHref: svgDataUri('#163026', '#FBF9F5', 'N'),
  },
  [ROUTES.MAISON_AESTHETICS]: {
    title: 'Maison Aesthetics — Private Skin & Aesthetic Clinic London (Demo)',
    description:
      'Fictional portfolio demonstration: Maison Aesthetics in Mayfair, London. Editorial aesthetic medicine, restorative skin treatments, and consultation booking.',
    ogTitle: 'Maison Aesthetics — London Private Skin Clinic (Demo)',
    ogDescription:
      'Restorative skin craft in Mayfair, London. Portfolio demonstration project by Axon.',
    faviconHref: svgDataUri('#2B1E1A', '#F5EFE9', 'M'),
  },
  [ROUTES.WILLOWBROOK_MEDICAL]: {
    title: 'Willowbrook Family Medical Centre — Birmingham GP Practice (Demo)',
    description:
      'Fictional portfolio demonstration: Willowbrook Family Medical Centre in Birmingham. Accessible general practice care, opening hours, and privacy-first appointment requests.',
    ogTitle: 'Willowbrook Family Medical Centre — Birmingham (Demo)',
    ogDescription:
      'Friendly, accessible family healthcare in Birmingham. Portfolio demonstration project by Axon.',
    faviconHref: svgDataUri('#0D9488', '#FFFFFF', '+'),
  },
  [ROUTES.APEX_PHYSIOTHERAPY]: {
    title: 'Apex Sports Physiotherapy — Performance Rehab Leeds (Demo)',
    description:
      'Fictional portfolio demonstration: Apex Sports Physiotherapy in Leeds. Sports injury rehabilitation, mobility assessment, and athlete recovery.',
    ogTitle: 'Apex Sports Physiotherapy — Leeds Performance Rehab (Demo)',
    ogDescription:
      'Evidence-led sports rehabilitation and physiotherapy in Leeds. Portfolio demonstration project by Axon.',
    faviconHref: svgDataUri('#111215', '#FF5416', 'A'),
  },
};

export function applyRouteMetadata(route: AppRoute): void {
  if (typeof document === 'undefined') return;
  const meta = ROUTE_METADATA[route];
  document.title = meta.title;

  const setMetaContent = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMetaContent('meta[name="description"]', meta.description);
  setMetaContent('meta[property="og:title"]', meta.ogTitle);
  setMetaContent('meta[property="og:description"]', meta.ogDescription);

  const iconLink = document.querySelector('link[rel="icon"]');
  if (iconLink) {
    iconLink.setAttribute('href', meta.faviconHref);
    iconLink.setAttribute(
      'type',
      meta.faviconHref.endsWith('.jpg') ? 'image/jpeg' : 'image/svg+xml'
    );
  }
}
