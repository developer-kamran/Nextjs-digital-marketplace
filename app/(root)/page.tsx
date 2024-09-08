import ProductSection from '@/components/root/product/ProductSection';
import { getNewestProducts, getPopularProducts } from '@/services';

const HomePage = () => {
  return (
    <main className='space-y-12 '>
      <div className='flex flex-col gap-4 justify-center items-center'>
        <h1
          className='font-bold text-3xl sm:text-4xl pt-2 text-center '
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          DIGITAL MARKETPLACE
        </h1>
        <div className='bg-indigo-500 w-[30%] sm:w-[15%] h-[5px]' />
      </div>
      <ProductSection
        title='Most Popular'
        productsFetcher={getPopularProducts}
      />
      <ProductSection title='Newest' productsFetcher={getNewestProducts} />
    </main>
  );
};

export default HomePage;
