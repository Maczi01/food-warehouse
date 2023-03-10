import { useMutation } from 'react-query';

import { shoppingListService } from '../shopping-list.service';
import { useInvalidatedShoppingList } from './utils/invalidate-shopping-list';

export const useAddItemToShoppingListMutation = () => {
  const invalidateShoppingList = useInvalidatedShoppingList();
  return useMutation({
    mutationFn: (item) => shoppingListService.create(item),
    onSuccess: () => {
      invalidateShoppingList();
    },
  });
};
