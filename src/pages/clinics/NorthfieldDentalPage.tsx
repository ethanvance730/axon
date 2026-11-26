import { useState } from 'react';
import { ArrowUpRight, Check, MapPin, Menu, Phone, X } from 'lucide-react';
import { DemoPortfolioBar } from '../../components/DemoPortfolioBar';
import { ResilientImage } from '../../components/ResilientImage';
import { MEDIA_ASSETS } from '../../data/clinicMedia';
import { useWhatsAppBooking } from '../../hooks/useWhatsAppBooking';
import { ROUTES, navigateTo } from '../../utils/router';
import { CLINIC_WHATSAPP_CONFIG } from '../../utils/whatsapp';

interface DentalTreatment {
  name: string;
  duration: string;
  overview: string;
  focus: string;
}

const DENTAL_TREATMENTS: DentalTreatment[] = [
  {
    name: 'General Dentistry',
    duration: '45 min consultation',
    overview:
      'Comprehensive oral health examinations, digital low-dose imaging, and preventive hygiene care delivered without rush.',
    focus: 'Preventive diagnostics · Gum health · Conservative restorations',
  },
  {
    name: 'Teeth Whitening',
    duration: '60 min + home kit',
    overview:
      'Clinician-supervised brightening protocols calibrated to reduce sensitivity while lifting deep intrinsic staining evenly.',
    focus: 'Custom-fitted trays · Shade calibration · Enamel-safe gels',
  },
  {
    name: 'Dental Implants',
    duration: '3D CBCT assessment',
    overview:
      'Biocompatible titanium and ceramic root replacements planned digitally for natural bite alignment and long-term stability.',
    focus: 'Guided placement · Single tooth & bridgework · Ceramic crowns',
  },
  {
    name: 'Invisalign',
    duration: '30 min digital scan',
    overview:
      'Discreet clear aligner orthodontics mapped with intraoral 3D scanning so you can review projected alignment before starting.',
    focus: 'Removable aligners · Adult & teen alignment · Retainer care',
  },
  {
    name: 'Cosmetic Dentistry',
    duration: '60 min smile review',
    overview:
      'Subtle composite edge bonding, recontouring, and balanced restoration planning focused on preserving healthy enamel.',
    focus: 'Minimal-prep bonding · Symmetry refinement · Natural translucency',
  },
  {
    name: 'Veneers',
    duration: 'Multi-visit bespoke',
    overview:
      'Ultra-thin hand-layered porcelain veneers designed alongside master ceramists for lifelike texture and restrained proportion.',
    focus: 'Trial smile preview · Ultra-thin ceramics · Shade matching',
  },
];

const DEMO_CLINICIANS = [
  {
    initials: 'AF',
    name: 'Dr. Alistair Finch',
    role: 'Principal Dentist · Fictional Demo Profile',
    credentials: 'BDS (Manchester) · Restorative & Implantology',
    bio: 'Focuses on minimally invasive restorative dentistry and digitally guided implant planning in a calm, transparent setting.',
  },
  {
    initials: 'PN',
    name: 'Dr. Priya Nair',
    role: 'Cosmetic & Aligner Clinician · Fictional Demo Profile',
    credentials: 'BDS · PG Dip Aesthetic Dentistry',
    bio: 'Specialises in clear aligner orthodontics, composite bonding, and conservative enamel preservation.',
  },
  {
    initials: 'HC',
    name: 'Hannah Chadwick',
    role: 'Dental Hygienist & Therapist · Fictional Demo Profile',
    credentials: 'BSc Oral Health Science',
    bio: 'Leads preventive periodontal maintenance, guided biofilm therapy, and gentle whitening preparation.',
  },
];

const ILLUSTRATIVE_CASES = [
  {
    id: 'whitening',
    title: 'Shade Brightening & Edge Refinement',
    caption: 'Illustrative digital demonstration showing conservative whitening tone balance.',
    beforeFilter: 'brightness(0.88) sepia(0.22) saturate(0.95)',
    afterFilter: 'brightness(1.03) contrast(1.02)',
  },
  {
    id: 'bonding',
    title: 'Porcelain & Composite Harmony',
    caption: 'Illustrative digital demonstration comparing warm uncalibrated tone vs. studio daylight finish.',
    beforeFilter: 'brightness(0.84) contrast(0.92) sepia(0.28)',
    afterFilter: 'brightness(1.04) contrast(1.04)',
  },
];

const PATIENT_JOURNEY = [
  {
    step: '01',
    title: 'Unhurried Consultation',
    text: 'Meet your clinician in a quiet private room to discuss goals, sensitivities, and priorities.',
  },
  {
    step: '02',
    title: 'Digital 3D Scanning',
    text: 'Optical intraoral scans replace traditional putty impressions for comfort and precision.',
  },
  {
    step: '03',
    title: 'Transparent Plan',
    text: 'Receive a written breakdown of options, expected timelines, and clear fee estimates.',
  },
  {
    step: '04',
    title: 'Calm Aftercare',
    text: 'Dedicated hygiene scheduling and ongoing guidance to protect your long-term dental health.',
  },
];

export function NorthfieldDentalPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTreatmentIdx, setSelectedTreatmentIdx] = useState(0);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(52);

  const booking = useWhatsAppBooking({
    clinicName: CLINIC_WHATSAPP_CONFIG.northfieldDental.clinicName,
    phoneNumber: CLINIC_WHATSAPP_CONFIG.northfieldDental.phoneNumber,
    defaultService: 'General Dentistry',
    serviceFieldLabel: 'Treatment',
    includeAdditionalMessage: true,
  });

  const activeTreatment = DENTAL_TREATMENTS[selectedTreatmentIdx] ?? DENTAL_TREATMENTS[0];
  const activeCase = ILLUSTRATIVE_CASES[activeCaseIdx] ?? ILLUSTRATIVE_CASES[0];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E2421] font-dental-body selection:bg-[#163026] selection:text-[#FBF9F5]">
      <DemoPortfolioBar
        currentRoute={ROUTES.NORTHFIELD_DENTAL}
        clinicLabel="Northfield Dental Studio (Manchester)"
      />

      {/* Bespoke European Minimalist Header */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#163026]/12">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
          <a
            href={ROUTES.NORTHFIELD_DENTAL}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-dental-display text-2xl sm:text-[1.65rem] font-semibold tracking-tight text-[#163026] whitespace-nowrap shrink-0"
          >
            Northfield Dental Studio
          </a>

          <nav
            aria-label="Northfield Dental navigation"
            className="hidden md:flex items-center gap-7 text-sm text-[#1E2421]/80"
          >
            <a
              href="#nd-treatments"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('nd-treatments');
              }}
              className="hover:text-[#163026] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Treatments
            </a>
            <a
              href="#nd-about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('nd-about');
              }}
              className="hover:text-[#163026] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Studio
            </a>
            <a
              href="#nd-team"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('nd-team');
              }}
              className="hover:text-[#163026] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Team
            </a>
            <a
              href="#nd-gallery"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('nd-gallery');
              }}
              className="hover:text-[#163026] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Gallery
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollTo('nd-booking')}
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-[#163026] text-[#FBF9F5] text-xs tracking-wider uppercase font-medium hover:bg-[#234739] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Consultation
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close studio menu' : 'Open studio menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[#163026]/20 text-[#163026] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#163026]/15 bg-[#FBF9F5] px-5 py-5">
            <nav aria-label="Northfield mobile navigation" className="flex flex-col gap-3">
              {[
                { label: 'Treatments', id: 'nd-treatments' },
                { label: 'The Studio', id: 'nd-about' },
                { label: 'Dental Team', id: 'nd-team' },
                { label: 'Smile Gallery', id: 'nd-gallery' },
                { label: 'Patient Journey', id: 'nd-journey' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="py-2 text-base text-[#163026] border-b border-[#163026]/10"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollTo('nd-booking')}
                className="mt-2 w-full py-3 bg-[#163026] text-[#FBF9F5] text-xs tracking-wider uppercase font-medium"
              >
                Request Appointment
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 py-2">
              <div className="space-y-6">
                <p className="text-xs tracking-[0.16em] uppercase text-[#6F877B] font-medium">
                  Deansgate, Manchester · Portfolio Demo
                </p>
                <h1 className="font-dental-display text-4xl sm:text-5xl lg:text-[3.6rem] font-medium leading-[1.06] text-[#163026] text-balance">
                  Measured dentistry for quiet,{' '}
                  <span className="italic font-normal">confident smiles.</span>
                </h1>
                <p className="text-base text-[#1E2421]/80 leading-relaxed max-w-md">
                  Northfield Dental Studio pairs European architectural calm with conservative clinical care—offering private general, cosmetic, and implant dentistry in central Manchester.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollTo('nd-booking')}
                    className="px-7 py-3.5 bg-[#163026] text-[#FBF9F5] text-xs tracking-wider uppercase font-medium hover:bg-[#234739] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Request Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo('nd-treatments')}
                    className="px-6 py-3.5 border border-[#163026]/25 text-[#163026] text-xs tracking-wider uppercase font-medium hover:border-[#163026] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Explore Treatments
                  </button>
                </div>
                <p className="text-xs text-[#6F877B]">
                  Fictional clinic website created as an Axon portfolio demonstration.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="h-full min-h-[320px] lg:min-h-[520px] overflow-hidden border border-[#163026]/12 bg-[#EAE4D8]">
                <ResilientImage
                  src={MEDIA_ASSETS.northfield.hero}
                  alt="Northfield Dental Studio sunlit private treatment suite in Manchester"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Categories */}
        <section id="nd-treatments" className="bg-[#163026] text-[#FBF9F5] py-16 lg:py-24">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-4">
                <p className="text-xs tracking-[0.16em] uppercase text-[#D6C7AE]">
                  Clinical Disciplines
                </p>
                <h2 className="font-dental-display text-3xl sm:text-4xl font-medium leading-tight text-balance">
                  Six core disciplines under one roof.
                </h2>
                <p className="text-sm text-[#FBF9F5]/75 leading-relaxed max-w-md">
                  Select a treatment category to review consultation timings and our conservative clinical approach.
                </p>

                <div className="pt-4 border-t border-white/15 space-y-1" role="tablist" aria-label="Dental treatment categories">
                  {DENTAL_TREATMENTS.map((item, idx) => {
                    const active = idx === selectedTreatmentIdx;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedTreatmentIdx(idx)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#FBF9F5] text-[#163026] font-medium'
                            : 'text-[#FBF9F5]/85 hover:bg-white/5'
                        }`}
                      >
                        <span className="font-dental-display text-xl">{item.name}</span>
                        <span className="text-xs opacity-75">{item.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#1E3D31] border border-white/15 p-8 sm:p-12 space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/15">
                  <span className="text-xs tracking-[0.14em] uppercase text-[#D6C7AE]">
                    Selected Discipline
                  </span>
                  <span className="text-xs text-[#FBF9F5]/80">{activeTreatment.duration}</span>
                </div>

                <h3 className="font-dental-display text-3xl sm:text-4xl font-medium">
                  {activeTreatment.name}
                </h3>

                <p className="text-base sm:text-lg text-[#FBF9F5]/85 leading-relaxed">
                  {activeTreatment.overview}
                </p>

                <div className="pt-4 border-t border-white/15">
                  <p className="text-xs tracking-[0.12em] uppercase text-[#D6C7AE] mb-2">
                    Clinical Focus
                  </p>
                  <p className="text-sm text-[#FBF9F5]/90">{activeTreatment.focus}</p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      booking.updateField('service', activeTreatment.name);
                      scrollTo('nd-booking');
                    }}
                    className="px-6 py-3 bg-[#D6C7AE] text-[#163026] text-xs tracking-wider uppercase font-semibold hover:bg-[#FBF9F5] transition-colors cursor-pointer"
                  >
                    Enquire About {activeTreatment.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Clinic */}
        <section id="nd-about" className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-[#163026]/12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs tracking-[0.16em] uppercase text-[#6F877B] mb-3">
                The Practice
              </p>
              <h2 className="font-dental-display text-3xl sm:text-4xl text-[#163026] font-medium leading-tight">
                Built around unhurried conversation and natural proportion.
              </h2>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-base text-[#1E2421]/85 leading-relaxed">
              <p>
                Designed like a calm European townhouse rather than a clinical waiting room, our Deansgate studio limits daily appointments so every patient has time to ask questions without pressure.
              </p>
              <p>
                Whether planning discreet Invisalign alignment, subtle composite refinement, or restorative implants, we prioritise long-term biological tooth structure over short-term trends.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Dental Team (Fictional Demo Profiles) */}
        <section id="nd-team" className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-[#163026]/12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs tracking-[0.16em] uppercase text-[#6F877B] mb-2">
                Clinical Team
              </p>
              <h2 className="font-dental-display text-3xl sm:text-4xl text-[#163026] font-medium">
                Meet the clinicians
              </h2>
            </div>
            <p className="text-xs text-[#6F877B] max-w-sm">
              Note: All clinician names and profiles shown here are fictional characters created for this portfolio showcase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_CLINICIANS.map((doc) => (
              <article
                key={doc.name}
                className="bg-white border border-[#163026]/12 p-8 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-[#163026] text-[#FBF9F5] font-dental-display text-xl flex items-center justify-center">
                    {doc.initials}
                  </div>
                  <div>
                    <h3 className="font-dental-display text-2xl font-medium text-[#163026]">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-[#6F877B] mt-1">{doc.role}</p>
                  </div>
                  <p className="text-sm text-[#1E2421]/80 leading-relaxed">{doc.bio}</p>
                </div>
                <p className="text-xs text-[#6F877B] pt-4 border-t border-[#163026]/10">
                  {doc.credentials}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Before-and-After Illustrative Demonstration Gallery */}
        <section id="nd-gallery" className="bg-[#F2EDE4] py-16 lg:py-24 border-b border-[#163026]/12">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs tracking-[0.16em] uppercase text-[#6F877B]">
                Illustrative Demonstration
              </p>
              <h2 className="font-dental-display text-3xl sm:text-4xl text-[#163026] font-medium leading-tight">
                Interactive smile tone comparison
              </h2>
              <p className="text-sm text-[#1E2421]/80 leading-relaxed">
                Slide across the frame to preview how a dental website presents cosmetic shade calibration cleanly.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {ILLUSTRATIVE_CASES.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCaseIdx(idx)}
                    className={`px-4 py-2 text-xs font-medium border transition-colors cursor-pointer ${
                      idx === activeCaseIdx
                        ? 'bg-[#163026] text-[#FBF9F5] border-[#163026]'
                        : 'bg-white text-[#163026] border-[#163026]/20'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-white/80 border border-[#163026]/15 text-xs text-[#1E2421]/80 leading-relaxed">
                <strong>Demonstration Notice:</strong> {activeCase.caption} Not a real patient clinical photograph or outcome guarantee.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#163026]/15 bg-[#EAE4D8]">
                {/* After layer (full base) */}
                <img
                  src={MEDIA_ASSETS.northfield.smile}
                  alt="Illustrative cosmetic smile demonstration"
                  referrerPolicy="no-referrer"
                  style={{ filter: activeCase.afterFilter }}
                  className="w-full h-full object-cover"
                />
                {/* Before layer (clipped left portion) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={MEDIA_ASSETS.northfield.smile}
                    alt="Illustrative pre-brightening tone reference"
                    referrerPolicy="no-referrer"
                    style={{ filter: activeCase.beforeFilter }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Divider handle */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 w-0.5 bg-white shadow"
                  style={{ left: `${sliderPosition}%` }}
                />

                <div className="absolute top-3 left-3 bg-[#163026]/85 text-[#FBF9F5] px-2.5 py-1 text-[11px] uppercase tracking-wider">
                  Illustrative Before
                </div>
                <div className="absolute top-3 right-3 bg-[#FBF9F5]/90 text-[#163026] px-2.5 py-1 text-[11px] uppercase tracking-wider">
                  Illustrative After
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="nd-compare-slider" className="text-xs font-medium text-[#163026] whitespace-nowrap">
                  Compare ({sliderPosition}%)
                </label>
                <input
                  id="nd-compare-slider"
                  type="range"
                  min={10}
                  max={90}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full accent-[#163026] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Patient Journey */}
        <section id="nd-journey" className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-[#163026]/12">
          <div className="mb-12">
            <p className="text-xs tracking-[0.16em] uppercase text-[#6F877B] mb-2">
              Patient Journey
            </p>
            <h2 className="font-dental-display text-3xl sm:text-4xl text-[#163026] font-medium">
              From initial conversation to lasting care
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PATIENT_JOURNEY.map((stage) => (
              <div key={stage.step} className="border-t-2 border-[#163026] pt-5 space-y-2.5">
                <span className="text-xs font-medium text-[#6F877B] tabular-nums">
                  {stage.step}
                </span>
                <h3 className="font-dental-display text-2xl font-medium text-[#163026]">
                  {stage.title}
                </h3>
                <p className="text-sm text-[#1E2421]/80 leading-relaxed">{stage.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Appointment Booking (WhatsApp Integration) */}
        <section id="nd-booking" className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs tracking-[0.16em] uppercase text-[#6F877B]">
                Appointment Request
              </p>
              <h2 className="font-dental-display text-3xl sm:text-4xl text-[#163026] font-medium leading-tight">
                Request a private visit via WhatsApp.
              </h2>
              <p className="text-sm sm:text-base text-[#1E2421]/80 leading-relaxed">
                Complete the request form to prepare a formatted WhatsApp message for our Manchester reception desk. Submitting generates a request only—appointments are confirmed manually by our team once availability is checked.
              </p>

              <div className="p-5 bg-white border border-[#163026]/15 space-y-3 text-xs text-[#1E2421]/80">
                <p className="font-semibold text-[#163026]">Studio Reception Details (Demo)</p>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#6F877B] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>42 Deansgate, Manchester M3 2FF, United Kingdom</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#6F877B] shrink-0" aria-hidden="true" />
                  <span>WhatsApp Desk: +44 7700 900101</span>
                </div>
                <p className="text-[#6F877B] pt-1">
                  Monday – Friday: 08:30 – 18:00 · Saturday: 09:00 – 14:00
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#163026]/15 p-6 sm:p-10">
              <form onSubmit={booking.handleSubmit} noValidate className="space-y-5">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="nd-hp">Website</label>
                  <input
                    id="nd-hp"
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
                    <label htmlFor="nd-name" className="block text-xs font-medium text-[#163026] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="nd-name"
                      type="text"
                      required
                      value={booking.values.fullName}
                      onChange={(e) => booking.updateField('fullName', e.target.value)}
                      placeholder="John Smith"
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#163026]/20 text-sm focus:outline-none focus:border-[#163026]"
                    />
                    {booking.errors.fullName && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="nd-phone" className="block text-xs font-medium text-[#163026] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="nd-phone"
                      type="tel"
                      required
                      value={booking.values.phone}
                      onChange={(e) => booking.updateField('phone', e.target.value)}
                      placeholder="07123 456789"
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#163026]/20 text-sm focus:outline-none focus:border-[#163026]"
                    />
                    {booking.errors.phone && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nd-email" className="block text-xs font-medium text-[#163026] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="nd-email"
                      type="email"
                      required
                      value={booking.values.email}
                      onChange={(e) => booking.updateField('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#163026]/20 text-sm focus:outline-none focus:border-[#163026]"
                    />
                    {booking.errors.email && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="nd-treatment" className="block text-xs font-medium text-[#163026] mb-1.5">
                      Treatment Required *
                    </label>
                    <select
                      id="nd-treatment"
                      value={booking.values.service}
                      onChange={(e) => booking.updateField('service', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#163026]/20 text-sm focus:outline-none focus:border-[#163026]"
                    >
                      {DENTAL_TREATMENTS.map((t) => (
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
                    <label htmlFor="nd-date" className="block text-xs font-medium text-[#163026] mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      id="nd-date"
                      type="date"
                      min={booking.todayIso}
                      required
                      value={booking.values.preferredDate}
                      onChange={(e) => booking.updateField('preferredDate', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#163026]/20 text-sm focus:outline-none focus:border-[#163026]"
                    />
                    {booking.errors.preferredDate && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="nd-time" className="block text-xs font-medium text-[#163026] mb-1.5">
                      Preferred Time *
                    </label>
                    <select
                      id="nd-time"
                      value={booking.values.preferredTime}
                      onChange={(e) => booking.updateField('preferredTime', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#163026]/20 text-sm focus:outline-none focus:border-[#163026]"
                    >
                      <option value="">Select preferred time</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                    </select>
                    {booking.errors.preferredTime && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="nd-message" className="block text-xs font-medium text-[#163026] mb-1.5">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="nd-message"
                    rows={3}
                    value={booking.values.additionalMessage ?? ''}
                    onChange={(e) => booking.updateField('additionalMessage', e.target.value)}
                    placeholder="I would like to discuss available options."
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#163026]/20 text-sm focus:outline-none focus:border-[#163026]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#6F877B]">
                    Request only—not a confirmed booking until verified by reception.
                  </p>
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#163026] text-[#FBF9F5] text-xs tracking-wider uppercase font-medium hover:bg-[#234739] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Generate WhatsApp Request
                  </button>
                </div>

                {booking.generated && (
                  <div
                    role="status"
                    data-testid="nd-whatsapp-result"
                    className="mt-6 p-5 bg-[#FBF9F5] border border-[#163026]/25 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#163026]">
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>WhatsApp Appointment Request Ready</span>
                    </div>
                    <p className="text-xs text-[#1E2421]/80 leading-relaxed">
                      WhatsApp does not send messages automatically. Open WhatsApp below, review your details, and press Send to submit your request to Northfield Dental Studio.
                    </p>
                    <pre className="p-3.5 bg-white border border-[#163026]/12 text-xs text-[#1E2421] whitespace-pre-wrap font-dental-body">
                      {booking.generated.message}
                    </pre>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={booking.generated.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#163026] text-[#FBF9F5] text-xs tracking-wider uppercase font-medium hover:bg-[#234739]"
                      >
                        <span>Open in WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={booking.resetForm}
                        className="px-4 py-2.5 border border-[#163026]/20 text-xs text-[#163026] hover:bg-white cursor-pointer"
                      >
                        Clear Form
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#163026] text-[#FBF9F5]/85 py-12 border-t border-white/10">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-dental-display text-2xl text-[#FBF9F5]">Northfield Dental Studio</p>
            <p className="text-xs text-[#D6C7AE] mt-1">
              42 Deansgate, Manchester M3 2FF · Fictional Portfolio Demonstration
            </p>
          </div>
          <a
            href={ROUTES.AGENCY}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(ROUTES.AGENCY);
            }}
            className="text-xs underline underline-offset-4 text-[#FBF9F5] hover:text-[#D6C7AE]"
          >
            Designed &amp; Built by Axon. — Return to Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}
