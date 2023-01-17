import {useEffect, useState} from 'react';

import {getHttpClient} from '../shared/utills/http-client';
import {ShoppingListService} from './shopping-list.service';
import {getAuth} from '../shared/utills/Auth';

const collectionName = "shoppingList";

export class ShoppingListStore {
    api;
    state = {
        shoppingList: [],
    }
    callbacks = [];

    constructor(api) {
        this.api = api;
        getAuth().onAuthStateChanged((user) => {
            if (user) {
                this.getByUser(user.uid);
            } else {
                this.onShoppingListUpdate([])
            }
        });
    }

    onShoppingListUpdate = (shoppingList) => {
        this.state = {...this.state, shoppingList: shoppingList ? shoppingList : []}
        this.callbacks.forEach((callback) => callback(this.state.shoppingList));
    }

    addListener = (callback) => {
        this.callbacks.push(callback);
    }

    removeListener = (callback) => {
        const index = this.callbacks.findIndex(callback);
        this.callbacks.splice(index, 1);
    }

    addItem = (item) => {
        return this.api.create(item).then((response) => {
            this.getForCurrentUser()
            return response;
        });
    }

    toggleItem = (item) => {
        const newItem = {
            ...item,
            checked: !item.checked
        }
        return this.api.update(newItem).then((response) => {
            this.getForCurrentUser()
            return response;
        });
    }

    clearList = () => {
        return getHttpClient().clear(collectionName);
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
            }).then((shoppingList) => {
                this.onShoppingListUpdate(shoppingList)
            })
            ;
    }

    generateShoppingList = (inventory) => {
        return this.getByUser(getAuth().currentUser.uid).then((shoppingList) => {
            // let list = JSON.parse(JSON.stringify(inventory));
            (inventory || [])
                .filter((item) => item.currentQuantity < item.minimalQuantity)
                .map((item) => {
                    item.neededQuantity =
                        parseInt(item.maximalQuantity) - parseInt(item.currentQuantity);
                    delete item.id;
                    delete item.minimalQuantity;
                    delete item.maximalQuantity;
                    delete item.currentQuantity;
                    delete item.category;
                    item.checked = false;
                    item.userUid = getAuth().currentUser.uid;
                    return item;
                })
                .filter((u) => (shoppingList ? shoppingList : []).findIndex((lu) => lu.name === u.name) === -1)
                .forEach((item) => this.api.create(item));
        }).then((response) => {
            this.getForCurrentUser()
            return response;
        });

    }

    getForCurrentUser = () => {
        return this.getByUser(getAuth().currentUser.uid);
    }
}

export const useStoppingListStore = () => {
    const [state, setState] = useState({shoppingList: []});
    const [shoppingList] = useState(() => new ShoppingListStore(new ShoppingListService()));
    useEffect(() => {
        const callback = (shoppingList) => setState({shoppingList: shoppingList});


        shoppingList.addListener(callback);
        return () => {
            shoppingList.removeListener(callback)
        }
    }, [shoppingList, setState])
    return {...shoppingList, state};
}

