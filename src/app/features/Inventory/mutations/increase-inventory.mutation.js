import {useMutation, useQueryClient} from 'react-query';

import {inventoryService} from '../inventory.service';


const increaseQuantity = (item) => {
    if (item.currentQuantity < parseInt(item.maximalQuantity)) {
        return inventoryService.update({ ...item, currentQuantity: parseInt(item.currentQuantity) + 1 })
    }
    throw new Error('Cannot update quantity');
}

export const useIncreaseQuantityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: increaseQuantity,
        onSuccess: () => {
            queryClient.invalidateQueries('inventory');
        }
    });
}
