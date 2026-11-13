import type { Category, Product } from './types';

export const categories: Category[] = [
  {
    id: 'cat_elektronik',
    name: 'Elektronik',
    slug: 'elektronik',
    icon: '💻',
    description: 'Gadget, audio, dan aksesori harian',
  },
  {
    id: 'cat_fashion_pria',
    name: 'Fashion Pria',
    slug: 'fashion-pria',
    icon: '👔',
    description: 'Pakaian dan alas kaki pria',
  },
  {
    id: 'cat_fashion_wanita',
    name: 'Fashion Wanita',
    slug: 'fashion-wanita',
    icon: '👗',
    description: 'Hijab, tas, dan busana wanita',
  },
  {
    id: 'cat_kesehatan',
    name: 'Kesehatan',
    slug: 'kesehatan',
    icon: '💊',
    description: 'Vitamin, skincare, dan perawatan',
  },
  {
    id: 'cat_makanan',
    name: 'Makanan & Minuman',
    slug: 'makanan-minuman',
    icon: '☕',
    description: 'Kopi, camilan, dan bahan segar',
  },
  {
    id: 'cat_rumah',
    name: 'Peralatan Rumah',
    slug: 'peralatan-rumah',
    icon: '🏠',
    description: 'Dekorasi dan perlengkapan dapur',
  },
  {
    id: 'cat_olahraga',
    name: 'Olahraga',
    slug: 'olahraga',
    icon: '🏋️',
    description: 'Fitness, yoga, dan outdoor',
  },
  {
    id: 'cat_otomotif',
    name: 'Otomotif',
    slug: 'otomotif',
    icon: '🏍️',
    description: 'Aksesori motor dan mobil',
  },
];

const stores = {
  santoso: {
    id: 'str_002',
    name: 'Santoso Electronic Hub',
    slug: 'santoso-electronic-hub',
    city: 'Bandung',
    rating: 4.9,
  },
  rahma: {
    id: 'str_001',
    name: 'Rahma Hijab & Fashion',
    slug: 'rahma-fashion',
    city: 'Bandung',
    rating: 4.8,
  },
  nature: {
    id: 'str_004',
    name: 'Nature Glow Skincare',
    slug: 'nature-glow-skincare',
    city: 'Jakarta',
    rating: 4.7,
  },
  kopi: {
    id: 'str_006',
    name: 'Kopi Nusantara',
    slug: 'kopi-nusantara',
    city: 'Aceh',
    rating: 4.9,
  },
  craft: {
    id: 'str_003',
    name: 'Nusantara Wood Craft',
    slug: 'nusantara-wood-craft',
    city: 'Yogyakarta',
    rating: 4.8,
  },
  sportiva: {
    id: 'str_007',
    name: 'Sportiva Store',
    slug: 'sportiva-store',
    city: 'Jakarta',
    rating: 4.6,
  },
  prataama: {
    id: 'str_005',
    name: 'Prataama Global Tech',
    slug: 'prataama-global-tech',
    city: 'Surabaya',
    rating: 4.7,
  },
};

export const demoProducts: Product[] = [
  {
    id: 'prd_001',
    slug: 'wireless-earbuds-pro-x',
    title: 'Wireless Earbuds Pro X',
    description:
      'TWS dengan active noise cancelling, Bluetooth 5.3, dan baterai hingga 32 jam. Dilengkapi mode transparansi dan sertifikasi IPX5 untuk olahraga.',
    price: 499000,
    originalPrice: 799000,
    stock: 42,
    rating: 4.8,
    sold: 1280,
    category: 'Elektronik',
    categorySlug: 'elektronik',
    store: stores.santoso,
    emoji: '🎧',
    gradient: ['#1e3a8a', '#3b82f6'],
    badges: ['Best Seller', 'Garansi Resmi'],
    isFlashSale: true,
    isFeatured: true,
  },
  {
    id: 'prd_002',
    slug: 'smartwatch-fit-s2',
    title: 'Smartwatch Fit S2',
    description:
      'Jam tangan pintar dengan pemantau detak jantung, SpO2, 100+ mode olahraga, dan layar AMOLED 1.85 inci. Tahan air hingga 5 ATM.',
    price: 649000,
    originalPrice: 899000,
    stock: 28,
    rating: 4.7,
    sold: 860,
    category: 'Elektronik',
    categorySlug: 'elektronik',
    store: stores.santoso,
    emoji: '⌚',
    gradient: ['#0f172a', '#475569'],
    badges: ['Garansi 1 Tahun'],
    isFeatured: true,
  },
  {
    id: 'prd_003',
    slug: 'keyboard-mechanical-tkl',
    title: 'Keyboard Mechanical TKL',
    description:
      'Keyboard mekanikal 87 tombol dengan hot-swappable switch, keycap PBT, dan koneksi USB-C. Cocok untuk kerja maupun gaming.',
    price: 425000,
    stock: 35,
    rating: 4.8,
    sold: 540,
    category: 'Elektronik',
    categorySlug: 'elektronik',
    store: stores.prataama,
    emoji: '⌨️',
    gradient: ['#312e81', '#6366f1'],
    badges: ['Hot Swap'],
  },
  {
    id: 'prd_004',
    slug: 'powerbank-20000mah',
    title: 'Powerbank 20000mAh 65W',
    description:
      'Powerbank fast charging 65W dengan dua port USB-C dan satu USB-A. Mampu mengisi laptop ringan dan ponsel hingga 4 kali.',
    price: 219000,
    originalPrice: 299000,
    stock: 64,
    rating: 4.6,
    sold: 2100,
    category: 'Elektronik',
    categorySlug: 'elektronik',
    store: stores.santoso,
    emoji: '🔋',
    gradient: ['#065f46', '#10b981'],
    badges: ['Fast Charging'],
    isFlashSale: true,
  },
  {
    id: 'prd_005',
    slug: 'kemeja-flanel-premium',
    title: 'Kemeja Flanel Premium',
    description:
      'Kemeja flanel katun brushed dengan potongan regular fit. Nyaman dipakai harian, tersedia ukuran M sampai XXL.',
    price: 189000,
    originalPrice: 249000,
    stock: 80,
    rating: 4.7,
    sold: 730,
    category: 'Fashion Pria',
    categorySlug: 'fashion-pria',
    store: stores.rahma,
    emoji: '👔',
    gradient: ['#7c2d12', '#ea580c'],
    badges: ['Katun Premium'],
  },
  {
    id: 'prd_006',
    slug: 'sneakers-urban-runner',
    title: 'Sneakers Urban Runner',
    description:
      'Sepatu sneakers dengan midsole EVA ringan dan upper mesh breathable. Desain minimalis untuk gaya kasual sehari-hari.',
    price: 379000,
    stock: 46,
    rating: 4.6,
    sold: 390,
    category: 'Fashion Pria',
    categorySlug: 'fashion-pria',
    store: stores.sportiva,
    emoji: '👟',
    gradient: ['#1f2937', '#6b7280'],
    badges: ['Ringan'],
    isFeatured: true,
  },
  {
    id: 'prd_007',
    slug: 'hijab-voal-premium',
    title: 'Hijab Voal Premium',
    description:
      'Hijab voal dengan tekstur lembut, tidak mudah kusut, dan jahitan rapi. Ukuran 115 x 115 cm, tersedia 12 pilihan warna.',
    price: 89000,
    originalPrice: 129000,
    stock: 150,
    rating: 4.9,
    sold: 3200,
    category: 'Fashion Wanita',
    categorySlug: 'fashion-wanita',
    store: stores.rahma,
    emoji: '🧣',
    gradient: ['#831843', '#ec4899'],
    badges: ['Best Seller'],
    isFlashSale: true,
    isFeatured: true,
  },
  {
    id: 'prd_008',
    slug: 'tote-bag-kanvas',
    title: 'Tote Bag Kanvas Premium',
    description:
      'Tas kanvas tebal dengan lapisan dalam dan kantong laptop 14 inci. Kuat menampung kebutuhan kuliah dan kerja.',
    price: 129000,
    stock: 92,
    rating: 4.7,
    sold: 610,
    category: 'Fashion Wanita',
    categorySlug: 'fashion-wanita',
    store: stores.rahma,
    emoji: '👜',
    gradient: ['#78350f', '#d97706'],
    badges: ['Ramah Lingkungan'],
  },
  {
    id: 'prd_009',
    slug: 'serum-vitamin-c',
    title: 'Serum Vitamin C 15%',
    description:
      'Serum pencerah dengan vitamin C 15%, niacinamide, dan hyaluronic acid. Membantu menyamarkan noda hitam dan menjaga kelembapan.',
    price: 159000,
    originalPrice: 199000,
    stock: 70,
    rating: 4.8,
    sold: 1450,
    category: 'Kesehatan',
    categorySlug: 'kesehatan',
    store: stores.nature,
    emoji: '🧴',
    gradient: ['#854d0e', '#facc15'],
    badges: ['BPOM'],
    isFeatured: true,
  },
  {
    id: 'prd_010',
    slug: 'madu-hutan-murni-500ml',
    title: 'Madu Hutan Murni 500ml',
    description:
      'Madu hutan alami tanpa pemanis tambahan, dipanen langsung dari peternak lokal. Cocok untuk imunitas dan minuman hangat.',
    price: 125000,
    stock: 58,
    rating: 4.9,
    sold: 980,
    category: 'Kesehatan',
    categorySlug: 'kesehatan',
    store: stores.kopi,
    emoji: '🍯',
    gradient: ['#713f12', '#f59e0b'],
    badges: ['100% Alami'],
  },
  {
    id: 'prd_011',
    slug: 'kopi-arabika-gayo-250g',
    title: 'Kopi Arabika Gayo 250g',
    description:
      'Biji kopi arabika Gayo single origin dengan profil rasa cokelat dan citrus. Digiling sesuai pesanan, roast medium.',
    price: 95000,
    stock: 120,
    rating: 4.9,
    sold: 2400,
    category: 'Makanan & Minuman',
    categorySlug: 'makanan-minuman',
    store: stores.kopi,
    emoji: '☕',
    gradient: ['#3f2d20', '#a16207'],
    badges: ['Single Origin'],
    isFeatured: true,
  },
  {
    id: 'prd_012',
    slug: 'granola-mix-500g',
    title: 'Granola Mix 500g',
    description:
      'Campuran oat, almond, dan buah kering tanpa gula tambahan. Praktis untuk sarapan atau camilan sehat.',
    price: 45000,
    stock: 200,
    rating: 4.6,
    sold: 520,
    category: 'Makanan & Minuman',
    categorySlug: 'makanan-minuman',
    store: stores.kopi,
    emoji: '🥣',
    gradient: ['#78350f', '#eab308'],
    badges: ['No Added Sugar'],
  },
  {
    id: 'prd_013',
    slug: 'set-lampu-tidur-led',
    title: 'Set Lampu Tidur LED',
    description:
      'Lampu tidur minimalis dengan tiga tingkat kecerahan dan sentuhan hangat. Hemat energi, cocok untuk kamar dan ruang baca.',
    price: 135000,
    stock: 44,
    rating: 4.5,
    sold: 310,
    category: 'Peralatan Rumah',
    categorySlug: 'peralatan-rumah',
    store: stores.craft,
    emoji: '💡',
    gradient: ['#581c87', '#a855f7'],
    badges: ['Hemat Energi'],
  },
  {
    id: 'prd_014',
    slug: 'rak-dapur-minimalis',
    title: 'Rak Dapur Minimalis 3 Tingkat',
    description:
      'Rak dapur dari kayu pinus solid dengan tiga tingkat penyimpanan. Mudah dirakit dan tahan lama.',
    price: 259000,
    originalPrice: 329000,
    stock: 18,
    rating: 4.7,
    sold: 180,
    category: 'Peralatan Rumah',
    categorySlug: 'peralatan-rumah',
    store: stores.craft,
    emoji: '🧺',
    gradient: ['#7c2d12', '#b45309'],
    badges: ['Kayu Solid'],
    isFlashSale: true,
  },
  {
    id: 'prd_015',
    slug: 'matras-yoga-anti-slip',
    title: 'Matras Yoga Anti-Slip',
    description:
      'Matras yoga tebal 6 mm dengan permukaan anti-slip dan tali praktis. Nyaman untuk yoga, pilates, dan latihan di rumah.',
    price: 149000,
    stock: 76,
    rating: 4.7,
    sold: 640,
    category: 'Olahraga',
    categorySlug: 'olahraga',
    store: stores.sportiva,
    emoji: '🧘',
    gradient: ['#14532d', '#22c55e'],
    badges: ['Eco Friendly'],
  },
  {
    id: 'prd_016',
    slug: 'dumbbell-set-10kg',
    title: 'Dumbbell Set 10kg',
    description:
      'Sepasang dumbbell dengan lapisan karet anti-slip. Cocok untuk latihan kekuatan di rumah maupun gym pribadi.',
    price: 399000,
    stock: 24,
    rating: 4.8,
    sold: 210,
    category: 'Olahraga',
    categorySlug: 'olahraga',
    store: stores.sportiva,
    emoji: '🏋️',
    gradient: ['#1f2937', '#4b5563'],
    badges: ['Anti Slip'],
  },
  {
    id: 'prd_017',
    slug: 'helm-full-face',
    title: 'Helm Full Face SNI',
    description:
      'Helm full face dengan sertifikasi SNI, visor anti-UV, dan busa dalam yang bisa dilepas. Aman untuk perjalanan harian.',
    price: 289000,
    originalPrice: 359000,
    stock: 33,
    rating: 4.8,
    sold: 470,
    category: 'Otomotif',
    categorySlug: 'otomotif',
    store: stores.prataama,
    emoji: '🪖',
    gradient: ['#0c4a6e', '#0ea5e9'],
    badges: ['SNI'],
    isFeatured: true,
  },
  {
    id: 'prd_018',
    slug: 'cover-motor-waterproof',
    title: 'Cover Motor Waterproof',
    description:
      'Sarung motor tahan air dengan lapisan UV dan tali pengikat bawah. Melindungi kendaraan dari hujan dan debu.',
    price: 79000,
    stock: 110,
    rating: 4.5,
    sold: 890,
    category: 'Otomotif',
    categorySlug: 'otomotif',
    store: stores.prataama,
    emoji: '🏍️',
    gradient: ['#374151', '#9ca3af'],
    badges: ['Waterproof'],
  },
];

export function findDemoProduct(slug: string): Product | undefined {
  return demoProducts.find((p) => p.slug === slug);
}

export function getDemoProductById(id: string): Product | undefined {
  return demoProducts.find((p) => p.id === id);
}

export function filterDemoProducts(options: {
  q?: string;
  category?: string;
  sort?: string;
  limit?: number;
}): Product[] {
  const { q, category, sort, limit } = options;
  let result = [...demoProducts];

  if (q) {
    const term = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.store.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  if (category && category !== 'semua') {
    const term = category.toLowerCase();
    result = result.filter(
      (p) =>
        p.categorySlug === term || p.category.toLowerCase() === term
    );
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      result.sort((a, b) => b.sold - a.sold);
      break;
    default:
      break;
  }

  return typeof limit === 'number' ? result.slice(0, limit) : result;
}
