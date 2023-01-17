import {useEffect, useState} from 'react';
import {InventoryService} from './inventory.service';
import {getAuth} from '../shared/utills/Auth';

export class InventoryStore {
    api;
    state = {
        inventory: [],
    }
    callbacks = [];
    constructor(api) {
        this.api = api;
        getAuth().onAuthStateChanged((user) => {
            if (user) {
                this.getByUser(user.uid);
            } else {
                this.onInventoryUpdate([])
            }
        });
    }

    onInventoryUpdate = (inventory) => {
        this.state = {...this.state, inventory: inventory ? inventory : []}
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
                    this.getForCurrentUser()
                    return response;
                });
        }
        return Promise.reject({Error: 'Cannot update quantity'});
    }

    decreaseQuantity = (item) => {
        if (item.currentQuantity > 0) {
            return this.api.update({...item, currentQuantity: parseInt(item.currentQuantity) - 1})
                .then((response) => {
                    this.getForCurrentUser()
                    return response;
                });
        }
        return Promise.reject({Error: 'Cannot update quantity'});
    }

    deleteItem = (id) => {
        return this.api.delete(id)
            .then((response) => {
                this.getForCurrentUser()
                return response;
            });;
    }

    addItem = (item) => {
        return this.api.create(item)
            .then((response) => {
                this.getForCurrentUser()
                return response;
            });
    }

    editItem = (item) => {
        return this.api.update(item)
            .then((response) => {
                this.getForCurrentUser()
                return response;
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
    const [state, setState] = useState({inventory: []});
    const [inventory] = useState(() => new InventoryStore(new InventoryService()));
    useEffect(() => {
        const callback = (inventory) => setState({inventory: inventory});
        inventory.addListener(callback);
        return () => {
            inventory.removeListener(callback)
        }
    }, [inventory, setState])
    return {...inventory, state};
}
