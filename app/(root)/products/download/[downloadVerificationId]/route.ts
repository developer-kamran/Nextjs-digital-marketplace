import { downloadFile } from '@/lib/utils/downloadFile';
import db from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) => {
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiredAt: { gt: new Date() } },
    select: {
      product: { select: { filePath: true, name: true } },
    },
  });

  if (data == null) {
    return NextResponse.redirect(
      new URL('/products/download/expired', req.url)
    );
  }

  return await downloadFile({
    filePath: data.product.filePath,
    fileName: data.product.name,
  });
};
