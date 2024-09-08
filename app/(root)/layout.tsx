'use client';
import Navbar, { NavLink } from '@/components/ui/Navbar';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/check-admin');
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar>
        <NavLink href='/'> Home</NavLink>
        <NavLink href='/products'> Products</NavLink>
        <NavLink href='/orders'> My Orders</NavLink>
        {isAdmin && <NavLink href='/admin'> Admin</NavLink>}
      </Navbar>
      <div className='container my-6'>{children}</div>
    </>
  );
};

export default RootLayout;
