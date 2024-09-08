'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ComponentProps } from 'react';

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-primary text-primary-foreground flex justify-center px-4'>
      <div className='flex flex-wrap items-center justify-center sm:justify-normal space-x-4'>
        {children}
      </div>
    </div>
  );
};

export default Navbar;

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        'p-4 py-5 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        pathname === props.href && 'bg-background text-foreground'
      )}
    />
  );
}
