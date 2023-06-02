import { useMutation } from 'react-query';

import { decreaseQuantity } from '../infrastructure/decrease-quantity';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

export const useDecreaseQuantityMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();

  return useMutation({
    mutationFn: decreaseQuantity,
    onSuccess: () => {
      invalidateAll();
    },
  });
};
