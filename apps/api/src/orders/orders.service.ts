import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

const FREE_SHIPPING_MIN = 300000;
const FLAT_SHIPPING = 15000;

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    const productIds = dto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds }, status: 'PUBLISHED' },
      include: { seller: true },
    });

    if (products.length !== new Set(productIds).size) {
      throw new BadRequestException('Ada produk yang tidak ditemukan');
    }

    const productMap = new Map(products.map((product) => [product.id, product]));

    let subtotal = 0;
    const orderItems = dto.items.map((item) => {
      const product = productMap.get(item.productId)!;
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Stok "${product.title}" tidak mencukupi`
        );
      }
      const price = Number(product.price);
      const total = price * item.quantity;
      subtotal += total;

      return {
        productId: product.id,
        productTitle: product.title,
        price,
        quantity: item.quantity,
        total,
      };
    });

    const shippingFee = subtotal >= FREE_SHIPPING_MIN ? 0 : FLAT_SHIPPING;
    const totalAmount = subtotal + shippingFee;
    const primaryProduct = productMap.get(dto.items[0].productId)!;

    const order = await this.prisma.$transaction(async (tx) => {
      const email = dto.customer.email.toLowerCase().trim();
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(`guest-${Date.now()}`, salt);

      const user = await tx.user.upsert({
        where: { email },
        update: {
          name: dto.customer.name,
          phone: dto.customer.phone,
        },
        create: {
          email,
          name: dto.customer.name,
          phone: dto.customer.phone,
          password,
        },
      });

      const address = await tx.address.create({
        data: {
          userId: user.id,
          title: 'Alamat pengiriman',
          recipientName: dto.address.recipientName,
          phoneNumber: dto.address.phoneNumber,
          street: dto.address.street,
          city: dto.address.city,
          province: dto.address.province,
          postalCode: dto.address.postalCode,
        },
      });

      const created = await tx.order.create({
        data: {
          orderNumber: this.generateOrderNumber(),
          userId: user.id,
          sellerId: primaryProduct.sellerId,
          addressId: address.id,
          status: 'PENDING_PAYMENT',
          subtotal,
          shippingFee,
          totalAmount,
          notes: dto.notes,
          items: { create: orderItems },
        },
        include: {
          items: true,
          payment: true,
        },
      });

      await tx.payment.create({
        data: {
          orderId: created.id,
          paymentNumber: `PAY-${created.orderNumber.split('-').slice(1).join('-')}`,
          amount: totalAmount,
          method: dto.paymentMethod ?? 'transfer',
          status: 'PENDING',
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      for (const item of dto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return created;
    });

    return this.mapOrder(order);
  }

  async findByOrderNumber(orderNumber: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNumber },
      include: { items: true, payment: true, shipment: true },
    });

    if (!order) {
      throw new NotFoundException(
        `Pesanan dengan nomor "${orderNumber}" tidak ditemukan`
      );
    }

    return this.mapOrder(order);
  }

  private generateOrderNumber() {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `SKD-${date}-${random}`;
  }

  private mapOrder(order: any) {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      subtotal: Number(order.subtotal),
      shippingFee: Number(order.shippingFee),
      totalAmount: Number(order.totalAmount),
      notes: order.notes,
      createdAt: order.createdAt,
      items: (order.items ?? []).map((item: any) => ({
        id: item.id,
        productId: item.productId,
        productTitle: item.productTitle,
        price: Number(item.price),
        quantity: item.quantity,
        total: Number(item.total),
      })),
      payment: order.payment
        ? {
            paymentNumber: order.payment.paymentNumber,
            method: order.payment.method,
            status: order.payment.status,
            expiredAt: order.payment.expiredAt,
          }
        : null,
    };
  }
}
