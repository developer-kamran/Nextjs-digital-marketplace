import db from '@/prisma';
import PageHeader from '@/components/admin/PageHeader';
import ProductForm from '../../../../../components/admin/product/ProductForm';

export default async function EditProduct({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
  });
  return (
    <div className='max-w-5xl w-full mx-auto '>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </div>
  );
}
