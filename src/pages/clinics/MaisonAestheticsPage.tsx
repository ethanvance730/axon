import { useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react';
import { DemoPortfolioBar } from '../../components/DemoPortfolioBar';
import { ResilientImage } from '../../components/ResilientImage';
import { MEDIA_ASSETS } from '../../data/clinicMedia';
import { useWhatsAppBooking } from '../../hooks/useWhatsAppBooking';
import { ROUTES, navigateTo } from '../../utils/router';
import { CLINIC_WHATSAPP_CONFIG } from '../../utils/whatsapp';

const SIGNATURE_TREATMENTS = [
  {
    name: 'Skin Rejuvenation',
    subtitle: 'Barrier & luminosity restoration',
    detail:
      'Targeted multi-layer dermal therapies designed to support collagen density, surface clarity, and natural skin resilience.',
  },
  {
    name: 'Facial Treatments',
    subtitle: 'Bespoke clinical facials',
    detail:
      'Custom lymphatic sculpting, gentle enzymatic resurfacing, and calming hydration tailored to your skin condition on the day.',
  },
  {
    name: 'Chemical Peels',
    subtitle: 'Controlled cellular renewal',
    detail:
      'Precision medical-grade acid formulations calibrated for uneven tone, sun damage, and refined textural smoothness.',
  },
  {
    name: 'Skin Consultation',
    subtitle: 'Diagnostic assessment & plan',
    detail:
      'An unhurried 45-minute appointment examining skin barrier health, sensitivities, and realistic seasonal treatment pacing.',
  },
  {
    name: 'Laser Treatments',
    subtitle: 'Tone & vascular precision',
    detail:
      'Selective light-based protocols addressing redness, pigmentation, and fine textural irregularities with minimal interruption.',
  },
  {
    name: 'Anti-Wrinkle Treatment',
    subtitle: 'Subtle expression softening',
    detail:
      'Conservative practitioner-led facial assessment focused on balanced, natural movement rather than frozen expression.',
  },
];

const PRACTITIONERS = [
  {
    name: 'Dr. Camille Laurent',
    title: 'Medical Director · Fictional Demo Profile',
    focus: 'Facial anatomy & conservative regenerative protocols',
    note: 'Leads skin consultations and bespoke multi-modality treatment planning in our Mayfair rooms.',
  },
  {
    name: 'Elena Vance',
    title: 'Senior Aesthetician · Fictional Demo Profile',
    focus: 'Barrier repair, bespoke facials & chemical peels',
    note: 'Combines gentle clinical exfoliation with restorative dermal recovery.',
  },
  {
    name: 'Sophia Patel',
    title: 'Laser & Skin Specialist · Fictional Demo Profile',
    focus: 'Vascular laser & pigment calibration',
    note: 'Oversees pre-treatment skin conditioning and measured post-care regimens.',
  },
];

const MAISON_FAQS = [
  {
    q: 'What happens during an initial Skin Consultation?',
    a: 'Your practitioner reviews your skincare routine, sun exposure history, and skin sensitivity before outlining a realistic, phased care plan without obligation.',
  },
  {
    q: 'Are consultations required before Laser or Anti-Wrinkle treatments?',
    a: 'Yes. Every clinical procedure is preceded by an in-person suitability assessment and patch testing where indicated.',
  },
  {
    q: 'Is my appointment confirmed immediately when I submit the form?',
    a: 'Submitting the form generates a WhatsApp consultation request. Appointments are confirmed only once our Mayfair reception team replies with available clinic slots.',
  },
  {
    q: 'Is Maison Aesthetics a real London clinic?',
    a: 'No. Maison Aesthetics is a fictional private aesthetics brand created solely to demonstrate bespoke luxury editorial web design within the Axon portfolio.',
  },
];

export function MaisonAestheticsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const booking = useWhatsAppBooking({
    clinicName: CLINIC_WHATSAPP_CONFIG.maisonAesthetics.clinicName,
    phoneNumber: CLINIC_WHATSAPP_CONFIG.maisonAesthetics.phoneNumber,
    defaultService: 'Skin Consultation',
    serviceFieldLabel: 'Treatment Interest',
    includeAdditionalMessage: true,
    requestOpeningLine: 'I would like to request a private consultation.',
  });

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#2B1E1A] font-maison-body selection:bg-[#B88B85] selection:text-white">
      <DemoPortfolioBar
        currentRoute={ROUTES.MAISON_AESTHETICS}
        clinicLabel="Maison Aesthetics (London)"
      />

      {/* Editorial Luxury Header */}
      <header className="sticky top-0 z-40 bg-[#FCFBF9]/95 backdrop-blur-sm border-b border-[#2B1E1A]/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
          <a
            href={ROUTES.MAISON_AESTHETICS}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-maison-display text-2xl sm:text-[1.7rem] tracking-[0.12em] uppercase text-[#2B1E1A] whitespace-nowrap shrink-0"
          >
            Maison Aesthetics
          </a>

          <nav
            aria-label="Maison Aesthetics navigation"
            className="hidden md:flex items-center gap-8 text-xs tracking-[0.14em] uppercase text-[#7D6D67]"
          >
            <a
              href="#ma-treatments"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('ma-treatments');
              }}
              className="hover:text-[#2B1E1A] transition-colors whitespace-nowrap shrink-0"
            >
              Treatments
            </a>
            <a
              href="#ma-philosophy"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('ma-philosophy');
              }}
              className="hover:text-[#2B1E1A] transition-colors whitespace-nowrap shrink-0"
            >
              Philosophy
            </a>
            <a
              href="#ma-practitioners"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('ma-practitioners');
              }}
              className="hover:text-[#2B1E1A] transition-colors whitespace-nowrap shrink-0"
            >
              Practitioners
            </a>
            <a
              href="#ma-faq"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('ma-faq');
              }}
              className="hover:text-[#2B1E1A] transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollTo('ma-booking')}
              className="hidden sm:inline-flex items-center px-5 py-2.5 border border-[#2B1E1A] text-[#2B1E1A] text-xs tracking-[0.14em] uppercase font-medium hover:bg-[#2B1E1A] hover:text-[#FCFBF9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Consultation
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[#2B1E1A]/20 text-[#2B1E1A] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#2B1E1A]/10 bg-[#FCFBF9] px-5 py-5">
            <nav aria-label="Maison mobile navigation" className="flex flex-col gap-3">
              {[
                { label: 'Signature Treatments', id: 'ma-treatments' },
                { label: 'Clinic Philosophy', id: 'ma-philosophy' },
                { label: 'Practitioners', id: 'ma-practitioners' },
                { label: 'Questions', id: 'ma-faq' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="py-2 text-sm tracking-wide text-[#2B1E1A] border-b border-[#2B1E1A]/10"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollTo('ma-booking')}
                className="mt-2 w-full py-3 bg-[#2B1E1A] text-[#FCFBF9] text-xs tracking-[0.16em] uppercase"
              >
                Request Consultation
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Full-Width Editorial Hero */}
        <section className="relative min-h-[540px] lg:min-h-[640px] flex items-end overflow-hidden bg-[#2B1E1A]">
          <ResilientImage
            src={MEDIA_ASSETS.maison.hero}
            alt="Maison Aesthetics private Mayfair skin clinic interior"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#1A110E]/90 via-[#1A110E]/35 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#1A110E]/80 via-[#1A110E]/40 to-transparent"
          />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-20">
            <div className="max-w-2xl space-y-5 text-[#FCFBF9]">
              <p className="text-xs tracking-[0.2em] uppercase text-[#E5CFCB]">
                Mayfair, London · Fictional Aesthetics Demo
              </p>
              <h1 className="font-maison-display text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.04] font-normal text-balance">
                Restorative skin craft,{' '}
                <span className="italic">quietly refined.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#F5EFE9]/85 leading-relaxed max-w-lg">
                An intimate London sanctuary dedicated to barrier-first skincare, medical facials, and measured aesthetic medicine.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollTo('ma-booking')}
                  className="px-7 py-3.5 bg-[#FCFBF9] text-[#2B1E1A] text-xs tracking-[0.16em] uppercase font-semibold hover:bg-[#F5EFE9] transition-colors cursor-pointer"
                >
                  Request Consultation
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('ma-treatments')}
                  className="px-6 py-3.5 border border-[#FCFBF9]/45 text-[#FCFBF9] text-xs tracking-[0.16em] uppercase hover:border-[#FCFBF9] transition-colors cursor-pointer"
                >
                  Signature Menu
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Treatments */}
        <section id="ma-treatments" className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <p className="text-xs tracking-[0.18em] uppercase text-[#B88B85]">
                Signature Treatments
              </p>
              <h2 className="font-maison-display text-3xl sm:text-4xl font-normal leading-tight text-[#2B1E1A]">
                Curated skin protocols without over-intervention.
              </h2>
              <div className="aspect-[4/3] overflow-hidden bg-[#F5EFE9]">
                <ResilientImage
                  src={MEDIA_ASSETS.maison.ritual}
                  alt="Facial skin consultation and serum ritual at Maison Aesthetics"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-[#7D6D67]">
                Every procedure begins with an individual skin barrier evaluation.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#2B1E1A]/12 border-t border-b border-[#2B1E1A]/12">
              {SIGNATURE_TREATMENTS.map((treatment, idx) => (
                <article
                  key={treatment.name}
                  className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-start justify-between gap-5"
                >
                  <div className="space-y-2 max-w-lg">
                    <div className="flex items-center gap-3 text-xs text-[#B88B85]">
                      <span className="tabular-nums">0{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase tracking-[0.12em]">{treatment.subtitle}</span>
                    </div>
                    <h3 className="font-maison-display text-2xl sm:text-[1.7rem] text-[#2B1E1A]">
                      {treatment.name}
                    </h3>
                    <p className="text-sm text-[#7D6D67] leading-relaxed">
                      {treatment.detail}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      booking.updateField('service', treatment.name);
                      scrollTo('ma-booking');
                    }}
                    className="self-start text-xs tracking-[0.14em] uppercase text-[#2B1E1A] underline underline-offset-4 hover:text-[#B88B85] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Enquire
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Clinic Philosophy */}
        <section id="ma-philosophy" className="bg-[#F5EFE9] py-16 lg:py-24 border-y border-[#2B1E1A]/10">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#B88B85]">
              Clinic Philosophy
            </p>
            <blockquote className="font-maison-display text-2xl sm:text-4xl leading-snug text-[#2B1E1A] italic">
              “True aesthetic medicine should leave you looking rested, luminous, and unmistakably yourself—never altered.”
            </blockquote>
            <p className="text-sm sm:text-base text-[#7D6D67] max-w-2xl mx-auto leading-relaxed">
              Located off Mount Street in Mayfair, our private rooms reject rushed menus in favour of seasonal skin architecture, unhurried practitioner continuity, and calm restraint.
            </p>
          </div>
        </section>

        {/* Treatment Journey */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-[#2B1E1A]/10">
          <div className="mb-12">
            <p className="text-xs tracking-[0.18em] uppercase text-[#B88B85] mb-2">
              The Treatment Journey
            </p>
            <h2 className="font-maison-display text-3xl sm:text-4xl text-[#2B1E1A]">
              Three measured stages of care
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: 'Chapter I',
                title: 'Diagnostic Skin Mapping',
                body: 'Detailed analysis of hydration, tone, and barrier sensitivity before recommending any active modality.',
              },
              {
                num: 'Chapter II',
                title: 'Bespoke Clinical Session',
                body: 'Performed in quiet private suites using calibrated formulations, gentle lasers, or subtle medical aesthetics.',
              },
              {
                num: 'Chapter III',
                title: 'Seasonal Review & Home Care',
                body: 'Follow-up guidance adapting your home routine across London seasons for sustained skin clarity.',
              },
            ].map((stage) => (
              <div key={stage.num} className="space-y-3 pt-5 border-t border-[#2B1E1A]/20">
                <p className="text-xs tracking-[0.16em] uppercase text-[#B88B85]">
                  {stage.num}
                </p>
                <h3 className="font-maison-display text-2xl text-[#2B1E1A]">
                  {stage.title}
                </h3>
                <p className="text-sm text-[#7D6D67] leading-relaxed">{stage.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Practitioner Introduction (Fictional Demo Profiles) */}
        <section id="ma-practitioners" className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-[#2B1E1A]/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-[#B88B85] mb-2">
                Practitioners
              </p>
              <h2 className="font-maison-display text-3xl sm:text-4xl text-[#2B1E1A]">
                Clinical leadership
              </h2>
            </div>
            <p className="text-xs text-[#7D6D67]">
              Fictional practitioner profiles created strictly for portfolio demonstration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRACTITIONERS.map((p) => (
              <div
                key={p.name}
                className="bg-[#F5EFE9]/60 border border-[#2B1E1A]/10 p-8 space-y-4"
              >
                <p className="text-xs tracking-[0.14em] uppercase text-[#B88B85]">
                  {p.title}
                </p>
                <h3 className="font-maison-display text-2xl text-[#2B1E1A]">{p.name}</h3>
                <p className="text-xs font-medium text-[#2B1E1A]/80">{p.focus}</p>
                <p className="text-sm text-[#7D6D67] leading-relaxed pt-2 border-t border-[#2B1E1A]/10">
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section id="ma-faq" className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-[#2B1E1A]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs tracking-[0.18em] uppercase text-[#B88B85]">
                Information
              </p>
              <h2 className="font-maison-display text-3xl sm:text-4xl text-[#2B1E1A]">
                Frequently asked questions
              </h2>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#2B1E1A]/12 border-t border-b border-[#2B1E1A]/12">
              {MAISON_FAQS.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="font-maison-display text-xl text-[#2B1E1A]">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7D6D67] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-6 text-sm text-[#7D6D67] leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Consultation Booking */}
        <section id="ma-booking" className="bg-[#F5EFE9] py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs tracking-[0.18em] uppercase text-[#B88B85]">
                Private Consultation
              </p>
              <h2 className="font-maison-display text-3xl sm:text-4xl text-[#2B1E1A] leading-tight">
                Request your Mayfair appointment
              </h2>
              <p className="text-sm sm:text-base text-[#7D6D67] leading-relaxed">
                Share your preferred treatment interest and date below. Submitting prepares a personalized WhatsApp consultation request for our concierge desk—appointments remain requests until confirmed personally.
              </p>
              <div className="pt-4 border-t border-[#2B1E1A]/12 text-xs text-[#7D6D67] space-y-1.5">
                <p className="font-semibold text-[#2B1E1A]">Maison Aesthetics (Demo Address)</p>
                <p>18 Mount Row, Mayfair, London W1K 3RN</p>
                <p>WhatsApp Concierge: +44 7700 900202</p>
                <p>Tuesday – Saturday: 09:30 – 19:00</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FCFBF9] border border-[#2B1E1A]/12 p-6 sm:p-10">
              <form onSubmit={booking.handleSubmit} noValidate className="space-y-5">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="ma-hp">Company</label>
                  <input
                    id="ma-hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={booking.values.honeypot ?? ''}
                    onChange={(e) => booking.updateField('honeypot', e.target.value)}
                  />
                </div>

                {booking.errors.form && (
                  <p role="alert" className="text-sm text-red-800 bg-red-50 border border-red-200 p-3">
                    {booking.errors.form}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ma-name" className="block text-xs tracking-wider uppercase text-[#7D6D67] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="ma-name"
                      type="text"
                      required
                      value={booking.values.fullName}
                      onChange={(e) => booking.updateField('fullName', e.target.value)}
                      placeholder="Charlotte Hughes"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#2B1E1A]/20 text-sm focus:outline-none focus:border-[#2B1E1A]"
                    />
                    {booking.errors.fullName && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ma-phone" className="block text-xs tracking-wider uppercase text-[#7D6D67] mb-1.5">
                      Contact Number *
                    </label>
                    <input
                      id="ma-phone"
                      type="tel"
                      required
                      value={booking.values.phone}
                      onChange={(e) => booking.updateField('phone', e.target.value)}
                      placeholder="07700 900456"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#2B1E1A]/20 text-sm focus:outline-none focus:border-[#2B1E1A]"
                    />
                    {booking.errors.phone && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ma-email" className="block text-xs tracking-wider uppercase text-[#7D6D67] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="ma-email"
                      type="email"
                      required
                      value={booking.values.email}
                      onChange={(e) => booking.updateField('email', e.target.value)}
                      placeholder="charlotte@example.co.uk"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#2B1E1A]/20 text-sm focus:outline-none focus:border-[#2B1E1A]"
                    />
                    {booking.errors.email && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ma-treatment" className="block text-xs tracking-wider uppercase text-[#7D6D67] mb-1.5">
                      Treatment Interest *
                    </label>
                    <select
                      id="ma-treatment"
                      value={booking.values.service}
                      onChange={(e) => booking.updateField('service', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#2B1E1A]/20 text-sm focus:outline-none focus:border-[#2B1E1A]"
                    >
                      {SIGNATURE_TREATMENTS.map((t) => (
                        <option key={t.name} value={t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                    {booking.errors.service && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.service}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ma-date" className="block text-xs tracking-wider uppercase text-[#7D6D67] mb-1.5">
                      Preferred Appointment Date *
                    </label>
                    <input
                      id="ma-date"
                      type="date"
                      min={booking.todayIso}
                      required
                      value={booking.values.preferredDate}
                      onChange={(e) => booking.updateField('preferredDate', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#2B1E1A]/20 text-sm focus:outline-none focus:border-[#2B1E1A]"
                    />
                    {booking.errors.preferredDate && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ma-time" className="block text-xs tracking-wider uppercase text-[#7D6D67] mb-1.5">
                      Preferred Time *
                    </label>
                    <select
                      id="ma-time"
                      value={booking.values.preferredTime}
                      onChange={(e) => booking.updateField('preferredTime', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#2B1E1A]/20 text-sm focus:outline-none focus:border-[#2B1E1A]"
                    >
                      <option value="">Choose preferred window</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="05:30 PM">05:30 PM</option>
                    </select>
                    {booking.errors.preferredTime && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="ma-notes" className="block text-xs tracking-wider uppercase text-[#7D6D67] mb-1.5">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="ma-notes"
                    rows={3}
                    value={booking.values.additionalMessage ?? ''}
                    onChange={(e) => booking.updateField('additionalMessage', e.target.value)}
                    placeholder="Share preferred days or general skin goals."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#2B1E1A]/20 text-sm focus:outline-none focus:border-[#2B1E1A]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#7D6D67]">
                    Requests are reviewed personally; no automated booking confirmation.
                  </p>
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#2B1E1A] text-[#FCFBF9] text-xs tracking-[0.16em] uppercase font-medium hover:bg-[#46322C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Prepare WhatsApp Request
                  </button>
                </div>

                {booking.generated && (
                  <div
                    role="status"
                    data-testid="ma-whatsapp-result"
                    className="mt-6 p-5 bg-[#F5EFE9] border border-[#2B1E1A]/20 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-[#2B1E1A]">
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Personalized Consultation Request Ready</span>
                    </div>
                    <p className="text-xs text-[#7D6D67]">
                      Review your message below, click Open in WhatsApp, and press Send inside WhatsApp to deliver your request.
                    </p>
                    <pre className="p-3.5 bg-white border border-[#2B1E1A]/10 text-xs text-[#2B1E1A] whitespace-pre-wrap font-maison-body">
                      {booking.generated.message}
                    </pre>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={booking.generated.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2B1E1A] text-[#FCFBF9] text-xs tracking-[0.14em] uppercase"
                      >
                        <span>Open in WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={booking.resetForm}
                        className="px-4 py-2.5 border border-[#2B1E1A]/25 text-xs text-[#2B1E1A] cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2B1E1A] text-[#F5EFE9] py-12">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-maison-display text-2xl tracking-[0.1em] uppercase">
              Maison Aesthetics
            </p>
            <p className="text-xs text-[#B88B85] mt-1">
              18 Mount Row, Mayfair, London · Fictional Portfolio Demonstration
            </p>
          </div>
          <a
            href={ROUTES.AGENCY}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(ROUTES.AGENCY);
            }}
            className="text-xs underline underline-offset-4 text-[#FCFBF9] hover:text-[#E5CFCB]"
          >
            Crafted by Axon. — Return to Agency Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}
