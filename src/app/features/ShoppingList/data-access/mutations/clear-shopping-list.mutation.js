import { useMutation } from 'react-query';

import { shoppingListService } from '../shopping-list.service';
import { useInvalidatedShoppingList } from './utils/invalidate-shopping-list';

export const useClearShoppingListMutation = () => {
  const invalidateShoppingList = useInvalidatedShoppingList();
  return useMutation({
    mutationFn: () => shoppingListService.clear(),
    onSuccess: () => {
      invalidateShoppingList();
    },
  });
};
