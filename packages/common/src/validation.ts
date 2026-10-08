/**
 * Regular expressions for common Indonesian marketplace validation needs.
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const ID_PHONE_REGEX = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;
export const ID_POSTAL_CODE_REGEX = /^[1-9][0-9]{4}$/;
export const ID_NIK_REGEX = /^[1-9][0-9]{15}$/;
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validates an email address.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates whether a phone number matches standard Indonesian GSM prefixes (08xx, 628xx, +628xx).
 */
export function isValidIndonesianPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s-]/g, '');
  return ID_PHONE_REGEX.test(cleaned);
}

/**
 * Normalizes an Indonesian phone number to E.164 international format (+628...).
 * Examples:
 *   "08123456789" => "+628123456789"
 *   "628123456789" => "+628123456789"
 *   "+628123456789" => "+628123456789"
 */
export function normalizeIndonesianPhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  let cleaned = phone.replace(/[\s-]/g, '').trim();

  if (cleaned.startsWith('+62')) {
    return cleaned;
  }
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+62${cleaned.slice(1)}`;
  }
  return cleaned;
}

/**
 * Validates Indonesian 5-digit postal code.
 */
export function isValidPostalCode(postalCode: string): boolean {
  if (!postalCode || typeof postalCode !== 'string') return false;
  return ID_POSTAL_CODE_REGEX.test(postalCode.trim());
}

/**
 * Validates Indonesian 16-digit National ID (NIK / KTP).
 */
export function isValidNIK(nik: string): boolean {
  if (!nik || typeof nik !== 'string') return false;
  return ID_NIK_REGEX.test(nik.trim());
}

/**
 * Converts text into a URL-friendly slug.
 * Examples:
 *   slugify("Kemeja Pria Batik Modern 2026") => "kemeja-pria-batik-modern-2026"
 */
export function slugify(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validates if string is a valid slug format.
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  return SLUG_REGEX.test(slug);
}

export interface ValidationRule<T = any> {
  field: string;
  validate: (val: any, allValues: T) => boolean | string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

/**
 * Executes a set of validation rules against a data payload.
 */
export function validateSchema<T extends Record<string, any>>(
  data: T,
  rules: Array<ValidationRule<T>>
): ValidationResult {
  const errors: Record<string, string[]> = {};

  for (const rule of rules) {
    const value = data ? data[rule.field] : undefined;
    const result = rule.validate(value, data);

    if (result !== true) {
      const errorMsg = typeof result === 'string' ? result : (rule.message || `Field ${rule.field} is invalid`);
      if (!errors[rule.field]) {
        errors[rule.field] = [];
      }
      errors[rule.field].push(errorMsg);
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Predefined validator for user registration payloads.
 */
export function validateRegisterInput(data: any): ValidationResult {
  return validateSchema(data, [
    {
      field: 'email',
      validate: (v) => isValidEmail(v) || 'Format email tidak valid',
    },
    {
      field: 'name',
      validate: (v) => (typeof v === 'string' && v.trim().length >= 2) || 'Nama minimal 2 karakter',
    },
    {
      field: 'password',
      validate: (v) => (!v || (typeof v === 'string' && v.length >= 8)) || 'Password minimal 8 karakter',
    },
    {
      field: 'phone',
      validate: (v) => (!v || isValidIndonesianPhone(v)) || 'Nomor telepon tidak valid (contoh: 081234567890)',
    },
  ]);
}

/**
 * Predefined validator for Indonesian shipping address payloads.
 */
export function validateAddressInput(data: any): ValidationResult {
  return validateSchema(data, [
    {
      field: 'recipientName',
      validate: (v) => (typeof v === 'string' && v.trim().length > 0) || 'Nama penerima wajib diisi',
    },
    {
      field: 'phone',
      validate: (v) => isValidIndonesianPhone(v) || 'Nomor telepon penerima tidak valid',
    },
    {
      field: 'street',
      validate: (v) => (typeof v === 'string' && v.trim().length >= 5) || 'Alamat lengkap minimal 5 karakter',
    },
    {
      field: 'city',
      validate: (v) => (typeof v === 'string' && v.trim().length > 0) || 'Kota/Kabupaten wajib diisi',
    },
    {
      field: 'province',
      validate: (v) => (typeof v === 'string' && v.trim().length > 0) || 'Provinsi wajib diisi',
    },
    {
      field: 'postalCode',
      validate: (v) => isValidPostalCode(v) || 'Kode pos harus 5 digit angka',
    },
  ]);
}
