import {
  BatteryCharging,
  Bike,
  Boxes,
  Coffee,
  Droplets,
  Dumbbell,
  FlaskConical,
  Footprints,
  HardHat,
  Headphones,
  Keyboard,
  Lamp,
  Layers,
  Package,
  Shirt,
  ShoppingBag,
  Watch,
  Wheat,
  Wind,
  type LucideIcon,
} from 'lucide-react';

export interface ProductArt {
  icon: LucideIcon;
  tint: string;
}

/**
 * Flat "catalog plate" art per product. No emoji, no gradients — a muted paper
 * tint plus a single line drawing, so cards read as a printed lookbook.
 */
export const productArt: Record<string, ProductArt> = {
  'wireless-earbuds-pro-x': { icon: Headphones, tint: '#e9e6dd' },
  'smartwatch-fit-s2': { icon: Watch, tint: '#e4e3de' },
  'keyboard-mechanical-tkl': { icon: Keyboard, tint: '#e3e1d9' },
  'powerbank-20000mah': { icon: BatteryCharging, tint: '#e7e8e1' },
  'kemeja-flanel-premium': { icon: Shirt, tint: '#eae0d7' },
  'sneakers-urban-runner': { icon: Footprints, tint: '#e5e4df' },
  'hijab-voal-premium': { icon: Wind, tint: '#f0e1de' },
  'tote-bag-kanvas': { icon: ShoppingBag, tint: '#eae3d6' },
  'serum-vitamin-c': { icon: FlaskConical, tint: '#e9e8dd' },
  'madu-hutan-murni-500ml': { icon: Droplets, tint: '#ede3ce' },
  'kopi-arabika-gayo-250g': { icon: Coffee, tint: '#e7dfd3' },
  'granola-mix-500g': { icon: Wheat, tint: '#eae5d5' },
  'set-lampu-tidur-led': { icon: Lamp, tint: '#e8e4db' },
  'rak-dapur-minimalis': { icon: Boxes, tint: '#e6e0d4' },
  'matras-yoga-anti-slip': { icon: Layers, tint: '#e1e7e0' },
  'dumbbell-set-10kg': { icon: Dumbbell, tint: '#e2e2de' },
  'helm-full-face': { icon: HardHat, tint: '#e3e5e7' },
  'cover-motor-waterproof': { icon: Bike, tint: '#e4e6e5' },
};

export const categoryArt: Record<string, ProductArt> = {
  elektronik: { icon: Headphones, tint: '#e9e6dd' },
  'fashion-pria': { icon: Shirt, tint: '#eae0d7' },
  'fashion-wanita': { icon: Wind, tint: '#f0e1de' },
  kesehatan: { icon: FlaskConical, tint: '#e9e8dd' },
  'makanan-minuman': { icon: Coffee, tint: '#e7dfd3' },
  'peralatan-rumah': { icon: Lamp, tint: '#e8e4db' },
  olahraga: { icon: Dumbbell, tint: '#e1e7e0' },
  otomotif: { icon: Bike, tint: '#e3e5e7' },
};

export function getProductArt(slug: string, categorySlug?: string): ProductArt {
  return (
    productArt[slug] ??
    (categorySlug ? categoryArt[categorySlug] : undefined) ?? {
      icon: Package,
      tint: '#e7e3d9',
    }
  );
}
