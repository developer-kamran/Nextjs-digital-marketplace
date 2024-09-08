'use server';

import db from '@/prisma';
import { notFound } from 'next/navigation';

export async function deleteUser(id: string) {
  const user = await db.user.findUnique({ where: { id } });

  if (!user) return notFound();

  await db.order.deleteMany({ where: { userId: id } });

  await db.user.delete({ where: { id } });
  return user;
}
