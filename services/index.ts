import { cache } from '@/lib/utils/cache';
import db from '@/prisma';

export function getUsers() {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      orders: { select: { pricePaidInCents: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export function getOrders() {
  return db.order.findMany({
    select: {
      id: true,
      pricePaidInCents: true,
      product: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });
  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

export async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

export async function getProductData() {
  const [activeCount, inActiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return {
    activeCount,
    inActiveCount,
  };
}

export const getPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: {
        orders: { _count: 'desc' },
      },
      take: 6,
    });
  },
  ['/', 'getPopularProducts'],
  { revalidate: 60 * 60 * 24 }
);

export const getNewestProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
    });
  },
  ['/', 'getNewestProduct'],
  { revalidate: 60 * 60 * 24 }
);

export const getAllProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: 'asc' },
    });
  },
  ['/products', 'getProducts'],
  { revalidate: 60 * 60 * 24 }
);

export const createDownloadVerification = async (productId: string) => {
  return (
    await db.downloadVerification.create({
      data: {
        productId,
        expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id;
};
