'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import {
  deleteProduct,
  toggleProductAvailability,
} from '../../../actions/products';
import { useRouter } from 'next/navigation';

export const ActiveToggleDropdownItem = ({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
      {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
    </DropdownMenuItem>
  );
};

export const DeleteDropdownItem = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className='text-red-500'
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          const isConfirmed = window.confirm(
            'Are you sure you want to delete this product? This action will also remove all associated orders, download verifications, and if the product is the only one for the user, the user will be deleted as well. This cannot be undone.'
          );
          if (!isConfirmed) return;
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
};
