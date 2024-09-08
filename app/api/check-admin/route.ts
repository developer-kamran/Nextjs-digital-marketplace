import { isAuthenticated } from '@/lib/utils/admin_auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const isAdmin = await isAuthenticated(req);
    return NextResponse.json({ isAdmin }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
