import React, {useEffect, useState} from "react";
import {api, auth} from "./firebaseApi";

export const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [foodList, setFoodList] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        let unSubscribeFoodList = null;
        let unSubscribeShoppingList = null;

        const unMount = () => {
            unSubscribeFoodList && unSubscribeFoodList();
            unSubscribeShoppingList && unSubscribeShoppingList();
            unSubscribeShoppingList = null;
            unSubscribeFoodList = null;
        };

        auth.onAuthStateChanged((user) => {
            if (user) {
                unSubscribeFoodList = subscribeFoodList(user.uid);
                unSubscribeShoppingList = subscribeShoppingList(user.uid);
            } else {
                unMount();
            }
        });
        return () => {
            unMount();
        };
    }, []);

    const subscribeFoodList = (uid) => {
        return api.getFoodList(uid, (docs) => {
            setFoodList(docs);
        });
    };

    const subscribeShoppingList = (uid) => {
        return api.getShoppingList(uid, (docs) => {
            setShoppingList(docs);
        });
    };

    const increaseQuantity = (item) => {
        api.increaseQuantity(item);
    };

    const decreaseQuantity = (item) => {
        api.decreaseQuantity(item);
    };

    const deleteItem = (id) => {
        api.deleteItem(id);
    };

    const addItem = (newItem) => {
        api.addItemToFoodList(newItem);
    };

    const editItem = (item) => {
        api.editItem(item);
    };

    const deleteShoppingList = () => {
        api.deleteShoppingList();
    };

    const generateShoppingList = () => {
        api.generateShoppingList(foodList, shoppingList);
    };

    const addItemToShoppingList = (newItem) => {
        api.addItemToShoppingList(newItem);
    };

    const setItemAsChecked = (item) => {
        api.setItemAsCheckedOrUnchecked(item);
    };

    const context = {
        shoppingList,
        foodList,
        deleteShoppingList,
        addItemToShoppingList,
        setItemAsChecked,
        generateShoppingList,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        addItem,
        editItem,
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;
