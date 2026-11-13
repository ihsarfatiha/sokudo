import { findDemoProduct } from './catalog';

const categoryStyles: Record<
  string,
  { emoji: string; gradient: [string, string] }
> = {
  elektronik: { emoji: '💻', gradient: ['#1e3a8a', '#3b82f6'] },
  'fashion-pria': { emoji: '👔', gradient: ['#7c2d12', '#ea580c'] },
  'fashion-wanita': { emoji: '👗', gradient: ['#831843', '#ec4899'] },
  kesehatan: { emoji: '💊', gradient: ['#854d0e', '#facc15'] },
  'makanan-minuman': { emoji: '☕', gradient: ['#3f2d20', '#a16207'] },
  'peralatan-rumah': { emoji: '🏠', gradient: ['#581c87', '#a855f7'] },
  olahraga: { emoji: '🏋️', gradient: ['#14532d', '#22c55e'] },
  otomotif: { emoji: '🏍️', gradient: ['#0c4a6e', '#0ea5e9'] },
};

export function styleForCategory(categorySlug?: string) {
  return (
    categoryStyles[categorySlug ?? ''] ?? {
      emoji: '🛍️',
      gradient: ['#1e293b', '#64748b'] as [string, string],
    }
  );
}

/**
 * Cart lines only store a slug and a category, so look the product up in the
 * demo catalog to keep the tile consistent with the product page.
 */
export function styleForLine(slug?: string, categorySlug?: string) {
  const product = slug ? findDemoProduct(slug) : undefined;
  if (product) {
    return { emoji: product.emoji, gradient: product.gradient };
  }
  return styleForCategory(categorySlug);
}

export { categoryStyles };
