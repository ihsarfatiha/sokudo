import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { QueryProductsDto } from './dto/query-products.dto';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        icon: true,
      },
    });
  }

  async getStores() {
    const sellers = await this.prisma.seller.findMany({
      orderBy: { storeName: 'asc' },
      include: {
        _count: { select: { products: true } },
      },
    });

    return sellers.map((seller) => ({
      id: seller.id,
      name: seller.storeName,
      slug: seller.storeSlug,
      city: seller.city,
      status: seller.status,
      rating: 4.8,
      productCount: seller._count.products,
    }));
  }

  async getProducts(query: QueryProductsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where: Prisma.ProductWhereInput = {
      status: 'PUBLISHED',
    };

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        {
          seller: {
            storeName: { contains: query.search, mode: 'insensitive' },
          },
        },
      ];
    }

    if (query.category && query.category !== 'semua') {
      where.category = { slug: query.category };
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      query.sort === 'price-asc'
        ? { price: 'asc' }
        : query.sort === 'price-desc'
          ? { price: 'desc' }
          : query.sort === 'latest'
            ? { createdAt: 'desc' }
            : query.sort === 'rating'
              ? { reviews: { _count: 'desc' } }
              : { orderItems: { _count: 'desc' } };

    const [total, products] = await this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          seller: true,
          images: { orderBy: { sortOrder: 'asc' } },
          reviews: { select: { rating: true } },
          _count: { select: { orderItems: true } },
        },
      }),
    ]);

    return {
      data: products.map((product) => this.mapProduct(product)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  async getProductBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        seller: true,
        images: { orderBy: { sortOrder: 'asc' } },
        variants: true,
        reviews: { select: { rating: true } },
        _count: { select: { orderItems: true } },
      },
    });

    if (!product) {
      throw new NotFoundException(`Produk dengan slug "${slug}" tidak ditemukan`);
    }

    return this.mapProduct(product);
  }

  private mapProduct(product: any) {
    const reviews: Array<{ rating: number }> = product.reviews ?? [];
    const rating =
      reviews.length > 0
        ? Number(
            (
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            ).toFixed(1)
          )
        : 4.7;

    return {
      id: product.id,
      slug: product.slug,
      title: product.title,
      description: product.description,
      price: Number(product.price),
      originalPrice: null,
      stock: product.stock,
      rating,
      sold: product._count?.orderItems ?? 0,
      category: product.category?.name ?? 'Lainnya',
      categorySlug: product.category?.slug ?? 'lainnya',
      store: {
        id: product.seller?.id ?? '',
        name: product.seller?.storeName ?? 'Sokudo Store',
        slug: product.seller?.storeSlug ?? 'sokudo-store',
        city: product.seller?.city ?? 'Jakarta',
        rating: 4.8,
      },
      images: (product.images ?? []).map((image: any) => ({
        id: image.id,
        url: image.url,
        alt: image.alt ?? product.title,
        isPrimary: image.isPrimary,
      })),
      variants: product.variants ?? [],
    };
  }
}
