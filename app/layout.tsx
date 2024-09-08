import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Digital Marketplace',
  description:
    'A sophisticated digital marketplace for selling and managing digital products, built with Next.js, TailwindCSS, Shadcn, Prisma, and Stripe.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          poppins.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
