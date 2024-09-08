import Link from 'next/link';
import PageHeader from '../../../components/admin/PageHeader';
import { Button } from '@/components/ui/button';
import ProductTable from '../../../components/admin/product/ProductTable';

const AdminProductsPage = () => {
  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href='/admin/products/new' className='mb-4'>
            Add product
          </Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
};

export default AdminProductsPage;
