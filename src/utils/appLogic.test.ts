import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRoute, extractHash, ROUTES } from './router';
import { ROUTE_METADATA } from './metadata';
import {
  CLINIC_WHATSAPP_CONFIG,
  sanitizeWhatsAppNumber,
  validateBookingForm,
  formatWhatsAppBookingMessage,
  buildWhatsAppUrl,
  formatReadableDate,
} from './whatsapp';
import { validateAgencyInquiry, buildAgencyInquiryWhatsAppUrl } from './agencyForm';

test('normalizeRoute resolves with and without trailing slashes and query strings', () => {
  assert.equal(normalizeRoute('/'), ROUTES.AGENCY);
  assert.equal(normalizeRoute(''), ROUTES.AGENCY);
  assert.equal(normalizeRoute('/projects/northfield-dental'), ROUTES.NORTHFIELD_DENTAL);
  assert.equal(normalizeRoute('/projects/northfield-dental/'), ROUTES.NORTHFIELD_DENTAL);
  assert.equal(normalizeRoute('/projects/maison-aesthetics/?ref=hero#booking'), ROUTES.MAISON_AESTHETICS);
  assert.equal(normalizeRoute('/projects/willowbrook-medical'), ROUTES.WILLOWBROOK_MEDICAL);
  assert.equal(normalizeRoute('/projects/apex-physiotherapy/'), ROUTES.APEX_PHYSIOTHERAPY);
  assert.equal(normalizeRoute('/projects/nonexistent/'), null);
});

test('extractHash parses fragment identifiers cleanly', () => {
  assert.equal(extractHash('/projects/northfield-dental/#booking'), 'booking');
  assert.equal(extractHash('/#work'), 'work');
  assert.equal(extractHash('/'), null);
});

test('each route has unique title, description, and agency uses uploaded favicon', () => {
  const titles = new Set(Object.values(ROUTE_METADATA).map((m) => m.title));
  const descriptions = new Set(Object.values(ROUTE_METADATA).map((m) => m.description));
  assert.equal(titles.size, 5);
  assert.equal(descriptions.size, 5);
  assert.equal(ROUTE_METADATA[ROUTES.AGENCY].faviconHref, '/assets/aistudio/69655_6e1d112d.jpg');
});

test('each clinic has a distinct, clean UK WhatsApp number without spaces or plus signs', () => {
  const numbers = [
    CLINIC_WHATSAPP_CONFIG.northfieldDental.phoneNumber,
    CLINIC_WHATSAPP_CONFIG.maisonAesthetics.phoneNumber,
    CLINIC_WHATSAPP_CONFIG.willowbrookMedical.phoneNumber,
    CLINIC_WHATSAPP_CONFIG.apexPhysiotherapy.phoneNumber,
  ];
  assert.equal(new Set(numbers).size, 4);
  for (const num of numbers) {
    assert.match(num, /^447\d{9}$/);
  }
  assert.equal(sanitizeWhatsAppNumber('+44 7700-900 101'), '447700900101');
});

test('validateBookingForm rejects invalid inputs, past dates, and honeypot bots', () => {
  const emptyResult = validateBookingForm(
    {
      fullName: '',
      phone: '123',
      email: 'bad-email',
      service: '',
      preferredDate: '',
      preferredTime: '',
    },
    { todayIso: '2026-11-26' }
  );
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.fullName);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.service);
  assert.ok(emptyResult.errors.preferredDate);
  assert.ok(emptyResult.errors.preferredTime);

  const pastDateResult = validateBookingForm(
    {
      fullName: 'Jane Doe',
      phone: '07700 900123',
      email: 'jane@example.com',
      service: 'Teeth Whitening',
      preferredDate: '2026-11-20',
      preferredTime: '10:00 AM',
    },
    { todayIso: '2026-11-26' }
  );
  assert.equal(pastDateResult.valid, false);
  assert.ok(pastDateResult.errors.preferredDate);

  const spamBotResult = validateBookingForm({
    fullName: 'Bot Name',
    phone: '07700 900123',
    email: 'bot@example.com',
    service: 'Invisalign',
    preferredDate: '2026-12-10',
    preferredTime: '11:00 AM',
    honeypot: 'http://spam.example',
  });
  assert.equal(spamBotResult.valid, false);
  assert.ok(spamBotResult.errors.form);
});

test('formatWhatsAppBookingMessage formats readable dates and excludes sensitive notes when disabled', () => {
  assert.equal(formatReadableDate('2026-12-10'), '10 December 2026');

  const dentalMsg = formatWhatsAppBookingMessage(
    'Northfield Dental Studio',
    {
      fullName: 'John Smith',
      phone: '07123456789',
      email: 'john@example.com',
      service: 'Teeth Whitening',
      preferredDate: '2026-12-10',
      preferredTime: '11:00 AM',
      additionalMessage: 'I would like to discuss available options.',
    },
    { serviceFieldLabel: 'Treatment', includeAdditionalMessage: true }
  );

  assert.match(dentalMsg, /Hello Northfield Dental Studio,/);
  assert.match(dentalMsg, /Treatment: Teeth Whitening/);
  assert.match(dentalMsg, /Preferred Date: 10 December 2026/);
  assert.match(dentalMsg, /Additional Information:\nI would like to discuss available options\./);

  const medicalMsg = formatWhatsAppBookingMessage(
    'Willowbrook Family Medical Centre',
    {
      fullName: 'Sarah Taylor',
      phone: '07700900321',
      email: 'sarah@example.com',
      service: 'General Consultations',
      preferredDate: '2026-12-12',
      preferredTime: '09:30 AM',
      additionalMessage: 'Should never appear',
    },
    { serviceFieldLabel: 'Appointment Type', includeAdditionalMessage: false }
  );

  assert.doesNotMatch(medicalMsg, /Should never appear/);
  assert.match(medicalMsg, /Appointment Type: General Consultations/);

  const url = buildWhatsAppUrl('447700900101', dentalMsg);
  assert.ok(url.startsWith('https://wa.me/447700900101?text='));
  assert.ok(url.includes(encodeURIComponent('Northfield Dental Studio')));
});

test('validateAgencyInquiry and buildAgencyInquiryWhatsAppUrl work properly', () => {
  const invalid = validateAgencyInquiry({
    fullName: 'A',
    email: 'nope',
    businessName: '',
    serviceScope: '',
    message: 'hi',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.businessName);
  assert.ok(invalid.errors.serviceScope);
  assert.ok(invalid.errors.message);

  const valid = validateAgencyInquiry({
    fullName: 'Oliver Bennett',
    email: 'oliver@clinic.co.uk',
    businessName: 'Cheshire Dental Practice',
    serviceScope: 'Healthcare Website Design',
    message: 'We are looking to redesign our patient website with WhatsApp booking.',
  });
  assert.equal(valid.valid, true);

  const waUrl = buildAgencyInquiryWhatsAppUrl(CLINIC_WHATSAPP_CONFIG.agency.phoneNumber, {
    fullName: 'Oliver Bennett',
    email: 'oliver@clinic.co.uk',
    businessName: 'Cheshire Dental Practice',
    serviceScope: 'Healthcare Website Design',
    message: 'We are looking to redesign our patient website with WhatsApp booking.',
  });
  assert.ok(waUrl.startsWith('https://wa.me/447700900000?text='));
});
