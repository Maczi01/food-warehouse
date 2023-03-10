import { useMutation } from 'react-query';

import { generateShoppingList } from '../infrastructure/generate-shopping-list';
import { useInvalidatedShoppingList } from './utils/invalidate-shopping-list';

export const useGenerateShoppingListMutation = () => {
  const invalidateShoppingList = useInvalidatedShoppingList();
  return useMutation({
    mutationFn: generateShoppingList,
    onSuccess: () => {
      invalidateShoppingList();
    },
  });
};
