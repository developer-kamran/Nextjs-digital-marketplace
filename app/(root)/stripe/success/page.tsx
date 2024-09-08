import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import PurchaseReceiptEmail from '@/email/PurchaseReceipt';
import { formatCurrency } from '@/lib/utils/formatters';

import db from '@/prisma';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) => {
  const sessionId = searchParams?.session_id;

  if (!sessionId) return notFound();

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session || session.payment_status !== 'paid') return notFound();

  const productId = session.metadata?.productId;
  const email = session.customer_details?.email;
  const amountTotal = session.amount_total;

  if (
    !productId ||
    !email ||
    typeof amountTotal !== 'number' ||
    isNaN(amountTotal)
  ) {
    return notFound();
  }

  const product = await db.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: { email },
    include: {
      orders: {
        where: { productId },
      },
    },
  });

  if (user) {
    const existingOrder = user.orders.find(
      (order) => order.productId === productId
    );

    if (existingOrder) {
      return (
        <div className='max-w-5xl w-full mx-auto space-y-8 pb-20 pt-3'>
          <h1 className='text-2xl font-bold'>
            Your purchase has already been processed.
          </h1>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
            <div className='relative aspect-video w-full md:w-1/3'>
              <Image
                src={product.imagePath}
                fill
                alt={product.name}
                className='object-cover rounded-lg shadow-lg'
              />
            </div>
            <div className='flex-1'>
              <div className='text-2xl font-semibold text-gray-800 mb-2'>
                {formatCurrency(product.priceInCents / 100)}
              </div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                {product.name}
              </h2>
              <p className='text-base text-gray-600 line-clamp-4'>
                {product.description}
              </p>
              <Button className='mt-4' size='lg' asChild>
                <a href={`/products/download/${existingOrder.id}`}>
                  Download Your Product
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Create a new user and order if they don't exist
  const userFields = {
    email,
    orders: { create: { productId, pricePaidInCents: amountTotal } },
  };

  const newUser = await db.user.upsert({
    where: { email },
    create: userFields,
    update: userFields,
    select: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!newUser.orders || newUser.orders.length === 0) return notFound();

  const order = newUser.orders[0];

  // Check for existing download verification
  const existingDownloadVerification = await db.downloadVerification.findFirst({
    where: {
      productId,
      expiredAt: {
        gte: new Date(), // Record should not be expired
      },
    },
  });

  let downloadVerification;

  if (existingDownloadVerification) {
    downloadVerification = existingDownloadVerification;
  } else {
    // Create a new download verification record
    downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1-day expiration
      },
    });
  }

  // Send email if not sent already
  if (!downloadVerification.emailSent) {
    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: 'Purchase Complete',
      react: (
        <PurchaseReceiptEmail
          order={order}
          product={product}
          downloadVerificationId={downloadVerification.id}
        />
      ),
    });

    // Update emailSent flag
    await db.downloadVerification.update({
      where: { id: downloadVerification.id },
      data: { emailSent: true },
    });
  }

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8 pb-20 pt-3'>
      <h1 className='text-2xl font-bold'>
        {session.payment_status === 'paid'
          ? 'Congratulations, Your Purchase Was Successful!'
          : 'Your purchase was not successful! Please try again.'}
      </h1>

      <div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
        <div className='relative aspect-video w-full md:w-1/3'>
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className='object-cover rounded-lg shadow-lg'
          />
        </div>
        <div className='flex-1'>
          <div className='text-2xl font-semibold text-gray-800 mb-2'>
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            {product.name}
          </h2>
          <p className='text-base text-gray-600 line-clamp-4'>
            {product.description}
          </p>
          <Button className='mt-4' size='lg' asChild>
            {session.payment_status === 'paid' ? (
              <a href={`/products/download/${downloadVerification.id}`}>
                Download Your Product
              </a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
