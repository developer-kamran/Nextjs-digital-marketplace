import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export const downloadFile = async ({
  filePath,
  fileName,
}: DownloadFileOptions) => {
  const { size } = await fs.stat(filePath);

  const file = await fs.readFile(filePath);

  const extension = path.extname(filePath).slice(1);

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${fileName}.${extension}"`,
      'Content-Length': size.toString(),
    },
  });
};
