import {useMutation, useQueryClient} from 'react-query';

import {inventoryService} from '../inventory.service';

export const useEditInventoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item) => inventoryService.update(item),
        onSuccess: () => {
            queryClient.invalidateQueries('inventory');
        }
    });
}
