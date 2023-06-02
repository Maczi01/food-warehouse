import { useMutation } from 'react-query';

import { createShoppingListItem } from '../infrastructure/create-shopping-list-item';
import { useInvalidatedShoppingList } from './utils/invalidate-shopping-list';

export const useAddItemToShoppingListMutation = () => {
  const invalidateShoppingList = useInvalidatedShoppingList();
  return useMutation({
    mutationFn: createShoppingListItem,
    onSuccess: () => {
      invalidateShoppingList();
    },
  });
};
