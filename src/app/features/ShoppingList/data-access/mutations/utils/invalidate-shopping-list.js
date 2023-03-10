import { useQueryClient } from 'react-query';

import { queryKey } from '../../shopping-list.query-key';

export const useInvalidatedShoppingList = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries(queryKey.shoppingList());
  };
};
