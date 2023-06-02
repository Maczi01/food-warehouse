import {useQuery} from 'react-query';
import {z} from 'zod';

import {getAllInventories} from './infrastructure/get-all-invetories';
import {queryKey} from './inventory.query-key';

export const useGetInventoriesQuery = () => {
    return useQuery({
        queryKey: queryKey.inventory(),
        queryFn: getAllInventories,
        onError: (error) => {
            if (error instanceof z.ZodError) {
                // eslint-disable-next-line no-console
                console.log('error from useGetInventoriesQuery', error)
            }
        },
    });
};
