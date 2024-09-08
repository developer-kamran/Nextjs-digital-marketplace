import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ExpiredPage = () => {
  return (
    <>
      <div className='text-center'>
        <h1 className='text-3xl mb-4'>Download link expired</h1>
        <Button asChild size='lg'>
          <Link href='/myorders'>Get New Link</Link>
        </Button>
      </div>
    </>
  );
};

export default ExpiredPage;
