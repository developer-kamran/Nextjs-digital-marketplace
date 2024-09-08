import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from './lib/utils/admin_auth';

export async function middleware(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic',
      },
    });
  }
}

export const config = {
  matcher: '/admin/:path',
};
