'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import db from '@/prisma';
import OrderHistory from '@/email/OrderHistory';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function emailOrderHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const emailSchema = z.string().email();
  const result = emailSchema.safeParse(formData.get('email'));
  if (result.success === false) {
    return { error: 'Invalid email address' };
  }

  const user = await db.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          id: true,
          pricePaidInCents: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (user == null)
    return {
      message:
        'Check your email to view your orde history and download your products.',
    };

  const orderHistory = user.orders.map(async (order) => {
    return {
      ...order,
      downloadVerificationId: (
        await db.downloadVerification.create({
          data: {
            expiredAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
            productId: order.product.id,
          },
        })
      ).id,
    };
  });

  const data = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: user.email,
    subject: 'Order History',
    react: <OrderHistory orders={await Promise.all(orderHistory)} />,
  });

  if (data.error) {
    return {
      error: 'There was an error sending your email. Please try again.',
    };
  }

  return {
    message:
      'Check your email to view your order history and download your products.',
  };
}
