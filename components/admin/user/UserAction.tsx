'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/users';

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
            'Are you sure you want to delete this user? This action will also delete all associated orders. Do you want to proceed?'
          );
          if (!isConfirmed) return;
          await deleteUser(id);
          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
}
