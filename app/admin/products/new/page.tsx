import PageHeader from '@/components/admin/PageHeader';
import ProductForm from '../../../../components/admin/product/ProductForm';

export default function AddProduct() {
  return (
    <div className='max-w-5xl w-full mx-auto '>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </div>
  );
}
