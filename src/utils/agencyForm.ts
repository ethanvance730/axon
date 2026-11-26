import { buildWhatsAppUrl, isValidEmail } from './whatsapp';

export interface AgencyInquiryValues {
  fullName: string;
  email: string;
  businessName: string;
  serviceScope: string;
  message: string;
  honeypot?: string;
}

export type AgencyInquiryErrors = Partial<Record<keyof AgencyInquiryValues | 'form', string>>;

export function validateAgencyInquiry(values: AgencyInquiryValues): {
  valid: boolean;
  errors: AgencyInquiryErrors;
} {
  const errors: AgencyInquiryErrors = {};

  if (values.honeypot && values.honeypot.trim().length > 0) {
    errors.form = 'Spam protection triggered. Please refresh and try again.';
    return { valid: false, errors };
  }

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name.';
  }

  if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid work email address.';
  }

  if (values.businessName.trim().length < 2) {
    errors.businessName = 'Please enter your clinic or business name.';
  }

  if (!values.serviceScope.trim()) {
    errors.serviceScope = 'Please select what you are looking to build.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please share a brief overview of your project (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildAgencyInquiryWhatsAppUrl(
  phoneNumber: string,
  values: AgencyInquiryValues
): string {
  const lines = [
    'Hello Axon Digital,',
    '',
    'I would like to discuss a new website project.',
    '',
    `Name: ${values.fullName.trim()}`,
    `Email: ${values.email.trim()}`,
    `Clinic / Business: ${values.businessName.trim()}`,
    `Project Focus: ${values.serviceScope.trim()}`,
    '',
    'Project Overview:',
    values.message.trim(),
  ];

  return buildWhatsAppUrl(phoneNumber, lines.join('\n'));
}
