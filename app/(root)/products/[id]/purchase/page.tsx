import { formatCurrency } from '@/lib/utils/formatters';
import db from '@/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PurchaseButton from '@/components/root/product/PurchaseButton';

const PurchasePage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await db.product.findUnique({ where: { id: id } });
  if (product == null) return notFound();

  return (
    <>
      <div className='max-w-3xl w-full mx-auto space-y-8 pb-20'>
        <h1 className='text-3xl text-gray-900 font-semibold'>
          Product Details
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
          </div>
        </div>

        <hr />
        <PurchaseButton
          productId={product.id}
          priceInCents={product.priceInCents}
        />
      </div>
    </>
  );
};

export default PurchasePage;
