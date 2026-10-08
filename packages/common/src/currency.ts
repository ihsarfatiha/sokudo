export interface FormatCurrencyOptions {
  /** Currency prefix, defaults to 'Rp' */
  prefix?: string;
  /** Whether to add a space between prefix and number, defaults to true */
  space?: boolean;
  /** Whether to show decimal cents, defaults to false */
  showCents?: boolean;
}

/**
 * Formats a numeric amount to Indonesian Rupiah (IDR) currency format.
 * Examples:
 *   formatCurrencyIDR(150000) => "Rp 150.000"
 *   formatCurrencyIDR(-50000) => "-Rp 50.000"
 *   formatCurrencyIDR(125000.5, { showCents: true }) => "Rp 125.000,50"
 */
export function formatCurrencyIDR(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rp 0';
  }

  const { prefix = 'Rp', space = true, showCents = false } = options;
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const integerPart = Math.floor(absAmount);
  const formattedInteger = integerPart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const sep = space ? ' ' : '';
  let result = `${prefix}${sep}${formattedInteger}`;

  if (showCents) {
    const cents = Math.round((absAmount - integerPart) * 100);
    const formattedCents = cents.toString().padStart(2, '0');
    result += `,${formattedCents}`;
  }

  return isNegative ? `-${result}` : result;
}

/**
 * Parses a formatted IDR currency string into a number.
 * Examples:
 *   parseCurrencyIDR("Rp 150.000") => 150000
 *   parseCurrencyIDR("-Rp 50.000,50") => -50000.5
 *   parseCurrencyIDR("15.000") => 15000
 */
export function parseCurrencyIDR(formatted: string): number {
  if (!formatted || typeof formatted !== 'string') {
    return 0;
  }

  const trimmed = formatted.trim();
  const isNegative = trimmed.startsWith('-');

  // Remove non-digit characters except commas
  const cleaned = trimmed
    .replace(/[^\d,]/g, '')
    .replace(',', '.');

  const parsed = parseFloat(cleaned);
  if (isNaN(parsed)) {
    return 0;
  }

  return isNegative ? -parsed : parsed;
}

/**
 * Formats large amounts into human-readable compact Indonesian Rupiah.
 * Examples:
 *   formatCompactIDR(1500) => "Rp 1,5 Rb"
 *   formatCompactIDR(2500000) => "Rp 2,5 Jt"
 *   formatCompactIDR(1200000000) => "Rp 1,2 M"
 */
export function formatCompactIDR(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rp 0';
  }

  const isNegative = amount < 0;
  const abs = Math.abs(amount);

  let formatted = '';
  if (abs >= 1_000_000_000_000) {
    const val = (abs / 1_000_000_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    formatted = `${val} T`;
  } else if (abs >= 1_000_000_000) {
    const val = (abs / 1_000_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    formatted = `${val} M`;
  } else if (abs >= 1_000_000) {
    const val = (abs / 1_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    formatted = `${val} Jt`;
  } else if (abs >= 1_000) {
    const val = (abs / 1_000).toFixed(1).replace('.0', '').replace('.', ',');
    formatted = `${val} Rb`;
  } else {
    formatted = abs.toString();
  }

  const prefix = isNegative ? '-Rp ' : 'Rp ';
  return `${prefix}${formatted}`;
}
