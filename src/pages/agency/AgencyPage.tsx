import { useState, FormEvent } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Mail,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';
import { MEDIA_ASSETS } from '../../data/clinicMedia';
import { ROUTES, navigateTo } from '../../utils/router';
import { CLINIC_WHATSAPP_CONFIG } from '../../utils/whatsapp';
import {
  AgencyInquiryErrors,
  AgencyInquiryValues,
  buildAgencyInquiryWhatsAppUrl,
  validateAgencyInquiry,
} from '../../utils/agencyForm';
import { ResilientImage } from '../../components/ResilientImage';

interface ShowcaseProject {
  number: string;
  name: string;
  location: string;
  sector: string;
  aesthetic: string;
  typography: string;
  palette: string[];
  description: string;
  route: string;
  image: string;
  imageAlt: string;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    number: '01',
    name: 'Northfield Dental Studio',
    location: 'Manchester, UK',
    sector: 'Private & Cosmetic Dentistry',
    aesthetic: 'European Minimalism',
    typography: 'Cormorant Garamond · Public Sans',
    palette: ['#FBF9F5', '#163026', '#6F877B', '#D6C7AE'],
    description:
      'Architecture-led dental studio experience pairing calm ivory whitespace, interactive smile demonstration framing, and a streamlined WhatsApp appointment request flow.',
    route: ROUTES.NORTHFIELD_DENTAL,
    image: MEDIA_ASSETS.northfield.hero,
    imageAlt: 'Northfield Dental Studio minimalist consultation suite in Manchester',
  },
  {
    number: '02',
    name: 'Maison Aesthetics',
    location: 'London, UK',
    sector: 'Private Skin & Aesthetics',
    aesthetic: 'Luxury Beauty Editorial',
    typography: 'Bodoni Moda · Manrope',
    palette: ['#F5EFE9', '#2B1E1A', '#B88B85', '#FCFBF9'],
    description:
      'High-fashion editorial restraint tailored for a Mayfair skin practice, built around full-bleed imagery, curated treatment journeys, and personal consultation requests.',
    route: ROUTES.MAISON_AESTHETICS,
    image: MEDIA_ASSETS.maison.hero,
    imageAlt: 'Maison Aesthetics private Mayfair skin clinic interior',
  },
  {
    number: '03',
    name: 'Willowbrook Family Medical Centre',
    location: 'Birmingham, UK',
    sector: 'General Medical Practice',
    aesthetic: 'Accessible Healthcare Clarity',
    typography: 'Outfit · Source Sans 3',
    palette: ['#FFFFFF', '#EBF5FB', '#0D9488', '#0F2942'],
    description:
      'High-legibility, approachable family GP website prioritizing immediate opening hours, patient guidance, and privacy-safe appointment booking without clinical intake risks.',
    route: ROUTES.WILLOWBROOK_MEDICAL,
    image: MEDIA_ASSETS.willowbrook.hero,
    imageAlt: 'Willowbrook Family Medical Centre bright reception lounge in Birmingham',
  },
  {
    number: '04',
    name: 'Apex Sports Physiotherapy',
    location: 'Leeds, UK',
    sector: 'Sports Rehab & Performance',
    aesthetic: 'Bold Athletic Performance',
    typography: 'Barlow Condensed · DM Sans',
    palette: ['#111215', '#1D1F24', '#FF5416', '#F4F4F1'],
    description:
      'High-contrast performance platform featuring asymmetric grids, interactive sports injury pathways, and rapid WhatsApp assessment scheduling.',
    route: ROUTES.APEX_PHYSIOTHERAPY,
    image: MEDIA_ASSETS.apex.hero,
    imageAlt: 'Apex Sports Physiotherapy performance lab and turf lane in Leeds',
  },
];

const SERVICES = [
  {
    index: '01.',
    title: 'Custom Website Development',
    summary:
      'Hand-built React and TypeScript architectures engineered from scratch around your brand rather than recycled multi-purpose templates.',
    deliverables: 'Bespoke component systems · Clean semantic HTML · Zero bloat',
  },
  {
    index: '02.',
    title: 'Healthcare Website Design',
    summary:
      'Patient-first digital experiences for private dental studios, medical clinics, aesthetic practices, and physiotherapy centres across the UK.',
    deliverables: 'Clear practitioner framing · Accessible contrast · Privacy-conscious flows',
  },
  {
    index: '03.',
    title: 'Website Redesign',
    summary:
      'Replacing dated, slow clinic websites with cohesive visual systems, sharper copy hierarchy, and clear conversion paths on mobile and desktop.',
    deliverables: 'UX audit · Brand elevation · Preserved URL equity',
  },
  {
    index: '04.',
    title: 'Booking Integration',
    summary:
      'Frictionless WhatsApp appointment requests and calendar-ready intake forms that reduce patient drop-off while keeping front-desk workflows simple.',
    deliverables: 'Validated request forms · Pre-formatted WhatsApp payloads · Spam protection',
  },
  {
    index: '05.',
    title: 'SEO and Performance Optimization',
    summary:
      'Structured route metadata, crisp image delivery, and disciplined front-end bundles designed for fast mobile loading and local search visibility.',
    deliverables: 'Route-level metadata · Semantic headings · Core Web Vitals focus',
  },
];

const WHY_CHOOSE_PILLARS = [
  {
    label: 'Custom-designed websites',
    detail:
      'Every clinic and business receives an original typographic system, color hierarchy, and layout rhythm suited to its clientele.',
  },
  {
    label: 'Mobile-first development',
    detail:
      'Over 70% of local healthcare enquiries start on a phone. Navigation, forms, and WhatsApp CTAs are crafted intentionally for touchscreens.',
  },
  {
    label: 'Fast loading speeds',
    detail:
      'Lean CSS, clean markup, and properly proportioned imagery ensure patients never wait on slow scripts before booking.',
  },
  {
    label: 'Conversion-focused experiences',
    detail:
      'Clear reading order, honest service explanations, and well-placed calls to action guide visitors naturally toward enquiries.',
  },
  {
    label: 'Easy-to-use booking systems',
    detail:
      'Simple validated forms generate structured WhatsApp appointment requests ready for your reception team to confirm manually.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Discovery',
    description:
      'We study your practice, patient demographics, service mix, and front-desk booking workflow before sketching a single screen.',
  },
  {
    step: '02',
    name: 'Strategy',
    description:
      'We define site architecture, page hierarchy, local SEO metadata, and clear patient enquiry paths.',
  },
  {
    step: '03',
    name: 'Design',
    description:
      'We craft an original visual identity—typography, palette, spacing, and art direction—built specifically for your brand.',
  },
  {
    step: '04',
    name: 'Development',
    description:
      'We build responsive, accessible production code with validated forms, WhatsApp integration, and clean performance.',
  },
  {
    step: '05',
    name: 'Launch',
    description:
      'We verify every route across desktop and mobile devices, test form workflows, and hand over a dependable site.',
  },
];

export function AgencyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreviewIdx, setActivePreviewIdx] = useState(0);

  const [formValues, setFormValues] = useState<AgencyInquiryValues>({
    fullName: '',
    email: '',
    businessName: '',
    serviceScope: 'Healthcare Website Design',
    message: '',
    honeypot: '',
  });
  const [formErrors, setFormErrors] = useState<AgencyInquiryErrors>({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);

  const activePreview = SHOWCASE_PROJECTS[activePreviewIdx] ?? SHOWCASE_PROJECTS[0];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInquiryChange = <K extends keyof AgencyInquiryValues>(
    field: K,
    value: AgencyInquiryValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => {
      if (!prev[field] && !prev.form) return prev;
      const next = { ...prev };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const handleInquirySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateAgencyInquiry(formValues);
    if (!result.valid) {
      setFormErrors(result.errors);
      setSubmittedWhatsAppUrl(null);
      return;
    }

    const waUrl = buildAgencyInquiryWhatsAppUrl(
      CLINIC_WHATSAPP_CONFIG.agency.phoneNumber,
      formValues
    );
    setFormErrors({});
    setSubmittedWhatsAppUrl(waUrl);
  };

  const directAgencyWhatsApp = `https://wa.me/${CLINIC_WHATSAPP_CONFIG.agency.phoneNumber}?text=${encodeURIComponent(
    'Hello Axon Digital, I would like to discuss a custom website project.'
  )}`;

  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#111111] font-agency-body selection:bg-[#E12D39] selection:text-white">
      {/* Top Bar Contract: 1 Row, 3 Zones */}
      <header className="sticky top-0 z-40 bg-[#F7F6F3]/95 backdrop-blur-sm border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Uploaded Logo */}
          <a
            href={ROUTES.AGENCY}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Axon Digital home"
            className="inline-flex items-center w-28 h-12 overflow-hidden shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
          >
            <img
              src={MEDIA_ASSETS.agencyLogo}
              alt="Axon."
              className="w-32 h-32 max-w-none object-cover object-center mix-blend-multiply"
            />
          </a>

          {/* Zone 2: Clean Single-Line Nav Links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('work');
              }}
              className="hover:text-[#111111] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Work
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="hover:text-[#111111] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('process');
              }}
              className="hover:text-[#111111] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Process
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="hover:text-[#111111] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-medium hover:bg-[#E12D39] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
            >
              <span>Start a Project</span>
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-black/15 text-[#111111] hover:bg-black/5 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/10 bg-[#F7F6F3] px-5 py-5">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
              {[
                { label: 'Work', id: 'work' },
                { label: 'Services', id: 'services' },
                { label: 'Process', id: 'process' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="py-2.5 text-base font-medium text-[#111111] border-b border-black/10"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="mt-2 w-full py-3 bg-[#111111] text-white text-sm font-medium"
              >
                Start a Project
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* 1. Hero Section */}
        <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <p className="text-xs font-agency-mono tracking-wide text-neutral-600">
                  UK Digital Product &amp; Healthcare Web Studio
                </p>
                <h1 className="font-agency-display font-bold tracking-tight text-[#111111] text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.06] text-balance">
                  We build distinctive digital experiences for businesses that want to stand out.
                </h1>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-xl">
                  Axon designs and engineers custom websites, private clinic platforms, and friction-free WhatsApp booking workflows. Every engagement starts with a blank canvas—never a recycled template.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('work')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#111111] text-white text-sm font-semibold hover:bg-[#E12D39] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#111111]/25 bg-white text-[#111111] text-sm font-semibold hover:border-[#111111] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Start a Project</span>
                </button>
              </div>
            </div>

            {/* Unique Visual Composition: Interactive Live Architecture Frame */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-black/10 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-black/10">
                <div className="flex items-center gap-2 text-xs font-agency-mono text-neutral-600">
                  <span>Portfolio Specimen</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePreview.location}</span>
                </div>
                <a
                  href={activePreview.route}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(activePreview.route);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#E12D39] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  <span>Open Live Site</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="relative mt-4 aspect-[16/10] overflow-hidden bg-neutral-100 border border-black/10">
                <ResilientImage
                  src={activePreview.image}
                  alt={activePreview.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 text-white">
                  <p className="text-xs font-agency-mono text-neutral-300">
                    {activePreview.number} · {activePreview.aesthetic}
                  </p>
                  <p className="font-agency-display font-bold text-xl sm:text-2xl mt-1">
                    {activePreview.name}
                  </p>
                </div>
              </div>

              {/* Project Switcher Tabs */}
              <div
                role="tablist"
                aria-label="Preview clinic architectures"
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4"
              >
                {SHOWCASE_PROJECTS.map((proj, idx) => {
                  const selected = idx === activePreviewIdx;
                  return (
                    <button
                      key={proj.route}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActivePreviewIdx(idx)}
                      className={`px-3 py-2.5 text-left border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-[#F7F6F3] text-neutral-800 border-black/10 hover:border-black/30'
                      }`}
                    >
                      <span className="block text-[11px] font-agency-mono opacity-75">
                        {proj.number}
                      </span>
                      <span className="block text-xs font-semibold truncate mt-0.5">
                        {proj.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Selected Projects (4 UK Clinic Websites) */}
        <section id="work" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-black/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-agency-mono text-[#E12D39] font-medium">
                Selected Works · UK Healthcare Portfolio
              </p>
              <h2 className="font-agency-display font-bold tracking-tight text-3xl sm:text-4xl text-balance">
                Four clinic brands, four independent design systems.
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
              Each demonstration below operates as its own standalone clinic website with distinct typography, colour architecture, navigation, and WhatsApp booking flow. Fictional clinics built for portfolio demonstration.
            </p>
          </div>

          <div className="divide-y divide-black/10">
            {SHOWCASE_PROJECTS.map((project, index) => (
              <article
                key={project.route}
                className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                <div
                  className={`lg:col-span-6 ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <a
                    href={project.route}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(project.route);
                    }}
                    className="group block overflow-hidden border border-black/10 bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-200">
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  </a>
                </div>

                <div
                  className={`lg:col-span-6 space-y-6 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-agency-mono text-neutral-600">
                    <span>Project {project.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.sector}</span>
                  </div>

                  <h3 className="font-agency-display font-bold text-2xl sm:text-3xl tracking-tight text-[#111111]">
                    {project.name}
                  </h3>

                  <p className="text-base text-neutral-700 leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  {/* Design System Specification Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-black/10 text-xs">
                    <div>
                      <span className="block text-neutral-500 font-agency-mono">
                        Creative Direction
                      </span>
                      <span className="block font-semibold text-[#111111] mt-1">
                        {project.aesthetic}
                      </span>
                    </div>
                    <div>
                      <span className="block text-neutral-500 font-agency-mono">
                        Type System
                      </span>
                      <span className="block font-semibold text-[#111111] mt-1">
                        {project.typography}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-2" aria-label="Project colour swatches">
                      {project.palette.map((hex) => (
                        <span
                          key={hex}
                          title={hex}
                          className="w-6 h-6 border border-black/15"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>

                    <a
                      href={project.route}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(project.route);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-sm font-medium hover:bg-[#E12D39] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>View Live Project</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Services */}
        <section id="services" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-agency-mono text-[#E12D39] font-medium">
                Capabilities
              </p>
              <h2 className="font-agency-display font-bold tracking-tight text-3xl sm:text-4xl text-balance">
                Focused digital services built around patient and client trust.
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                From initial brand architecture to live WhatsApp booking handoffs, we deliver clean, maintainable web systems without agency bloat.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
              {SERVICES.map((service, idx) => (
                <div
                  key={service.title}
                  className={`bg-white p-7 sm:p-8 flex flex-col justify-between gap-6 ${
                    idx === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <span className="text-xs font-agency-mono text-[#E12D39] font-medium">
                      {service.index}
                    </span>
                    <h3 className="font-agency-display font-bold text-xl sm:text-2xl text-[#111111]">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl">
                      {service.summary}
                    </p>
                  </div>
                  <p className="text-xs font-agency-mono text-neutral-500 pt-4 border-t border-black/10">
                    {service.deliverables}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Why Choose Us */}
        <section className="bg-white border-b border-black/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
            <div className="max-w-2xl space-y-3 mb-12">
              <p className="text-xs font-agency-mono text-[#E12D39] font-medium">
                Why Axon
              </p>
              <h2 className="font-agency-display font-bold tracking-tight text-3xl sm:text-4xl text-balance">
                Engineered for speed, clarity, and real appointment requests.
              </h2>
            </div>

            <div className="divide-y divide-black/10 border-t border-b border-black/10">
              {WHY_CHOOSE_PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.label}
                  className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
                >
                  <div className="md:col-span-1 text-xs font-agency-mono text-neutral-500 tabular-nums">
                    0{idx + 1}
                  </div>
                  <h3 className="md:col-span-4 font-agency-display font-bold text-lg sm:text-xl text-[#111111]">
                    {pillar.label}
                  </h3>
                  <p className="md:col-span-7 text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Our Process */}
        <section id="process" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-black/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-xl">
              <p className="text-xs font-agency-mono text-[#E12D39] font-medium">
                Methodology
              </p>
              <h2 className="font-agency-display font-bold tracking-tight text-3xl sm:text-4xl text-balance">
                Five deliberate phases from brief to launch.
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-sm">
              Structured milestones keep stakeholders aligned without unnecessary meetings or vague timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-white border border-black/10 p-6 flex flex-col justify-between gap-6"
              >
                <span className="text-xs font-agency-mono text-[#E12D39] font-semibold tabular-nums">
                  Step {item.step}
                </span>
                <div className="space-y-2.5">
                  <h3 className="font-agency-display font-bold text-xl text-[#111111]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Contact Section */}
        <section id="contact" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-agency-mono text-[#E12D39] font-medium">
                  Start a Conversation
                </p>
                <h2 className="font-agency-display font-bold tracking-tight text-3xl sm:text-4xl text-balance">
                  Ready to build a website that fits your practice or business?
                </h2>
                <p className="text-base text-neutral-700 leading-relaxed">
                  Share your goals below or message us directly on WhatsApp. We respond to all UK and international enquiries within one working day.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-black/10">
                <a
                  href={directAgencyWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 bg-[#111111] text-white text-sm font-semibold hover:bg-[#E12D39] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="pt-2 space-y-2 text-sm text-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-neutral-500" aria-hidden="true" />
                    <a
                      href="mailto:hello@axondigital.co.uk"
                      className="font-medium text-[#111111] hover:underline underline-offset-4"
                    >
                      hello@axondigital.co.uk
                    </a>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Manchester &amp; London · Serving clinics and businesses across the UK
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-black/10 p-6 sm:p-10">
              <form onSubmit={handleInquirySubmit} noValidate className="space-y-5">
                {/* Honeypot spam guard */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="agency-website-hp">Leave this blank</label>
                  <input
                    id="agency-website-hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formValues.honeypot ?? ''}
                    onChange={(e) => handleInquiryChange('honeypot', e.target.value)}
                  />
                </div>

                {formErrors.form && (
                  <p role="alert" className="text-sm text-[#B91C1C] bg-red-50 border border-red-200 px-4 py-3">
                    {formErrors.form}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="agency-name"
                      className="block text-xs font-semibold text-neutral-800 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="agency-name"
                      type="text"
                      required
                      value={formValues.fullName}
                      onChange={(e) => handleInquiryChange('fullName', e.target.value)}
                      placeholder="Dr. Eleanor Shaw"
                      className="w-full px-4 py-3 bg-[#F7F6F3] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-[#B91C1C] mt-1.5">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="agency-email"
                      className="block text-xs font-semibold text-neutral-800 mb-2"
                    >
                      Work Email *
                    </label>
                    <input
                      id="agency-email"
                      type="email"
                      required
                      value={formValues.email}
                      onChange={(e) => handleInquiryChange('email', e.target.value)}
                      placeholder="eleanor@practice.co.uk"
                      className="w-full px-4 py-3 bg-[#F7F6F3] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-[#B91C1C] mt-1.5">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="agency-business"
                      className="block text-xs font-semibold text-neutral-800 mb-2"
                    >
                      Clinic or Business Name *
                    </label>
                    <input
                      id="agency-business"
                      type="text"
                      required
                      value={formValues.businessName}
                      onChange={(e) => handleInquiryChange('businessName', e.target.value)}
                      placeholder="e.g. Elmwood Dental Clinic"
                      className="w-full px-4 py-3 bg-[#F7F6F3] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                    />
                    {formErrors.businessName && (
                      <p className="text-xs text-[#B91C1C] mt-1.5">{formErrors.businessName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="agency-scope"
                      className="block text-xs font-semibold text-neutral-800 mb-2"
                    >
                      Primary Service *
                    </label>
                    <select
                      id="agency-scope"
                      value={formValues.serviceScope}
                      onChange={(e) => handleInquiryChange('serviceScope', e.target.value)}
                      className="w-full px-4 py-3 bg-[#F7F6F3] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                    >
                      <option value="Custom Website Development">Custom Website Development</option>
                      <option value="Healthcare Website Design">Healthcare Website Design</option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Booking & WhatsApp Integration">
                        Booking &amp; WhatsApp Integration
                      </option>
                      <option value="SEO & Performance Optimization">
                        SEO &amp; Performance Optimization
                      </option>
                    </select>
                    {formErrors.serviceScope && (
                      <p className="text-xs text-[#B91C1C] mt-1.5">{formErrors.serviceScope}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="agency-message"
                    className="block text-xs font-semibold text-neutral-800 mb-2"
                  >
                    Project Overview *
                  </label>
                  <textarea
                    id="agency-message"
                    rows={4}
                    required
                    value={formValues.message}
                    onChange={(e) => handleInquiryChange('message', e.target.value)}
                    placeholder="Tell us about your practice, timeline, and what you want your new site to achieve."
                    className="w-full px-4 py-3 bg-[#F7F6F3] border border-black/15 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                  {formErrors.message && (
                    <p className="text-xs text-[#B91C1C] mt-1.5">{formErrors.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-neutral-500">
                    No third-party analytics tracking on your enquiry details.
                  </p>
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#E12D39] text-white text-sm font-semibold hover:bg-[#111111] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Prepare Project Enquiry
                  </button>
                </div>

                {submittedWhatsAppUrl && (
                  <div
                    role="status"
                    className="mt-6 p-5 bg-[#F7F6F3] border border-[#111111]/20 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                      <Check className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
                      <span>Project enquiry prepared</span>
                    </div>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      Your project brief is ready. Click below to send it directly to Axon Digital via WhatsApp (you will review and press Send in WhatsApp), or email us at{' '}
                      <a
                        href="mailto:hello@axondigital.co.uk"
                        className="underline font-medium text-[#111111]"
                      >
                        hello@axondigital.co.uk
                      </a>
                      .
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <a
                        href={submittedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white text-xs font-semibold hover:bg-[#E12D39] transition-colors"
                      >
                        <span>Send via WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="bg-[#111111] text-neutral-300 border-t border-black/15">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center justify-center w-28 h-12 overflow-hidden bg-white">
                <img
                  src={MEDIA_ASSETS.agencyLogo}
                  alt="Axon."
                  className="w-32 h-32 max-w-none object-cover object-center"
                />
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                Independent UK web development studio crafting bespoke websites for clinics, healthcare practices, and ambitious businesses.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-agency-mono text-neutral-400">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('work');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Selected Work
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('services');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('process');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Our Process
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-agency-mono text-neutral-400">
                Clinic Demo Projects
              </h3>
              <ul className="space-y-2 text-sm">
                {SHOWCASE_PROJECTS.map((proj) => (
                  <li key={proj.route}>
                    <a
                      href={proj.route}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(proj.route);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {proj.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-agency-mono text-neutral-400">Contact &amp; Social</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:hello@axondigital.co.uk"
                    className="hover:text-white transition-colors"
                  >
                    hello@axondigital.co.uk
                  </a>
                </li>
                <li>
                  <a
                    href={directAgencyWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Studio Desk
                  </a>
                </li>
                <li className="pt-2 flex items-center gap-4 text-xs text-neutral-400">
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Axon Digital. UK Web Development Studio.</p>
            <p>All featured clinics are fictional demonstration projects.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
