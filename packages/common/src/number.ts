/**
 * Formats weight in grams to human-readable units (g or kg).
 * Examples:
 *   formatWeight(500) => "500 g"
 *   formatWeight(1500) => "1,5 kg"
 *   formatWeight(2000) => "2 kg"
 */
export function formatWeight(grams: number): string {
  if (typeof grams !== 'number' || isNaN(grams) || grams < 0) {
    return '0 g';
  }

  if (grams < 1000) {
    return `${Math.round(grams)} g`;
  }

  const kg = grams / 1000;
  const formattedKg = kg.toFixed(2).replace(/\.?0+$/, '').replace('.', ',');
  return `${formattedKg} kg`;
}

/**
 * Calculates discount percentage given original and discounted price.
 * Returns an integer between 0 and 100.
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  if (
    typeof originalPrice !== 'number' ||
    typeof discountedPrice !== 'number' ||
    originalPrice <= 0 ||
    discountedPrice >= originalPrice
  ) {
    return 0;
  }

  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.min(100, Math.max(0, Math.round(discount)));
}

/**
 * Calculates discount amount in IDR given original price and percentage.
 */
export function calculateDiscountAmount(
  originalPrice: number,
  discountPercentage: number
): number {
  if (originalPrice <= 0 || discountPercentage <= 0) {
    return 0;
  }
  return Math.round((originalPrice * Math.min(100, discountPercentage)) / 100);
}

/**
 * Clamps a number between min and max bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
