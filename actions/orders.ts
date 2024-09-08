'use server';

import db from '@/prisma';
import { notFound } from 'next/navigation';

export async function userOwnsProduct(email: string, productId: string) {
  return (
    (await db.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) != null
  );
}

export async function deleteOrder(id: string) {
  const order = await db.order.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!order) return notFound();

  const userOrders = await db.order.findMany({
    where: { userId: order.userId },
  });

  let message = '';

  if (userOrders.length === 1) {
    message =
      "This is the user's only order. Deleting this order will also delete the user.";
  }

  await db.order.delete({
    where: { id },
  });

  if (userOrders.length === 1) {
    await db.user.delete({
      where: { id: order.userId },
    });
  }

  return {
    order,
    message,
  };
}
