'use server';
import fs from 'fs/promises';
import db from '@/prisma';
import { notFound, redirect } from 'next/navigation';
import { addSchema, editSchema } from '@/lib/zod';
import { revalidatePath } from 'next/cache';

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir('products', { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir('public/products', { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  revalidatePath('/');
  revalidatePath('/products');
  redirect('/admin/products');
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({
    where: { id },
    data: {
      isAvailableForPurchase,
    },
  });
  revalidatePath('/');
  revalidatePath('/products');
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let filePath = product.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath);
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  revalidatePath('/');
  revalidatePath('/products');
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  // Fetch the product along with related orders and download verifications
  const product = await db.product.findUnique({
    where: { id },
    include: {
      orders: {
        include: {
          user: true,
        },
      },
      downloadVerification: true,
    },
  });

  if (!product) return notFound();

  // Extract userIds from the orders and ensure they are unique
  const userIds = Array.from(
    new Set(product.orders.map((order) => order.userId))
  );

  // Delete related orders
  await db.order.deleteMany({
    where: { productId: id },
  });

  // Delete related download verifications
  await db.downloadVerification.deleteMany({
    where: { productId: id },
  });

  // Delete the product
  await db.product.delete({
    where: { id },
  });

  // Clean up file system
  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);

  // Check if users who had the product have any other products
  for (const userId of userIds) {
    const userOrders = await db.order.findMany({
      where: { userId },
      select: { productId: true },
    });

    // If the user has no other products, delete the user
    if (userOrders.length === 0) {
      await db.user.delete({
        where: { id: userId },
      });
    }
  }

  // Revalidate paths
  revalidatePath('/');
  revalidatePath('/products');
}
