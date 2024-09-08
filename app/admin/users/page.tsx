import PageHeader from '@/components/admin/PageHeader';
import UsersTable from '@/components/admin/user/UserTable';

export default function UsersPage() {
  return (
    <>
      <PageHeader>Customers</PageHeader>
      <UsersTable />
    </>
  );
}
