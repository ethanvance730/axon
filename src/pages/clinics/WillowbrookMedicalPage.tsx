import { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';
import { DemoPortfolioBar } from '../../components/DemoPortfolioBar';
import { ResilientImage } from '../../components/ResilientImage';
import { MEDIA_ASSETS } from '../../data/clinicMedia';
import { useWhatsAppBooking } from '../../hooks/useWhatsAppBooking';
import { ROUTES, navigateTo } from '../../utils/router';
import { CLINIC_WHATSAPP_CONFIG } from '../../utils/whatsapp';

const MEDICAL_SERVICES = [
  {
    name: 'General Consultations',
    summary:
      'Unhurried 15- and 30-minute appointments with a family GP to discuss everyday health concerns and ongoing care.',
  },
  {
    name: 'Health Checks',
    summary:
      'Routine blood pressure, cardiovascular risk, and general wellbeing reviews tailored to your age and family history.',
  },
  {
    name: 'Family Healthcare',
    summary:
      'Continuity of care across generations—supporting children, working adults, and older relatives under one practice.',
  },
  {
    name: 'Preventive Care',
    summary:
      'Structured lifestyle guidance, screening reminders, and proactive monitoring to help keep long-term conditions steady.',
  },
  {
    name: 'Vaccination Information',
    summary:
      'Clear seasonal flu, childhood immunisation, and travel vaccination scheduling advice from our practice nursing team.',
  },
  {
    name: 'Minor Illness Consultations',
    summary:
      'Same-week appointments for common infections, ear and throat complaints, rashes, and minor respiratory symptoms.',
  },
];

const MEDICAL_TEAM = [
  {
    name: 'Dr. Graham Ellis',
    role: 'Senior General Practitioner · Fictional Demo Profile',
    credentials: 'MBChB MRCGP (Birmingham)',
    summary:
      'Focuses on long-term family continuity, cardiovascular prevention, and older adult medicine.',
  },
  {
    name: 'Dr. Nadia Hussain',
    role: 'General Practitioner · Fictional Demo Profile',
    credentials: 'MBBS DRCOG MRCGP',
    summary:
      'Leads women’s health clinics, paediatric consultations, and preventive screening advice.',
  },
  {
    name: "Sister Claire O'Connor",
    role: 'Lead Practice Nurse · Fictional Demo Profile',
    credentials: 'RN BSc (Hons)',
    summary:
      'Coordinates immunisation information clinics, routine health checks, and asthma care reviews.',
  },
];

const OPENING_HOURS = [
  { day: 'Monday – Wednesday', hours: '08:00 – 18:30' },
  { day: 'Thursday', hours: '08:00 – 19:30' },
  { day: 'Friday', hours: '08:00 – 18:00' },
  { day: 'Saturday (Pre-booked)', hours: '09:00 – 12:30' },
  { day: 'Sunday & Bank Holidays', hours: 'Closed (Use NHS 111)' },
];

const MEDICAL_FAQS = [
  {
    q: 'Why should I avoid entering medical symptoms into the WhatsApp request form?',
    a: 'Standard messaging apps are not intended for clinical triage or medical records. Our booking form collects only your contact details and preferred appointment window so reception can arrange a confidential call or visit.',
  },
  {
    q: 'Is the clinic accessible for wheelchairs and prams?',
    a: 'Yes. All ground-floor consulting rooms, reception desks, and patient washrooms have step-free access and wide automatic doors.',
  },
  {
    q: 'What should I bring to a routine Health Check or General Consultation?',
    a: 'Bringing an up-to-date list of any regular medicines or vitamins you take helps your GP or nurse review everything smoothly.',
  },
  {
    q: 'Is Willowbrook Family Medical Centre a real NHS or private clinic?',
    a: 'No. This is a fictional UK general practice demonstration site created by Axon to show accessible healthcare web design.',
  },
];

export function WillowbrookMedicalPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const booking = useWhatsAppBooking({
    clinicName: CLINIC_WHATSAPP_CONFIG.willowbrookMedical.clinicName,
    phoneNumber: CLINIC_WHATSAPP_CONFIG.willowbrookMedical.phoneNumber,
    defaultService: 'General Consultations',
    serviceFieldLabel: 'Appointment Type',
    includeAdditionalMessage: false,
    requestOpeningLine: 'I would like to request an appointment slot.',
  });

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-[#0F2942] font-medical-body selection:bg-[#0D9488] selection:text-white">
      <DemoPortfolioBar
        currentRoute={ROUTES.WILLOWBROOK_MEDICAL}
        clinicLabel="Willowbrook Family Medical Centre (Birmingham)"
      />

      {/* Accessible Healthcare Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between gap-6">
          <a
            href={ROUTES.WILLOWBROOK_MEDICAL}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-medical-display text-lg sm:text-xl font-bold text-[#0F2942] whitespace-nowrap shrink-0"
          >
            Willowbrook Medical
          </a>

          <nav
            aria-label="Willowbrook Medical navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#wb-services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('wb-services');
              }}
              className="hover:text-[#0F2942] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#wb-team"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('wb-team');
              }}
              className="hover:text-[#0F2942] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Practice Team
            </a>
            <a
              href="#wb-hours"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('wb-hours');
              }}
              className="hover:text-[#0F2942] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Opening Hours
            </a>
            <a
              href="#wb-faqs"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('wb-faqs');
              }}
              className="hover:text-[#0F2942] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Patient Info
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollTo('wb-booking')}
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-[#0D9488] text-white text-sm font-semibold rounded-lg hover:bg-[#0F766E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request Appointment
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-300 text-[#0F2942] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4">
            <nav aria-label="Willowbrook mobile navigation" className="flex flex-col gap-2">
              {[
                { label: 'Medical Services', id: 'wb-services' },
                { label: 'Practice Team', id: 'wb-team' },
                { label: 'Opening Hours', id: 'wb-hours' },
                { label: 'Patient Info & FAQs', id: 'wb-faqs' },
                { label: 'Directions', id: 'wb-directions' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="py-2.5 text-base font-medium text-[#0F2942] border-b border-slate-100"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollTo('wb-booking')}
                className="mt-2 w-full py-3 bg-[#0D9488] text-white text-sm font-semibold rounded-lg"
              >
                Request Appointment
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Friendly, Clear Healthcare Hero */}
        <section className="bg-[#EBF5FB] border-b border-sky-100">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-18 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm font-semibold text-[#0D9488]">
                Harborne, Birmingham · Fictional Family Practice Demo
              </p>
              <h1 className="font-medical-display text-3xl sm:text-5xl font-bold leading-[1.12] text-[#0F2942] text-balance">
                Clear, reassuring healthcare for every generation of your family.
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
                Willowbrook Family Medical Centre provides approachable GP consultations, preventive health checks, and routine family care in a welcoming, step-free Birmingham clinic.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => scrollTo('wb-booking')}
                  className="px-6 py-3.5 bg-[#0D9488] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#0F766E] transition-colors cursor-pointer"
                >
                  Request an Appointment
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('wb-hours')}
                  className="px-6 py-3.5 bg-white text-[#0F2942] border border-slate-300 text-sm sm:text-base font-semibold rounded-lg hover:border-[#0F2942] transition-colors cursor-pointer"
                >
                  Opening Hours
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-sky-200 bg-white">
                <ResilientImage
                  src={MEDIA_ASSETS.willowbrook.hero}
                  alt="Bright welcoming reception and waiting area at Willowbrook Family Medical Centre"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Practice Strip: Opening Hours & Urgent Care Guidance */}
        <section id="wb-hours" className="bg-[#0F2942] text-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-300 text-sm font-semibold">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Clinic Opening Hours</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                For urgent medical advice when the clinic is closed, contact NHS 111. In an emergency, always dial 999.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {OPENING_HOURS.map((row) => (
                <div
                  key={row.day}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                >
                  <p className="text-xs text-teal-200 font-medium">{row.day}</p>
                  <p className="text-sm font-semibold tabular-nums mt-0.5">{row.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Services */}
        <section id="wb-services" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-2xl space-y-3 mb-10">
            <p className="text-sm font-semibold text-[#0D9488]">Medical Services</p>
            <h2 className="font-medical-display text-3xl sm:text-4xl font-bold text-[#0F2942]">
              Core general practice services
            </h2>
            <p className="text-base text-slate-600">
              Straightforward, plain-English care for routine consultations, checks, and preventive advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEDICAL_SERVICES.map((service) => (
              <article
                key={service.name}
                className="bg-[#F8FBFD] border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-2.5">
                  <h3 className="font-medical-display text-xl font-bold text-[#0F2942]">
                    {service.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {service.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    booking.updateField('service', service.name);
                    scrollTo('wb-booking');
                  }}
                  className="self-start text-sm font-semibold text-[#0D9488] hover:text-[#0F2942] hover:underline underline-offset-4 cursor-pointer"
                >
                  Request this appointment →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* About the Practice & Healthcare Professionals */}
        <section id="wb-team" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20 border-b border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={MEDIA_ASSETS.willowbrook.consult}
                  alt="General practitioner speaking warmly with a patient in a bright Birmingham consultation room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <p className="text-sm font-semibold text-[#0D9488]">About Our Practice</p>
              <h2 className="font-medical-display text-3xl sm:text-4xl font-bold text-[#0F2942] text-balance">
                Continuity of care you can recognise on every visit.
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                We believe good primary care feels unhurried and personal. Our reception team, practice nurses, and GPs work closely together so families in Birmingham know who is looking after them.
              </p>
              <p className="text-xs text-slate-500">
                All clinician names and profiles below are fictional demo characters created for this portfolio website.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEDICAL_TEAM.map((clinician) => (
              <div
                key={clinician.name}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-3"
              >
                <h3 className="font-medical-display text-xl font-bold text-[#0F2942]">
                  {clinician.name}
                </h3>
                <p className="text-xs font-semibold text-[#0D9488]">{clinician.role}</p>
                <p className="text-xs text-slate-500">{clinician.credentials}</p>
                <p className="text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                  {clinician.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Patient Information & FAQs */}
        <section id="wb-faqs" className="bg-[#F8FBFD] py-16 lg:py-20 border-b border-slate-200">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm font-semibold text-[#0D9488]">Patient Information</p>
              <h2 className="font-medical-display text-3xl font-bold text-[#0F2942]">
                Helpful guidance before you visit
              </h2>
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-sm text-slate-700">
                <p className="font-semibold text-[#0F2942]">Accessibility &amp; Visiting</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Step-free ground floor entrance &amp; hearing loop at reception</li>
                  <li>Dedicated pram and wheelchair waiting space</li>
                  <li>Interpretation support available on prior request</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {MEDICAL_FAQS.map((faq, idx) => {
                const open = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left font-semibold text-[#0F2942] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {open && (
                      <p className="px-5 pb-4 text-sm text-slate-700 leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Privacy-Conscious Appointment Request Form + Directions */}
        <section id="wb-booking" className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[#0D9488]">Appointment Request</p>
                <h2 className="font-medical-display text-2xl sm:text-3xl font-bold text-[#0F2942]">
                  Request a practice appointment
                </h2>
              </div>

              {/* Explicit Privacy Safeguard Notice */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#EBF5FB] border border-sky-200 text-sm text-[#0F2942]">
                <ShieldCheck className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Privacy Notice — Contact Details Only</p>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed">
                    Please do not share symptoms, diagnoses, test results, or medical records via this form or WhatsApp. Submit only your contact preferences below, and reception will follow up directly.
                  </p>
                </div>
              </div>

              <form onSubmit={booking.handleSubmit} noValidate className="space-y-4">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="wb-hp">Website</label>
                  <input
                    id="wb-hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={booking.values.honeypot ?? ''}
                    onChange={(e) => booking.updateField('honeypot', e.target.value)}
                  />
                </div>

                {booking.errors.form && (
                  <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                    {booking.errors.form}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wb-name" className="block text-sm font-semibold text-[#0F2942] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="wb-name"
                      type="text"
                      required
                      value={booking.values.fullName}
                      onChange={(e) => booking.updateField('fullName', e.target.value)}
                      placeholder="David Patel"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0D9488]"
                    />
                    {booking.errors.fullName && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="wb-phone" className="block text-sm font-semibold text-[#0F2942] mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="wb-phone"
                      type="tel"
                      required
                      value={booking.values.phone}
                      onChange={(e) => booking.updateField('phone', e.target.value)}
                      placeholder="07700 900789"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0D9488]"
                    />
                    {booking.errors.phone && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wb-email" className="block text-sm font-semibold text-[#0F2942] mb-1">
                      Email Address *
                    </label>
                    <input
                      id="wb-email"
                      type="email"
                      required
                      value={booking.values.email}
                      onChange={(e) => booking.updateField('email', e.target.value)}
                      placeholder="david@example.co.uk"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0D9488]"
                    />
                    {booking.errors.email && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="wb-type" className="block text-sm font-semibold text-[#0F2942] mb-1">
                      Appointment Type *
                    </label>
                    <select
                      id="wb-type"
                      value={booking.values.service}
                      onChange={(e) => booking.updateField('service', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#0D9488]"
                    >
                      {MEDICAL_SERVICES.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {booking.errors.service && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.service}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wb-date" className="block text-sm font-semibold text-[#0F2942] mb-1">
                      Preferred Date *
                    </label>
                    <input
                      id="wb-date"
                      type="date"
                      min={booking.todayIso}
                      required
                      value={booking.values.preferredDate}
                      onChange={(e) => booking.updateField('preferredDate', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#0D9488]"
                    />
                    {booking.errors.preferredDate && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="wb-time" className="block text-sm font-semibold text-[#0F2942] mb-1">
                      Preferred Time *
                    </label>
                    <select
                      id="wb-time"
                      value={booking.values.preferredTime}
                      onChange={(e) => booking.updateField('preferredTime', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#0D9488]"
                    >
                      <option value="">Select time slot</option>
                      <option value="Morning (08:30 - 11:30)">Morning (08:30 – 11:30)</option>
                      <option value="Midday (11:30 - 14:30)">Midday (11:30 – 14:30)</option>
                      <option value="Afternoon (14:30 - 17:30)">Afternoon (14:30 – 17:30)</option>
                    </select>
                    {booking.errors.preferredTime && (
                      <p className="text-xs text-red-700 mt-1">{booking.errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-600">
                    Submitting creates an appointment request only—not a confirmed slot.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0D9488] text-white text-sm font-semibold rounded-lg hover:bg-[#0F766E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Generate WhatsApp Request
                  </button>
                </div>

                {booking.generated && (
                  <div
                    role="status"
                    data-testid="wb-whatsapp-result"
                    className="mt-5 p-5 bg-[#EBF5FB] border border-sky-200 rounded-lg space-y-3"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0F2942]">
                      <Check className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                      <span>Appointment Request Prepared (No Medical Info Included)</span>
                    </div>
                    <p className="text-xs text-slate-700">
                      Click below to open WhatsApp, review your request, and press Send manually.
                    </p>
                    <pre className="p-3 bg-white border border-sky-200 rounded text-xs text-slate-800 whitespace-pre-wrap font-medical-body">
                      {booking.generated.message}
                    </pre>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={booking.generated.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] text-white text-xs font-semibold rounded-lg hover:bg-[#0F766E]"
                      >
                        <span>Send via WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={booking.resetForm}
                        className="px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 cursor-pointer"
                      >
                        Reset Form
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div id="wb-directions" className="lg:col-span-5 space-y-6">
              <div className="bg-[#F8FBFD] border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
                <p className="text-sm font-semibold text-[#0D9488]">Contact &amp; Directions</p>
                <h3 className="font-medical-display text-2xl font-bold text-[#0F2942]">
                  Finding Willowbrook Medical
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#0D9488] shrink-0 mt-1" aria-hidden="true" />
                    <span>114 High Street, Harborne, Birmingham B17 9NJ (Demo Address)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#0D9488] shrink-0" aria-hidden="true" />
                    <span>Reception WhatsApp Desk: +44 7700 900303</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <p className="font-semibold text-[#0F2942]">Travel &amp; Parking</p>
                  <p>Served by West Midlands Bus routes 23, 24, and 11A/11C.</p>
                  <p>Two accessible blue-badge bays directly adjacent to the front ramp.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F2942] text-slate-300 py-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-medical-display text-lg font-bold text-white">
              Willowbrook Family Medical Centre
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Harborne, Birmingham · Fictional Healthcare Portfolio Demo
            </p>
          </div>
          <a
            href={ROUTES.AGENCY}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(ROUTES.AGENCY);
            }}
            className="text-xs text-teal-300 underline underline-offset-4 hover:text-white"
          >
            Built by Axon. — Back to Agency Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}
