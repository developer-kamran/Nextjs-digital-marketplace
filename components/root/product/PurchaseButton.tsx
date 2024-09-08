'use client';
import { formatCurrency } from '@/lib/utils/formatters';
import { loadStripe } from '@stripe/stripe-js';

const PurchaseButton = ({
  productId,
  priceInCents,
}: {
  productId: string;
  priceInCents: number;
}) => {
  const handlePurchase = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    const { sessionId } = await response.json();
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );

    if (!stripe || !sessionId) {
      console.error('Stripe.js failed to load or sessionId not found');
      return;
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <button
      onClick={handlePurchase}
      className='bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 block w-full'
    >
      Buy Now - {formatCurrency(priceInCents / 100)}
    </button>
  );
};

export default PurchaseButton;
