import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  { name: 'Elektronik', slug: 'elektronik', icon: '💻', description: 'Gadget, audio, dan aksesori harian' },
  { name: 'Fashion Pria', slug: 'fashion-pria', icon: '👔', description: 'Pakaian dan alas kaki pria' },
  { name: 'Fashion Wanita', slug: 'fashion-wanita', icon: '👗', description: 'Hijab, tas, dan busana wanita' },
  { name: 'Kesehatan', slug: 'kesehatan', icon: '💊', description: 'Vitamin, skincare, dan perawatan' },
  { name: 'Makanan & Minuman', slug: 'makanan-minuman', icon: '☕', description: 'Kopi, camilan, dan bahan segar' },
  { name: 'Peralatan Rumah', slug: 'peralatan-rumah', icon: '🏠', description: 'Dekorasi dan perlengkapan dapur' },
  { name: 'Olahraga', slug: 'olahraga', icon: '🏋️', description: 'Fitness, yoga, dan outdoor' },
  { name: 'Otomotif', slug: 'otomotif', icon: '🏍️', description: 'Aksesori motor dan mobil' },
];

const sellers = [
  {
    storeName: 'Santoso Electronic Hub',
    storeSlug: 'santoso-electronic-hub',
    owner: 'Budi Santoso',
    email: 'budi.santoso@techstore.co.id',
    city: 'Bandung',
    description: 'Gadget & Electronics',
    status: 'ACTIVE' as const,
  },
  {
    storeName: 'Rahma Hijab & Fashion',
    storeSlug: 'rahma-fashion',
    owner: 'Siti Rahmawati',
    email: 'siti.rahma@store.id',
    city: 'Bandung',
    description: 'Fashion & Muslim Wear',
    status: 'ACTIVE' as const,
  },
  {
    storeName: 'Nusantara Wood Craft',
    storeSlug: 'nusantara-wood-craft',
    owner: 'Eko Prasetyo',
    email: 'eko.prasetyo@craftsman.id',
    city: 'Yogyakarta',
    description: 'Home & Living',
    status: 'PENDING' as const,
  },
  {
    storeName: 'Nature Glow Skincare',
    storeSlug: 'nature-glow-skincare',
    owner: 'Maya Putri',
    email: 'maya.putri@natureglow.id',
    city: 'Jakarta',
    description: 'Beauty & Personal Care',
    status: 'PENDING' as const,
  },
  {
    storeName: 'Prataama Global Tech',
    storeSlug: 'prataama-global-tech',
    owner: 'Fajar Pratama',
    email: 'fajar.pratama@prataama.id',
    city: 'Surabaya',
    description: 'Gadget & Electronics',
    status: 'ACTIVE' as const,
  },
  {
    storeName: 'Kopi Nusantara',
    storeSlug: 'kopi-nusantara',
    owner: 'Aulia Rahman',
    email: 'aulia@kopinusantara.id',
    city: 'Aceh',
    description: 'Food & Beverage',
    status: 'ACTIVE' as const,
  },
  {
    storeName: 'Sportiva Store',
    storeSlug: 'sportiva-store',
    owner: 'Dewi Lestari',
    email: 'dewi@sportiva.id',
    city: 'Jakarta',
    description: 'Sports & Outdoor',
    status: 'ACTIVE' as const,
  },
];

const products = [
  {
    slug: 'wireless-earbuds-pro-x',
    title: 'Wireless Earbuds Pro X',
    description:
      'TWS dengan active noise cancelling, Bluetooth 5.3, dan baterai hingga 32 jam. Dilengkapi mode transparansi dan sertifikasi IPX5 untuk olahraga.',
    price: 499000,
    stock: 42,
    categorySlug: 'elektronik',
    storeSlug: 'santoso-electronic-hub',
  },
  {
    slug: 'smartwatch-fit-s2',
    title: 'Smartwatch Fit S2',
    description:
      'Jam tangan pintar dengan pemantau detak jantung, SpO2, 100+ mode olahraga, dan layar AMOLED 1.85 inci. Tahan air hingga 5 ATM.',
    price: 649000,
    stock: 28,
    categorySlug: 'elektronik',
    storeSlug: 'santoso-electronic-hub',
  },
  {
    slug: 'keyboard-mechanical-tkl',
    title: 'Keyboard Mechanical TKL',
    description:
      'Keyboard mekanikal 87 tombol dengan hot-swappable switch, keycap PBT, dan koneksi USB-C. Cocok untuk kerja maupun gaming.',
    price: 425000,
    stock: 35,
    categorySlug: 'elektronik',
    storeSlug: 'prataama-global-tech',
  },
  {
    slug: 'powerbank-20000mah',
    title: 'Powerbank 20000mAh 65W',
    description:
      'Powerbank fast charging 65W dengan dua port USB-C dan satu USB-A. Mampu mengisi laptop ringan dan ponsel hingga 4 kali.',
    price: 219000,
    stock: 64,
    categorySlug: 'elektronik',
    storeSlug: 'santoso-electronic-hub',
  },
  {
    slug: 'kemeja-flanel-premium',
    title: 'Kemeja Flanel Premium',
    description:
      'Kemeja flanel katun brushed dengan potongan regular fit. Nyaman dipakai harian, tersedia ukuran M sampai XXL.',
    price: 189000,
    stock: 80,
    categorySlug: 'fashion-pria',
    storeSlug: 'rahma-fashion',
  },
  {
    slug: 'sneakers-urban-runner',
    title: 'Sneakers Urban Runner',
    description:
      'Sepatu sneakers dengan midsole EVA ringan dan upper mesh breathable. Desain minimalis untuk gaya kasual sehari-hari.',
    price: 379000,
    stock: 46,
    categorySlug: 'fashion-pria',
    storeSlug: 'sportiva-store',
  },
  {
    slug: 'hijab-voal-premium',
    title: 'Hijab Voal Premium',
    description:
      'Hijab voal dengan tekstur lembut, tidak mudah kusut, dan jahitan rapi. Ukuran 115 x 115 cm, tersedia 12 pilihan warna.',
    price: 89000,
    stock: 150,
    categorySlug: 'fashion-wanita',
    storeSlug: 'rahma-fashion',
  },
  {
    slug: 'tote-bag-kanvas',
    title: 'Tote Bag Kanvas Premium',
    description:
      'Tas kanvas tebal dengan lapisan dalam dan kantong laptop 14 inci. Kuat menampung kebutuhan kuliah dan kerja.',
    price: 129000,
    stock: 92,
    categorySlug: 'fashion-wanita',
    storeSlug: 'rahma-fashion',
  },
  {
    slug: 'serum-vitamin-c',
    title: 'Serum Vitamin C 15%',
    description:
      'Serum pencerah dengan vitamin C 15%, niacinamide, dan hyaluronic acid. Membantu menyamarkan noda hitam dan menjaga kelembapan.',
    price: 159000,
    stock: 70,
    categorySlug: 'kesehatan',
    storeSlug: 'nature-glow-skincare',
  },
  {
    slug: 'madu-hutan-murni-500ml',
    title: 'Madu Hutan Murni 500ml',
    description:
      'Madu hutan alami tanpa pemanis tambahan, dipanen langsung dari peternak lokal. Cocok untuk imunitas dan minuman hangat.',
    price: 125000,
    stock: 58,
    categorySlug: 'kesehatan',
    storeSlug: 'kopi-nusantara',
  },
  {
    slug: 'kopi-arabika-gayo-250g',
    title: 'Kopi Arabika Gayo 250g',
    description:
      'Biji kopi arabika Gayo single origin dengan profil rasa cokelat dan citrus. Digiling sesuai pesanan, roast medium.',
    price: 95000,
    stock: 120,
    categorySlug: 'makanan-minuman',
    storeSlug: 'kopi-nusantara',
  },
  {
    slug: 'granola-mix-500g',
    title: 'Granola Mix 500g',
    description:
      'Campuran oat, almond, dan buah kering tanpa gula tambahan. Praktis untuk sarapan atau camilan sehat.',
    price: 45000,
    stock: 200,
    categorySlug: 'makanan-minuman',
    storeSlug: 'kopi-nusantara',
  },
  {
    slug: 'set-lampu-tidur-led',
    title: 'Set Lampu Tidur LED',
    description:
      'Lampu tidur minimalis dengan tiga tingkat kecerahan dan sentuhan hangat. Hemat energi, cocok untuk kamar dan ruang baca.',
    price: 135000,
    stock: 44,
    categorySlug: 'peralatan-rumah',
    storeSlug: 'nusantara-wood-craft',
  },
  {
    slug: 'rak-dapur-minimalis',
    title: 'Rak Dapur Minimalis 3 Tingkat',
    description:
      'Rak dapur dari kayu pinus solid dengan tiga tingkat penyimpanan. Mudah dirakit dan tahan lama.',
    price: 259000,
    stock: 18,
    categorySlug: 'peralatan-rumah',
    storeSlug: 'nusantara-wood-craft',
  },
  {
    slug: 'matras-yoga-anti-slip',
    title: 'Matras Yoga Anti-Slip',
    description:
      'Matras yoga tebal 6 mm dengan permukaan anti-slip dan tali praktis. Nyaman untuk yoga, pilates, dan latihan di rumah.',
    price: 149000,
    stock: 76,
    categorySlug: 'olahraga',
    storeSlug: 'sportiva-store',
  },
  {
    slug: 'dumbbell-set-10kg',
    title: 'Dumbbell Set 10kg',
    description:
      'Sepasang dumbbell dengan lapisan karet anti-slip. Cocok untuk latihan kekuatan di rumah maupun gym pribadi.',
    price: 399000,
    stock: 24,
    categorySlug: 'olahraga',
    storeSlug: 'sportiva-store',
  },
  {
    slug: 'helm-full-face',
    title: 'Helm Full Face SNI',
    description:
      'Helm full face dengan sertifikasi SNI, visor anti-UV, dan busa dalam yang bisa dilepas. Aman untuk perjalanan harian.',
    price: 289000,
    stock: 33,
    categorySlug: 'otomotif',
    storeSlug: 'prataama-global-tech',
  },
  {
    slug: 'cover-motor-waterproof',
    title: 'Cover Motor Waterproof',
    description:
      'Sarung motor tahan air dengan lapisan UV dan tali pengikat bawah. Melindungi kendaraan dari hujan dan debu.',
    price: 79000,
    stock: 110,
    categorySlug: 'otomotif',
    storeSlug: 'prataama-global-tech',
  },
];

async function main() {
  console.log('Seeding categories...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  console.log('Seeding stores...');
  const salt = await bcrypt.genSalt(10);
  const sellerPassword = await bcrypt.hash('Seller123!', salt);

  for (const seller of sellers) {
    const user = await prisma.user.upsert({
      where: { email: seller.email },
      update: { name: seller.owner, role: 'SELLER' },
      create: {
        email: seller.email,
        name: seller.owner,
        password: sellerPassword,
        role: 'SELLER',
        isVerified: seller.status === 'ACTIVE',
      },
    });

    await prisma.seller.upsert({
      where: { storeSlug: seller.storeSlug },
      update: {
        storeName: seller.storeName,
        description: seller.description,
        city: seller.city,
        status: seller.status,
      },
      create: {
        userId: user.id,
        storeName: seller.storeName,
        storeSlug: seller.storeSlug,
        description: seller.description,
        city: seller.city,
        province: 'Indonesia',
        status: seller.status,
      },
    });
  }

  console.log('Seeding admin & buyer...');
  const adminPassword = await bcrypt.hash('Admin123!', salt);
  await prisma.user.upsert({
    where: { email: 'admin@sokudo.id' },
    update: { role: 'ADMIN', isVerified: true },
    create: {
      email: 'admin@sokudo.id',
      name: 'Hendrik Wijaya',
      password: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      phone: '+62 811-0000-1111',
    },
  });

  const buyerPassword = await bcrypt.hash('Buyer123!', salt);
  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@sokudo.id' },
    update: {},
    create: {
      email: 'buyer@sokudo.id',
      name: 'Ahmad Rizki',
      password: buyerPassword,
      role: 'BUYER',
      isVerified: true,
      phone: '+62 812-3456-7890',
    },
  });

  console.log('Seeding products...');
  const productIds = new Map<string, string>();
  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        status: 'PUBLISHED',
      },
      create: {
        title: product.title,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        status: 'PUBLISHED',
        seller: { connect: { storeSlug: product.storeSlug } },
        category: { connect: { slug: product.categorySlug } },
      },
    });
    productIds.set(product.slug, created.id);
  }

  console.log('Seeding sample orders...');
  const existingOrders = await prisma.order.count();
  if (existingOrders === 0) {
    const address = await prisma.address.create({
      data: {
        userId: buyer.id,
        title: 'Rumah',
        recipientName: 'Ahmad Rizki',
        phoneNumber: '+62 812-3456-7890',
        street: 'Jl. Kebayoran Baru No. 12',
        district: 'Kebayoran Baru',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        postalCode: '12110',
        isPrimary: true,
      },
    });

    const sampleOrders = [
      {
        slug: 'wireless-earbuds-pro-x',
        quantity: 1,
        status: 'PAID' as const,
        daysAgo: 1,
      },
      {
        slug: 'hijab-voal-premium',
        quantity: 2,
        status: 'SHIPPED' as const,
        daysAgo: 3,
      },
      {
        slug: 'kopi-arabika-gayo-250g',
        quantity: 2,
        status: 'DELIVERED' as const,
        daysAgo: 6,
      },
      {
        slug: 'matras-yoga-anti-slip',
        quantity: 1,
        status: 'PROCESSING' as const,
        daysAgo: 2,
      },
    ];

    for (const [index, sample] of sampleOrders.entries()) {
      const productId = productIds.get(sample.slug)!;
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) continue;

      const price = Number(product.price);
      const subtotal = price * sample.quantity;
      const shippingFee = subtotal >= 300000 ? 0 : 15000;
      const totalAmount = subtotal + shippingFee;
      const createdAt = new Date(
        Date.now() - sample.daysAgo * 24 * 60 * 60 * 1000
      );
      const orderNumber = `SKD-SEED-${String(index + 1).padStart(4, '0')}`;

      const order = await prisma.order.create({
        data: {
          orderNumber,
          userId: buyer.id,
          sellerId: product.sellerId,
          addressId: address.id,
          status: sample.status,
          subtotal,
          shippingFee,
          totalAmount,
          createdAt,
          items: {
            create: [
              {
                productId,
                productTitle: product.title,
                price,
                quantity: sample.quantity,
                total: subtotal,
              },
            ],
          },
        },
      });

      await prisma.payment.create({
        data: {
          orderId: order.id,
          paymentNumber: `PAY-${orderNumber}`,
          amount: totalAmount,
          method: 'transfer',
          status: sample.status === 'DELIVERED' ? 'SETTLEMENT' : 'PENDING',
          paidAt: sample.status === 'DELIVERED' ? createdAt : null,
          createdAt,
        },
      });
    }
  }

  console.log('Seed selesai.');
  console.log('Admin  : admin@sokudo.id / Admin123!');
  console.log('Buyer  : buyer@sokudo.id / Buyer123!');
  console.log('Seller : budi.santoso@techstore.co.id / Seller123!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
