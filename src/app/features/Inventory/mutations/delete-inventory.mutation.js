import {useMutation, useQueryClient} from 'react-query';

import {inventoryService} from '../inventory.service';


export const useDeleteInventoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => inventoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries('inventory');
        }
    });
}
