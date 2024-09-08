import Navbar, { NavLink } from '@/components/ui/Navbar';

export const dynamic = 'force-dynamic';

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar>
        <NavLink href='/admin'> Dashboard</NavLink>
        <NavLink href='/admin/products'> Products</NavLink>
        <NavLink href='/admin/users'> Customer</NavLink>
        <NavLink href='/admin/orders'> Sales</NavLink>
        <NavLink href='/'> Home</NavLink>
      </Navbar>
      <div className='container my-6'>{children}</div>
    </>
  );
};

export default AdminLayout;
