import OrdersTable from '@/components/admin/order/OrderTable';
import PageHeader from '@/components/admin/PageHeader';

export default function OrdersPage() {
  return (
    <>
      <PageHeader>Sales</PageHeader>
      <OrdersTable />
    </>
  );
}
