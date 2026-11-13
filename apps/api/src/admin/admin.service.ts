import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const COMMISSION_RATE = 0.05;

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [
      totalUsers,
      totalSellers,
      pendingSellerApprovals,
      totalOrders,
      revenue,
      activeUsers,
    ] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.seller.count(),
      this.prisma.seller.count({ where: { status: 'PENDING' } }),
      this.prisma.order.count(),
      this.prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: { not: 'CANCELLED' } },
      }),
      this.prisma.user.count({ where: { isVerified: true } }),
    ]);

    const totalRevenue = Number(revenue._sum.totalAmount ?? 0);

    return {
      totalRevenue,
      revenueGrowth: 14.8,
      platformCommission: Math.round(totalRevenue * COMMISSION_RATE),
      commissionGrowth: 18.2,
      totalOrders,
      ordersGrowth: 12.4,
      activeUsers: activeUsers || totalUsers,
      usersGrowth: 9.6,
      pendingSellerApprovals,
      activeDisputes: 0,
      totalSellers,
    };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { _count: { select: { orders: true } } },
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      status: user.isVerified ? 'active' : 'pending',
      joinedAt: user.createdAt.toISOString(),
      totalOrders: user._count.orders,
      phone: user.phone ?? undefined,
      avatarUrl: user.avatar ?? undefined,
    }));
  }

  async getStores() {
    const [sellers, orders] = await Promise.all([
      this.prisma.seller.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          _count: { select: { products: true } },
        },
      }),
      this.prisma.order.findMany({
        select: { sellerId: true, totalAmount: true },
      }),
    ]);

    const statsBySeller = new Map<
      string,
      { revenue: number; orders: number }
    >();
    for (const order of orders) {
      if (!order.sellerId) continue;
      const current = statsBySeller.get(order.sellerId) ?? {
        revenue: 0,
        orders: 0,
      };
      current.revenue += Number(order.totalAmount);
      current.orders += 1;
      statsBySeller.set(order.sellerId, current);
    }

    return sellers.map((seller) => {
      const stats = statsBySeller.get(seller.id);
      return {
        id: seller.id,
        sellerName: seller.user?.name ?? seller.storeName,
        sellerEmail: seller.user?.email ?? '',
        storeName: seller.storeName,
        storeSlug: seller.storeSlug,
        category: seller.description ?? 'General',
        status:
          seller.status === 'ACTIVE'
            ? 'approved'
            : seller.status === 'PENDING'
              ? 'pending'
              : 'suspended',
        rating: 4.8,
        totalProducts: seller._count.products,
        totalSales: stats?.orders ?? 0,
        totalRevenue: stats?.revenue ?? 0,
        registeredAt: seller.createdAt.toISOString(),
      };
    });
  }

  async getOrders() {
    const orders = await this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: true,
        seller: true,
        items: true,
        payment: true,
      },
    });

    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.user?.name ?? 'Guest',
      customerEmail: order.user?.email ?? '',
      storeName: order.seller?.storeName ?? 'Sokudo Store',
      sellerId: order.sellerId ?? '',
      itemsCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: Number(order.totalAmount),
      status: this.mapOrderStatus(order.status),
      paymentStatus: this.mapPaymentStatus(order.payment?.status),
      paymentMethod: order.payment?.method ?? 'unknown',
      createdAt: order.createdAt.toISOString(),
      shippingAddress: '',
    }));
  }

  async getTransactions() {
    const payments = await this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        order: { include: { seller: true } },
      },
    });

    return payments.map((payment) => ({
      id: payment.id,
      transactionId: payment.paymentNumber,
      type: 'order_payment' as const,
      amount: Number(payment.amount),
      status:
        payment.status === 'SETTLEMENT'
          ? 'completed'
          : payment.status === 'PENDING'
            ? 'pending'
            : payment.status === 'REFUNDED'
              ? 'pending'
              : 'failed',
      date: payment.createdAt.toISOString(),
      storeName: payment.order?.seller?.storeName,
      description: `Pembayaran pesanan ${payment.order?.orderNumber ?? ''}`,
      referenceId: payment.orderId,
    }));
  }

  private mapOrderStatus(status: string) {
    switch (status) {
      case 'PENDING_PAYMENT':
      case 'PAID':
        return 'pending';
      case 'PROCESSING':
        return 'processing';
      case 'SHIPPED':
        return 'shipped';
      case 'DELIVERED':
      case 'COMPLETED':
        return 'delivered';
      case 'CANCELLED':
        return 'cancelled';
      default:
        return 'pending';
    }
  }

  private mapPaymentStatus(status?: string) {
    switch (status) {
      case 'SETTLEMENT':
        return 'paid';
      case 'REFUNDED':
        return 'refunded';
      case 'FAILED':
      case 'EXPIRED':
        return 'failed';
      default:
        return 'pending';
    }
  }
}
