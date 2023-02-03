import {useEffect, useState} from 'react';
import {InventoryService} from './inventory.service';
import {getAuth} from '../shared/utills/Auth';

export class InventoryStore {
    static instance = null;
    api;
    state = {
        inventory: [],
    }
    callbacks = [];
    initialize = false;

    constructor(api) {
        this.api = api;
    }

    static getInstance = () => {
        if (!InventoryStore.instance) {
            InventoryStore.instance = new InventoryStore(new InventoryService());
        }
        return InventoryStore.instance;
    }

    onInventoryUpdate = (inventory) => {
        this.state = {...this.state, inventory: inventory ? inventory : []}
        console.log('onInventoryUpdate, inventory:',inventory)
        console.log('onInventoryUpdate, state:',this.state)
        this.callbacks.forEach((callback) => callback(this.state.inventory));
    }

    addListener = (callback) => {
        this.callbacks.push(callback);
    }

    removeListener = (callback) => {
        const index = this.callbacks.findIndex(callback);
        this.callbacks.splice(index, 1);
    }


    increaseQuantity = (item) => {
        if (item.currentQuantity < parseInt(item.maximalQuantity)) {
            return this.api.update({...item, currentQuantity: parseInt(item.currentQuantity) + 1})
                .then((response) => {
                    return this.getForCurrentUser().then(() => {
                        return response;
                    })
                });
        }
        return Promise.reject({Error: 'Cannot update quantity'});
    }

    decreaseQuantity = (item) => {
        if (item.currentQuantity > 0) {
            return this.api.update({...item, currentQuantity: parseInt(item.currentQuantity) - 1})
                .then((response) => {
                    return this.getForCurrentUser().then(() => {
                        return response;
                    })
                });
        }
        return Promise.reject({Error: 'Cannot update quantity'});
    }

    deleteItem = (id) => {
        return this.api.delete(id)
            .then((response) => {
                return this.getForCurrentUser().then(() => {
                    return response;
                })
            });
        ;
    }

    addItem = (item) => {
        return this.api.create(item)
            .then((response) => {
                return this.getForCurrentUser().then(() => {
                    return response;
                })
            });
    }

    editItem = (item) => {
        return this.api.update(item)
            .then((response) => {
                return this.getForCurrentUser().then(() => {
                    return response;
                })
            });
    }

    getByUser = (userId) => {
        return this.api.getMany()
            .then((snapshot) => {
                const foodListData = [];
                snapshot.forEach((doc) =>
                    foodListData.push({...doc.data(), id: doc.id})
                );
                let filter = foodListData.filter((doc) => {
                    return doc.userUid === userId;
                });
                return filter;
            }).then((inventory) => {
                this.onInventoryUpdate(inventory)
            })
    }
    getForCurrentUser = () => {
        return this.getByUser(getAuth().currentUser.uid);
    }
}

export const useInventory = () => {
    const [inventoryStore] = useState(() => InventoryStore.getInstance());
    const [state, setState] = useState(() => inventoryStore.state);
    useEffect(() => {
        const callback = (inventory) => {
            setState({inventory: inventory});
        }
        inventoryStore.addListener(callback);
        return () => {
            inventoryStore.removeListener(callback)
        }
    }, [inventoryStore, setState])
    return {...inventoryStore, state};
}
