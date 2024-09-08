import React from 'react';
import Link from 'next/link';
import Navbar, { NavLink } from '@/components/ui/Navbar';

const NotFoundPage = () => {
  return (
    <>
      <Navbar>
        <NavLink href='/'> Home</NavLink>
        <NavLink href='/products'> Products</NavLink>
        <NavLink href='/orders'> My Orders</NavLink>
      </Navbar>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-6xl font-bold text-gray-900 mb-6'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Oops! Page not found.
        </h2>
        <p className='text-gray-600 mb-8'>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href='/'
          className='px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition'
        >
          Go back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
