'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteOrder } from '@/actions/orders';

export function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className='text-red-500'
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const isConfirmed = window.confirm(
            'Are you sure you want to delete this order?'
          );
          if (!isConfirmed) return;

          const result = await deleteOrder(id);

          if (result.message) {
            const userDeleteConfirmed = window.confirm(
              `${result.message}\nDo you still want to proceed?`
            );
            if (!userDeleteConfirmed) return;
          }

          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}
