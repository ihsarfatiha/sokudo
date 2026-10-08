const ID_MONTHS_FULL = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const ID_MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

const ID_DAYS = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
];

export interface FormatDateOptions {
  /** 'full': "Kamis, 08 Oktober 2026", 'dateOnly': "08 Oktober 2026", 'short': "08 Okt 2026", 'timeOnly': "14:30 WIB" */
  format?: 'full' | 'dateOnly' | 'short' | 'timeOnly';
  /** Append time suffix e.g. " 14:30 WIB", defaults to false */
  withTime?: boolean;
}

function parseDateInput(input: Date | string | number): Date {
  if (input instanceof Date) return input;
  return new Date(input);
}

/**
 * Formats a Date or date string to standard Indonesian date display.
 * Examples:
 *   formatDateIndonesian(new Date('2026-10-08T10:30:00Z')) => "08 Oktober 2026"
 *   formatDateIndonesian(..., { format: 'full', withTime: true }) => "Kamis, 08 Oktober 2026 10:30 WIB"
 */
export function formatDateIndonesian(
  input: Date | string | number,
  options: FormatDateOptions = {}
): string {
  const date = parseDateInput(input);
  if (isNaN(date.getTime())) {
    return '-';
  }

  const { format = 'dateOnly', withTime = false } = options;

  const dayOfMonth = date.getDate().toString().padStart(2, '0');
  const monthIdx = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes} WIB`;

  if (format === 'timeOnly') {
    return timeStr;
  }

  let formattedDate = '';
  switch (format) {
    case 'full': {
      const dayName = ID_DAYS[date.getDay()];
      formattedDate = `${dayName}, ${dayOfMonth} ${ID_MONTHS_FULL[monthIdx]} ${year}`;
      break;
    }
    case 'short': {
      formattedDate = `${dayOfMonth} ${ID_MONTHS_SHORT[monthIdx]} ${year}`;
      break;
    }
    case 'dateOnly':
    default: {
      formattedDate = `${dayOfMonth} ${ID_MONTHS_FULL[monthIdx]} ${year}`;
      break;
    }
  }

  if (withTime) {
    return `${formattedDate} ${timeStr}`;
  }

  return formattedDate;
}

/**
 * Returns human-readable relative time in Indonesian.
 * Examples:
 *   formatRelativeTimeID(5 mins ago) => "5 menit yang lalu"
 *   formatRelativeTimeID(yesterday) => "kemarin"
 *   formatRelativeTimeID(just now) => "baru saja"
 */
export function formatRelativeTimeID(
  input: Date | string | number,
  referenceNow: Date | string | number = new Date()
): string {
  const date = parseDateInput(input);
  const now = parseDateInput(referenceNow);

  if (isNaN(date.getTime()) || isNaN(now.getTime())) {
    return '-';
  }

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 0) {
    return 'akan datang';
  }
  if (diffSec < 45) {
    return 'baru saja';
  }
  if (diffSec < 90) {
    return '1 menit yang lalu';
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin} menit yang lalu`;
  }

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return `${diffHours} jam yang lalu`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) {
    return 'kemarin';
  }
  if (diffDays < 30) {
    return `${diffDays} hari yang lalu`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} bulan yang lalu`;
  }

  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} tahun yang lalu`;
}

/**
 * Checks whether a given timestamp has passed the current time.
 */
export function isDateExpired(
  targetDate: Date | string | number,
  referenceNow: Date | string | number = new Date()
): boolean {
  const target = parseDateInput(targetDate);
  const now = parseDateInput(referenceNow);
  return target.getTime() < now.getTime();
}

/**
 * Adds specified number of days to a date.
 */
export function addDays(dateInput: Date | string | number, days: number): Date {
  const d = parseDateInput(dateInput);
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Adds specified number of hours to a date.
 */
export function addHours(dateInput: Date | string | number, hours: number): Date {
  const d = parseDateInput(dateInput);
  const result = new Date(d);
  result.setHours(result.getHours() + hours);
  return result;
}

/**
 * Adds specified number of minutes to a date.
 */
export function addMinutes(dateInput: Date | string | number, minutes: number): Date {
  const d = parseDateInput(dateInput);
  const result = new Date(d);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}
