import { useState, FormEvent } from 'react';
import {
  BookingFieldErrors,
  BookingFormValues,
  buildWhatsAppUrl,
  formatWhatsAppBookingMessage,
  validateBookingForm,
} from '../utils/whatsapp';

interface UseWhatsAppBookingConfig {
  clinicName: string;
  phoneNumber: string;
  defaultService: string;
  serviceFieldLabel: string;
  includeAdditionalMessage: boolean;
  requestOpeningLine?: string;
}

export interface GeneratedBookingState {
  message: string;
  whatsappUrl: string;
  submittedAt: string;
}

function getTodayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useWhatsAppBooking(config: UseWhatsAppBookingConfig) {
  const [values, setValues] = useState<BookingFormValues>({
    fullName: '',
    phone: '',
    email: '',
    service: config.defaultService,
    preferredDate: '',
    preferredTime: '',
    additionalMessage: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [generated, setGenerated] = useState<GeneratedBookingState | null>(null);
  const [lastSubmitTimestamp, setLastSubmitTimestamp] = useState<number>(0);

  const updateField = <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field] && !prev.form) return prev;
      const next = { ...prev };
      delete next[field];
      delete next.form;
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTimestamp < 1500) {
      setErrors({ form: 'Please wait a moment before generating another request.' });
      return;
    }

    const validation = validateBookingForm(values, {
      todayIso: getTodayIso(),
      serviceLabel: config.serviceFieldLabel,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      setGenerated(null);
      return;
    }

    const message = formatWhatsAppBookingMessage(config.clinicName, values, {
      serviceFieldLabel: config.serviceFieldLabel,
      includeAdditionalMessage: config.includeAdditionalMessage,
      requestOpeningLine: config.requestOpeningLine,
    });
    const whatsappUrl = buildWhatsAppUrl(config.phoneNumber, message);

    setErrors({});
    setLastSubmitTimestamp(now);
    setGenerated({
      message,
      whatsappUrl,
      submittedAt: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  };

  const resetForm = () => {
    setValues({
      fullName: '',
      phone: '',
      email: '',
      service: config.defaultService,
      preferredDate: '',
      preferredTime: '',
      additionalMessage: '',
      honeypot: '',
    });
    setErrors({});
    setGenerated(null);
  };

  return {
    values,
    errors,
    generated,
    todayIso: getTodayIso(),
    updateField,
    handleSubmit,
    resetForm,
  };
}
