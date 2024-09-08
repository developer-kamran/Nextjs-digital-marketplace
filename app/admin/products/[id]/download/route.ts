import db from '@/prisma';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';
import { downloadFile } from '@/lib/utils/downloadFile';

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const product = await db.product.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });
  if (product == null) return notFound();

  return await downloadFile({
    filePath: product.filePath,
    fileName: product.name,
  });
};
