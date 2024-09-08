import ProductCard from '@/components/root/product/ProductCard';
import { ProductCardSkeleton } from '@/components/root/product/ProductCardSkeleton';
import { getAllProducts } from '@/services';
import React, { Suspense } from 'react';

const ProductsPage = () => {
  return (
    <>
      <h1 className='font-bold text-3xl sm:text-4xl  pt-2 mb-10 text-center'>
        Discover All Products
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    </>
  );
};

export default ProductsPage;

async function ProductsSuspense() {
  const products = await getAllProducts();
  if (products.length == 0) return <p>No products to show.</p>;
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
