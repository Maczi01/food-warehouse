import { useQueryClient } from 'react-query';

import { queryKey } from '../../inventory.query-key';

export const useInvalidatedAllInventories = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries(queryKey.inventory());
  };
};
