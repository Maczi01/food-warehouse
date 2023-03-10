import { useQuery } from 'react-query';

import { getAllInventories } from './infrastructure/get-all-invetories';
import { queryKey } from './inventory.query-key';

export const useGetInventoriesQuery = () => {
  return useQuery({
    queryKey: queryKey.inventory(),
    queryFn: getAllInventories,
  });
};
