import {useMutation, useQueryClient} from 'react-query';

import {inventoryService} from '../inventory.service';

export const useAddInventoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item) => inventoryService.create(item),
        onSuccess: () => {
            queryClient.invalidateQueries('inventory');
        }
    });
}
