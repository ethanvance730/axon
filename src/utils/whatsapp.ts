export const CLINIC_WHATSAPP_CONFIG = {
  agency: {
    clinicName: 'Axon Digital',
    phoneNumber: '447700900000',
  },
  northfieldDental: {
    clinicName: 'Northfield Dental Studio',
    phoneNumber: '447700900101',
  },
  maisonAesthetics: {
    clinicName: 'Maison Aesthetics',
    phoneNumber: '447700900202',
  },
  willowbrookMedical: {
    clinicName: 'Willowbrook Family Medical Centre',
    phoneNumber: '447700900303',
  },
  apexPhysiotherapy: {
    clinicName: 'Apex Sports Physiotherapy',
    phoneNumber: '447700900404',
  },
} as const;

export interface BookingFormValues {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  additionalMessage?: string;
  honeypot?: string;
}

export interface BookingValidationOptions {
  todayIso?: string;
  requireMessage?: boolean;
  serviceLabel?: string;
}

export type BookingFieldErrors = Partial<Record<keyof BookingFormValues | 'form', string>>;

export function sanitizeWhatsAppNumber(raw: string): string {
  return raw.replace(/[^\d]/g, '');
}

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function formatReadableDate(isoDate: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
  const [yearStr, monthStr, dayStr] = isoDate.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = months[month - 1];
  if (!monthName || Number.isNaN(day) || Number.isNaN(year)) return isoDate;
  return `${day} ${monthName} ${year}`;
}

export function validateBookingForm(
  values: BookingFormValues,
  options: BookingValidationOptions = {}
): { valid: boolean; errors: BookingFieldErrors } {
  const errors: BookingFieldErrors = {};

  if (values.honeypot && values.honeypot.trim().length > 0) {
    errors.form = 'Submission could not be verified. Please refresh and try again.';
    return { valid: false, errors };
  }

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid UK or international phone number (at least 10 digits).';
  }

  if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.service || values.service.trim().length === 0) {
    errors.service = `Please select a ${(options.serviceLabel ?? 'treatment').toLowerCase()}.`;
  }

  if (!values.preferredDate || !/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDate)) {
    errors.preferredDate = 'Please select a preferred date.';
  } else if (options.todayIso && values.preferredDate < options.todayIso) {
    errors.preferredDate = 'Please choose today or a future date.';
  }

  if (!values.preferredTime || values.preferredTime.trim().length === 0) {
    errors.preferredTime = 'Please choose a preferred time window.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface FormatMessageOptions {
  serviceFieldLabel?: string;
  includeAdditionalMessage?: boolean;
  requestOpeningLine?: string;
}

export function formatWhatsAppBookingMessage(
  clinicName: string,
  values: BookingFormValues,
  options: FormatMessageOptions = {}
): string {
  const serviceLabel = options.serviceFieldLabel ?? 'Treatment';
  const openingLine =
    options.requestOpeningLine ?? 'I would like to request an appointment.';
  const lines: string[] = [
    `Hello ${clinicName},`,
    '',
    openingLine,
    '',
    `Name: ${values.fullName.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Email: ${values.email.trim()}`,
    `${serviceLabel}: ${values.service.trim()}`,
    `Preferred Date: ${formatReadableDate(values.preferredDate)}`,
    `Preferred Time: ${values.preferredTime.trim()}`,
  ];

  const extra = values.additionalMessage?.trim();
  if (options.includeAdditionalMessage !== false && extra && extra.length > 0) {
    lines.push('', 'Additional Information:', extra);
  }

  lines.push('', 'Thank you.');
  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanNumber = sanitizeWhatsAppNumber(phoneNumber);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
