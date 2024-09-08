import DashboardCard from '@/components/admin/DashboardCard';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';
import { getProductData, getSalesData, getUserData } from '@/services';

const AdminDashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashboardCard
        title='Sales'
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title='Customers'
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title='Active Products'
        subtitle={`${formatNumber(productData.inActiveCount)} Inactive `}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

export default AdminDashboard;
