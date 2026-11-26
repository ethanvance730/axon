import { useState } from 'react';
import { ArrowUpRight, Check, MapPin, Menu, Phone, X } from 'lucide-react';
import { DemoPortfolioBar } from '../../components/DemoPortfolioBar';
import { ResilientImage } from '../../components/ResilientImage';
import { MEDIA_ASSETS } from '../../data/clinicMedia';
import { useWhatsAppBooking } from '../../hooks/useWhatsAppBooking';
import { ROUTES, navigateTo } from '../../utils/router';
import { CLINIC_WHATSAPP_CONFIG } from '../../utils/whatsapp';

const REHAB_SERVICES = [
  {
    name: 'Sports Injury Rehabilitation',
    duration: '60 MIN SESSION',
    summary:
      'Structured progressive loading from acute tissue protection through sprint mechanics, cutting, and match readiness.',
  },
  {
    name: 'Physiotherapy',
    duration: '45 MIN SESSION',
    summary:
      'Hands-on musculoskeletal assessment, joint mobilisation, and targeted exercise prescription for stubborn pain or stiffness.',
  },
  {
    name: 'Sports Massage',
    duration: '45 / 60 MIN',
    summary:
      'Deep myofascial release and recovery bodywork timed around heavy training blocks, marathons, or match schedules.',
  },
  {
    name: 'Injury Prevention',
    duration: '60 MIN SCREEN',
    summary:
      'Bilateral strength and asymmetry profiling to spot overload patterns before they sideline your season.',
  },
  {
    name: 'Mobility Assessment',
    duration: '45 MIN LAB',
    summary:
      'Ankle dorsiflexion, hip rotation, and thoracic extension testing for lifters, runners, and court athletes.',
  },
  {
    name: 'Strength and Conditioning',
    duration: '60 MIN TURF',
    summary:
      'Bridge-the-gap gym programming integrating eccentric tendon loading, power output, and landing control.',
  },
];

const INJURY_GUIDES = [
  {
    tab: 'Knee & ACL',
    headline: 'Ligament Stability & Patellofemoral Load',
    overview:
      'Post-operative ACL reconstruction rehab and runner’s knee require objective quadriceps-to-hamstring force symmetry before returning to deceleration.',
    checkpoints: [
      'Swelling & full knee extension restoration',
      'Single-leg hop & deceleration mechanics',
      'Progressive plyometric turf progression',
    ],
  },
  {
    tab: 'Hamstring & Calf',
    headline: 'Sprint Strain & Tendon Capacity',
    overview:
      'Recurrent posterior chain strains happen when tissues lack eccentric strength at high sprint velocities. We rebuild length and stiffness progressively.',
    checkpoints: [
      'Isometric pain modulation & gait check',
      'Eccentric slider & Nordic load progression',
      'High-speed running exposure build-up',
    ],
  },
  {
    tab: 'Shoulder & Rotator',
    headline: 'Overhead Power & Scapular Control',
    overview:
      'Swimmers, racket players, and overhead lifters rely on balanced cuff endurance and thoracic mobility rather than passive rest alone.',
    checkpoints: [
      'Thoracic rotation & scapular rhythm screen',
      'External rotation isometric & heavy slow loading',
      'Overhead deceleration & return to throwing',
    ],
  },
  {
    tab: 'Running Overuse',
    headline: 'Shin Splints, Achilles & Bone Stress',
    overview:
      'Training spikes outpace tendon adaptation. We adjust weekly volume while rebuilding calf soleus capacity and cadence efficiency.',
    checkpoints: [
      'Seated & standing calf capacity benchmarking',
      'Cadence & ground-contact load review',
      'Structured return-to-mileage calendar',
    ],
  },
];

const APEX_PRACTITIONERS = [
  {
    name: 'Callum Reid',
    role: 'Lead Sports Physiotherapist · Fictional Demo Profile',
    credentials: 'MSc Sports Physiotherapy · HCPC Demo Profile',
    specialty: 'Knee, ACL & rugby/football return-to-play rehabilitation',
  },
  {
    name: 'Maya Thornton',
    role: 'Musculoskeletal Physio · Fictional Demo Profile',
    credentials: 'BSc (Hons) Physiotherapy · Running Specialist',
    specialty: 'Endurance running mechanics, Achilles & bone stress recovery',
  },
  {
    name: 'Kieran Boyle',
    role: 'Strength & Rehab Coach · Fictional Demo Profile',
    credentials: 'MSc Strength & Conditioning',
    specialty: 'Force-plate testing, gym programming & sports massage',
  },
];

export function ApexPhysiotherapyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeInjuryIdx, setActiveInjuryIdx] = useState(0);

  const booking = useWhatsAppBooking({
    clinicName: CLINIC_WHATSAPP_CONFIG.apexPhysiotherapy.clinicName,
    phoneNumber: CLINIC_WHATSAPP_CONFIG.apexPhysiotherapy.phoneNumber,
    defaultService: 'Sports Injury Rehabilitation',
    serviceFieldLabel: 'Service Required',
    includeAdditionalMessage: true,
    requestOpeningLine: 'I would like to request a physiotherapy consultation.',
  });

  const activeInjury = INJURY_GUIDES[activeInjuryIdx] ?? INJURY_GUIDES[0];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#111215] text-[#F4F4F1] font-apex-body selection:bg-[#FF5416] selection:text-white">
      <DemoPortfolioBar
        currentRoute={ROUTES.APEX_PHYSIOTHERAPY}
        clinicLabel="Apex Sports Physiotherapy (Leeds)"
      />

      {/* Sharp Industrial Performance Header */}
      <header className="sticky top-0 z-40 bg-[#111215]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
          <a
            href={ROUTES.APEX_PHYSIOTHERAPY}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-apex-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white whitespace-nowrap shrink-0"
          >
            Apex <span className="text-[#FF5416]">Physio</span>
          </a>

          <nav
            aria-label="Apex Physiotherapy navigation"
            className="hidden md:flex items-center gap-8 font-apex-display text-lg tracking-wider uppercase text-neutral-300"
          >
            <a
              href="#ap-services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('ap-services');
              }}
              className="hover:text-[#FF5416] transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#ap-injuries"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('ap-injuries');
              }}
              className="hover:text-[#FF5416] transition-colors whitespace-nowrap shrink-0"
            >
              Injuries
            </a>
            <a
              href="#ap-approach"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('ap-approach');
              }}
              className="hover:text-[#FF5416] transition-colors whitespace-nowrap shrink-0"
            >
              Approach
            </a>
            <a
              href="#ap-team"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('ap-team');
              }}
              className="hover:text-[#FF5416] transition-colors whitespace-nowrap shrink-0"
            >
              Team
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollTo('ap-booking')}
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-[#FF5416] text-white font-apex-display text-base tracking-wider uppercase font-bold hover:bg-[#e0430b] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Assessment
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-white/20 text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#111215] px-5 py-5">
            <nav aria-label="Apex mobile navigation" className="flex flex-col gap-3">
              {[
                { label: 'Rehab Services', id: 'ap-services' },
                { label: 'Sports Injuries', id: 'ap-injuries' },
                { label: 'Recovery Approach', id: 'ap-approach' },
                { label: 'Practitioners', id: 'ap-team' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="py-2 font-apex-display text-xl uppercase tracking-wider text-white border-b border-white/10"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollTo('ap-booking')}
                className="mt-2 w-full py-3 bg-[#FF5416] text-white font-apex-display text-lg uppercase tracking-wider font-bold"
              >
                Book Assessment
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Bold Athletic Asymmetric Hero */}
        <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-20 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#FF5416] font-semibold">
                  Leeds Dock Performance Lab · Fictional Demo
                </p>
                <h1 className="font-apex-display text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold uppercase leading-[0.95] tracking-tight text-white text-balance">
                  Rebuild strength. Return to peak output.
                </h1>
                <p className="text-base text-neutral-300 leading-relaxed max-w-md">
                  Evidence-led sports physiotherapy, sprint turf rehab, and strength conditioning in Leeds for runners, field athletes, and active adults.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollTo('ap-booking')}
                    className="px-7 py-4 bg-[#FF5416] text-white font-apex-display text-lg tracking-wider uppercase font-bold hover:bg-[#e0430b] transition-colors cursor-pointer"
                  >
                    Request Assessment
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo('ap-services')}
                    className="px-6 py-4 border border-white/25 text-white font-apex-display text-lg tracking-wider uppercase hover:border-white transition-colors cursor-pointer"
                  >
                    View Services
                  </button>
                </div>
                <p className="text-xs text-neutral-400">
                  Portfolio demonstration website · Fictional Leeds sports physiotherapy clinic
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="h-full min-h-[320px] lg:min-h-[500px] bg-[#1D1F24] border border-white/10 overflow-hidden">
                <ResilientImage
                  src={MEDIA_ASSETS.apex.hero}
                  alt="Apex Sports Physiotherapy treatment bay and black sprint turf lane in Leeds"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rehabilitation Services */}
        <section id="ap-services" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-[#FF5416] font-semibold">
                Rehabilitation &amp; Conditioning
              </p>
              <h2 className="font-apex-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                Six performance services
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              Built around active load progression rather than passive band-aid rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {REHAB_SERVICES.map((service) => (
              <article
                key={service.name}
                className="bg-[#181A1F] p-7 sm:p-8 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.14em] uppercase text-[#FF5416] font-semibold tabular-nums">
                    {service.duration}
                  </p>
                  <h3 className="font-apex-display text-2xl sm:text-3xl font-bold uppercase text-white">
                    {service.name}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {service.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    booking.updateField('service', service.name);
                    scrollTo('ap-booking');
                  }}
                  className="self-start text-xs tracking-wider uppercase font-semibold text-white hover:text-[#FF5416] underline underline-offset-4 cursor-pointer"
                >
                  Book This Service →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Sports Injury Information Tabs */}
        <section id="ap-injuries" className="bg-[#1D1F24] py-16 lg:py-24 border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="mb-10 space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-[#FF5416] font-semibold">
                Injury Pathways
              </p>
              <h2 className="font-apex-display text-4xl sm:text-5xl font-bold uppercase text-white">
                Common sports injuries we treat
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Sports injury categories"
              className="flex flex-wrap gap-2 mb-8"
            >
              {INJURY_GUIDES.map((item, idx) => {
                const selected = idx === activeInjuryIdx;
                return (
                  <button
                    key={item.tab}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveInjuryIdx(idx)}
                    className={`px-5 py-3 font-apex-display text-lg uppercase tracking-wider transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#FF5416] text-white font-bold'
                        : 'bg-[#111215] text-neutral-300 border border-white/10 hover:border-white/35'
                    }`}
                  >
                    {item.tab}
                  </button>
                );
              })}
            </div>

            <div className="bg-[#111215] border border-white/10 p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-apex-display text-3xl font-bold uppercase text-white">
                  {activeInjury.headline}
                </h3>
                <p className="text-base text-neutral-300 leading-relaxed">
                  {activeInjury.overview}
                </p>
              </div>
              <div className="lg:col-span-5 space-y-3 pt-4 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[#FF5416] font-semibold">
                  Key Assessment Checkpoints
                </p>
                <ul className="space-y-2.5 text-sm text-neutral-200">
                  {activeInjury.checkpoints.map((cp) => (
                    <li key={cp} className="flex items-start gap-2.5">
                      <span className="text-[#FF5416] font-bold" aria-hidden="true">
                        /
                      </span>
                      <span>{cp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Physiotherapy Approach & Performance Recovery */}
        <section id="ap-approach" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] bg-[#1D1F24] border border-white/10 overflow-hidden">
                <ResilientImage
                  src={MEDIA_ASSETS.apex.rehab}
                  alt="Runner performing guided knee stability and lunge assessment with a physiotherapist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[#FF5416] font-semibold">
                  Performance Recovery
                </p>
                <h2 className="font-apex-display text-4xl sm:text-5xl font-bold uppercase text-white leading-none">
                  Measured progression, not guesswork.
                </h2>
              </div>

              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {[
                  {
                    step: '01',
                    title: 'Acute Load & Movement Triage',
                    copy: 'Pinpoint irritated structures while keeping safe surrounding conditioning active.',
                  },
                  {
                    step: '02',
                    title: 'Force & Joint Capacity Rebuild',
                    copy: 'Progressive strength work on the gym floor and sprint track to surpass pre-injury tolerance.',
                  },
                  {
                    step: '03',
                    title: 'Return-to-Sport Clearance',
                    copy: 'Objective hop, sprint, and symmetry benchmarks before full training or race entry.',
                  },
                ].map((phase) => (
                  <div key={phase.step} className="py-5 flex items-start gap-5">
                    <span className="font-apex-display text-2xl font-bold text-[#FF5416] tabular-nums">
                      {phase.step}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-apex-display text-2xl font-bold uppercase text-white">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed">{phase.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Practitioners (Fictional Demo Profiles) */}
        <section id="ap-team" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#FF5416] font-semibold mb-2">
                Performance Staff
              </p>
              <h2 className="font-apex-display text-4xl sm:text-5xl font-bold uppercase text-white">
                Physios &amp; rehab specialists
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              All practitioner profiles shown are fictional characters for portfolio demonstration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APEX_PRACTITIONERS.map((person) => (
              <article
                key={person.name}
                className="bg-[#181A1F] border border-white/10 p-7 space-y-3"
              >
                <p className="text-xs uppercase tracking-wider text-[#FF5416] font-semibold">
                  {person.role}
                </p>
                <h3 className="font-apex-display text-3xl font-bold uppercase text-white">
                  {person.name}
                </h3>
                <p className="text-xs text-neutral-400">{person.credentials}</p>
                <p className="text-sm text-neutral-300 leading-relaxed pt-3 border-t border-white/10">
                  {person.specialty}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Consultation Booking & Location */}
        <section id="ap-booking" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[#FF5416] font-semibold">
                Consultation Request
              </p>
              <h2 className="font-apex-display text-4xl sm:text-5xl font-bold uppercase text-white leading-none">
                Book your Leeds assessment.
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Submit your details to generate a prefilled WhatsApp booking request for our Leeds reception team. Submitting is a request only—slot availability is confirmed directly by our clinic desk.
              </p>

              <div className="bg-[#181A1F] border border-white/10 p-6 space-y-3 text-sm text-neutral-300">
                <p className="font-apex-display text-xl uppercase tracking-wider text-white">
                  Leeds Dock Lab (Demo)
                </p>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FF5416] shrink-0 mt-1" aria-hidden="true" />
                  <span>Unit 6, Armouries Way, Leeds Dock, Leeds LS10 1LE</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FF5416] shrink-0" aria-hidden="true" />
                  <span>WhatsApp Desk: +44 7700 900404</span>
                </div>
                <p className="text-xs text-neutral-400 pt-1">
                  Mon – Fri: 07:00 – 20:00 · Saturday: 08:00 – 15:00
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#181A1F] border border-white/10 p-6 sm:p-10">
              <form onSubmit={booking.handleSubmit} noValidate className="space-y-5">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="ap-hp">Website</label>
                  <input
                    id="ap-hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={booking.values.honeypot ?? ''}
                    onChange={(e) => booking.updateField('honeypot', e.target.value)}
                  />
                </div>

                {booking.errors.form && (
                  <p role="alert" className="text-sm text-red-200 bg-red-950/70 border border-red-700 p-3">
                    {booking.errors.form}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ap-name" className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="ap-name"
                      type="text"
                      required
                      value={booking.values.fullName}
                      onChange={(e) => booking.updateField('fullName', e.target.value)}
                      placeholder="Sam Whitaker"
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/20 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF5416]"
                    />
                    {booking.errors.fullName && (
                      <p className="text-xs text-[#FF8A65] mt-1">{booking.errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ap-phone" className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5">
                      Contact Number *
                    </label>
                    <input
                      id="ap-phone"
                      type="tel"
                      required
                      value={booking.values.phone}
                      onChange={(e) => booking.updateField('phone', e.target.value)}
                      placeholder="07700 900654"
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/20 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF5416]"
                    />
                    {booking.errors.phone && (
                      <p className="text-xs text-[#FF8A65] mt-1">{booking.errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ap-email" className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="ap-email"
                      type="email"
                      required
                      value={booking.values.email}
                      onChange={(e) => booking.updateField('email', e.target.value)}
                      placeholder="sam@example.co.uk"
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/20 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF5416]"
                    />
                    {booking.errors.email && (
                      <p className="text-xs text-[#FF8A65] mt-1">{booking.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ap-service" className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      id="ap-service"
                      value={booking.values.service}
                      onChange={(e) => booking.updateField('service', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/20 text-sm text-white focus:outline-none focus:border-[#FF5416]"
                    >
                      {REHAB_SERVICES.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {booking.errors.service && (
                      <p className="text-xs text-[#FF8A65] mt-1">{booking.errors.service}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="ap-date" className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      id="ap-date"
                      type="date"
                      min={booking.todayIso}
                      required
                      value={booking.values.preferredDate}
                      onChange={(e) => booking.updateField('preferredDate', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/20 text-sm text-white focus:outline-none focus:border-[#FF5416]"
                    />
                    {booking.errors.preferredDate && (
                      <p className="text-xs text-[#FF8A65] mt-1">{booking.errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ap-time" className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5">
                      Preferred Time *
                    </label>
                    <select
                      id="ap-time"
                      value={booking.values.preferredTime}
                      onChange={(e) => booking.updateField('preferredTime', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/20 text-sm text-white focus:outline-none focus:border-[#FF5416]"
                    >
                      <option value="">Select session window</option>
                      <option value="07:30 AM">07:30 AM (Early Bird)</option>
                      <option value="12:00 PM">12:00 PM (Midday)</option>
                      <option value="04:30 PM">04:30 PM (Afternoon)</option>
                      <option value="06:30 PM">06:30 PM (Evening)</option>
                    </select>
                    {booking.errors.preferredTime && (
                      <p className="text-xs text-[#FF8A65] mt-1">{booking.errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="ap-msg" className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="ap-msg"
                    rows={3}
                    value={booking.values.additionalMessage ?? ''}
                    onChange={(e) => booking.updateField('additionalMessage', e.target.value)}
                    placeholder="e.g. Marathon training build, right calf tightness during tempo runs."
                    className="w-full px-3.5 py-2.5 bg-[#111215] border border-white/20 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF5416]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-neutral-400">
                    Request only—manual confirmation required via WhatsApp.
                  </p>
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#FF5416] text-white font-apex-display text-lg uppercase tracking-wider font-bold hover:bg-[#e0430b] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Generate WhatsApp Request
                  </button>
                </div>

                {booking.generated && (
                  <div
                    role="status"
                    data-testid="ap-whatsapp-result"
                    className="mt-6 p-5 bg-[#111215] border border-[#FF5416]/50 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Check className="w-4 h-4 text-[#FF5416]" aria-hidden="true" />
                      <span>WhatsApp Consultation Request Ready</span>
                    </div>
                    <p className="text-xs text-neutral-300">
                      Click Open in WhatsApp below, verify your request details, and press Send inside WhatsApp.
                    </p>
                    <pre className="p-3.5 bg-[#181A1F] border border-white/10 text-xs text-neutral-200 whitespace-pre-wrap font-apex-body">
                      {booking.generated.message}
                    </pre>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={booking.generated.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5416] text-white font-apex-display text-base uppercase tracking-wider font-bold"
                      >
                        <span>Open in WhatsApp</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={booking.resetForm}
                        className="px-4 py-2.5 border border-white/20 text-xs text-neutral-300 cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B0C0E] text-neutral-400 py-10 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-apex-display text-2xl font-bold uppercase tracking-wider text-white">
              Apex Sports Physiotherapy
            </p>
            <p className="text-xs mt-1">
              Leeds Dock, Leeds LS10 · Fictional Portfolio Demonstration
            </p>
          </div>
          <a
            href={ROUTES.AGENCY}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(ROUTES.AGENCY);
            }}
            className="text-xs text-[#FF5416] underline underline-offset-4 hover:text-white"
          >
            Built by Axon. — Return to Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}
