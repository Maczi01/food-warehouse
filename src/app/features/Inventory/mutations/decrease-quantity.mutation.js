import {useMutation, useQueryClient} from 'react-query';

import {inventoryService} from '../inventory.service';


const decreaseQuantity = (item) => {
    if (item.currentQuantity > 0) {
        return inventoryService.update({...item, currentQuantity: parseInt(item.currentQuantity) - 1})
    }
    throw new Error('Cannot update quantity');
}

export const useDecreaseQuantityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: decreaseQuantity,
        onSuccess: () => {
            queryClient.invalidateQueries('inventory');
        }
    });
}
